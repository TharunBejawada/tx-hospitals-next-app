import React, { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FAQSchema from "@/utils/FAQSchema";

export const IP_FAQS = [
    {
        question: "How can international patients book an appointment at TX Hospitals?",
        answer: "You can book an appointment through our website or contact our international patient support team for assistance."
    },
    {
        question: "Can I consult a doctor before travelling to India?",
        answer: "Yes, online consultations and second opinions may be arranged based on the doctor's availability."
    },
    {
        question: "Does TX Hospitals assist with medical visa documentation?",
        answer: "Yes, our team helps with medical visa invitation letters and required hospital documents."
    },
    {
        question: "Can I receive an estimated treatment cost before travelling?",
        answer: "Yes, we can provide an estimated cost after reviewing your medical reports and treatment needs."
    },
    {
        question: "Does TX Hospitals help with airport pickup and accommodation?",
        answer: "Yes, our team can help arrange airport transfers and guide you in finding nearby accommodation."
    },
    {
        question: "Can a family member accompany me during treatment?",
        answer: "Yes, family members can accompany you, subject to visa requirements and hospital policies."
    },
    {
        question: "What documents should I bring for medical treatment in India?",
        answer: "Bring your passport, visa, medical reports, prescriptions and previous treatment records."
    },
    {
        question: "Will I receive follow-up care after returning to my country?",
        answer: "Yes, follow-up consultations can be arranged online when needed and available."
    }
];

export default function IPFAQSection() {
    // Initially all FAQs are closed
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    return (
        <section id="faqs" className="py-8 sm:py-10 md:py-12 bg-white border-t border-gray-100">
            {/* Structured Schema for SEO Rich Results */}
            <FAQSchema faqs={IP_FAQS} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <div className="text-center mb-6 sm:mb-8">
                    <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#BD2850] block mb-2">
                        FAQS
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#111827] tracking-tight leading-tight">
                        Frequently Asked Questions
                    </h2>
                </div>

                {/* FAQ Accordion List */}
                <div className="space-y-3.5 sm:space-y-4">
                    {IP_FAQS.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                                    isOpen
                                        ? "border-pink-300 shadow-sm"
                                        : "border-gray-200/90 hover:border-pink-200"
                                }`}
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleFAQ(index)}
                                    aria-expanded={isOpen}
                                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer group"
                                >
                                    <span className="text-sm sm:text-base md:text-[17px] font-bold text-gray-900 group-hover:text-[#BD2850] transition-colors pr-4 leading-snug">
                                        {faq.question}
                                    </span>
                                    <span className="shrink-0 flex items-center justify-center w-6 h-6">
                                        <Plus
                                            className={`w-4 h-4 text-[#BD2850] stroke-[2.6] transition-transform duration-300 ${
                                                isOpen ? "rotate-45" : "rotate-0"
                                            }`}
                                        />
                                    </span>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            key="content"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed font-normal">
                                                {faq.answer}
                                            </div>
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

