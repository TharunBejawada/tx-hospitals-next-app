import React from "react";
import sanitize from "@/utils/sanitize";
import { FaPhoneAlt } from "react-icons/fa";

const TakeFirstStepDT = ({ data, openModal }) => {
    if (!data || data.length === 0) return null;

    const content = data[0];

    return (
        <div className="max-w-7xl mx-auto md:px-12 px-4 py-8 font-inter">
            {/* Pink Container */}
            <div className="bg-[#C23358] rounded-2xl p-8 md:p-12 text-center shadow-md">

                {/* Heading */}
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 leading-snug">
                    {content.heading}
                </h2>

                {/* Description */}
                {content.description && (
                    <div
                        className="text-white text-base md:text-lg mb-8 leading-relaxed max-w-5xl mx-auto opacity-95 [&_a]:text-white [&_a]:underline [&_a]:font-bold [&_strong]:font-bold"
                        dangerouslySetInnerHTML={{
                            __html: sanitize(content.description),
                        }}
                    />
                )}

                {/* Buttons Container */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    {/* Phone Button */}
                    <a
                        href="tel:+919144514459"
                        className="flex items-center justify-center gap-2 bg-white text-[#C23358] font-semibold px-6 py-2.5 rounded-lg shadow-sm hover:bg-gray-50 transition text-sm whitespace-nowrap"
                    >
                        <FaPhoneAlt size={12} />
                        +91-9144514459
                    </a>

                    {/* Book Appointment Button */}
                    <button
                        onClick={openModal}
                        className="bg-white text-[#C23358] font-semibold px-6 py-2.5 rounded-lg shadow-sm hover:bg-gray-50 transition transform active:scale-95 text-sm whitespace-nowrap"
                    >
                        Book Appointment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TakeFirstStepDT;
