"use client";
import React, { useState, useEffect } from 'react';
import { submitMyKareLead } from '@/utils/leadService';

import Image from "next/image";
import useIsMobile from "@/hooks/useIsMobile";
import { useRouter } from 'next/router';
import axios from 'axios';
import { IoClose } from 'react-icons/io5';
import { User, Phone, Stethoscope, CalendarDays, MapPin, ChevronDown } from 'lucide-react';
import CONFIG from '@/config';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const SearchableSelect = ({ label, placeholder, options, value, onChange, icon: Icon, disabled }) => {
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
        <div className="space-y-1 relative" ref={containerRef}>
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">{label}</label>
            <div className="relative">
                {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-[16px] h-[16px] z-10" />}
                <input
                    type="text"
                    placeholder={placeholder}
                    value={isOpen ? searchTerm : (value || '')}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        if (!isOpen) setIsOpen(true);
                    }}
                    onFocus={(e) => {
                        lastFocusTime.current = Date.now();
                        setIsOpen(true);
                        const scrollContainer = e.target.closest('.custom-scrollbar');
                        if (scrollContainer) {
                            const fieldWrapper = e.target.closest('.space-y-1');
                            if (fieldWrapper) {
                                const containerRect = scrollContainer.getBoundingClientRect();
                                const wrapperRect = fieldWrapper.getBoundingClientRect();
                                const relativeTop = wrapperRect.top - containerRect.top + scrollContainer.scrollTop;
                                scrollContainer.scrollTo({
                                    top: relativeTop - 10,
                                    behavior: 'smooth'
                                });
                            }
                        }
                    }}
                    onClick={() => {
                        if (Date.now() - lastFocusTime.current > 150) {
                            setIsOpen(prev => !prev);
                        }
                    }}
                    disabled={disabled}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-10 text-gray-950 focus:ring-4 focus:ring-opacity-20 outline-none transition-all text-sm font-semibold disabled:opacity-75 disabled:bg-gray-100 disabled:cursor-not-allowed cursor-pointer"
                />
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-[16px] h-[16px] z-10 pointer-events-none" />

                {isOpen && !disabled && (
                    <div className="absolute left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-xl z-50 py-1">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((opt, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => {
                                        onChange({ target: { name: label.toLowerCase(), value: opt } });
                                        setIsOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-pink-50 hover:text-pink-700 transition-colors font-semibold text-gray-800"
                                >
                                    {opt}
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-2 text-sm text-gray-500 font-semibold font-inter">No options found</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default function SocialSidebar({ isClinicalResearch = false }) {
    const isMobile = useIsMobile();
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('appointment');
    const [formData, setFormData] = useState({ name: '', phone: '', location: '', doctor: '', date: '' });
    const [loading, setLoading] = useState(false);
    const [allDoctors, setAllDoctors] = useState([]);
    const [secondOpinions, setSecondOpinions] = useState([]);
    const [healthPackages, setHealthPackages] = useState([]);
    const [isLocationReadOnly, setIsLocationReadOnly] = useState(false);

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
                console.error("Error fetching options in SocialSidebar:", error);
            }
        };
        fetchAllData();
    }, []);

    useEffect(() => {
        const handleOpenAppointmentModal = () => {
            openForm('appointment');
        };
        window.addEventListener('open-appointment-modal', handleOpenAppointmentModal);
        return () => window.removeEventListener('open-appointment-modal', handleOpenAppointmentModal);
    }, []);

    const getPageLocation = () => {
        if (typeof window === 'undefined') return '';
        const path = window.location.pathname.toLowerCase();
        if (path.includes('banjara-hills')) return 'Banjara Hills';
        if (path.includes('kachiguda')) return 'Kachiguda';
        if (path.includes('miyapur')) return 'Miyapur';
        if (path.includes('uppal')) return 'Uppal';
        return '';
    };

    const getDoctorsForLocation = (loc) => {
        if (!loc) return [];
        return allDoctors.filter(doc =>
            doc.location && doc.location.toLowerCase().includes(loc.toLowerCase())
        );
    };

    const locationOptions = ["Banjara Hills", "Kachiguda", "Miyapur", "Uppal"];
    const doctorOptions = getDoctorsForLocation(formData.location).map(doctor =>
        `${doctor.name} - ${doctor.department || doctor.designation || 'Specialist'}`
    );

    const mobileIcons = isClinicalResearch ? [
        { src: "/assets/FixedIcons/Call Icon .webp", alt: "Call Us", link: "tel:917674014388" },
        { src: "/assets/FixedIcons/Whatsup Icon.webp", alt: "WhatsApp", link: "https://wa.me/917674014388" },
    ] : [
        { src: "/assets/FixedIcons/Call Icon .webp", alt: "Call Us", link: "tel:9144514459" },
        { src: "/assets/FixedIcons/Whatsup Icon.webp", alt: "WhatsApp", link: "https://wa.me/9144514459" },
        { src: "/assets/FixedIcons/Doctor Consultant Icon.webp", alt: "Doctors Appointment", link: "https://txhospitals.in/find-doctor/" },
        { src: "/assets/FixedIcons/Second opinon _ Icon.webp", alt: "Second Opinion", link: "https://txhospitals.in/surgery-care/" },
    ];

    const openForm = (tab) => {
        setActiveTab(tab);
        setIsOpen(true);
        const autoLoc = getPageLocation();
        setFormData({ name: '', phone: '', location: autoLoc, doctor: '', date: '' });
        setIsLocationReadOnly(!!autoLoc);
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
            const currentPath = typeof window !== 'undefined' ? window.location.pathname.toLowerCase() : '';
            let redirectUrl = '/thank-you';
            if (currentPath.includes('banjara-hills')) {
                redirectUrl = '/thank-you-banjara-hills';
            } else if (currentPath.includes('kachiguda')) {
                redirectUrl = '/thank-you-kachiguda';
            } else if (currentPath.includes('miyapur')) {
                redirectUrl = '/thank-you-miyapur';
            } else if (currentPath.includes('uppal')) {
                redirectUrl = '/thank-you-uppal';
            }

            const selectedItemLabel = activeTab === 'appointment' ? 'Doctor' : activeTab === 'second-opinion' ? 'Second Opinion' : 'Health Package';

            const payload = {
                to: "crm.txhospitals@gmail.com, venudas@txhospitals.in",
                cc: "info.txhospitals@gmail.com",
                subject: `New Inquiry from Floating Bar (${activeTab === 'appointment' ? 'Book Appointment' : activeTab === 'second-opinion' ? 'Second Opinion' : 'Book Health Checkup'})`,
                html: `
                    <h3>New Floating Bar Inquiry</h3>
                    <p><strong>Type:</strong> ${activeTab}</p>
                    <p><strong>Name:</strong> ${formData.name}</p>
                    <p><strong>Mobile:</strong> ${formData.phone}</p>
                    <p><strong>Location:</strong> ${formData.location || 'Not Specified'}</p>
                    <p><strong>${selectedItemLabel}:</strong> ${formData.doctor || 'Not Specified'}</p>
                    <p><strong>Preferred Date:</strong> ${formData.date || 'Not Specified'}</p>
                    <p><strong>Page:</strong> ${document.title || "Landing Page"}</p>
                `,
                page: document.title || "Landing Page",
                location: formData.location || "TX Hospitals",
                name: formData.name,
                mobile: formData.phone,
                concern: formData.doctor || "Not Specified",
                doctor: formData.doctor || "Not Specified",
                time: formData.date
            };
            await axios.post(`${CONFIG.API_BASE_URL}/send-email/dynamic-form`, payload);
            // Dispatch to MyKare lead API
            submitMyKareLead(payload);
            toast.success("Request submitted successfully!");
            setIsOpen(false);
            setFormData({ name: '', phone: '', location: '', doctor: '', date: '' });
            router.push(redirectUrl);
        } catch (error) {
            console.error('Error submitting inquiry:', error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const getTabColor = (tab) => {
        switch (tab) {
            case 'appointment': return 'rgb(189, 56, 92)';
            case 'second-opinion': return 'rgb(124, 58, 237)';
            case 'health-checkup': return 'rgb(5, 150, 105)';
            default: return 'rgb(189, 56, 92)';
        }
    };
    const getTomorrowDateString = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const yyyy = tomorrow.getFullYear();
        const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const dd = String(tomorrow.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const activeColor = getTabColor(activeTab);

    return (
        <>
            {isMobile ? (
                // Keep the mobile bottom bar
                <div className="fixed bottom-0 z-50 w-full bg-gradient-to-r from-pink-800 to-pink-800 shadow-lg">
                    <div className="flex flex-row items-center justify-around">
                        {mobileIcons.map((icon, idx) => (
                            <button
                                key={idx}
                                type="button"
                                aria-label={icon.alt}
                                onClick={() => window.open(icon.link, "_blank")}
                                className="flex flex-col items-center justify-center gap-2 px-3 py-1 flex-1 border-r border-white/20 last:border-r-0 text-white cursor-pointer transition-all duration-200 hover:bg-white/10 active:bg-white/20 active:scale-95"
                            >
                                <div className="flex items-center justify-center">
                                    <Image
                                        src={icon.src}
                                        alt={icon.alt}
                                        width={30}
                                        height={30}
                                        className="object-contain drop-shadow-md"
                                    />
                                </div>
                                <p className="text-[11px] font-semibold text-center leading-tight">
                                    {icon.alt}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            ) : isClinicalResearch ? null : (
                // Right side desktop floating bar
                <div className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 flex-col gap-1">
                    {/* Book Appointment */}
                    <div className="group relative flex items-center justify-end">
                        <span className="absolute right-full mr-2 whitespace-nowrap px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-white text-xs font-medium shadow-md" style={{ background: 'rgb(189, 56, 92)' }}>
                            Book Appointment
                        </span>
                        <button onClick={() => openForm('appointment')} aria-label="Book Appointment" className="flex items-center justify-center w-10 h-10 rounded-l-lg shadow-md transition-all hover:w-12 text-white" style={{ background: 'rgb(189, 56, 92)' }}>
                            <svg width="18" alt="Image" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><line x1="12" y1="14" x2="12" y2="18"></line><line x1="10" y1="16" x2="14" y2="16"></line></svg>
                        </button>
                    </div>

                    {/* Second Opinion */}
                    <div className="group relative flex items-center justify-end">
                        <span className="absolute right-full mr-2 whitespace-nowrap px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-white text-xs font-medium shadow-md" style={{ background: 'rgb(124, 58, 237)' }}>
                            Second Opinion
                        </span>
                        <button onClick={() => openForm('second-opinion')} aria-label="Request Second Opinion" className="flex items-center justify-center w-10 h-10 rounded-l-lg shadow-md transition-all hover:w-12 text-white" style={{ background: 'rgb(124, 58, 237)' }}>
                            <svg width="18" alt="Image" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><line x1="9" y1="10" x2="15" y2="10"></line><line x1="12" y1="7" x2="12" y2="13"></line></svg>
                        </button>
                    </div>

                    {/* Book Health Checkup */}
                    <div className="group relative flex items-center justify-end">
                        <span className="absolute right-full mr-2 whitespace-nowrap px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-white text-xs font-medium shadow-md" style={{ background: 'rgb(5, 150, 105)' }}>
                            Book Health Checkup
                        </span>
                        <button onClick={() => openForm('health-checkup')} aria-label="Book Health Checkup" className="flex items-center justify-center w-10 h-10 rounded-l-lg shadow-md transition-all hover:w-12 text-white" style={{ background: 'rgb(5, 150, 105)' }}>
                            <svg width="18" alt="Image" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"></path><path d="M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0z"></path></svg>
                        </button>
                    </div>

                    {/* WhatsApp */}
                    <div className="group relative flex items-center justify-end">
                        <span className="absolute right-full mr-2 whitespace-nowrap px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-white text-xs font-medium shadow-md" style={{ background: 'rgb(37, 211, 102)' }}>
                            WhatsApp
                        </span>
                        <a href="https://wa.me/9144514459" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex items-center justify-center w-10 h-10 rounded-l-lg shadow-md transition-all hover:w-12 text-white" style={{ background: 'rgb(37, 211, 102)' }}>
                            <svg width="18" alt="Image" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.18 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966a9.9 9.9 0 0 0-6.98-2.853c-5.438 0-9.863 4.372-9.867 9.8.001 1.736.469 3.43 1.36 4.953l-.991 3.616 3.698-.97c1.54.845 3.201 1.289 4.841 1.289zm8.56-5.882c-.269-.134-1.594-.787-1.84-.878-.246-.09-.425-.135-.605.134-.18.27-.697.877-.854 1.057-.158.18-.314.203-.583.069-.269-.134-1.138-.419-2.167-1.338-.802-.714-1.344-1.597-1.501-1.867-.158-.269-.017-.415.118-.549.121-.12.269-.314.403-.472.135-.157.18-.27.27-.449.09-.18.045-.337-.023-.472-.067-.134-.605-1.457-.828-1.995-.218-.523-.458-.453-.628-.462-.162-.008-.348-.01-.534-.01-.186 0-.49.07-.746.348-.256.278-.978.956-.978 2.33 0 1.375.999 2.702 1.138 2.893.139.191 1.967 3.003 4.76 4.213.665.288 1.184.46 1.588.589.668.213 1.277.183 1.758.11.536-.08 1.594-.651 1.817-1.282.223-.63.223-1.17.157-1.282-.067-.112-.246-.18-.515-.314z" /></svg>
                        </a>
                    </div>

                    {/* Call Phone */}
                    <div className="group relative flex items-center justify-end">
                        <span className="absolute right-full mr-2 whitespace-nowrap px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-white text-xs font-medium shadow-md" style={{ background: 'rgb(37, 99, 235)' }}>
                            Call Us
                        </span>
                        <a href="tel:9144514459" aria-label="Call Us" className="flex items-center justify-center w-10 h-10 rounded-l-lg shadow-md transition-all hover:w-12 text-white" style={{ background: 'rgb(37, 99, 235)' }}>
                            <Phone size={18} />
                        </a>
                    </div>
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-[9999] px-4 font-inter">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.98, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: 15 }} className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]">
                            <div className="py-5 px-8 text-white text-center relative transition-colors duration-300" style={{ background: activeColor }}>
                                <h2 className="text-xl font-bold font-poppins">{activeTab === 'appointment' ? 'Book Appointment' : activeTab === 'second-opinion' ? 'Second Opinion' : 'Book Health Checkup'}</h2>
                                <p className="text-white/80 text-[10px] font-bold uppercase tracking-[0.2em] mt-0.5">TX Hospitals</p>
                                <button onClick={() => setIsOpen(false)} className="absolute top-5 right-6 text-white/70 hover:text-white transition-colors">
                                    <IoClose size={22} />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                                <div className="p-6 pt-6 overflow-y-auto flex-1 space-y-4 custom-scrollbar">
                                    <div className="space-y-1 relative">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Patient Name</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-[16px] h-[16px]" />
                                            <input type="text" name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-900 focus:ring-4 focus:ring-opacity-20 outline-none transition-all text-sm font-semibold" />
                                        </div>
                                    </div>
                                    <div className="space-y-1 relative">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Mobile Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-[16px] h-[16px]" />
                                            <input type="tel" name="phone" placeholder="Enter Phone" required value={formData.phone} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-900 focus:ring-4 focus:ring-opacity-20 outline-none transition-all text-sm font-semibold" />
                                        </div>
                                    </div>

                                    <SearchableSelect
                                        label="Location"
                                        placeholder="Select Location"
                                        options={locationOptions}
                                        value={formData.location}
                                        onChange={(e) => {
                                            setFormData(prev => ({ ...prev, location: e.target.value, doctor: '' }));
                                        }}
                                        icon={MapPin}
                                        disabled={isLocationReadOnly}
                                    />

                                    {activeTab === 'appointment' && (
                                        <SearchableSelect
                                            label="Doctor"
                                            placeholder={formData.location ? "Select Doctor" : "Select Location First"}
                                            options={doctorOptions}
                                            value={formData.doctor}
                                            onChange={(e) => {
                                                setFormData(prev => ({ ...prev, doctor: e.target.value }));
                                            }}
                                            icon={Stethoscope}
                                            disabled={!formData.location}
                                        />
                                    )}

                                    {activeTab === 'second-opinion' && (
                                        <SearchableSelect
                                            label="Second Opinion"
                                            placeholder="Select Second Opinion"
                                            options={secondOpinions}
                                            value={formData.doctor}
                                            onChange={(e) => {
                                                setFormData(prev => ({ ...prev, doctor: e.target.value }));
                                            }}
                                            icon={Stethoscope}
                                        />
                                    )}

                                    {activeTab === 'health-checkup' && (
                                        <SearchableSelect
                                            label="Health Package"
                                            placeholder="Select Health Package"
                                            options={healthPackages}
                                            value={formData.doctor}
                                            onChange={(e) => {
                                                setFormData(prev => ({ ...prev, doctor: e.target.value }));
                                            }}
                                            icon={Stethoscope}
                                        />
                                    )}

                                    <div className="space-y-1 relative">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Preferred Date</label>
                                        <div className="relative">
                                            <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-[16px] h-[16px]" />
                                            <input type="date" name="date" required min={getTomorrowDateString()} value={formData.date} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-900 focus:ring-4 focus:ring-opacity-20 outline-none transition-all text-sm font-semibold" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-50 border-t border-gray-100">
                                    <button type="submit" disabled={loading} className="w-full text-white font-bold py-3.5 rounded-xl shadow-lg transition-all active:scale-98 text-xs uppercase tracking-[0.2em] flex items-center justify-center hover:opacity-90" style={{ backgroundColor: activeColor }}>
                                        {loading ? "Processing..." : (activeTab === 'appointment' ? 'Confirm Appointment' : activeTab === 'second-opinion' ? 'Request Second Opinion' : 'Book Health Checkup')}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
                .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: #cbd5e1 transparent;
                }
            `}</style>
        </>
    );
}
