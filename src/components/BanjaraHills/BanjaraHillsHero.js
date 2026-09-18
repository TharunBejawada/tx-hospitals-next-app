import React, { useState, useEffect } from 'react';
import { submitMyKareLead } from '@/utils/leadService';

import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Image from 'next/image';
import axios from 'axios';
import { FaPhoneAlt, FaCalendarAlt, FaWhatsapp } from 'react-icons/fa';
import CONFIG from '@/config';
import { toast } from 'react-toastify';
import BookAppointmentForm from '@/components/Blogs/BookAppointemntForm';

const BanjaraHillsHero = () => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        speciality: '',
        date: ''
    });
    const [loading, setLoading] = useState(false);

    // States for custom searchable dropdown
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const handleClickOutside = (event) => {
            const container = document.getElementById('speciality-dropdown-container');
            if (container && !container.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            const val = value.replace(/\D/g, '');
            if (val.length <= 10) {
                setFormData(prev => ({ ...prev, [name]: val }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 10-digit mobile number validation
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(formData.phone)) {
            toast.error("Please enter a valid 10-digit mobile number");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                to: "crm.txhospitals@gmail.com, venudas@txhospitals.in",
                cc: "info.txhospitals@gmail.com",
                subject: `New Inquiry from Banjara Hills Landing Page - ${formData.name}`,
                html: `
                    <h3>New Inquiry - Banjara Hills Landing Page</h3>
                    <p><strong>Name:</strong> ${formData.name}</p>
                    <p><strong>Mobile:</strong> ${formData.phone}</p>
                    <p><strong>Department/Speciality:</strong> ${formData.speciality || 'Not Specified'}</p>
                    <p><strong>Preferred Date:</strong> ${formData.date || 'Not Specified'}</p>
                    <p><strong>Location:</strong> TX Hospitals Banjara Hills</p>
                    <p><strong>Page:</strong> ${document.title || "Banjara Hills Landing Page"}</p>
                `,
                page: document.title || "Banjara Hills Landing Page",
                location: "TX Hospitals Banjara Hills",
                name: formData.name,
                mobile: formData.phone,
                concern: formData.speciality,
                time: formData.date
            };

            await axios.post(`${CONFIG.API_BASE_URL}/send-email/dynamic-form`, payload);
            // Dispatch to MyKare lead API
            submitMyKareLead(payload);
            toast.success("Consultation request submitted successfully!");
            router.push('/thank-you-banjara-hills');
        } catch (error) {
            console.error('Error submitting Banjara Hills inquiry:', error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleWhatsAppClick = (message = "Hi, I would like to book an appointment at TX Hospitals Banjara Hills.") => {
        const url = `https://wa.me/9144514459?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    const features = [
        {
            icon: '/assets/banjara-hills/ambulance_1.svg',
            text: '24x7 Emergency Care'
        },
        {
            icon: '/assets/banjara-hills/stamp (1).svg',
            text: 'NABH Accredited'
        },
        {
            icon: '/assets/banjara-hills/icu (1).svg',
            text: 'Advanced ICU'
        },
        {
            icon: '/assets/banjara-hills/cashless-payment.svg',
            text: 'Cashless Insurance'
        },
        {
            icon: '/assets/banjara-hills/Doctors-team.svg',
            text: 'Expert Doctors'
        }
    ];

    const specialities = [
        "Liver Transplantation",
        "Kidney Transplantation",
        "Robotic Orthopedic Surgery",
        "Robotic GI Surgery",
        "Robotic Urologic Surgery",
        "Robotic Gynecologic Surgery",
        "Robotic Cancer Surgery",
        "Cardiology",
        "Cardiothoracic & Vascular Surgery",
        "Medical Gastroenterology",
        "Surgical Gastroenterology",
        "Nephrology",
        "Urology",
        "Gynaecology",
        "Paediatrics",
        "Neuro Sciences",
        "Oncology",
        "Orthopaedics",
        "Pulmonology",
        "Internal Medicine",
        "Rheumatology",
        "ENT",
        "Skin & Cosmetic Care",
        "Dental & Maxillofacial",
        "Endocrinology",
        "Ophthalmology",
        "Anaesthesia & Pain Management"
    ];

    const filteredSpecialities = specialities.filter(spec =>
        spec.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section className="relative w-full overflow-hidden bg-[#fff8f9] py-8 lg:py-12 px-4 md:px-8 lg:px-12 min-h-[600px] flex items-center">
            {/* Background Container with building image on the right fading to light pink on the left */}
            <div className="absolute inset-0 z-0 flex flex-col lg:flex-row overflow-hidden">
                {/* Left side soft pink spacer */}
                <div className="w-full lg:w-[40%] h-full bg-[#fff8f9]"></div>
                {/* Right side background image with smooth blend overlay */}
                <div className="relative w-full lg:w-[60%] h-full shrink-0">
                    <Image
                        src="/assets/Our Location/Banjara Hills  Hospitals Image.png"
                        alt="TX Hospitals Banjara Hills Building Background"
                        fill
                        priority
                        className="object-cover object-right-bottom opacity-100"
                    />
                    {/* Horizontal gradient to blend image with left soft pink background */}
                    <div className="absolute inset-y-0 left-0 w-full lg:w-[40%] bg-gradient-to-r from-[#fff8f9] via-[#fff8f9]/90 to-transparent"></div>
                    {/* Vertical gradient to fade bottom edge slightly */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#fff8f9] to-transparent"></div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                    {/* Left Column (Content & Info) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-7 flex flex-col space-y-6 lg:pr-6"
                    >
                        <div className="space-y-4">
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                                Best Multi Speciality Hospital in <br />
                                Banjara Hills, <span className="text-[#b3204d]">Hyderabad | TX</span> <br />
                                <span className="text-[#b3204d]">Hospitals</span>
                            </h1>
                            <p className="text-gray-600 text-base md:text-lg max-w-2xl leading-relaxed">
                                Looking for the best hospital in Banjara Hills? TX Hospitals offers expert doctors, 24×7 emergency care, advanced ICU, cashless insurance, and specialist consultations.
                            </p>
                        </div>

                        {/* Features List with customized icons matching screenshot */}
                        <div className="grid grid-cols-5 gap-2 md:gap-4 pt-4 max-w-3xl w-full">
                            {features.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                                    className="flex flex-col items-center text-center space-y-2"
                                >
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-pink-50/50 rounded-xl sm:rounded-2xl flex items-center justify-center p-2 sm:p-3 hover:scale-105 transition-transform duration-300">
                                        <img
                                            src={feature.icon}
                                            alt={feature.text}
                                            className="w-full h-full object-contain"
                                            style={{ filter: 'invert(18%) sepia(88%) saturate(3474%) hue-rotate(330deg) brightness(87%) contrast(93%)' }}
                                        />
                                    </div>
                                    <span className="text-[10px] sm:text-xs md:text-sm font-bold text-gray-800 leading-tight">
                                        {feature.text}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Left Action Buttons Row matching screenshot */}
                        <div className="flex flex-wrap items-center gap-4 pt-6">
                            {/* Call Now Button */}
                            <a
                                href="tel:9144514459"
                                className="bg-[#b3204d] hover:bg-[#971b41] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-3 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg shadow-pink-900/10 min-w-[180px]"
                            >
                                <div className="bg-white/20 p-2 rounded-lg text-white">
                                    <FaPhoneAlt size={16} />
                                </div>
                                <div className="text-left leading-tight text-sm font-bold">
                                    <div className="text-sm font-semibold text-white/90">Call Now</div>
                                    <div className="text-base font-bold">9144514459</div>
                                </div>
                            </a>

                            {/* Book Appointment Button */}
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-white border-2 border-[#b3204d] text-[#b3204d] hover:bg-pink-50/50 px-6 py-3 rounded-xl font-bold flex items-center gap-3 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg min-w-[180px]"
                            >
                                <div className="bg-[#b3204d]/10 p-2 rounded-lg text-[#b3204d]">
                                    <FaCalendarAlt size={16} />
                                </div>
                                <div className="text-left leading-tight text-sm font-bold">
                                    <div>Book</div>
                                    <div>Appointment</div>
                                </div>
                            </button>

                            {/* Chat on WhatsApp Button */}
                            <button
                                onClick={() => handleWhatsAppClick()}
                                className="bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50/50 px-6 py-3 rounded-xl font-bold flex items-center gap-3 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg min-w-[180px]"
                            >
                                <div className="bg-emerald-50 p-2 rounded-lg text-emerald-500">
                                    <FaWhatsapp size={18} />
                                </div>
                                <div className="text-left leading-tight text-sm font-bold">
                                    <div>Chat on</div>
                                    <div>WhatsApp</div>
                                </div>
                            </button>
                        </div>
                    </motion.div>

                    {/* Right Column (Consultation Form Card) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-5 flex justify-center lg:justify-end w-full"
                    >
                        <div className="w-full max-w-[460px] bg-white/95 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden border border-white/60 backdrop-blur-md">
                            {/* Card Body */}
                            <div className="p-6 md:p-8 space-y-6">
                                <div className="text-center space-y-1">
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 ">
                                        Book Your Consultation
                                    </h2>
                                    <p className="text-gray-600 text-base font-medium">
                                        Talk to our medical specialists
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Full Name */}
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Full Name"
                                            className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl py-3.5 px-4 text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:border-[#b3204d] focus:ring-4 focus:ring-[#b3204d]/5 transition-all text-sm shadow-inner"
                                        />
                                    </div>

                                    {/* Mobile Number */}
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Mobile Number"
                                            className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl py-3.5 px-4 text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:border-[#b3204d] focus:ring-4 focus:ring-[#b3204d]/5 transition-all text-sm shadow-inner"
                                        />
                                    </div>

                                    {/* Select Speciality (Searchable Dropdown) */}
                                    <div className="relative" id="speciality-dropdown-container">
                                        <div
                                            className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl py-3.5 px-4 text-gray-900 font-medium focus-within:border-[#b3204d] focus-within:ring-4 focus-within:ring-[#b3204d]/5 transition-all text-sm shadow-inner flex items-center justify-between cursor-pointer relative"
                                            onClick={() => setIsDropdownOpen(true)}
                                        >
                                            <input
                                                type="text"
                                                placeholder="Select Speciality"
                                                value={isDropdownOpen ? searchQuery : formData.speciality}
                                                onChange={(e) => {
                                                    setSearchQuery(e.target.value);
                                                    if (!isDropdownOpen) setIsDropdownOpen(true);
                                                }}
                                                onFocus={() => {
                                                    setIsDropdownOpen(true);
                                                }}
                                                className="w-full bg-transparent outline-none cursor-text font-medium placeholder:text-gray-400 text-sm text-gray-900"
                                            />
                                            <input type="hidden" name="speciality" value={formData.speciality} required />
                                            <div className="text-gray-500 ml-2">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" alt="Image">
                                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                </svg>
                                            </div>
                                        </div>

                                        {isDropdownOpen && (
                                            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto py-1 text-sm">
                                                {filteredSpecialities.length > 0 ? (
                                                    filteredSpecialities.map((spec, idx) => (
                                                        <div
                                                            key={idx}
                                                            onMouseDown={() => {
                                                                setFormData(prev => ({ ...prev, speciality: spec }));
                                                                setSearchQuery('');
                                                                setIsDropdownOpen(false);
                                                            }}
                                                            className="px-4 py-2.5 hover:bg-pink-50 hover:text-[#b3204d] text-gray-800 font-medium cursor-pointer transition-colors"
                                                        >
                                                            {spec}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="px-4 py-2.5 text-gray-400 font-medium italic">
                                                        No specialties found
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Select Date */}
                                    <div className="relative">
                                        <input
                                            type="date"
                                            name="date"
                                            required
                                            value={formData.date}
                                            onChange={handleChange}
                                            className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl py-3.5 px-4 text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:border-[#b3204d] focus:ring-4 focus:ring-[#b3204d]/5 transition-all text-sm shadow-inner"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full bg-[#b3204d] hover:bg-[#971b41] text-white font-bold py-4 rounded-xl transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 mt-6 shadow-lg shadow-pink-900/10 text-sm uppercase tracking-widest ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    >
                                        {loading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                <span>Processing...</span>
                                            </>
                                        ) : (
                                            "GET A CALL BACK IN 10 MINUTES"
                                        )}
                                    </button>

                                    {/* Or line */}
                                    <div className="relative flex items-center justify-center my-4">
                                        <div className="border-t border-gray-200 w-full"></div>
                                        <span className="absolute bg-white px-3 text-sm font-bold text-gray-500 uppercase tracking-widest">Or</span>
                                    </div>

                                    {/* Whatsapp button inside Form Card */}
                                    <button
                                        type="button"
                                        onClick={() => handleWhatsAppClick()}
                                        className="w-full border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50/50 font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-sm"
                                    >
                                        <FaWhatsapp className="text-lg text-emerald-500" />
                                        <span>Chat on Whatsapp</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Reusable modal popup imported from Uppal microsite page */}
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

export default BanjaraHillsHero;
