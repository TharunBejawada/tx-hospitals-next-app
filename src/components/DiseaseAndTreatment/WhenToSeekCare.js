import React from "react";
import { FaPhoneAlt } from "react-icons/fa";

const WhenToSeekCare = ({ data, openModal }) => {
    if (!data || data.length === 0) return null;

    const content = data[0];

    return (
        <div className="max-w-7xl mx-auto md:px-12 px-4 py-8 font-inter">
            <div className="bg-[#FFF0F3] border border-pink-100 rounded-2xl px-6 py-10 md:px-12 flex flex-col items-center text-center gap-4">
                {/* Static section heading */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    When to Seek Emergency Care ?
                </h2>

                {/* Body text — from API heading field */}
                {content.heading && (
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-3xl">
                        {content.heading}
                    </p>
                )}

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                    <a
                        href="tel:+919144514459"
                        className="flex items-center justify-center gap-2 border border-[#C23358] text-[#C23358] font-semibold px-6 py-2.5 rounded-lg hover:bg-pink-50 transition text-sm"
                    >
                        <FaPhoneAlt size={13} />
                        +91 9144514459
                    </a>
                    <button
                        onClick={openModal}
                        className="bg-[#C23358] hover:bg-pink-800 text-white font-semibold px-6 py-2.5 rounded-lg shadow-sm hover:shadow-md transition transform active:scale-95 text-sm"
                    >
                        Book Appointment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WhenToSeekCare;
