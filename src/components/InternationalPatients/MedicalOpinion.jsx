import React, { useEffect, useState } from "react";
import { countryFlags } from "@/utils/countryFlags";
import CONFIG from "@/config";
import { Video, Globe, Sparkles } from "lucide-react";

export const getCountryFromFlagName = (flagName) => {
    const upper = (flagName || "").trim().toUpperCase();
    if (upper === "BANGLADESH") return { country: "Bangladesh", dialCode: "+880" };
    if (upper === "NEPAL") return { country: "Nepal", dialCode: "+977" };
    if (upper === "SRI LANKA") return { country: "Sri Lanka", dialCode: "+94" };
    if (upper === "OMAN") return { country: "Oman", dialCode: "+968" };
    if (upper === "IRAQ") return { country: "Iraq", dialCode: "+964" };
    if (upper === "NIGERIA") return { country: "Nigeria", dialCode: "+234" };
    if (upper === "KENYA" || upper === "NAIROBI") return { country: "Kenya", dialCode: "+254" };
    if (upper === "UAE") return { country: "UAE", dialCode: "+971" };
    if (upper === "YEMEN") return { country: "Yemen", dialCode: "+967" };
    if (upper === "SUDAN") return { country: "Sudan", dialCode: "+249" };
    if (upper === "SOUTH SUDAN") return { country: "South Sudan", dialCode: "+211" };
    if (upper === "ETHIOPIA") return { country: "Ethiopia", dialCode: "+251" };
    if (upper === "SOMALIA") return { country: "Somalia", dialCode: "+252" };
    if (upper === "DJIBOUTI") return { country: "Djibouti", dialCode: "+253" };
    if (upper === "USA") return { country: "USA", dialCode: "+1" };
    return { country: "Other", dialCode: "+00" };
};

export default function MedicalOpinion({ onSelectCountry }) {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch(`${CONFIG.API_BASE_URL}/patient-testimonials`);
                const data = await response.json();
                if (data && Array.isArray(data.videos)) {
                    const formattedVideos = data.videos
                        .slice(0, 3)
                        .map((url) => {
                            try {
                                const videoId = new URL(url).pathname.split("/").pop();
                                return { id: videoId, title: "Patient Testimonial" };
                            } catch {
                                return null;
                            }
                        })
                        .filter(Boolean);
                    setVideos(formattedVideos);
                }
            } catch (error) {
                console.error("Error fetching patient testimonials:", error);
            }
        };

        fetchVideos();
    }, []);

    const handleFlagClick = (flag) => {
        const countryData = getCountryFromFlagName(flag.name);
        if (onSelectCountry) {
            onSelectCountry(countryData);
        }
    };

    return (
        <section id="medical-opinion" className="py-10 sm:py-14 md:py-16 bg-[#FAF7F8] border-t border-gray-100 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-100 text-[#BD2850] mb-2.5">
                        <Globe size={13} />
                        Global Patient Consultations
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F1A1C] tracking-tight">
                        Get Free Medical Opinion
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-gray-600">
                        Click on your country flag below to connect directly with our international specialists and receive a confidential diagnosis &amp; transparent cost estimate.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* LEFT COLUMN: 16 COUNTRY FLAGS GRID (Interactive Cards) */}
                    <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <span>Select Your Country</span>
                                    <Sparkles size={16} className="text-[#BD2850]" />
                                </h3>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    Tap any flag to instantly open consultation form with your dial code
                                </p>
                            </div>
                            <span className="hidden sm:inline-block text-[11px] font-semibold text-[#BD2850] bg-pink-50 px-2.5 py-1 rounded-full border border-pink-100">
                                16 Countries Supported
                            </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5">
                            {countryFlags.map((flag, idx) => {
                                const countryInfo = getCountryFromFlagName(flag.name);
                                return (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => handleFlagClick(flag)}
                                        aria-label={`Select ${countryInfo.country} (${countryInfo.dialCode}) for free medical opinion`}
                                        className="group relative bg-[#FDFBFC] hover:bg-white border border-gray-200 hover:border-[#BD2850] rounded-2xl p-3 sm:p-3.5 text-center transition-all duration-200 hover:shadow-lg hover:-translate-y-1 active:scale-95 cursor-pointer flex flex-col items-center justify-between min-h-[110px]"
                                    >
                                        {/* Flag Image */}
                                        <div className="h-10 sm:h-12 w-full flex items-center justify-center overflow-hidden mb-1.5">
                                            <img
                                                loading="lazy"
                                                src={flag.src}
                                                alt={flag.name}
                                                className="max-h-full max-w-[80px] object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
                                            />
                                        </div>

                                        {/* Country Name */}
                                        <div className="w-full">
                                            <p className="text-xs font-bold text-gray-800 group-hover:text-[#BD2850] transition-colors truncate">
                                                {flag.name}
                                            </p>
                                            <span className="text-[11px] font-medium text-gray-400 group-hover:text-[#BD2850] transition-colors">
                                                {countryInfo.dialCode}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: PATIENT TESTIMONIALS */}
                    <div className="lg:col-span-5 bg-gradient-to-br from-[#FFF5F7] to-[#FFEBEF] rounded-3xl p-5 sm:p-7 shadow-sm border border-pink-100 flex flex-col">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-full bg-[#BD2850] text-white flex items-center justify-center shrink-0">
                                <Video size={16} />
                            </div>
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                                    Patient Testimonials
                                </h3>
                                <p className="text-xs text-gray-600">
                                    Hear inspiring recovery stories from our international patients
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {videos.length > 0 ? (
                                videos.map((video, idx) => (
                                    <div
                                        key={idx}
                                        className="rounded-2xl overflow-hidden shadow-md bg-black aspect-video border border-pink-200"
                                    >
                                        <iframe
                                            title={video.title || `Patient Testimonial ${idx + 1}`}
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${video.id}`}
                                            frameBorder="0"
                                            allowFullScreen
                                            className="w-full h-full"
                                            loading="lazy"
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="rounded-2xl overflow-hidden shadow-md bg-black aspect-video border border-pink-200">
                                    <iframe
                                        title="Patient Testimonial"
                                        width="100%"
                                        height="100%"
                                        src="https://www.youtube.com/embed/videoseries?list=PLTxHospitals"
                                        frameBorder="0"
                                        allowFullScreen
                                        className="w-full h-full"
                                        loading="lazy"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
