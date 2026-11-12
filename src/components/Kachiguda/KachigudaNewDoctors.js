import React, { useState, useEffect } from 'react';
import { Award, MapPin, Calendar, Phone } from 'lucide-react';
import BookAppointmentForm from '@/components/Blogs/BookAppointemntForm';
import CONFIG from '@/config';

const KachigudaNewDoctors = ({ initialDoctors = [] }) => {
    const [doctors, setDoctors] = useState(initialDoctors || []);
    const [loading, setLoading] = useState(!initialDoctors || initialDoctors.length === 0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (initialDoctors && initialDoctors.length > 0) return;
        fetch(`${CONFIG.API_BASE_URL}/getDoctorsList`).then(r => r.ok ? r : fetch(`${CONFIG.API_BASE_URL}/getAllDoctors`))
            .then((res) => res.json())
            .then((data) => {
                // Get the three specific doctors in the requested order
                const targetIds = [
                    'drgabrielsukumarchinnam@txhospitals.in',
                    'drkaranmpatel@txhospitals.in',
                    'drnareshdude@txhospitals.in'
                ];
                const filtered = targetIds
                    .map(id => data.find(doc => doc.id === id))
                    .filter(Boolean);
                setDoctors(filtered);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching doctors:", error);
                setLoading(false);
            });
    }, []);

    return (
        <section id="doctors" className="py-16 bg-white">
            <div className="max-w-[1170px] mx-auto px-6 lg:pr-11">
                <div className="text-center mb-10">
                    <h2
                        className="mb-3 text-2xl md:text-3xl lg:text-4xl font-bold"
                        style={{ color: 'rgb(3, 2, 19)' }}
                    >
                        Meet Our <span style={{ color: 'rgb(189, 56, 92)' }}>Experts in Kachiguda</span>
                    </h2>
                    <p
                        className="max-w-[1000px] mx-auto text-sm md:text-base leading-relaxed text-gray-700"
                        style={{ fontWeight: 400 }}
                    >
                        Consult the best doctors in Kachiguda at TX Hospitals for clear guidance, accurate diagnosis, and personalized treatment across major specialties.<br/> From routine consultations to advanced medical care, our experienced specialists are here to support every step of your health journey.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="w-8 h-8 border-2 border-pink-700 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {doctors.map((doctor, index) => (
                                <div
                                    key={doctor.id || index}
                                    className="bg-white rounded-lg overflow-hidden flex flex-col"
                                    style={{ border: '0.5px solid rgb(183, 183, 183)', boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 1px, rgba(0, 0, 0, 0.08) 0px 1px 1.5px' }}
                                >
                                    <div className="w-full h-[220px] overflow-hidden bg-[#F5F7FA] pt-4">
                                        {/* Fallback to default if no image is present */}
                                        <img
                                            src={doctor.image || "https://tx-hospital-doctor-images.s3.ap-south-2.amazonaws.com/doctors/default-doctor.webp"}
                                            alt={doctor.name}
                                            className="w-full h-full object-contain object-bottom"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3 p-5 flex-1">
                                        <div>
                                            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'rgb(3, 2, 19)', lineHeight: 1.3 }}>
                                                {doctor.name}
                                            </h3>
                                            <p className="mt-1" style={{ fontSize: '13px', fontWeight: 400, color: 'rgb(30, 30, 30)', lineHeight: 1.5 }}>
                                                {doctor.designation}
                                            </p>
                                            <p className="mt-1" style={{ fontSize: '12px', fontWeight: 400, color: 'rgb(108, 108, 108)' }}>
                                                {doctor.qualification}
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-1.5 mt-auto">
                                            <div className="flex items-center gap-2">
                                                <Award className="w-[13px] h-[13px] text-[#BD385C]" strokeWidth={2} />
                                                <span style={{ fontSize: '13px', color: 'rgb(30, 30, 30)' }}>
                                                    Experience: <strong style={{ color: 'rgb(189, 56, 92)' }}>{doctor.experience}</strong>
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-[13px] h-[13px] text-[#BD385C]" strokeWidth={2} />
                                                <span style={{ fontSize: '13px', color: 'rgb(30, 30, 30)' }}>
                                                    {doctor.location || 'Kachiguda, Hyderabad'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 pt-4 border-t border-[#F0DFE5] mt-4">
                                            <button
                                                onClick={() => setIsModalOpen(true)}
                                                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded transition-opacity hover:opacity-90"
                                                style={{ background: 'rgb(189, 56, 92)', fontSize: '13px', fontWeight: 500, color: 'rgb(255, 255, 255)', border: 'none' }}
                                            >
                                                <Calendar className="w-[13px] h-[13px]" />
                                                Book Appointment
                                            </button>
                                            <a
                                                href="tel:+919144514459"
                                                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded transition-all hover:bg-[#BD385C] hover:text-white"
                                                style={{ background: 'rgb(255, 255, 255)', fontSize: '13px', fontWeight: 500, color: 'rgb(189, 56, 92)', border: '1px solid rgb(189, 56, 92)' }}
                                            >
                                                Call
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center">
                            <a
                                href="/find-doctor?location=Kachiguda"
                                className="inline-block px-8 py-2.5 rounded transition-all hover:bg-[#BD385C] hover:text-white"
                                style={{ background: 'rgb(255, 255, 255)', fontSize: '15px', fontWeight: 500, color: 'rgb(189, 56, 92)', border: '1.5px solid rgb(189, 56, 92)' }}
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
                    redirectUrl="/thank-you-kachiguda"
                    defaultLocation="TX Hospitals Kachiguda"
                />
            )}
        </section>
    );
};

export default KachigudaNewDoctors;
