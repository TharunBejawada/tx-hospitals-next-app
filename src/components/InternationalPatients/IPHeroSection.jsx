import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import {
    Globe,
    Check,
    ChevronLeft,
    ChevronRight,
    RotateCw,
    MapPin,
    UploadCloud,
    FileText,
    X,
    Loader2,
} from "lucide-react";
import { toast } from "react-toastify";
import CONFIG from "@/config";
import { submitMyKareLead } from "@/utils/leadService";
import FormDropdown from "./FormDropdown";

const BRANCHES = [
    {
        name: "TX Hospitals, Banjara Hills",
        tagline: "Flagship Multispecialty & Transplant Center",
        image: "/assets/banjara-hills/Banjara-Hills.png",
        alt: "TX Hospitals Banjara Hills Branch",
    },
    {
        name: "TX Hospitals, Uppal",
        tagline: "Multispecialty & 24/7 Emergency Care",
        image: "/assets/Uppal/Uppal.png",
        alt: "TX Hospitals Uppal Branch",
    },
    {
        name: "TX Hospitals, Kachiguda",
        tagline: "Advanced Surgical & Medical Care",
        image: "/assets/Kachiguda/Kachiguda.png",
        alt: "TX Hospitals Kachiguda Branch",
    },
    {
        name: "TX Hospitals, Miyapur",
        tagline: "Robotic Surgery & Multispecialty Hub",
        image: "/assets/Miyapur/Miyapur.png",
        alt: "TX Hospitals Miyapur Branch",
    },
];

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

export default function IPHeroSection() {
    const router = useRouter();

    // Carousel state
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);
    const autoPlayRef = useRef(null);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % BRANCHES.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + BRANCHES.length) % BRANCHES.length);
    }, []);

    useEffect(() => {
        if (isHoveringCarousel) return;
        autoPlayRef.current = setInterval(nextSlide, 4500);
        return () => {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        };
    }, [isHoveringCarousel, nextSlide]);

    // Form state
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

    const refreshCaptcha = () => {
        setCaptchaCode(generateCaptchaCode());
        setFormData((prev) => ({ ...prev, captchaInput: "" }));
    };

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

    // Upload medical reports to /upload S3 endpoint
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

        // 2. Client-side Captcha Validation
        if (formData.captchaInput.trim().toUpperCase() !== captchaCode.toUpperCase()) {
            toast.error("Incorrect verification code. Please check and try again.");
            refreshCaptcha();
            return;
        }

        // Wait if files are still actively uploading
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
            // Call the same API endpoint for submission
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
            // Navigate to thank you page after successful submission
            router.push("/thank-you/");
        } catch (error) {
            console.error("Form submission error:", error);
            toast.error("Failed to submit enquiry. Please try again or call our helpline.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="font-sans antialiased text-[#1F1A1C]">
            {/* HERO SECTION */}
            <section
                id="top"
                className="relative overflow-hidden text-white"
                style={{
                    background: "rgb(189, 40, 80)",
                    padding: "48px 24px 150px",
                }}
            >
                <div
                    className="mx-auto grid items-center gap-10"
                    style={{
                        maxWidth: "1240px",
                        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
                    }}
                >
                    {/* Left Column: Text & CTAs */}
                    <div className="flex flex-col gap-4">
                        <span
                            className="self-start inline-flex items-center gap-2 text-xs font-bold tracking-[0.08em] uppercase rounded-full text-white"
                            style={{
                                padding: "6px 14px",
                                background: "rgba(255, 255, 255, 0.16)",
                            }}
                        >
                            <Globe size={14} className="shrink-0" />
                            International Patient Services
                        </span>

                        <h1
                            className="font-extrabold text-white"
                            style={{
                                margin: 0,
                                fontFamily: '"Plus Jakarta Sans", Inter, sans-serif',
                                fontSize: "clamp(1.9rem, 3.4vw, 2.75rem)",
                                lineHeight: 1.12,
                                letterSpacing: "-0.02em",
                            }}
                        >
                            World-Class Treatment in India Starts Here
                        </h1>

                        <p
                            className="text-base leading-relaxed"
                            style={{
                                margin: 0,
                                maxWidth: "520px",
                                color: "rgb(255, 243, 246)",
                            }}
                        >
                            We provide world-class medical care powered by advanced technology, globally trained
                            specialists and compassionate patient-centric services, all at affordable costs.
                        </p>

                        <div className="flex flex-wrap gap-x-5 gap-y-2.5 pt-1">
                            <span className="inline-flex items-center gap-2 text-sm font-medium text-[#FFF3F6]">
                                <svg
                                    aria-hidden="true"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#FFFFFF"
                                    strokeWidth="2.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M20 6 9 17l-5-5"></path>
                                </svg>
                                Online Consultations
                            </span>
                            <span className="inline-flex items-center gap-2 text-sm font-medium text-[#FFF3F6]">
                                <svg
                                    aria-hidden="true"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#FFFFFF"
                                    strokeWidth="2.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M20 6 9 17l-5-5"></path>
                                </svg>
                                Visa Assistance
                            </span>
                            <span className="inline-flex items-center gap-2 text-sm font-medium text-[#FFF3F6]">
                                <svg
                                    aria-hidden="true"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#FFFFFF"
                                    strokeWidth="2.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M20 6 9 17l-5-5"></path>
                                </svg>
                                Airport Pickup
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-3 mt-1.5 pt-1">
                            <a
                                href="#enquiry"
                                className="inline-flex items-center justify-center font-bold text-sm md:text-base rounded-full shadow-md transition hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98]"
                                style={{
                                    minHeight: "46px",
                                    padding: "0 24px",
                                    background: "rgb(255, 255, 255)",
                                    color: "rgb(189, 40, 80)",
                                    textDecoration: "none",
                                }}
                            >
                                Plan Your Medical Journey
                            </a>
                            <a
                                href="tel:+919144514459"
                                className="inline-flex items-center justify-center gap-2 font-semibold text-sm md:text-base rounded-full text-white transition hover:bg-white/10"
                                style={{
                                    minHeight: "46px",
                                    padding: "0 22px",
                                    border: "1.5px solid rgba(255, 255, 255, 0.7)",
                                    textDecoration: "none",
                                }}
                            >
                                +919144514459
                            </a>
                        </div>
                    </div>

                    {/* Right Column: 4-Branches Hospital Images Carousel */}
                    <div className="relative">
                        <div
                            className="relative overflow-hidden rounded-[24px] shadow-2xl bg-black/20"
                            style={{
                                minHeight: "340px",
                                height: "370px",
                            }}
                            onMouseEnter={() => setIsHoveringCarousel(true)}
                            onMouseLeave={() => setIsHoveringCarousel(false)}
                            aria-label="TX Hospitals Hyderabad branches carousel"
                        >
                            {BRANCHES.map((branch, index) => {
                                const isActive = index === currentSlide;
                                return (
                                    <div
                                        key={branch.name}
                                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isActive ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
                                            }`}
                                    >
                                        <img
                                            src={branch.image}
                                            alt={branch.alt}
                                            className="w-full h-full object-cover"
                                            loading={index === 0 ? "eager" : "lazy"}
                                        />
                                        {/* Subtle gradient overlay to make caption & controls pop */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                                        {/* Branch Chip Overlay */}
                                        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-black/55 backdrop-blur-md text-white text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full border border-white/20 shadow-md">
                                            <MapPin size={13} className="text-[#BD2850] fill-[#BD2850]" />
                                            <span>{branch.name}</span>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Carousel Controls */}
                            <button
                                type="button"
                                onClick={prevSlide}
                                aria-label="Previous hospital branch"
                                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition border border-white/20 active:scale-95"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                type="button"
                                onClick={nextSlide}
                                aria-label="Next hospital branch"
                                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition border border-white/20 active:scale-95"
                            >
                                <ChevronRight size={20} />
                            </button>

                            {/* Slide Dots */}
                            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10">
                                {BRANCHES.map((_, dotIdx) => (
                                    <button
                                        key={dotIdx}
                                        type="button"
                                        onClick={() => setCurrentSlide(dotIdx)}
                                        aria-label={`Go to slide ${dotIdx + 1}`}
                                        className={`h-2 rounded-full transition-all ${dotIdx === currentSlide
                                            ? "w-6 bg-white"
                                            : "w-2 bg-white/50 hover:bg-white/80"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Floating 5 Hospitals Across Hyderabad Badge */}
                        <div
                            style={{
                                position: "absolute",
                                left: "20px",
                                bottom: "-22px",
                                background: "rgb(255, 255, 255)",
                                color: "rgb(31, 26, 28)",
                                borderRadius: "14px",
                                padding: "10px 16px",
                                boxShadow: "rgba(60, 10, 25, 0.25) 0px 14px 30px",
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                zIndex: 25,
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: '"Plus Jakarta Sans", Inter, sans-serif',
                                    fontWeight: 800,
                                    fontSize: "26px",
                                    lineHeight: 1,
                                    color: "rgb(189, 40, 80)",
                                }}
                            >
                                4
                            </span>
                            <span
                                style={{
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    lineHeight: 1.3,
                                }}
                            >
                                Hospitals across
                                <br />
                                Hyderabad
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* OVERLAPPING ENQUIRY FORM SECTION ("TALK TO OUR EXPERTS") */}
            <section
                style={{
                    padding: "0px 24px 24px",
                }}
            >
                <div
                    id="enquiry"
                    style={{
                        position: "relative",
                        maxWidth: "1240px",
                        margin: "-100px auto 0px",
                        background: "rgb(255, 255, 255)",
                        color: "rgb(31, 26, 28)",
                        borderRadius: "20px",
                        padding: "clamp(18px, 2.4vw, 28px)",
                        boxShadow: "rgba(60, 10, 25, 0.14) 0px 20px 50px",
                        zIndex: 30,
                    }}
                >
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                        {/* Header Row */}
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "8px 20px",
                                paddingBottom: "12px",
                                borderBottom: "1px solid rgb(241, 232, 235)",
                            }}
                        >
                            <div>
                                <h2
                                    style={{
                                        margin: 0,
                                        fontFamily: '"Plus Jakarta Sans", Inter, sans-serif',
                                        fontSize: "20px",
                                        fontWeight: 700,
                                        lineHeight: 1.2,
                                        color: "rgb(31, 26, 28)",
                                    }}
                                >
                                    Talk to Our Experts
                                </h2>
                                <p
                                    style={{
                                        margin: "2px 0px 0px",
                                        fontSize: "13px",
                                        color: "rgb(91, 79, 83)",
                                    }}
                                >
                                    Our International Patient Desk is ready to assist you.
                                </p>
                            </div>
                            <span
                                style={{
                                    fontSize: "13px",
                                    color: "rgb(91, 79, 83)",
                                }}
                            >
                                Fields marked <span style={{ color: "rgb(189, 40, 80)", fontWeight: 700 }}>*</span> are required
                            </span>
                        </div>

                        {/* Form Fields Grid */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
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
                                            width: "64px",
                                            minHeight: "40px",
                                            padding: "0px 8px",
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
                                        htmlFor="tx-wa"
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
                                    id="tx-wa"
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

                            {/* 8. Upload Medical Reports (Integrated with /upload API) */}
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
                                            {uploadedFiles.length} report{uploadedFiles.length > 1 ? "s" : ""} uploaded
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

                                {/* List of uploaded files with checkmark and remove button */}
                                {uploadedFiles.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mt-1">
                                        {uploadedFiles.map((file, idx) => (
                                            <div
                                                key={idx}
                                                className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-[11.5px] font-medium px-2 py-0.5 rounded-md border border-emerald-200"
                                            >
                                                <Check size={12} className="text-emerald-600 shrink-0" />
                                                <span className="truncate max-w-[130px]" title={file.name}>
                                                    {file.name}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveFile(idx)}
                                                    className="text-emerald-700 hover:text-red-600 ml-0.5"
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
                                        className="p-2 text-gray-500 hover:text-[#BD2850] transition"
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
                                    fontSize: "15px",
                                    cursor: isSubmitting || isUploadingFile ? "not-allowed" : "pointer",
                                    opacity: isSubmitting || isUploadingFile ? 0.75 : 1,
                                    transition: "background 0.2s, transform 0.1s",
                                }}
                                className="hover:brightness-95 active:scale-[0.99] flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        <span>Submitting...</span>
                                    </>
                                ) : isUploadingFile ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        <span>Uploading Reports...</span>
                                    </>
                                ) : (
                                    "Submit Your Enquiry"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}

