import React from "react";
import { FaHeartbeat } from "react-icons/fa";

const MONTH_NAMES = [
    "", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const MONTH_SHORT = [
    "", "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];

export default function MonthCard({ monthNum, events = [], topDescription = "", bottomQuote = "" }) {
    const monthName = MONTH_NAMES[monthNum] || `Month ${monthNum}`;
    const monthShort = MONTH_SHORT[monthNum] || "JAN";

    const padZero = (numStr) => String(numStr).padStart(2, "0");

    const formatEventDate = (event) => {
        if (event.spansFullMonth) {
            const daysInMonth = new Date(2026, monthNum, 0).getDate();
            return `${monthShort} 01–${daysInMonth}`;
        }
        if (event.startDate && event.endDate && event.startDate !== event.endDate) {
            const startDay = padZero(event.startDate.split("-")[2]);
            const endDay = padZero(event.endDate.split("-")[2]);
            return `${monthShort} ${startDay}–${endDay}`;
        }
        if (event.startDate) {
            const day = padZero(event.startDate.split("-")[2]);
            return `${monthShort} ${day}`;
        }
        return monthShort;
    };

    const cleanTitle = (title = "") => {
        return title.replace(/\s*2026\b/gi, "").trim();
    };

    return (
        <div id={`month-card-${monthNum}`} className="scroll-mt-36 w-full bg-white rounded-3xl border border-pink-100/80 shadow-xs overflow-hidden mb-8 transition-all duration-300">

            {/* Top Header Box */}
            <div className="bg-[#fdf2f4] p-6 sm:p-8 border-b border-pink-100/60">
                <div className="flex items-center justify-between gap-4 mb-3">
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#221727]">
                        {monthName}
                    </h2>
                    <span className="bg-[#fce4ec] text-[#c22055] font-semibold text-xs sm:text-sm px-3.5 py-1 rounded-full whitespace-nowrap">
                        {events.length} {events.length === 1 ? "observance" : "observances"}
                    </span>
                </div>
                {topDescription && (
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-4xl">
                        {topDescription}
                    </p>
                )}
            </div>

            {/* Middle Events List Grid */}
            <div className="p-4 sm:p-6 bg-white">
                {events.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                        {events.map((evt, idx) => (
                            <div
                                key={evt.eventId || idx}
                                className="group flex items-center gap-3.5 px-3 py-2 rounded-full hover:bg-[#fcf0f3] transition-all duration-200 cursor-pointer"
                            >
                                {/* Date Pill Badge */}
                                <div className="bg-[#fde8ed] text-[#c22055] group-hover:bg-[#c22055] group-hover:text-white font-bold text-xs tracking-wide px-3.5 py-1.5 rounded-full whitespace-nowrap shrink-0 transition-all duration-200">
                                    {formatEventDate(evt)}
                                </div>
                                {/* Event Content */}
                                <div className="flex flex-col min-w-0">
                                    <h3 className="text-sm sm:text-base font-semibold text-[#221727] group-hover:text-[#1a0f1d] leading-snug transition-colors duration-200 truncate sm:whitespace-normal">
                                        {cleanTitle(evt.title)}
                                    </h3>
                                    {evt.note && (
                                        <span className="text-xs text-gray-500 font-normal mt-0.5">
                                            {evt.note}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400 italic text-sm py-2 px-3">
                        No health observances listed for {monthName}.
                    </p>
                )}
            </div>

            {/* Bottom Quote Box */}
            {bottomQuote && (
                <div className="bg-[#fdf2f4] px-6 sm:px-8 py-4 border-t border-pink-100/60 flex items-center gap-3">
                    <FaHeartbeat className="text-[#c22055] text-lg shrink-0" />
                    <p className="text-[#c22055] italic text-xs sm:text-sm font-medium leading-snug">
                        {bottomQuote}
                    </p>
                </div>
            )}

        </div>
    );
}
