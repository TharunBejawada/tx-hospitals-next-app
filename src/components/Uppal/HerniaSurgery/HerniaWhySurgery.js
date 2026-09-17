import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import WhatsAppButton from '../WhatsAppButton';

const HerniaWhySurgery = ({ onBookClick }) => {
    const risks = [
        {
            title: "Increasing Pain & Discomfort",
            description: "The hernia grows larger over time, causing more pain and affecting daily activities."
        },
        {
            title: "Incarceration",
            description: "The hernia can become trapped and irreducible, restricting bowel movement and blood flow."
        },
        {
            title: "Strangulation — Medical Emergency",
            description: "Blood supply to the herniated tissue gets cut off. This is life-threatening and requires emergency surgery."
        },
        {
            title: "Higher Surgical Risk",
            description: "Emergency hernia surgery carries significantly higher complication rates than planned surgery."
        },
        {
            title: "Reduced Quality of Life",
            description: "Chronic discomfort, limitation of movement, and inability to work or exercise takes a lasting toll."
        }
    ];

    const whyChoose = [
        {
            title: "Experienced Hernia Surgeons",
            description: "20+ years of combined expertise in laparoscopic, robotic, and open hernia repair."
        },
        {
            title: "State-of-the-Art Techniques",
            description: "3D mesh repair, laparoscopic and robotic surgery for minimal pain and faster healing."
        },
        {
            title: "High Success Rate",
            description: "Thousands of successful hernia surgeries performed with consistently low recurrence rates."
        },
        {
            title: "Comprehensive Hernia Programme",
            description: "From diagnosis to surgery to post-operative follow-up — complete care under one roof."
        },
        {
            title: "All Major Insurances Accepted",
            description: "Cashless treatment, zero hidden charges, and complete documentation assistance."
        }
    ];

    return (
        <section className="py-8 md:py-16 px-6 bg-gray-50 font-inter">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <span className="text-[#be185d] font-bold text-xs md:text-sm uppercase tracking-widest block mb-2">
                        Make an Informed Decision
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                        Why You Should Not Delay Hernia Surgery
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base max-w-3xl leading-relaxed font-medium">
                        A hernia does not resolve on its own. Delaying treatment increases the risk of serious, life-threatening complications.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Risks Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-6 md:p-10 rounded-[32px] shadow-sm border border-orange-50"
                    >
                        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-orange-50">
                            <AlertTriangle className="text-orange-500 w-6 h-6" />
                            <h3 className="text-xl md:text-2xl font-extrabold text-orange-900">Risks of Delaying Treatment</h3>
                        </div>
                        <div className="space-y-8">
                            {risks.map((risk, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="bg-orange-100 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-1">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                    </div>
                                    <div>
                                        <h4 className="text-base md:text-lg font-extrabold text-gray-900 mb-1">{risk.title}</h4>
                                        <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed font-medium">{risk.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Why Choose Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-6 md:p-10 rounded-[32px] shadow-sm border border-green-50"
                    >
                        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-green-50">
                            <CheckCircle2 className="text-green-500 w-6 h-6" />
                            <h3 className="text-xl md:text-2xl font-extrabold text-green-900">Why Choose TX Hospitals</h3>
                        </div>
                        <div className="space-y-8">
                            {whyChoose.map((item, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="bg-green-100 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-1">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    </div>
                                    <div>
                                        <h4 className="text-base md:text-lg font-extrabold text-gray-900 mb-1">{item.title}</h4>
                                        <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed font-medium">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-4 w-full">
                    <button
                        onClick={onBookClick}
                        className="w-full sm:w-auto bg-[#be185d] hover:bg-[#a2144e] text-white font-extrabold py-4 px-6 md:px-12 rounded-full transition-all shadow-xl text-sm md:text-base lg:text-lg uppercase tracking-wider transform hover:scale-105"
                    >
                        Get Doctor Consultation
                    </button>

                    <div className="w-full sm:w-auto">
                        <WhatsAppButton sizeClass="w-full sm:w-auto py-4 px-6 md:px-12 text-sm md:text-base lg:text-lg" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HerniaWhySurgery;
