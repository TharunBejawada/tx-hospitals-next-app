import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import useIsMobile from "@/hooks/useIsMobile";
import { FaWhatsapp, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { useNavigationConfig } from "@/context/NavigationConfigContext";

export default function CallbackFooterSection() {
    const [footerData, setFooterData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);

    const router = useRouter();
    const isMobile = useIsMobile();
    const { getLinkTarget } = useNavigationConfig();

    useEffect(() => {
        const fetchFooter = async () => {
            try {
                const res = await fetch("https://api.txhospitals.vgworld.in/footer/get");
                const data = await res.json();
                setFooterData(data[0]);
            } catch (err) {
                console.error("Footer fetch failed:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchFooter();
    }, []);

    const handleSendOTP = () => setOtpSent(true);
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Form submitted!");
    };

    const sortByPriority = (a, b) => {
        const aPriority = parseInt(a.priority || "999", 10);
        const bPriority = parseInt(b.priority || "999", 10);
        return aPriority - bPriority;
    };

    const handleNavigation = (urlPath) => {
        if (urlPath && urlPath.trim() !== "") {
            const target = getLinkTarget(urlPath);
            if (target === "_blank") {
                if (typeof window !== "undefined") {
                    window.open(urlPath, "_blank", "noopener,noreferrer");
                }
            } else {
                router.push(urlPath);
            }
        }
    };

    return (
        <>
            {isMobile ? (
                <div className="relative">
                    <footer className="w-full bg-[#7b1642] text-white py-10 px-6 relative z-5 border-t border-white/10 font-inter">
                        <div className="grid grid-cols-2 gap-8 text-xs">
                            {loading ? (
                                <p className="col-span-2 text-center text-white/50 animate-pulse">Loading footer details...</p>
                            ) : (
                                <>
                                    {/* About */}
                                    <div>
                                        <h4 className="text-base font-bold uppercase tracking-wider mb-3 border-b-2 border-pink-700/50 pb-1.5 w-fit">About</h4>
                                        <ul className="space-y-2">
                                            {footerData?.about
                                                ?.sort(sortByPriority)
                                                .map((item, idx) => (
                                                    <li
                                                        key={idx}
                                                        onClick={() => handleNavigation(item.urlPath)}
                                                        className={`hover:underline hover:text-pink-300 transition-colors cursor-pointer ${item.urlPath ? "" : "opacity-70 cursor-default"
                                                            }`}
                                                    >
                                                        {item.title}
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>

                                    {/* Specialties */}
                                    <div>
                                        <h4 className="text-base font-bold uppercase tracking-wider mb-3 border-b-2 border-pink-700/50 pb-1.5 w-fit">Specialties</h4>
                                        <ul className="space-y-2">
                                            {footerData?.specialities
                                                ?.sort(sortByPriority)
                                                .map((item, idx) => (
                                                    <li
                                                        key={idx}
                                                        onClick={() => handleNavigation(item.urlPath)}
                                                        className={`hover:underline hover:text-pink-300 transition-colors cursor-pointer ${item.urlPath ? "" : "opacity-70 cursor-default"
                                                            }`}
                                                    >
                                                        {item.title}
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>

                                    {/* Doctors */}
                                    <div>
                                        <h4 className="text-base font-bold uppercase tracking-wider mb-3 border-b-2 border-pink-700/50 pb-1.5 w-fit">Doctors</h4>
                                        <ul className="space-y-2">
                                            {footerData?.doctors?.map((item, idx) => (
                                                <li
                                                    key={idx}
                                                    onClick={() => handleNavigation(item.urlPath)}
                                                    className={`hover:underline hover:text-pink-300 transition-colors cursor-pointer ${item.urlPath ? "" : "opacity-70 cursor-default"
                                                        }`}
                                                >
                                                    {item.title}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Library (Mobile collapse layout) */}
                                    <div>
                                        <h4 className="text-base font-bold uppercase tracking-wider mb-3 border-b-2 border-pink-700/50 pb-1.5 w-fit">Library</h4>
                                        {Object.keys(footerData?.library || {})
                                            .slice(0, 4)
                                            .map((key, idx) => (
                                                <div key={idx} className="mb-3">
                                                    <h5 className="text-xs font-bold text-pink-300 mb-1">{key}</h5>
                                                    <ul className="space-y-1">
                                                        {footerData.library[key]?.map((item, i) => (
                                                            <li
                                                                key={i}
                                                                onClick={() => handleNavigation(item.urlPath)}
                                                                className={`hover:underline hover:text-pink-200 transition-colors cursor-pointer ${item.urlPath
                                                                    ? ""
                                                                    : "opacity-70 cursor-default"
                                                                    }`}
                                                            >
                                                                {item.title}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                    </div>
                                </>
                            )}
                        </div>
                        
                        {/* Social Media Bar Mobile */}
                        {!loading && (
                            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col items-center">
                                <div className="flex space-x-3 mb-4">
                                    <a href="https://wa.me/919144514459" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md hover:bg-[#25D366] hover:text-white text-[#25D366] transition-all duration-300">
                                        <FaWhatsapp size={16} />
                                    </a>
                                    <a href="https://www.facebook.com/txhospitals" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md hover:bg-[#1877F2] hover:text-white text-[#1877F2] transition-all duration-300">
                                        <FaFacebookF size={16} />
                                    </a>
                                    <a href="https://www.instagram.com/txhospitals/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md hover:bg-[#E4405F] hover:text-white text-[#E4405F] transition-all duration-300">
                                        <FaInstagram size={16} />
                                    </a>
                                    <a href="https://www.linkedin.com/company/tx-hospitals/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md hover:bg-[#0A66C2] hover:text-white text-[#0A66C2] transition-all duration-300">
                                        <FaLinkedinIn size={16} />
                                    </a>
                                    <a href="https://x.com/txhospitals" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md hover:bg-black hover:text-white text-black transition-all duration-300">
                                        <FaXTwitter size={16} />
                                    </a>
                                    <a href="https://www.youtube.com/@txhospitalsofficial" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md hover:bg-[#FF0000] hover:text-white text-[#FF0000] transition-all duration-300">
                                        <FaYoutube size={16} />
                                    </a>
                                </div>
                                <p className="text-white/60 text-xs text-center">
                                    &copy; {new Date().getFullYear()} TX Hospitals. All rights reserved.
                                </p>
                            </div>
                        )}
                    </footer>
                </div>
            ) : (
                <div className="relative w-full">
                    <footer className="w-full bg-[#7b1642] text-white py-16 px-8 md:px-16 lg:px-24 relative z-5 border-t border-white/10 font-inter">
                        {loading ? (
                            <p className="text-center text-white/50 animate-pulse text-lg">Loading footer details...</p>
                        ) : (
                            <>
                                {/* Row 1: Primary Navigation (4 Columns) */}
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 w-full">
                                    {/* Column 1: About */}
                                    <div className="flex flex-col">
                                        <h4 className="text-lg font-bold uppercase tracking-wider mb-5 border-b-2 border-pink-700/50 pb-2 w-fit">About</h4>
                                        <ul className="space-y-2">
                                            {footerData?.about
                                                ?.sort(sortByPriority)
                                                .map((item, idx) => (
                                                    <li
                                                        key={idx}
                                                        onClick={() => handleNavigation(item.urlPath)}
                                                        className={`text-white/80 hover:text-white hover:translate-x-1.5 transition-all duration-300 cursor-pointer text-sm font-medium ${item.urlPath ? "" : "opacity-70 cursor-default hover:translate-x-0"
                                                            }`}
                                                    >
                                                        {item.title}
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>

                                    {/* Column 2: Specialties */}
                                    <div className="flex flex-col">
                                        <h4 className="text-lg font-bold uppercase tracking-wider mb-5 border-b-2 border-pink-700/50 pb-2 w-fit">Specialties</h4>
                                        <ul className="space-y-2">
                                            {footerData?.specialities
                                                ?.sort(sortByPriority)
                                                .map((item, idx) => (
                                                    <li
                                                        key={idx}
                                                        onClick={() => handleNavigation(item.urlPath)}
                                                        className={`text-white/80 hover:text-white hover:translate-x-1.5 transition-all duration-300 cursor-pointer text-sm font-medium ${item.urlPath ? "" : "opacity-70 cursor-default hover:translate-x-0"
                                                            }`}
                                                    >
                                                        {item.title}
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>

                                    {/* Column 3: Doctors */}
                                    <div className="flex flex-col">
                                        <h4 className="text-lg font-bold uppercase tracking-wider mb-5 border-b-2 border-pink-700/50 pb-2 w-fit">Doctors</h4>
                                        <ul className="space-y-2">
                                            {footerData?.doctors?.map((item, idx) => (
                                                <li
                                                    key={idx}
                                                    onClick={() => handleNavigation(item.urlPath)}
                                                    className={`text-white/80 hover:text-white hover:translate-x-1.5 transition-all duration-300 cursor-pointer text-sm font-medium ${item.urlPath ? "" : "opacity-70 cursor-default hover:translate-x-0"
                                                        }`}
                                                >
                                                    {item.title}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Column 4: Health Library (Group A - Categories 0 to 2) */}
                                    <div className="flex flex-col">
                                        <h4 className="text-lg font-bold uppercase tracking-wider mb-5 border-b-2 border-pink-700/50 pb-2 w-fit">Library</h4>
                                        {Object.keys(footerData?.library || {})
                                            .slice(0, 2)
                                            .map((key, idx) => (
                                                <div key={idx} className="mb-5 last:mb-0">
                                                    <h5 className="text-sm font-bold text-pink-300 mb-2 uppercase tracking-wide">{key}</h5>
                                                    <ul className="space-y-1.5">
                                                        {footerData.library[key]?.map((item, i) => (
                                                            <li
                                                                key={i}
                                                                onClick={() => handleNavigation(item.urlPath)}
                                                                className={`text-white/70 hover:text-white hover:translate-x-1.5 transition-all duration-300 cursor-pointer text-xs font-medium ${item.urlPath
                                                                    ? ""
                                                                    : "opacity-70 cursor-default hover:translate-x-0"
                                                                    }`}
                                                            >
                                                                {item.title}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                    </div>
                                </div>

                                {/* Premium Modern Glassmorphic Divider */}
                                <div className="w-full h-[1px] bg-white/10 my-10" />

                                {/* Row 2: Secondary Deep Library (4 Columns) */}
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 w-full">
                                    {/* Column 1: Health Library (Group B - Categories 2 to 4) */}
                                    <div className="flex flex-col">
                                        {Object.keys(footerData?.library || {})
                                            .slice(2, 4)
                                            .map((key, idx) => (
                                                <div key={idx} className="mb-5 last:mb-0">
                                                    <h5 className="text-sm font-bold text-pink-300 mb-2 uppercase tracking-wide">{key}</h5>
                                                    <ul className="space-y-1.5">
                                                        {footerData.library[key]?.map((item, i) => (
                                                            <li
                                                                key={i}
                                                                onClick={() => handleNavigation(item.urlPath)}
                                                                className={`text-white/70 hover:text-white hover:translate-x-1.5 transition-all duration-300 cursor-pointer text-xs font-medium ${item.urlPath
                                                                    ? ""
                                                                    : "opacity-70 cursor-default hover:translate-x-0"
                                                                    }`}
                                                            >
                                                                {item.title}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                    </div>

                                    {/* Column 2: Health Library (Group C - Categories 4 to 6) */}
                                    <div className="flex flex-col">
                                        {Object.keys(footerData?.library || {})
                                            .slice(4, 6)
                                            .map((key, idx) => (
                                                <div key={idx} className="mb-5 last:mb-0">
                                                    <h5 className="text-sm font-bold text-pink-300 mb-2 uppercase tracking-wide">{key}</h5>
                                                    <ul className="space-y-1.5">
                                                        {footerData.library[key]?.map((item, i) => (
                                                            <li
                                                                key={i}
                                                                onClick={() => handleNavigation(item.urlPath)}
                                                                className={`text-white/70 hover:text-white hover:translate-x-1.5 transition-all duration-300 cursor-pointer text-xs font-medium ${item.urlPath
                                                                    ? ""
                                                                    : "opacity-70 cursor-default hover:translate-x-0"
                                                                    }`}
                                                            >
                                                                {item.title}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                    </div>

                                    {/* Column 3: Health Library (Group D - Categories 6 to 8) */}
                                    <div className="flex flex-col">
                                        {Object.keys(footerData?.library || {})
                                            .slice(6, 8)
                                            .map((key, idx) => (
                                                <div key={idx} className="mb-5 last:mb-0">
                                                    <h5 className="text-sm font-bold text-pink-300 mb-2 uppercase tracking-wide">{key}</h5>
                                                    <ul className="space-y-1.5">
                                                        {footerData.library[key]?.map((item, i) => (
                                                            <li
                                                                key={i}
                                                                onClick={() => handleNavigation(item.urlPath)}
                                                                className={`text-white/70 hover:text-white hover:translate-x-1.5 transition-all duration-300 cursor-pointer text-xs font-medium ${item.urlPath
                                                                    ? ""
                                                                    : "opacity-70 cursor-default hover:translate-x-0"
                                                                    }`}
                                                            >
                                                                {item.title}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                    </div>

                                    {/* Column 4: Health Library (Group E - Categories 8+) */}
                                    <div className="flex flex-col">
                                        {Object.keys(footerData?.library || {})
                                            .slice(8)
                                            .map((key, idx) => (
                                                <div key={idx} className="mb-5 last:mb-0">
                                                    <h5 className="text-sm font-bold text-pink-300 mb-2 uppercase tracking-wide">{key}</h5>
                                                    <ul className="space-y-1.5">
                                                        {footerData.library[key]?.map((item, i) => (
                                                            <li
                                                                key={i}
                                                                onClick={() => handleNavigation(item.urlPath)}
                                                                className={`text-white/70 hover:text-white hover:translate-x-1.5 transition-all duration-300 cursor-pointer text-xs font-medium ${item.urlPath
                                                                    ? ""
                                                                    : "opacity-70 cursor-default hover:translate-x-0"
                                                                    }`}
                                                            >
                                                                {item.title}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                                
                                {/* Social Media Bar */}
                                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
                                    <p className="text-white/60 text-sm mb-4 md:mb-0">
                                        &copy; {new Date().getFullYear()} TX Hospitals. All rights reserved.
                                    </p>
                                    <div className="flex space-x-3">
                                        <a href="https://wa.me/919144514459" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-[#25D366] hover:text-white text-[#25D366] transition-all duration-300 transform hover:scale-110">
                                            <FaWhatsapp size={20} />
                                        </a>
                                        <a href="https://www.facebook.com/txhospitals" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-[#1877F2] hover:text-white text-[#1877F2] transition-all duration-300 transform hover:scale-110">
                                            <FaFacebookF size={20} />
                                        </a>
                                        <a href="https://www.instagram.com/txhospitals/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-[#E4405F] hover:text-white text-[#E4405F] transition-all duration-300 transform hover:scale-110">
                                            <FaInstagram size={20} />
                                        </a>
                                        <a href="https://www.linkedin.com/company/tx-hospitals/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-[#0A66C2] hover:text-white text-[#0A66C2] transition-all duration-300 transform hover:scale-110">
                                            <FaLinkedinIn size={20} />
                                        </a>
                                        <a href="https://x.com/txhospitals" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-black hover:text-white text-black transition-all duration-300 transform hover:scale-110">
                                            <FaXTwitter size={20} />
                                        </a>
                                        <a href="https://www.youtube.com/@txhospitalsofficial" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-[#FF0000] hover:text-white text-[#FF0000] transition-all duration-300 transform hover:scale-110">
                                            <FaYoutube size={20} />
                                        </a>
                                    </div>
                                </div>
                            </>
                        )}
                    </footer>
                </div>
            )}
        </>
    );
}
