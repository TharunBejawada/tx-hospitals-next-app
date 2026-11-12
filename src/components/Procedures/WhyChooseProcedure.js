import React from "react";
import sanitize from "@/utils/sanitize";
import { FaCheckCircle, FaPhoneAlt } from "react-icons/fa";

const WhyChooseProcedure = ({ data, openModal }) => {
    if (!data || data.length === 0) return null;

    const content = data[0];

    // Helper to highlight "TX Hospitals" in the heading
    const getHighlightedHeading = (heading) => {
        if (!heading) return null;
        const parts = heading.split(/(TX Hospitals)/g);
        return (
            <>
                {parts.map((part, index) =>
                    part === "TX Hospitals" ? (
                        <span key={index} className="text-[#C23358]">
                            {part}
                        </span>
                    ) : (
                        <span key={index}>{part}</span>
                    )
                )}
            </>
        );
    };

    return (
        <div className="max-w-7xl mx-auto md:px-12 px-4 py-4 font-inter">
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-3">
                {getHighlightedHeading(content.heading)}
            </h2>

            {/* Top Description */}
            {content.topDescription && (
                <div
                    className="text-gray-700 text-center text-base md:text-lg mb-5 leading-relaxed max-w-5xl mx-auto"
                    dangerouslySetInnerHTML={{
                        __html: sanitize(content.topDescription)
                    }}
                />
            )}

            {/* Lines Grid */}
            {content.lines && content.lines.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6 max-w-6xl mx-auto">
                    {content.lines.map((line, index) => (
                        <div key={index} className="flex gap-3 items-start">
                            <FaCheckCircle className="text-[#C23358] min-w-[20px] mt-1" size={18} />
                            <span className="text-gray-800 font-medium leading-relaxed">{line}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Bottom Call to Action Banner */}
            <div className="bg-[#FFF0F3] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="w-full md:w-2/3">
                    {content.bottomDescription && (
                        <div
                            className="text-gray-800 font-medium leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: sanitize(content.bottomDescription)
                            }}
                        />
                    )}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                    <a
                        href="tel:+919144514459"
                        className="flex items-center justify-center gap-2 border-2 border-[#C23358] text-[#C23358] font-bold py-3 px-6 rounded-lg hover:bg-[#C23358] hover:text-white transition bg-white"
                    >
                        <FaPhoneAlt size={16} />
                        +91 9144514459
                    </a>
                    <button
                        onClick={openModal}
                        className="bg-[#C23358] text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-800 transition shadow-md whitespace-nowrap"
                    >
                        Book Appointment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseProcedure;
