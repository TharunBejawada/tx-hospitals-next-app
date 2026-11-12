"use client";
import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import useIsMobile from "@/hooks/useIsMobile";
import { motion } from "framer-motion";

export default function CRContactUs() {
    const isMobile = useIsMobile();
    if (isMobile === null) return null;

    return (
        <section className={`bg-[#1a0810] text-white w-full ${isMobile ? 'py-12 px-6' : 'py-20 px-12 md:px-24'}`}>
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
                
                {/* Contact Information */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="w-full lg:w-1/2 flex flex-col justify-center"
                >
                    <h2 className={`font-serif mb-8 ${isMobile ? 'text-3xl' : 'text-5xl'} text-white`}>
                        How to <span className="text-pink-600">Contact Us</span>
                    </h2>
                    
                    <div className="flex flex-col gap-8 text-gray-300">
                        {/* Phone */}
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-pink-700/20 flex items-center justify-center flex-shrink-0">
                                <Phone className="w-6 h-6 text-pink-500" />
                            </div>
                            <div>
                                <h4 className="text-pink-500 font-bold uppercase tracking-wider text-sm mb-2">Call Us</h4>
                                <p className="text-lg">+91-7674014388</p>
                                <p className="text-lg">+91-6301433702</p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-pink-700/20 flex items-center justify-center flex-shrink-0">
                                <Mail className="w-6 h-6 text-pink-500" />
                            </div>
                            <div>
                                <h4 className="text-pink-500 font-bold uppercase tracking-wider text-sm mb-2">Reach Us @</h4>
                                <a href="mailto:Clinicalresearch1@txhospitals.in" className="text-lg hover:text-pink-400 transition-colors break-all">
                                    Clinicalresearch1@txhospitals.in
                                </a>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-pink-700/20 flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-6 h-6 text-pink-500" />
                            </div>
                            <div>
                                <h4 className="text-pink-500 font-bold uppercase tracking-wider text-sm mb-2">Location</h4>
                                <p className="text-base leading-relaxed">
                                    Clinical Research Department<br />
                                    TX Hospitals, 8-2-680, Raichandani Construction,<br />
                                    Road No. 112, Sri Ram Nagar Colony, Banjara Hills,<br />
                                    Hyderabad, Telangana - 500028
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Google Map */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="w-full lg:w-1/2 h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                >
                    <iframe
                        src="https://maps.google.com/maps?q=TX+Hospitals+-+Banjara+Hills,+Road+No.+112,+Sri+Ram+Nagar+Colony,+Banjara+Hills,+Hyderabad,+Telangana+500028&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="TX Hospitals Banjara Hills Map"
                    ></iframe>
                </motion.div>
                
            </div>
        </section>
    );
}
