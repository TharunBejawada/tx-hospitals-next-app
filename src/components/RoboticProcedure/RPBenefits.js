"use client";
import React from "react";
import sanitize from "@/utils/sanitize";
import useIsMobile from "@/hooks/useIsMobile";

const CheckIcon = () => (
    <svg alt="Check Icon"
        className="w-5 h-5 flex-shrink-0 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
    >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12l3 3 5-5" />
    </svg>
);

const RPBenefits = ({ data }) => {
    const isMobile = useIsMobile();

    if (!data || data.length === 0) return null;

    const { heading, topDescription, lines, bottomDescription } = data[0];

    if (isMobile) {
        return (
            <section className="py-4 px-4 font-inter bg-[#b02a44]">
                {/* Heading */}
                <h2 className="text-[22px] leading-tight font-bold text-white text-center mb-3">
                    {heading}
                </h2>

                {/* Top description */}
                {topDescription && (
                    <div
                        className="text-pink-100 text-[13px] text-center leading-relaxed mb-5 [&_p]:mb-0 [&_strong]:font-semibold [&_strong]:text-white"
                        dangerouslySetInnerHTML={{ __html: sanitize(topDescription) }}
                    />
                )}

                {/* Benefits list — 1 column on mobile */}
                <div className="grid grid-cols-1 gap-3 mb-6">
                    {lines.map((line, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <CheckIcon />
                            <span className="text-white text-[14px] font-medium">{line}</span>
                        </div>
                    ))}
                </div>

                {/* Bottom description */}
                {bottomDescription && (
                    <div
                        className="text-pink-100 text-[12px] text-center leading-relaxed [&_p]:mb-0 [&_strong]:font-semibold [&_strong]:text-white"
                        dangerouslySetInnerHTML={{ __html: sanitize(bottomDescription) }}
                    />
                )}
            </section>
        );
    }

    // Desktop
    return (
        <section className="py-6 px-6 md:px-12 font-inter bg-[#b02a44]">
            <div className="container mx-auto max-w-6xl">
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
                    {heading}
                </h2>

                {/* Top description */}
                {topDescription && (
                    <div
                        className="text-pink-100 text-base text-center leading-relaxed mb-8 max-w-3xl mx-auto [&_p]:mb-0 [&_strong]:font-semibold [&_strong]:text-white"
                        dangerouslySetInnerHTML={{ __html: sanitize(topDescription) }}
                    />
                )}

                {/* Benefits grid — 2 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 mb-10 max-w-4xl mx-auto">
                    {lines.map((line, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <CheckIcon />
                            <span className="text-white text-base md:text-[17px] font-medium">{line}</span>
                        </div>
                    ))}
                </div>

                {/* Bottom description */}
                {bottomDescription && (
                    <div
                        className="text-pink-100 text-sm md:text-base text-center leading-relaxed max-w-4xl mx-auto [&_p]:mb-0 [&_strong]:font-semibold [&_strong]:text-white"
                        dangerouslySetInnerHTML={{ __html: sanitize(bottomDescription) }}
                    />
                )}
            </div>
        </section>
    );
};

export default RPBenefits;
