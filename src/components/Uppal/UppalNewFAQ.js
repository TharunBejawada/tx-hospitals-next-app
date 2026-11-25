import React, { useState } from 'react';
import { ChevronDown, MapPin, Phone, Clock } from 'lucide-react';
import FAQSchema from '@/utils/FAQSchema';
import dynamic from 'next/dynamic';
import { openBranchInGoogleMaps } from '@/utils/branchLocationData';

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
            answer: "Yes. The emergency department at TX Hospitals Uppal is open 24 hours a day, 7 days a week, including Sundays and public holidays. It handles accidents, injuries, chest pain and other urgent problems. In an emergency, call +91 91445 14459."
        },
        {
            question: "Which insurances are accepted at TX Hospitals Uppal?",
            answer: "TX Hospitals Uppal offers cashless treatment for eligible health insurance policies. Bring your insurance card and a photo ID, and the insurance desk will arrange pre-authorisation with your insurer or TPA. To check whether your policy is covered, call +91 91445 14459."
        },
        {
            question: "How do I book an appointment with a doctor at TX Hospitals Uppal?",
            answer: "Call +91 91445 14459 or 040-43 108 108, message +91 91445 14459 on WhatsApp, or book online at txhospitals.in and choose Uppal as the location. Walk-in consultations are available during OPD hours."
        },
        {
            question: "Are treatments at TX Hospitals Uppal affordable?",
            answer: "Costs depend on the treatment, room category and insurance cover. The billing team gives an estimate before any planned procedure, and cashless insurance is available for eligible policies. Health checkup packages include the Whole Body, Master Health, Executive Health – Pro, Cardiac, Kidney, Gastro, Lungs and Orthopedic checkups. Call +91 91445 14459 for current package prices."
        },
        {
            question: "Is there an ambulance service at TX Hospitals Uppal?",
            answer: "Yes. TX Hospitals Uppal runs an ambulance service for Uppal and nearby areas, including Nagole, Boduppal, Ramanthapur, Habsiguda, Nacharam and Kothapet. Call +91 91445 14459, available 24 hours."
        },
        {
            question: "Which specialties are available at TX Hospitals Uppal?",
            answer: `<ul class="list-disc pl-5 space-y-2 mb-3">
<li><strong>Gynecology &amp; Obstetrics (Dr. L. Rama Devi Pasumarthy):</strong> pregnancy care, normal and painless delivery, high-risk pregnancy, PCOS, menopause care, laparoscopic gynecology surgery</li>
<li><strong>Nephrology (Dr. Gangadhar Bathini):</strong> dialysis, chronic kidney disease and acute kidney injury care, kidney stones, kidney biopsy</li>
<li><strong>Neurology (Dr. K. Amareshwara Rao, Dr. Ashwini Goli):</strong> stroke, epilepsy, Parkinson's disease, Alzheimer's disease, EEG and nerve conduction studies</li>
<li><strong>Neurosurgery (Dr. P V Satyendra Vardhinedi):</strong> brain tumour, brain and spine surgery</li>
<li><strong>Urology (Dr. Keerthana Kota):</strong> kidney stones (RIRS, laser lithotripsy), enlarged prostate (BPH), recurrent urinary infections, laparoscopic urology</li>
<li><strong>Orthopaedics</strong> (Dr. Jagdish Pusa, Dr. M. Kumar Bhanu)</li>
<li><strong>Surgical Oncology</strong> (Dr. U Azadh Chandrashekhar)</li>
</ul>
<p>24/7 emergency care, ICU, a 24/7 CT scan and imaging centre, laboratory services and health checkups are on site. Call +91 91445 14459 to book.</p>`
        },
        {
            question: "Is there a gynecologist at TX Hospitals Uppal?",
            answer: "Yes. Dr. L. Rama Devi Pasumarthy, a gynecologist with 11+ years of experience, consults at TX Hospitals Uppal and Kachiguda. The gynecology team handles pregnancy care, normal and painless delivery, high-risk pregnancy, PCOS, menopause and laparoscopic gynecology surgery. Book at +91 91445 14459."
        },
        {
            question: "Is a CT scan available at TX Hospitals Uppal, and do I need a prescription?",
            answer: "Yes. TX Hospitals Uppal has a 24/7 CT scan and imaging centre, so scans are available day and night, including for emergencies. Call +91 91445 14459 to check whether your scan needs a doctor's referral and when the report will be ready."
        },
        {
            question: "Where is TX Hospitals Uppal located?",
            answer: "TX Hospitals Uppal is at #2-6-71, Bharath Nagar Colony, near Masjid Uppal, Hyderabad, Telangana 500039. For directions, open TX Hospitals Uppal on Google Maps or call +91 91445 14459."
        },
        {
            question: "Does TX Hospitals Uppal have an ICU?",
            answer: "Yes. TX Hospitals Uppal has an ICU for critically ill patients and emergency admissions, staffed 24 hours a day. For ICU admission or transfer enquiries, call +91 91445 14459."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const openGoogleMaps = () => {
        openBranchInGoogleMaps(mapName, mapCoords);
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
                                            <div
                                                className="text-[14px] font-normal text-[rgb(30,30,30)] leading-[1.7]"
                                                dangerouslySetInnerHTML={{ __html: faq.answer }}
                                            />
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
                                    040-43 108 108
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
