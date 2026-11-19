import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FiArrowRight } from "react-icons/fi";

const SectionHeader = ({ title }) => (
    <div className="flex items-center gap-4 mb-6 mt-10 first:mt-2">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 shrink-0">{title}</h3>
        <div className="h-px bg-gray-200 w-full"></div>
    </div>
);

const Gallery = () => {

    const router = useRouter();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        window.scrollTo({ left: document.body.scrollWidth, top: 0, behavior: "smooth" });
    }, []);

    const banjaraInaugurationImages = [
        "/assets/NewsAndMedia/Banjara Hills/1.jpg",
        "/assets/NewsAndMedia/Banjara Hills/2.jpg",
        "/assets/NewsAndMedia/Banjara Hills/3.jpg",
        "/assets/NewsAndMedia/Banjara Hills/4.jpg",
        "/assets/NewsAndMedia/Banjara Hills/5.jpg",
        "/assets/NewsAndMedia/Banjara Hills/6.jpg"
    ];

    const kachigudaInaugurationImages = [
        "/assets/NewsAndMedia/Kachiguda/1A.jpeg",
        "/assets/NewsAndMedia/Kachiguda/2.jpeg",
        "/assets/NewsAndMedia/Kachiguda/3.jpeg",
        "/assets/NewsAndMedia/Kachiguda/4.jpeg",
        "/assets/NewsAndMedia/Kachiguda/5.jpeg",
        "/assets/NewsAndMedia/Kachiguda/6.jpeg"
    ];

    const miyapurInaugurationImages = [
        "/assets/NewsAndMedia/Miyapur/Pticture _ M _ 1.webp",
        "/assets/NewsAndMedia/Miyapur/Pticture _ M _ 2.webp",
        "/assets/NewsAndMedia/Miyapur/Pticture _ M _ 3.webp",
        "/assets/NewsAndMedia/Miyapur/Pticture _ M _ 4.webp",
        "/assets/NewsAndMedia/Miyapur/Pticture _ M _ 5.webp",
        "/assets/NewsAndMedia/Miyapur/Pticture _ M _ 6.webp"
    ];

    return (
        <div className="p-2 md:p-4">
            {/* Banjara Hills Section */}
            <SectionHeader title="Banjara Hills Unit Inauguration" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {banjaraInaugurationImages.map((src, index) => (
                    <div key={index} className="overflow-hidden rounded-2xl shadow-sm border border-gray-200 group">
                        <img 
                            loading="lazy" 
                            src={src}
                            alt={`Banjara ${index + 1}`}
                            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-end mt-4">
                <button
                    onClick={() => router.push('/banjarahills-gallery')}
                    className="flex items-center gap-2 text-pink-700 font-semibold hover:text-pink-800 transition group"
                >
                    View All <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </button>
            </div>

            {/* Kachiguda Section */}
            <SectionHeader title="Kachiguda Unit Inauguration" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {kachigudaInaugurationImages.map((src, index) => (
                    <div key={index} className="overflow-hidden rounded-2xl shadow-sm border border-gray-200 group">
                        <img 
                            loading="lazy" 
                            src={src}
                            alt={`Kachiguda ${index + 1}`}
                            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-end mt-4">
                <button
                    onClick={() => router.push('/kachiguda-gallery')}
                    className="flex items-center gap-2 text-pink-700 font-semibold hover:text-pink-800 transition group"
                >
                    View All <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </button>
            </div>

            {/* Miyapur Section */}
            <SectionHeader title="Miyapur Unit Inauguration" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {miyapurInaugurationImages.map((src, index) => (
                    <div key={index} className="overflow-hidden rounded-2xl shadow-sm border border-gray-200 group">
                        <img 
                            loading="lazy" 
                            src={src}
                            alt={`Miyapur ${index + 1}`}
                            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-end mt-4">
                <button
                    onClick={() => router.push('/miyapur-gallery')}
                    className="flex items-center gap-2 text-pink-700 font-semibold hover:text-pink-800 transition group"
                >
                    View All <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </button>
            </div>

            {/* Uppal Section */}
            <SectionHeader title="Uppal Unit Inauguration" />
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 text-center">
                <p className="text-gray-500 text-lg font-medium">Images coming soon...</p>
            </div>
        </div>
    );
};

export default Gallery;
