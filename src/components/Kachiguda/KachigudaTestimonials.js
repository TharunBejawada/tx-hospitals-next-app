import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        initials: "SV",
        stars: 5,
        text: "TX Hospitals saved my father's life. The cardiac team was exceptional and responded within minutes during his emergency. Truly world-class care.",
        name: "Sunita Verma",
        location: "Kachiguda"
    },
    {
        initials: "MF",
        stars: 5,
        text: "I had my knee replacement done here. The orthopedic surgeon was brilliant and recovery was faster than expected. Highly recommend for Kachiguda residents.",
        name: "Mohammed Farhan",
        location: "Malakpet"
    },
    {
        initials: "LD",
        stars: 5,
        text: "The doctors and nursing staff are incredibly caring. Cashless insurance was handled seamlessly. Will always be our family hospital.",
        name: "Lakshmi Devi",
        location: "Nampally"
    }
];

export default function KachigudaTestimonials() {
    return (
        <section className="bg-white py-10 md:py-14 px-6 md:px-10 lg:px-12 relative overflow-hidden border-t border-slate-100">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-pink-100 rounded-full blur-3xl" />
            </div>

            <div className="max-w-[1400px] mx-auto relative z-10">

                {/* Header Block */}
                <div className="text-center mb-8 md:mb-10">
                    <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-[#e6fcf5] text-[#0ca678] text-xs font-bold uppercase tracking-widest shadow-sm"
                    >
                        Patient Success Stories
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 leading-tight"
                    >
                        What Our Patients Say
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="h-1 w-20 bg-gradient-to-r from-pink-600 to-[#8b006a] mx-auto mt-6 rounded-full origin-center"
                    />
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
                    {testimonials.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="bg-slate-50/40 rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col justify-between relative overflow-hidden group min-h-[320px]"
                        >
                            {/* SVG Decorative double quotation mark */}
                            <div className="absolute top-6 left-6 text-[#0052a3]/5 group-hover:text-[#0052a3]/10 transition-colors duration-300 pointer-events-none">
                                <svg alt="Icon" className="w-16 h-16 fill-current" viewBox="0 0 32 32">
                                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                                </svg>
                            </div>

                            <div className="relative z-10 flex flex-col">
                                {/* Stars Display */}
                                <div className="flex gap-1 mb-6 text-[#fbbf24]">
                                    {[...Array(item.stars)].map((_, i) => (
                                        <svg alt="Star Icon" key={i} className="w-5 h-5 fill-current filter drop-shadow-sm" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                {/* Testimonial Body */}
                                <blockquote className="text-gray-600 text-sm md:text-base leading-relaxed font-medium tracking-wide">
                                    "{item.text}"
                                </blockquote>
                            </div>

                            <div className="relative z-10">
                                {/* Divider Line */}
                                <div className="w-full h-[1px] bg-slate-100 my-6" />

                                {/* Patient Monogram Profile */}
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-[#0052a3] text-white flex items-center justify-center font-bold text-sm tracking-wider select-none shrink-0 shadow-md">
                                        {item.initials}
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <h4 className="text-sm font-bold text-gray-900 leading-none">
                                            {item.name}
                                        </h4>
                                        <span className="text-xs text-gray-500 font-semibold mt-1.5 uppercase tracking-wide leading-none">
                                            {item.location}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
