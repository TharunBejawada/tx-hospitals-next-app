import React, { useState } from 'react';
import Head from "next/head";
import SecondaryLayout from '@/components/Layouts/SecondaryLayout';
import useIsMobile from '@/hooks/useIsMobile';
import sanitize from "@/utils/sanitize";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { faqs } from '@/utils/faqsData';
import FAQSchema from '@/utils/FAQSchema';

export default function FAQs() {

    const isMobile = useIsMobile();
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <>
            <Head>
                <title>FAQs - TX Hospitals</title>
                <meta name="description" content="Find answers to frequently asked questions about TX Hospitals' healthcare packages, appointments, insurance, services, and more. Get all the information you need." />
            </Head>
            <SecondaryLayout>
                {isMobile ? (
                    <div className="-mt-6 font-inter mb-2">
                        <h1 className="text-xl p-1 font-bold text-pink-700">FAQs</h1>
                        <FAQSchema faqs={faqs} />
                        <div className="text-gray-700 p-1 leading-relaxed">
                            <div className="space-y-2">
                                {faqs.map((faq, index) => (
                                    <div
                                        key={index}
                                        className={`border-2 rounded-lg ${activeIndex === index
                                            ? "border-pink-600"
                                            : "border-pink-300"
                                            }`}
                                    >
                                        <button
                                            className={`w-full p-1 flex justify-between items-center text-left font-medium ${activeIndex === index ? "text-white border-b bg-pink-600 border-white" : "text-pink-600"
                                                }`}
                                            onClick={() => toggleFAQ(index)}
                                        >
                                            {faq.question}
                                            {activeIndex === index ? (
                                                <FaChevronDown className="text-white" />
                                            ) : (
                                                <FaChevronUp className="text-pink-600" />
                                            )}
                                        </button>
                                        {activeIndex === index && (
                                            <div className="p-2 text-black">
                                                <p
                                                    dangerouslySetInnerHTML={{
                                                        __html: sanitize(faq.answer.replace(/<ul>/g, '<ul class="list-disc ml-6">').replace(/<ol>/g, '<ol class="list-decimal ml-6">'))
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="mt-5 px-10 font-inter mb-2">
                        <h1 className="text-3xl p-2 font-bold text-pink-700">FAQs</h1>
                        <FAQSchema faqs={faqs} />
                        <div className="text-gray-700 p-4 leading-relaxed">
                            <div className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <div
                                        key={index}
                                        className={`border-2 rounded-lg ${activeIndex === index
                                            ? "border-pink-600"
                                            : "border-pink-300"
                                            }`}
                                    >
                                        <button
                                            className={`w-full p-4 flex justify-between items-center text-left font-medium ${activeIndex === index ? "text-white border-b bg-pink-600 border-white" : "text-pink-600"
                                                }`}
                                            onClick={() => toggleFAQ(index)}
                                        >
                                            {faq.question}
                                            {activeIndex === index ? (
                                                <FaChevronDown className="text-white" />
                                            ) : (
                                                <FaChevronUp className="text-pink-600" />
                                            )}
                                        </button>
                                        {activeIndex === index && (
                                            <div className="p-4 text-black">
                                                <p
                                                    dangerouslySetInnerHTML={{
                                                        __html: sanitize(faq.answer.replace(/<ul>/g, '<ul class="list-disc ml-6">').replace(/<ol>/g, '<ol class="list-decimal ml-6">'))
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </SecondaryLayout>
        </>
    );
}