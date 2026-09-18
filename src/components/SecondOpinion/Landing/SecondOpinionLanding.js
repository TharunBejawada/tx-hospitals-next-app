"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Bone, Brain, Activity, ShieldPlus, Droplet, Microscope, Wind, X } from "lucide-react";
import DoctorCard from "@/components/Common/DoctorCard";
import SecondOpinionHero from "./SecondOpinionHero";
import SecondOpinionStats from "./SecondOpinionStats";
import SecondOpinionForm from "./SecondOpinionForm";
import { locations, secondOpinion } from "@/utils/dropdownValues";
import CONFIG from "@/config";

export default function SecondOpinionLanding({
    opinionType = "Free Second", // Can be "Second" or "First"
    customTitle = "Your Health Decision Deserves the Right Second Opinion",
    customSubtitle = "Get expert evaluation, accurate diagnosis and the right treatment guidance from our senior specialists."
}) {
    // Process locations and specialties dynamically from standard codebase lists
    const citiesList = locations.map(loc => ({ name: loc.name }));
    const specialtiesList = secondOpinion
        .filter(item => item.name !== "View More")
        .map(item => ({ name: item.name }));

    // Configurable Badge and Brand details
    const badgeText = "Free Second Opinion";

    // Doctors state
    const [doctors, setDoctors] = useState([]);
    const [doctorModalOpen, setDoctorModalOpen] = useState(false);

    // Fetch doctors from API, show first 4
    useEffect(() => {
        fetch(`${CONFIG.API_BASE_URL}/getAllDoctors`)
            .then(res => res.json())
            .then(data => {
                const sorted = [...data].sort((a, b) => Number(a.priorityOrder) - Number(b.priorityOrder));
                setDoctors(sorted.slice(0, 4));
            })
            .catch(err => console.error("Error fetching doctors:", err));
    }, []);

    // Achievement stats config (passed as props to Stats component)
    const statsData = [
        {
            value: "2,00,000+",
            label: "Happy Patients",
            icon: (
                <svg alt="Icon" className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            )
        },
        {
            value: "25,000+",
            label: "Surgeries Performed",
            icon: (
                <svg alt="Icon" className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
            )
        },
        {
            value: "150+",
            label: "Expert Specialists",
            icon: (
                <svg alt="Icon" className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.5 2h15" />
                    <path d="M6 2v6a6 6 0 0 0 12 0V2" />
                    <path d="M12 14v4a2 2 0 1 0 4 0v-4" />
                    <path d="M12 14v3a2 2 0 0 0 4 0v-3" />
                </svg>
            )
        },
        {
            value: "NABH",
            label: "Accredited Hospital",
            icon: (
                <svg alt="Icon" className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Ribbon */}
                    <path d="M8 2L12 11L16 2" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 2L12 9L14 2" stroke="#facc15" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Medal */}
                    <circle cx="12" cy="15" r="5" fill="#facc15" stroke="#eab308" strokeWidth="1.5" />
                    <circle cx="12" cy="15" r="2" fill="#eab308" />
                </svg>
            )
        },
        {
            value: "24x7",
            label: "Emergency Care",
            icon: (
                <svg alt="Icon" className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                    <path d="M12 7v5l4 2" />
                </svg>
            )
        }
    ];

    // Left Benefits features list config
    const featuresData = [
        {
            title: "Senior Specialists",
            desc: "with 20+ Years of Experience",
            icon: (
                <svg alt="Icon" className="w-5 h-5 text-[#b01640]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        },
        {
            title: "Accurate Diagnosis",
            desc: "& Personalised Treatment Plan",
            icon: (
                <svg alt="Icon" className="w-5 h-5 text-[#b01640]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        },
        {
            title: "Quick Appointments",
            desc: "& Faster Report Reviews",
            icon: (
                <svg alt="Icon" className="w-5 h-5 text-[#b01640]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            title: "Confidential",
            desc: "& Secure Consultations",
            icon: (
                <svg alt="Icon" className="w-5 h-5 text-[#b01640]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            )
        }
    ];

    return (
        <div className="w-full min-h-screen bg-white">
            {/* 1. Hero Section (including benefits list, illustration & form) */}
            <SecondOpinionHero
                opinionType={opinionType}
                badgeText={badgeText}
                title={customTitle}
                subtitle={customSubtitle}
                features={featuresData}
                specialties={specialtiesList}
                cities={citiesList}
            />

            {/* 2. Achievements / Trust Stats Row */}
            <SecondOpinionStats stats={statsData} />

            {/* 3. Specialties Section */}
            <section className="py-16 bg-white font-inter">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
                    <span className="text-[#b01640] text-xs md:text-sm font-extrabold uppercase tracking-widest font-montserrat">
                        We Offer {opinionType} Opinion In
                    </span>
                    <h2 className="text-2xl md:text-[32px] font-extrabold text-[#222222] font-montserrat mt-2 mb-10 tracking-tight">
                        All Major Specialties
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-10">
                        {[
                            {
                                name: "Cardiology",
                                icon: <Heart className="w-9 h-9 text-[#b01640]" strokeWidth={1.8} />,
                                path: "/specialities/cardiac-sciences/"
                            },
                            {
                                name: "Gastro Sciences",
                                icon: <Activity className="w-9 h-9 text-[#b01640]" strokeWidth={1.8} />,
                                path: "/specialities/gastro-sciences/"
                            },
                            {
                                name: "Orthopaedics",
                                icon: <Bone className="w-9 h-9 text-[#b01640]" strokeWidth={1.8} />,
                                path: "/specialities/orthopaedics/"
                            },
                            {
                                name: "Nephrology",
                                icon: <Droplet className="w-9 h-9 text-[#b01640]" strokeWidth={1.8} />,
                                path: "/specialities/nephrology/"
                            },
                            {
                                name: "Urology",
                                icon: <Microscope className="w-9 h-9 text-[#b01640]" strokeWidth={1.8} />,
                                path: "/specialities/urology/"
                            },
                            {
                                name: "Neurosciences",
                                icon: <Brain className="w-9 h-9 text-[#b01640]" strokeWidth={1.8} />,
                                path: "/specialities/neuro-sciences/"
                            },
                            {
                                name: "Oncology",
                                icon: <ShieldPlus className="w-9 h-9 text-[#b01640]" strokeWidth={1.8} />,
                                path: "/specialities/oncology/"
                            },
                            {
                                name: "Pulmonology",
                                icon: <Wind className="w-9 h-9 text-[#b01640]" strokeWidth={1.8} />,
                                path: "/specialities/pulmonology/"
                            }
                        ].map((spec, index) => (
                            <Link
                                key={index}
                                href={spec.path}
                                className="bg-white border border-gray-100 hover:border-[#b01640]/30 rounded-2xl p-5 min-h-[150px] flex flex-col items-center justify-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                            >
                                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300 flex items-center justify-center h-10 w-10">
                                    {spec.icon}
                                </div>
                                <span className="text-[12px] md:text-[13px] font-bold text-gray-900 font-montserrat leading-tight group-hover:text-[#b01640] transition-colors">
                                    {spec.name}
                                </span>
                            </Link>
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <Link
                            href="/specialities/"
                            className="border border-[#b01640] text-[#b01640] hover:bg-[#b01640] hover:text-white rounded-lg font-bold font-montserrat text-xs tracking-widest px-8 py-3.5 transition-all uppercase shadow-sm hover:shadow-md"
                        >
                            View All Specialities
                        </Link>
                    </div>
                </div>
            </section>

            {/* 3b. Doctors Section */}
            {doctors.length > 0 && (
                <section className="bg-[#fcfafa] py-4 md:py-8 px-6 md:px-10 lg:px-12 font-inter">
                    <div className="max-w-[1400px] mx-auto">
                        {/* Header — left-aligned like Uppal */}
                        <div className="mb-8 md:mb-12 max-w-3xl">
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-pink-700 mb-2 block">
                                Meet the Team
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Our <span className="text-pink-700">Expert Doctors</span>
                            </h2>
                            <div className="w-12 h-1 bg-pink-700 mb-6"></div>
                            <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium">
                                Consult with our highly experienced specialists and get the right {opinionType} Opinion for your health concerns.
                            </p>
                        </div>

                        {/* Doctors Grid using DoctorCard — same as Uppal */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {doctors.map((doctor, index) => (
                                <DoctorCard
                                    key={doctor.id || index}
                                    name={doctor.name}
                                    specialty={doctor.department}
                                    designation={doctor.designation}
                                    experience={doctor.experience}
                                    imageSrc={doctor.image}
                                    onBookClick={() => setDoctorModalOpen(true)}
                                />
                            ))}
                        </div>

                        {/* View All Doctors Button */}
                        <div className="mt-12 flex justify-center">
                            <Link
                                href="/find-doctor"
                                className="border-2 border-pink-700 text-pink-700 px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-pink-700 hover:text-white transition-all transform hover:scale-105"
                            >
                                View All Doctors
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Doctor Appointment Modal with SecondOpinionForm */}
            {doctorModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-2"
                    onClick={() => setDoctorModalOpen(false)}
                >
                    <div
                        className="relative max-h-[100vh] overflow-y-auto"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setDoctorModalOpen(false)}
                            className="absolute top-3 right-3 z-10 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition"
                        >
                            <X className="w-4 h-4 text-gray-600" />
                        </button>
                        <SecondOpinionForm opinionType={opinionType} />
                    </div>
                </div>
            )}

            {/* 4. Why Choose Us Section */}
            <section className="w-full bg-[#fff5f6] py-14 md:py-16 font-inter">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                        {[
                            {
                                title: "Expert & Unbiased Medical Opinion",
                                desc: "Get an independent assessment of your condition and treatment options.",
                                icon: (
                                    <svg alt="Icon" className="w-7 h-7 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                )
                            },
                            {
                                title: "Advanced Technology & Infrastructure",
                                desc: "World-class facilities enabling accurate diagnosis and better outcomes.",
                                icon: (
                                    <svg alt="Icon" className="w-7 h-7 text-[#b01640]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                        <path d="M6 10h2l2-3 2 6 1.5-4.5L15 10h3" />
                                        <line x1="12" y1="17" x2="12" y2="21" />
                                        <line x1="8" y1="21" x2="16" y2="21" />
                                    </svg>
                                )
                            },
                            {
                                title: "Comprehensive Care",
                                desc: "From diagnosis to treatment and follow-up, we are with you at every step.",
                                icon: (
                                    <svg alt="Icon" className="w-7 h-7 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 22a7 7 0 0 0 7-7h-2a5 5 0 0 1-10 0H5a7 7 0 0 0 7 7z" fill="#fef08a" strokeWidth="1.5" />
                                        <path d="M12 2a7 7 0 0 0-7 7h2a5 5 0 0 1 10 0h2a7 7 0 0 0-7-7z" fill="#fef08a" strokeWidth="1.5" />
                                    </svg>
                                )
                            },
                            {
                                title: "Patient-Centric Approach",
                                desc: "We listen, care and recommend what is best for your health.",
                                icon: (
                                    <svg alt="Icon" className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" fill="#dbeafe" />
                                        <path d="M19 16v-2a2 2 0 0 0-2-2h-1" />
                                        <path d="M22 21v-2a2 2 0 0 0-2-2" />
                                    </svg>
                                )
                            }
                        ].map((item, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.03)] shrink-0 border border-white/50">
                                    {item.icon}
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-sm md:text-[15px] font-bold text-gray-900 font-montserrat leading-snug mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-[12px] md:text-[13px] text-gray-500 font-semibold leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. How It Works Section */}
            <section className="py-16 bg-white font-inter">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
                    <span className="text-[#b01640] text-xs md:text-sm font-extrabold uppercase tracking-widest font-montserrat">
                        How It Works
                    </span>
                    <h2 className="text-2xl md:text-[32px] font-extrabold text-[#222222] font-montserrat mt-2 mb-10 tracking-tight">
                        Get Your {opinionType} Opinion in 3 Simple Steps
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: "01",
                                title: "Share Your Details",
                                desc: "Fill the form or call us and share your concern."
                            },
                            {
                                step: "02",
                                title: "Consult Our Specialist",
                                desc: "Our expert will review your reports and consult with you."
                            },
                            {
                                step: "03",
                                title: "Get Expert Guidance",
                                desc: "Receive clear diagnosis, treatment options and next steps."
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-white border border-gray-100/80 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-[0_4px_24px_rgba(0,0,0,0.01)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="w-10 h-10 rounded-full bg-[#b01640] text-white flex items-center justify-center font-extrabold text-sm font-montserrat mb-4 shadow-sm">
                                    {item.step}
                                </div>
                                <h3 className="text-[17px] font-bold text-gray-900 font-montserrat mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-[13px] text-gray-500 font-semibold leading-relaxed max-w-xs">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Testimonials Section */}
            <section className="py-16 bg-[#fafafa]/70 font-inter border-t border-gray-100/80">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
                    <span className="text-[#b01640] text-xs md:text-sm font-extrabold uppercase tracking-widest font-montserrat">
                        Patients Trust Us
                    </span>
                    <h2 className="text-2xl md:text-[32px] font-extrabold text-[#222222] font-montserrat mt-2 mb-10 tracking-tight">
                        Stories of Trust & Recovery
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                quote: "I was suggested surgery elsewhere, but the second opinion at TX Hospitals helped me avoid an unnecessary procedure.",
                                name: "Rajesh Kumar",
                                location: "Hyderabad"
                            },
                            {
                                quote: "The doctors listened patiently and explained everything clearly. I felt confident after my first consultation.",
                                name: "Anita Sharma",
                                location: "Secunderabad"
                            },
                            {
                                quote: "Excellent facility and experienced specialists. TX Hospitals is my go-to place for any medical opinion.",
                                name: "Venkatesh Reddy",
                                location: "Hyderabad"
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-white border border-gray-100/80 rounded-2xl p-8 flex flex-col justify-between text-left shadow-[0_4px_24px_rgba(0,0,0,0.01)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div>
                                    <div className="flex gap-1 text-amber-500 mb-4 text-xs">
                                        {"★".repeat(5)}
                                    </div>
                                    <p className="text-sm text-gray-600 font-semibold italic leading-relaxed mb-6">
                                        &ldquo;{item.quote}&rdquo;
                                    </p>
                                </div>
                                <div className="border-t border-gray-100 pt-4 flex flex-col">
                                    <span className="font-bold text-gray-900 font-montserrat text-sm">
                                        {item.name}
                                    </span>
                                    <span className="text-xs text-gray-400 font-semibold mt-0.5">
                                        {item.location}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
