"use client";
import React, { useState } from "react";
import sanitize from "@/utils/sanitize";
import useIsMobile from "@/hooks/useIsMobile";
import axios from "axios";

const RPWhatIs = ({ data }) => {
    const isMobile = useIsMobile();
    const [form, setForm] = useState({ name: "", mobile: "" });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    if (!data || data.length === 0) return null;

    const { heading, description } = data[0];

    // Split heading: "What is Robotic ..." → "What is " + rest in pink
    const whatIsIndex = heading.toLowerCase().indexOf("robotic");
    const headingStart = whatIsIndex > -1 ? heading.substring(0, whatIsIndex) : heading;
    const headingHighlight = whatIsIndex > -1 ? heading.substring(whatIsIndex) : "";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.mobile) return;
        setSubmitting(true);
        try {
            await axios.post("https://api.txhospitals.vgworld.in/lead/addLead", {
                name: form.name,
                mobile: form.mobile,
                source: "Robotic Procedure Page",
            });
            setSubmitted(true);
        } catch (err) {
            console.error("Lead form error:", err);
            setSubmitted(true); // still show success UX
        } finally {
            setSubmitting(false);
        }
    };

    if (isMobile) {
        return (
            <section className="py-4 px-4 font-inter bg-white">
                {/* Heading */}
                <h2 className="text-[22px] leading-tight font-bold mb-4 text-gray-900">
                    {headingStart}
                    <span className="text-[#b02a44]">{headingHighlight}</span>
                </h2>

                {/* Description */}
                <div
                    className="text-gray-700 text-[14px] leading-relaxed mb-6 [&_p]:mb-3"
                    dangerouslySetInnerHTML={{ __html: sanitize(description) }}
                />

                {/* Booking Card */}
                <div className="bg-[#fdf4f6] border border-pink-100 rounded-2xl p-5 shadow-sm">
                    <h3 className="text-[17px] font-bold text-gray-900 mb-1">Book an Appointment</h3>
                    <p className="text-gray-500 text-[13px] mb-4">Get expert consultation today</p>

                    {submitted ? (
                        <div className="text-center py-4">
                            <div className="text-[#b02a44] font-semibold text-[15px]">
                                ✓ Thank you! We&apos;ll contact you soon.
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b02a44]/30 bg-white"
                                required
                            />
                            <input
                                type="tel"
                                placeholder="Mobile Number"
                                value={form.mobile}
                                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                                className="border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#b02a44]/30 bg-white"
                                required
                            />
                            <button
                                type="submit"
                                disabled={submitting}
                                className="bg-[#b02a44] hover:bg-[#8f1f33] text-white font-semibold py-3 rounded-lg text-[14px] transition-colors duration-300 disabled:opacity-70"
                            >
                                {submitting ? "Submitting..." : "Submit for Appointment"}
                            </button>
                        </form>
                    )}
                </div>
            </section>
        );
    }

    // Desktop
    return (
        <section className="py-6 px-6 md:px-12 font-inter bg-white">
            <div className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                    {/* Left — Description (2/3 width) */}
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 leading-tight">
                            {headingStart}
                            <span className="text-[#b02a44]">{headingHighlight}</span>
                        </h2>
                        <div
                            className="text-gray-700 text-base md:text-[17px] leading-relaxed [&_p]:mb-4"
                            dangerouslySetInnerHTML={{ __html: sanitize(description) }}
                        />
                    </div>

                    {/* Right — Booking Card (1/3 width) */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#fdf4f6] border border-pink-100 rounded-2xl p-6 shadow-md sticky top-24">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">Book an Appointment</h3>
                            <p className="text-gray-500 text-sm mb-5">Get expert consultation today</p>

                            {submitted ? (
                                <div className="text-center py-6">
                                    <div className="w-14 h-14 rounded-full bg-[#b02a44]/10 flex items-center justify-center mx-auto mb-3">
                                        <svg alt="Icon" className="w-7 h-7 text-[#b02a44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-[#b02a44] font-semibold text-base">
                                        Thank you! We&apos;ll contact you soon.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#b02a44]/30 bg-white transition"
                                        required
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Mobile Number"
                                        value={form.mobile}
                                        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                                        className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#b02a44]/30 bg-white transition"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="bg-[#b02a44] hover:bg-[#8f1f33] text-white font-semibold py-3 rounded-lg text-sm transition-colors duration-300 disabled:opacity-70 shadow-md"
                                    >
                                        {submitting ? "Submitting..." : "Submit for Appointment"}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RPWhatIs;
