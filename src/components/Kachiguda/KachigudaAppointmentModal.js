import React, { useState } from 'react';
import { submitMyKareLead } from '@/utils/leadService';

import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import axios from 'axios';
import CONFIG from '@/config';
import { toast } from 'react-toastify';

export default function KachigudaAppointmentModal({ closeModal }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        speciality: '',
        date: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            const numericValue = value.replace(/\D/g, '').slice(0, 10);
            setFormData(prev => ({ ...prev, [name]: numericValue }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 10-digit mobile validation
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
            const payload = {
                to: "crm.txhospitals@gmail.com, venudas@txhospitals.in",
                cc: "info.txhospitals@gmail.com",
                subject: "New Inquiry from Kachiguda Branch (CTA Banner)",
                html: `
                    <h3>New Inquiry - Kachiguda CTA Section</h3>
                    <p><strong>Name:</strong> ${formData.name}</p>
                    <p><strong>Mobile:</strong> ${formData.phone}</p>
                    <p><strong>Department/Speciality:</strong> ${formData.speciality || 'Not Specified'}</p>
                    <p><strong>Preferred Date:</strong> ${formData.date || 'Not Specified'}</p>
                    <p><strong>Location:</strong> TX Hospitals Kachiguda</p>
                    <p><strong>Page:</strong> ${document.title || "Kachiguda Landing Page"}</p>
                `,
                page: document.title || "Kachiguda Landing Page",
                location: "TX Hospitals Kachiguda",
                name: formData.name,
                mobile: formData.phone,
                concern: formData.speciality,
                time: formData.date
            };
            await axios.post(`${CONFIG.API_BASE_URL}/send-email/dynamic-form`, payload);
            // Dispatch to MyKare lead API
            submitMyKareLead(payload);
            toast.success("Appointment request submitted successfully!");
            closeModal();
            router.push('/thank-you-kachiguda');
        } catch (error) {
            console.error('Error submitting Kachiguda modal:', error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 w-full h-full flex items-center justify-center z-[999999] px-4">

            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
                className="absolute inset-0 w-full h-full bg-slate-900/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Body Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="relative bg-white w-full max-w-[460px] rounded-3xl shadow-2xl overflow-hidden border border-slate-100 z-10 flex flex-col"
            >
                {/* Header */}
                <div className="bg-[#0052a3] px-6 py-5 text-center text-white relative">
                    <h2 className="text-xl md:text-2xl font-extrabold tracking-wide">Book FREE Appointment</h2>
                    <p className="text-white/80 text-xs md:text-sm font-semibold mt-1">Get a callback within 30 minutes</p>

                    {/* Close Button Cross */}
                    <button
                        onClick={closeModal}
                        className="absolute right-4 top-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-all"
                        aria-label="Close modal"
                    >
                        <svg className="w-5 h-5 stroke-2" alt="Image" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4">
                    {/* Name Input */}
                    <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">Full Name *</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Ramesh Kumar"
                            className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl py-3 px-4 text-gray-900 font-bold placeholder:text-gray-400 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/5 transition-all text-sm"
                        />
                    </div>

                    {/* Phone Input */}
                    <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">Mobile Number *</label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl py-3 px-4 text-gray-900 font-bold placeholder:text-gray-400 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/5 transition-all text-sm"
                        />
                    </div>

                    {/* Speciality Input */}
                    <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">Department / Speciality</label>
                        <input
                            type="text"
                            name="speciality"
                            value={formData.speciality}
                            onChange={handleChange}
                            placeholder="e.g. Cardiology, Ortho..."
                            className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl py-3 px-4 text-gray-900 font-bold placeholder:text-gray-400 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/5 transition-all text-sm"
                        />
                    </div>

                    {/* Date Input */}
                    <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">Preferred Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            min={getTomorrowDateString()}
                            className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl py-3 px-4 text-gray-900 font-bold text-gray-700 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/5 transition-all text-sm"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-[#e65c00] hover:bg-[#d45500] text-white font-extrabold py-3.5 rounded-xl transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 mt-6 shadow-lg shadow-orange-500/10 text-sm uppercase tracking-widest ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Processing...</span>
                            </>
                        ) : (
                            <>
                                <span>✅</span> Confirm Appointment
                            </>
                        )}
                    </button>

                    {/* Trust/Security Note */}
                    <div className="flex items-center justify-center gap-1.5 mt-4 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        <span>🔒</span> Your information is 100% secure & private
                    </div>
                </form>

            </motion.div>
        </div>
    );
}
