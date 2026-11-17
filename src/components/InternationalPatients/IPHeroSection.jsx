import React, { useState, useEffect, useCallback, useRef } from "react";
import {
    Globe,
    ChevronLeft,
    ChevronRight,
    MapPin,
} from "lucide-react";

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

export default function IPHeroSection({ onOpenAppointmentModal }) {
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

    return (
        <div className="font-sans antialiased text-[#1F1A1C]">
            {/* HERO SECTION */}
            <section
                id="top"
                className="relative overflow-hidden text-white"
                style={{
                    background: "rgb(189, 40, 80)",
                    padding: "48px 24px 60px",
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
                                Dedicated International Desk
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
                                Fast-Track Admissions
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-3 mt-1.5 pt-1">
                            <button
                                type="button"
                                onClick={onOpenAppointmentModal}
                                className="inline-flex items-center justify-center font-bold text-sm md:text-base rounded-full shadow-md transition hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                                style={{
                                    minHeight: "46px",
                                    padding: "0 24px",
                                    background: "rgb(255, 255, 255)",
                                    color: "rgb(189, 40, 80)",
                                }}
                            >
                                Plan Your Medical Journey
                            </button>
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
                                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition border border-white/20 active:scale-95 cursor-pointer"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                type="button"
                                onClick={nextSlide}
                                aria-label="Next hospital branch"
                                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition border border-white/20 active:scale-95 cursor-pointer"
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
                                        className={`h-2 rounded-full transition-all cursor-pointer ${dotIdx === currentSlide
                                            ? "w-6 bg-white"
                                            : "w-2 bg-white/50 hover:bg-white/80"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Floating 4 Hospitals Across Hyderabad Badge */}
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
        </div>
    );
}
