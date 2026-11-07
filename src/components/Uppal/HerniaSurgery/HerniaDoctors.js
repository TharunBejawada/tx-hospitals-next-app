import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DoctorCard from '@/components/Common/DoctorCard';
import CONFIG from '@/config';
import axios from 'axios';

const HerniaDoctors = ({ onBookClick }) => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    const doctorDetails = [
        // {
        //     name: "Dr. Sai Krishna",
        //     url: "dr-k-sai-krishna",
        //     designation: "Sr. Consultant - Medical Gastroenterologist",
        //     qualifications: "MBBS - MD, DM Gastroenterology",
        //     experience: "17+"
        // },
        {
            name: "Dr. Sudarshan Reddy",
            url: "dr-sudharshan-reddy-komati",
            designation: "Sr. Consultant - Gastroenterologist",
            qualifications: "MBBS - MS, DNB (Surg Gastro)",
            experience: "17+"
        }
    ];

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await axios.get(`${CONFIG.API_BASE_URL}/getAllDoctors`);
                const allDoctors = res.data;

                const filteredDoctors = doctorDetails.map(detail => {
                    const match = allDoctors.find(d => d.url && d.url.replace(/^\/|\/$/g, "") === detail.url);
                    return {
                        ...detail,
                        image: match ? match.image : null,
                        id: match ? match.id : null,
                        department: match ? match.department : "Hernia & Laparoscopic Surgery"
                    };
                });

                setDoctors(filteredDoctors);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching hernia doctors:", error);
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    return (
        <section className="bg-white py-8 md:py-16 px-6 font-inter">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <span className="text-[#be185d] font-bold text-xs md:text-sm uppercase tracking-widest block mb-2">
                        Expert Surgical Team
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                        Best Hernia Surgeons at TX Hospitals, Uppal
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base max-w-2xl leading-relaxed font-medium mx-auto">
                        Our hernia specialists bring advanced laparoscopic and robotic surgical skills, and a genuine commitment to getting you back to your life — fast.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-8 h-8 border-2 border-[#be185d] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                        {doctors.map((doctor, index) => (
                            <motion.div
                                key={index}
                                initial={false}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="w-full max-w-[360px]"
                            >
                                <DoctorCard
                                    name={doctor.name}
                                    specialty={doctor.department}
                                    designation={`${doctor.designation} (${doctor.qualifications})`}
                                    experience={doctor.experience}
                                    imageSrc={doctor.image}
                                    profileLink={null}
                                    onBookClick={() => onBookClick(doctor)}
                                />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default HerniaDoctors;
