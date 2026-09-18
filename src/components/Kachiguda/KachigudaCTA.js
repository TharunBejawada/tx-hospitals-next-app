import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KachigudaAppointmentModal from '@/components/Kachiguda/KachigudaAppointmentModal';

export default function KachigudaCTA() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="relative bg-[#8b006a] py-10 md:py-14 px-6 overflow-hidden w-full flex items-center justify-center">

            {/* Left Decorative Circle */}
            <div className="absolute left-[-120px] top-[-30%] w-[350px] h-[350px] rounded-full bg-white/[0.06] pointer-events-none select-none" />

            {/* Right Decorative Circle */}
            <div className="absolute right-[-120px] bottom-[-30%] w-[350px] h-[350px] rounded-full bg-white/[0.06] pointer-events-none select-none" />

            <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-white text-2xl md:text-3xl font-bold  leading-tight"
                >
                    Ready to Get World-Class Care in Kachiguda?
                </motion.h2>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-white/90 text-sm md:text-base font-medium mt-3 max-w-2xl leading-relaxed"
                >
                    Book your FREE consultation today. Our specialists are ready to help.
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8 w-full sm:w-auto"
                >

                    {/* Book Appointment Button */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full sm:w-auto px-8 py-3.5 bg-[#e65c00] hover:bg-[#cc5200] text-white font-bold rounded-full text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2.5"
                    >
                        <svg className="w-5 h-5 text-white stroke-[2.5]" alt="Image" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Book Appointment
                    </button>

                    {/* Call Now Button */}
                    <a
                        href="tel:04048108108"
                        className="w-full sm:w-auto px-8 py-3.5 bg-transparent border-2 border-white hover:bg-white/10 hover:border-white text-white font-bold rounded-full text-base shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2.5"
                    >
                        <svg className="w-5 h-5 text-white stroke-[2.5]" alt="Image" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Call Now
                    </a>

                </motion.div>

            </div>

            {/* Appointment Modal Overlay */}
            <AnimatePresence>
                {isModalOpen && (
                    <KachigudaAppointmentModal
                        closeModal={() => setIsModalOpen(false)}
                    />
                )}
            </AnimatePresence>

        </section>
    );
}
