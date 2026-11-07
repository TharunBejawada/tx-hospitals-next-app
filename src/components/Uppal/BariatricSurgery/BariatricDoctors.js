import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DoctorCard from '@/components/Common/DoctorCard';
import AppointmentModal from "@/components/Doctors/AppointmentModal";

const BariatricDoctors = ({ 
    badge = "Expert Team",
    title = "Meet Our Expert Bariatric Surgeons",
    subtitle = "Internationally trained surgeons with decades of combined experience in bariatric and laparoscopic procedures.",
    onBookClick
}) => {

    const doctor = {
        id: "101", // Placeholder ID
        name: "Dr. Sudarshan Reddy",
        designation: "Sr. Consultant - Gastroenterologist",
        department: "Bariatric Surgery",
        experience: "17+",
        qualifications: "MBBS - MS, DNB (Surg Gastro)",
        image: "/assets/Uppal/Bariatric-surgery/Sudarshan.JPG.jpeg",
        url: "/dr-sudharshan-reddy-komati/"
    };

    const handleBookAppointment = () => {
        onBookClick(doctor);
    };

    return (
        <section className="bg-[#fcfafa] py-8 md:py-16 px-6 font-inter">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 text-center lg:text-left">
                    <span className="text-pink-700 font-bold text-xs md:text-sm uppercase tracking-widest block mb-2">
                        {badge}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                        {title}
                    </h2>
                    <p className="text-gray-600 text-sm md:text-base max-w-2xl leading-relaxed font-medium mx-auto lg:mx-0">
                        {subtitle}
                    </p>
                </div>

                <div className="flex justify-center">
                    <div className="w-full max-w-sm">
                        <motion.div
                            initial={false}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <DoctorCard
                                name={doctor.name}
                                specialty={doctor.department}
                                designation={`${doctor.designation} (${doctor.qualifications})`}
                                experience={doctor.experience}
                                imageSrc={doctor.image}
                                onBookClick={handleBookAppointment}
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BariatricDoctors;
