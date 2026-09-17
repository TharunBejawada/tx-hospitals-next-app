import React from 'react';
import { motion } from 'framer-motion';
import WhatsAppButton from '../WhatsAppButton';

const HerniaTypes = ({ onBookClick }) => {
    const types = [
        {
            number: "1",
            title: "Inguinal Hernia",
            description: "The most common type — tissue pushes through a weak spot in the groin muscles, causing pain and a visible bulge."
        },
        {
            number: "2",
            title: "Umbilical Hernia",
            description: "Part of the intestine or fatty tissue bulges through the abdominal wall near the belly button. Common in newborns and adults."
        },
        {
            number: "3",
            title: "Femoral Hernia",
            description: "A section of tissue protrudes into the femoral canal near the upper thigh — more common in women, often requires prompt repair."
        },
        {
            number: "4",
            title: "Incisional Hernia",
            description: "Occurs at the site of a previous abdominal surgery where the muscle wall has weakened, allowing tissue to push through."
        },
        {
            number: "5",
            title: "Hiatal Hernia",
            description: "Part of the stomach pushes up through the diaphragm into the chest cavity, often causing acid reflux and heartburn."
        },
        {
            number: "6",
            title: "Epigastric Hernia",
            description: "Fatty tissue pushes through the abdominal wall between the navel and sternum, causing pain especially on exertion."
        }
    ];

    return (
        <section className="py-8 md:py-16 px-6 bg-white font-inter">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <span className="text-[#be185d] font-bold text-xs md:text-sm uppercase tracking-widest block mb-2">
                        Comprehensive Hernia Care
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                        Types of Hernia We Treat
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base max-w-3xl leading-relaxed font-medium">
                        Our hernia surgeons in Uppal are trained to treat all types of hernias using the most appropriate and minimally invasive techniques available.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
                    {types.map((type, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-50 p-6 md:p-8 rounded-[24px] flex flex-col items-start hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 rounded-full bg-[#be185d] flex items-center justify-center text-white font-bold text-sm">
                                    {type.number}
                                </div>
                                <h3 className="text-lg md:text-xl font-extrabold text-gray-900">{type.title}</h3>
                            </div>
                            <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed font-medium">
                                {type.description}
                            </p>
                        </motion.div>
                    ))}
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

export default HerniaTypes;
