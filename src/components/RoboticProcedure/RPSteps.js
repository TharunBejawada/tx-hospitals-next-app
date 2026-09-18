"use client";
import React from "react";
import sanitize from "@/utils/sanitize";
import useIsMobile from "@/hooks/useIsMobile";

const RPSteps = ({ data, onBookNow }) => {
    const isMobile = useIsMobile();

    if (!data || data.length === 0) return null;

    const { heading, topDescription, items, bottomDescription } = data[0];

    // Remove duplicates or empty title/description
    const filteredItems = items.filter(item => (item.title && item.title.trim() !== "") || (item.description && item.description.trim() !== ""));

    // Extract duration from bottomDescription if it exists
    const durationText = bottomDescription ? bottomDescription.replace(/<\/?[^>]+(>|$)/g, "").replace("Total duration:", "").trim() : "";

    return (
        <section className="py-8 px-4 md:px-12 font-inter bg-[#b02a44] overflow-hidden">
            <div className="container mx-auto max-w-5xl">
                {/* Header */}
                <div className="text-center mb-14">
                    <h2 className="text-[28px] md:text-[38px] leading-tight font-bold text-white">
                        {heading}
                    </h2>
                    {topDescription && (
                        <div
                            className="text-pink-100 text-base md:text-lg mt-4 max-w-3xl mx-auto font-normal opacity-90"
                            dangerouslySetInnerHTML={{ __html: sanitize(topDescription) }}
                        />
                    )}
                </div>

                {/* Steps Container */}
                <div className="relative mb-8">
                    {/* Vertical line connector - centered behind numbers */}
                    <div className="absolute left-[36px] md:left-[44px] top-6 bottom-6 w-[4px] bg-white/30" />

                    <div className="space-y-4">
                        {filteredItems.map((item, index) => (
                            <div key={index} className="flex items-center gap-4 md:gap-8 relative bg-white rounded-[10px] p-4 md:p-6 shadow-md transition-transform hover:scale-[1.01] duration-300">
                                {/* Number Box - Square rounded */}
                                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-[8px] bg-[#f9cfd8] flex items-center justify-center z-10 font-bold text-xl md:text-2xl text-[#b02a44]">
                                    {index + 1}
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="text-[17px] md:text-[19px] font-bold text-gray-900 mb-1">
                                        {item.title.replace(/^\d+[\.\s]*/, '')}
                                    </h3>
                                    <p className="text-gray-700 text-[13px] md:text-[15px] leading-relaxed font-normal">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Section - Duration & Actions */}
                <div className="bg-[#fff1f3] rounded-[15px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="flex-shrink-0">
                            <svg alt="Icon" className="w-10 h-10 text-[#b02a44]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20z" strokeOpacity="0.1" fill="currentColor" fillOpacity="0.05" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-[#b02a44] text-[22px] md:text-[28px] font-bold leading-none mb-2">Procedure Duration</h4>
                            <p className="text-gray-900 font-bold text-[14px] md:text-[16px]">
                                {durationText}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                        <a
                            href="tel:9144514459"
                            className="flex items-center justify-center gap-2 border-[1.5px] border-[#b02a44]/30 text-[#b02a44] px-6 py-2.5 rounded-[8px] text-[14px] font-semibold hover:bg-white transition-all bg-transparent w-full sm:w-auto"
                        >
                            <svg alt="Icon" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1zM19 12h2c0-4.8-3.9-9-9-9v2c3.9 0 7 3.1 7 7zm-4 0h2c0-2.8-2.2-5-5-5v2c1.7 0 3 1.3 3 3z" />
                            </svg>
                            9144514459
                        </a>
                        <button
                            onClick={onBookNow}
                            className="bg-[#b02a44] hover:bg-[#8f1f33] text-white px-8 py-3 rounded-[8px] text-[14px] font-semibold transition-all shadow-lg w-full sm:w-auto"
                        >
                            Book Appointment
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RPSteps;
