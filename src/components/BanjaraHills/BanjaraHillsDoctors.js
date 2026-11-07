import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import CONFIG from '@/config';
import AppointmentModal from '@/components/Doctors/AppointmentModal';

export default function BanjaraHillsDoctors() {
    const router = useRouter();
    const [doctors, setDoctors] = useState([
        {
            name: "Dr. Avinash Dal",
            qualification: "MBBS, MS (General Surgery), MCh",
            experience: "30+ Years Experience",
            designation: "Cardiologist",
            image: "https://tx-hospital-doctor-images.s3.ap-south-2.amazonaws.com/doctors/1765002877046-Dr.%20Avinash%20Dal.webp",
            url: "/doctor/dr-avinash-dal/"
        },
        {
            name: "Dr. Sumeet Sinha",
            qualification: "MBBS, MD(General Medicine) DM – Cardiology",
            experience: "28+ Years Experience",
            designation: "Consultant Cardiologist",
            image: "https://tx-hospital-doctor-images.s3.ap-south-2.amazonaws.com/doctors/1757063261111-Dr%20Sumeet%20Sinha.webp",
            url: "/doctor/dr-sameet-sinha/"
        },
        {
            name: "Dr. K. Keerthikar Reddy",
            qualification: "MBBS, MS (Ortho), MCh(Ortho)",
            experience: "16+ Years Experience",
            designation: "Consultant Orthopaedic",
            image: "https://tx-hospital-doctor-images.s3.ap-south-2.amazonaws.com/doctors/1757072310669-Dr.%20K.%20Keerthikar%20Reddy.webp",
            url: "/doctor/dr-k-keerthikar-reddy/"
        },
        {
            name: "Dr. S. Sudha",
            qualification: "MBBS(OSM), MD(OSM), DGO, FMAS",
            experience: "23+ Years Experience",
            designation: "Consultant Gynecologist",
            image: "https://tx-hospital-doctor-images.s3.ap-south-2.amazonaws.com/doctors/1757069831136-Dr%20Sudha%20S.webp",
            url: "/doctor/dr-s-sudha/"
        },
        {
            name: "Dr. N. Pavan Kumar Rao",
            qualification: "MBBS, MD, DM(Nephrology)",
            experience: "21+ Years Experience",
            designation: "Consultant Nephrologist",
            image: "https://tx-hospital-doctor-images.s3.ap-south-2.amazonaws.com/doctors/1741494580819-Dr.%20N.%20Pawan%20Kumar%20Rao.jpg",
            url: "/doctor/dr-n-pavan-kumar-rao/"
        }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    useEffect(() => {
        fetch(`${CONFIG.API_BASE_URL}/getAllDoctors`)
            .then(res => res.json())
            .then(data => {
                const namesToFind = ["avinash dal", "sumeet sinha", "keerthikar", "sudha", "pavan kumar rao"];
                const matched = [];

                namesToFind.forEach(nameKey => {
                    const found = data.find(doc =>
                        doc.name?.toLowerCase().includes(nameKey)
                    );
                    if (found) {
                        matched.push({
                            name: found.name.trim(),
                            qualification: found.qualification || found.designation,
                            experience: found.experience.includes("Experience") ? found.experience : `${found.experience} Experience`,
                            designation: found.department === "Cardiothoracic & Vascular Surgery" ? "Cardiologist" : `Consultant ${found.department}`,
                            image: found.image || "/assets/Doctors/image.png",
                            url: found.url || `/doctor/${found.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/`
                        });
                    }
                });

                if (matched.length > 0) {
                    setDoctors(prev => {
                        return prev.map(defaultDoc => {
                            const foundReal = matched.find(m =>
                                m.name.toLowerCase().includes(defaultDoc.name.split(" ").slice(1).join(" ").toLowerCase())
                            );
                            return foundReal ? foundReal : defaultDoc;
                        });
                    });
                }
            })
            .catch(err => console.error("Error loading doctors from API:", err));
    }, []);

    const handleCardClick = (url) => {
        if (url) {
            router.push(url.startsWith('/') ? url : `/${url}`);
        }
    };

    return (
        <section className="w-full bg-[#fff8f9] py-6 px-4 md:px-8 lg:px-12 overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                {/* Header row */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                        Expert Doctors at TX Hospitals Banjara Hills
                    </h2>
                    <Link
                        href="/find-doctor?location=Banjara%20Hills"
                        className="text-[#b3204d] hover:text-[#971b41] font-bold text-sm transition-colors duration-300 hover:underline decoration-2 underline-offset-4"
                    >
                        View All Doctors →
                    </Link>
                </div>

                {/* Doctors cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {doctors.map((doctor, idx) => (
                        <motion.div
                            key={idx}
                            initial={false}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05, duration: 0.6 }}
                            onClick={() => handleCardClick(doctor.url)}
                            className="bg-white border border-gray-100/80 rounded-[28px] p-5 flex flex-col justify-between items-center text-center hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(179,32,77,0.06)] hover:border-pink-100 transition-all duration-300 group cursor-pointer shadow-sm min-h-[380px]"
                        >
                            {/* Doctor Photo Box - displaying the portrait natively (which already contains its own border frame) */}
                            <div className="relative w-full aspect-[4/5] overflow-hidden mb-4 bg-transparent transition-transform duration-500 group-hover:scale-105">
                                <img
                                    src={doctor.image}
                                    alt={doctor.name}
                                    className="w-full h-full object-cover object-top"
                                    onError={(e) => {
                                        e.target.src = "/assets/Doctors/image.png";
                                    }}
                                />
                            </div>

                            {/* Name & Credentials */}
                            <div className="flex flex-col items-center flex-1 justify-center space-y-2">
                                <h3 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-[#b3204d] transition-colors duration-300 leading-tight">
                                    {doctor.name}
                                </h3>
                                <p className="text-sm text-gray-500 font-medium px-2 leading-relaxed">
                                    {doctor.qualification}
                                </p>
                            </div>

                            {/* Experience Info */}
                            <div className="text-sm md:text-base font-bold text-pink-700 my-2 bg-pink-50/50 px-4 py-1.5 rounded-full border border-pink-100/50 shadow-sm">
                                {doctor.experience}
                            </div>

                            {/* Designation (wrapped to prevent overflow) */}
                            <div className="text-sm md:text-base font-bold text-[#b3204d] mt-2 px-2 text-center leading-tight">
                                {doctor.designation}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <AppointmentModal
                    doctorData={selectedDoctor}
                    closeModal={() => setIsModalOpen(false)}
                />
            )}
        </section>
    );
}
