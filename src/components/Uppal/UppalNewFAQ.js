import React, { useState } from 'react';
import { ChevronDown, MapPin, Phone, Clock } from 'lucide-react';
import FAQSchema from '@/utils/FAQSchema';
import dynamic from 'next/dynamic';

const MapClient = dynamic(
    () => import('@/components/ContactUs/MapClient'),
    { ssr: false }
);

const UppalNewFAQ = () => {
    const [openIndex, setOpenIndex] = useState(-1);

    const mapCoords = [17.402553358453122, 78.56694358887127];
    const mapName = "TX Hospitals, Uppal, Hyderabad";

    const faqs = [
        {
            question: "Is TX Hospitals Uppal open 24 hours?",
            answer: "Yes, TX Hospitals Uppal provides 24/7 emergency and critical care services. Our emergency department, ICU, ambulance support, and medical team are available round the clock to handle all medical emergencies."
        },
        {
            question: "Which insurances are accepted at TX Hospitals Uppal?",
            answer: "TX Hospitals Uppal accepts all major health insurance providers, TPAs, and government health schemes, including Aarogyasri, CGHS, ESI, Star Health, HDFC Ergo, ICICI Lombard, Medi Assist, and many more. Cashless treatment facilities are available for eligible patients."
        },
        {
            question: "How do I book an appointment with a doctor near Uppal?",
            answer: "You can book an appointment at TX Hospitals Uppal by calling the hospital, using WhatsApp support, or filling out the online appointment form on the website. Our patient care team will help you schedule a consultation with the right specialist."
        },
        {
            question: "Are treatments at TX Hospitals Uppal affordable?",
            answer: "Yes, TX Hospitals Uppal is committed to providing affordable healthcare with transparent pricing. We offer quality medical treatments, cashless insurance options, and flexible payment solutions without hidden charges."
        },
        {
            question: "Is there an ambulance service near Uppal?",
            answer: "Yes, TX Hospitals Uppal offers 24/7 ambulance services for medical emergencies in Uppal, Nagole, Boduppal, Ramanthapur, Habsiguda, Kothapet, and nearby areas. Emergency response teams are available to provide immediate medical assistance and transportation."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const openGoogleMaps = () => {
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${mapCoords[0]},${mapCoords[1]}`, "_blank");
    };

    return (
        <section id="faq" className="py-10 md:py-16" style={{ background: 'rgb(243, 243, 245)' }}>
            <FAQSchema faqs={faqs} />
            <div className="max-w-[1170px] mx-auto px-6">

                {/* Section Header */}
                <div className="text-center mb-10">
                    <h2 className="mb-3 font-bold" style={{ fontSize: 'clamp(24px, 3vw, 36px)', color: 'rgb(3, 2, 19)' }}>
                        Find Us &amp; <span style={{ color: 'rgb(189, 56, 92)' }}>FAQs</span>
                    </h2>
                    <p className="max-w-[560px] mx-auto text-gray-500" style={{ fontSize: 15, lineHeight: 1.7 }}>
                        Visit TX Hospitals Uppal or get answers to your most common questions below.
                    </p>
                </div>

                {/* Two-column: FAQs left | Map right */}
                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* ── LEFT: FAQ accordion ── */}
                    <div className="w-full lg:w-[58%] flex flex-col gap-3 order-2 lg:order-1">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div key={index} className="rounded-lg overflow-hidden transition-all duration-300 bg-white"
                                    style={{ border: '0.5px solid rgb(215,215,215)', boxShadow: 'rgba(0,0,0,0.03) 0px 4px 12px' }}>
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
                                        style={{ background: isOpen ? 'rgb(189,56,92)' : 'rgb(255,255,255)' }}
                                    >
                                        <span style={{ fontSize: 15, fontWeight: 500, color: isOpen ? '#fff' : 'rgb(3,2,19)', lineHeight: 1.5 }}>
                                            {faq.question}
                                        </span>
                                        <ChevronDown
                                            className={`flex-shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                            style={{ color: isOpen ? '#fff' : 'rgb(189,56,92)' }}
                                            size={18}
                                            strokeWidth={2.5}
                                        />
                                    </button>
                                    {isOpen && (
                                        <div className="px-5 py-4" style={{ background: 'rgb(254,236,236)' }}>
                                            <p style={{ fontSize: 14, fontWeight: 400, color: 'rgb(30,30,30)', lineHeight: 1.7, margin: 0 }}>
                                                {faq.answer}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* ── RIGHT: Map card (sticky) ── */}
                    <div className="w-full lg:w-[42%] lg:sticky lg:top-24 flex flex-col rounded-2xl overflow-hidden bg-white order-1 lg:order-2"
                        style={{ border: '0.5px solid rgb(215,215,215)', boxShadow: 'rgba(0,0,0,0.07) 0px 8px 24px' }}>

                        <div className="w-full relative z-0" style={{ height: 280 }}>
                            <MapClient coords={mapCoords} name={mapName} />
                        </div>

                        <div className="p-5 flex flex-col gap-3">
                            <h3 className="font-bold text-base" style={{ color: 'rgb(3,2,19)' }}>
                                TX Hospitals — Uppal
                            </h3>
                            <div className="flex items-start gap-2.5">
                                <MapPin className="mt-0.5 flex-shrink-0 w-4 h-4" style={{ color: 'rgb(189,56,92)' }} />
                                <span className="text-gray-600" style={{ fontSize: 13, lineHeight: 1.65 }}>
                                    #2-6-71, Bharath Nagar Colony, Near Masjid Uppal, Hyderabad, Telangana 500039
                                </span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Phone className="flex-shrink-0 w-4 h-4" style={{ color: 'rgb(189,56,92)' }} />
                                <a href="tel:+914043108108" className="hover:underline font-medium" style={{ fontSize: 13, color: 'rgb(189,56,92)' }}>
                                    +91-40-43 108 108
                                </a>
                            </div>
                            <button
                                onClick={openGoogleMaps}
                                className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg py-2.5 font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer"
                                style={{ background: 'rgb(189,56,92)', fontSize: 13 }}
                            >
                                <MapPin className="w-4 h-4" /> Get Directions
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UppalNewFAQ;
