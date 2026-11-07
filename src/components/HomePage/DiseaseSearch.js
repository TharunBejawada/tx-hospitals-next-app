"use client";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.02
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 }
};

export default function DiseaseSearch() {
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const router = useRouter();
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (e) => {
        e?.preventDefault();
        if (!searchValue.trim()) return;
        router.push(`/search?q=${encodeURIComponent(searchValue.trim())}`);
    };

    const handleAlphabetClick = (letter) => {
        router.push(`/search?q=${encodeURIComponent(letter)}`);
    };

    return (
        <section className="w-full bg-white overflow-hidden">
            {/* Mobile View */}
            <div className="block md:hidden px-3 py-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 gap-8 items-start">
                    {/* Left: Alphabet grid */}
                    <div className="bg-pink-50 p-4 rounded-2xl shadow-sm">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 px-1">
                            Find Diseases & Conditions By Alphabet
                        </h2>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-7 gap-2"
                        >
                            {alphabets.map((letter) => (
                                <motion.button
                                    key={letter}
                                    variants={itemVariants}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleAlphabetClick(letter)}
                                    className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 font-bold text-xs hover:bg-pink-600 hover:text-white hover:border-pink-600 transition shadow-sm"
                                >
                                    {letter}
                                </motion.button>
                            ))}
                            <motion.button
                                variants={itemVariants}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => router.push("/search?q=%23")}
                                className="h-9 px-3 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 font-bold hover:bg-pink-600 hover:text-white hover:border-pink-600 transition text-xs shadow-sm"
                            >
                                #
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Right: Search section */}
                    <div>
                        <h2 className="font-bold text-center text-gray-800 mb-4 px-2">
                            Search Diseases and Conditions
                        </h2>
                        <form onSubmit={handleSearch} className="flex items-center w-full max-w-md mb-4 bg-white rounded-full border border-gray-300 overflow-hidden shadow-sm focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-100 transition-all">
                            <input
                                type="text"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder="Type symptoms or condition..."
                                className="flex-1 px-5 py-3 border-none focus:outline-none text-sm"
                            />
                            <button
                                type="submit"
                                aria-label="Search diseases"
                                className="bg-pink-600 text-white px-5 py-3 hover:bg-pink-700 transition flex items-center justify-center"
                            >
                                <FiSearch size={22} />
                            </button>
                        </form>
                        <p className="text-gray-500 text-[11px] leading-relaxed text-center px-4">
                            Quickly find detailed information on symptoms, causes, and treatment options from our expert database.
                        </p>
                    </div>
                </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:block px-6 py-8">
                <div className="max-w-6xl mx-auto grid grid-cols-2 gap-16 items-start">
                    {/* Left: Alphabet grid */}
                    <div className="bg-pink-50 p-8 rounded-[2rem] shadow-sm border border-pink-100">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-pink-100/50 text-pink-700 text-[10px] font-bold uppercase tracking-widest mb-4 border border-pink-200">
                            Global Conditions
                        </span>
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 ">
                            Find Diseases By <span className="text-pink-700">Alphabet</span>
                        </h2>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-9 gap-3"
                        >
                            {alphabets.map((letter) => (
                                <motion.button
                                    key={letter}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.1, y: -2, backgroundColor: "#db2777", color: "#fff", borderColor: "#db2777" }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleAlphabetClick(letter)}
                                    className="w-10 h-10 xl:w-12 xl:h-12 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 font-bold hover:shadow-md transition cursor-pointer"
                                >
                                    {letter}
                                </motion.button>
                            ))}
                            <motion.button
                                variants={itemVariants}
                                whileHover={{ scale: 1.1, y: -2, backgroundColor: "#db2777", color: "#fff", borderColor: "#db2777" }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => router.push("/search?q=%23")}
                                className="w-10 h-10 xl:w-12 xl:h-12 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 font-bold hover:shadow-md transition text-sm"
                            >
                                #
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Right: Search section */}
                    <div className="pt-4">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-pink-50 text-pink-600 text-[10px] font-bold uppercase tracking-widest mb-4 border border-pink-100">
                            Search Engine
                        </span>
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-8 ">
                            Medical <span className="text-pink-700">Database</span>
                        </h2>
                        <form onSubmit={handleSearch} className="flex items-center w-full max-w-md mb-6 bg-white rounded-full border border-gray-200 overflow-hidden shadow-sm focus-within:shadow-md focus-within:border-pink-500 transition-all">
                            <input
                                type="text"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder="Search conditions, causes, treatments..."
                                className="flex-1 px-6 py-4 border-none focus:outline-none text-base"
                            />
                            <button
                                type="submit"
                                aria-label="Search conditions"
                                className="bg-pink-600 text-white px-6 py-4 hover:bg-pink-700 transition flex items-center justify-center"
                            >
                                <FiSearch size={24} />
                            </button>
                        </form>
                        <p className="text-gray-500 text-lg leading-relaxed font-medium">
                            Quickly find the medical information you need. Search our database to
                            explore symptoms, causes, and treatment options.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
