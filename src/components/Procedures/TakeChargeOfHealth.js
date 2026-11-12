import React from "react";
import sanitize from "@/utils/sanitize";
import { FaPhoneAlt } from "react-icons/fa";

const TakeChargeOfHealth = ({ data, openModal }) => {
    if (!data || data.length === 0) return null;

    const content = data[0];

    return (
        <div className="max-w-7xl mx-auto md:px-12 px-4 py-4 font-inter">
            <div className="bg-[#B92B4B] rounded-3xl p-8 md:p-6 text-center text-white shadow-xl">
                {/* Heading */}
                <h2 className="text-2xl md:text-4xl font-bold mb-1">
                    {content.heading}
                </h2>

                {/* Description */}
                {content.description && (
                    <div
                        className="text-white/90 text-base md:text-lg leading-relaxed mb-2 max-w-4xl mx-auto space-y-4"
                        dangerouslySetInnerHTML={{
                            __html: sanitize(content.description)
                        }}
                    />
                )}

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                        href="tel:+919144514459"
                        className="flex items-center justify-center gap-2 bg-white text-[#B92B4B] font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition shadow-sm w-full sm:w-auto"
                    >
                        <FaPhoneAlt size={16} />
                        +919144514459
                    </a>
                    <button
                        onClick={openModal}
                        className="bg-white text-[#B92B4B] font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition shadow-sm w-full sm:w-auto"
                    >
                        Book Appointment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TakeChargeOfHealth;
