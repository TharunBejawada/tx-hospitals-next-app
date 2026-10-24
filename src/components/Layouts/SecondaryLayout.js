import React, { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import HospitalNavbar from '@/components/HomePage/HospitalNavbar';
import CallbackFooterSection from '@/components/HomePage/CallbackFooterSection';
import SocialSidebar from '@/components/HomePage/SocialSidebar';
import CRContactUs from '@/components/ClinicalResearch/CRContactUs';
import useIsMobile from "@/hooks/useIsMobile";

export default function SecondaryLayout({ children, hideFooter = false, isClinicalResearch = false }) {

    const [showButton, setShowButton] = useState(false);
    const isMobile = useIsMobile();

    useEffect(() => {
        const handleScroll = () => {
            setShowButton(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            <HospitalNavbar
                variant="secondary"
            />
            <SocialSidebar isClinicalResearch={isClinicalResearch} />
            <main className="pt-20 md:pt-32">
                {children}
            </main>
            {!hideFooter && !isClinicalResearch && <CallbackFooterSection />}
            {!hideFooter && isClinicalResearch && <CRContactUs />}
            {showButton && (
                <button
                    onClick={scrollToTop}
                    className={`fixed right-2 bg-pink-700 text-white rounded-full shadow-lg hover:bg-pink-800 transition-all flex items-center justify-center z-50 ${isMobile ? 'bottom-20 p-2' : 'bottom-2 p-3'}`}
                >
                    <IoIosArrowUp size={24} />
                </button>
            )}
        </>
    );
}
