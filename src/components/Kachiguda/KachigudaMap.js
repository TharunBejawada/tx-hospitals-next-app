import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const MapClient = dynamic(
    () => import("@/components/ContactUs/MapClient"),
    { ssr: false }
);

export default function KachigudaMap() {
    const kachigudaCoords = [17.389777991297837, 78.49544286499808];
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${kachigudaCoords[0]},${kachigudaCoords[1]}`;
    const whatsappUrl = "https://wa.me/919144514459?text=Hello%20TX%20Hospitals%20Kachiguda%2C%20I%20would%20like%20to%20enquire%20about%20booking%20an%20appointment.";

    const handleDirections = () => {
        window.open(googleMapsUrl, "_blank");
    };

    const handleWhatsApp = () => {
        window.open(whatsappUrl, "_blank");
    };

    return (
        <section className="bg-slate-50 py-10 md:py-14 px-6 md:px-10 lg:px-12 relative overflow-hidden border-t border-slate-100">
            <div className="max-w-[1400px] mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                    {/* Left Column - Live Google Map */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-6 w-full animate-fade-in"
                    >
                        <div
                            className="relative w-full h-[350px] md:h-[420px] rounded-3xl overflow-hidden shadow-lg border border-slate-200 group hover:shadow-2xl transition-all duration-300 bg-slate-100 z-0"
                        >
                            {/* Live Interactive Leaflet Map Client with Red Point Pin */}
                            <MapClient
                                coords={kachigudaCoords}
                                name="TX Hospitals Kachiguda"
                            />
                        </div>
                    </motion.div>

                    {/* Right Column - Info Block */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-6 w-full flex flex-col space-y-8"
                    >
                        {/* Heading */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                                Find Us in Kachiguda
                            </h2>
                            <div className="h-1 w-16 bg-gradient-to-r from-pink-600 to-[#8b006a] mt-4 rounded-full" />
                        </div>

                        {/* List of details */}
                        <div className="space-y-6">

                            {/* Address Row */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#e6fcf5] text-[#0ca678] flex items-center justify-center shrink-0 shadow-sm border border-[#c3fae8]">
                                    <svg alt="Icon" className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <h3 className="text-base font-bold text-gray-900 leading-none">
                                        Address
                                    </h3>
                                    <p className="text-sm font-semibold text-gray-600 mt-2 leading-relaxed max-w-md">
                                        TX Hospitals, # 3-2-841/1, Kachiguda Station Rd, Mahalaxmi Nilayam, Kachiguda, Hyderabad, Telangana — 500027
                                    </p>
                                </div>
                            </div>

                            {/* Phone Row */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#e6fcf5] text-[#0ca678] flex items-center justify-center shrink-0 shadow-sm border border-[#c3fae8]">
                                    <svg alt="Icon" className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.57a1 1 0 00-1.01.24l-2.2 2.2a15.045 15.045 0 01-6.59-6.59l2.2-2.21a1 1 0 00.24-1.01c-.38-1.11-.57-2.3-.57-3.53C6.35 4 5.35 3 4.12 3H1c-1.1 0-2 1-2 2 0 10.49 8.51 19 19 19 1 .01 2-.9 2-2v-3.12c0-1.23-1-2.23-2.23-2.23z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <h3 className="text-base font-bold text-gray-900 leading-none">
                                        Phone
                                    </h3>
                                    <p className="text-sm font-semibold text-gray-600 mt-2 leading-none">
                                        <a href="tel:04048108108" className="hover:text-pink-700 transition-colors">9144514459</a>
                                    </p>
                                </div>
                            </div>

                            {/* OPD Hours Row */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#e6fcf5] text-[#0ca678] flex items-center justify-center shrink-0 shadow-sm border border-[#c3fae8]">
                                    <svg alt="Icon" className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <h3 className="text-base font-bold text-gray-900 leading-none">
                                        OPD Hours
                                    </h3>
                                    <p className="text-sm font-semibold text-gray-600 mt-2 leading-relaxed">
                                        Mon – Sat: 8:00 AM – 8:00 PM <br />
                                        <span className="text-rose-600 font-bold uppercase text-xs tracking-wider">Emergency: 24 / 7</span>
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* Action Buttons Row */}
                        <div className="flex flex-wrap gap-4 pt-4">

                            {/* Get Directions Button */}
                            <button
                                onClick={handleDirections}
                                className="px-8 py-3.5 bg-[#8b006a] hover:bg-[#750059] text-white font-bold rounded-full text-[15px] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center gap-2.5"
                            >
                                <svg alt="Icon" className="w-5 h-5 text-white stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                                Get Directions
                            </button>

                            {/* WhatsApp Button */}
                            <button
                                onClick={handleWhatsApp}
                                className="px-8 py-3.5 bg-[#0e8f73] hover:bg-[#0b755e] text-white font-bold rounded-full text-[15px] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center gap-2.5"
                            >
                                <svg alt="Icon" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                                </svg>
                                WhatsApp Us
                            </button>

                        </div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}
