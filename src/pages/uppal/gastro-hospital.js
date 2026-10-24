import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { IoIosArrowUp } from "react-icons/io";
import GastroHero from '@/components/Uppal/GastroHospital/GastroHero';
import GastroStats from '@/components/Uppal/GastroHospital/GastroStats';
import GastroConditions from '@/components/Uppal/GastroHospital/GastroConditions';
import GastroVideos from '@/components/Uppal/GastroHospital/GastroVideos';
import GastroSimpleCTA from '@/components/Uppal/GastroHospital/GastroSimpleCTA';
import GastroDoctors from '@/components/Uppal/GastroHospital/GastroDoctors';
import GastroWhyTX from '@/components/Uppal/GastroHospital/GastroWhyTX';
import GastroFAQ from '@/components/Uppal/GastroHospital/GastroFAQ';
import GastroFinalCTA from '@/components/Uppal/GastroHospital/GastroFinalCTA';
import GastroFooter from '@/components/Uppal/GastroHospital/GastroFooter';
import BookAppointmentForm from '@/components/Blogs/BookAppointemntForm';
import Breadcrumb from '@/components/Common/Breadcrumb';

const GastroHospitalPage = () => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollButton(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBookAppointment = (doctor = null) => {
        setSelectedDoctor(doctor || {
            name: "Gastro Specialist",
            department: "Gastroenterology",
            id: "gastro-general"
        });
        setIsModalOpen(true);
    };

    return (
        <>
            <Head>
                <title>Best Gastroenterology Hospital in Uppal, Hyderabad</title>
                <meta name="description" content="TX Hospitals is Uppal's trusted gastroenterology hospital, located near the bus stop. Expert treatment for digestive, liver & GI conditions. Consult today." />
            </Head>

            {/* Header with Logo Only */}
            <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm py-3 px-6 md:px-12 flex justify-between items-center transition-all">
                <Image
                    src="/assets/Header/Logo.png"
                    alt="TX Hospitals"
                    width={100}
                    height={40}
                    className="w-14 md:w-20 h-auto cursor-pointer"
                    onClick={() => router.push("/")}
                />
            </header>

            <main className="pt-16 md:pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-1">
                    <Breadcrumb items={[
                        { label: "Home", href: "/" },
                        { label: "Uppal", href: "/uppal" },
                        { label: "Gastroenterology" }
                    ]} />
                </div>
                {/* 1. Hero Section */}
                <GastroHero onBookClick={() => handleBookAppointment()} />

                {/* 2. Stats Section */}
                <GastroStats />

                {/* 3. Conditions Section */}
                <GastroConditions onBookClick={() => handleBookAppointment()} />

                {/* 4. Videos Section */}
                <GastroVideos onBookClick={() => handleBookAppointment()} />

                {/* 5. Simple CTA Section */}
                <GastroSimpleCTA onBookClick={() => handleBookAppointment()} />

                {/* 6. Doctors Section */}
                <GastroDoctors onBookClick={(doctor) => handleBookAppointment(doctor)} />

                {/* 7. Why Section */}
                <GastroWhyTX onBookClick={() => handleBookAppointment()} />

                {/* 8. FAQs */}
                <GastroFAQ />

                {/* 9. Final CTA Section */}
                <GastroFinalCTA onBookClick={() => handleBookAppointment()} />
            </main>

            {/* Footer */}
            <GastroFooter />

            {isModalOpen && (
                <BookAppointmentForm
                    showModal={isModalOpen}
                    setShowModal={setIsModalOpen}
                    redirectUrl="/thank-you-uppal"
                    defaultLocation="TX Hospitals Uppal"
                />
            )}

            {/* Scroll to Top Button */}
            {showScrollButton && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-4 right-4 md:bottom-8 md:right-8 bg-[#be185d] text-white p-2 md:p-3 rounded-full shadow-2xl hover:bg-[#a2144e] transition-all transform hover:scale-110 z-[60] flex items-center justify-center border-2 border-white/20"
                >
                    <IoIosArrowUp className="w-5 h-5 md:w-6 md:h-6" />
                </button>
            )}
        </>
    );
};

export default GastroHospitalPage;
