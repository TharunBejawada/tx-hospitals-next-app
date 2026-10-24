import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { IoIosArrowUp } from "react-icons/io";
import HerniaHero from '@/components/Uppal/HerniaSurgery/HerniaHero';
import HerniaStats from '@/components/Uppal/HerniaSurgery/HerniaStats';
import HerniaDoctors from '@/components/Uppal/HerniaSurgery/HerniaDoctors';
import HerniaTestimonials from '@/components/Uppal/HerniaSurgery/HerniaTestimonials';
import HerniaTypes from '@/components/Uppal/HerniaSurgery/HerniaTypes';
import HerniaWhySurgery from '@/components/Uppal/HerniaSurgery/HerniaWhySurgery';
import HerniaProcedure from '@/components/Uppal/HerniaSurgery/HerniaProcedure';
import HerniaFinalCTA from '@/components/Uppal/HerniaSurgery/HerniaFinalCTA';
import HerniaFAQ from '@/components/Uppal/HerniaSurgery/HerniaFAQ';
import HerniaSimpleCTA from '@/components/Uppal/HerniaSurgery/HerniaSimpleCTA';
import HerniaFooter from '@/components/Uppal/HerniaSurgery/HerniaFooter';
import BookAppointmentForm from '@/components/Blogs/BookAppointemntForm';
import Breadcrumb from '@/components/Common/Breadcrumb';

const HerniaSurgeryPage = () => {
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
            name: "Hernia Specialist",
            department: "Hernia Surgery",
            id: "hernia-general"
        });
        setIsModalOpen(true);
    };

    return (
        <>
            <Head>
                <title>Hernia Surgery in Uppal, Hyderabad</title>
                <meta name="description" content="Looking for hernia surgery in Uppal? TX Hospitals offers expert laparoscopic hernia repair, same-day discharge & with post surgery support. Consult today." />
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
                        { label: "Hernia Surgery" }
                    ]} />
                </div>
                {/* 1. Hero Section */}
                <HerniaHero onBookClick={() => handleBookAppointment()} />

                {/* 2. Stats Section */}
                <HerniaStats />

                {/* 3. Doctors Section */}
                <HerniaDoctors onBookClick={(doctor) => handleBookAppointment(doctor)} />

                {/* 4. Testimonials Section */}
                <HerniaTestimonials />

                {/* 5. Types Section */}
                <HerniaTypes onBookClick={() => handleBookAppointment()} />

                {/* 6. Why Surgery Section */}
                <HerniaWhySurgery onBookClick={() => handleBookAppointment()} />

                {/* 7. Procedure Section */}
                <HerniaProcedure onBookClick={() => handleBookAppointment()} />

                {/* 8. Final CTA Section */}
                <HerniaFinalCTA onBookClick={() => handleBookAppointment()} />

                {/* 9. FAQ Section */}
                <HerniaFAQ />

                {/* 10. Simple CTA Section */}
                <HerniaSimpleCTA onBookClick={() => handleBookAppointment()} />
            </main>

            {/* 11. Footer Section */}
            <HerniaFooter />

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

export default HerniaSurgeryPage;
