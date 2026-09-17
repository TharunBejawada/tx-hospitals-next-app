import React, { useState } from 'react';
import { submitMyKareLead } from '@/utils/leadService';

import axios from 'axios';
import { useRouter } from 'next/router';
import CONFIG from '@/config';

const HerniaForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            const val = value.replace(/\D/g, '');
            if (val.length <= 10) {
                setFormData({ ...formData, [name]: val });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.phone.length !== 10) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                to: "txhospitaluppal@gmail.com",
                cc: ["vinayaksharma9491@gmail.com"],
                subject: `New Hernia Surgery Inquiry - Uppal - ${formData.name}`,
                form_data: {
                    "Patient Name": formData.name,
                    "Mobile Number": formData.phone,
                    "Inquiry Type": "Hernia Surgery",
                    "Location": "Uppal Branch",
                    "Timestamp": new Date().toLocaleString()
                }
            };

            await axios.post(`${CONFIG.API_BASE_URL}/send-email/dynamic-form`, payload);
            // Dispatch to MyKare lead API
            submitMyKareLead(payload);
            router.push('/thank-you-uppal');
        } catch (error) {
            console.error("Submission error:", error);
            alert("Something went wrong. Please try again or call us directly.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-2xl w-full max-w-md font-inter text-gray-900">
            <h3 className="text-xl md:text-2xl font-extrabold mb-2 text-gray-900 leading-tight">Consult a Hernia Specialist</h3>
            <p className="text-gray-500 text-xs md:text-sm font-medium mb-8 leading-relaxed">
                Get a call back from our hernia surgeon within 30 minutes.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-xs md:text-sm font-extrabold text-gray-900 mb-2">Your Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-[#be185d] focus:border-transparent transition-all"
                    />
                </div>

                <div>
                    <label className="block text-xs md:text-sm font-extrabold text-gray-900 mb-2">Mobile Number *</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">+91</span>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="XXXXX XXXXX"
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-[#be185d] focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#be185d] hover:bg-[#a2144e] text-white font-extrabold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-sm md:text-base mt-2 disabled:opacity-70 group"
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        <>
                            Get Second Opinion
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </>
                    )}
                </button>

                <div className="flex items-center justify-center gap-2 pt-2 grayscale opacity-60">
                    <span className="text-[10px] md:text-xs font-bold text-gray-500 flex items-center gap-1.5">
                        NABH Certified
                    </span>
                </div>
            </form>
        </div>
    );
};

export default HerniaForm;
