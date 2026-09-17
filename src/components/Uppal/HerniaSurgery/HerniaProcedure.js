import React from 'react';
import { motion } from 'framer-motion';
import WhatsAppButton from '../WhatsAppButton';

const HerniaProcedure = ({ onBookClick }) => {
    const duringSurgery = [
        {
            title: "Anaesthesia",
            description: "General or local anaesthesia administered based on hernia type and patient condition."
        },
        {
            title: "Incision",
            description: "Small keyhole incisions (laparoscopic) or a single incision (open) depending on the approach chosen."
        },
        {
            title: "Hernia Repair",
            description: "The hernia defect is identified and the protruding tissue is carefully pushed back into place."
        },
        {
            title: "Mesh Placement",
            description: "A surgical mesh is used to reinforce the weakened muscle wall and prevent recurrence."
        },
        {
            title: "Closure",
            description: "Incisions are closed. Laparoscopic procedures leave minimal marks — often no visible scarring."
        }
    ];

    const recovery = [
        {
            title: "Hospital Stay",
            description: "Same-day or next-day discharge for most laparoscopic hernia repairs. Longer stay for complex cases."
        },
        {
            title: "Pain Management",
            description: "Mild discomfort managed with oral medication. Most patients report minimal pain after laparoscopic repair."
        },
        {
            title: "Early Mobilisation",
            description: "Walking is encouraged from day one. Early movement reduces the risk of complications and speeds recovery."
        },
        {
            title: "Return to Routine",
            description: "Most patients return to light daily activities within 3–5 days and full activity within 2–3 weeks."
        },
        {
            title: "Follow-Up & Long-Term Care",
            description: "Scheduled follow-up visits to monitor healing, wound integrity, and long-term hernia recurrence prevention."
        }
    ];

    return (
        <section className="py-8 md:py-16 px-6 bg-[#0a0a0a] text-white font-inter overflow-hidden relative">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-12">
                    <span className="text-[#be185d] font-bold text-xs md:text-sm uppercase tracking-widest block mb-2">
                        What to Expect
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
                        The Hernia Surgery Procedure
                    </h2>
                    <p className="text-gray-400 text-sm md:text-lg max-w-2xl leading-relaxed font-medium">
                        Understanding what happens before, during, and after surgery helps you prepare with confidence.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    {/* During Surgery */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#1a1a1a] p-8 md:p-10 rounded-[32px] border border-white/5"
                    >
                        <h3 className="text-xl md:text-2xl font-extrabold mb-8 pb-4 border-b border-white/10">During Surgery</h3>
                        <div className="space-y-8">
                            {duringSurgery.map((step, index) => (
                                <div key={index} className="flex gap-5">
                                    <div className="w-6 h-6 rounded-full bg-[#be185d] flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-1">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h4 className="text-base md:text-lg font-extrabold mb-1">{step.title}</h4>
                                        <p className="text-gray-400 text-sm md:text-[15px] leading-relaxed font-medium">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Post-Op Recovery */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-[#1a1a1a] p-8 md:p-10 rounded-[32px] border border-white/5"
                    >
                        <h3 className="text-xl md:text-2xl font-extrabold mb-8 pb-4 border-b border-white/10">Post-Operative Recovery</h3>
                        <div className="space-y-8">
                            {recovery.map((step, index) => (
                                <div key={index} className="flex gap-5">
                                    <div className="w-6 h-6 rounded-full bg-[#be185d] flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-1">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h4 className="text-base md:text-lg font-extrabold mb-1">{step.title}</h4>
                                        <p className="text-gray-400 text-sm md:text-[15px] leading-relaxed font-medium">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-4 w-full">
                    <button
                        onClick={onBookClick}
                        className="w-full sm:w-auto bg-white text-[#be185d] hover:bg-pink-50 font-extrabold py-4 px-6 md:px-12 rounded-full transition-all duration-300 ease-in-out shadow-2xl hover:shadow-pink-500/20 text-sm md:text-base lg:text-lg uppercase tracking-wider transform hover:-translate-y-1 hover:scale-105"
                    >
                        Get Doctor Consultation
                    </button>

                    <div className="w-full sm:w-auto">
                        <WhatsAppButton sizeClass="w-full sm:w-auto py-4 px-6 md:px-12 text-sm md:text-base lg:text-lg" />
                    </div>
                </div>
            </div>

            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#be185d]/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#be185d]/5 rounded-full blur-3xl pointer-events-none"></div>
        </section>
    );
};

export default HerniaProcedure;
