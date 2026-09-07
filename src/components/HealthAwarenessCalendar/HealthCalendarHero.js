import React from "react";
import { FaRegCalendarAlt, FaStethoscope } from "react-icons/fa";

export default function HealthCalendarHero({ year = "2026", onExploreClick, onBookClick }) {
    return (
        <section className="w-full bg-gradient-to-b from-[#fdf2f4] via-[#fcf5f7] to-white py-14 md:py-20 px-4 flex flex-col items-center justify-center text-center">
            <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">

                {/* 1. Pill Badge */}
                <div className="inline-flex items-center gap-2 bg-[#fde8ed] border border-[#f7c2ce] px-4 py-1.5 rounded-full shadow-xs">
                    <FaRegCalendarAlt className="text-[#b01752] text-xs md:text-sm" />
                    <span className="text-[11px] md:text-xs font-semibold text-[#b01752] tracking-wider uppercase">
                        HEALTH AWARENESS CALENDAR · {year}
                    </span>
                </div>

                {/* 2. Main Title */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#221727] tracking-tight">
                    World Health Days <span className="text-[#c22055]">{year}</span>
                </h1>

                {/* 3. Italic Subtitle Quote */}
                <p className="text-lg sm:text-xl md:text-2xl italic text-[#6d4554] max-w-2xl">
                    “Every health day is a reminder to take better care of yourself.”
                </p>

                {/* 4. Description Paragraph */}
                <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-3xl leading-relaxed">
                    Health awareness is about knowing your body, understanding common health problems and taking care of yourself before small issues become serious. Explore the calendar below and learn something important for your health every month.
                </p>

                {/* 5. CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                    <button
                        onClick={onExploreClick}
                        className="w-full sm:w-auto bg-[#c22055] hover:bg-[#9f1642] text-white px-7 py-3 rounded-full font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
                    >
                        <FaRegCalendarAlt className="text-base" />
                        <span>Explore Health Days</span>
                    </button>

                    <button
                        onClick={onBookClick}
                        className="w-full sm:w-auto bg-white border-2 border-[#f3b9c5] hover:bg-pink-50 text-[#c22055] px-7 py-3 rounded-full font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xs transition-all duration-200 active:scale-95"
                    >
                        <FaStethoscope className="text-base text-[#c22055]" />
                        <span>Book a Health Check-up</span>
                    </button>
                </div>

            </div>
        </section>
    );
}
