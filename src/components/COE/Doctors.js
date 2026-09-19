"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import DOMPurify from "dompurify";
import axios from "axios";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion } from "framer-motion";
import CONFIG from "@/config";
import FAQSchema from "@/utils/FAQSchema";
import useIsMobile from "@/hooks/useIsMobile";
import BacklinkSection from "@/components/COE/BacklinkSection";
import AppointmentModal from "@/components/Doctors/AppointmentModal";

export default function Doctors({ department: propDepartment }) {
    const router = useRouter();
    const contentRef = useRef(null);
    const { slug } = router.query;
    const department = propDepartment || slug?.[0] || null;
    const tab = slug?.[1] || "";
    const isMobile = useIsMobile();
    const [data, setData] = useState(null);
    const [doctorsData, setDoctorsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

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
                const endpoint = `${CONFIG.API_BASE_URL}/coe/getCategoryData/${department}/Doctors`;
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

    useEffect(() => {
        const fetchDoctorsData = async () => {
            try {
                let encodedDept = department.replace(/-/g, "%20");
                if (encodedDept === "mother%20child%20care") {
                    encodedDept = "MOTHER%20AND%20CHILD%20CARE";
                } else if (encodedDept === "dermatology%20cosmetic%20care") {
                    encodedDept = "DERMATOLOGY,%20COSMETIC%20CARE%20&%20PLASTIC%20SURGERY";
                } else if (encodedDept === "cardiothoracic%20vascular%20surgery") {
                    encodedDept = "cardiothoracic%20&%20vascular%20surgery";
                }
                const endpoint = `${CONFIG.API_BASE_URL}/getdoctorsbydept/${encodedDept}`;
                const response = await axios.get(endpoint);
                setDoctorsData(response.data.Items);
            } catch (err) {
                setError("No data found!");
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorsData();
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

    const getDoctorDepartment = (dept) => {
        const departmentMap = {
            "cardiac-sciences": "Cardiology",
            "neuro-sciences": "Neurology",
            "nephrology": "Nephrology",
            "urology": "Urology",
            "gastro-sciences": "Gastroenterology",
            "oncology": "Oncology",
            "orthopaedics": "Orthopaedics",
            "internal-medicine": "Internal Medicine",
            "mother-child-care": "Gynecology & Pediatrics",
            "anaesthesia-and-pain-management": "Anesthesiology",
            "dermatology-cosmetic-care": "Dermatology",
            "eye-ophthalmology": "Ophthalmology",
            "dental-and-maxillofacial-care": "Dentistry / Maxillofacial",
            "endocrinology": "Endocrinology",
            "transplant-medicine": "Transplant Medicine",
            "pulmonology": "Pulmonology",
            "robotics-science": "Robotic Surgery",
            "ent": "ENT",
            "rheumatology": "Rheumatology",
        };
        return departmentMap[dept] || dept?.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
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
                    <div className="relative pb-4 w-full min-h-full">
                        <div className="p-4 mx-w-full relative">
                            <h1 className="text-4xl text-center font-bold text-pink-700 mb-4">
                                Best {getDoctorDepartment(department)} Doctors in Hyderabad
                            </h1>
                            <div className="grid grid-cols-3 gap-2 pt-4">
                                {doctorsData
                                    ?.slice()
                                    .sort((a, b) => Number(a.priorityOrder) - Number(b.priorityOrder))
                                    .map((doctor, i) => (
                                        <div
                                            className="bg-white rounded-lg shadow-lg border border-gray-500 p-4 flex flex-col justify-between"
                                            key={i}
                                        >
                                            <motion.div
                                                initial={{ opacity: 0, y: 50 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: i * 0.2 }}
                                                className="flex gap-4"
                                            >
                                                <div className="relative w-32 h-36 z-10">
                                                    <img
                                                        loading="lazy"
                                                        src="/assets/Doctors/image.png"
                                                        alt="Background"
                                                        className="absolute inset-0 w-full h-full"
                                                    />
                                                    <motion.img
                                                        src={doctor.image}
                                                        alt={doctor.name}
                                                        className="relative z-10 w-32 h-34 rounded-sm object-cover"
                                                        whileHover={{ scale: 1.1 }}
                                                        transition={{ duration: 0.3 }}
                                                    />
                                                </div>

                                                <div className="flex-1">
                                                    <h3 className="text-xl pb-2 font-bold text-pink-700">{doctor.name}</h3>
                                                    <p className="text-sm pb-2 text-gray-600">{doctor.designation}</p>
                                                    <div className="text-sm p-2 bg-gray-200 rounded-lg text-gray-600">
                                                        {doctor.qualification}
                                                    </div>
                                                    <div className="text-gray-700 text-sm font-bold">
                                                        Experience: {doctor.experience}
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <Image
                                                            src="/assets/Doctors/Location Icon.webp"
                                                            alt="Location Icon"
                                                            width={12}
                                                            height={12}
                                                        />
                                                        <div>{doctor.location.split(",")[0]}</div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                            <div className="flex flex-col justify-between mx-auto mt-4">
                                                <button
                                                    className="w-full py-1 px-4 border border-pink-700 text-pink-700 font-semibold rounded-lg hover:scale-105 transition"
                                                    onClick={() => {
                                                        setSelectedDoctor(doctor);
                                                        setOpen(true);
                                                    }}
                                                >
                                                    Book Appointment
                                                </button>
                                                <button
                                                    className="w-full py-2 text-pink-700 underline font-semibold rounded-lg hover:scale-105 transition"
                                                    onClick={() => router.push(`/${doctor.url.replace(/^\/|\/$/g, '')}/`)}
                                                >
                                                    View Profile
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5 p-5">
                        {/* Left Side - API Data */}
                        <div ref={contentRef} className="w-full flex-1 hide-scrollbar overflow-y-auto pr-4 max-h-[calc(100vh-40px)]">
                            {data?.extraFields?.map((field, index) => {
                                const getHeadingTag = () => {
                                    if (index === 0 || index === 1) return 'h2';
                                    return 'h3';
                                };

                                const HeadingTag = getHeadingTag();

                                return (
                                    <div key={index}>
                                        <HeadingTag className={`text-pink-700 mb-2 font-bold ${index <= 1 ? 'text-2xl' : 'text-xl'
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
                                                {faq?.question}
                                                {activeIndex === index ? (
                                                    <FaChevronDown className="text-white" />
                                                ) : (
                                                    <FaChevronUp className="text-pink-600" />
                                                )}
                                            </button>
                                            {activeIndex === index && (
                                                <div className="p-4 text-black">
                                                    <p dangerouslySetInnerHTML={{ __html: faq?.description }} />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {Array.isArray(data?.backlinkSchema) && data?.backlinkSchema?.length > 0 && (
                        <div className="w-full font-inter mx-auto p-4">
                            <BacklinkSection backlinkSchema={data?.backlinkSchema} />
                        </div>
                    )}
                </div>
            ) : (
                <div className="font-inter">
                    <div className="relative bg-gray-200 pb-2 w-full min-h-full">
                        <div className="p-4 mx-w-full relative">
                            <h2 className="text-xl font-semibold text-pink-700">
                                Best {getDoctorDepartment(department)} Doctors in Hyderabad
                            </h2>
                            <div className="grid grid-cols-1 gap-2 pt-4">
                                {doctorsData
                                    ?.slice()
                                    .sort((a, b) => Number(a.priorityOrder) - Number(b.priorityOrder))
                                    .map((doctor, i) => (
                                        <div
                                            className="bg-white rounded-lg shadow-lg border border-gray-500 p-2 flex flex-col justify-between"
                                            key={i}
                                        >
                                            <motion.div
                                                initial={{ opacity: 0, y: 50 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: i * 0.2 }}
                                                className="flex gap-2"
                                            >
                                                <div className="relative w-28 h-32 z-10">
                                                    <img
                                                        loading="lazy"
                                                        src="/assets/Doctors/image.png"
                                                        alt="Background"
                                                        className="absolute inset-0 w-full h-full"
                                                    />
                                                    <motion.img
                                                        src={doctor.image}
                                                        alt={doctor.name}
                                                        className="relative z-10 w-28 rounded-sm object-cover"
                                                        whileHover={{ scale: 1.1 }}
                                                        transition={{ duration: 0.3 }}
                                                    />
                                                </div>

                                                <div className="flex-1">
                                                    <h3 className="text-base pb-1 font-bold text-pink-700">{doctor.name}</h3>
                                                    <p className="text-xs pb-1 text-gray-600">{doctor.designation}</p>
                                                    <div className="text-xs p-1 bg-gray-200 rounded-lg text-gray-600">
                                                        {doctor.qualification}
                                                    </div>
                                                    <div className="text-gray-700 text-xs font-bold">
                                                        Experience: {doctor.experience}
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <Image
                                                            src="/assets/Doctors/Location Icon.webp"
                                                            alt="Location Icon"
                                                            width={10}
                                                            height={10}
                                                        />
                                                        <div>{doctor.location.split(",")[0]}</div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                            <div className="flex flex-col justify-between mx-auto mt-4">
                                                <button
                                                    className="w-full py-1 px-4 border border-pink-700 text-pink-700 font-semibold rounded-lg hover:scale-105 transition"
                                                    onClick={() => setOpen(true)}
                                                >
                                                    Book Appointment
                                                </button>
                                                <button
                                                    className="w-full py-2 text-pink-700 underline font-semibold rounded-lg hover:scale-105 transition"
                                                    onClick={() => router.push(`/${doctor.url.replace(/^\/|\/$/g, '')}/`)}
                                                >
                                                    View Profile
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className="p-2">
                        {/* Left Side - API Data */}
                        <div className="pl-2">
                            {data?.extraFields?.map((field, index) => {
                                const getHeadingTag = () => {
                                    if (index === 0 || index === 1) return 'h2';
                                    return 'h3';
                                };

                                const HeadingTag = getHeadingTag();
                                return (
                                    <div key={index}>
                                        <HeadingTag className={`text-pink-700 ${index <= 1 ? 'text-lg' : 'text-base'
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
                    {Array.isArray(data?.backlinkSchema) && data?.backlinkSchema?.length > 0 && (
                        <div className="w-full p-2">
                            <BacklinkSection backlinkSchema={data?.backlinkSchema} />
                        </div>
                    )}
                </div>
            )}
            {open && <AppointmentModal doctorData={selectedDoctor} closeModal={() => setOpen(false)} />}
        </>
    );
}