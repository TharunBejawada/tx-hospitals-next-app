"use client";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import useIsMobile from "@/hooks/useIsMobile";

export default function DoctorsHeader({ searchTerm, setSearchTerm, heading }) {

    const isMobile = useIsMobile();

    return (
        <>
            {isMobile ? (
                <section className="relative -mt-6 w-full h-[200px] flex items-center justify-center overflow-hidden">
                    {/* Background Image */}
                    <Image
                        src="/assets/Doctors/Doctor Backside BG.webp"
                        alt="Background"
                        fill
                        className="object-cover"
                        priority
                    />

                    {/* Overlay gradient (optional, for readability) */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#231557]/80 via-[#44107A]/70 to-[#FF1361]/60"></div>

                    {/* Content */}
                    <div className="relative z-10 container mx-auto px-2 flex flex-row items-center justify-between gap-6">
                        {/* Left side text */}
                        <div className="text-white max-w-xl">
                            <h1 className="text-2xl font-bold mb-2 leading-snug">
                                {heading || <>The Physicians Behind <br /> Your Care</>}
                            </h1>
                            <p className="text-sm mb-4 text-gray-200">
                                A trusted team of certified doctors with decades of collective experience
                            </p>

                            {/* Search box */}
                            <div className="flex items-center bg-transparent border border-white/70 rounded-full px-4 py-2 w-full   ">
                                <input
                                    type="text"
                                    placeholder="Search for Doctors & Specialities.."
                                    className="bg-transparent text-white placeholder-gray-200 outline-none w-full"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <FaSearch className="text-white text-lg ml-2" />
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <section className="relative w-full h-[350px] flex items-center justify-center overflow-hidden">
                    {/* Background Image */}
                    <Image
                        src="/assets/Doctors/Doctor Backside BG.webp"
                        alt="Background"
                        fill
                        className="object-cover"
                        priority
                    />

                    {/* Overlay gradient (optional, for readability) */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#231557]/80 via-[#44107A]/70 to-[#FF1361]/60"></div>

                    {/* Content */}
                    <div className="relative z-10 container mx-auto px-14 flex flex-row items-center justify-between gap-6">
                        {/* Left side text */}
                        <div className="text-white max-w-xl">
                            <h1 className="text-4xl font-bold mb-4 leading-snug">
                                {heading || <>The Physicians Behind <br /> Your Care</>}
                            </h1>
                            <p className="text-lg mb-8 text-gray-200">
                                A trusted team of certified doctors with decades of collective experience
                            </p>

                            {/* Search box */}
                            <div className="flex items-center bg-transparent border border-white/70 rounded-full px-4 py-2 w-[380px]">
                                <input
                                    type="text"
                                    placeholder="Search for Doctors & Specialities.."
                                    className="bg-transparent text-white placeholder-gray-200 outline-none w-full"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <FaSearch className="text-white text-lg ml-2" />
                            </div>
                        </div>

                        {/* Right side image */}
                        <div className="relative mt-12 w-[450px] h-[450px]">
                            <Image
                                src="/assets/Doctors/Doctor Picture .webp"
                                alt="Doctors Group"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}