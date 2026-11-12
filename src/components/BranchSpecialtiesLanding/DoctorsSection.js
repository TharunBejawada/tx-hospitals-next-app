import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Award, MapPin, Calendar, Phone } from 'lucide-react';
import BookAppointmentForm from '@/components/Blogs/BookAppointemntForm';
import CONFIG from '@/config';
import { useRouter } from 'next/router';

const DoctorsSection = ({ location }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [doctorsList, setDoctorsList] = useState([]);
    const [fetchLoading, setFetchLoading] = useState(true);
    const router = useRouter();

    const formatString = (str) => {
        if (!str) return '';
        return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    };

    const formattedLocation = formatString(location);

    useEffect(() => {
        if (!formattedLocation) return;

        setFetchLoading(true);
        const fetchDoctors = async () => {
            try {
                const res = await axios.get(`${CONFIG.API_BASE_URL}/getAllDoctors`);
                if (res.data) {
                    const filtered = res.data.filter(doc => {
                        if (!doc.location) return false;
                        return doc.location.toLowerCase().includes(formattedLocation.toLowerCase());
                    });
                    setDoctorsList(filtered);
                }
            } catch (error) {
                console.error("Error fetching doctors:", error);
            } finally {
                setFetchLoading(false);
            }
        };
        fetchDoctors();
    }, [formattedLocation]);

    const visibleDoctors = doctorsList.slice(0, 3);

    if (fetchLoading) {
        return (
            <div className="text-center py-16">
                <div className="w-10 h-10 border-4 border-[#BD385C] border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
        );
    }

    if (doctorsList.length === 0) {
        return null; // hide section if no doctors
    }

    return (
        <section id="doctors" className="py-16 bg-white">
            <div className="max-w-[1170px] mx-auto px-6">
                <div className="text-center mb-10">
                    <h2 className="mb-3" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 600, color: 'rgb(3, 2, 19)' }}>
                        {formattedLocation === 'Uppal' ? (
                            <>Meet Our <span style={{ color: 'rgb(189, 56, 92)' }}>Specialist Doctors</span></>
                        ) : (
                            <>Meet Our <span style={{ color: 'rgb(189, 56, 92)' }}>Doctors</span></>
                        )}
                    </h2>
                    {formattedLocation === 'Uppal' ? (
                        <div className="max-w-[800px] mx-auto space-y-4" style={{ fontSize: '15px', fontWeight: 400, color: 'rgb(30, 30, 30)', lineHeight: 1.7 }}>
                            <p>Finding the right doctor is often the first step towards understanding and treating a health concern. At TX Hospitals Uppal, patients can consult experienced specialists across different departments for evaluation, diagnosis, treatment planning, procedures, second opinions and follow-up care. Our doctors take a patient-focused approach by understanding symptoms, reviewing medical history and investigations and explaining the available treatment options clearly. Patients searching for the best doctors in Uppal can access expert care across multiple departments within the same hospital.</p>
                        </div>
                    ) : (
                        <p className="max-w-[800px] mx-auto" style={{ fontSize: '15px', fontWeight: 400, color: 'rgb(30, 30, 30)', lineHeight: 1.7 }}>
                            {formattedLocation === 'Kachiguda'
                                ? `Choosing the right doctor can make the healthcare journey easier and more reassuring. At TX Hospitals Kachiguda, patients can consult experienced doctors across major specialties for accurate evaluation, treatment planning and ongoing medical care. Our specialists take time to understand the patient’s symptoms, review available reports and explain the recommended next steps clearly. With access to some of the top doctors in Kachiguda, patients receive care focused on safety, comfort and informed decision-making.`
                                : `At TX Hospitals ${formattedLocation}, patients can consult experienced doctors across major medical specialties for diagnosis, second opinions, treatment planning and follow-up care. Our medical team provides clear guidance and personalized attention based on each patient's health condition. With access to some of the best doctors in ${formattedLocation}, patients receive care that focuses on comfort, safety and better understanding of their treatment options at every step.`}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {visibleDoctors.map((doctor, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden flex flex-col cursor-pointer transition-shadow hover:shadow-lg" style={{ border: '0.5px solid rgb(183, 183, 183)', boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 1px, rgba(0, 0, 0, 0.08) 0px 1px 1.5px' }} onClick={() => router.push(`/${doctor.url}`)}>
                            <div className="w-full h-[220px] overflow-hidden bg-[#F5F7FA] pt-4">
                                <img
                                    src={doctor.image}
                                    alt={doctor.name}
                                    className="w-full h-full object-contain object-bottom"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(doctor.name) + "&background=F5F7FA&color=333";
                                    }}
                                />
                            </div>
                            <div className="flex flex-col gap-3 p-5 flex-1">
                                <div>
                                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'rgb(3, 2, 19)', lineHeight: 1.3 }}>
                                        {doctor.name}
                                    </h3>
                                    <p className="mt-1" style={{ fontSize: '13px', fontWeight: 400, color: 'rgb(30, 30, 30)', lineHeight: 1.5 }}>
                                        {doctor.department || doctor.designation}
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
                                            {doctor.location || `${formattedLocation}, Hyderabad`}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-2 pt-4 border-t border-[#F0DFE5] mt-4" onClick={e => e.stopPropagation()}>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded transition-opacity hover:opacity-90"
                                        style={{ background: 'rgb(189, 56, 92)', fontSize: '13px', fontWeight: 500, color: 'rgb(255, 255, 255)', border: 'none' }}
                                    >
                                        <Calendar className="w-[13px] h-[13px]" />
                                        Book Now
                                    </button>
                                    <a
                                        href="tel:+919144514459"
                                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded transition-all hover:bg-[#BD385C] hover:text-white"
                                        style={{ background: 'rgb(255, 255, 255)', fontSize: '13px', fontWeight: 500, color: 'rgb(189, 56, 92)', border: '1px solid rgb(189, 56, 92)' }}
                                    >
                                        <Phone className="w-[13px] h-[13px]" />
                                        Call
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <a
                        href={`/find-doctor?location=${formattedLocation}`}
                        className="inline-block px-8 py-2.5 rounded transition-all hover:bg-[#BD385C] hover:text-white"
                        style={{ background: 'rgb(255, 255, 255)', fontSize: '15px', fontWeight: 500, color: 'rgb(189, 56, 92)', border: '1.5px solid rgb(189, 56, 92)' }}
                    >
                        View All Doctors
                    </a>
                </div>
            </div>

            {isModalOpen && (
                <BookAppointmentForm
                    showModal={isModalOpen}
                    setShowModal={setIsModalOpen}
                    redirectUrl={`/thank-you-${location?.toLowerCase() || 'miyapur'}`}
                    defaultLocation={`TX Hospitals ${formattedLocation}`}
                />
            )}
        </section>
    );
};

export default DoctorsSection;
