import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
    IoClose,
} from "react-icons/io5";
import {
    RotateCw,
    Check,
    X,
    Loader2
} from "lucide-react";
import { toast } from "react-toastify";
import CONFIG from "@/config";
import { submitMyKareLead } from "@/utils/leadService";
import FormDropdown from "./FormDropdown";

const COUNTRY_DIAL_CODES = {
    "Bangladesh": "+880",
    "Nepal": "+977",
    "Sri Lanka": "+94",
    "Maldives": "+960",
    "Oman": "+968",
    "Iraq": "+964",
    "Nigeria": "+234",
    "Kenya": "+254",
    "Tanzania": "+255",
    "Uzbekistan": "+998",
    "UAE": "+971",
    "Yemen": "+967",
    "Sudan": "+249",
    "South Sudan": "+211",
    "Ethiopia": "+251",
    "Somalia": "+252",
    "USA": "+1",
    "UK": "+44",
    "India": "+91",
};

const COUNTRIES = [
    "Bangladesh",
    "Nepal",
    "Sri Lanka",
    "Maldives",
    "Oman",
    "Iraq",
    "Nigeria",
    "Kenya",
    "Tanzania",
    "Uzbekistan",
    "UAE",
    "Yemen",
    "Sudan",
    "South Sudan",
    "Ethiopia",
    "Somalia",
    "USA",
    "UK",
    "Other",
];

const SPECIALITIES = [
    "Transplant Surgery",
    "Robotic Surgery",
    "Cardiology",
    "Cardiothoracic and Vascular Surgery",
    "Neurology",
    "Gastroenterology",
    "Nephrology",
    "Urology",
    "Orthopaedics",
    "Pulmonology",
    "Mother & Child Care",
    "Oncology",
    "ENT",
    "Internal Medicine",
    "Other",
];

// Helper to generate a 5-character readable captcha
const generateCaptchaCode = () => {
    const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    let code = "";
    for (let i = 0; i < 5; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
};

export default function IPAutoAppointmentModal({ isOpen, onClose }) {
    const router = useRouter();

    const [formData, setFormData] = useState({
        country: "",
        speciality: "",
        name: "",
        email: "",
        passportNumber: "",
        countryCode: "+00",
        mobile: "",
        whatsapp: "",
        message: "",
        captchaInput: "",
    });

    const [sameAsMobile, setSameAsMobile] = useState(false);
    const [fileUrls, setFileUrls] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]); // [{ name, url }]
    const [isUploadingFile, setIsUploadingFile] = useState(false);
    const [captchaCode, setCaptchaCode] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        setCaptchaCode(generateCaptchaCode());
    }, []);

    // Refresh captcha and clear input
    const refreshCaptcha = () => {
        setCaptchaCode(generateCaptchaCode());
        setFormData((prev) => ({ ...prev, captchaInput: "" }));
    };

    // Keyboard Escape key handler
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            const updated = { ...prev, [name]: value };
            if (name === "mobile" && sameAsMobile) {
                updated.whatsapp = value;
            }
            return updated;
        });
    };

    const handleCountryChange = (e) => {
        const selected = e.target.value;
        const dial = COUNTRY_DIAL_CODES[selected] || "+";
        setFormData((prev) => ({
            ...prev,
            country: selected,
            countryCode: dial,
        }));
    };

    const handleSameAsMobileToggle = (e) => {
        const checked = e.target.checked;
        setSameAsMobile(checked);
        if (checked) {
            setFormData((prev) => ({ ...prev, whatsapp: prev.mobile }));
        }
    };

    // Upload medical reports to S3 via /upload endpoint
    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        setIsUploadingFile(true);
        const newUrls = [];
        const newMeta = [];

        try {
            for (const file of files) {
                const data = new FormData();
                data.append("file", file);

                const response = await axios.post(`${CONFIG.API_BASE_URL}/upload`, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (response.data?.fileUrl) {
                    newUrls.push(response.data.fileUrl);
                    newMeta.push({ name: file.name, url: response.data.fileUrl });
                }
            }

            if (newUrls.length > 0) {
                setFileUrls((prev) => [...prev, ...newUrls]);
                setUploadedFiles((prev) => [...prev, ...newMeta]);
                toast.success(
                    newUrls.length > 1
                        ? `${newUrls.length} medical reports uploaded successfully!`
                        : "Medical report uploaded successfully!"
                );
            }
        } catch (error) {
            console.error("File upload error:", error);
            toast.error("File upload failed. Please try again.");
        } finally {
            setIsUploadingFile(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleRemoveFile = (indexToRemove) => {
        setUploadedFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
        setFileUrls((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Validate Dropdowns
        if (!formData.country) {
            toast.error("Please select your country.");
            return;
        }

        if (!formData.speciality) {
            toast.error("Please select a medical speciality.");
            return;
        }

        // 2. Validate Full Name
        if (!formData.name.trim()) {
            toast.error("Please enter your full name.");
            return;
        }

        // 3. Validate Email
        if (!formData.email.trim()) {
            toast.error("Please enter your email address.");
            return;
        }

        // 4. Validate Mobile
        if (!formData.mobile.trim()) {
            toast.error("Please enter your mobile number.");
            return;
        }

        // 5. Client-side Captcha Validation
        if (formData.captchaInput.trim().toUpperCase() !== captchaCode.toUpperCase()) {
            toast.error("Incorrect verification code. Please check and try again.");
            refreshCaptcha();
            return;
        }

        // Wait if files are actively uploading
        if (isUploadingFile) {
            toast.info("Please wait while your reports finish uploading...");
            return;
        }

        setIsSubmitting(true);

        const fullPhone = `${formData.countryCode} ${formData.mobile}`.trim();
        const fullWhatsapp = formData.whatsapp ? `${formData.countryCode} ${formData.whatsapp}`.trim() : "";
        const reportsList = fileUrls.length > 0 ? fileUrls.join("\n") : "";

        const combinedMessage = [
            formData.speciality ? `Speciality: ${formData.speciality}` : "",
            formData.passportNumber ? `Passport: ${formData.passportNumber}` : "",
            fullWhatsapp ? `WhatsApp: ${fullWhatsapp}` : "",
            reportsList ? `Medical Reports URL: ${reportsList}` : "",
            formData.message ? `Health Concern / Query: ${formData.message}` : "",
        ]
            .filter(Boolean)
            .join("\n");

        const payload = {
            name: formData.name,
            email: formData.email,
            mobile: fullPhone,
            country: formData.country,
            message: combinedMessage,
            speciality: formData.speciality,
            passportNumber: formData.passportNumber,
            whatsapp: fullWhatsapp,
            fileUrl: fileUrls.length > 0 ? fileUrls.join(", ") : "",
            fileUrls: fileUrls,
            countryCode: formData.countryCode,
        };

        try {
            // Call API endpoint for international patient submission
            await fetch(`${CONFIG.API_BASE_URL}/send-email/international-patients`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }).catch((err) => console.warn("Internal email error:", err));

            // Submit to MyKare lead transfer
            await submitMyKareLead({
                name: formData.name,
                phoneNumber: fullPhone,
                countryCode: formData.countryCode,
                notes: combinedMessage,
                email: formData.email,
                country: formData.country,
                speciality: formData.speciality,
            });

            toast.success("Thank you! Our International Patient Desk will contact you shortly.");
            onClose();
            router.push("/thank-you/");
        } catch (error) {
            console.error("Form submission error:", error);
            toast.error("Failed to submit enquiry. Please try again or call our helpline.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-[99999] p-2 sm:p-4 md:p-6 font-inter">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/65 backdrop-blur-sm cursor-pointer"
                        aria-hidden="true"
                    />

                    {/* Modal Container: Full-width on desktop with two columns */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 280 }}
                        className="relative w-full max-w-[1240px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col lg:flex-row max-h-[92vh] z-10"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="ip-expert-title"
                    >
                        {/* Close Button at top-right */}
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close modal"
                            className="absolute top-4 right-4 z-50 text-gray-500 hover:text-white bg-gray-100 hover:bg-[#BD2850] p-2 rounded-full transition-all duration-200 shadow-md cursor-pointer"
                        >
                            <IoClose size={22} />
                        </button>

                        {/* LEFT COLUMN: DESKTOP PROPER IMAGE (Clean image, no text on image) */}
                        <div className="hidden lg:flex lg:w-[32%] xl:w-[30%] bg-gradient-to-br from-[#BD2850] via-[#8C1436] to-[#4A0A1C] relative overflow-hidden select-none items-end justify-center">
                            {/* Background Ambient Glows & Accents */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-900/30 rounded-full blur-2xl pointer-events-none" />

                            {/* Proper High Quality Doctor Image without any text on it */}
                            <div className="relative w-full h-full min-h-[580px]">
                                <Image
                                    src="/assets/Footer/Doctor Lady Image.png"
                                    alt="TX Hospitals Expert Medical Care"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 32vw"
                                    className="object-contain object-bottom drop-shadow-2xl"
                                    priority
                                />
                            </div>
                        </div>

                        {/* RIGHT COLUMN: THE EXACT FORM FROM THE SCREENSHOT */}
                        <div className="w-full lg:w-[68%] xl:w-[70%] p-5 sm:p-7 xl:p-8 overflow-y-auto flex flex-col justify-start">
                            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                                {/* Header Row */}
                                <div className="flex flex-wrap justify-between items-center gap-2 pb-3 border-b border-[#F1E8EB] pr-8 sm:pr-10">
                                    <div>
                                        <h2
                                            id="ip-expert-title"
                                            className="text-xl sm:text-2xl font-bold font-inter text-[#1F1A1C] tracking-tight"
                                        >
                                            Talk to Our Experts
                                        </h2>
                                        <p className="text-xs sm:text-[13px] text-[#5B4F53] mt-0.5">
                                            Our International Patient Desk is ready to assist you.
                                        </p>
                                    </div>
                                    <span className="text-xs sm:text-[13px] text-[#5B4F53]">
                                        Fields marked <span className="text-[#BD2850] font-bold">*</span> are required
                                    </span>
                                </div>

                                {/* Form Fields Grid (Matching screenshot layout) */}
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                                        gap: "12px 14px",
                                        alignItems: "end",
                                    }}
                                >
                                    {/* 1. Country (Reusable Dropdown) */}
                                    <FormDropdown
                                        label="Country"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleCountryChange}
                                        options={COUNTRIES}
                                        placeholder="Select your country"
                                        required
                                    />

                                    {/* 2. Medical Speciality (Reusable Dropdown) */}
                                    <FormDropdown
                                        label="Medical Speciality"
                                        name="speciality"
                                        value={formData.speciality}
                                        onChange={handleInputChange}
                                        options={SPECIALITIES}
                                        placeholder="Select speciality"
                                        required
                                    />

                                    {/* 3. Full Name */}
                                    <label
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "4px",
                                            fontSize: "12.5px",
                                            fontWeight: 600,
                                            color: "rgb(58, 49, 52)",
                                        }}
                                    >
                                        <span>
                                            Full Name <span style={{ color: "rgb(189, 40, 80)" }}>*</span>
                                        </span>
                                        <input
                                            type="text"
                                            required
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter your full name"
                                            style={{
                                                minHeight: "40px",
                                                padding: "0px 12px",
                                                border: "1px solid rgb(227, 214, 218)",
                                                borderRadius: "10px",
                                                background: "rgb(253, 251, 252)",
                                                color: "rgb(31, 26, 28)",
                                                fontSize: "13.5px",
                                                outline: "none",
                                            }}
                                        />
                                    </label>

                                    {/* 4. Email Address */}
                                    <label
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "4px",
                                            fontSize: "12.5px",
                                            fontWeight: 600,
                                            color: "rgb(58, 49, 52)",
                                        }}
                                    >
                                        <span>
                                            Email Address <span style={{ color: "rgb(189, 40, 80)" }}>*</span>
                                        </span>
                                        <input
                                            type="email"
                                            required
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Enter your email"
                                            style={{
                                                minHeight: "40px",
                                                padding: "0px 12px",
                                                border: "1px solid rgb(227, 214, 218)",
                                                borderRadius: "10px",
                                                background: "rgb(253, 251, 252)",
                                                color: "rgb(31, 26, 28)",
                                                fontSize: "13.5px",
                                                outline: "none",
                                            }}
                                        />
                                    </label>

                                    {/* 5. Passport Number */}
                                    <label
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "4px",
                                            fontSize: "12.5px",
                                            fontWeight: 600,
                                            color: "rgb(58, 49, 52)",
                                        }}
                                    >
                                        <span>Passport Number</span>
                                        <input
                                            type="text"
                                            name="passportNumber"
                                            value={formData.passportNumber}
                                            onChange={handleInputChange}
                                            placeholder="Enter your passport number"
                                            style={{
                                                minHeight: "40px",
                                                padding: "0px 12px",
                                                border: "1px solid rgb(227, 214, 218)",
                                                borderRadius: "10px",
                                                background: "rgb(253, 251, 252)",
                                                color: "rgb(31, 26, 28)",
                                                fontSize: "13.5px",
                                                outline: "none",
                                            }}
                                        />
                                    </label>

                                    {/* 6. Mobile Number */}
                                    <label
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "4px",
                                            fontSize: "12.5px",
                                            fontWeight: 600,
                                            color: "rgb(58, 49, 52)",
                                        }}
                                    >
                                        <span>
                                            Mobile Number <span style={{ color: "rgb(189, 40, 80)" }}>*</span>
                                        </span>
                                        <span style={{ display: "flex", gap: "6px" }}>
                                            <input
                                                type="text"
                                                aria-label="Country code"
                                                name="countryCode"
                                                value={formData.countryCode}
                                                onChange={handleInputChange}
                                                placeholder="+00"
                                                style={{
                                                    width: "60px",
                                                    minHeight: "40px",
                                                    padding: "0px 6px",
                                                    textAlign: "center",
                                                    border: "1px solid rgb(227, 214, 218)",
                                                    borderRadius: "10px",
                                                    background: "rgb(253, 251, 252)",
                                                    color: "rgb(31, 26, 28)",
                                                    fontSize: "13px",
                                                    fontWeight: 600,
                                                    outline: "none",
                                                }}
                                            />
                                            <input
                                                type="tel"
                                                required
                                                name="mobile"
                                                value={formData.mobile}
                                                onChange={handleInputChange}
                                                placeholder="Enter number"
                                                style={{
                                                    flex: "1 1 0%",
                                                    minWidth: 0,
                                                    minHeight: "40px",
                                                    padding: "0px 12px",
                                                    border: "1px solid rgb(227, 214, 218)",
                                                    borderRadius: "10px",
                                                    background: "rgb(253, 251, 252)",
                                                    color: "rgb(31, 26, 28)",
                                                    fontSize: "13.5px",
                                                    outline: "none",
                                                }}
                                            />
                                        </span>
                                    </label>

                                    {/* 7. WhatsApp Number */}
                                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                        <span
                                            style={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                gap: "6px",
                                            }}
                                        >
                                            <label
                                                htmlFor="tx-popup-wa"
                                                style={{
                                                    fontSize: "12.5px",
                                                    fontWeight: 600,
                                                    color: "rgb(58, 49, 52)",
                                                }}
                                            >
                                                WhatsApp Number
                                            </label>
                                            <label
                                                style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: "5px",
                                                    fontSize: "12px",
                                                    color: "rgb(91, 79, 83)",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={sameAsMobile}
                                                    onChange={handleSameAsMobileToggle}
                                                    style={{
                                                        width: "14px",
                                                        height: "14px",
                                                        accentColor: "rgb(189, 40, 80)",
                                                        cursor: "pointer",
                                                    }}
                                                />
                                                Same as mobile
                                            </label>
                                        </span>
                                        <input
                                            id="tx-popup-wa"
                                            type="tel"
                                            name="whatsapp"
                                            value={formData.whatsapp}
                                            onChange={handleInputChange}
                                            disabled={sameAsMobile}
                                            placeholder="WhatsApp number"
                                            style={{
                                                minHeight: "40px",
                                                padding: "0px 12px",
                                                border: "1px solid rgb(227, 214, 218)",
                                                borderRadius: "10px",
                                                background: sameAsMobile ? "rgb(243, 240, 241)" : "rgb(253, 251, 252)",
                                                color: "rgb(31, 26, 28)",
                                                fontSize: "13.5px",
                                                outline: "none",
                                            }}
                                        />
                                    </div>

                                    {/* 8. Upload Medical Reports */}
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "4px",
                                            fontSize: "12.5px",
                                            fontWeight: 600,
                                            color: "rgb(58, 49, 52)",
                                        }}
                                    >
                                        <span className="flex items-center justify-between">
                                            <span>Upload Medical Reports</span>
                                            {isUploadingFile && (
                                                <span className="flex items-center gap-1 text-[11px] font-semibold text-[#BD2850]">
                                                    <Loader2 size={12} className="animate-spin" />
                                                    Uploading...
                                                </span>
                                            )}
                                            {!isUploadingFile && uploadedFiles.length > 0 && (
                                                <span className="text-[11px] font-semibold text-emerald-600">
                                                    {uploadedFiles.length} uploaded
                                                </span>
                                            )}
                                        </span>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            multiple
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={handleFileUpload}
                                            disabled={isUploadingFile}
                                            style={{
                                                padding: "6px 10px",
                                                border: "1.5px dashed rgb(215, 179, 190)",
                                                borderRadius: "10px",
                                                background: isUploadingFile ? "rgb(243, 240, 241)" : "rgb(253, 247, 249)",
                                                fontSize: "12.5px",
                                                color: "rgb(91, 79, 83)",
                                                cursor: isUploadingFile ? "not-allowed" : "pointer",
                                            }}
                                        />

                                        {/* List of uploaded files */}
                                        {uploadedFiles.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mt-1">
                                                {uploadedFiles.map((file, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-[11px] font-medium px-2 py-0.5 rounded-md border border-emerald-200"
                                                    >
                                                        <Check size={12} className="text-emerald-600 shrink-0" />
                                                        <span className="truncate max-w-[120px]" title={file.name}>
                                                            {file.name}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveFile(idx)}
                                                            className="text-emerald-700 hover:text-red-600 ml-0.5 cursor-pointer"
                                                            title="Remove file"
                                                        >
                                                            <X size={12} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* 9. Message (Full Width) */}
                                    <label
                                        style={{
                                            gridColumn: "1 / -1",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "4px",
                                            fontSize: "12.5px",
                                            fontWeight: 600,
                                            color: "rgb(58, 49, 52)",
                                        }}
                                    >
                                        <span>Message</span>
                                        <textarea
                                            rows={2}
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            placeholder="Briefly describe your health concern"
                                            style={{
                                                padding: "10px 12px",
                                                border: "1px solid rgb(227, 214, 218)",
                                                borderRadius: "10px",
                                                background: "rgb(253, 251, 252)",
                                                resize: "vertical",
                                                fontSize: "13.5px",
                                                outline: "none",
                                            }}
                                        />
                                    </label>

                                    {/* 10. Verification Code (Captcha) */}
                                    <div style={{ display: "flex", alignItems: "end", gap: "8px" }}>
                                        <div className="flex items-center gap-1">
                                            <span
                                                aria-label={`Captcha code: ${captchaCode}`}
                                                style={{
                                                    minHeight: "40px",
                                                    padding: "0px 12px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    borderRadius: "10px",
                                                    background: "rgb(243, 236, 238)",
                                                    fontFamily: '"Courier New", monospace',
                                                    fontWeight: 700,
                                                    fontSize: "16px",
                                                    letterSpacing: "0.25em",
                                                    color: "rgb(91, 79, 83)",
                                                    userSelect: "none",
                                                }}
                                            >
                                                {captchaCode}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={refreshCaptcha}
                                                title="Generate new code"
                                                aria-label="Refresh verification code"
                                                className="p-2 text-gray-500 hover:text-[#BD2850] transition cursor-pointer"
                                            >
                                                <RotateCw size={15} />
                                            </button>
                                        </div>

                                        <label
                                            style={{
                                                flex: "1 1 0%",
                                                minWidth: 0,
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "4px",
                                                fontSize: "12.5px",
                                                fontWeight: 600,
                                                color: "rgb(58, 49, 52)",
                                            }}
                                        >
                                            <span>
                                                Verification Code <span style={{ color: "rgb(189, 40, 80)" }}>*</span>
                                            </span>
                                            <input
                                                type="text"
                                                required
                                                name="captchaInput"
                                                value={formData.captchaInput}
                                                onChange={handleInputChange}
                                                placeholder="Enter captcha"
                                                style={{
                                                    minHeight: "40px",
                                                    padding: "0px 12px",
                                                    border: "1px solid rgb(227, 214, 218)",
                                                    borderRadius: "10px",
                                                    background: "rgb(253, 251, 252)",
                                                    color: "rgb(31, 26, 28)",
                                                    fontSize: "13.5px",
                                                    outline: "none",
                                                }}
                                            />
                                        </label>
                                    </div>

                                    {/* 11. Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || isUploadingFile}
                                        style={{
                                            minHeight: "44px",
                                            border: 0,
                                            borderRadius: "10px",
                                            background: "rgb(189, 40, 80)",
                                            color: "rgb(255, 255, 255)",
                                            fontWeight: 700,
                                            fontSize: "14.5px",
                                            cursor: isSubmitting || isUploadingFile ? "not-allowed" : "pointer",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "8px",
                                            padding: "0 20px",
                                            boxShadow: "rgba(189, 40, 80, 0.25) 0px 8px 18px",
                                            transition: "background 0.2s, transform 0.1s",
                                        }}
                                        className="hover:opacity-95 active:scale-[0.98]"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                <span>Submitting...</span>
                                            </>
                                        ) : (
                                            <span>Talk to Our Experts</span>
                                        )}
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
