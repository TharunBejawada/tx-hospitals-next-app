import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, ShieldCheck, CreditCard, Bed, ArrowRight, Trophy } from 'lucide-react';
import Image from 'next/image';
import WhatsAppButton from './WhatsAppButton';
import BookAppointmentForm from '@/components/Blogs/BookAppointemntForm';

const UppalHero = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const features = [
        {
            icon: <Users className="w-5 h-5 text-pink-700" />,
            text: "50+ Expert Doctors across 13+ specialties — all under one roof in Uppal"
        },
        {
            icon: <Clock className="w-5 h-5 text-pink-700" />,
            text: "24/7 Emergency Care, our team is always ready when you need us most"
        },
        {
            icon: <ShieldCheck className="w-5 h-5 text-pink-700" />,
            text: "All Major Insurances Accepted, cashless process, zero paperwork hassle"
        },
        {
            icon: <CreditCard className="w-5 h-5 text-pink-700" />,
            text: "Affordable Treatments with Transparent Pricing, no hidden charges, ever"
        },
        {
            icon: <Bed className="w-5 h-5 text-pink-700" />,
            text: "100+ Beds, Advanced OTs, Modern ICU, fully equipped for every condition"
        }
    ];

    return (
        <section className="relative w-full bg-white overflow-hidden py-6 lg:py-12 px-6 md:px-10 lg:px-12">
            <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col space-y-4 lg:pr-8"
                    >
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-widest mb-4 border border-pink-200">
                                Best Hospital in Uppal
                            </span>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                                Your Trusted <span className="text-pink-700 relative inline-block">Multi-Specialty
                                    <span className="absolute -bottom-1 left-0 w-full h-1 bg-pink-200/50 rounded-full"></span>
                                </span> Hospital in Uppal
                            </h1>
                        </div>

                        <p className="text-base text-gray-600 max-w-xl leading-relaxed">
                            World-class healthcare, right in your neighbourhood. From routine check-ups to complex surgeries, TX Hospitals Uppal is your first call for every health need.
                        </p>

                        <div className="space-y-3 pt-2">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + (index * 0.1) }}
                                    className="flex items-start gap-3"
                                >
                                    <div className="mt-0.5 bg-pink-50 p-1.5 rounded-lg shrink-0 border border-pink-100">
                                        {feature.icon}
                                    </div>
                                    <p className="text-gray-700 text-base">{feature.text}</p>
                                </motion.div>
                            ))}
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-6 w-full sm:w-auto">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full sm:w-auto bg-pink-700 text-white px-6 py-3 rounded-xl font-bold text-base hover:bg-pink-800 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-md hover:shadow-xl hover:shadow-pink-500/30 shrink-0"
                            >
                                Book an Appointment
                            </button>

                            <div className="w-full sm:w-auto">
                                <WhatsAppButton sizeClass="w-full sm:w-auto px-6 py-3 text-base" />
                            </div>

                            <a
                                href="tel:+919247903419"
                                className="w-full sm:w-auto border-2 border-pink-700 text-pink-700 px-6 py-3 rounded-xl font-bold text-base hover:bg-pink-50 transition-all transform hover:scale-105 text-center shrink-0"
                            >
                                Call Now
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Image Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative max-w-md lg:max-w-lg mx-auto w-full mt-8 lg:mt-0"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl z-10 border-4 border-white">
                            <Image
                                src="/assets/Our Location/Uppal Location Image.png"
                                alt="TX Hospitals Uppal"
                                width={600}
                                height={450}
                                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Floating Card 1: 24/7 Emergency */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="absolute -top-4 -right-4 md:-right-6 bg-pink-700 text-white p-3 md:p-4 rounded-2xl shadow-xl z-20 flex flex-col items-center justify-center text-center max-w-[100px]"
                        >
                            <div className="text-xl md:text-2xl font-bold">24/7</div>
                            <div className="text-[9px] md:text-[10px] uppercase tracking-wider font-semibold">Emergency</div>
                        </motion.div>

                        {/* Floating Card 2: Trusted by Uppal */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="absolute -bottom-4 -left-4 md:-left-8 bg-white p-3 md:p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 border border-gray-100"
                        >
                            <div className="bg-yellow-50 p-2 rounded-full">
                                <Trophy className="w-5 h-5 text-yellow-500" />
                            </div>
                            <div>
                                <div className="text-gray-900 font-bold text-xs md:text-sm">Trusted by Uppal</div>
                                <div className="text-gray-500 text-[10px] md:text-xs">1,00,000+ Happy Patients</div>
                            </div>
                        </motion.div>

                        {/* Decorative Background Elements */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-pink-50 to-transparent rounded-full -z-10 blur-3xl opacity-60"></div>
                    </motion.div>
                </div>
            </div>

            {isModalOpen && (
                <BookAppointmentForm
                    showModal={isModalOpen}
                    setShowModal={setIsModalOpen}
                    redirectUrl="/thank-you-uppal"
                    defaultLocation="TX Hospitals Uppal"
                />
            )}
        </section>
    );
};

export default UppalHero;
