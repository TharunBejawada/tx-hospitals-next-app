import React from "react";
import sanitize from "@/utils/sanitize";
import { FaPhoneAlt } from "react-icons/fa";

const DiagnosisDT = ({ data, openModal }) => {
    if (!data || data.length === 0) return null;

    const content = data[0];

    return (
        <div className="max-w-7xl mx-auto md:px-12 px-4 py-8 font-inter">
            {/* Pink outer container for the entire section */}
            <div className="bg-[#C23358] rounded-2xl p-6 md:p-10 shadow-lg">

                {/* Heading — white, centered */}
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white mb-4 leading-snug">
                    {content.heading}
                </h2>

                {/* Top Description — white text */}
                {content.topDescription && (
                    <div
                        className="text-white text-center text-base md:text-lg mb-8 leading-relaxed max-w-5xl mx-auto opacity-90"
                        dangerouslySetInnerHTML={{
                            __html: sanitize(content.topDescription),
                        }}
                    />
                )}

                {/* 3-column cards grid */}
                {content.items && content.items.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
                        {content.items.map((item, index) => {
                            // Strip leading number like "1.\t" from title
                            const cleanTitle = item.title.replace(/^\d+\.\s*/, "").trim();

                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl p-6 flex flex-col gap-3 shadow-md"
                                >
                                    <div className="flex items-center gap-3 mb-1">
                                        {/* Number badge */}
                                        <div className="w-8 h-8 rounded-lg bg-pink-100 text-[#C23358] text-base font-bold flex items-center justify-center flex-shrink-0">
                                            {index + 1}
                                        </div>
                                        {/* Title */}
                                        <h3 className="text-base font-bold text-gray-900 leading-snug">
                                            {cleanTitle}
                                        </h3>
                                    </div>
                                    {/* Description */}
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Bottom bar — light pink background */}
                {content.bottomDescription && (
                    <div className="bg-[#FFF0F3] rounded-xl px-6 py-5 flex flex-col lg:flex-row items-center justify-between gap-6 mt-4">
                        <div
                            className="text-gray-900 text-sm md:text-base leading-relaxed max-w-3xl [&_strong]:text-[#C23358] [&_a]:text-[#C23358] [&_a]:font-semibold [&_a]:underline text-center lg:text-left"
                            dangerouslySetInnerHTML={{
                                __html: sanitize(content.bottomDescription),
                            }}
                        />
                        <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
                            <a
                                href="tel:+919144514459"
                                className="flex items-center justify-center gap-2 border border-[#C23358] text-[#C23358] bg-transparent font-semibold px-6 py-2.5 rounded-lg hover:bg-pink-50 transition text-sm whitespace-nowrap"
                            >
                                <FaPhoneAlt size={12} />
                                +91 9144514459
                            </a>
                            <button
                                onClick={openModal}
                                className="bg-[#C23358] hover:bg-pink-800 text-white font-semibold px-6 py-2.5 rounded-lg shadow-sm hover:shadow-md transition transform active:scale-95 text-sm whitespace-nowrap"
                            >
                                Book Appointment
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiagnosisDT;
