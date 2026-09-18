import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function BanjaraHillsAdvancedHealthcare() {
    const cards = [
        {
            icon: '/assets/banjara-hills/heart-attack.svg',
            title: 'Cardiology',
            description: 'Advanced heart care in Banjara Hills including angioplasty, pacemakers, interventions and cardiac procedures.',
            path: '/specialities/cardiac-sciences/'
        },
        {
            icon: '/assets/banjara-hills/bones.svg',
            title: 'Orthopaedics',
            description: 'Expert orthopaedic care for joint replacement, spine treatment, arthroscopy, fractures and trauma management.',
            path: '/specialities/orthopaedics/'
        },
        {
            icon: '/assets/banjara-hills/organ.svg',
            title: 'Gastroenterology',
            description: 'Specialized gastro care for liver, stomach, intestine and pancreatic disorders with advanced endoscopy treatment.',
            path: '/specialities/gastro-sciences/'
        },
        {
            icon: '/assets/banjara-hills/kidney (1).svg',
            title: 'Nephrology',
            description: 'Comprehensive kidney care including dialysis, kidney transplant support and critical nephrology services.',
            path: '/specialities/nephrology/'
        },
        {
            icon: '/assets/banjara-hills/neurology.svg',
            title: 'Neurology',
            description: 'Advanced neurology care for brain, spine, nerve and movement disorders with accurate diagnosis and treatment.',
            path: '/specialities/neuro-sciences/'
        },
        {
            icon: '/assets/banjara-hills/urology (4).svg',
            title: 'Urology',
            description: 'Expert urology treatment for kidney stones, prostate conditions, urinary disorders and minimally invasive surgery.',
            path: '/specialities/urology/'
        },
        {
            icon: '/assets/banjara-hills/pulmonology (3).svg',
            title: 'Pulmonology',
            description: 'Advanced lung care for asthma, COPD, sleep disorders, infections and respiratory critical care support.',
            path: '/specialities/pulmonology/'
        },
        {
            icon: '/assets/banjara-hills/oncology.svg',
            title: 'Oncology',
            description: 'Comprehensive cancer care with medical oncology, surgical oncology and personalized treatment planning.',
            path: '/specialities/oncology/'
        }
    ];

    return (
        <section className="w-full bg-[#fff8f9] py-6 px-4 md:px-8 lg:px-12 overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                {/* Section Header */}
                <div className="mb-10 text-left">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 ">
                        Advanced Multispeciality Healthcare in Banjara Hills
                    </h2>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cards.map((card, idx) => (
                        <Link href={card.path} key={idx} className="flex h-full w-full">
                            <motion.div
                                initial={{ opacity: 0, y: 25 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05, duration: 0.6 }}
                                className="bg-white border border-gray-100/80 rounded-[24px] p-6 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(179,32,77,0.06)] hover:border-pink-100 transition-all duration-300 group cursor-pointer shadow-sm min-h-[220px] w-full h-full"
                            >
                                {/* Top part: Icon and Text info */}
                                <div className="flex gap-4 items-start">
                                    {/* Crimson Circle Container */}
                                    <div className="w-16 h-16 rounded-full bg-[#b3204d] shrink-0 flex items-center justify-center p-3.5 shadow-sm group-hover:scale-105 transition-transform duration-300">
                                        <img
                                            src={card.icon}
                                            alt={card.title}
                                            className="w-full h-full object-contain"
                                            style={{ filter: 'brightness(0) invert(1)' }}
                                        />
                                    </div>

                                    {/* Content Info */}
                                    <div className="flex flex-col text-left">
                                        <h3 className="text-lg font-bold text-gray-900 leading-tight ">
                                            {card.title}
                                        </h3>
                                        <p className="text-sm md:text-base text-gray-500 leading-relaxed mt-2">
                                            {card.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Bottom part: Know More link */}
                                <div className="flex justify-end mt-4">
                                    <span className="text-[#b3204d] hover:text-[#971b41] text-sm font-bold transition-colors duration-300 flex items-center gap-1 group-hover:underline decoration-2 underline-offset-4">
                                        Know More <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                                    </span>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
