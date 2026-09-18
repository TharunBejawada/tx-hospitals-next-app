// components/FAQ.js
"use client";
import { useState } from "react";
import FAQSchema from "@/utils/FAQSchema";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        question: "Where can I access the current packages offered by TX Hospitals?",
        answer:
            "All our health offers and health packages are advertised on our website.",
    },
    {
        question: "How do I book an appointment for the package?",
        answer:
            "You can book an appointment through our website or by contacting our reception.",
    },
    {
        question: "What healthcare packages does TXH offer?",
        answer:
            "TXH offers a wide range of healthcare packages including preventive health checks, specialty packages, and more.",
    },
    {
        question:
            "How can I access the tariff list for admission and procedures of TXH?",
        answer:
            "The tariff list is available at the hospital reception and on our official website.",
    },
    {
        question: "Do TX Hospitals offer health care education?",
        answer:
            "Yes, TX Hospitals provides health awareness and education programs regularly.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-pink-50/50 py-8 px-4 md:py-10 md:px-6 xl:py-12 xl:px-6 overflow-hidden">
            <div className="max-w-4xl mx-auto">
                {/* Heading Block */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-[10px] font-bold uppercase tracking-widest mb-3 border border-pink-200">
                        Common Queries
                    </span>
                    <h2 className="font-extrabold text-gray-900 mb-4 text-4xl md:text-5xl">
                        Frequently Asked <span className="text-pink-700 relative">Questions
                            <span className="absolute -bottom-1 left-0 w-full h-1 bg-pink-200/50 rounded-full"></span>
                        </span>
                    </h2>
                </motion.div>

                <FAQSchema faqs={faqs} />

                {/* FAQ List */}
                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.03 }}
                            viewport={{ once: true }}
                        >
                            <button
                                onClick={() => toggleFAQ(idx)}
                                className={`w-full flex justify-between items-center px-6 py-5 rounded-3xl border-2 transition-all duration-300 text-left
                                    ${openIndex === idx
                                        ? "bg-pink-700 border-pink-700 text-white shadow-lg shadow-pink-200 font-bold"
                                        : "border-gray-100 text-gray-800 bg-white hover:border-pink-300 hover:shadow-md font-bold"
                                    }`}
                            >
                                <span className="pr-4 text-sm md:text-base">{faq.question}</span>
                                <div className={`flex-shrink-0 transition-transform duration-300 ${openIndex === idx ? "rotate-180" : ""}`}>
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        alt="Image"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={3}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 py-4 text-xs md:px-8 md:py-6 md:text-sm text-gray-600 font-medium leading-relaxed bg-pink-50/50 mt-2 rounded-3xl border border-pink-100">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
