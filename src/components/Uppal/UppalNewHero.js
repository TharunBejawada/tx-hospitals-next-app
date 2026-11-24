import React, { useState, useEffect } from 'react';
import { submitMyKareLead } from '@/utils/leadService';

import Image from 'next/image';
import { User, Phone, Stethoscope, CalendarDays, Calendar, Clock, Star, MapPin, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/router';
import axios from 'axios';
import CONFIG from '@/config';
import { toast } from 'react-toastify';

const HeroSearchableSelect = ({ label, placeholder, options, value, onChange, icon: Icon, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const containerRef = React.useRef(null);
    const lastFocusTime = React.useRef(0);

    useEffect(() => {
        if (!isOpen) {
            setSearchTerm('');
        }
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredOptions = options.filter(opt =>
        opt.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative w-full" ref={containerRef}>
            <div className="relative">
                {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 w-[14px] h-[14px] z-10" />}
                <input
                    type="text"
                    placeholder={placeholder}
                    value={isOpen ? searchTerm : (value || '')}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        if (!isOpen) setIsOpen(true);
                    }}
                    onFocus={() => {
                        lastFocusTime.current = Date.now();
                        setIsOpen(true);
                    }}
                    onClick={() => {
                        if (Date.now() - lastFocusTime.current > 150) {
                            setIsOpen(prev => !prev);
                        }
                    }}
                    disabled={disabled}
                    className="w-full pl-9 pr-8 py-2.5 rounded-lg outline-none text-[13px] transition-all disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                    style={{
                        color: '#fff',
                        background: disabled ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.12)',
                        border: '1px solid rgba(255, 255, 255, 0.25)'
                    }}
                />
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 w-[14px] h-[14px] z-10 pointer-events-none" />
                
                {isOpen && !disabled && (
                    <div 
                        className="absolute left-0 right-0 mt-1 max-h-48 overflow-y-auto rounded-lg shadow-xl z-50 py-1"
                        style={{
                            background: 'rgb(48, 8, 24)',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                    >
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((opt, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => {
                                        onChange({ target: { name: label.toLowerCase(), value: opt } });
                                        setIsOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-xs hover:bg-[#BD385C] hover:text-white transition-colors font-semibold text-gray-100"
                                >
                                    {opt}
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-2 text-xs text-gray-400 font-semibold">No options found</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const UppalNewHero = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('appointment');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        location: 'Uppal',
        doctor: '',
        date: ''
    });
    const [loading, setLoading] = useState(false);
    const [allDoctors, setAllDoctors] = useState([]);
    const [secondOpinions, setSecondOpinions] = useState([]);
    const [healthPackages, setHealthPackages] = useState([]);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // Fetch doctors
                const resDoctors = await axios.get(`${CONFIG.API_BASE_URL}/getAllDoctors`);
                if (resDoctors.data) {
                    setAllDoctors(resDoctors.data);
                }

                // Fetch second opinions
                const resSO = await axios.get(`${CONFIG.API_BASE_URL}/new-secondopinion/getAllSecondOpinion`);
                if (resSO.data && resSO.data.Items) {
                    const soNames = resSO.data.Items.map((item) => {
                        const raw = item.url.replace(/\//g, "").replace(/-/g, " ");
                        return raw
                            .split(" ")
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ");
                    });
                    setSecondOpinions(soNames);
                }

                // Fetch health packages
                const resHP = await axios.get(`${CONFIG.API_BASE_URL}/new-healthpackages/getAllHealthPackages`);
                if (resHP.data && resHP.data.Items) {
                    const hpNames = resHP.data.Items.map(item => item.hpTitle);
                    setHealthPackages(hpNames);
                }
            } catch (error) {
                console.error("Error fetching options in UppalNewHero:", error);
            }
        };
        fetchAllData();
    }, []);

    const getDoctorsForLocation = (loc) => {
        if (!loc) return [];
        return allDoctors.filter(doc => 
            doc.location && doc.location.toLowerCase().includes(loc.toLowerCase())
        );
    };

    const doctorOptions = getDoctorsForLocation('Uppal').map(doctor => 
        `${doctor.name} - ${doctor.department || doctor.designation || 'Specialist'}`
    );

    const getTomorrowDateString = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const yyyy = tomorrow.getFullYear();
        const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const dd = String(tomorrow.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const getTabColor = (tab) => {
        switch (tab) {
            case 'appointment': return 'rgb(189, 56, 92)';
            case 'second-opinion': return 'rgb(124, 58, 237)';
            case 'health-checkup': return 'rgb(5, 150, 105)';
            default: return 'rgb(189, 56, 92)';
        }
    };

    const activeColor = getTabColor(activeTab);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setFormData(prev => ({ ...prev, doctor: '' }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            const numericValue = value.replace(/\D/g, '').slice(0, 10);
            setFormData(prev => ({ ...prev, [name]: numericValue }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(formData.phone)) {
            toast.error("Please enter a valid 10-digit mobile number");
            return;
        }

        if (formData.date) {
            const selectedDate = new Date(formData.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate <= today) {
                toast.error("Please select a future date");
                return;
            }
        }

        setLoading(true);
        try {
            const selectedItemLabel = activeTab === 'appointment' ? 'Doctor' : activeTab === 'second-opinion' ? 'Second Opinion' : 'Health Package';

            const payload = {
                to: "crm.txhospitals@gmail.com, venudas@txhospitals.in",
                cc: "info.txhospitals@gmail.com",
                subject: `New Inquiry from Uppal Hero Section (${activeTab === 'appointment' ? 'Book Appointment' : activeTab === 'second-opinion' ? 'Second Opinion' : 'Book Health Checkup'})`,
                html: `
                    <h3>New Hero Section Inquiry - Uppal Landing Page</h3>
                    <p><strong>Type:</strong> ${activeTab}</p>
                    <p><strong>Name:</strong> ${formData.name}</p>
                    <p><strong>Mobile:</strong> ${formData.phone}</p>
                    <p><strong>Location:</strong> TX Hospitals Uppal</p>
                    <p><strong>${selectedItemLabel}:</strong> ${formData.doctor || 'Not Specified'}</p>
                    <p><strong>Preferred Date:</strong> ${formData.date || 'Not Specified'}</p>
                    <p><strong>Page:</strong> ${document.title || "Uppal Landing Page"}</p>
                `,
                page: document.title || "Uppal Landing Page",
                location: "TX Hospitals Uppal",
                name: formData.name,
                mobile: formData.phone,
                concern: formData.doctor || "Not Specified",
                doctor: formData.doctor || "Not Specified",
                time: formData.date
            };
            await axios.post(`${CONFIG.API_BASE_URL}/send-email/dynamic-form`, payload);
            // Dispatch to MyKare lead API
            submitMyKareLead(payload);
            toast.success("Appointment request submitted successfully!");
            setFormData({ name: '', phone: '', location: 'Uppal', doctor: '', date: '' });
            router.push('/thank-you-uppal');
        } catch (error) {
            console.error('Error submitting Uppal inquiry:', error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="home" className="relative flex overflow-hidden w-full -mt-2 md:mt-4" style={{ minHeight: '660px' }}>
            <div className="relative flex-grow hidden lg:block bg-white">
                <div className="absolute inset-0 bg-white">
                    <Image
                        src="/assets/Uppal/Uppal.png"
                        alt="TX Hospitals Uppal Branch Building and Reception Area"
                        layout="fill"
                        objectFit="cover"
                        priority
                    />
                </div>
            </div>

            <div
                className="relative z-10 flex flex-col justify-between pl-8 pr-12 lg:pr-16 py-8 w-full lg:w-[45%] xl:w-[40%] flex-shrink-0"
                style={{ background: 'linear-gradient(160deg, rgb(26, 5, 16) 0%, rgb(74, 18, 40) 100%)' }}
            >
                <div>
                    <h1 className="mb-5" style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', fontWeight: 600, color: 'rgb(255, 255, 255)', lineHeight: 1.25 }}>
                        TX Hospitals Uppal: Multispecialty Hospital in Uppal, Hyderabad
                    </h1>

                    <div className="flex flex-wrap gap-2 mb-5">
                        <button
                            onClick={() => handleTabChange('appointment')}
                            style={{
                                fontSize: '12px', fontWeight: 500,
                                color: activeTab === 'appointment' ? 'rgb(255, 255, 255)' : 'rgba(255, 255, 255, 0.7)',
                                background: activeTab === 'appointment' ? getTabColor('appointment') : 'rgba(255, 255, 255, 0.08)',
                                border: activeTab === 'appointment' ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                                padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', transition: '0.2s', whiteSpace: 'nowrap'
                            }}
                        >
                            Book Appointment
                        </button>
                        <button
                            onClick={() => handleTabChange('second-opinion')}
                            style={{
                                fontSize: '12px', fontWeight: 500,
                                color: activeTab === 'second-opinion' ? 'rgb(255, 255, 255)' : 'rgba(255, 255, 255, 0.7)',
                                background: activeTab === 'second-opinion' ? getTabColor('second-opinion') : 'rgba(255, 255, 255, 0.08)',
                                border: activeTab === 'second-opinion' ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                                padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', transition: '0.2s', whiteSpace: 'nowrap'
                            }}
                        >
                            Second Opinion
                        </button>
                        <button
                            onClick={() => handleTabChange('health-checkup')}
                            style={{
                                fontSize: '12px', fontWeight: 500,
                                color: activeTab === 'health-checkup' ? 'rgb(255, 255, 255)' : 'rgba(255, 255, 255, 0.7)',
                                background: activeTab === 'health-checkup' ? getTabColor('health-checkup') : 'rgba(255, 255, 255, 0.08)',
                                border: activeTab === 'health-checkup' ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                                padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', transition: '0.2s', whiteSpace: 'nowrap'
                            }}
                        >
                            Book Health Checkup
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 w-[14px] h-[14px]" />
                            <input
                                type="text" name="name" required placeholder="Full Name"
                                value={formData.name} onChange={handleChange}
                                className="w-full pl-9 pr-3 py-2.5 rounded-lg outline-none"
                                style={{ fontSize: '13px', color: 'rgb(255, 255, 255)', background: 'rgba(255, 255, 255, 0.12)', border: '1px solid rgba(255, 255, 255, 0.25)' }}
                            />
                        </div>

                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 w-[14px] h-[14px]" />
                            <input
                                type="tel" name="phone" required placeholder="Phone Number"
                                value={formData.phone} onChange={handleChange}
                                className="w-full pl-9 pr-3 py-2.5 rounded-lg outline-none"
                                style={{ fontSize: '13px', color: 'rgb(255, 255, 255)', background: 'rgba(255, 255, 255, 0.12)', border: '1px solid rgba(255, 255, 255, 0.25)' }}
                            />
                        </div>

                        <HeroSearchableSelect
                            label="Location"
                            placeholder="Select Location"
                            options={["Banjara Hills", "Kachiguda", "Miyapur", "Uppal"]}
                            value={formData.location}
                            onChange={(e) => {}}
                            icon={MapPin}
                            disabled={true}
                        />

                        {activeTab === 'appointment' && (
                            <HeroSearchableSelect
                                label="Doctor"
                                placeholder="Select Doctor"
                                options={doctorOptions}
                                value={formData.doctor}
                                onChange={(e) => setFormData(prev => ({ ...prev, doctor: e.target.value }))}
                                icon={Stethoscope}
                            />
                        )}

                        {activeTab === 'second-opinion' && (
                            <HeroSearchableSelect
                                label="Second Opinion"
                                placeholder="Select Second Opinion"
                                options={secondOpinions}
                                value={formData.doctor}
                                onChange={(e) => setFormData(prev => ({ ...prev, doctor: e.target.value }))}
                                icon={Stethoscope}
                            />
                        )}

                        {activeTab === 'health-checkup' && (
                            <HeroSearchableSelect
                                label="Health Package"
                                placeholder="Select Health Package"
                                options={healthPackages}
                                value={formData.doctor}
                                onChange={(e) => setFormData(prev => ({ ...prev, doctor: e.target.value }))}
                                icon={Stethoscope}
                            />
                        )}

                        <div className="relative">
                            <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 w-[14px] h-[14px]" />
                            <input
                                type="date" name="date" required min={getTomorrowDateString()}
                                value={formData.date} onChange={handleChange}
                                className="w-full pl-9 pr-3 py-2.5 rounded-lg outline-none"
                                style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)', background: 'rgba(255, 255, 255, 0.12)', border: '1px solid rgba(255, 255, 255, 0.25)' }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg transition-opacity hover:opacity-90 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            style={{ background: activeColor, fontSize: '14px', fontWeight: 600, color: 'rgb(255, 255, 255)', border: 'none' }}
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Calendar className="w-[15px] h-[15px]" />
                                    {activeTab === 'appointment' ? 'Confirm Appointment' : activeTab === 'second-opinion' ? 'Request Second Opinion' : 'Book Health Checkup'}
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="flex items-center gap-4 mt-6 pt-5" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
                    <div className="flex flex-col items-center">
                        <div className="flex gap-0.5 mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-3 h-3 fill-[#BD385C] text-[#BD385C]" />
                            ))}
                        </div>
                        <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.65)' }}>
                            4.8 Google Ratings
                        </span>
                    </div>

                    <div style={{ width: '1px', height: '32px', background: 'rgba(255, 255, 255, 0.18)' }}></div>

                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#BD385C]" />
                        <div>
                            <div style={{ fontSize: '12px', fontWeight: 600, color: 'rgb(255, 255, 255)' }}>
                                Available 24/7
                            </div>
                            <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.65)' }}>
                                Emergency Care
                            </div>
                        </div>
                    </div>

                    <div style={{ width: '1px', height: '32px', background: 'rgba(255, 255, 255, 0.18)' }}></div>

                    <div>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: 'rgb(255, 255, 255)' }}>
                            13+
                        </div>
                        <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.65)' }}>
                            Specialities
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UppalNewHero;
