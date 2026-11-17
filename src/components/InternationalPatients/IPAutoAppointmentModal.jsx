import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import { User, Phone, Calendar, MapPin, Stethoscope } from "lucide-react";
import { toast } from "react-toastify";
import CONFIG from "@/config";
import { submitMyKareLead } from "@/utils/leadService";

const LOCATIONS = [
    "TX Hospitals Banjara Hills",
    "TX Hospitals Uppal",
    "TX Hospitals Kachiguda",
    "TX Hospitals Miyapur"
];

const SPECIALTIES = [
    "Transplant Surgery (Liver & Kidney)",
    "Robotic Surgery",
    "Cardiology & Cardiac Surgery",
    "Neurology & Neurosurgery",
    "Gastroenterology & GI Surgery",
    "Nephrology & Dialysis",
    "Orthopaedics & Joint Replacement",
    "Oncology & Cancer Care",
    "Urology & Andrology",
    "Pulmonology & Critical Care",
    "Mother & Child Care / Gynaecology",
    "Other Speciality"
];

export default function IPAutoAppointmentModal({ isOpen, onClose }) {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        date: "",
        location: "TX Hospitals Banjara Hills",
        speciality: "Transplant Surgery (Liver & Kidney)",
    });
    const [loading, setLoading] = useState(false);

    // Close on Escape key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const getTomorrowDateString = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const yyyy = tomorrow.getFullYear();
        const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
        const dd = String(tomorrow.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate name
        if (!formData.name.trim()) {
            toast.error("Please enter patient name.");
            return;
        }

        // Validate phone: flexible to allow both Indian 10-digit and international numbers
        const cleanPhone = formData.phone.replace(/[\s\-()]/g, "");
        if (cleanPhone.length < 7 || cleanPhone.length > 16) {
            toast.error("Please enter a valid phone number (minimum 7 digits).");
            return;
        }

        // Validate date
        if (formData.date) {
            const selectedDate = new Date(formData.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate <= today) {
                toast.error("Please select a future appointment date.");
                return;
            }
        }

        setLoading(true);

        const payload = {
            to: "crm.txhospitals@gmail.com, venudas@txhospitals.in",
            cc: "info.txhospitals@gmail.com",
            subject: `International Patient Appointment Inquiry - ${formData.location}`,
            html: `
                <h3>New International Patient Appointment Request</h3>
                <p><strong>Patient Name:</strong> ${formData.name}</p>
                <p><strong>Phone / WhatsApp:</strong> ${formData.phone}</p>
                <p><strong>Preferred Date:</strong> ${formData.date || "Not specified"}</p>
                <p><strong>Preferred Branch:</strong> ${formData.location}</p>
                <p><strong>Speciality:</strong> ${formData.speciality}</p>
                <p><strong>Source Page:</strong> International Patient Services (${typeof window !== 'undefined' ? window.location.href : 'Direct'})</p>
            `,
            page: "International Patient Services - Appointment Popup",
            location: formData.location,
            name: formData.name,
            mobile: formData.phone,
            phone: formData.phone,
            date: formData.date,
            speciality: formData.speciality,
            notes: `Speciality: ${formData.speciality} | Preferred Date: ${formData.date} | Branch: ${formData.location}`,
        };

        try {
            // 1. Dynamic email API
            await axios.post(`${CONFIG.API_BASE_URL}/send-email/dynamic-form`, payload).catch((err) => {
                console.warn("Dynamic form email warning:", err);
            });

            // 2. International email endpoint
            await fetch(`${CONFIG.API_BASE_URL}/send-email/international-patients`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    mobile: formData.phone,
                    country: "International Patient",
                    speciality: formData.speciality,
                    message: `Appointment requested for ${formData.date || "soonest"} at ${formData.location}.`,
                }),
            }).catch((err) => console.warn("International email warning:", err));

            // 3. Lead service integration
            submitMyKareLead({
                name: formData.name,
                phoneNumber: formData.phone,
                countryCode: "+",
                notes: `Speciality: ${formData.speciality} | Date: ${formData.date} | Branch: ${formData.location}`,
                email: "",
                country: "International",
                speciality: formData.speciality,
            });

            toast.success("Thank you! Your appointment request has been received. Our team will contact you shortly.");
            onClose();
            router.push("/thank-you/");
        } catch (error) {
            console.error("Error submitting appointment:", error);
            toast.error("Failed to submit request. Please try calling our 24/7 international helpline.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-[99999] px-4 font-inter">
                    {/* Dark Blurred Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
                        aria-hidden="true"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[92vh] z-10"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="ip-modal-title"
                    >
                        {/* Branded Header */}
                        <div className="bg-gradient-to-r from-[#BD2850] to-[#8C1436] py-5 px-6 sm:px-8 text-white text-center relative shadow-md">
                            <h2 id="ip-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight">
                                Book an Appointment
                            </h2>
                            <p className="text-pink-100/80 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mt-1">
                                TX Hospitals • International Patient Services
                            </p>

                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Close appointment popup"
                                className="absolute top-4 right-4 sm:top-5 sm:right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-all cursor-pointer"
                            >
                                <IoClose size={22} />
                            </button>
                        </div>

                        {/* Modal Body / Form */}
                        <div className="p-6 sm:p-8 overflow-y-auto">
                            <p className="text-xs sm:text-sm text-gray-600 mb-5 text-center">
                                Connect with our international healthcare coordinators for priority consultation and treatment planning.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Patient Name */}
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                                        <User className="w-3.5 h-3.5 text-[#BD2850]" />
                                        <span>Patient Name <span className="text-red-500">*</span></span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-gray-900 font-medium focus:bg-white focus:border-[#BD2850] focus:ring-2 focus:ring-pink-500/20 outline-none transition-all text-sm"
                                    />
                                </div>

                                {/* Phone / WhatsApp */}
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                                        <Phone className="w-3.5 h-3.5 text-[#BD2850]" />
                                        <span>Phone / WhatsApp Number <span className="text-red-500">*</span></span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="e.g. +91 9144514459 or Mobile Number"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-gray-900 font-medium focus:bg-white focus:border-[#BD2850] focus:ring-2 focus:ring-pink-500/20 outline-none transition-all text-sm"
                                    />
                                </div>

                                {/* Grid: Date and Branch */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Date */}
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5 text-[#BD2850]" />
                                            <span>Preferred Date</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            min={getTomorrowDateString()}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-gray-900 font-medium focus:bg-white focus:border-[#BD2850] focus:ring-2 focus:ring-pink-500/20 outline-none transition-all text-sm cursor-pointer"
                                        />
                                    </div>

                                    {/* Hospital Center / Location */}
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5 text-[#BD2850]" />
                                            <span>Hospital Branch</span>
                                        </label>
                                        <select
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-3 text-gray-900 font-medium focus:bg-white focus:border-[#BD2850] focus:ring-2 focus:ring-pink-500/20 outline-none transition-all text-sm cursor-pointer"
                                        >
                                            {LOCATIONS.map((loc) => (
                                                <option key={loc} value={loc}>
                                                    {loc}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Medical Specialty */}
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                                        <Stethoscope className="w-3.5 h-3.5 text-[#BD2850]" />
                                        <span>Medical Speciality</span>
                                    </label>
                                    <select
                                        name="speciality"
                                        value={formData.speciality}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-3 text-gray-900 font-medium focus:bg-white focus:border-[#BD2850] focus:ring-2 focus:ring-pink-500/20 outline-none transition-all text-sm cursor-pointer"
                                    >
                                        {SPECIALTIES.map((spec) => (
                                            <option key={spec} value={spec}>
                                                {spec}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full bg-gradient-to-r from-[#BD2850] to-[#8C1436] hover:from-[#a52144] hover:to-[#78102e] text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-pink-900/20 transition-all active:scale-[0.98] text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer ${
                                            loading ? "opacity-75 cursor-not-allowed" : ""
                                        }`}
                                    >
                                        {loading ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                                <span>Scheduling Consultation...</span>
                                            </>
                                        ) : (
                                            <span>Book Appointment</span>
                                        )}
                                    </button>
                                </div>

                                {/* Dismiss text link */}
                                <div className="text-center pt-1">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="text-xs text-gray-500 hover:text-gray-800 underline transition-colors cursor-pointer"
                                    >
                                        I&apos;ll explore services first
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
