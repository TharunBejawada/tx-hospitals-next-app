import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { submitMyKareLead } from '@/utils/leadService';
import CONFIG from '@/config';
import { matchesDepartment } from '@/utils/specialityAliases';
import { useRouter } from 'next/router';
import SearchableDropdown from '@/components/Common/SearchableDropdown';
import BookAppointmentForm from '@/components/Blogs/BookAppointemntForm';

const HeroSection = ({ pageData, location, speciality }) => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const formatString = (str) => {
        if (!str) return '';
        return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    };

    // Strip trailing facility-type words so e.g. "Orthopedic Hospital" → "Orthopedic"
    const cleanSpeciality = (str) => {
        if (!str) return '';
        const stopWords = /\b(hospital|hospitals|centre|center|department|clinic|clinics|care|unit|services?)\b/gi;
        return str.replace(stopWords, '').replace(/\s+/g, ' ').trim();
    };

    const formattedLocation = formatString(location);
    const formattedSpeciality = cleanSpeciality(formatString(speciality));

    const [patientType, setPatientType] = useState('India');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        location: formattedLocation || '',
        doctor: ''
    });
    const [loading, setLoading] = useState(false);
    const [doctorsList, setDoctorsList] = useState([]);

    useEffect(() => {
        if (!formattedLocation || !formattedSpeciality) return;

        const fetchDoctors = async () => {
            try {
                const res = await axios.get(`${CONFIG.API_BASE_URL}/getAllDoctors`);
                if (res.data) {
                    const specKey = formattedSpeciality.toLowerCase();
                    const filtered = res.data.filter(doc => {
                        if (!doc.location || !doc.department) return false;
                        const locMatch = doc.location.toLowerCase().includes(formattedLocation.toLowerCase());
                        const deptMatch = matchesDepartment(specKey, doc.department.toLowerCase());
                        return locMatch && deptMatch;
                    });
                    setDoctorsList(filtered);
                }
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };
        fetchDoctors();
    }, [formattedLocation, formattedSpeciality]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            const numericValue = value.replace(/\D/g, '').slice(0, 15);
            setFormData(prev => ({ ...prev, [name]: numericValue }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (patientType === 'India') {
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(formData.phone)) {
                toast.error("Please enter a valid 10-digit mobile number");
                return;
            }
        } else {
            if (formData.phone.length < 10) {
                toast.error("Please enter a valid mobile number");
                return;
            }
        }

        if (!formData.name || !formData.location) {
            toast.error("Please fill in all required fields");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                to: "crm.txhospitals@gmail.com, venudas@txhospitals.in",
                cc: "info.txhospitals@gmail.com",
                subject: `New Inquiry from Specialty Landing Page (${location})`,
                html: `
                    <h3>New Hero Section Inquiry - Specialty Landing Page</h3>
                    <p><strong>Patient Type:</strong> ${patientType}</p>
                    <p><strong>Name:</strong> ${formData.name}</p>
                    <p><strong>Mobile:</strong> ${formData.phone}</p>
                    <p><strong>Location:</strong> TX Hospitals ${formData.location}</p>
                    <p><strong>Doctor/Specialty:</strong> ${formData.doctor || 'Not Specified'}</p>
                    <p><strong>Page:</strong> ${document.title || "Specialty Landing Page"}</p>
                `,
                page: document.title || `Specialty Landing Page - ${location}`,
                location: `TX Hospitals ${formData.location}`,
                name: formData.name,
                mobile: formData.phone,
                concern: formData.doctor || "Not Specified",
                doctor: formData.doctor || "Not Specified",
                time: ''
            };

            await axios.post(`${CONFIG.API_BASE_URL}/send-email/dynamic-form`, payload);

            submitMyKareLead(payload);

            toast.success("Appointment request submitted successfully!");
            setFormData({ name: '', phone: '', location: location || '', doctor: '' });
            router.push('/thank-you');
        } catch (error) {
            console.error('Error submitting inquiry:', error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="home" className="relative flex w-full -mt-2 md:mt-4" style={{ minHeight: '600px' }}>
            {/* Full-width image background */}
            {pageData?.heroImage && (
                <img
                    src={pageData.heroImage}
                    alt={pageData.title || "Speciality"}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            )}
            {/* Exact gradient overlay requested across the entire section */}
            <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(to right, rgba(26, 5, 16, 0.88) 0%, rgba(74, 18, 40, 0.82) 42%, rgba(26, 5, 16, 0.7) 100%)' }} />

            {/* Flex wrapper for the left text and right form */}
            <div className="relative z-10 w-full flex flex-col lg:flex-row justify-between">

                {/* Left Text Panel (65%) */}
                <div className="flex-1 flex flex-col justify-center px-8 lg:px-14 py-12 lg:py-16 pb-[30px] max-w-[900px]">
                    <h1 style={{ fontSize: 'clamp(30px, 3.5vw, 42px)', fontWeight: 700, color: 'rgb(255, 255, 255)', lineHeight: 1.25 }}>
                        {pageData?.title}
                    </h1>
                    <p style={{ fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 700, fontStyle: 'italic', color: '#f23a6b', marginTop: '6px' }}>
                        {pageData?.badgeText}
                    </p>
                    <div
                        className="mt-5"
                        style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.7, maxWidth: '650px' }}
                        dangerouslySetInnerHTML={{ __html: pageData?.description }}
                    />
                    <div className="flex flex-wrap gap-3 mt-8">
                        <button
                            onClick={() => router.push('/surgery-care/')}
                            style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255, 255, 255, 0.9)', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.25)', padding: '8px 20px', borderRadius: '6px', transition: '0.2s', cursor: 'pointer' }}
                            className="hover:bg-white/20"
                        >
                            Second Opinion
                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255, 255, 255, 0.9)', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.25)', padding: '8px 20px', borderRadius: '6px', transition: '0.2s', cursor: 'pointer' }}
                            className="hover:bg-white/20"
                        >
                            Book Health Checkup
                        </button>
                    </div>
                </div>

                {/* Right Form Panel (35%) */}
                <div
                    className="flex flex-col justify-center pl-8 pr-12 lg:pr-16 py-10 w-full lg:w-[45%] flex-shrink-0"
                    style={{ background: 'rgba(26, 5, 16, 0.65)', backdropFilter: 'blur(12px)', borderLeft: '1px solid rgba(255, 255, 255, 0.08)' }}
                >
                    <div className="bg-white/10 rounded-xl p-6 border border-white/15 backdrop-blur-md">
                        <h2 style={{ fontWeight: 600, color: '#fff', fontSize: '16px', marginBottom: '14px' }}>
                            Talk to an {formattedSpeciality || 'Expert'} Doctor Today
                        </h2>

                        <div className="flex gap-3 mb-5">
                            <button
                                type="button"
                                onClick={() => setPatientType('India')}
                                style={{
                                    fontSize: '12px', fontWeight: 500,
                                    color: patientType === 'India' ? 'rgb(255, 255, 255)' : 'rgba(255, 255, 255, 0.65)',
                                    background: patientType === 'India' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                                    border: patientType === 'India' ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid transparent',
                                    padding: '6px 18px', borderRadius: '9999px', transition: '0.3s', cursor: 'pointer'
                                }}
                            >
                                India
                            </button>
                            <button
                                type="button"
                                onClick={() => setPatientType('International')}
                                style={{
                                    fontSize: '12px', fontWeight: 500,
                                    color: patientType === 'International' ? 'rgb(255, 255, 255)' : 'rgba(255, 255, 255, 0.65)',
                                    background: patientType === 'International' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                                    border: patientType === 'International' ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid transparent',
                                    padding: '6px 18px', borderRadius: '9999px', transition: '0.3s', cursor: 'pointer'
                                }}
                            >
                                International
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Patient Name"
                                required
                                className="w-full px-4 py-2.5 rounded-lg outline-none"
                                style={{ fontSize: '13px', color: 'rgb(255, 255, 255)', background: 'rgba(255, 255, 255, 0.12)', border: '1px solid rgba(255, 255, 255, 0.25)' }}
                            />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Mobile Number"
                                required
                                className="w-full px-4 py-2.5 rounded-lg outline-none"
                                style={{ fontSize: '13px', color: 'rgb(255, 255, 255)', background: 'rgba(255, 255, 255, 0.12)', border: '1px solid rgba(255, 255, 255, 0.25)' }}
                            />
                            <select
                                name="location"
                                value={formData.location}
                                disabled
                                className="w-full px-4 py-2.5 rounded-lg outline-none appearance-none cursor-not-allowed opacity-80"
                                style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', background: 'rgba(255, 255, 255, 0.12)', border: '1px solid rgba(255, 255, 255, 0.25)' }}
                            >
                                <option className="text-gray-900" value={formattedLocation}>{formattedLocation}</option>
                            </select>
                            <SearchableDropdown
                                name="doctor"
                                value={formData.doctor}
                                onChange={handleChange}
                                placeholder="Select Doctor"
                                options={doctorsList.length > 0 ? doctorsList.map(doc => ({ label: doc.name, value: doc.name })) : [{ label: `${formattedSpeciality} Specialist`, value: formattedSpeciality }]}
                                className="w-full px-4 py-2.5 rounded-lg outline-none"
                                style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', background: 'rgba(255, 255, 255, 0.12)', border: '1px solid rgba(255, 255, 255, 0.25)' }}
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex items-center justify-center gap-2 py-3 mt-1 rounded-lg transition-opacity hover:opacity-90 cursor-pointer ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                style={{ background: '#bd385c', fontSize: '14px', fontWeight: 600, color: '#fff', border: 'none' }}
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" alt="Image" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M8 2v4" />
                                            <path d="M16 2v4" />
                                            <rect width="18" height="18" x="3" y="4" rx="2" />
                                            <path d="M3 10h18" />
                                        </svg>
                                        Book Appointment
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="flex items-center gap-4 mt-8 pt-5" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.15)' }}>
                        <div className="flex flex-col items-center">
                            <div className="flex gap-0.5 mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" alt="Image" width="13" height="13" viewBox="0 0 24 24" fill="#bd385c" stroke="#bd385c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                                    </svg>
                                ))}
                            </div>
                            <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.65)' }}>
                                4.8 Google Ratings
                            </span>
                        </div>

                        <div style={{ width: '1px', height: '32px', background: 'rgba(255, 255, 255, 0.18)' }} />

                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" alt="Image" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bd385c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                            <div>
                                <p style={{ fontSize: '12px', fontWeight: 600, color: 'rgb(255, 255, 255)' }}>Available 24/7</p>
                                <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.65)' }}>Emergency Care</p>
                            </div>
                        </div>

                        <div style={{ width: '1px', height: '32px', background: 'rgba(255, 255, 255, 0.18)' }} />

                        <div>
                            <p style={{ fontSize: '12px', fontWeight: 600, color: 'rgb(255, 255, 255)' }}>15+</p>
                            <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.65)' }}>Specialities</p>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <BookAppointmentForm
                    showModal={isModalOpen}
                    setShowModal={setIsModalOpen}
                />
            )}
        </section>
    );
};

export default HeroSection;
