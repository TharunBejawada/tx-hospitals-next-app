import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import Image from 'next/image';

const BanjaraHillsWhyChooseUs = () => {
    const whyPoints = [
        "NABH Accredited Hospital",
        "Advanced Technology & Infrastructure",
        "Highly Experienced Doctors",
        "24/7 Emergency & Trauma Care",
        "Cashless Insurance & TPA",
        "Patient First Approach"
    ];

    const reviews = [
        {
            name: "Ramesh Kumar",
            time: "2 days ago",
            text: "The doctors and staff were very cooperative. Got excellent treatment for my father's heart surgery."
        },
        {
            name: "Sneha Reddy",
            time: "5 days ago",
            text: "Very clean hospital with advanced facilities. The care and support from staff is outstanding."
        },
        {
            name: "Anitha Devi",
            time: "1 week ago",
            text: "World class treatment and highly experienced doctors. Thank you TX Hospitals."
        }
    ];

    // High Quality Official Google SVG Logo
    const GoogleOfficialLogo = () => (
        <svg viewBox="0 0 220 62" width="110" height="31" alt="Google Logo" xmlns="http://www.w3.org/2000/svg">
            <path fill="#4285F4" d="M23.4 46.9c-12.5 0-23-10.2-23-22.7s10.5-22.7 23-22.7c6.9 0 11.9 2.7 15.6 6.3l-4.4 4.4c-2.7-2.5-6.3-4.4-11.2-4.4-9.3 0-16.4 7.3-16.4 16.5s7.1 16.5 16.3 16.5c5.9 0 9.3-2.4 11.5-4.5 1.8-1.8 2.9-4.3 3.4-7.8H23.5v-6.2h20.7c.2 1.1.3 2.4.3 3.9 0 4.7-1.3 10.4-5.4 14.5-3.9 4.1-9 6.3-15.7 6.3z" />
            <path fill="#EA4335" d="M76.1 32.3c0 8.4-6.6 14.6-14.7 14.6S46.7 40.7 46.7 32.3c0-8.5 6.6-14.6 14.7-14.6 8.1-.1 14.7 6.1 14.7 14.6zm-6.4 0c0-5.3-3.8-8.9-8.3-8.9-4.4 0-8.3 3.6-8.3 8.9 0 5.2 3.8 8.9 8.3 8.9 4.5-.1 8.3-3.7 8.3-8.9z" />
            <path fill="#FBBC05" d="M114.4 32.3c0 8.4-6.6 14.6-14.7 14.6s-14.7-6.2-14.7-14.6c0-8.5 6.6-14.6 14.7-14.6 8.1-.1 14.7 6.1 14.7 14.6zm-6.5 0c0-5.3-3.8-8.9-8.3-8.9-4.4 0-8.3 3.6-8.3 8.9 0 5.2 3.8 8.9 8.3 8.9 4.5-.1 8.3-3.7 8.3-8.9z" />
            <path fill="#4285F4" d="M151.4 18.5v26.3c0 10.8-6.4 15.2-13.9 15.2-7.1 0-11.4-4.8-13-8.6l5.6-2.3c1 2.4 3.4 5.2 7.4 5.2 4.8 0 7.8-3 7.8-8.6v-2.1h-.2c-1.4 1.8-4.2 3.3-7.7 3.3-7.3 0-14-6.4-14-14.6 0-8.3 6.7-14.7 14-14.7 3.5 0 6.3 1.6 7.7 3.3h.2v-2.4h6.1zm-5.7 13.8c0-5.2-3.4-8.9-7.8-8.9s-8.1 3.8-8.1 8.9c0 5.1 3.7 8.8 8.1 8.8 4.4 0 7.8-3.7 7.8-8.8z" />
            <path fill="#34A853" d="M167.4 1.3V46h-6.2V1.3h6.2z" />
            <path fill="#EA4335" d="M192.3 35.3l5 3.3c-1.6 2.4-5.5 6.5-12.2 6.5-8.3 0-14.5-6.4-14.5-14.6 0-8.7 6.3-14.6 13.8-14.6 7.6 0 11.3 6 12.5 9.3l.7 1.7-19.6 8.1c1.5 2.9 3.8 4.4 7.1 4.4s5.5-1.7 7.2-4.1zm-15.3-5.3l13.1-5.4c-.7-1.8-2.9-3.1-5.4-3.1-3.4 0-7.9 2.9-7.7 8.5z" />
        </svg>
    );

    // Google G icon for review cards
    const GoogleGIcon = () => (
        <svg viewBox="0 0 24 24" width="20" height="20" alt="Google Icon" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
    );

    // Landscape/Mountain Image Avatar Placeholder
    const AvatarPlaceholder = () => (
        <div className="w-10 h-7 bg-[#e5e7eb] rounded flex items-center justify-center text-gray-400 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" alt="User Avatar Icon">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        </div>
    );

    return (
        <section className="py-4 md:py-6 px-4 md:px-8 bg-white overflow-hidden">
            <div className="max-w-[1440px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-6 items-stretch">

                    {/* Left Column: Why Patients Choose TX Hospitals */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#b3204d] rounded-[32px] p-4 md:p-6 pb-0 md:pb-0 lg:w-[35%] xl:w-[36%] relative overflow-hidden flex flex-col justify-between min-h-[300px] shadow-sm shrink-0"
                    >
                        {/* Text Content wrapped to stay strictly on the left 64% */}
                        <div className="relative z-10 w-[64%] pb-4 pr-2">
                            <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-4 leading-tight">
                                Why Patients Choose TX Hospitals
                            </h2>

                            <ul className="space-y-3">
                                {whyPoints.map((point, index) => (
                                    <li key={index} className="flex items-center gap-3 text-white text-sm font-semibold leading-tight">
                                        {/* Solid white circle with pink check icon */}
                                        <div className="bg-white rounded-full w-5 h-5 shrink-0 flex items-center justify-center">
                                            <Check className="w-3 h-3 text-[#b3204d]" strokeWidth={4.5} />
                                        </div>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Clean Cutout Doctor Portrait standing directly on the pink background */}
                        <div className="absolute bottom-0 right-0 w-[42%] h-[90%] z-0 pointer-events-none">
                            <div className="relative w-full h-full">
                                <Image
                                    src="/assets/Header/Docotor Image.png"
                                    alt="TX Hospitals Expert Doctor Portrait"
                                    fill
                                    className="object-contain object-bottom"
                                    priority
                                />
                            </div>
                        </div>
                    </motion.div>


                    {/* Right Column: Google Ratings & Review Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white border border-gray-200 rounded-[32px] p-6 md:p-8 lg:w-[65%] xl:w-[64%] flex flex-col gap-6 shadow-[0_4px_25px_rgba(0,0,0,0.01)]"
                    >
                        {/* Main Title */}
                        <h2 className="text-gray-900 text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
                            Why Patients Choose TX Hospitals Banjara Hills
                        </h2>

                        {/* Rating block & cards layout */}
                        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch w-full">

                            {/* Google Rating Block */}
                            <div className="flex flex-col items-start gap-1 justify-center shrink-0 w-full md:w-[22%]">
                                <GoogleOfficialLogo />

                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-3xl md:text-[34px] font-bold text-gray-900 leading-none">4.8</span>
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-3.5 h-3.5 md:w-[16px] md:h-[16px] fill-[#FBBC05] text-[#FBBC05]" />
                                        ))}
                                    </div>
                                </div>

                                <span className="text-gray-700 font-bold text-sm mt-2 block">
                                    Based on 1200+ reviews
                                </span>
                            </div>

                            {/* Cards Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 w-full md:w-[78%] items-stretch">
                                {reviews.map((review, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col justify-between relative hover:shadow-md transition-all duration-300"
                                    >
                                        <div>
                                            {/* User Header */}
                                            <div className="flex items-center gap-2.5 mb-3.5">
                                                <AvatarPlaceholder />
                                                <div className="min-w-0">
                                                    <h4 className="text-sm font-bold text-gray-900 truncate leading-none">
                                                        {review.name}
                                                    </h4>
                                                    <span className="text-xs text-gray-500 mt-1 block">
                                                        {review.time}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Review Body */}
                                            <p className="text-gray-700 text-sm leading-relaxed mb-6 font-medium">
                                                "{review.text}"
                                            </p>
                                        </div>

                                        {/* Bottom Right Google G Brand */}
                                        <div className="absolute bottom-4 right-4 flex items-center justify-center">
                                            <GoogleGIcon />
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default BanjaraHillsWhyChooseUs;
