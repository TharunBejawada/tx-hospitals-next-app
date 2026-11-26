import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import CONFIG from "@/config";
import sanitize from "@/utils/sanitize";
import { submitMyKareLead } from "@/utils/leadService";
import BookAppointmentForm from "@/components/Blogs/BookAppointemntForm";

const THANK_YOU_MAP = {
    uppal: "/thank-you-uppal",
    kachiguda: "/thank-you-kachiguda",
    "banjara hills": "/thank-you-banjara-hills",
    "banjara-hills": "/thank-you-banjara-hills",
    miyapur: "/thank-you-miyapur",
};

function getThankYouRoute(location) {
    if (!location) return "/thank-you";
    const key = String(location).trim().toLowerCase();
    return THANK_YOU_MAP[key] || "/thank-you";
}

function renderHighlightedTitle(title, location) {
    if (!title) return null;
    if (!location) return title;

    const escapedLoc = location.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`((?:in\\s+)?${escapedLoc})`, "i");
    const match = title.match(regex);
    if (!match || match.index === undefined) return title;

    const before = title.slice(0, match.index);
    const highlighted = match[0];
    const after = title.slice(match.index + highlighted.length);

    return (
        <>
            {before}
            <span className="text-[#A8204B]">{highlighted}</span>
            {after}
        </>
    );
}

export default function BranchSOHero({ hero = {}, location = "", seoTitle = "" }) {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        message: "",
    });
    const [errors, setErrors] = useState({});

    const thankYouUrl = getThankYouRoute(location);
    const branchLabel = location ? `TX Hospitals ${location}` : "TX Hospitals";
    const highlights = Array.isArray(hero.highlights)
        ? hero.highlights.filter((h) => h && (h.title?.trim() || h.subtitle?.trim()))
        : [];

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "phone") {
            const numericValue = value.replace(/\D/g, "").slice(0, 10);
            setFormData((prev) => ({ ...prev, phone: numericValue }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
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
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            toast.error("Please check the highlighted form fields");
            return;
        }

        setLoading(true);
        const pageName = document.title || seoTitle || hero.mainTitle || branchLabel;
        try {
            const payload = {
                to: "crm.txhospitals@gmail.com, venudas@txhospitals.in",
                cc: "info.txhospitals@gmail.com",
                subject: `New Second Opinion Inquiry - ${branchLabel}`,
                html: `
                    <h3>New Second Opinion Inquiry (${branchLabel})</h3>
                    <p><strong>Name:</strong> ${formData.name.trim()}</p>
                    <p><strong>Mobile:</strong> ${formData.phone}</p>
                    <p><strong>Message:</strong> ${formData.message.trim() || "Not Specified"}</p>
                    <p><strong>Location:</strong> ${branchLabel}</p>
                    <p><strong>Page:</strong> ${pageName}</p>
                `,
                page: pageName,
                location: branchLabel,
                name: formData.name.trim(),
                mobile: formData.phone,
                concern: formData.message.trim() || "Second Opinion Inquiry",
            };

            await axios.post(`${CONFIG.API_BASE_URL}/send-email/dynamic-form`, payload);
            submitMyKareLead(payload);
            toast.success("Second opinion request submitted successfully!");
            setFormData({ name: "", phone: "", message: "" });
            router.push(thankYouUrl);
        } catch (err) {
            console.error("Error submitting SO hero form:", err);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="w-full bg-[#FAF1F4] py-10 md:py-16 px-4 sm:px-6 lg:px-8 font-inter">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-12">
                    {/* Left Content Column */}
                    <div className="w-full lg:w-7/12">
                        {hero.mainTitle && (
                            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] leading-tight mb-3">
                                {renderHighlightedTitle(hero.mainTitle, location)}
                            </h1>
                        )}

                        {hero.subTitle && (
                            <h2 className="text-lg sm:text-xl font-semibold text-[#7E1F3F] mb-4">
                                {hero.subTitle}
                            </h2>
                        )}

                        {hero.description && (
                            <div
                                className="text-gray-600 text-base md:text-[17px] leading-relaxed mb-7 [&_p]:mb-2 [&_strong]:text-gray-800 [&_a]:text-[#A8204B] [&_a]:underline"
                                dangerouslySetInnerHTML={{ __html: sanitize(hero.description) }}
                            />
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-4">
                            <button
                                type="button"
                                onClick={() => setShowModal(true)}
                                className="bg-[#A8204B] hover:bg-[#8E193E] text-white font-semibold px-7 py-3 rounded-full shadow-sm transition cursor-pointer text-sm sm:text-base"
                            >
                                Book appointment
                            </button>

                            <a
                                href="tel:+919144514459"
                                className="border border-[#A8204B]/40 bg-white/90 hover:bg-white text-[#A8204B] font-semibold px-7 py-3 rounded-full transition inline-flex items-center justify-center text-sm sm:text-base"
                            >
                                Talk to our experts
                            </a>
                        </div>

                        {/* Three Highlight Tabs */}
                        {highlights.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                                {highlights.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white rounded-xl border border-gray-200/80 px-4 py-3.5 shadow-sm"
                                    >
                                        {item.title && (
                                            <div className="font-bold text-gray-900 text-sm">
                                                {item.title}
                                            </div>
                                        )}
                                        {item.subtitle && (
                                            <div className="text-gray-500 text-xs mt-1">
                                                {item.subtitle}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Appointment Card */}
                    <div className="w-full lg:w-5/12">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 border-t-4 border-t-[#A8204B] p-6 sm:p-7">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                                Book appointment
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 mb-5">
                                Our team will call you back to confirm your consultation.
                            </p>

                            <form onSubmit={handleSubmit} noValidate className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-800 mb-1">
                                        Full name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#A8204B]/30 focus:border-[#A8204B] ${
                                            errors.name ? "border-red-500" : "border-gray-200"
                                        }`}
                                    />
                                    {errors.name && (
                                        <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-800 mb-1">
                                        Mobile number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="98765 43210"
                                        maxLength={10}
                                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#A8204B]/30 focus:border-[#A8204B] ${
                                            errors.phone ? "border-red-500" : "border-gray-200"
                                        }`}
                                    />
                                    {errors.phone && (
                                        <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-800 mb-1">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        rows={3}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Briefly describe your symptoms"
                                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#A8204B]/30 focus:border-[#A8204B] resize-y"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#A8204B] hover:bg-[#8E193E] text-white font-semibold py-3 rounded-full transition cursor-pointer disabled:opacity-60 text-sm sm:text-base"
                                >
                                    {loading ? "Submitting..." : "Get second opinion"}
                                </button>
                            </form>

                            <p className="text-center text-xs sm:text-sm text-gray-500 mt-4">
                                Or call{" "}
                                <a
                                    href="tel:+919144514459"
                                    className="text-[#A8204B] font-semibold hover:underline"
                                >
                                    91445 14459
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <BookAppointmentForm
                showModal={showModal}
                setShowModal={setShowModal}
                redirectUrl={thankYouUrl}
                defaultLocation={branchLabel}
            />
        </>
    );
}
