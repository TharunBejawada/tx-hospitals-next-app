"use client";
import React from "react";
import sanitize from "@/utils/sanitize";
import useIsMobile from "@/hooks/useIsMobile";

const RPHeader = ({ data, onBookNow }) => {
    const isMobile = useIsMobile();

    if (!data) return null;

    const { rpTitle, rpDescription, rpBadge, rpImage } = data;

    // Split title to highlight the last word (typically location like "Hyderabad")
    const titleWords = rpTitle ? rpTitle.split(" ") : [];
    const lastWord = titleWords.pop();
    const titleStart = titleWords.join(" ");

    const bgStyle = rpImage
        ? { backgroundImage: `url(${rpImage})` }
        : {};

    if (isMobile) {
        return (
            <div className="relative w-full pt-2 bg-white">
                {/* Image / Gradient Section */}
                <div
                    className="relative w-full h-[280px] overflow-hidden flex items-end"
                    style={
                        rpImage
                            ? {
                                backgroundImage: `url(${rpImage})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }
                            : {
                                background:
                                    "linear-gradient(135deg, #1a1a2e 0%, #2d1b3e 40%, #3d2059 70%, #1f0d2a 100%)",
                            }
                    }
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />

                    {/* Badge */}
                    {rpBadge && (
                        <div className="absolute top-4 left-4 z-10">
                            <span className="inline-block bg-white/15 backdrop-blur-sm border border-white/30 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full">
                                {rpBadge}
                            </span>
                        </div>
                    )}

                    {/* Title overlay at bottom */}
                    <div className="relative z-10 px-4 pb-5 w-full">
                        <h1 className="text-[24px] leading-tight font-bold drop-shadow-lg">
                            <span className="text-white">{titleStart} </span>
                            <span className="text-[#e83e6c]">{lastWord}</span>
                        </h1>
                    </div>
                </div>

                {/* Content Section */}
                <div className="px-4 py-5 bg-white">
                    <div
                        className="text-gray-700 text-[14px] leading-relaxed font-normal mb-5"
                        dangerouslySetInnerHTML={{
                            __html: sanitize(rpDescription),
                        }}
                    />

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={onBookNow}
                            className="flex items-center justify-center gap-2 bg-[#b02a44] hover:bg-[#8f1f33] text-white px-6 py-3 rounded-lg font-semibold text-[14px] transition-all duration-300 shadow-lg"
                        >
                            Schedule for Appointment
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-white border-2 border-[#b02a44] text-[#b02a44] hover:bg-pink-50 px-6 py-3 rounded-lg font-semibold text-[14px] transition-all duration-300">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Desktop version
    return (
        <div
            className="relative w-full min-h-[420px] flex items-center overflow-hidden"
            style={
                rpImage
                    ? {
                        backgroundImage: `url(${rpImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }
                    : {
                        background:
                            "linear-gradient(135deg, #1a1a2e 0%, #2d1b3e 40%, #3d2059 70%, #1f0d2a 100%)",
                    }
            }
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-12 py-16 flex flex-col justify-center">
                <div className="max-w-2xl">
                    {/* Badge */}
                    {rpBadge && (
                        <div className="mb-4">
                            <span className="inline-block bg-white/15 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold px-4 py-2 rounded-full">
                                {rpBadge}
                            </span>
                        </div>
                    )}

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
                        <span className="text-white">{titleStart} </span>
                        <span className="text-[#e83e6c]">{lastWord}</span>
                    </h1>

                    {/* Description */}
                    <div
                        className="text-gray-200 text-base md:text-lg leading-relaxed mb-8 font-normal"
                        dangerouslySetInnerHTML={{
                            __html: sanitize(rpDescription),
                        }}
                    />

                    {/* Buttons */}
                    <div className="flex flex-row gap-4">
                        <button
                            onClick={onBookNow}
                            className="bg-[#b02a44] hover:bg-[#8f1f33] text-white px-7 py-2.5 rounded-lg font-semibold text-base transition-all duration-300 shadow-lg transform hover:-translate-y-0.5"
                        >
                            Schedule for Appointment
                        </button>
                        <button className="bg-white/10 backdrop-blur-sm border-2 border-white/50 text-white hover:bg-white/20 px-7 py-2.5 rounded-lg font-semibold text-base transition-all duration-300 transform hover:-translate-y-0.5">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RPHeader;
