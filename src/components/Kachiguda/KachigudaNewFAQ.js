import React, { useState } from 'react';
import { ChevronDown, MapPin, Phone, Clock } from 'lucide-react';
import FAQSchema from '@/utils/FAQSchema';
import dynamic from 'next/dynamic';

const MapClient = dynamic(
    () => import('@/components/ContactUs/MapClient'),
    { ssr: false }
);

const KachigudaNewFAQ = () => {
    const [openIndex, setOpenIndex] = useState(-1);

    const mapCoords = [17.389777991297837, 78.49544286499808];
    const mapName = "TX Hospitals, Kachiguda, Hyderabad";

    const faqs = [
        {
            question: "Which is the best hospital in Kachiguda, Hyderabad?",
            answer: "TX Hospitals Kachiguda is a trusted multispeciality hospital in Kachiguda offering expert doctors, emergency care, diagnostics, ICU support, surgeries, and complete family healthcare."
        },
        {
            question: "Does TX Hospitals Kachiguda provide emergency care?",
            answer: "Yes, TX Hospitals Kachiguda provides 24/7 emergency care for urgent medical needs such as chest pain, stroke symptoms, breathing difficulty, injuries, severe pain, and sudden illness."
        },
        {
            question: "What specialities are available at TX Hospitals Kachiguda?",
            answer: "The hospital offers care across cardiology, orthopedics, gastroenterology, nephrology, neurosciences, pediatrics, pulmonology, general medicine, urology, ENT, dermatology, and surgery."
        },
        {
            question: "Is TX Hospitals Kachiguda near Kachiguda Railway Station?",
            answer: "Yes, TX Hospitals Kachiguda is located on Kachiguda Station Road and is easily accessible from Kachiguda Railway Station and nearby areas."
        },
        {
            question: "Can I consult specialist doctors at TX Hospitals Kachiguda?",
            answer: "Yes, patients can consult experienced specialists across multiple departments for diagnosis, treatment, second opinions, and follow-up care."
        },
        {
            question: "Does TX Hospitals Kachiguda offer diagnostic services?",
            answer: "Yes, the hospital provides diagnostic support including lab tests, imaging, and other investigations required for accurate treatment planning."
        },
        {
            question: "How can I book an appointment at TX Hospitals Kachiguda?",
            answer: "You can book an appointment by calling the hospital helpline +91-40-48 108 108, filling the appointment form on the website or contacting TX Hospitals Kachiguda directly."
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
                        Visit TX Hospitals Kachiguda or get answers to your most common questions below.
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
                                TX Hospitals — Kachiguda
                            </h3>
                            <div className="flex items-start gap-2.5">
                                <MapPin className="mt-0.5 flex-shrink-0 w-4 h-4" style={{ color: 'rgb(189,56,92)' }} />
                                <span className="text-gray-600" style={{ fontSize: 13, lineHeight: 1.65 }}>
                                    3-2-841/1, Kachiguda Station Rd, Mahalaxmi Nilayam, Kachiguda, Hyderabad, Telangana 500027
                                </span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Phone className="flex-shrink-0 w-4 h-4" style={{ color: 'rgb(189,56,92)' }} />
                                <a href="tel:+914048108108" className="hover:underline font-medium" style={{ fontSize: 13, color: 'rgb(189,56,92)' }}>
                                    +91-40-48 108 108
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

export default KachigudaNewFAQ;
