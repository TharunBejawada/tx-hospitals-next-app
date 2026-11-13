import React, { useState } from "react";
import { submitMyKareLead } from '@/utils/leadService';

import { IoClose } from "react-icons/io5";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import CONFIG from "@/config";
import { toast } from "react-toastify";

const BookAppointmentForm = ({ showModal, setShowModal, redirectUrl = "/thank-you", defaultLocation = "" }) => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        date: "",
        location: defaultLocation,
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            const numericValue = value.replace(/\D/g, '').slice(0, 10);
            setFormData((prevData) => ({
                ...prevData,
                [name]: numericValue,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
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

        // Validation for 10-digit mobile number
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
        const location = formData.location || defaultLocation;
        const isUppal = location?.toLowerCase().includes("uppal");

        try {
            const payload = {
                to: "crm.txhospitals@gmail.com, venudas@txhospitals.in",
                cc: "info.txhospitals@gmail.com",
                subject: `New Inquiry from ${location}`,
                html: `
                    <h3>New Inquiry</h3>
                    <p><strong>Name:</strong> ${formData.name}</p>
                    <p><strong>Mobile:</strong> ${formData.phone}</p>
                    <p><strong>Date:</strong> ${formData.date}</p>
                    <p><strong>Location:</strong> ${location}</p>
                    <p><strong>Page:</strong> ${document.title || "Book Appointment Form"}</p>
                `,
                page: document.title || "Book Appointment Form",
                location: location,
                name: formData.name,
                mobile: formData.phone,
                date: formData.date
            };
            await axios.post(`${CONFIG.API_BASE_URL}/send-email/dynamic-form`, payload);
            // Dispatch to MyKare lead API
            submitMyKareLead(payload);
            toast.success("Appointment request submitted successfully!");
            router.push(redirectUrl);
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const locations = [
        "TX Hospitals Uppal",
        "TX Hospitals Kachiguda",
        "TX Hospitals Banjara Hills",
        "TX Children Hospitals Banjara Hills",
        "TX Hospitals Miyapur"
    ];

    return (
        <AnimatePresence>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-[9999] px-4 font-inter">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowModal(false)}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: 15 }}
                        className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100"
                    >
                        {/* Branded Header */}
                        <div className="bg-pink-700 py-4 px-8 text-white text-center relative">
                            <h2 className="text-xl font-bold ">Book Appointment</h2>
                            <p className="text-pink-100/60 text-[9px] font-bold uppercase tracking-[0.2em] mt-0.5">Direct Medical Consultation</p>

                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-4 right-6 text-white/50 hover:text-white transition-colors"
                            >
                                <IoClose size={20} />
                            </button>
                        </div>

                        {/* Form Body */}
                        <div className="p-6 md:p-8">
                            <form
                                action="https://formsubmit.co/crm.txhospitals@gmail.com"
                                method="POST"
                                onSubmit={handleSubmit}
                                className="space-y-3.5"
                            >
                                {/* Hidden Fields */}
                                <input type="hidden" name="_cc" value="info.txhospitals@gmail.com" />
                                <input type="hidden" name="_captcha" value="false" />

                                {/* Patient Name */}
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Patient Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 text-gray-900 font-bold focus:ring-4 focus:ring-pink-500/5 outline-none transition-all text-sm"
                                    />
                                </div>

                                {/* Mobile Number */}
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Mobile Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Enter Phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 text-gray-900 font-bold focus:ring-4 focus:ring-pink-500/5 outline-none transition-all text-sm"
                                    />
                                </div>

                                {/* Date and Location Side by Side */}
                                <div className={defaultLocation ? "grid grid-cols-1 gap-4" : "grid grid-cols-2 gap-4"}>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Date</label>
                                        <input
                                            type="date"
                                            name="date"
                                            required
                                            value={formData.date}
                                            onChange={handleChange}
                                            min={getTomorrowDateString()}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 text-gray-900 font-bold focus:ring-4 focus:ring-pink-500/5 outline-none transition-all text-sm"
                                        />
                                    </div>
                                    {!defaultLocation ? (
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Center</label>
                                            <select
                                                name="location"
                                                required
                                                value={formData.location}
                                                onChange={handleChange}
                                                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 text-gray-900 font-bold focus:ring-4 focus:ring-pink-500/5 outline-none transition-all text-sm appearance-none cursor-pointer"
                                            >
                                                <option value="">Choose</option>
                                                {locations.map(loc => (
                                                    <option key={loc} value={loc}>{loc}</option>
                                                ))}
                                            </select>
                                        </div>
                                    ) : (
                                        <input type="hidden" name="location" value={defaultLocation} />
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full bg-pink-700 hover:bg-pink-800 text-white font-bold py-3.5 rounded-xl shadow-xl transition-all active:scale-95 text-xs uppercase tracking-[0.2em] mt-1 flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Processing...</span>
                                        </div>
                                    ) : (
                                        "Confirm Appointment"
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default BookAppointmentForm;
