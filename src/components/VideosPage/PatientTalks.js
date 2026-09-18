"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

export default function PatientTalks() {
    const [patientVideos, setPatientVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [hoveredIdx, setHoveredIdx] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

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

    return (
        <section className="py-8">
            {/* Section Header */}
            <div className="relative flex items-center justify-between px-10 py-5 w-full max-w-6xl mx-auto mt-1 mb-10 rounded-3xl overflow-hidden"
                style={{ background: "linear-gradient(135deg, #f9a8c9 0%, #e4608d 60%, #c9366a 100%)" }}>
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                <div className="relative z-10">
                    <h2 className="text-5xl font-bold text-white drop-shadow-md">
                        Patient Success Stories
                    </h2>
                    <p className="text-pink-100 mt-1 text-base font-medium">
                        Real journeys of healing & hope
                    </p>
                </div>
                <div className="relative z-10 flex items-center gap-3">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white border-opacity-30">
                        <svg alt="Icon" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                        </svg>
                    </div>
                    <Image
                        src="/assets/Images/Patient Success Stories Logo.webp"
                        alt="Patient Success Icon"
                        width={90}
                        height={90}
                        className="object-contain drop-shadow-lg"
                    />
                </div>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full px-4 md:px-0">
                {patientVideos.map((item, idx) => {
                    const videoId = getYouTubeId(item.urlPath);
                    const thumbnail = item.image;
                    const isHovered = hoveredIdx === idx;

                    return (
                        <div
                            key={idx}
                            onClick={() => openVideo(videoId)}
                            onMouseEnter={() => setHoveredIdx(idx)}
                            onMouseLeave={() => setHoveredIdx(null)}
                            className="group relative rounded-2xl overflow-hidden cursor-pointer"
                            style={{
                                boxShadow: isHovered
                                    ? "0 20px 50px rgba(196, 54, 106, 0.35), 0 0 0 2px rgba(232, 136, 163, 0.6)"
                                    : "0 4px 20px rgba(0,0,0,0.12)",
                                transition: "box-shadow 0.35s ease, transform 0.35s ease",
                                transform: isHovered ? "translateY(-6px)" : "translateY(0)",
                            }}
                        >
                            {/* Thumbnail */}
                            <div className="relative w-full h-56 overflow-hidden">
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
                                            ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)"
                                            : "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)",
                                        transition: "background 0.35s ease",
                                    }}
                                />

                                {/* YouTube-style Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div
                                        className="flex items-center justify-center rounded-full"
                                        style={{
                                            width: isHovered ? "72px" : "58px",
                                            height: isHovered ? "72px" : "58px",
                                            background: isHovered
                                                ? "rgba(255,255,255,1)"
                                                : "rgba(255,255,255,0.92)",
                                            boxShadow: isHovered
                                                ? "0 0 0 8px rgba(255,255,255,0.2), 0 8px 32px rgba(196,54,106,0.5)"
                                                : "0 4px 16px rgba(0,0,0,0.3)",
                                            transition: "all 0.35s ease",
                                        }}
                                    >
                                        <svg alt="Icon"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            style={{
                                                width: isHovered ? "30px" : "24px",
                                                height: isHovered ? "30px" : "24px",
                                                color: "#c4366a",
                                                marginLeft: "3px",
                                                transition: "all 0.35s ease",
                                            }}
                                        >
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Watch Now label on hover */}
                                <div
                                    className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold text-white"
                                    style={{
                                        background: "rgba(196,54,106,0.85)",
                                        opacity: isHovered ? 1 : 0,
                                        transform: isHovered ? "translateY(0)" : "translateY(-8px)",
                                        transition: "opacity 0.3s ease, transform 0.3s ease",
                                        backdropFilter: "blur(6px)",
                                    }}
                                >
                                    <svg alt="Play Icon" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                    Watch Now
                                </div>

                                {/* Title at bottom */}
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <p className="text-white text-sm font-semibold line-clamp-2 leading-snug drop-shadow-md">
                                        {item.title || "Patient Success Story"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Video Modal */}
            {selectedVideo && (
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
                        {/* Glow ring */}
                        <div
                            className="absolute -inset-1 rounded-3xl"
                            style={{ background: "linear-gradient(135deg, #e4608d, #f9a8c9, #c4366a)", opacity: 0.6, filter: "blur(8px)" }}
                        />

                        {/* Close Button */}
                        <button
                            onClick={closeVideo}
                            className="absolute -top-5 -right-5 z-20 flex items-center justify-center w-10 h-10 rounded-full text-white font-bold"
                            style={{
                                background: "linear-gradient(135deg, #c4366a, #e4608d)",
                                boxShadow: "0 4px 20px rgba(196,54,106,0.6)",
                            }}
                        >
                            <FiX className="text-xl" />
                        </button>

                        {/* Video Container */}
                        <div
                            className="relative rounded-2xl overflow-hidden"
                            style={{
                                background: "#000",
                                aspectRatio: "16/9",
                                boxShadow: "0 30px 80px rgba(0,0,0,0.8)",
                            }}
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
            )}
        </section>
    );
}
