"use client";

import { useState } from "react";
import BookAppointmentForm from "@/components/Blogs/BookAppointemntForm";
import SecondOpinionForm from "./SecondOpinionForm";

export default function SecondOpinionHero({
    opinionType = "FREE SECOND",
    badgeText = "FREE SECOND OPINION",
    title = "Your Health Decision Deserves the Right Second Opinion",
    subtitle = "Get expert evaluation, accurate diagnosis and the right treatment guidance from our senior specialists."
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Dynamic horizontal features configuration matching the mockup icons exactly
    const features = [
        {
            title: "Senior Specialists",
            desc: "with 20+ Years of Experience",
            icon: "♙"
        },
        {
            title: "Accurate Diagnosis",
            desc: "& Personalised Treatment Plan",
            icon: "盾"
        },
        {
            title: "Quick Appointments",
            desc: "& Faster Report Review",
            icon: "◷"
        },
        {
            title: "Confidential",
            desc: "& Secure Consultation",
            icon: "▤"
        }
    ];

    return (
        <section className="relative w-full overflow-hidden bg-[#fafafa]/50 py-10 md:py-16 font-inter">
            {/* Soft decorative background gradients */}
            <div className="absolute top-[-10%] right-[-10%] w-[350px] h-[350px] bg-pink-100/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-blue-100/10 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">

                    {/* Left Column (Copy & Features: Spans 7 Cols) */}
                    <div className="lg:col-span-7 lg:pr-10 flex flex-col justify-center text-left">
                        {/* Opinion Badge */}
                        <div className="inline-block self-start mb-5">
                            <span className="bg-[#b01640] text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded tracking-widest uppercase font-montserrat shadow-sm">
                                {badgeText}
                            </span>
                        </div>

                        {/* Main Title heading exactly as requested */}
                        <h1 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold font-montserrat text-[#222222] leading-[1.15] tracking-tight">
                            Your Health Decision Deserves the Right <span className="text-[#b01640]">{opinionType} Opinion</span>
                        </h1>

                        {/* Description */}
                        <p className="text-sm md:text-base text-gray-600 font-inter mt-5 mb-8 leading-relaxed max-w-xl">
                            {subtitle}
                        </p>

                        {/* Horizontal Bullet points strip exactly as in mockup */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 w-full">
                            {features.map((item, index) => (
                                <div key={index} className="flex flex-col items-start text-left font-inter">
                                    {/* Icon Container */}
                                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-pink-50/50 mb-3 border border-pink-100/30 text-2xl font-bold text-[#b01640] select-none">
                                        {item.icon}
                                    </div>
                                    <span className="text-xs md:text-[13px] font-bold text-gray-900 leading-tight">
                                        {item.title}
                                    </span>
                                    <span className="text-[10px] md:text-[11px] text-gray-500 font-medium leading-tight mt-1">
                                        {item.desc}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons Row */}
                        <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
                            {/* Call button exactly matching brand color */}
                            <a
                                href="tel:9144514459"
                                className="bg-[#b01640] hover:bg-[#8b1232] text-white flex items-center justify-center gap-2 rounded-lg font-bold font-montserrat text-sm tracking-wider px-4 py-2.5 transition-all transform active:scale-95 shadow-md hover:shadow-lg w-full sm:w-auto uppercase"
                            >
                                <svg alt="Icon" className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                Call Now
                            </a>

                            {/* Book Appointment popup trigger matching the requested popup style */}
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="border-2 border-[#b01640] hover:bg-[#b01640]/5 text-[#b01640] flex items-center justify-center gap-2 rounded-lg font-bold font-montserrat text-sm tracking-wider px-4 py-2.5 transition-all w-full sm:w-auto uppercase"
                            >
                                <svg alt="Icon" className="w-4 h-4 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Book Appointment
                            </button>

                            {/* Chat on WhatsApp button */}
                            <a
                                href={`https://wa.me/919144514459?text=${encodeURIComponent("Hello! I would like to get a Second Opinion consultation at TX Hospitals. Please help me book an appointment.")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border-2 border-[#25D366] hover:bg-[#25D366]/5 text-[#25D366] flex items-center justify-center gap-2 rounded-lg font-bold font-montserrat text-sm tracking-wider px-4 py-2.5 transition-all w-full sm:w-auto uppercase"
                            >
                                {/* WhatsApp SVG icon */}
                                <svg alt="Contact Icon" className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Chat on WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* Right Column (Form: Spans 5 Cols) */}
                    <div className="lg:col-span-5 flex justify-center items-center w-full mt-8 lg:mt-0">
                        <SecondOpinionForm opinionType={opinionType} />
                    </div>

                </div>
            </div>

            {/* Popup form modal matching free consultation modal */}
            {isModalOpen && (
                <BookAppointmentForm
                    showModal={isModalOpen}
                    setShowModal={setIsModalOpen}
                    redirectUrl="/thank-you/"
                    defaultLocation="TX Hospitals Second Opinion"
                />
            )}
        </section>
    );
}
