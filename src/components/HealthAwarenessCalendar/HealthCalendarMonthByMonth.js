import React, { useState } from "react";
import MonthSelector from "./MonthSelector";
import MonthCard from "./MonthCard";

const MONTH_DESCRIPTIONS = {
    1: {
        top: "A new year is a good time to pay attention to preventive health, regular screenings and conditions that may otherwise go unnoticed.",
        bottom: "Start the year by putting your health on your priority list."
    },
    2: {
        top: "February highlights several conditions where early diagnosis, better awareness and timely medical care can make a meaningful difference.",
        bottom: "Know the signs. Ask questions. Get checked when something does not feel right."
    },
    3: {
        top: "From hearing and kidney health to obesity, tuberculosis and oral health, March brings attention to several important areas of healthcare.",
        bottom: "A simple health check today can sometimes prevent a bigger problem tomorrow."
    },
    4: {
        top: "April reminds us that good health involves the whole body — from the brain and liver to immunity, infection prevention and emotional well-being.",
        bottom: "Your health deserves attention before symptoms become serious."
    },
    5: {
        top: "Breathing problems, blood pressure changes, thyroid symptoms and digestive concerns can sometimes be easy to ignore. May encourages people to understand these conditions better.",
        bottom: "Small symptoms can sometimes be your body asking for attention."
    },
    6: {
        top: "June focuses on several important health topics including brain health, cancer awareness, blood donation, men's health and healthy living.",
        bottom: "Healthy habits matter at every age."
    },
    7: {
        top: "July is a reminder to care for your doctors, your brain, your liver and your everyday health.",
        bottom: "Do not wait for illness to make health a priority."
    },
    8: {
        top: "August brings attention to some powerful healthcare conversations including organ donation, lung cancer, breastfeeding and overdose awareness.",
        bottom: "One informed decision can sometimes change or even save a life."
    },
    9: {
        top: "September focuses on nutrition, women's health, emergency care, patient safety, brain health and heart health.",
        bottom: "Your body often gives warning signs. Knowing them can help you act sooner."
    },
    10: {
        top: "October brings awareness to several common and serious health conditions affecting the brain, bones, joints, spine, skin and overall well-being.",
        bottom: "Do not ignore persistent pain, unusual symptoms or sudden changes in your health."
    },
    11: {
        top: "November encourages people to pay closer attention to cancer prevention, diabetes, respiratory health, newborn care and infection control.",
        bottom: "Regular screening and timely medical advice can make a real difference."
    },
    12: {
        top: "December reminds us of the importance of inclusive healthcare, infection awareness, digestive health and access to quality medical care.",
        bottom: "Take what you have learned this year and turn it into healthier choices for the year ahead."
    }
};

export default function HealthCalendarMonthByMonth({ events = [], year = "2026" }) {
    const [selectedMonth, setSelectedMonth] = useState(null);

    const handleSelectMonth = (monthNum) => {
        setSelectedMonth(monthNum);

        if (monthNum === null) {
            const topEl = document.getElementById("calendar-events-section");
            if (topEl) {
                topEl.scrollIntoView({ behavior: "smooth" });
            }
            return;
        }

        const cardEl = document.getElementById(`month-card-${monthNum}`);
        if (cardEl) {
            const yOffset = -130; // Offset for sticky navbar + month selector bar
            const y = cardEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    // Group events by month (1 to 12)
    const eventsByMonth = {};
    for (let m = 1; m <= 12; m++) {
        eventsByMonth[m] = events.filter((e) => e.month === m);
    }

    // Always render all 12 months for smooth scrolling navigation
    const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
        <section className="w-full bg-[#fdf8f9]/50 pb-16">
            {/* Sticky Month Selector Bar */}
            <MonthSelector
                selectedMonth={selectedMonth}
                onSelectMonth={handleSelectMonth}
            />

            <div className="max-w-6xl mx-auto px-4 pt-10">
                {/* Section Header */}
                <div className="text-center mb-10 max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#221727] tracking-tight mb-3">
                        The {year} Calendar, Month by Month
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                        Throughout the year, World Health Days and Awareness Months focus on heart health, cancer, diabetes, kidney care, mental health, women’s health, child health and more.
                    </p>
                </div>

                {/* Month Cards Container */}
                <div className="flex flex-col gap-4">
                    {allMonths.map((mNum) => {
                        const monthEvents = eventsByMonth[mNum] || [];
                        const desc = MONTH_DESCRIPTIONS[mNum] || {};

                        return (
                            <MonthCard
                                key={mNum}
                                monthNum={mNum}
                                events={monthEvents}
                                topDescription={desc.top || ""}
                                bottomQuote={desc.bottom || ""}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
