import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import useIsMobile from "@/hooks/useIsMobile";
import Breadcrumb from "@/components/Common/Breadcrumb";
import DoctorDetails from "@/components/Doctors/DoctorDetails";
import DoctorBlogs from "@/components/Doctors/DoctorBlogs";
import DoctorFAQAndLocation from "@/components/Doctors/DoctorFAQAndLocation";
import AppointmentModal from "@/components/Doctors/AppointmentModal";
import { FaCalendarAlt, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import DoctorAvailability from "@/components/Common/DoctorAvailability";

export default function ViewProfile({ doctorData }) {
    const router = useRouter();
    const isMobile = useIsMobile();
    const [open, setOpen] = useState(false);

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
                <div className="font-inter">
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

                    {/* Department Blogs */}
                    <DoctorBlogs department={doctorData?.department} doctorName={doctorData?.name} />

                    {/* FAQ & Location Section */}
                    <DoctorFAQAndLocation doctorData={doctorData} />
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

                    {/* Department Blogs */}
                    <DoctorBlogs department={doctorData?.department} doctorName={doctorData?.name} />

                    {/* FAQ & Location Section */}
                    <DoctorFAQAndLocation doctorData={doctorData} />
                </div>
            )}
            {open && <AppointmentModal doctorData={doctorData} closeModal={() => setOpen(false)} />}
        </>
    );
}