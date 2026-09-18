"use client";
import React from "react";
import sanitize from "@/utils/sanitize";
import useIsMobile from "@/hooks/useIsMobile";

const RPCosts = ({ data, onBookNow }) => {
    const isMobile = useIsMobile();

    if (!data || data.length === 0) return null;

    const { heading, topDescription, lines, bottomDescription } = data[0];

    // Split heading to highlight procedure in pink
    const splitWord = "Cost";
    const parts = heading.split(splitWord);
    const highlightedPart = parts[0] || "";
    const remainingPart = splitWord + (parts[1] || "");

    return (
        <section className="py-6 px-6 md:px-12 font-inter bg-white overflow-hidden">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-[38px] leading-tight font-bold text-gray-900 mb-6">
                        <span className="text-[#b02a44]">{highlightedPart}</span>
                        {remainingPart}
                    </h2>
                    {topDescription && (
                        <div
                            className="text-gray-900 text-[15px] md:text-[18px] max-w-4xl mx-auto leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: sanitize(topDescription) }}
                        />
                    )}
                </div>

                {/* Factors contributing to cost — 3 columns on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 mb-12 max-w-5xl mx-auto">
                    {lines.map((line, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div className="flex-shrink-0">
                                <svg alt="Location Icon" className="w-5 h-5 text-[#b02a44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-gray-900 font-bold text-[14px] md:text-[16px]">
                                {line}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Bottom cost range section */}
                {bottomDescription && (
                    <div className="bg-[#fff1f3] rounded-[10px] p-8 md:p-10 text-center flex flex-col items-center gap-6 shadow-sm">
                        <div
                            className="text-gray-900 text-[14px] md:text-[16px] font-bold leading-relaxed max-w-5xl 
                            [&_strong]:text-[#b02a44] [&_strong]:font-bold"
                            dangerouslySetInnerHTML={{ __html: sanitize(bottomDescription) }}
                        />
                        <button
                            onClick={onBookNow}
                            className="bg-[#b02a44] hover:bg-[#8f1f33] text-white px-8 py-2.5 rounded-[8px] text-[14px] font-semibold transition-all shadow-md"
                        >
                            Book Appointment
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default RPCosts;
