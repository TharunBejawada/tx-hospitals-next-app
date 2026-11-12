import React from "react";
import sanitize from "@/utils/sanitize";
import { FaCheckCircle, FaPhoneAlt } from "react-icons/fa";

const HowProcedurePerformed = ({ data, openModal, durationData }) => {
    if (!data || data.length === 0) return null;

    const content = data[0];
    const durationContent = durationData && durationData.length > 0 ? durationData[0] : null;

    return (
        <section className="bg-[#B92B4B] py-12 font-inter text-white">
            <div className="max-w-6xl mx-auto px-4">
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                    {content.heading}
                </h2>

                {/* Description */}
                {content.description && (
                    <div
                        className="text-center text-white/90 text-lg mb-12"
                        dangerouslySetInnerHTML={{
                            __html: sanitize(content.description)
                        }}
                    />
                )}

                {/* Stages List */}
                <div className="space-y-6 relative">
                    {/* Vertical Line (Hidden on mobile for cleaner look if preferred, or keep it) */}
                    <div className="hidden md:block absolute left-[27px] top-6 bottom-6 w-1 bg-pink-300/50 rounded-full"></div>

                    {content.stages && content.stages.map((stage, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-6 relative z-10">

                            {/* Number Badge (Left) */}
                            <div className="hidden md:flex flex-shrink-0 w-14 h-14 bg-[#F2C0CC] text-[#B92B4B] rounded-lg items-center justify-center font-bold text-2xl shadow-sm border-4 border-[#B92B4B]">
                                {index + 1}
                            </div>

                            {/* Content Card (Right) */}
                            <div className="flex-1 bg-white text-gray-800 rounded-xl p-6 md:p-8 shadow-lg">
                                <div className="flex items-center gap-4 mb-4">
                                    {/* Mobile Number Badge */}
                                    <div className="md:hidden flex flex-shrink-0 w-10 h-10 bg-[#F2C0CC] text-[#B92B4B] rounded-lg items-center justify-center font-bold text-xl">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-black">
                                        {stage.name.replace(/^\d+\.\s*/, '')} {/* Remove existing numbering if present in name */}
                                    </h3>
                                </div>

                                {stage.lines && stage.lines.length > 0 && (
                                    <ul className="space-y-3">
                                        {stage.lines.map((line, lineIndex) => (
                                            <li key={lineIndex} className="flex gap-3 items-start">
                                                <FaCheckCircle className="text-[#B92B4B] min-w-[20px] mt-1" size={18} />
                                                <span className="text-gray-700 font-medium leading-relaxed">{line}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Call to Action (similar to image footer) */}
                <div className="mt-6 bg-[#FFF0F3] rounded-2xl p-6 md:p-4 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-900">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-[#B92B4B] mb-2 flex items-center gap-2">
                            {durationContent?.heading || "Procedure Duration"}
                        </h3>
                        {durationContent?.description ? (
                            <div
                                className="font-medium text-gray-700"
                                dangerouslySetInnerHTML={{
                                    __html: sanitize(durationContent.description)
                                }}
                            />
                        ) : (
                            <p className="font-medium text-gray-700">
                                The procedure varies by complexity. Contact us for detailed duration estimates.
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href="tel:+919144514459"
                            className="flex items-center justify-center gap-2 border-2 border-[#B92B4B] text-[#B92B4B] font-bold py-3 px-6 rounded-lg hover:bg-[#B92B4B] hover:text-white transition"
                        >
                            <FaPhoneAlt size={16} />
                            +919144514459
                        </a>
                        <button
                            onClick={openModal}
                            className="bg-[#B92B4B] text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-800 transition shadow-md"
                        >
                            Book Appointment
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HowProcedurePerformed;
