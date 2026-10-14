import React, { useState } from 'react';
import { ChevronDown, MapPin, Phone, Clock } from 'lucide-react';
import FAQSchema from '@/utils/FAQSchema';
import dynamic from 'next/dynamic';

const MapClient = dynamic(
    () => import('@/components/ContactUs/MapClient'),
    { ssr: false }
);

const BanjaraHillsNewFAQ = () => {
    const [openIndex, setOpenIndex] = useState(-1);

    const mapCoords = [17.408587026550897, 78.44449394391825];
    const mapName = "TX Hospitals, Banjara Hills, Hyderabad";

    const faqs = [
        {
            question: "Can I consult a specialist directly?",
            answer: "Yes. Patients can directly consult specialist doctors based on their health concern."
        },
        {
            question: "Does TX Hospitals, Banjara Hills have emergency services?",
            answer: "Yes, TX Hospitals, Banjara Hills provides 24/7 emergency and trauma care services with a dedicated team of experts ready to handle all medical emergencies."
        },
        {
            question: "Are health checkup packages available?",
            answer: "Yes, we offer comprehensive master health checkup packages tailored to different age groups and medical needs for preventive care."
        },
        {
            question: "Do I need to carry previous medical reports?",
            answer: "It is highly recommended to bring your previous medical reports, prescriptions, and imaging results to help the doctor better understand your medical history."
        },
        {
            question: "Does TX Hospitals offer advanced surgical treatments?",
            answer: "Yes, TX Hospitals, Banjara Hills is equipped with state-of-the-art operation theaters and offers advanced surgical treatments, including robotic and minimally invasive surgeries."
        },
        {
            question: "Are health insurance and cashless facilities available at TX Hospitals?",
            answer: "Yes, we accept major health insurance providers and offer cashless hospitalization facilities. Please check with our insurance desk for the complete list of empanelled providers."
        },
        {
            question: "Can I book appointments for different departments?",
            answer: "Yes, you can easily book appointments across multiple departments either by calling our helpline, using our online booking form, or directly at the hospital reception."
        },
        {
            question: "How do I know which doctor to consult?",
            answer: "Our front desk and online support team can guide you to the appropriate specialist based on your symptoms and medical concerns. Alternatively, you can consult a General Physician who will refer you to the right specialist."
        },
        {
            question: "How can I book an appointment at TX Hospitals, Banjara Hills?",
            answer: "You can book an appointment online through our website, by calling our direct helpline 040-66529999, or by visiting the hospital reception in person."
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
                    <h2 className="mb-3 text-2xl md:text-3xl lg:text-4xl font-bold font-poppins" style={{ color: 'rgb(3, 2, 19)' }}>
                        Find Us &amp; <span style={{ color: 'rgb(189, 56, 92)' }}>FAQs</span>
                    </h2>
                    <p className="max-w-[560px] mx-auto text-gray-500" style={{ fontSize: 15, lineHeight: 1.7 }}>
                        Visit TX Hospitals Banjara Hills or get answers to your most common questions below.
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
                                TX Hospitals — Banjara Hills
                            </h3>
                            <div className="flex items-start gap-2.5">
                                <MapPin className="mt-0.5 flex-shrink-0 w-4 h-4" style={{ color: 'rgb(189,56,92)' }} />
                                <span className="text-gray-600" style={{ fontSize: 13, lineHeight: 1.65 }}>
                                    8-2-680/A, Road No. 12, Sri Ram Nagar Colony, Banjara Hills, Hyderabad, Telangana 500028
                                </span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Phone className="flex-shrink-0 w-4 h-4" style={{ color: 'rgb(189,56,92)' }} />
                                <a href="tel:04066529999" className="hover:underline font-medium" style={{ fontSize: 13, color: 'rgb(189,56,92)' }}>
                                    040-66529999
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

export default BanjaraHillsNewFAQ;
