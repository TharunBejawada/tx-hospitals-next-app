import React from "react";

const SERVICES = [
    {
        number: "01",
        title: "Online Medical Consultations",
    },
    {
        number: "02",
        title: "Medical Second Opinion",
    },
    {
        number: "03",
        title: "Visa Invitation Letter Assistance",
    },
    {
        number: "04",
        title: "Airport Pickup & Transfer Assistance",
    },
    {
        number: "05",
        title: "Accommodation Assistance",
    },
    {
        number: "06",
        title: "Dedicated International Patient Coordinator",
    },
    {
        number: "07",
        title: "Language & Interpreter Assistance",
    },
    {
        number: "08",
        title: "Priority Appointment Coordination",
    },
    {
        number: "09",
        title: "Insurance & Payment Guidance",
    },
    {
        number: "10",
        title: "Comfortable Inpatient Facilities",
    },
    {
        number: "11",
        title: "Special Dietary & Cultural Requirements",
    },
    {
        number: "12",
        title: "Post-Treatment Follow-Up",
    },
];

export default function IPServicesSection() {
    return (
        <section
            className="w-full bg-[#FCF9FA] py-8 sm:py-10 md:py-12"
            aria-labelledby="ip-services-heading"
        >
            <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-12 mb-6 sm:mb-8">
                    {/* Left: Tag + Title */}
                    <div className="max-w-xl">
                        <span
                            className="inline-block text-xs sm:text-sm font-bold uppercase tracking-[0.08em] text-[#BD2850] mb-3"
                            style={{ letterSpacing: "0.08em" }}
                        >
                            WHAT WE OFFER
                        </span>
                        <h2
                            id="ip-services-heading"
                            className="text-[#1F1A1C] font-extrabold text-3xl sm:text-4xl md:text-[42px] leading-[1.15]"
                            style={{
                                fontFamily: '"Plus Jakarta Sans", Inter, sans-serif',
                                letterSpacing: "-0.02em",
                            }}
                        >
                            Our International Patient Services
                        </h2>
                    </div>

                    {/* Right: Description Paragraph */}
                    <div className="max-w-xl">
                        <p className="text-[15px] sm:text-[16px] leading-relaxed text-[#5B4F53]">
                            At TX Hospitals, we understand that travelling to another country
                            for medical treatment can feel overwhelming. Our international patient
                            services are designed to make the experience easier, from planning
                            your visit to returning home after treatment.
                        </p>
                    </div>
                </div>

                {/* 12 Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    {SERVICES.map((service) => (
                        <div
                            key={service.number}
                            className="group bg-white rounded-2xl p-4 sm:p-5 border border-[#F1E8EB] shadow-[0_2px_8px_rgba(31,26,28,0.04)] hover:shadow-md hover:border-[#BD2850]/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3.5 sm:gap-4"
                        >
                            {/* Number Badge */}
                            <div
                                className="w-11 h-11 rounded-xl bg-[#FEF2F5] text-[#BD2850] font-bold text-sm sm:text-base flex items-center justify-center shrink-0 group-hover:bg-[#BD2850] group-hover:text-white transition-colors duration-200"
                                aria-hidden="true"
                            >
                                {service.number}
                            </div>

                            {/* Service Title */}
                            <h3 className="text-[14.5px] sm:text-[15px] font-semibold text-[#1F1A1C] leading-snug">
                                {service.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

