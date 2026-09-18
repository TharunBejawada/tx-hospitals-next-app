"use client";
import { useSearchParams } from "next/navigation";
import useIsMobile from "@/hooks/useIsMobile";
import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Home, User, Phone, Mail } from "lucide-react";

export default function ThankYouPage() {
    const isMobile = useIsMobile();
    const searchParams = useSearchParams();

    const name = searchParams.get("name");
    const mobile = searchParams.get("mobile");
    const email = searchParams.get("email");
    const isAppointment = name && mobile && email;

    useEffect(() => {
        window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    }, []);

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-6 bg-gray-50/50">
            {isAppointment ? (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
                >
                    {/* Header Banner */}
                    <div className="bg-pink-700 p-8 text-center relative overflow-hidden">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                            className="relative z-10 w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center shadow-lg"
                        >
                            <img src="/assets/FYD/Thank You Icon.png" className="w-10 h-10 object-contain" alt="Success" />
                        </motion.div>
                        <div className="absolute top-0 left-0 w-full h-full opacity-10">
                            <svg className="w-full h-full" alt="Image" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <circle cx="10" cy="10" r="20" fill="white" />
                                <circle cx="90" cy="80" r="15" fill="white" />
                            </svg>
                        </div>
                    </div>

                    <div className="p-8 text-center">
                        <h2 className="text-xl font-semibold text-gray-800">Thank you!</h2>
                        <p className="text-gray-500 text-sm">for choosing us</p>
                        <p className="text-lg font-medium text-gray-700 mt-2">Your appointment has been Confirmed</p>

                        <div className="mt-8 space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <div className="flex items-center justify-between text-left">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-pink-700">
                                        <User size={16} />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-500">Name</span>
                                </div>
                                <span className="text-gray-900 font-bold text-sm ">{name}</span>
                            </div>

                            <div className="flex items-center justify-between text-left">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-pink-700">
                                        <Phone size={16} />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-500">Phone</span>
                                </div>
                                <span className="text-gray-900 font-bold text-sm ">{mobile}</span>
                            </div>

                            <div className="flex items-center justify-between text-left">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-pink-700">
                                        <Mail size={16} />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-500">Email</span>
                                </div>
                                <span className="text-gray-900 font-bold text-sm  truncate ml-4">{email}</span>
                            </div>
                        </div>

                        <Link href="/" className="mt-8 flex items-center justify-center gap-2 w-full bg-pink-700 hover:bg-pink-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95 text-sm uppercase tracking-widest">
                            <Home size={18} />
                            Go to Homepage
                        </Link>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center px-6"
                >
                    <div className="mb-6 flex justify-center">
                        <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center">
                            <CheckCircle size={48} className="text-pink-700" />
                        </div>
                    </div>

                    <h1 className={`${isMobile ? 'text-5xl' : 'text-7xl'} font-bold text-pink-700 mb-4 er`}>
                        Thank You
                    </h1>
                    <p className={`${isMobile ? 'text-2xl' : 'text-5xl'} font-semibold text-black mb-8 leading-tight`}>
                        Your form submitted successfully
                    </p>

                    <Link href="/" className="inline-flex items-center gap-2 bg-pink-700 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-pink-800 transition-all shadow-xl active:scale-95">
                        <Home size={20} />
                        Home
                    </Link>
                </motion.div>
            )}
        </div>
    );
}
