import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import useIsMobile from "@/hooks/useIsMobile";
import FAQSchema from "@/utils/FAQSchema";
import Breadcrumb from "@/components/Common/Breadcrumb";
import DoctorDetails from "@/components/Doctors/DoctorDetails";
import AppointmentModal from "@/components/Doctors/AppointmentModal";
import { FaCalendarAlt, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import DoctorAvailability from "@/components/Common/DoctorAvailability";

export default function ViewProfile({ doctorData }) {
    const router = useRouter();
    const isMobile = useIsMobile();
    const [openIndex, setOpenIndex] = useState(null);
    const [open, setOpen] = useState(false);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!doctorData) {
        return (
            <div className="flex flex-row justify-center items-center mt-20 mb-4 gap-2">
                <div className="w-8 h-8 border-2 border-pink-700 border-t-transparent rounded-full animate-spin"></div>
                <div className="text-pink-700 text-lg font-medium animate-pulse">
                    Loading docotr details...
                </div>
            </div>
        );
    }

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Doctors", href: "/find-doctor/" },
        { label: doctorData?.name },
    ];

    return (
        <>
            <Head>
                <title>{doctorData?.seoTitle}</title>
                <meta name="description" content={doctorData?.metaDescription} />
                <meta name="keywords" content={doctorData?.metaKeywords} />
            </Head>
            {/* PC VIEW */}
            {isMobile ? (
                <div className="font-inter -mt-6">
                    {/* TOP SECTION */}
                    <section className="w-full bg-[#f4f4f4] py-4 px-3">
                        <Breadcrumb items={breadcrumbItems} />
                        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6 mt-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            {/* Image Container with Watermark */}
                            <div className="relative w-32 h-32 mb-4 z-10">
                                <img
                                    src={doctorData?.image}
                                    alt={doctorData?.name}
                                    className="relative z-10 w-56 rounded-sm object-cover"
                                />
                            </div>

                            <div className="flex-1 w-full text-center">
                                <h1 className="text-2xl font-bold text-[#b01752]">{doctorData?.name}</h1>
                                <p className="text-black font-bold mt-1 text-sm">{doctorData?.designation}</p>
                                <p className="text-gray-500 text-sm mt-1 whitespace-pre-line">
                                    {doctorData.qualification}
                                </p>

                                <div className="flex justify-center mt-3">
                                    <span className="bg-pink-100 text-[#b01752] px-3 py-1 rounded text-sm font-bold">
                                        Experience : {doctorData?.experience}
                                    </span>
                                </div>

                                <div className="mt-3 w-full max-w-sm mx-auto">
                                    <DoctorAvailability doctorId={doctorData?.id} />
                                </div>

                                <div className="flex justify-center gap-6 mt-3 text-sm">
                                    <div>
                                        <p className="text-gray-400">Speciality</p>
                                        <p className="text-[#b01752] font-semibold">{doctorData?.department}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400">Location</p>
                                        <p className="text-[#b01752] font-semibold">{doctorData?.location}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 mt-5">
                                    <button
                                        onClick={() => setOpen(true)}
                                        className="bg-[#b01752] text-white px-6 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#901342] transition"
                                    >
                                        <FaCalendarAlt />
                                        Book Appointment
                                    </button>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => window.open("tel:9144514459", "_self")}
                                            className="flex-1 bg-[#b01752] text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#901342] transition"
                                        >
                                            <FaPhoneAlt />
                                            Call
                                        </button>
                                        <button
                                            onClick={() => window.open("https://wa.me/919144514459", "_blank")}
                                            className="flex-1 bg-[#b01752] text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#901342] transition"
                                        >
                                            <FaWhatsapp />
                                            Whatsapp
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <DoctorDetails doctorData={doctorData} />

                    {/* FAQ */}
                    <div className="rounded-2xl px-2 mt-4 mb-2">
                        <h2 className="text-xl text-center font-bold mb-2 text-pink-700"> Frequently Asked Questions (FAQs)</h2>
                        <FAQSchema faqs={doctorData?.faqs} />
                        <div className="text-gray-700 leading-relaxed">
                            <div className="space-y-2">
                                {doctorData?.faqs.map((faq, idx) => (
                                    <div key={idx}>
                                        <button
                                            onClick={() => toggleFAQ(idx)}
                                            className={`w-full flex justify-between items-center px-3 py-2 rounded-full border text-left transition
                  ${openIndex === idx
                                                    ? "bg-pink-700 text-white font-medium"
                                                    : "border-pink-600 text-pink-700 hover:bg-pink-50"
                                                }`}
                                        >
                                            <span className="text-sm">{faq.question}</span>
                                            <svg
                                                className={`w-5 h-5 transform transition-transform ${openIndex === idx ? "rotate-180" : ""
                                                    }`}
                                                fill="none"
                                                alt="Image"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </button>

                                        {openIndex === idx && (
                                            <div className="px-3 py-1 text-sm bg-gray-50 text-gray-700 rounded-full">
                                                <p dangerouslySetInnerHTML={{ __html: faq.description }} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mt-6 font-inter">

                    {/* TOP SECTION */}
                    <section className="w-full bg-[#f4f4f4] py-8 px-3">
                        <Breadcrumb items={breadcrumbItems} />
                        <div className="max-w-6xl mx-auto flex flex-row items-start gap-2 mt-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <div className="relative w-64 h-64 z-10">
                                <img
                                    src={doctorData?.image}
                                    alt={doctorData?.name}
                                    className="relative z-10 w-56 rounded-sm object-cover"
                                />
                            </div>

                            <div className="flex-1">
                                <h1 className="text-4xl font-bold text-[#b01752]">{doctorData?.name}</h1>
                                <p className="text-black font-bold mt-2 text-lg">{doctorData?.designation}</p>
                                <p className="text-gray-500 mt-1 whitespace-pre-line text-sm">
                                    {doctorData.qualification}
                                </p>

                                <div className="mt-2">
                                    <span className="bg-pink-50 text-[#b01752] px-4 py-1.5 rounded-md text-base font-bold inline-block">
                                        Experience : {doctorData?.experience}
                                    </span>
                                </div>

                                <div className="mt-3 max-w-sm">
                                    <DoctorAvailability doctorId={doctorData?.id} />
                                </div>

                                <div className="flex gap-12 mt-2">
                                    <div>
                                        <p className="text-gray-400 text-sm">Speciality</p>
                                        <p className="text-[#b01752] font-semibold text-lg">{doctorData?.department}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Location</p>
                                        <p className="text-[#b01752] font-semibold text-lg">{doctorData?.location}</p>
                                    </div>
                                </div>

                                <div className="flex flex-row gap-4 mt-6">
                                    <button
                                        onClick={() => setOpen(true)}
                                        className="bg-[#b01752] text-white px-8 py-3 rounded-lg font-bold flex items-center gap-3 hover:bg-[#901342] transition shadow-sm text-base"
                                    >
                                        <FaCalendarAlt size={18} />
                                        Book Appointment
                                    </button>
                                    <button
                                        onClick={() => window.open("tel:9144514459", "_self")}
                                        className="bg-[#b01752] text-white px-8 py-3 rounded-lg font-bold flex items-center gap-3 hover:bg-[#901342] transition shadow-sm text-base"
                                    >
                                        <FaPhoneAlt size={18} />
                                        Call
                                    </button>
                                    <button
                                        onClick={() => window.open("https://wa.me/919144514459", "_blank")}
                                        className="bg-[#b01752] text-white px-8 py-3 rounded-lg font-bold flex items-center gap-3 hover:bg-[#901342] transition shadow-sm text-base"
                                    >
                                        <FaWhatsapp size={20} />
                                        Whatsapp
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <DoctorDetails doctorData={doctorData} />

                    {/* FAQ */}
                    <div className="rounded-2xl px-12 mt-8 mb-4">
                        <h2 className="text-3xl text-center font-bold mb-4 text-pink-700"> Frequently Asked Questions (FAQs)</h2>
                        <FAQSchema faqs={doctorData?.faqs} />
                        <div className="text-gray-700 leading-relaxed">
                            <div className="space-y-4">
                                {doctorData?.faqs.map((faq, idx) => (
                                    <div key={idx}>
                                        <button
                                            onClick={() => toggleFAQ(idx)}
                                            className={`w-full flex justify-between items-center px-6 py-4 rounded-full border text-left transition
                  ${openIndex === idx
                                                    ? "bg-pink-700 text-white font-medium"
                                                    : "border-pink-600 text-pink-700 hover:bg-pink-50"
                                                }`}
                                        >
                                            <span>{faq.question}</span>
                                            <svg
                                                className={`w-5 h-5 transform transition-transform ${openIndex === idx ? "rotate-180" : ""
                                                    }`}
                                                fill="none"
                                                alt="Image"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </button>

                                        {openIndex === idx && (
                                            <div className="px-6 py-4 bg-gray-50 text-gray-700 rounded-full">
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
            {open && <AppointmentModal doctorData={doctorData} closeModal={() => setOpen(false)} />}
        </>
    );
}