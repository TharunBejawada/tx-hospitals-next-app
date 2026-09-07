import React, { useEffect } from "react";

const MONTHS = [
    { num: 1, short: "Jan", full: "January" },
    { num: 2, short: "Feb", full: "February" },
    { num: 3, short: "Mar", full: "March" },
    { num: 4, short: "Apr", full: "April" },
    { num: 5, short: "May", full: "May" },
    { num: 6, short: "Jun", full: "June" },
    { num: 7, short: "Jul", full: "July" },
    { num: 8, short: "Aug", full: "August" },
    { num: 9, short: "Sep", full: "September" },
    { num: 10, short: "Oct", full: "October" },
    { num: 11, short: "Nov", full: "November" },
    { num: 12, short: "Dec", full: "December" },
];

export default function MonthSelector({ selectedMonth, onSelectMonth }) {
    useEffect(() => {
        if (selectedMonth) {
            const btn = document.getElementById(`month-pill-${selectedMonth}`);
            if (btn) {
                btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
            }
        }
    }, [selectedMonth]);

    return (
        <div className="w-full bg-[#fcf4f6]/60 py-4 px-4 border-y border-pink-100 sticky top-[70px] z-20 backdrop-blur-md">
            <div className="max-w-6xl mx-auto flex items-center justify-start md:justify-center gap-2 overflow-x-auto no-scrollbar py-1 px-2">
                <button
                    onClick={() => onSelectMonth(null)}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${selectedMonth === null
                        ? "bg-[#c22055] text-white shadow-sm"
                        : "bg-white text-gray-700 hover:bg-pink-50 border border-pink-100"
                        }`}
                >
                    All Months
                </button>
                {MONTHS.map((m) => {
                    const isActive = selectedMonth === m.num;
                    return (
                        <button
                            id={`month-pill-${m.num}`}
                            key={m.num}
                            onClick={() => onSelectMonth(m.num)}
                            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${isActive
                                ? "bg-[#c22055] text-white shadow-sm"
                                : "bg-white text-gray-700 hover:bg-pink-[#fdf2f4] border border-pink-100"
                                }`}
                        >
                            {m.short}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
