import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Plus, Minus, ExternalLink } from 'lucide-react';
import FAQSchema from '@/utils/FAQSchema';

const BanjaraHillsFaqsAndVisit = () => {
    // 5 FAQ Questions requested by the user
    const faqsData = [
        {
            question: "Which is the best multispeciality hospital in Banjara Hills, Hyderabad?",
            answer: "TX Hospitals is a trusted multispeciality hospital in Banjara Hills, Hyderabad, offering advanced medical care, experienced specialist doctors, 24/7 emergency support, and patient-focused treatment."
        },
        {
            question: "Does TX Hospitals Banjara Hills provide 24/7 emergency care?",
            answer: "Yes, TX Hospitals Banjara Hills offers round-the-clock emergency care with rapid response support, critical care facilities, and experienced emergency medical teams."
        },
        {
            question: "Are cashless treatment and insurance facilities available?",
            answer: "Yes, TX Hospitals provides cashless hospitalization support through approved insurance providers for eligible treatments and medical procedures."
        },
        {
            question: "Which specialities are available at TX Hospitals Banjara Hills?",
            answer: "TX Hospitals offers cardiology, orthopaedics, neurology, gastroenterology, nephrology, pulmonology, urology, oncology, and other multispeciality healthcare services."
        },
        {
            question: "How can I book a doctor appointment at TX Hospitals Banjara Hills?",
            answer: "Patients can book appointments by phone, website form submission, or WhatsApp for quick consultation scheduling."
        }
    ];

    // State to track which FAQ is currently expanded
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-4 md:py-6 px-4 md:px-8 bg-white overflow-hidden">
            <FAQSchema faqs={faqsData} />
            <div className="max-w-[1440px] mx-auto">

                {/* Unified Premium Card exactly like the mockup */}
                <div className="bg-white border border-gray-200 rounded-[32px] p-6 md:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.01)]">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">

                        {/* Left Column: Frequently Asked Questions (FAQs) */}
                        <div className="w-full lg:w-[50%] flex flex-col">
                            <h2 className="text-gray-900 text-xl md:text-2xl lg:text-3xl font-bold mb-6 leading-tight">
                                Frequently Asked Questions
                            </h2>

                            <div className="flex flex-col gap-3">
                                {faqsData.map((faq, index) => {
                                    const isOpen = activeIndex === index;
                                    return (
                                        <div
                                            key={index}
                                            className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-colors duration-200"
                                        >
                                            {/* Accordion Header */}
                                            <button
                                                onClick={() => toggleFaq(index)}
                                                className="w-full flex justify-between items-center p-4 text-left gap-4 transition-all"
                                            >
                                                <span className="text-gray-900 text-sm md:text-base font-bold leading-snug">
                                                    {faq.question}
                                                </span>

                                                {/* Toggle Plus/Minus Icon with clean brand color */}
                                                <div className="shrink-0 w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-gray-800 border border-gray-100">
                                                    {isOpen ? (
                                                        <Minus className="w-3.5 h-3.5 text-[#b3204d]" strokeWidth={3} />
                                                    ) : (
                                                        <Plus className="w-3.5 h-3.5 text-gray-600" strokeWidth={3} />
                                                    )}
                                                </div>
                                            </button>

                                            {/* Expandable Accordion Body */}
                                            <AnimatePresence initial={false}>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                                    >
                                                        <div className="px-4 pb-4 pt-0 text-gray-700 text-sm leading-relaxed font-semibold border-t border-gray-100 bg-gray-50/30">
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

                        {/* Right Column: Visit Details & Interactive Map */}
                        <div className="w-full lg:w-[50%] flex flex-col">
                            <h2 className="text-gray-900 text-xl md:text-2xl lg:text-3xl font-bold mb-6 leading-tight">
                                Visit TX Hospitals Banjara Hills
                            </h2>

                            {/* Nested Horizontal Layout for Details & Map */}
                            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch h-full">

                                {/* Contact Details Stack */}
                                <div className="w-full md:w-[45%] flex flex-col gap-5 justify-between">

                                    {/* Address Block */}
                                    <div className="flex gap-3">
                                        <div className="shrink-0 mt-0.5">
                                            <MapPin className="w-5 h-5 text-[#b3204d]" strokeWidth={2.5} />
                                        </div>
                                        <div>
                                            <h4 className="text-gray-900 text-sm font-bold leading-none mb-1.5">
                                                Address
                                            </h4>
                                            <p className="text-gray-700 text-sm font-semibold leading-relaxed">
                                                8-2-315/B/1A/1/13A, Road No. 12, Banjara Hills, Hyderabad - 500034, Telangana, India
                                            </p>
                                        </div>
                                    </div>

                                    {/* Phone Block */}
                                    <div className="flex gap-3">
                                        <div className="shrink-0 mt-0.5">
                                            <Phone className="w-5 h-5 text-[#b3204d]" strokeWidth={2.5} />
                                        </div>
                                        <div>
                                            <h4 className="text-gray-900 text-sm font-bold leading-none mb-1.5">
                                                Phone
                                            </h4>
                                            <p className="text-gray-700 text-sm font-semibold leading-none">
                                                9144514459
                                            </p>
                                        </div>
                                    </div>

                                    {/* Email Block */}
                                    <div className="flex gap-3">
                                        <div className="shrink-0 mt-0.5">
                                            <Mail className="w-5 h-5 text-[#b3204d]" strokeWidth={2.5} />
                                        </div>
                                        <div>
                                            <h4 className="text-gray-900 text-sm font-bold leading-none mb-1.5">
                                                Email
                                            </h4>
                                            <p className="text-gray-700 text-sm font-semibold leading-none">
                                                info@txhospitals.in
                                            </p>
                                        </div>
                                    </div>

                                    {/* Timings Block */}
                                    <div className="flex gap-3">
                                        <div className="shrink-0 mt-0.5">
                                            <Clock className="w-5 h-5 text-[#b3204d]" strokeWidth={2.5} />
                                        </div>
                                        <div>
                                            <h4 className="text-gray-900 text-sm font-bold leading-none mb-1.5">
                                                Timings
                                            </h4>
                                            <p className="text-gray-700 text-sm font-semibold leading-none">
                                                24/7 Open
                                            </p>
                                        </div>
                                    </div>

                                </div>

                                {/* Map Box */}
                                <div className="w-full md:w-[55%] relative rounded-2xl overflow-hidden border border-gray-200 min-h-[250px] flex shadow-[0_4px_20px_rgba(0,0,0,0.02)]">

                                    {/* Floating Open in Maps Button */}
                                    <a
                                        href="https://www.google.com/maps/search/?api=1&query=TX+Hospitals+Banjara+Hills+Hyderabad"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute top-4 left-4 z-10 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm text-[11px] font-bold text-gray-800 flex items-center gap-1.5 hover:bg-gray-50 hover:text-[#b3204d] hover:border-gray-300 transition-all duration-200"
                                    >
                                        Open in Maps
                                        <ExternalLink className="w-3 h-3 text-[#b3204d]" strokeWidth={2.5} />
                                    </a>

                                    {/* Live Google Map Iframe */}
                                    <iframe
                                        src="https://maps.google.com/maps?q=TX%20Hospitals%20Banjara%20Hills%20Hyderabad&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                        className="w-full h-full min-h-[250px] border-0 z-0"
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default BanjaraHillsFaqsAndVisit;
