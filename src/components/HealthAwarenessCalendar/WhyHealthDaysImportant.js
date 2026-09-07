import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";

const BENEFITS = [
    "Understand common diseases and their warning signs",
    "Go for preventive health screenings",
    "Learn about risk factors and healthy lifestyle choices",
    "Talk openly about conditions that may carry stigma",
    "Support patients and families living with chronic illnesses",
    "Understand when medical attention may be needed",
    "Make informed decisions about your health",
    "Encourage organ and blood donation",
    "Promote vaccination and infection prevention"
];

export default function WhyHealthDaysImportant() {
    return (
        <section className="w-full bg-[#fdf2f4] py-14 md:py-20 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10 md:mb-12 max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#221727] tracking-tight mb-4">
                        Why Are World Health Days Important?
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                        Health awareness days do more than create conversations. Sometimes, simply knowing what symptoms to watch for can help someone seek medical attention sooner.
                    </p>
                </div>

                {/* 3x3 Grid of Benefit Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                    {BENEFITS.map((text, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-pink-100/60 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
                        >
                            <FaRegCheckCircle className="text-[#c22055] text-xl sm:text-2xl shrink-0 group-hover:scale-110 transition-transform duration-200" />
                            <span className="text-sm sm:text-base font-medium text-[#221727] leading-snug">
                                {text}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
