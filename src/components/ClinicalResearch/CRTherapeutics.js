"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";

const specialtiesList = [
    { name: 'Cardiology', icon: '/assets/Departments/Cardiac Sciences.png', path: '/specialities/cardiac-sciences/' },
    { name: 'Orthopedics', icon: '/assets/Departments/Orthopaedics.png', path: '/specialities/orthopaedics/' },
    { name: 'Robotic Surgery', icon: '/assets/Departments/Robotics Sciences.png', path: '/specialities/' },
    { name: 'General Medicine', icon: '/assets/Departments/Internal Medicine.png', path: '/specialities/internal-medicine/' },
    { name: 'Gastroenterology', icon: '/assets/Departments/Gastro Sciences.png', path: '/specialities/gastro-sciences/' },
    { name: 'Nephrology', icon: '/assets/Departments/Nephrology.png', path: '/specialities/nephrology/' },
    { name: 'Urology', icon: '/assets/Departments/Urology Icon.png', path: '/specialities/urology/' },
    { name: 'Neurology', icon: '/assets/Departments/Neuro Sciences.png', path: '/specialities/neuro-sciences/' },
    { name: 'ENT', icon: '/assets/Departments/ENT.png', path: '/specialities/ent/' },
    { name: 'Pulmonology', icon: '/assets/Departments/Pulmonology.png', path: '/specialities/pulmonology/' },
    { name: 'Obstetrics & Gynaecology', icon: '/assets/Departments/Mother & Child Care.png', path: '/specialities/gynaecology-and-obstetrics/' },
    { name: 'Paediatrics', icon: '/assets/Departments/Mother & Child Care.png', path: '/specialities/paediatrics/' },
    { name: 'Skin & Cosmetic Care', icon: '/assets/Departments/Dermatology & Cosmetic Care.png', path: '/specialities/dermatology/' },
    { name: 'Dental Care', icon: '/assets/Departments/Dental & Maxillofacial.png', path: '/specialities/dental-and-maxillofacial/' },
    { name: 'Oncology', icon: '/assets/Departments/Oncology.png', path: '/specialities/oncology/' },
    { name: 'Pain Management', icon: '/assets/Departments/Anaesthesia & Pain Management.png', path: '/specialities/pain-management/' }
];

export default function CRTherapeutics() {
    const [showAll, setShowAll] = useState(false);
    const router = useRouter();

    const visibleSpecialties = showAll ? specialtiesList : specialtiesList.slice(0, 8);

    return (
        <section className="bg-gray-50 w-full py-16 px-6 overflow-hidden">
            <div className="max-w-[1170px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10 text-center"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-[10px] font-bold uppercase tracking-widest mb-3 border border-pink-200">
                        Our Focus Areas
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                        Therapeutic <span className="text-pink-700 relative inline-block">expertise
                            <span className="absolute -bottom-1 left-0 w-full h-1 bg-pink-200/50 rounded-full"></span>
                        </span>
                    </h2>
                    <p className="text-lg max-w-3xl mx-auto text-gray-600 font-medium leading-relaxed">
                        Our clinical research spans multiple therapeutic areas, driven by specialized expertise and state-of-the-art facilities.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
                    {visibleSpecialties.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => router.push(item.path)}
                            className="flex flex-col items-center justify-center gap-4 p-5 rounded-xl bg-white cursor-pointer hover:shadow-md transition-shadow"
                            style={{ border: '0.5px solid rgb(224, 208, 208)', boxShadow: 'rgba(0, 0, 0, 0.06) 0px 1px 3px', minHeight: '160px' }}
                        >
                            <div className="relative w-[60px] h-[60px] flex items-center justify-center">
                                <Image
                                    src={item.icon}
                                    alt={item.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-center" style={{ fontSize: '13px', fontWeight: 600, color: 'rgb(3, 2, 19)', lineHeight: 1.4 }}>
                                {item.name}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="px-8 py-2.5 rounded transition-opacity hover:opacity-90"
                        style={{ background: 'rgb(189, 56, 92)', fontSize: '15px', fontWeight: 500, color: 'rgb(255, 255, 255)', border: 'none' }}
                    >
                        {showAll ? 'View Less' : 'View All Specialties'}
                    </button>
                </div>
            </div>
        </section>
    );
}
