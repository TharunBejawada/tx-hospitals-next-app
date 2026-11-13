import React from "react";
import Link from "next/link";

const SPECIALTIES = [
    {
        name: "Transplant Surgery",
        path: "/specialities/transplant-medicine/",
        iconPath: "M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z M12 9v6 M9 12h6",
    },
    {
        name: "Robotic Surgery",
        path: "/specialities/robotics-science/",
        iconPath: "M12 8V4H8 M4 8h16v12H4z M2 14h2 M20 14h2 M9 13v2 M15 13v2",
    },
    {
        name: "Cardiology",
        path: "/specialities/cardiac-sciences/",
        iconPath: "M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z M3.2 12H9l.5-1 2 4.5 2-7 1.5 3.5h5.3",
    },
    {
        name: "Cardiothoracic and Vascular Surgery",
        path: "/specialities/cardiothoracic-and-vascular-surgery-hospitals/",
        iconPath: "M22 12h-4l-3 9L9 3l-3 9H2",
    },
    {
        name: "Neurology",
        path: "/specialities/neuro-sciences/",
        iconPath: "M12 5a3 3 0 1 0-6 .1 4 4 0 0 0-2.5 5.8 4 4 0 0 0 .6 6.6A4 4 0 1 0 12 18z M12 5a3 3 0 1 1 6 .1 4 4 0 0 1 2.5 5.8 4 4 0 0 1-.6 6.6A4 4 0 1 1 12 18z M12 5v13",
    },
    {
        name: "Gastroenterology",
        path: "/specialities/gastro-sciences/",
        iconPath: "M9 3v4a4 4 0 0 0 4 4h1a5 5 0 0 1 5 5 5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-1",
    },
    {
        name: "Nephrology",
        path: "/specialities/nephrology/",
        iconPath: "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7z",
    },
    {
        name: "Urology",
        path: "/specialities/urology/",
        iconPath: "M9 3h6 M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3 M7 15h10",
    },
    {
        name: "Orthopaedics",
        path: "/specialities/orthopaedics/",
        iconPath: "M17 10c.7-.7 1.7 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .8.7 1.8 0 2.5l-7 7c-.7.7-1.7 0-2.5 0a2.5 2.5 0 0 0 0 5c.3 0 .5.2.5.5a2.5 2.5 0 1 0 5 0c0-.8-.7-1.8 0-2.5z",
    },
    {
        name: "Pulmonology",
        path: "/specialities/pulmonology/",
        iconPath: "M12 4v8 M12 12c-2-2-4-2-5 0l-3 6c-.6 1.3.3 3 2 3 2.2 0 4-1.8 4-4v-3 M12 12c2-2 4-2 5 0l3 6c.6 1.3-.3 3-2 3-2.2 0-4-1.8-4-4v-3",
    },
    {
        name: "Mother & Child Care",
        path: "/specialities/mother-child-care/",
        iconPath: "M12 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0z M3 21v-2a6 6 0 0 1 9-5.2 M19 13a2 2 0 1 1-4 0 2 2 0 0 1 4 0z M14 21v-1a3 3 0 0 1 6 0v1",
    },
    {
        name: "Oncology",
        path: "/specialities/oncology/",
        iconPath: "M12 3c-2 0-3 1.5-3 3.5 0 2.5 3 6 3 6s3-3.5 3-6C15 4.5 14 3 12 3z M9.5 10 5 20l3-1 1.5 3L12 13 M14.5 10 19 20l-3-1-1.5 3L12 13",
    },
    {
        name: "ENT",
        path: "/specialities/ent/",
        iconPath: "M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0 M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4",
    },
    {
        name: "Internal Medicine",
        path: "/specialities/internal-medicine/",
        iconPath: "M5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 12 0V4a2 2 0 0 0-2-2h-1 M8 15v1a6 6 0 0 0 12 0v-4 M22 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0z",
    },
];

export default function IPSpecialtiesSection() {
    return (
        <section
            className="w-full bg-white py-8 sm:py-10 md:py-12"
            aria-labelledby="our-specialties-heading"
        >
            <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6 sm:mb-8">
                    <div className="max-w-2xl">
                        <span
                            className="inline-block text-xs sm:text-sm font-bold uppercase tracking-[0.08em] text-[#BD2850] mb-2"
                            style={{ letterSpacing: "0.08em" }}
                        >
                            OUR SPECIALTIES
                        </span>
                        <h2
                            id="our-specialties-heading"
                            className="text-[#1F1A1C] font-extrabold text-3xl sm:text-4xl md:text-[40px] leading-[1.18] mb-3"
                            style={{
                                fontFamily: '"Plus Jakarta Sans", Inter, sans-serif',
                                letterSpacing: "-0.02em",
                            }}
                        >
                            Every specialty works together to deliver integrated, patient-focused care.
                        </h2>
                        <p className="text-[15px] sm:text-[16px] leading-relaxed text-[#5B4F53]">
                            Each department follows global treatment protocols supported by advanced diagnostics and experienced clinical teams.
                        </p>
                    </div>

                    {/* Explore Specialities CTA Button */}
                    <div className="lg:self-end shrink-0">
                        <Link
                            href="/specialities/"
                            className="inline-flex items-center justify-center min-h-[46px] px-6 py-2.5 rounded-full border-[1.5px] border-[#BD2850] text-[#BD2850] hover:bg-[#BD2850] hover:text-white font-semibold text-sm transition-all duration-200 active:scale-95 shadow-sm"
                        >
                            Explore Our Specialities
                        </Link>
                    </div>
                </div>

                {/* 14 Specialties Grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                        gap: "14px",
                    }}
                >
                    {SPECIALTIES.map((spec) => (
                        <Link
                            key={spec.name}
                            href={spec.path}
                            className="group flex items-center justify-between gap-3 p-4 rounded-[14px] bg-[#FBF5F7] hover:bg-[#F6E9ED] border border-transparent hover:border-[#BD2850]/20 hover:shadow-sm transition-all duration-200 text-left cursor-pointer"
                        >
                            {/* Left: Icon + Name */}
                            <span className="flex items-center gap-3.5 min-w-0">
                                <span
                                    className="flex-shrink-0 w-[46px] h-[46px] rounded-[12px] bg-white border border-[#F1DCE2] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200"
                                    aria-hidden="true"
                                >
                                    <svg
                                        aria-hidden="true"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#BD2850"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d={spec.iconPath} />
                                    </svg>
                                </span>
                                <span className="text-[13.5px] sm:text-[14px] font-semibold text-[#1F1A1C] leading-snug group-hover:text-[#BD2850] transition-colors duration-200">
                                    {spec.name}
                                </span>
                            </span>

                            {/* Right: Arrow Icon */}
                            <svg
                                aria-hidden="true"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#BD2850"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                            >
                                <path d="M5 12h14M13 6l6 6-6 6" />
                            </svg>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

