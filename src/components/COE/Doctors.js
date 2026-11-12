"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import sanitize from "@/utils/sanitize";
import axios from "axios";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import CONFIG from "@/config";
import FAQSchema from "@/utils/FAQSchema";
import useIsMobile from "@/hooks/useIsMobile";
import BacklinkSection from "@/components/COE/BacklinkSection";
import AppointmentModal from "@/components/Doctors/AppointmentModal";
import { matchesDepartment } from "@/utils/specialityAliases";
import { isActiveDoctor, sortDoctorsByPriority } from "@/utils/branchDoctors";

const DEPARTMENT_DISPLAY_NAMES = {
    "cardiac-sciences": "Cardiology",
    "cardiothoracic-vascular-surgery": "Cardiothoracic & Vascular Surgery",
    "neuro-sciences": "Neurology",
    "nephrology": "Nephrology",
    "urology": "Urology",
    "gastro-sciences": "Gastroenterology",
    "medical-gastroenterology": "Medical Gastroenterology",
    "surgical-gastroenterology": "Surgical Gastroenterology",
    "oncology": "Oncology",
    "orthopaedics": "Orthopaedics",
    "internal-medicine": "Internal Medicine",
    "mother-child-care": "Gynecology & Pediatrics",
    "gynaecology": "Gynaecology",
    "paediatrics": "Paediatrics",
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

const getDoctorDepartmentTitle = (dept) =>
    DEPARTMENT_DISPLAY_NAMES[dept] ||
    dept
        ?.split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

const getDoctorPrimaryLocation = (doctor) => {
    if (typeof doctor?.location === "string" && doctor.location.trim()) {
        return doctor.location.split(",")[0].trim();
    }
    if (Array.isArray(doctor?.locations) && doctor.locations.length > 0) {
        return String(doctor.locations[0] || "").trim();
    }
    return "";
};

const getDoctorProfileUrl = (doctor) => {
    const cleanUrl = doctor?.url ? String(doctor.url).replace(/^\/|\/$/g, "") : "";
    return cleanUrl ? `/${cleanUrl}/` : "";
};

function SpecialtyDoctorCard({ doctor, isCompact, onBookAppointment, onViewProfile }) {
    const primaryLocation = getDoctorPrimaryLocation(doctor);
    const profileUrl = getDoctorProfileUrl(doctor);

    return (
        <div
            className={`bg-white rounded-lg shadow-lg border border-gray-500 ${
                isCompact ? "p-2" : "p-4"
            } flex flex-col justify-between`}
        >
            <div className={`flex ${isCompact ? "gap-2" : "gap-4"}`}>
                <div className={`relative ${isCompact ? "w-28 h-32" : "w-32 h-36"} z-10`}>
                    <img
                        loading="lazy"
                        src="/assets/Doctors/image.png"
                        alt="Background"
                        className="absolute inset-0 w-full h-full"
                    />
                    <img
                        src={doctor.image}
                        alt={doctor.name}
                        className={`relative z-10 ${
                            isCompact ? "w-28" : "w-32 h-34"
                        } rounded-sm object-cover hover:scale-105 transition-transform duration-300`}
                    />
                </div>

                <div className="flex-1">
                    <h3
                        className={`${
                            isCompact ? "text-base pb-1" : "text-xl pb-2"
                        } font-bold text-pink-700`}
                    >
                        {doctor.name}
                    </h3>
                    <p
                        className={`${
                            isCompact ? "text-xs pb-1" : "text-sm pb-2"
                        } text-gray-600`}
                    >
                        {doctor.designation}
                    </p>
                    <div
                        className={`${
                            isCompact ? "text-xs p-1" : "text-sm p-2"
                        } bg-gray-200 rounded-lg text-gray-600`}
                    >
                        {doctor.qualification}
                    </div>
                    <div
                        className={`text-gray-700 ${
                            isCompact ? "text-xs" : "text-sm"
                        } font-bold`}
                    >
                        Experience: {doctor.experience}
                    </div>
                    {primaryLocation && (
                        <div className="flex items-center gap-3">
                            <Image
                                src="/assets/Doctors/Location Icon.webp"
                                alt="Location Icon"
                                width={isCompact ? 10 : 12}
                                height={isCompact ? 10 : 12}
                            />
                            <div>{primaryLocation}</div>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col justify-between mx-auto mt-4">
                <button
                    className="w-full py-1 px-4 border border-pink-700 text-pink-700 font-semibold rounded-lg hover:scale-105 transition"
                    onClick={() => onBookAppointment(doctor)}
                >
                    Book Appointment
                </button>
                {profileUrl && (
                    <button
                        className="w-full py-2 text-pink-700 underline font-semibold rounded-lg hover:scale-105 transition"
                        onClick={() => onViewProfile(profileUrl)}
                    >
                        View Profile
                    </button>
                )}
            </div>
        </div>
    );
}

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
        let cancelled = false;
        const fetchData = async () => {
            if (!department) return;
            try {
                const endpoint = `${CONFIG.API_BASE_URL}/coe/getCategoryData/${department}/Doctors`;
                const response = await axios.get(endpoint);
                if (!cancelled) setData(response.data);
            } catch (err) {
                // Category data is optional for custom departments/specialities
                if (!cancelled) setData(null);
            }
        };

        fetchData();
        return () => {
            cancelled = true;
        };
    }, [department, tab]);

    useEffect(() => {
        let cancelled = false;
        const fetchDoctorsData = async () => {
            if (!department) return;
            setLoading(true);
            setError(null);
            try {
                let allDoctors = [];
                try {
                    const listRes = await axios.get(`${CONFIG.API_BASE_URL}/getDoctorsList`);
                    if (Array.isArray(listRes.data)) {
                        allDoctors = listRes.data;
                    }
                } catch (listErr) {
                    // Fallback to full list endpoint if compact listing endpoint fails
                }

                if (allDoctors.length === 0) {
                    const allRes = await axios.get(`${CONFIG.API_BASE_URL}/getAllDoctors`);
                    allDoctors = Array.isArray(allRes.data) ? allRes.data : [];
                }

                if (cancelled) return;

                const matchedDoctors = allDoctors.filter(
                    (doc) => isActiveDoctor(doc) && matchesDepartment(department, doc)
                );

                const uniqueDoctors = sortDoctorsByPriority(
                    matchedDoctors.filter(
                        (doctor, index, self) =>
                            self.findIndex((d) => (d.id || d.name) === (doctor.id || doctor.name)) === index
                    )
                );

                if (uniqueDoctors.length === 0) {
                    setDoctorsData([]);
                    setError("No doctors found for this department.");
                } else {
                    setDoctorsData(uniqueDoctors);
                }
            } catch (err) {
                if (cancelled) return;
                console.error("Error fetching doctors:", err);
                setDoctorsData([]);
                setError("No doctors found for this department.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchDoctorsData();
        return () => {
            cancelled = true;
        };
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

    const handleBookAppointment = (doctor) => {
        setSelectedDoctor(doctor);
        setOpen(true);
    };

    const handleViewProfile = (profileUrl) => {
        if (profileUrl) {
            router.push(profileUrl);
        }
    };

    const departmentTitle = getDoctorDepartmentTitle(department);

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
                                Best {departmentTitle} Doctors in Hyderabad
                            </h1>
                            <div className="grid grid-cols-3 gap-2 pt-4">
                                {doctorsData.map((doctor, i) => (
                                    <SpecialtyDoctorCard
                                        key={doctor.id || doctor.name || i}
                                        doctor={doctor}
                                        isCompact={false}
                                        onBookAppointment={handleBookAppointment}
                                        onViewProfile={handleViewProfile}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5 p-5">
                        {/* Left Side - API Data */}
                        <div ref={contentRef} className="w-full flex-1 hide-scrollbar overflow-y-auto pr-4 max-h-[calc(100vh-40px)]">
                            {data?.extraFields?.map((field, index) => {
                                const getHeadingTag = () => {
                                    if (index === 0 || index === 1) return "h2";
                                    return "h3";
                                };

                                const HeadingTag = getHeadingTag();

                                return (
                                    <div key={index}>
                                        <HeadingTag
                                            className={`text-pink-700 mb-2 font-bold ${
                                                index <= 1 ? "text-2xl" : "text-xl"
                                            }`}
                                        >
                                            {field.heading}
                                        </HeadingTag>
                                        <div
                                            className="text-gray-700 text-[18px] leading-relaxed"
                                            dangerouslySetInnerHTML={{
                                                __html: sanitize(
                                                    (field.description || "").replace(/<ul>/g, '<ul class="list-disc ml-6">')
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
                                            className={`border-2 rounded-lg ${
                                                activeIndex === index
                                                    ? "border-pink-600"
                                                    : "border-pink-300"
                                            }`}
                                        >
                                            <button
                                                className={`w-full p-4 flex justify-between items-center text-left font-medium ${
                                                    activeIndex === index
                                                        ? "text-white bg-pink-600 border-b border-white"
                                                        : "text-pink-600"
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
                                Best {departmentTitle} Doctors in Hyderabad
                            </h2>
                            <div className="grid grid-cols-1 gap-2 pt-4">
                                {doctorsData.map((doctor, i) => (
                                    <SpecialtyDoctorCard
                                        key={doctor.id || doctor.name || i}
                                        doctor={doctor}
                                        isCompact={true}
                                        onBookAppointment={handleBookAppointment}
                                        onViewProfile={handleViewProfile}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="p-2">
                        {/* Left Side - API Data */}
                        <div className="pl-2">
                            {data?.extraFields?.map((field, index) => {
                                const getHeadingTag = () => {
                                    if (index === 0 || index === 1) return "h2";
                                    return "h3";
                                };

                                const HeadingTag = getHeadingTag();
                                return (
                                    <div key={index}>
                                        <HeadingTag
                                            className={`text-pink-700 ${
                                                index <= 1 ? "text-lg" : "text-base"
                                            } font-semibold flex items-center w-full`}
                                        >
                                            {field.heading}
                                        </HeadingTag>
                                        <div
                                            className="text-gray-700 text-sm leading-relaxed"
                                            dangerouslySetInnerHTML={{
                                                __html: sanitize(
                                                    (field.description || "").replace(/<ul>/g, '<ul class="list-disc ml-6">')
                                                )
                                            }}
                                        ></div>
                                    </div>
                                );
                            })}
                            <h2 className="text-xl font-bold text-pink-700 mb-2">FAQs</h2>
                            <FAQSchema faqs={data?.faqs} />
                            <div className="text-gray-700 leading-relaxed">
                                <div className="space-y-4">
                                    {data?.faqs?.map((faq, index) => (
                                        <div
                                            key={index}
                                            className={`border-2 rounded-lg ${
                                                activeIndex === index
                                                    ? "border-pink-600"
                                                    : "border-pink-300"
                                            }`}
                                        >
                                            <button
                                                className={`w-full p-1 flex justify-between items-center text-sm text-left font-medium ${
                                                    activeIndex === index
                                                        ? "text-white bg-pink-600 border-b border-white"
                                                        : "text-pink-600"
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
