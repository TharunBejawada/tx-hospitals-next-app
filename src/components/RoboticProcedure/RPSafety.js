"use client";
import React from "react";
import sanitize from "@/utils/sanitize";
import useIsMobile from "@/hooks/useIsMobile";

const RPSafety = ({ data }) => {
    const isMobile = useIsMobile();

    if (!data || data.length === 0) return null;

    const { heading, description } = data[0];

    return (
        <section className="py-14 px-6 md:px-12 font-inter bg-white overflow-hidden">
            <div className="container mx-auto max-w-7xl">
                <div className="bg-[#b02a44] rounded-[48px] p-8 md:p-14 md:flex md:items-center md:gap-14 shadow-[0_22px_70px_-15px_rgba(176,42,68,0.25)] relative overflow-hidden">
                    {/* Abstract safety icon background shadow */}
                    <div className="absolute top-[-50px] right-[-30px] w-96 h-96 bg-white/5 rounded-full blur-[60px] pointer-events-none" />

                    <div className="md:w-1/3 text-center md:text-left z-10 mb-8 md:mb-0">
                        <div className="inline-flex mb-8 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md items-center justify-center">
                            <svg alt="Icon" className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                            {heading}
                        </h2>
                    </div>

                    <div className="md:w-2/3 z-10">
                        <div
                            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-10 text-white text-[16px] md:text-[18px] leading-relaxed 
                            [&_p]:mb-6 last:[&_p]:mb-0 [&_strong]:text-pink-100 [&_ul]:space-y-4 [&_li]:flex [&_li]:items-center [&_li]:gap-4 [&_li:before]:content-['🛡️']"
                            dangerouslySetInnerHTML={{ __html: sanitize(description) }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RPSafety;
