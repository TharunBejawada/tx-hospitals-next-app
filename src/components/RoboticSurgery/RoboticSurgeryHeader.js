"use client";
import React from "react";
import useIsMobile from "@/hooks/useIsMobile";
import sanitize from "@/utils/sanitize";
import Breadcrumb from "@/components/Common/Breadcrumb";

const RoboticSurgeryHeader = ({ data, onBookNow }) => {
    const isMobile = useIsMobile();

    if (!data) return null;

    const { rsTitle, rsDescription, rsImage } = data;

    if (isMobile) {
        // Smart title splitting - find the last occurrence of common location indicators
        const splitIndicators = [' in ', ' - ', ' at '];
        let titlePart1 = rsTitle;
        let titlePart2 = '';

        for (const indicator of splitIndicators) {
            const lastIndex = rsTitle.toLowerCase().lastIndexOf(indicator.toLowerCase());
            if (lastIndex !== -1) {
                titlePart1 = rsTitle.substring(0, lastIndex);
                titlePart2 = rsTitle.substring(lastIndex);
                break;
            }
        }

        return (
            <div className="relative w-full pt-2 bg-white">
                <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                    <Breadcrumb items={[
                        { label: "Home", href: "/" },
                        { label: "Specialities", href: "/specialities/" },
                        { label: rsTitle }
                    ]} />
                </div>
                {/* Image Section with Overlay Title */}
                <div className="relative w-full h-[320px] overflow-hidden">
                    <img
                        src={rsImage}
                        alt={rsTitle}
                        className="w-full h-full object-cover"
                    />
                    {/* Gradient Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white/60"></div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 px-4 pb-6">
                        <h1 className="text-[28px] leading-tight font-bold drop-shadow-lg">
                            <span className="text-pink-700">{titlePart1}</span>
                            <span className="text-gray-900">{titlePart2}</span>
                        </h1>
                    </div>
                </div>

                {/* Content Section */}
                <div className="px-4 py-5 bg-white">
                    {/* Description */}
                    <div
                        className="text-gray-800 text-[15px] leading-relaxed font-normal mb-5"
                        dangerouslySetInnerHTML={{
                            __html: sanitize(rsDescription)
                        }}
                    />

                    {/* Buttons */}
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={onBookNow}
                            className="flex items-center justify-center gap-3 bg-pink-700 hover:bg-pink-800 text-white px-6 py-3.5 rounded-xl font-semibold text-base transition-all duration-300 shadow-lg"
                        >
                            <img
                                src="/assets/surgeries/live-transplant/Book an Appointment  Icon 3.webp"
                                alt="Calendar"
                                className="w-6 h-6 object-contain brightness-0 invert"
                            />
                            Book Consultation
                        </button>

                        <a
                            href="tel:9144514459"
                            className="flex items-center justify-center gap-3 bg-white border-2 border-pink-700 text-pink-700 hover:bg-pink-50 px-6 py-3.5 rounded-xl font-semibold text-base transition-all duration-300 shadow-md"
                        >
                            <img
                                src="/assets/surgeries/live-transplant/Call Icon 3.webp"
                                alt="Phone"
                                className="w-5 h-5 object-contain"
                            />
                            Call 9144 51 4459
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    // Desktop version
    return (
        <div className="relative w-full h-[500px] overflow-hidden flex items-center">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url(${rsImage})` }}
            >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-12 flex flex-col justify-center h-full">
                <div className="max-w-xl">
                    <div className="mb-4">
                        <Breadcrumb items={[
                            { label: "Home", href: "/" },
                            { label: "Specialities", href: "/specialities/" },
                            { label: rsTitle }
                        ]} />
                    </div>
                    <h1 className="text-5xl font-bold text-pink-700 mb-4 leading-tight">
                        {rsTitle}
                    </h1>

                    <div
                        className="text-gray-800 text-lg mb-8 leading-relaxed font-medium"
                        dangerouslySetInnerHTML={{
                            __html: sanitize(rsDescription)
                        }}
                    />

                    <div className="flex flex-row gap-4">
                        <button
                            onClick={onBookNow}
                            className="flex items-center justify-center gap-3 bg-pink-700 hover:bg-pink-800 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-lg transform hover:-translate-y-1 group"
                        >
                            <div className="p-2 transition-colors">
                                <img
                                    src="/assets/surgeries/live-transplant/Book an Appointment  Icon 3.webp"
                                    alt="Calendar"
                                    className="w-6 h-6 object-contain brightness-0 invert"
                                />
                            </div>
                            Book Consultation
                        </button>

                        <a
                            href="tel:9144514459"
                            className="flex items-center justify-center gap-3 bg-white border-2 border-pink-700 text-pink-700 hover:bg-pink-50 px-6 py-2.5 rounded-lg font-bold transition-all duration-300 shadow-md transform hover:-translate-y-1 group"
                        >
                            <div className="p-2 rounded-lg transition-colors">
                                <img
                                    src="/assets/surgeries/live-transplant/Call Icon 3.webp"
                                    alt="Phone"
                                    className="w-5 h-5 object-contain"
                                />
                            </div>
                            Call 9144 51 4459
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoboticSurgeryHeader;
