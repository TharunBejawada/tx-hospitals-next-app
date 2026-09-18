import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BanjaraHillsSpecialities() {
    const specialities = [
        {
            icon: '/assets/banjara-hills/heart-attack.svg',
            title: 'Cardiology',
            subtitle: 'Heart Care',
            path: '/specialities/cardiac-sciences/'
        },
        {
            icon: '/assets/banjara-hills/bones.svg',
            title: 'Orthopaedics',
            subtitle: 'Bone & Joint Care',
            path: '/specialities/orthopaedics/'
        },
        {
            icon: '/assets/banjara-hills/organ.svg',
            title: 'Gastro enterology',
            subtitle: 'Digestive Care',
            path: '/specialities/gastro-sciences/'
        },
        {
            icon: '/assets/banjara-hills/kidney (1).svg',
            title: 'Nephrology',
            subtitle: 'Kidney Care',
            path: '/specialities/nephrology/'
        },
        {
            icon: '/assets/banjara-hills/neurology.svg',
            title: 'Neurology',
            subtitle: 'Brain & Nerve Care',
            path: '/specialities/neuro-sciences/'
        },
        {
            icon: '/assets/banjara-hills/urology (4).svg',
            title: 'Urology',
            subtitle: 'Urinary Care',
            path: '/specialities/urology/'
        }
    ];

    return (
        <section className="w-full bg-[#fff8f9] py-6 px-4 md:px-8 lg:px-12 overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                {/* Header row */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                        Our Specialities
                    </h2>
                    <Link
                        href="/specialities/"
                        className="text-[#b3204d] hover:text-[#971b41] font-bold text-sm transition-colors duration-300 hover:underline decoration-2 underline-offset-4"
                    >
                        View All Specialities
                    </Link>
                </div>

                {/* Specialties Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
                    {specialities.map((spec, idx) => (
                        <Link href={spec.path} key={idx} className="block h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05, duration: 0.6 }}
                                className="bg-white border border-gray-100/80 rounded-[20px] p-6 flex flex-col items-center text-center justify-center hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(179,32,77,0.06)] hover:border-pink-100 transition-all duration-300 group cursor-pointer shadow-sm h-full"
                            >
                                {/* Icon Container */}
                                <div className="w-20 h-20 rounded-2xl bg-pink-50/50 flex items-center justify-center p-4 mb-4 group-hover:scale-105 transition-transform duration-300">
                                    <img
                                        src={spec.icon}
                                        alt={spec.title}
                                        className="w-full h-full object-contain transition-all duration-300"
                                        style={{ filter: 'invert(18%) sepia(88%) saturate(3474%) hue-rotate(330deg) brightness(87%) contrast(93%)' }}
                                    />
                                </div>

                                {/* Title & Subtitle */}
                                <h3 className="text-base font-bold text-gray-900 whitespace-nowrap mt-2">
                                    {spec.title}
                                </h3>
                                <p className="text-xs font-semibold text-gray-500 mt-1.5 whitespace-nowrap">
                                    {spec.subtitle}
                                </p>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
