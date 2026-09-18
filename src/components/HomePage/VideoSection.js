"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { useRouter } from "next/router";
import useIsMobile from "@/hooks/useIsMobile";

export default function VideoSection() {
    const [activeTab, setActiveTab] = useState("patient");
    const [patientVideos, setPatientVideos] = useState([]);
    const [doctorVideos, setDoctorVideos] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [current, setCurrent] = useState(0);
    const [hoveredIdx, setHoveredIdx] = useState(null);
    const router = useRouter();
    const isMobile = useIsMobile();

    // Fetch Patient Success Stories
    useEffect(() => {
        const fetchPatientVideos = async () => {
            try {
                const res = await fetch("https://api.txhospitals.vgworld.in/testimonials/getAll");
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    const allTestimonials = data[0]?.testimonials || [];
                    setPatientVideos(allTestimonials);
                }
            } catch (err) {
                console.error("Error fetching patient testimonials:", err);
            }
        };
        fetchPatientVideos();
    }, []);

    // Fetch Doctor Talks
    useEffect(() => {
        const fetchDoctorVideos = async () => {
            try {
                const res = await fetch("https://api.txhospitals.vgworld.in/doctortalks/getAll");
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    const allDoctorTalks = data[0]?.doctorTalks || [];
                    setDoctorVideos(allDoctorTalks);
                }
            } catch (err) {
                console.error("Error fetching doctor talks:", err);
            }
        };
        fetchDoctorVideos();
    }, []);

    // Function to extract YouTube video ID
    const getYouTubeId = (url) => {
        const regExp = /^.*(?:youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|shorts\/)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return match && match[1].length === 11 ? match[1] : null;
    };

    const openVideo = (videoId) => {
        setSelectedVideo(videoId);
        setTimeout(() => setModalVisible(true), 10);
    };

    const closeVideo = () => {
        setModalVisible(false);
        setTimeout(() => setSelectedVideo(null), 300);
    };

    const handleShowMore = () => {
        if (activeTab === "patient") {
            router.push("/patientTalks");
        } else {
            router.push("/doctorTalks");
        }
    };

    const videos = activeTab === "patient" ? patientVideos : doctorVideos;
    const isDoctor = activeTab === "doctor";

    const nextSlide = () => setCurrent((prev) => (prev + 1) % videos.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + videos.length) % videos.length);

    useEffect(() => {
        if (isMobile && videos.length > 0) {
            const timer = setInterval(() => {
                setCurrent((prev) => (prev + 1) % videos.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [isMobile, videos.length]);

    // ── Shared video card renderer ──────────────────────────────────────────
    const VideoCard = ({ item, idx, size = "normal", onClick }) => {
        const url = item.urlPath;
        const videoId = getYouTubeId(url);
        const thumbnail = item.image;
        const isHovered = hoveredIdx === `${activeTab}-${idx}`;
        const accentColor = isDoctor ? "#6a11cb" : "#c4366a";
        const glowColor = isDoctor ? "rgba(106,17,203,0.35)" : "rgba(196,54,106,0.35)";

        return (
            <div
                onClick={() => onClick ? onClick() : openVideo(videoId)}
                onMouseEnter={() => setHoveredIdx(`${activeTab}-${idx}`)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="relative rounded-2xl overflow-hidden cursor-pointer"
                style={{
                    boxShadow: isHovered
                        ? `0 20px 50px ${glowColor}, 0 0 0 2px ${accentColor}55`
                        : "0 4px 20px rgba(0,0,0,0.1)",
                    transition: "box-shadow 0.35s ease, transform 0.35s ease",
                    transform: isHovered ? "translateY(-5px)" : "translateY(0)",
                }}
            >
                <div className={`relative w-full overflow-hidden ${size === "small" ? "h-44" : "h-56"}`}>
                    <Image
                        src={thumbnail}
                        alt={item.title || "Video thumbnail"}
                        width={400}
                        height={250}
                        className="w-full h-full object-cover"
                        style={{ transform: isHovered ? "scale(1.08)" : "scale(1)", transition: "transform 0.5s ease" }}
                    />
                    {/* Gradient overlay */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: isHovered
                                ? `linear-gradient(to top, ${isDoctor ? "rgba(30,0,60,0.88)" : "rgba(100,0,40,0.88)"} 0%, rgba(0,0,0,0.2) 55%, transparent 100%)`
                                : `linear-gradient(to top, ${isDoctor ? "rgba(20,0,40,0.78)" : "rgba(80,0,30,0.72)"} 0%, rgba(0,0,0,0.1) 60%, transparent 100%)`,
                            transition: "background 0.35s ease",
                        }}
                    />

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div
                            className="flex items-center justify-center rounded-full"
                            style={{
                                width: isHovered ? "64px" : "50px",
                                height: isHovered ? "64px" : "50px",
                                background: "rgba(255,255,255,0.95)",
                                boxShadow: isHovered
                                    ? `0 0 0 7px rgba(255,255,255,0.2), 0 8px 28px ${glowColor}`
                                    : "0 4px 14px rgba(0,0,0,0.25)",
                                transition: "all 0.35s ease",
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                alt="Image"
                                style={{
                                    width: isHovered ? "26px" : "21px",
                                    height: isHovered ? "26px" : "21px",
                                    color: accentColor,
                                    marginLeft: "3px",
                                    transition: "all 0.35s ease",
                                }}
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>

                    {/* Watch Now badge */}
                    <div
                        className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold text-white"
                        style={{
                            background: `${accentColor}dd`,
                            opacity: isHovered ? 1 : 0,
                            transform: isHovered ? "translateY(0)" : "translateY(-6px)",
                            transition: "opacity 0.3s ease, transform 0.3s ease",
                            backdropFilter: "blur(4px)",
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" alt="Image" className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        Watch Now
                    </div>

                    {/* Title */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-white text-xs sm:text-sm font-semibold line-clamp-2 leading-snug drop-shadow-md">
                            {item.title}
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    // ── Shared modal ────────────────────────────────────────────────────────
    const VideoModal = () => {
        const isDoctor = activeTab === "doctor";
        const glowGradient = isDoctor
            ? "linear-gradient(135deg, #6a11cb, #b83b8f, #e4608d)"
            : "linear-gradient(135deg, #e4608d, #f9a8c9, #c4366a)";
        const btnGradient = isDoctor
            ? "linear-gradient(135deg, #6a11cb, #b83b8f)"
            : "linear-gradient(135deg, #c4366a, #e4608d)";
        const btnShadow = isDoctor
            ? "0 4px 20px rgba(106,17,203,0.6)"
            : "0 4px 20px rgba(196,54,106,0.6)";

        return selectedVideo ? (
            <div
                className="fixed inset-0 flex items-center justify-center z-50 p-4"
                onClick={closeVideo}
                style={{
                    background: "rgba(0,0,0,0.88)",
                    backdropFilter: "blur(10px)",
                    opacity: modalVisible ? 1 : 0,
                    transition: "opacity 0.3s ease",
                }}
            >
                <div
                    className="relative w-full max-w-4xl"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        transform: modalVisible ? "scale(1) translateY(0)" : "scale(0.92) translateY(30px)",
                        transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                >
                    <div
                        className="absolute -inset-1 rounded-3xl"
                        style={{ background: glowGradient, opacity: 0.55, filter: "blur(8px)" }}
                    />
                    <button
                        onClick={closeVideo}
                        className="absolute -top-5 -right-5 z-20 flex items-center justify-center w-10 h-10 rounded-full text-white"
                        style={{ background: btnGradient, boxShadow: btnShadow }}
                    >
                        <FiX className="text-xl" />
                    </button>
                    <div
                        className="relative rounded-2xl overflow-hidden"
                        style={{ background: "#000", aspectRatio: "16/9", boxShadow: "0 30px 80px rgba(0,0,0,0.8)" }}
                    >
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            style={{ position: "absolute", inset: 0 }}
                        ></iframe>
                    </div>
                </div>
            </div>
        ) : null;
    };

    return (
        <>
            {isMobile ? (
                <>
                    {/* ── Mobile: Patient Stories ── */}
                    <section className="relative bg-white px-3 pt-4 pb-3">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1 h-6 rounded-full" style={{ background: "linear-gradient(to bottom, #c4366a, #e4608d)" }} />
                            <h2 className="text-lg font-bold text-pink-700">Patient Success Stories</h2>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed mb-3 ml-3">
                            Real stories of recovery and hope, where patients share their healing journeys.
                        </p>
                        <div className="relative w-full overflow-hidden rounded-2xl">
                            <div
                                className="flex transition-transform duration-700 ease-in-out"
                                style={{ transform: `translateX(-${current * 100}%)` }}
                            >
                                {patientVideos.map((item, index) => {
                                    const url = item.urlPath;
                                    const videoId = getYouTubeId(url);
                                    const thumbnail = item.image;
                                    return (
                                        <div key={index} className="w-full flex-shrink-0 flex flex-col items-center px-4">
                                            <div
                                                onClick={() => openVideo(videoId)}
                                                className="relative rounded-2xl overflow-hidden w-[85%] mx-auto cursor-pointer"
                                                style={{ boxShadow: "0 8px 30px rgba(196,54,106,0.2)" }}
                                            >
                                                <div className="relative h-52 w-full">
                                                    <Image
                                                        src={thumbnail}
                                                        alt={item.title || "Video thumbnail"}
                                                        width={300}
                                                        height={250}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(100,0,40,0.8) 0%, transparent 60%)" }} />
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center" style={{ boxShadow: "0 4px 16px rgba(196,54,106,0.4)" }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" alt="Image" viewBox="0 0 24 24" fill="#c4366a" className="w-6 h-6 ml-0.5"><path d="M8 5v14l11-7z" /></svg>
                                                        </div>
                                                    </div>
                                                    <p className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold line-clamp-2 drop-shadow-md">{item.title}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {patientVideos.length > 1 && (
                                <>
                                    <button onClick={prevSlide} className="absolute top-1/2 left-0 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md" style={{ color: "#c4366a" }}>
                                        <FiChevronLeft size={18} />
                                    </button>
                                    <button onClick={nextSlide} className="absolute top-1/2 right-0 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md" style={{ color: "#c4366a" }}>
                                        <FiChevronRight size={18} />
                                    </button>
                                </>
                            )}
                        </div>
                        {/* Dots */}
                        {patientVideos.length > 1 && (
                            <div className="flex justify-center gap-1.5 mt-3">
                                {patientVideos.map((_, i) => (
                                    <button key={i} onClick={() => setCurrent(i)}
                                        className="rounded-full transition-all"
                                        style={{ width: i === current ? "20px" : "6px", height: "6px", background: i === current ? "#c4366a" : "#e9b0c6" }}
                                    />
                                ))}
                            </div>
                        )}
                        {patientVideos.length > 3 && (
                            <div className="flex justify-center mt-3">
                                <button onClick={() => router.push("/patientTalks")}
                                    className="text-sm font-semibold px-4 py-1.5 rounded-full text-white"
                                    style={{ background: "linear-gradient(135deg, #c4366a, #e4608d)" }}>
                                    View All
                                </button>
                            </div>
                        )}
                    </section>

                    {/* ── Mobile: Doctor Talks ── */}
                    <section className="relative bg-white px-3 pt-3 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1 h-6 rounded-full" style={{ background: "linear-gradient(to bottom, #6a11cb, #b83b8f)" }} />
                            <h2 className="text-lg font-bold" style={{ color: "#6a11cb" }}>Doctor Talks</h2>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed mb-3 ml-3">
                            Expert insights from our specialists on health, wellness and advanced treatments.
                        </p>
                        <div className="relative w-full overflow-hidden rounded-2xl">
                            <div
                                className="flex transition-transform duration-700 ease-in-out"
                                style={{ transform: `translateX(-${current * 100}%)` }}
                            >
                                {doctorVideos.map((item, index) => {
                                    const url = item.urlPath;
                                    const videoId = getYouTubeId(url);
                                    const thumbnail = item.image;
                                    return (
                                        <div key={index} className="w-full flex-shrink-0 flex flex-col items-center px-4">
                                            <div
                                                onClick={() => openVideo(videoId)}
                                                className="relative rounded-2xl overflow-hidden w-[85%] mx-auto cursor-pointer"
                                                style={{ boxShadow: "0 8px 30px rgba(106,17,203,0.2)" }}
                                            >
                                                <div className="relative h-52 w-full">
                                                    <Image
                                                        src={thumbnail}
                                                        alt={item.title || "Video thumbnail"}
                                                        width={300}
                                                        height={250}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(30,0,60,0.82) 0%, transparent 60%)" }} />
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center" style={{ boxShadow: "0 4px 16px rgba(106,17,203,0.4)" }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" alt="Image" viewBox="0 0 24 24" fill="#6a11cb" className="w-6 h-6 ml-0.5"><path d="M8 5v14l11-7z" /></svg>
                                                        </div>
                                                    </div>
                                                    <p className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold line-clamp-2 drop-shadow-md">{item.title}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {doctorVideos.length > 1 && (
                                <>
                                    <button onClick={prevSlide} className="absolute top-1/2 left-0 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md" style={{ color: "#6a11cb" }}>
                                        <FiChevronLeft size={18} />
                                    </button>
                                    <button onClick={nextSlide} className="absolute top-1/2 right-0 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md" style={{ color: "#6a11cb" }}>
                                        <FiChevronRight size={18} />
                                    </button>
                                </>
                            )}
                        </div>
                        {doctorVideos.length > 1 && (
                            <div className="flex justify-center gap-1.5 mt-3">
                                {doctorVideos.map((_, i) => (
                                    <button key={i} onClick={() => setCurrent(i)}
                                        className="rounded-full transition-all"
                                        style={{ width: i === current ? "20px" : "6px", height: "6px", background: i === current ? "#6a11cb" : "#c7a8e8" }}
                                    />
                                ))}
                            </div>
                        )}
                        {doctorVideos.length > 3 && (
                            <div className="flex justify-center mt-3">
                                <button onClick={() => router.push("/doctorTalks")}
                                    className="text-sm font-semibold px-4 py-1.5 rounded-full text-white"
                                    style={{ background: "linear-gradient(135deg, #6a11cb, #b83b8f)" }}>
                                    View All
                                </button>
                            </div>
                        )}
                    </section>

                    <VideoModal />
                </>
            ) : (
                /* ── Desktop ── */
                <section className="relative bg-white px-6 pb-4">
                    <div className="max-w-6xl mx-auto flex items-start gap-8">
                        {/* Left: Videos */}
                        <div className="flex-1">
                            {/* Tabs */}
                            <div className="flex gap-1 mb-5 mt-6 bg-gray-100 p-1 rounded-2xl w-fit">
                                {["patient", "doctor"].map((tab) => {
                                    const isActive = activeTab === tab;
                                    const label = tab === "patient" ? "Patient Success Stories" : "Doctor Talks";
                                    const activeBg = tab === "doctor"
                                        ? "linear-gradient(135deg, #6a11cb, #b83b8f)"
                                        : "linear-gradient(135deg, #c4366a, #e4608d)";
                                    return (
                                        <button
                                            key={tab}
                                            className="px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300"
                                            style={{
                                                background: isActive ? activeBg : "transparent",
                                                color: isActive ? "white" : "#6b7280",
                                                boxShadow: isActive ? "0 4px 15px rgba(0,0,0,0.15)" : "none",
                                            }}
                                            onClick={() => {
                                                setActiveTab(tab);
                                                setShowAll(false);
                                                setHoveredIdx(null);
                                            }}
                                        >
                                            {label}
                                        </button>
                                    );
                                })}
                            </div>

                            <p className="text-sm text-gray-500 mb-5">
                                {activeTab === "doctor"
                                    ? "Expert insights from our specialists on health, wellness and advanced treatments—delivered in simple, easy-to-understand talks."
                                    : "Real stories of recovery and hope, where patients share their healing journeys with TX Hospitals."}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {(showAll ? videos : videos.slice(0, 3)).map((item, idx) => (
                                    <VideoCard key={idx} item={item} idx={idx} onClick={() => openVideo(getYouTubeId(item.urlPath))} />
                                ))}
                            </div>

                            <button
                                onClick={handleShowMore}
                                className="mt-4 flex items-center gap-1.5 text-sm font-semibold px-5 py-2 rounded-full text-white transition-all"
                                style={{
                                    background: isDoctor
                                        ? "linear-gradient(135deg, #6a11cb, #b83b8f)"
                                        : "linear-gradient(135deg, #c4366a, #e4608d)",
                                    boxShadow: isDoctor
                                        ? "0 4px 15px rgba(106,17,203,0.35)"
                                        : "0 4px 15px rgba(196,54,106,0.35)",
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" alt="Image" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                View All Videos
                            </button>
                        </div>

                        {/* Right: Doctor Image */}
                        <div className="hidden md:flex justify-center items-center self-center">
                            <div className="relative">
                                <div
                                    className="absolute inset-0 rounded-full opacity-20 blur-2xl"
                                    style={{ background: "linear-gradient(135deg, #c4366a, #6a11cb)" }}
                                />
                                <Image
                                    src="/assets/Header/Docotor Image.png"
                                    alt="Doctor"
                                    width={280}
                                    height={280}
                                    className="object-contain relative z-10 drop-shadow-xl"
                                />
                            </div>
                        </div>
                    </div>

                    <VideoModal />
                </section>
            )}
        </>
    );
}
