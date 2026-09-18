"use client";
import React from "react";
import { useRouter } from "next/router";
import { FiChevronRight } from "react-icons/fi";
import Image from "next/image";
import useIsMobile from "@/hooks/useIsMobile";
import SpecialitiesCarousel from "@/components/HomePage/SpecialitiesCarousel";
import { motion } from "framer-motion";
import Link from "next/link";

const specialities = [
    {
        title: "Cardiac Sciences",
        desc: "Advanced heart care with modern diagnostics and minimally invasive treatments.",
        img: "/assets/specialities/Cardiac Image.png",
        path: "/specialities/cardiac-sciences/"
    },
    {
        title: "Gastro Sciences",
        desc: "Complete digestive and liver care with endoscopy and advanced surgery.",
        img: "/assets/specialities/Gastro Image.png",
        path: "/specialities/gastro-sciences/"
    },
    {
        title: "Ortho Sciences",
        desc: "Expert bone, joint and spine solutions with surgical and rehab support.",
        img: "/assets/specialities/Orthopediac image.png",
        path: "/specialities/orthopaedics/"
    },
    {
        title: "Nephrology",
        desc: "Expert treatment for kidney diseases, dialysis and renal transplants.",
        img: "/assets/specialities/Urology Image.png",
        path: "/specialities/nephrology/"
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 150, damping: 15 }
    }
};

export default function Specialities() {
    const router = useRouter();
    const isMobile = useIsMobile();

    const handleViewMore = () => {
        router.push("/specialities/");
    };

    const handleNavigate = (path) => {
        router.push(path);
    };

    return (
        <section className="bg-gray-50 w-full py-8 px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto text-center">
                {/* Heading (Original Alignment) */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-[10px] font-bold uppercase tracking-widest mb-3 border border-pink-200">
                        Clinical Excellence
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 ">
                        Our <span className="text-pink-700 relative inline-block">Specialties
                            <span className="absolute -bottom-1 left-0 w-full h-1 bg-pink-200/50 rounded-full"></span>
                        </span>
                    </h2>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-lg max-w-3xl mx-auto mb-14 text-gray-600 font-medium leading-relaxed"
                >
                    Experience world-class healthcare with medical expertise, modern technology and patient-first care under one roof.
                </motion.p>

                {/* Mobile view */}
                <div className="block md:hidden pb-4">
                    <SpecialitiesCarousel specialities={specialities} />
                    <div className="mt-8">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handleViewMore}
                            className="text-pink-700 font-bold underline decoration-2 underline-offset-4 hover:text-pink-800 transition-colors"
                        >
                            View All Specialities
                        </motion.button>
                    </div>
                </div>

                {/* Desktop view */}
                <div className="hidden md:block">
                    {/* Cards Grid (Original Columns/Alignment) */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-4 gap-6 pt-16"
                    >
                        {specialities.map((item, index) => (
                            <Link href={item.path} key={index} className="flex w-full max-w-[260px] mx-auto h-full">
                                <motion.div
                                    variants={cardVariants}
                                    whileHover={{ y: -10 }}
                                    className="relative bg-white border border-gray-200 shadow-lg rounded-[2rem] overflow-visible w-full text-center pt-24 pb-6 transition-all duration-300 cursor-pointer flex flex-col items-center justify-between h-full"
                                >
                                    {/* Icon Container (Original Offset Look) */}
                                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-40 h-40 rounded-3xl overflow-hidden shadow-xl border-4 border-white transition-transform duration-500 group-hover:scale-105">
                                        <Image
                                            src={item.img}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="p-4 flex flex-col items-center h-full justify-between">
                                        <div className="flex flex-col items-center">
                                            <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                            <p className="text-gray-600 text-sm leading-snug mb-6 line-clamp-3">
                                                {item.desc}
                                            </p>
                                        </div>

                                        <motion.span
                                            whileHover={{ scale: 1.1, rotate: 90 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="flex items-center justify-center w-8 h-8 bg-pink-600 text-white rounded-full shadow-md hover:bg-pink-700 transition-colors mt-auto"
                                        >
                                            <FiChevronRight size={18} />
                                        </motion.span>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </motion.div>

                    <div className="mt-16">
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "#be185d", color: "#fff" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleViewMore}
                            className="text-pink-700 font-bold px-8 py-3 rounded-full border-2 border-pink-700 transition-all duration-300 shadow-sm"
                        >
                            View All Specialities
                        </motion.button>
                    </div>
                </div>
            </div>
        </section>
    );
}
