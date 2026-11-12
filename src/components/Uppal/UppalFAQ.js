import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import FAQSchema from '@/utils/FAQSchema';

const faqs = [
    {
        question: "Is TX Hospitals Uppal open 24 hours?",
        answer: "Yes, TX Hospitals Uppal operates a 24/7 emergency department with experienced doctors, nursing staff, and paramedics available round the clock."
    },
    {
        question: "Which insurances are accepted at TX Hospitals Uppal?",
        answer: "We accept all major health insurance plans, TPAs, and government schemes including CGHS, ESI, and Aarogyasri. The process is fully cashless - our insurance desk handles all pre-authorisation and paperwork on your behalf."
    },
    {
        question: "How do I book an appointment with a doctor near Uppal?",
        answer: "You can book an appointment by calling +91-9144514459, messaging us on WhatsApp, or visiting TX Hospitals Uppal directly. Walk-ins are also welcome for OPD consultations during working hours."
    },
    {
        question: "Are treatments at TX Hospitals Uppal affordable?",
        answer: "Yes, TX Hospitals Uppal offers transparent, competitive pricing with no hidden charges. We also offer 0% EMI options for planned treatments and surgeries - quality healthcare for every family."
    },
    {
        question: "Is there an ambulance service near Uppal?",
        answer: "Yes, for emergencies, our ambulance service is available across Uppal, Nagole, Boduppal, Kothapet, Habsiguda and surrounding areas. Call +91-9144514459 immediately for emergency assistance."
    }
];

const UppalFAQ = () => {
    // Start with all items collapsed (-1)
    const [openIndex, setOpenIndex] = useState(-1);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <section className="bg-white py-10 md:py-16 px-6 md:px-10 lg:px-12">
            <FAQSchema faqs={faqs} />
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8 md:mb-12">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-pink-700 mb-3 block">
                        Common Questions
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Frequently Asked <span className="text-pink-700">Questions</span>
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium">
                        Everything you need to know about TX Hospitals, Uppal, answered clearly and honestly.
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="border-t border-gray-200">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div key={index} className="border-b border-gray-200">
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                                >
                                    <h3 className={`text-base md:text-lg font-bold transition-colors duration-300 ${isOpen ? 'text-pink-700' : 'text-gray-900 group-hover:text-pink-700'}`}>
                                        {faq.question}
                                    </h3>
                                    <motion.div
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={`ml-4 flex-shrink-0 ${isOpen ? 'text-pink-700' : 'text-gray-400 group-hover:text-pink-700'}`}
                                    >
                                        <ChevronDown size={20} />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <p className="pb-6 text-gray-600 text-sm md:text-base leading-relaxed font-medium">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                {/* Footer Note */}
                <div className="mt-12 text-center">
                    <p className="text-sm text-gray-500 font-medium">
                        Still have a question? Our patient helpdesk is available 7 days a week.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default UppalFAQ;
