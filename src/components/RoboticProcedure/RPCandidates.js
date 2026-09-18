"use client";
import React from "react";
import sanitize from "@/utils/sanitize";
import useIsMobile from "@/hooks/useIsMobile";

const RPCandidates = ({ data }) => {
    const isMobile = useIsMobile();

    if (!data || data.length === 0) return null;

    const { heading, description } = data[0];

    return (
        <section className="py-12 px-6 md:px-12 font-inter bg-white">
            <div className="container mx-auto max-w-7xl">
                <div className="lg:flex lg:items-center lg:gap-16 bg-[#fdf2f5] rounded-3xl p-8 md:p-12 shadow-[0_4px_30px_rgba(176,42,68,0.06)] border border-pink-100/50 overflow-hidden relative">
                    {/* Floating Background Glow */}
                    <div className="absolute top-[-50px] left-[-30px] w-64 h-64 bg-pink-100 rounded-full blur-[80px] opacity-40 pointer-events-none" />

                    <div className="lg:w-2/5 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
                        {/* Icon/Icon Placeholder */}
                        <div className="mb-6 w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                            <svg alt="Icon" className="w-8 h-8 text-[#b02a44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                            {heading}
                        </h2>
                    </div>

                    <div className="lg:w-3/5 z-10">
                        <div
                            className="prose prose-pink max-w-none text-gray-700 text-base md:text-[17px] leading-relaxed 
                            [&_ul]:space-y-3 [&_li]:flex [&_li]:items-start [&_li]:gap-3 [&_li:before]:content-none
                            [&_li]:list-none
                            [&_li]:font-medium
                            [&_li]:text-gray-700"
                        >
                            {/* Manual hack for list bullets since API returns <ul> */}
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: sanitize(description).replace(/<li>/g, `<li><span class="text-[#b02a44] font-bold text-xl leading-none mt-1">✓</span><span>`)
                                        .replace(/<\/li>/g, `</span></li>`)
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RPCandidates;
