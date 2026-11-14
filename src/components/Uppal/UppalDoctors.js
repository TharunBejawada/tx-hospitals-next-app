import React, { useState, useEffect } from 'react';
import DoctorCard from '@/components/Common/DoctorCard';
import AppointmentModal from "@/components/Doctors/AppointmentModal";
import CONFIG from '@/config';
import Link from 'next/link';

const UppalDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetch(`${CONFIG.API_BASE_URL}/getAllDoctors`)
            .then((res) => res.json())
            .then((data) => {
                // 1. Filter only Uppal doctors
                const uppalDoctors = data.filter(doc => doc.location && doc.location.toLowerCase().includes('uppal'));

                // 2. Select 6 doctors from different specialties
                const uniqueSpecialties = new Set();
                const selected = [];

                for (const doc of uppalDoctors) {
                    if (!uniqueSpecialties.has(doc.department)) {
                        uniqueSpecialties.add(doc.department);
                        selected.push(doc);
                        if (selected.length === 6) break;
                    }
                }

                // If we don't have 6 unique specialties, fill with remaining
                if (selected.length < 6) {
                    for (const doc of uppalDoctors) {
                        if (!selected.some(s => s.id === doc.id)) {
                            selected.push(doc);
                            if (selected.length === 6) break;
                        }
                    }
                }

                setDoctors(selected);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching doctors:", error);
                setLoading(false);
            });
    }, []);

    const handleBookAppointment = (doctor) => {
        setSelectedDoctor(doctor);
        setIsModalOpen(true);
    };

    return (
        <section className="bg-[#fcfafa] py-10 md:py-16 px-6 md:px-10 lg:px-12">
            <div className="max-w-[1400px] mx-auto">
                {/* Header Section */}
                <div className="mb-8 md:mb-12 max-w-3xl">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-pink-700 mb-2 block">
                        Meet the Team
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Our Doctors in <span className="text-pink-700">Uppal</span>
                    </h2>
                    <div className="w-12 h-1 bg-pink-700 mb-6"></div>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium">
                        Our team of highly qualified specialists is committed to delivering the best care, with expertise, empathy, and attention to every patient near Uppal and beyond.
                    </p>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="w-8 h-8 border-2 border-pink-700 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        {/* Doctors Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
                            {doctors.map((doctor, index) => (
                                <DoctorCard
                                    key={doctor.id || index}
                                    name={doctor.name}
                                    specialty={doctor.department}
                                    designation={doctor.designation}
                                    experience={doctor.experience}
                                    imageSrc={doctor.image}
                                    profileLink={`/${doctor.url?.replace(/^\/|\/$/g, '') || '#'}`}
                                    onBookClick={() => handleBookAppointment(doctor)}
                                />
                            ))}
                        </div>

                        {/* View All Doctors Button */}
                        <div className="mt-12 flex justify-center">
                            <Link
                                href="/find-doctor/?location=Uppal"
                                className="border-2 border-pink-700 text-pink-700 px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-pink-700 hover:text-white transition-all transform hover:scale-105"
                            >
                                View All Doctors
                            </Link>
                        </div>
                    </>
                )}
            </div>

            {/* Appointment Modal */}
            {isModalOpen && (
                <AppointmentModal
                    doctorData={selectedDoctor}
                    closeModal={() => setIsModalOpen(false)}
                />
            )}
        </section>
    );
};

export default UppalDoctors;
