"use client";
import React from "react";
import sanitize from "@/utils/sanitize";
import useIsMobile from "@/hooks/useIsMobile";

const RPBooking = ({ data, onBookNow }) => {
    const isMobile = useIsMobile();

    if (!data || data.length === 0) return null;

    const { heading, description } = data[0];

    return (
        <section className="py-14 px-6 md:px-12 font-inter bg-[#b02a44] overflow-hidden text-center text-white">
            <div className="container mx-auto max-w-7xl relative z-10">
                <h2 className="text-3xl md:text-[44px] font-bold mb-8 leading-tight">
                    {heading}
                </h2>
                {description && (
                    <div
                        className="text-white/90 text-[16px] md:text-[20px] max-w-6xl mx-auto leading-relaxed mb-10 font-normal space-y-4"
                        dangerouslySetInnerHTML={{ __html: sanitize(description) }}
                    />
                )}

                <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                    <a
                        href="tel:9144514459"
                        className="bg-white text-gray-900 px-8 py-3 rounded-[8px] text-[15px] font-bold flex items-center gap-3 hover:bg-gray-100 transition-all shadow-md w-full sm:w-auto justify-center"
                    >
                        <svg alt="Icon" className="w-5 h-5 text-[#b02a44]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
                        </svg>
                        9144514459
                    </a>
                    <button
                        onClick={onBookNow}
                        className="bg-white text-[#b02a44] px-8 py-3 rounded-[8px] text-[15px] font-bold hover:bg-gray-100 transition-all shadow-md w-full sm:w-auto"
                    >
                        Book Appointment
                    </button>
                </div>
            </div>
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none" />
        </section>
    );
};

export default RPBooking;
