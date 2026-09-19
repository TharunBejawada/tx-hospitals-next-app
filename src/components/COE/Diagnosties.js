"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import DOMPurify from "dompurify";
import axios from "axios";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion } from "framer-motion";
import CONFIG from "@/config";
import FAQSchema from "@/utils/FAQSchema";
import useIsMobile from "@/hooks/useIsMobile";
import DetailsForm from "@/components/COE/DetailsForm";
import BacklinkSection from "@/components/COE/BacklinkSection";
import countryOptions from "@/utils/countryOptions";
import ActionButtons from "@/components/Common/ActionButtons";

export default function Diagnosties({ department: propDepartment }) {
    const router = useRouter();
    const contentRef = useRef(null);
    const { slug } = router.query;
    const department = propDepartment || slug?.[0] || null;
    const tab = slug?.[1] || "";
    const isMobile = useIsMobile();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);
    const [country, setCountry] = useState("India");
    const [selectedCountry, setSelectedCountry] = useState(countryOptions[0]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (country === "India") {
            setSelectedCountry(countryOptions.find(c => c.name === "India"));
        } else {
            setSelectedCountry(countryOptions[1]);
        }
    }, [country]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (contentRef.current) {
            contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [department, tab]);

    const toggleFAQ = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const endpoint = `${CONFIG.API_BASE_URL}/coe/getCategoryData/${department}/Diagnosties`;
                const response = await axios.get(endpoint);
                setData(response.data);
            } catch (err) {
                setError("No data found!");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [department, tab]);

    if (loading) {
        return (
            <div className="flex flex-row justify-center items-center mt-20 mb-4 gap-2">
                <div className="w-8 h-8 border-2 border-pink-700 border-t-transparent rounded-full animate-spin"></div>
                <div className="text-pink-700 text-lg font-medium animate-pulse">
                    Loading...
                </div>
            </div>
        );
    }

    if (error) return <p className="text-center p-4 text-lg text-pink-700 font-semibold">{error}</p>;

    const getDoctorName = (dept) => {
        const doctorMap = {
            "cardiac-sciences": "Cardiologist",
            "neuro-sciences": "Neurologist",
            "renal-sciences": "Nephrologist",
            "gastro-sciences": "Gastroenterologist",
            "oncology": "Oncologist",
            "orthopaedics": "Orthopaedic Surgeon",
            "internal-medicine": "Internal Medicine Specialist",
            "mother-child-care": "Gynecologist / Pediatrician",
            "anaesthesia-and-pain-management": "Anesthesiologist",
            "dermatology-cosmetic-care": "Dermatologist",
            "eye-ophthalmology": "Ophthalmologist",
            "dental-and-maxillofacial-care": "Dentist / Maxillofacial Surgeon",
            "endocrinology": "Endocrinologist",
            "transplant-medicine": "Transplant Specialist",
            "pulmonology": "Pulmonologist",
            "robotics-science": "Robotic Surgery Specialist",
            "ent": "ENT Specialist",
            "rheumatology": "Rheumatologist",
        };
        return doctorMap[dept] || "Specialist";
    };

    const getDepartment = (dept) => {
        const departmentMap = {
            "cardiac-sciences": "Cardiology",
            "neuro-sciences": "Neurology",
            "nephrology": "Nephrology",
            "urology": "Urology",
            "gastro-sciences": "Gastroenterology",
            "oncology": "Oncology",
            "orthopaedics": "Orthopedics",
            "internal-medicine": "Health Days",
            "mother-child-care": "Mother& Child",
            "anaesthesia-and-pain-management": "Healthcare",
            "dermatology-cosmetic-care": "Dermatology",
            "eye-ophthalmology": "Ophthalmology",
            "dental-and-maxillofacial-care": "Dental",
            "endocrinology": "Endocrinology",
            "transplant-medicine": "Transplant Specialist",
            "pulmonology": "Pulmonology",
            "robotics-science": "Pediatric",
            "ent": "Ent",
            "rheumatology": "Rheumatology",
        };
        return departmentMap[dept] || "Specialist";
    };

    return (
        <>
            <Head>
                <title>{data?.seoDetails?.seoTitle}</title>
                <meta
                    name="description"
                    content={data?.seoDetails?.metaDescription}
                />
                <meta
                    name="keywords"
                    content={data?.seoDetails?.metaKeywords}
                />
            </Head>
            {!isMobile ? (
                <div className="font-inter">
                    <div className="flex gap-5 p-5">
                        {/* Left Side - API Data */}
                        <div ref={contentRef} className="w-[70%] hide-scrollbar flex-1 overflow-y-auto pr-4 max-h-[calc(100vh-40px)]">
                            {data?.extraFields?.map((field, index) => {
                                const getHeadingTag = () => {
                                    if (index === 0) return 'h1';
                                    if (index === 1 || index === 2) return 'h2';
                                    return 'h3';
                                };

                                const HeadingTag = getHeadingTag();

                                return (
                                    <div key={index}>
                                        <HeadingTag className={`text-pink-700 mb-2 font-bold ${index === 0 ? 'text-4xl' : index <= 2 ? 'text-2xl' : 'text-xl'
                                            }`}>
                                            {field.heading}
                                        </HeadingTag>
                                        <div
                                            className="text-gray-700 text-[18px] leading-relaxed"
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(
                                                    field.description.replace(/<ul>/g, '<ul class="list-disc ml-6">')
                                                )
                                            }}
                                        ></div>
                                    </div>
                                );
                            })}
                            <h2 className="text-2xl font-bold text-pink-700 mb-2">FAQs</h2>
                            <FAQSchema faqs={data?.faqs} />
                            <div className="text-gray-700 leading-relaxed">
                                <div className="space-y-4">
                                    {data?.faqs?.map((faq, index) => (
                                        <div
                                            key={index}
                                            className={`border-2 rounded-lg ${activeIndex === index
                                                ? "border-pink-600"
                                                : "border-pink-300"
                                                }`}
                                        >
                                            <button
                                                className={`w-full p-4 flex justify-between items-center text-left font-medium ${activeIndex === index ? "text-white bg-pink-600 border-b border-white" : "text-pink-600"
                                                    }`}
                                                onClick={() => toggleFAQ(index)}
                                            >
                                                {faq.question}
                                                {activeIndex === index ? (
                                                    <FaChevronDown className="text-white" />
                                                ) : (
                                                    <FaChevronUp className="text-pink-600" />
                                                )}
                                            </button>
                                            {activeIndex === index && (
                                                <div className="p-4 text-black">
                                                    <p dangerouslySetInnerHTML={{ __html: faq.description }} />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Form */}
                        <div className="w-[30%] self-start flex-shrink-0">
                            <div className="border bg-gray-200 shadow-lg rounded-xl sticky top-5">
                                <p className="bg-pink-700 text-white text-lg text-center p-2 rounded-t-xl font-semibold">
                                    Talk to a {getDoctorName(department)} Doctor today!
                                </p>
                                <div className="p-4">
                                    <div className="flex px-6 gap-6">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="countryType"
                                                value="India"
                                                checked={country === "India"}
                                                onChange={() => setCountry("India")}
                                                className="h-4 w-4 accent-gray-700"
                                            />
                                            <span>India</span>
                                        </label>

                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="countryType"
                                                value="Other Countries"
                                                checked={country === "Other Countries"}
                                                onChange={() => setCountry("Other Countries")}
                                                className="h-4 w-4 accent-gray-700"
                                            />
                                            <span>Other Countries</span>
                                        </label>
                                    </div>

                                    <DetailsForm
                                        department={getDepartment(department)}
                                        selectedCountry={selectedCountry}
                                        setSelectedCountry={setSelectedCountry}
                                        isOtherCountry={country === "Other Countries"}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {Array.isArray(data?.backlinkSchema) && data?.backlinkSchema?.length > 0 && (
                        <div className="w-full mx-auto p-4">
                            <BacklinkSection backlinkSchema={data?.backlinkSchema} />
                        </div>
                    )}
                </div>
            ) : (
                <div className="p-2 font-inter">
                    <div className="pl-2">
                        {data?.extraFields?.map((field, index) => {
                            const getHeadingTag = () => {
                                if (index === 0 || index === 1 || index === 2) return 'h2';
                                return 'h3';
                            };

                            const HeadingTag = getHeadingTag();
                            return (
                                <div key={index}>
                                    <HeadingTag className={`text-pink-700 ${index === 0 ? 'text-xl' : index <= 2 ? 'text-lg' : 'text-base'
                                        } font-semibold flex items-center w-full`}>
                                        {field.heading}
                                    </HeadingTag>
                                    <div
                                        className="text-gray-700 text-sm leading-relaxed"
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(field.description.replace(/<ul>/g, '<ul class="list-disc ml-6">'))
                                        }}
                                    ></div>
                                </div>
                            )
                        })}
                        <ActionButtons onBookNow={() => setShowModal(true)} />
                        {/* Modal */}
                        {showModal && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                <div className="w-full max-w-lg relative p-6">
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="absolute top-2 right-2 text-white hover:text-pink-700 text-2xl font-bold"
                                    >
                                        &times;
                                    </button>
                                    <div className="bg-gray-300 rounded-lg shadow-lg border w-auto self-start flex-shrink-0">
                                        <p className="bg-pink-700 text-white text-sm text-center p-2 rounded-t-lg font-semibold">
                                            Talk to a {getDoctorName(department)} Doctor today!
                                        </p>
                                        <div className="p-2">
                                            <div className="flex px-3 gap-6">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="countryType"
                                                        value="India"
                                                        checked={country === "India"}
                                                        onChange={() => setCountry("India")}
                                                        className="h-4 w-4 accent-gray-700"
                                                    />
                                                    <span className="text-sm">India</span>
                                                </label>

                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="countryType"
                                                        value="Other Countries"
                                                        checked={country === "Other Countries"}
                                                        onChange={() => setCountry("Other Countries")}
                                                        className="h-4 w-4 accent-gray-700"
                                                    />
                                                    <span className="text-sm">Other Countries</span>
                                                </label>
                                            </div>

                                            <DetailsForm
                                                department={getDepartment(department)}
                                                selectedCountry={selectedCountry}
                                                setSelectedCountry={setSelectedCountry}
                                                isOtherCountry={country === "Other Countries"}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <h2 className="text-xl font-bold text-pink-700 mb-2">FAQs</h2>
                        <FAQSchema faqs={data?.faqs} />
                        <div className="text-gray-700 leading-relaxed">
                            <div className="space-y-4">
                                {data?.faqs?.map((faq, index) => (
                                    <div
                                        key={index}
                                        className={`border-2 rounded-lg ${activeIndex === index
                                            ? "border-pink-600"
                                            : "border-pink-300"
                                            }`}
                                    >
                                        <button
                                            className={`w-full p-1 flex justify-between items-center text-sm text-left font-medium ${activeIndex === index ? "text-white bg-pink-600 border-b border-white" : "text-pink-600"
                                                }`}
                                            onClick={() => toggleFAQ(index)}
                                        >
                                            {faq.question}
                                            {activeIndex === index ? (
                                                <FaChevronDown className="text-white" />
                                            ) : (
                                                <FaChevronUp className="text-pink-600" />
                                            )}
                                        </button>
                                        {activeIndex === index && (
                                            <div className="p-4 text-black text-sm">
                                                <p dangerouslySetInnerHTML={{ __html: faq.description }} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}