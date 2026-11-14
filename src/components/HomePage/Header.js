"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiArrowRight, FiSearch } from "react-icons/fi";
import HospitalNavbar from "@/components/HomePage/HospitalNavbar";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

const labels = [
    { title: "Request Appointment", path: "/find-doctor/" },
    { title: "Online Consultation", path: "" },
    { title: "Health Checkup", path: "/health-package" },
    { title: "View Report", path: "" },
];

export default function HospitalHero() {
    const router = useRouter();
    const videoRef = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [forceSecondary, setForceSecondary] = useState(false);
    const [heroSearch, setHeroSearch] = useState("");

    const handleHeroSearch = (e) => {
        e?.preventDefault();
        if (!heroSearch.trim()) return;
        router.push(`/search?q=${encodeURIComponent(heroSearch.trim())}`);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Ensure video autoplays on mobile devices (iOS Safari & Android Chrome)
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.defaultMuted = true;
            videoRef.current.muted = true;
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Mobile browser low-power or autoplay policy handled gracefully
                });
            }
        }
    }, []);

    return (
        <div className="w-full font-sans">
            {/* Background Video Hero (Active on both mobile and desktop with responsive heights) */}
            <div className="relative h-[83vh] md:h-[95vh] text-white">
                <video
                    ref={videoRef}
                    className="absolute w-full h-full object-cover object-top"
                    src="https://tx-hospital-images.s3.ap-south-2.amazonaws.com/images/3+srikanth+out.mp4"
                    poster="/assets/Header/hero-poster.webp"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                />
                <div className="relative z-20 flex flex-col h-full justify-between p-2">
                    {/* Navbar */}
                    <HospitalNavbar
                        variant={isScrolled ? "secondary" : "primary"}
                        forceSecondary={forceSecondary}
                        setForceSecondary={setForceSecondary}
                    />

                    {/* Search Form - Visible on Desktop only */}
                    <div className="hidden md:flex mt-auto flex-col items-center gap-6 w-full pb-12">
                        <motion.form
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            onSubmit={handleHeroSearch}
                            className="flex flex-row items-center justify-center gap-4 w-full max-w-4xl mx-auto"
                        >
                            <div className="flex flex-1 relative group">
                                <input
                                    type="search"
                                    value={heroSearch}
                                    onChange={(e) => setHeroSearch(e.target.value)}
                                    placeholder="Search for Disease & Conditions, Medicines"
                                    className="w-full bg-white py-2 pl-4 pr-12 border-2 border-pink-700 rounded-full text-black focus:outline-none transition-shadow focus:shadow-lg"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    type="submit"
                                    aria-label="Submit search query"
                                    className="absolute right-1 top-1/2 -translate-y-1/2 bg-pink-700 hover:bg-pink-800 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                                >
                                    <FiSearch size={15} />
                                </motion.button>
                            </div>
                        </motion.form>
                    </div>
                </div>
            </div>

            {/* Chairman Message Section & Quick Action Buttons */}
            <div className="relative" id="chairman-message-section">
                {/* Action Buttons: Mobile Grid (Visible on Mobile only, flows naturally above message) */}
                <div className="grid grid-cols-2 gap-2 p-1 md:hidden">
                    {labels.map((label, idx) => (
                        <button
                            key={idx}
                            className="flex items-center justify-center bg-pink-700 text-white rounded-full gap-2 py-2 font-semibold hover:bg-pink-800 transition active:scale-95"
                            onClick={() => router.push(label?.path)}
                        >
                            <span className="text-xs">{label?.title}</span>
                            <FiArrowRight size={16} />
                        </button>
                    ))}
                </div>

                {/* Chairman's Message Image */}
                <div className="w-full">
                    <Image
                        src="/assets/Header/Chairmans-message.webp"
                        alt="Chairman's Message"
                        width={1300}
                        height={400}
                        className="w-full h-auto object-cover"
                        priority
                    />
                </div>

                {/* Action Buttons: Desktop Overlay (Visible on Desktop only, absolutely positioned) */}
                <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl">
                    <div className="flex justify-center gap-4 text-white mx-auto w-full bg-opacity-95">
                        {labels.map((label, idx) => (
                            <motion.button
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.05 * idx, duration: 0.3 }}
                                whileHover={{ y: -5, boxShadow: "0 10px 20px -10px rgba(0,0,0,0.5)" }}
                                className='flex items-center justify-center bg-pink-700 border rounded-full border-gray-200 gap-2 font-bold py-2 flex-1 transition hover:bg-pink-800'
                                onClick={() => router.push(label?.path)}
                            >
                                {label?.title}
                                <motion.span
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                    <FiArrowRight size={16} />
                                </motion.span>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
