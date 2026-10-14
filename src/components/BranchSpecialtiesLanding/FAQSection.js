import React, { useState } from 'react';
import { ChevronDown, MapPin, Phone } from 'lucide-react';
import FAQSchema from '@/utils/FAQSchema';
import dynamic from 'next/dynamic';
import { getBranchData } from '@/utils/branchLocationData';

const MapClient = dynamic(
    () => import('@/components/ContactUs/MapClient'),
    { ssr: false }
);

const FAQSection = ({ location }) => {
    const [openIndex, setOpenIndex] = useState(-1);

    const formatString = (str) => {
        if (!str) return '';
        return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    };

    const formattedLocation = formatString(location) || 'Miyapur';

    // ── Resolve branch map data from the shared utility ──
    const branch = getBranchData(location);
    const mapCoords = branch.coords;
    const mapName = branch.mapName;

    const miyapurFaqs = [
        {
            question: `What specialties are available at TX Hospitals ${formattedLocation}?`,
            answer: `TX Hospitals ${formattedLocation} offers expert care in cardiology, orthopaedics, robotic surgery, gastroenterology, neurology, nephrology, urology, ENT, pulmonology, obstetrics & gynaecology, and other key specialties.`
        },
        {
            question: `Is TX Hospitals ${formattedLocation} a multi-speciality hospital?`,
            answer: `Yes. TX Hospitals ${formattedLocation} is a multi-speciality hospital where patients can consult doctors from different departments, access diagnostic services and receive treatment support in one convenient location.`
        },
        {
            question: `Why is TX Hospitals considered among the Top hospitals near ${formattedLocation}?`,
            answer: `TX Hospitals is considered among the Top hospitals near ${formattedLocation} because it provides specialist consultations, advanced diagnostics, emergency support and patient-focused care across multiple medical departments.`
        },
        {
            question: `Can I consult specialist doctors at TX Hospitals ${formattedLocation}?`,
            answer: `Yes. Patients can consult experienced specialist doctors for diagnosis, second opinions, treatment planning, surgery guidance and follow-up care based on their health condition.`
        },
        {
            question: `Does TX Hospitals ${formattedLocation} provide second opinion support?`,
            answer: `Yes. Patients can get second opinion support from specialists to better understand their diagnosis, medical reports, surgery advice, treatment options and long-term care plans.`
        },
        {
            question: `Which doctor should I consult for chest pain or heart-related symptoms?`,
            answer: `For chest pain, breathlessness, high blood pressure, palpitations or heart-related concerns, patients can consult a cardiologist at TX Hospitals ${formattedLocation} for proper evaluation and guidance.`
        },
        {
            question: `Are diagnostic services available at TX Hospitals ${formattedLocation}?`,
            answer: `Yes. Patients can access diagnostic support along with specialist consultation, helping doctors evaluate health conditions and plan the right treatment more effectively.`
        },
        {
            question: `How can I book a consultation at TX Hospitals ${formattedLocation}?`,
            answer: `You can book a consultation with the required specialist at TX Hospitals by calling 9144514459 or by visiting official website.`
        }
    ];

    const kachigudaFaqs = [
        {
            question: `Is TX Hospitals Kachiguda a multispeciality hospital?`,
            answer: `Yes. TX Hospitals Kachiguda provides consultations, diagnostic support, medical care and surgical treatment across multiple specialties within one hospital.`
        },
        {
            question: `What medical specialties are available at TX Hospitals Kachiguda?`,
            answer: `TX Hospitals Kachiguda offers specialist care in Cardiology, Orthopaedics, Gastroenterology, Neurology, Nephrology, Urology, Pulmonology, ENT, Women's Health, Paediatrics, Oncology and other major departments.`
        },
        {
            question: `How do I choose the right specialist for my symptoms?`,
            answer: `You can share your main symptoms with our appointment team. Based on your concern, they can guide you towards the most appropriate medical department.`
        },
        {
            question: `Can I consult different specialists during the same treatment journey?`,
            answer: `Yes. When a health condition requires expertise from multiple departments, our doctors can coordinate the patient's evaluation and treatment plan.`
        },
        {
            question: `Does TX Hospitals Kachiguda provide diagnostic services?`,
            answer: `Yes. Diagnostic support is available to help specialists assess the patient's condition and plan suitable treatment based on clinical requirements.`
        },
        {
            question: `Is emergency care available at TX Hospitals Kachiguda?`,
            answer: `Emergency medical support is available for patients who require urgent assessment, stabilisation and further treatment.`
        },
        {
            question: `Which specialist treats joint pain and fractures?`,
            answer: `An orthopaedic specialist evaluates and treats fractures, joint pain, arthritis, sports injuries and other bone or movement-related conditions.`
        },
        {
            question: `How can I book an appointment at TX Hospitals Kachiguda?`,
            answer: `You can schedule an appointment with the required specialist by calling 9144514459 or visiting the official TX Hospitals website.`
        }
    ];

    const uppalFaqs = [
        {
            question: "Is TX Hospitals Uppal a multispeciality hospital?",
            answer: "Yes. TX Hospitals Uppal provides specialist consultations, diagnostic services, medical treatment, surgical care and critical care support across multiple departments."
        },
        {
            question: "What specialties are available at TX Hospitals Uppal?",
            answer: "TX Hospitals Uppal provides care across Cardiology, Orthopedics, Neurology, Gastroenterology, Pulmonology, Oncology, Urology, Nephrology, Internal Medicine, General Medicine, ENT, Obstetrics & Gynaecology, Paediatrics, Anaesthesia & Pain Management and Critical Care."
        },
        {
            question: "How can I know which specialist I should consult?",
            answer: "If you are unsure about the right department, share your symptoms with the TX Hospitals appointment team. They can help direct you to the appropriate specialty based on your healthcare concern."
        },
        {
            question: "Can I consult more than one specialist at TX Hospitals Uppal?",
            answer: "Yes. When a medical condition requires evaluation by doctors from different specialties, coordinated consultations can be arranged depending on the patient's clinical needs."
        },
        {
            question: "Does TX Hospitals Uppal provide diagnostic facilities?",
            answer: "Yes. Diagnostic support is available to help doctors evaluate medical conditions and plan further treatment based on the patient's symptoms and clinical findings."
        },
        {
            question: "Which doctor should I consult for chest pain or heart problems?",
            answer: "A cardiologist evaluates symptoms such as chest pain, palpitations, high blood pressure, shortness of breath and other heart-related concerns."
        },
        {
            question: "Which specialist treats joint pain, fractures and arthritis?",
            answer: "An orthopedic specialist evaluates and treats joint pain, fractures, arthritis, sports injuries, ligament problems and other bone and joint conditions."
        },
        {
            question: "Which doctor should I consult for breathing problems?",
            answer: "A pulmonologist treats conditions affecting the lungs and respiratory system, including asthma, COPD, pneumonia, persistent cough and breathing difficulty."
        },
        {
            question: "Is critical care available at TX Hospitals Uppal?",
            answer: "Yes. Critical Care services are available for patients who require close monitoring, intensive medical management and specialised support."
        },
        {
            question: "How can I book an appointment with a specialist at TX Hospitals Uppal?",
            answer: "You can book a consultation by calling 9144514459 or through the official TX Hospitals website."
        }
    ];

    const faqs = formattedLocation === 'Kachiguda'
        ? kachigudaFaqs
        : formattedLocation === 'Uppal'
            ? uppalFaqs
            : miyapurFaqs;

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const openGoogleMaps = () => {
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${mapCoords[0]},${mapCoords[1]}`, "_blank");
    };

    return (
        <section className="py-10 md:py-16" style={{ background: 'rgb(243, 243, 245)' }}>
            <FAQSchema faqs={faqs} />
            <div className="max-w-[1170px] mx-auto px-6">

                {/* Section Header */}
                <div className="text-center mb-10">
                    <h2 className="mb-3 font-bold" style={{ fontSize: 'clamp(24px, 3vw, 36px)', color: 'rgb(3, 2, 19)' }}>
                        Find Us &amp; <span style={{ color: 'rgb(189, 56, 92)' }}>FAQs</span>
                    </h2>
                    <p className="max-w-[560px] mx-auto text-gray-500" style={{ fontSize: 15, lineHeight: 1.7 }}>
                        Visit TX Hospitals {formattedLocation} or get answers to your most common questions below.
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
                                TX Hospitals — {branch.displayName}
                            </h3>
                            <div className="flex items-start gap-2.5">
                                <MapPin className="mt-0.5 flex-shrink-0 w-4 h-4" style={{ color: 'rgb(189,56,92)' }} />
                                <span className="text-gray-600" style={{ fontSize: 13, lineHeight: 1.65 }}>
                                    {branch.address}
                                </span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Phone className="flex-shrink-0 w-4 h-4" style={{ color: 'rgb(189,56,92)' }} />
                                <a href={branch.phoneHref} className="hover:underline font-medium" style={{ fontSize: 13, color: 'rgb(189,56,92)' }}>
                                    {branch.phone}
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

export default FAQSection;
