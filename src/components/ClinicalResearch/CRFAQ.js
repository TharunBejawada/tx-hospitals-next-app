"use client";
import { useState } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import { motion } from "framer-motion";

const faqs = [
    {
        question: "1. What is a clinical trial?",
        answer: "A clinical trial is a research study conducted to evaluate the safety and effectiveness of new medications, vaccines, medical devices, diagnostic methods, or treatment approaches. Clinical trials help advance medical science and improve patient care while following strict ethical and regulatory guidelines."
    },
    {
        question: "2. Why should I participate in a clinical trial?",
        answer: "Participation in a clinical trial may provide access to new treatments, closer medical monitoring, and the opportunity to contribute to medical advancements that may benefit future patients. Participation is entirely voluntary, and patients may withdraw from a study at any time without affecting their standard medical care."
    },
    {
        question: "3. Is participation in a clinical trial safe?",
        answer: "Patient safety is our highest priority. All clinical trials conducted at TX Hospitals are reviewed and approved by registered Ethics Committees and are conducted in accordance with Good Clinical Practice (GCP), applicable regulatory requirements, and established safety monitoring procedures."
    },
    {
        question: "4. How do I know if I am eligible for a clinical trial?",
        answer: "Each clinical trial has specific eligibility criteria based on factors such as age, medical condition, treatment history, and overall health status. Our research team will conduct a screening assessment to determine whether a patient qualifies for a particular study."
    },
    {
        question: "5. Will my personal and medical information remain confidential?",
        answer: "Yes. Participant privacy and confidentiality are strictly protected. Personal information is handled in accordance with applicable ethical, regulatory, and data protection requirements. Information shared with sponsors is generally coded and does not directly identify participants."
    },
    {
        question: "6. Will I be paid for participating in a clinical trial?",
        answer: "The study sponsor typically covers costs related to research-specific procedures required by the clinical trial. Depending on the study protocol, participants may also receive reimbursement for travel and other approved expenses. The research team will explain all study-related costs before enrolment."
    },
    {
        question: "7. What is informed consent?",
        answer: "Informed consent is a process through which the research team explains the purpose of the study, procedures involved, potential risks and benefits, alternative treatment options, and participant rights. Participation begins only after you voluntarily agree and sign the informed consent document."
    },
    {
        question: "8. How long does participation in a clinical trial last?",
        answer: "The duration varies depending on the study. Some studies may involve a few visits over several weeks, while others may continue for months or years. The study schedule will be explained before enrolment."
    },
    {
        question: "9. What happens if I experience a side effect during the study?",
        answer: "Participants should immediately inform the research team about any symptoms or concerns. Medical care will be provided as required, and all adverse events will be monitored, documented, and reported according to regulatory requirements."
    },
    {
        question: "10. How can I find out about ongoing clinical trials at TX Hospitals?",
        answer: "Patients may contact the Clinical Research Unit directly or speak with their treating physician to learn about ongoing studies for which they may be eligible."
    }
];

export default function CRFAQ() {
    const isMobile = useIsMobile();
    const [openIndex, setOpenIndex] = useState(null);

    if (isMobile === null) return null;

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={`bg-[#240c17] text-white w-full ${isMobile ? 'py-12 px-6' : 'py-20 px-12 md:px-24'}`}>
            <div className="max-w-4xl mx-auto flex flex-col items-start text-left">

                {/* Header */}
                <div className="mb-12 w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 mb-4"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-600"></div>
                        <span className="text-pink-600 font-bold uppercase tracking-[0.2em] text-xs md:text-sm">
                            FAQS
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className={`font-serif mb-6 ${isMobile ? 'text-4xl' : 'text-5xl md:text-6xl'}`}
                    >
                        Frequently Asked Questions
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        whileInView={{ opacity: 1, width: "3rem" }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="h-[2px] bg-pink-700"
                    ></motion.div>
                </div>

                {/* FAQs List */}
                <div className="space-y-4 w-full">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="border border-white/10 rounded-2xl overflow-hidden bg-[#240c17]">
                            <button
                                onClick={() => toggleFAQ(idx)}
                                className={`w-full flex justify-between items-center px-6 py-5 text-left transition-colors duration-300
                                    ${openIndex === idx ? "bg-pink-900/40 text-white" : "text-gray-200 hover:bg-white/5"}`}
                            >
                                <span className={`font-semibold pr-4 ${isMobile ? 'text-sm' : 'text-base'}`}>{faq.question}</span>
                                <svg
                                    className={`w-5 h-5 flex-shrink-0 text-pink-500 transform transition-transform duration-300 ${openIndex === idx ? "rotate-180" : ""}`}
                                    fill="none"
                                    alt="Image"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {openIndex === idx && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className={`px-6 pb-5 pt-2 text-gray-400 bg-pink-900/40 ${isMobile ? 'text-xs' : 'text-sm leading-relaxed'}`}
                                >
                                    {faq.answer}
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
