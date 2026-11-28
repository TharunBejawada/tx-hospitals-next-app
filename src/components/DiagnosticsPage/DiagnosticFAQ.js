import React, { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import sanitize from "@/utils/sanitize";
import FAQSchema from "@/utils/FAQSchema";

export default function DiagnosticFAQ({ faqSection = {} }) {
    const [openIndex, setOpenIndex] = useState(-1);

    const faqs = Array.isArray(faqSection.faqs)
        ? faqSection.faqs.filter((f) => f && (f.question?.trim() || f.answer?.trim()))
        : [];

    const hasContent = faqSection.title?.trim() || faqs.length > 0;
    if (!hasContent) return null;

    const midPoint = Math.ceil(faqs.length / 2);
    const leftFaqs = faqs.slice(0, midPoint);
    const rightFaqs = faqs.slice(midPoint);

    const toggleFaq = (globalIdx) => {
        setOpenIndex((prev) => (prev === globalIdx ? -1 : globalIdx));
    };

    const renderFaqCard = (faq, globalIdx) => {
        const isOpen = openIndex === globalIdx;
        return (
            <div
                key={globalIdx}
                className="bg-white rounded-xl border border-[#F3DCE4] p-5 shadow-sm transition-all"
            >
                <button
                    type="button"
                    onClick={() => toggleFaq(globalIdx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-start justify-between gap-4 text-left cursor-pointer"
                >
                    <span className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                        {faq.question}
                    </span>
                    <span className="text-[#A8204B] flex-shrink-0 mt-0.5">
                        {isOpen ? <FiX className="w-4 h-4" /> : <FiPlus className="w-4 h-4" />}
                    </span>
                </button>

                {isOpen && faq.answer && (
                    <div
                        className="text-gray-600 text-xs sm:text-sm leading-relaxed mt-3 [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:text-gray-800 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 [&_a]:text-[#A8204B] [&_a]:underline"
                        dangerouslySetInnerHTML={{ __html: sanitize(faq.answer) }}
                    />
                )}
            </div>
        );
    };

    return (
        <section className="w-full bg-[#FAF1F4] py-12 md:py-16 px-4 sm:px-6 lg:px-8 font-inter">
            <FAQSchema faqs={faqs} />

            <div className="max-w-7xl mx-auto">
                {faqSection.title && (
                    <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#b51f56] text-center mb-10">
                        {faqSection.title}
                    </h2>
                )}

                {faqs.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                        <div className="space-y-4">
                            {leftFaqs.map((faq, idx) => renderFaqCard(faq, idx))}
                        </div>
                        <div className="space-y-4">
                            {rightFaqs.map((faq, idx) => renderFaqCard(faq, midPoint + idx))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
