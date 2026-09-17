import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import WhatsAppButton from '../WhatsAppButton';
import HerniaForm from './HerniaForm';

const HerniaHero = ({ onBookClick }) => {
    const features = [
        "20+ Years Experienced Hernia Surgeons",
        "Expert Laparoscopic & Robotic Surgery",
        "Minimally Invasive, No Large Cuts",
        "Same-Day or Next-Day Discharge",
        "Back to Routine in 3–5 Days",
        "All Insurances Accepted"
    ];

    return (
        <section className="bg-[#be185d] py-10 lg:py-16 px-4 md:px-10 lg:px-12 text-white relative overflow-hidden font-inter">
            <div className="max-w-[1400px] mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-start text-left"
                    >
                        <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4">
                            Top Hernia Surgeons in Uppal
                        </span>

                        <h1 className="text-[32px] md:text-[38px] lg:text-[50px] font-extrabold mb-4 leading-tight ">
                            Specialists in Hernia Surgery at Uppal
                        </h1>

                        <p className="text-base md:text-lg text-pink-50/90 mb-8 max-w-xl leading-relaxed font-medium">
                            From your first consultation to full recovery, our hernia specialists in Uppal walk every step with you.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-10 w-full max-w-2xl">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-center gap-3 bg-white/10 border border-white/10 p-3 rounded-xl backdrop-blur-sm shadow-sm"
                                >
                                    <div className="bg-white rounded-full p-0.5 shrink-0 shadow-sm">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-[#be185d]" fill="currentColor" stroke="white" />
                                    </div>
                                    <span className="text-sm md:text-[15px] font-bold ">{feature}</span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                            <button
                                onClick={onBookClick}
                                className="w-full sm:w-auto bg-white text-[#be185d] hover:bg-pink-50 font-extrabold py-4 px-6 md:px-12 rounded-full transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-xl hover:shadow-2xl text-sm md:text-base lg:text-lg uppercase tracking-wider"
                            >
                                Get Second Opinion
                            </button>

                            <div className="w-full sm:w-auto">
                                <WhatsAppButton sizeClass="w-full sm:w-auto py-4 px-6 md:px-12 text-sm md:text-base lg:text-lg" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full flex justify-center lg:justify-end"
                    >
                        <HerniaForm />
                    </motion.div>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent -skew-x-12 transform translate-x-1/4 pointer-events-none opacity-50"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>
        </section>
    );
};

export default HerniaHero;
