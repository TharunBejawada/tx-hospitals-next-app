import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const KachigudaSpecialties = () => {
    const specialties = [
        {
            emoji: "💚",
            title: "Cardiac Sciences",
            desc: "Advanced heart care, angioplasty, bypass & cardiac imaging.",
            bgColor: "bg-[#e6fcf5]", // Teal accent
            path: "/specialities/cardiac-sciences/"
        },
        {
            emoji: "🦴",
            title: "Ortho Sciences",
            desc: "Joint replacement, spine surgery & sports injury rehab.",
            bgColor: "bg-[#e3fafc]", // Cyan accent
            path: "/specialities/orthopaedics/"
        },
        {
            emoji: "🧬",
            title: "Gastro Sciences",
            desc: "Endoscopy, liver care & advanced GI surgeries.",
            bgColor: "bg-[#e8f0fe]", // Soft blue accent
            path: "/specialities/gastro-sciences/"
        },
        {
            emoji: "🫀",
            title: "Nephrology",
            desc: "Kidney disease, dialysis & renal transplant programs.",
            bgColor: "bg-[#ebf8ff]", // Sky accent
            path: "/specialities/nephrology/"
        },
        {
            emoji: "🧠",
            title: "Neurosciences",
            desc: "Brain & spine treatment, stroke care & neuro-surgery.",
            bgColor: "bg-[#f3f0ff]", // Indigo/purple accent
            path: "/specialities/neuro-sciences/"
        },
        {
            emoji: "👶",
            title: "Pediatrics",
            desc: "Expert child health, neonatology & pediatric surgery.",
            bgColor: "bg-[#fff9db]", // Gold/yellow accent
            path: "/specialities/paediatrics/"
        }
    ];

    return (
        <section className="bg-[#f8fafc] py-10 md:py-14 px-6 md:px-10 lg:px-12 relative z-10">
            <div className="max-w-[1400px] mx-auto">
                {/* Section Header */}
                <div className="text-center mb-8 md:mb-10">
                    <span className="inline-block bg-[#e6fcf5] text-[#0ca678] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm">
                        Clinical Excellence
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-2 ">
                        Our Key Specialties at Kachiguda
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 font-medium max-w-2xl mx-auto">
                        Comprehensive, expert care for every health condition — all under one roof.
                    </p>
                </div>

                {/* Specialties Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-12">
                    {specialties.map((spec, index) => (
                        <Link href={spec.path} key={index} className="flex h-full w-full">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                                className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col items-center text-center transition-all duration-300 w-full cursor-pointer h-full"
                            >
                                {/* Circular Icon Container */}
                                <div className={`w-14 h-14 rounded-full ${spec.bgColor} flex items-center justify-center mb-5 shrink-0 select-none`}>
                                    <span className="text-2xl filter drop-shadow-sm">{spec.emoji}</span>
                                </div>

                                {/* Specialty Text Content */}
                                <h3 className="text-base md:text-lg font-bold text-[#0f172a] mb-2.5 leading-snug">
                                    {spec.title}
                                </h3>
                                <p className="text-xs md:text-sm text-gray-500 leading-relaxed mb-5 font-semibold max-w-[200px]">
                                    {spec.desc}
                                </p>

                                {/* Learn More CTA Link */}
                                <span
                                    className="text-[#0066cc] hover:text-[#004499] text-xs md:text-sm font-extrabold flex items-center gap-1 group transition-colors mt-auto hover:underline"
                                >
                                    Learn More
                                    <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
                                </span>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* Dynamic Primary CTA Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex justify-center mt-6 md:mt-10"
                >
                    <Link href="/specialities/">
                        <button className="bg-[#8b006a] hover:bg-[#750059] text-white font-extrabold text-sm md:text-base px-8 py-3.5 rounded-full shadow-lg shadow-purple-200/50 hover:shadow-xl transition-all duration-350 transform hover:-translate-y-0.5">
                            View All Specialties
                        </button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default KachigudaSpecialties;
