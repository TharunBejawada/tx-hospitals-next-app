import React from "react";
import sanitize from "@/utils/sanitize";
import { FaPhoneAlt } from "react-icons/fa";

const TypesOfProcedures = ({ data, openModal }) => {
    if (!data || data.length === 0) return null;

    const content = data[0];

    return (
        <div className="max-w-7xl mx-auto md:px-12 px-4 py-4 font-inter">
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-3">
                {content.heading?.split(' ').map((word, index, arr) => (
                    arr.length > 3 && index >= arr.length - 3 // Highlight last 3 words or adjust logic as needed
                        ? <span key={index} className="text-[#C23358]">{word} </span>
                        : <span key={index}>{word} </span>
                ))}
            </h2>

            {/* Top Description */}
            {content.topDescription && (
                <div
                    className="text-gray-700 text-center text-base md:text-lg mb-5 leading-relaxed max-w-4xl mx-auto"
                    dangerouslySetInnerHTML={{
                        __html: sanitize(content.topDescription)
                    }}
                />
            )}

            {/* Types Grid */}
            {content.types && content.types.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-5">
                    {content.types.map((type, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-4">
                            <h3 className="text-lg font-bold text-black mb-2">{type.name}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{type.description}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Bottom Description */}
            {content.bottomDescription && (
                <div
                    className="text-gray-700 text-center text-base leading-relaxed mb-6 max-w-5xl mx-auto"
                    dangerouslySetInnerHTML={{
                        __html: sanitize(content.bottomDescription)
                    }}
                />
            )}

            {/* Call to Action Banner */}
            <div className="bg-[#FFF0F3] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#C23358] mb-2">
                        Ready to Schedule Your Procedure?
                    </h3>
                    <p className="text-black font-medium">
                        Our team is here to answer your questions and guide you through the process.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <a
                        href="tel:+919144514459"
                        className="flex items-center justify-center gap-2 border-2 border-[#C23358] text-[#C23358] font-bold py-3 px-6 rounded-lg hover:bg-[#C23358] hover:text-white transition"
                    >
                        <FaPhoneAlt size={16} />
                        +91 9144514459
                    </a>
                    <button
                        onClick={openModal}
                        className="bg-[#C23358] text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-800 transition shadow-md"
                    >
                        Book Appointment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TypesOfProcedures;
