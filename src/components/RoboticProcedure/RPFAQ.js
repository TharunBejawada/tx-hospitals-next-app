"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sanitize from "@/utils/sanitize";
import useIsMobile from "@/hooks/useIsMobile";
import FAQSchema from '@/utils/FAQSchema';

const RPFAQ = ({ data }) => {
    const [activeIndex, setActiveIndex] = useState(null); // No FAQ open by default
    const isMobile = useIsMobile();

    if (!data || data.length === 0) return null;

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-6 px-6 md:px-12 font-inter bg-white">
            <FAQSchema faqs={data} />
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#b02a44]">
                    Frequently Asked Questions (FAQs)
                </h2>

                <div className="space-y-5">
                    {data.map((faq, index) => {
                        const isOpen = activeIndex === index;
                        return (
                            <div key={index} className="overflow-hidden border-2 border-pink-50 rounded-2xl hover:border-pink-200 transition-colors duration-300 shadow-sm">
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className={`w-full flex items-center justify-between p-5 md:p-7 text-left transition-all duration-300 ${isOpen ? "bg-[#b02a44] text-white" : "bg-white text-gray-800 hover:bg-pink-50"
                                        }`}
                                >
                                    <span className="font-bold text-base md:text-lg pr-6">
                                        {faq.question}
                                    </span>
                                    <div className={`flex-shrink-0 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}>
                                        <svg alt="Icon" className={`w-6 h-6 ${isOpen ? "text-white" : "text-[#b02a44]"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                        >
                                            <div
                                                className="p-7 text-gray-700 text-sm md:text-base leading-relaxed bg-white border-t border-pink-50 prose prose-pink max-w-none"
                                                dangerouslySetInnerHTML={{ __html: sanitize(faq.answer) }}
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default RPFAQ;
