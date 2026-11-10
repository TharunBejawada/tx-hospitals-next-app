import React, { useState, useEffect } from 'react';
import { Award, MapPin, Calendar, Phone } from 'lucide-react';
import BookAppointmentForm from '@/components/Blogs/BookAppointemntForm';
import CONFIG from '@/config';
import { getTopBranchDoctors } from '@/utils/branchDoctors';

const BanjaraHillsNewDoctors = ({ initialDoctors = [] }) => {
    const [doctors, setDoctors] = useState(initialDoctors || []);
    const [loading, setLoading] = useState(!initialDoctors || initialDoctors.length === 0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (initialDoctors && initialDoctors.length > 0) return;
        fetch(`${CONFIG.API_BASE_URL}/getDoctorsList`)
            .then(r => r.ok ? r : fetch(`${CONFIG.API_BASE_URL}/getAllDoctors`))
            .then((res) => res.json())
            .then((data) => {
                const filtered = getTopBranchDoctors(data, 'Banjara', 3);
                setDoctors(filtered);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching doctors in BanjaraHillsNewDoctors:", error);
                setLoading(false);
            });
    }, [initialDoctors]);

    return (
        <section id="doctors" className="py-10 md:py-12 bg-white">
            <div className="max-w-[1170px] mx-auto px-6">
                
                <div className="text-center mb-10">
                    <h2
                        className="mb-3 text-2xl md:text-3xl lg:text-4xl font-bold"
                        style={{ color: 'rgb(3, 2, 19)' }}
                    >
                        Top Specialists at <span style={{ color: 'rgb(189, 56, 92)' }}>TX Hospitals Banjara Hills</span>
                    </h2>
                    <p
                        className="max-w-[1000px] mx-auto text-sm md:text-base leading-relaxed text-gray-700"
                        style={{ fontWeight: 400 }}
                    >
                        At TX Hospitals Banjara Hills, patients are cared for by experienced senior specialists across cardiac surgery, robotic gastro surgery, GI cancer surgery, neurosurgery and advanced surgical care.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="w-8 h-8 border-2 border-pink-700 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {doctors.map((doctor, index) => {
                                const profileUrl = doctor.url
                                    ? (doctor.url.startsWith('/') ? doctor.url : `/${doctor.url}`)
                                    : null;

                                return (
                                    <div
                                        key={doctor.id || index}
                                        className="bg-white rounded-lg overflow-hidden flex flex-col"
                                        style={{ border: '0.5px solid rgb(220, 220, 220)', boxShadow: 'rgba(0, 0, 0, 0.08) 0px 4px 12px' }}
                                    >
                                        {profileUrl ? (
                                            <a
                                                href={profileUrl}
                                                className="block w-full h-[240px] overflow-hidden bg-[#F5F7FA] pt-4 cursor-pointer"
                                            >
                                                <img
                                                    src={doctor.image || "https://tx-hospital-doctor-images.s3.ap-south-2.amazonaws.com/doctors/default-doctor.webp"}
                                                    alt={doctor.name}
                                                    className="w-full h-full object-contain object-bottom hover:scale-105 transition-transform duration-300"
                                                />
                                            </a>
                                        ) : (
                                            <div className="w-full h-[240px] overflow-hidden bg-[#F5F7FA] pt-4">
                                                <img
                                                    src={doctor.image || "https://tx-hospital-doctor-images.s3.ap-south-2.amazonaws.com/doctors/default-doctor.webp"}
                                                    alt={doctor.name}
                                                    className="w-full h-full object-contain object-bottom"
                                                />
                                            </div>
                                        )}

                                        <div className="flex flex-col gap-3 p-5 flex-1 justify-between">
                                            <div>
                                                {profileUrl ? (
                                                    <a
                                                        href={profileUrl}
                                                        className="hover:text-[#BD385C] transition-colors"
                                                    >
                                                        <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'inherit', lineHeight: 1.3 }}>
                                                            {doctor.name}
                                                        </h3>
                                                    </a>
                                                ) : (
                                                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'rgb(3, 2, 19)', lineHeight: 1.3 }}>
                                                        {doctor.name}
                                                    </h3>
                                                )}

                                                <p className="mt-1 font-semibold text-gray-700" style={{ fontSize: '13px', lineHeight: 1.4 }}>
                                                    {doctor.designation}
                                                </p>
                                                <p className="mt-1.5 text-gray-500" style={{ fontSize: '11.5px', lineHeight: 1.45 }}>
                                                    {doctor.qualification}
                                                </p>
                                            </div>
                                            
                                            <div>
                                                <div className="flex flex-col gap-1.5 mt-4 pt-4 border-t border-gray-100">
                                                    <div className="flex items-center gap-2">
                                                        <Award className="w-[13px] h-[13px] text-[#BD385C]" strokeWidth={2.5} />
                                                        <span style={{ fontSize: '13px', color: 'rgb(30, 30, 30)' }}>
                                                            Experience: <strong style={{ color: 'rgb(189, 56, 92)' }}>{doctor.experience || '10+ Years'}</strong>
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="w-[13px] h-[13px] text-[#BD385C]" strokeWidth={2.5} />
                                                        <span style={{ fontSize: '13px', color: 'rgb(30, 30, 30)' }}>
                                                            {doctor.location || 'Banjara Hills, Hyderabad'}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex gap-2 mt-4">
                                                    <button
                                                        onClick={() => setIsModalOpen(true)}
                                                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded transition-opacity hover:opacity-90 font-semibold"
                                                        style={{ background: 'rgb(189, 56, 92)', fontSize: '13px', color: 'rgb(255, 255, 255)', border: 'none' }}
                                                    >
                                                        <Calendar className="w-[13px] h-[13px]" />
                                                        Book Now
                                                    </button>
                                                    <a
                                                        href="tel:9144514459"
                                                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded transition-all hover:bg-[#BD385C] hover:text-white font-semibold"
                                                        style={{ background: 'rgb(255, 255, 255)', fontSize: '13px', color: 'rgb(189, 56, 92)', border: '1px solid rgb(189, 56, 92)' }}
                                                    >
                                                        <Phone className="w-[13px] h-[13px]" />
                                                        Call
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="text-center mt-6">
                            <a
                                href="/find-doctor?location=Banjara%20Hills"
                                className="inline-block px-8 py-2.5 rounded transition-all hover:bg-[#BD385C] hover:text-white font-medium"
                                style={{ background: 'rgb(255, 255, 255)', fontSize: '14px', color: 'rgb(189, 56, 92)', border: '1.5px solid rgb(189, 56, 92)' }}
                            >
                                View All Doctors
                            </a>
                        </div>
                    </>
                )}
            </div>

            {isModalOpen && (
                <BookAppointmentForm
                    showModal={isModalOpen}
                    setShowModal={setIsModalOpen}
                    redirectUrl="/thank-you-banjara-hills"
                    defaultLocation="TX Hospitals Banjara Hills"
                />
            )}
        </section>
    );
};

export default BanjaraHillsNewDoctors;
