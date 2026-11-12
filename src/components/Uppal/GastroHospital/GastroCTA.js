import React from 'react';
import { motion } from 'framer-motion';
import WhatsAppButton from '../WhatsAppButton';

const GastroCTA = ({ onBookClick }) => {
    return (
        <section className="py-12 md:py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gray-900 rounded-[40px] p-8 md:p-16 text-center relative overflow-hidden"
                >
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                            Ready to Consult the Best <span className="text-[#be185d]">Gastro Specialists</span> in Uppal?
                        </h2>
                        <p className="text-gray-400 text-base md:text-xl mb-10 leading-relaxed">
                            Don't wait for digestive issues to get worse. Expert care is just a click away. Book your consultation today.
                        </p>
                        <div className="flex flex-row items-center justify-center gap-4">
                            <button
                                onClick={onBookClick}
                                className="w-full sm:w-auto bg-[#be185d] hover:bg-[#a2144e] text-white font-bold py-4 px-12 rounded-full transition-all transform hover:scale-105 text-lg"
                            >
                                Free Doctor Consultation
                            </button>
                            <WhatsAppButton sizeClass="py-4 px-12 text-lg" />
                            <a
                                href="tel:+919247903419"
                                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-12 rounded-full transition-all text-lg border border-white/10 backdrop-blur-sm"
                            >
                                Call: +91-9247903419
                            </a>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-[#be185d]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#be185d]/5 rounded-full blur-3xl translate-x-1/4 translate-y-1/4"></div>
                </motion.div>
            </div>
        </section>
    );
};

export default GastroCTA;
