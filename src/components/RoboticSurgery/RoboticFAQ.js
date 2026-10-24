"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sanitize from "@/utils/sanitize";
import useIsMobile from "@/hooks/useIsMobile";
import FAQSchema from '@/utils/FAQSchema';

const RoboticFAQ = ({ data }) => {
    const [activeIndex, setActiveIndex] = useState(0); // First FAQ open by default
    const isMobile = useIsMobile();

    if (!data || data.length === 0) return null;

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    if (isMobile) {
        return (
            <section className="py-6 px-4 font-inter bg-white">
            <FAQSchema faqs={data} />
                <div className="max-w-full">
                    <h2 className="text-[22px] leading-tight font-bold text-center mb-6 text-[#b02a44]">
                        Frequently Asked Questions (FAQs)
                    </h2>

                    <div className="space-y-3">
                        {data.map((faq, index) => {
                            const isOpen = activeIndex === index;
                            return (
                                <div key={index} className="overflow-hidden">
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-full border-2 border-[#b02a44] transition-all duration-300 ${isOpen
                                            ? "bg-[#b02a44] text-white"
                                            : "bg-white text-gray-900 hover:bg-pink-50"
                                            }`}
                                    >
                                        <span className="text-left font-semibold text-[13px] pr-2">
                                            {faq.question}
                                        </span>
                                        <div className="flex-shrink-0">
                                            <img
                                                src={isOpen
                                                    ? "/assets/surgeries/robotic-sciences/Arrow Up Icon.webp"
                                                    : "/assets/surgeries/robotic-sciences/Arrow Down  Icon.webp"
                                                }
                                                alt={isOpen ? "Collapse" : "Expand"}
                                                className="w-5 h-5 object-contain transition-transform duration-300"
                                                style={isOpen ? { filter: 'brightness(0) invert(1)' } : { filter: 'brightness(0) saturate(100%) invert(28%) sepia(78%) saturate(1500%) hue-rotate(320deg)' }}
                                            />
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <div
                                                    className="px-4 py-3 text-gray-900 text-[12px] leading-relaxed"
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
    }

    // Desktop version
    return (
        <section className="py-10 px-6 md:px-12 font-inter bg-white">
            <FAQSchema faqs={data} />
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#b02a44]">
                    Frequently Asked Questions (FAQs)
                </h2>

                <div className="space-y-4">
                    {data.map((faq, index) => {
                        const isOpen = activeIndex === index;
                        return (
                            <div key={index} className="overflow-hidden">
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className={`w-full flex items-center justify-between p-4 md:p-6 rounded-full border-2 border-[#b02a44] transition-all duration-300 ${isOpen
                                        ? "bg-[#b02a44] text-white"
                                        : "bg-white text-gray-800 hover:bg-pink-50"
                                        }`}
                                >
                                    <span className="text-left font-semibold text-base md:text-lg md:px-4">
                                        {faq.question}
                                    </span>
                                    <div className="flex-shrink-0">
                                        <img
                                            src={isOpen
                                                ? "/assets/surgeries/robotic-sciences/Arrow Up Icon.webp"
                                                : "/assets/surgeries/robotic-sciences/Arrow Down  Icon.webp"
                                            }
                                            alt={isOpen ? "Collapse" : "Expand"}
                                            className={`w-6 h-6 object-contain transition-transform duration-300 ${isOpen ? "" : "brightness-50"}`}
                                            style={isOpen ? { filter: 'brightness(0) invert(1)' } : {}}
                                        />
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div
                                                className="p-4 md:p-6 text-gray-700 text-sm md:text-base leading-relaxed md:px-10"
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

export default RoboticFAQ;
