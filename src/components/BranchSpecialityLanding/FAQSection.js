import React, { useState } from 'react';
import { ChevronDown, MapPin, Phone } from 'lucide-react';
import FAQSchema from '@/utils/FAQSchema';
import dynamic from 'next/dynamic';
import { getBranchData } from '@/utils/branchLocationData';

const MapClient = dynamic(
    () => import('@/components/ContactUs/MapClient'),
    { ssr: false }
);

const FAQSection = ({ data, location }) => {
    const [openIndex, setOpenIndex] = useState(-1);

    if (!data || !Array.isArray(data) || data.length === 0) return null;

    // ── Resolve branch map data from the shared utility ──
    const branch = getBranchData(location);
    const mapCoords = branch.coords;
    const mapName = branch.mapName;

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const openGoogleMaps = () => {
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${mapCoords[0]},${mapCoords[1]}`, "_blank");
    };

    return (
        <section className="py-10 md:py-16" style={{ background: '#f8f9fa' }}>
            <FAQSchema faqs={data} />
            <div className="max-w-[1170px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center mb-10">
                    <h2 className="mb-3 font-bold" style={{ fontSize: 'clamp(24px, 3vw, 36px)', color: 'rgb(3, 2, 19)' }}>
                        Find Us &amp; <span style={{ color: 'rgb(189, 56, 92)' }}>FAQs</span>
                    </h2>
                    <p className="max-w-[560px] mx-auto text-gray-500" style={{ fontSize: 15, lineHeight: 1.7 }}>
                        Visit TX Hospitals {branch.displayName} or get answers to your most common questions below.
                    </p>
                </div>

                {/* Two-column: FAQs left | Map right */}
                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* ── LEFT: FAQ accordion ── */}
                    <div className="w-full lg:w-[58%] flex flex-col gap-3 order-2 lg:order-1">
                        {data.map((faq, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div
                                    key={index}
                                    className="rounded-xl overflow-hidden transition-all duration-300"
                                    style={{
                                        border: isOpen ? '1px solid rgb(189, 56, 92)' : '1px solid rgb(225, 225, 225)',
                                        boxShadow: isOpen ? '0 4px 15px rgba(189, 56, 92, 0.1)' : '0 2px 8px rgba(0,0,0,0.03)'
                                    }}
                                >
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full flex items-center justify-between px-6 py-4 md:py-5 text-left transition-colors"
                                        style={{ background: isOpen ? 'rgb(189, 56, 92)' : 'rgb(255, 255, 255)' }}
                                        aria-expanded={isOpen}
                                    >
                                        <span style={{ fontSize: '15px', fontWeight: 500, color: isOpen ? 'rgb(255, 255, 255)' : 'rgb(20, 20, 20)', lineHeight: 1.5, paddingRight: '1rem' }}>
                                            {faq.question}
                                        </span>
                                        <ChevronDown
                                            className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                            style={{ color: isOpen ? '#fff' : '#BD385C' }}
                                            size={20}
                                            strokeWidth={2.5}
                                        />
                                    </button>

                                    {isOpen && (
                                        <div className="px-6 py-5 faq-answer" style={{ background: '#fdf7f8' }}>
                                            <div
                                                className="text-[#3c3c3c] text-[15px] leading-relaxed font-normal"
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

            <style dangerouslySetInnerHTML={{
                __html: `
                .faq-answer p { margin-bottom: 0.5em; }
                .faq-answer p:last-child { margin-bottom: 0; }
            `}} />
        </section>
    );
};

export default FAQSection;
