import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import CONFIG from "@/config";
import { sendOtp, verifyOtp } from "@/utils/otpUtils";
import { submitMyKareLead } from "@/utils/leadService";

export default function DiagnosticHero({ hero = {}, diagnosticName = "", seoTitle = "" }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        otp: "",
    });
    const [errors, setErrors] = useState({});
    const [generatedOtp, setGeneratedOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [sendingOtp, setSendingOtp] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const lastSentMobileRef = useRef("");

    const triggerOtp = async (mobile) => {
        if (!/^[6-9]\d{9}$/.test(mobile)) return;
        setSendingOtp(true);
        lastSentMobileRef.current = mobile;
        try {
            await sendOtp({
                mobileNumber: mobile,
                setGeneratedOtp,
                onSuccess: () => {
                    setOtpSent(true);
                },
            });
        } finally {
            setSendingOtp(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "phone") {
            const numeric = value.replace(/\D/g, "").slice(0, 10);
            setFormData((prev) => ({ ...prev, phone: numeric }));
            if (errors.phone) {
                setErrors((prev) => ({ ...prev, phone: "" }));
            }
            if (numeric.length < 10) {
                setOtpSent(false);
                setGeneratedOtp("");
                lastSentMobileRef.current = "";
            } else if (/^[6-9]\d{9}$/.test(numeric) && lastSentMobileRef.current !== numeric) {
                triggerOtp(numeric);
            }
            return;
        }

        if (name === "otp") {
            const numericOtp = value.replace(/\D/g, "").slice(0, 6);
            setFormData((prev) => ({ ...prev, otp: numericOtp }));
            if (errors.otp) {
                setErrors((prev) => ({ ...prev, otp: "" }));
            }
            return;
        }

        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validate = () => {
        const nextErrors = {};
        if (!formData.name.trim()) {
            nextErrors.name = "Please enter your full name";
        }
        if (!/^[6-9]\d{9}$/.test(formData.phone)) {
            nextErrors.phone = "Please enter a valid 10-digit mobile number";
        }
        if (!formData.otp.trim()) {
            nextErrors.otp = "Please enter the OTP";
        } else if (!generatedOtp) {
            nextErrors.otp = "Please trigger OTP for your mobile number first";
        } else if (formData.otp.trim() !== generatedOtp) {
            nextErrors.otp = "Invalid OTP. Please check and try again";
        }
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            toast.error("Please check the highlighted form fields");
            return;
        }

        const isOtpValid = verifyOtp({
            enteredOtp: formData.otp.trim(),
            generatedOtp,
        });
        if (!isOtpValid) {
            setErrors((prev) => ({ ...prev, otp: "Invalid OTP. Please try again" }));
            return;
        }

        setSubmitting(true);
        const pageName =
            (typeof document !== "undefined" && document.title) ||
            seoTitle ||
            diagnosticName ||
            hero.title ||
            "TX Hospitals Diagnostics";

        try {
            const payload = {
                to: "crm.txhospitals@gmail.com, venudas@txhospitals.in",
                cc: "info.txhospitals@gmail.com",
                subject: `New Diagnostic Appointment Inquiry - ${diagnosticName || hero.title || "TX Hospitals"}`,
                html: `
                    <h3>New Diagnostic Appointment Inquiry</h3>
                    <p><strong>Diagnostic:</strong> ${diagnosticName || hero.title || "N/A"}</p>
                    <p><strong>Name:</strong> ${formData.name.trim()}</p>
                    <p><strong>Mobile:</strong> ${formData.phone}</p>
                    <p><strong>OTP Verified:</strong> Yes</p>
                    <p><strong>Page:</strong> ${pageName}</p>
                `,
                page: pageName,
                location: "Hyderabad",
                name: formData.name.trim(),
                mobile: formData.phone,
                concern: diagnosticName || hero.title || "Diagnostic Appointment",
            };

            await axios.post(`${CONFIG.API_BASE_URL}/send-email/dynamic-form`, payload);
            submitMyKareLead(payload);
            toast.success("Appointment request submitted successfully!");
            setFormData({ name: "", phone: "", otp: "" });
            setGeneratedOtp("");
            setOtpSent(false);
            lastSentMobileRef.current = "";
            router.push("/thank-you/");
        } catch (err) {
            console.error("Error submitting diagnostic hero form:", err);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="relative w-full min-h-[420px] md:min-h-[460px] flex items-center overflow-hidden font-inter bg-[#9E164B]">
            {hero.backgroundImage && (
                <img
                    src={hero.backgroundImage}
                    alt={hero.title || diagnosticName || "Diagnostic Banner"}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
            )}

            {/* Deep crimson/magenta translucent overlay matching design */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#b52059]/90 via-[#ae1a52]/82 to-[#9c1347]/78" />

            <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 py-12 md:py-16 flex flex-col lg:flex-row items-center justify-between gap-10">
                {/* Left Content */}
                <div className="w-full lg:w-7/12 text-white">
                    {hero.title && (
                        <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold leading-tight mb-4">
                            {hero.title}
                        </h1>
                    )}
                    {hero.description && (
                        <p className="text-base sm:text-lg lg:text-xl text-white/95 font-normal leading-relaxed max-w-2xl whitespace-pre-line">
                            {hero.description}
                        </p>
                    )}
                </div>

                {/* Right Appointment Card */}
                <div className="w-full max-w-[400px] lg:w-[390px] bg-[#f4e8ed] rounded-xl shadow-2xl p-6 sm:p-7">
                    <h2 className="text-[24px] sm:text-[26px] font-medium text-[#b5275d] leading-snug mb-1">
                        Book an Appointment
                    </h2>
                    <p className="text-sm font-bold text-gray-900 mb-5">
                        Get expert consultation today
                    </p>

                    <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Full Name"
                                className={`w-full bg-white border ${
                                    errors.name ? "border-red-500" : "border-gray-300"
                                } rounded-md px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b5275d]`}
                            />
                            {errors.name && (
                                <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <div className="relative">
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Mobile Number"
                                    inputMode="numeric"
                                    maxLength={10}
                                    className={`w-full bg-white border ${
                                        errors.phone ? "border-red-500" : "border-gray-300"
                                    } rounded-md px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b5275d]`}
                                />
                                {/^[6-9]\d{9}$/.test(formData.phone) && (
                                    <button
                                        type="button"
                                        onClick={() => triggerOtp(formData.phone)}
                                        disabled={sendingOtp}
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#b5275d] hover:underline cursor-pointer disabled:opacity-50"
                                    >
                                        {sendingOtp ? "Sending..." : otpSent ? "Resend OTP" : "Send OTP"}
                                    </button>
                                )}
                            </div>
                            {errors.phone && (
                                <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                            )}
                            {otpSent && !errors.phone && (
                                <p className="text-[11px] text-emerald-700 font-medium mt-1">
                                    OTP sent to +91 {formData.phone}
                                </p>
                            )}
                        </div>

                        <div>
                            <input
                                type="text"
                                name="otp"
                                value={formData.otp}
                                onChange={handleChange}
                                placeholder="OTP"
                                inputMode="numeric"
                                maxLength={6}
                                className={`w-full bg-white border ${
                                    errors.otp ? "border-red-500" : "border-gray-300"
                                } rounded-md px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b5275d]`}
                            />
                            {errors.otp && (
                                <p className="text-xs text-red-600 mt-1">{errors.otp}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-[#b5275d] hover:bg-[#991e4d] text-white font-semibold py-2.5 rounded-md transition text-sm cursor-pointer disabled:opacity-60 mt-1"
                        >
                            {submitting ? "Submitting..." : "Submit for Appointment"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
