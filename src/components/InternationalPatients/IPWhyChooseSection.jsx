import React from "react";

const WHY_CHOOSE_ITEMS = [
    {
        number: "01",
        title: "Experienced Medical Specialists",
        description: "Our skilled doctors provide quality care across different medical specialities.",
    },
    {
        number: "02",
        title: "Advanced Medical Facilities",
        description: "Modern technology helps us provide accurate diagnosis and effective treatment.",
    },
    {
        number: "03",
        title: "Patient-Centred Approach",
        description: "We provide personalised care based on each patient's health needs.",
    },
    {
        number: "04",
        title: "Transparent Treatment Guidance",
        description: "We clearly explain treatment options, hospital stays and estimated costs.",
    },
    {
        number: "05",
        title: "Dedicated International Support",
        description: "Our team assists international patients from their first enquiry to follow-up care.",
    },
    {
        number: "06",
        title: "Comprehensive Healthcare Services",
        description: "We offer consultations, tests, treatments and recovery care under one roof.",
    },
    {
        number: "07",
        title: "Affordable Treatment Options",
        description: "We provide quality medical care at reasonable and transparent costs.",
    },
    {
        number: "08",
        title: "Compassionate Care",
        description: "We treat every patient with kindness, respect and personal attention.",
    },
];

export default function IPWhyChooseSection() {
    return (
        <section
            className="w-full bg-[#181315] text-white py-8 sm:py-10 md:py-12"
            aria-labelledby="why-choose-heading"
        >
            <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="max-w-2xl mb-6 sm:mb-8">
                    <span
                        className="inline-block text-xs sm:text-sm font-bold uppercase tracking-[0.08em] text-[#FF5C7A] mb-3"
                        style={{ letterSpacing: "0.08em" }}
                    >
                        WHY CHOOSE TX HOSPITALS?
                    </span>
                    <h2
                        id="why-choose-heading"
                        className="text-white font-extrabold text-3xl sm:text-4xl md:text-[44px] leading-[1.15]"
                        style={{
                            fontFamily: '"Plus Jakarta Sans", Inter, sans-serif',
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Accessible, reliable and personalised healthcare for every patient.
                    </h2>
                </div>

                {/* 8 Features Grid with subtle borders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    {WHY_CHOOSE_ITEMS.map((item) => (
                        <div
                            key={item.number}
                            className="bg-[#181315] p-6 sm:p-7 md:p-8 flex flex-col justify-start hover:bg-[#20191C] transition-colors duration-200"
                        >
                            {/* Coral Number */}
                            <span className="text-[#FF5C7A] font-bold text-sm sm:text-base font-mono mb-4 tracking-wider">
                                {item.number}
                            </span>

                            {/* Feature Title */}
                            <h3 className="text-white font-bold text-[17px] sm:text-[18px] leading-snug mb-2.5">
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-[#BDB2B5]">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

