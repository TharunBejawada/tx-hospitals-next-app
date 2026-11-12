import React from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

const UppalEmergency = () => {
    return (
        <section className="bg-[#181516] py-10 md:py-16 px-6 md:px-10 lg:px-12 text-white overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

                    {/* Left Content */}
                    <div className="max-w-2xl">
                        {/* Live Status Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 bg-pink-700 text-white px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-wide shadow-[0_0_15px_rgba(190,24,93,0.5)]"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>
                            Available Right Now
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
                        >
                            24/7 Emergency Treatment – <span className="text-pink-600">We Never Close</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-400 text-base md:text-lg leading-relaxed font-medium max-w-xl"
                        >
                            Medical emergencies don't follow a schedule. Our emergency department at TX Hospitals, Uppal is operational round the clock, experienced doctors, paramedic staff, and fully equipped ICU, ready the moment you need us.
                        </motion.p>
                    </div>

                    {/* Right CTA */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col items-start lg:items-center"
                    >
                        <a
                            href="tel:+919247903419"
                            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-pink-700 px-4 sm:px-6 md:px-8 py-4 rounded-full font-bold text-sm sm:text-base md:text-xl transition-transform transform hover:scale-105 shadow-xl w-auto justify-center border border-transparent hover:border-pink-100 whitespace-nowrap"
                        >
                            <Phone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-current shrink-0" />
                            <span className="whitespace-nowrap">
                                Call Emergency: +919144514459
                            </span>
                        </a>
                        <p className="text-gray-500 text-sm mt-4 font-medium tracking-wide">
                            Ambulance available · Uppal & nearby areas
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default UppalEmergency;
