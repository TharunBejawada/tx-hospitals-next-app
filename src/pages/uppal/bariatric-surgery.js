import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { IoIosArrowUp } from "react-icons/io";
import BariatricHero from '@/components/Uppal/BariatricSurgery/BariatricHero';
import BariatricStats from '@/components/Uppal/BariatricSurgery/BariatricStats';
import BariatricTransformations from '@/components/Uppal/BariatricSurgery/BariatricTransformations';
import BariatricAdvantages from '@/components/Uppal/BariatricSurgery/BariatricAdvantages';
import BariatricWhyChoose from '@/components/Uppal/BariatricSurgery/BariatricWhyChoose';
import BariatricDoctors from '@/components/Uppal/BariatricSurgery/BariatricDoctors';
import BariatricScience from '@/components/Uppal/BariatricSurgery/BariatricScience';
import BariatricCTA from '@/components/Uppal/BariatricSurgery/BariatricCTA';
import BariatricFAQ from '@/components/Uppal/BariatricSurgery/BariatricFAQ';
import BariatricFooter from '@/components/Uppal/BariatricSurgery/BariatricFooter';
import SocialSidebar from '@/components/HomePage/SocialSidebar';
import BookAppointmentForm from '@/components/Blogs/BookAppointemntForm';
import Breadcrumb from '@/components/Common/Breadcrumb';

const BariatricSurgeryPage = () => {
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
            name: "Bariatric Surgery Specialist",
            department: "Bariatric Surgery",
            id: "bariatric-general"
        });
        setIsModalOpen(true);
    };

    const heroData = {
        badge: "The Only Bariatric Hospital in Uppal",
        title: "Bariatric Weight Loss Surgery in Uppal",
        subtitle: "The only bariatric hospital in Uppal. Trusted by thousands of patients across Hyderabad.",
        features: [
            "Only bariatric hospital in Uppal",
            "25+ Years experienced bariatric surgeons",
            "Minimally invasive procedures",
            "Faster recovery and comfort",
            "All insurances accepted",
            "No Cost EMI available"
        ],
        buttonText: "Get a Free Second Opinion",
        onBookClick: () => handleBookAppointment()
    };

    return (
        <>
            <Head>
                <title>Bariatric Surgery in Uppal, Hyderabad | TX Hospitals</title>
                <meta name="description" content="TX Hospitals is the only dedicated bariatric hospital in Uppal with 25+ years of experienced surgeons, and minimally invasive procedures. Book now." />
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
                        { label: "Bariatric Surgery" }
                    ]} />
                </div>
                {/* Hero Section */}
                <BariatricHero {...heroData} />

                {/* Stats Section */}
                <BariatricStats />

                {/* Transformations Section */}
                <BariatricTransformations />

                {/* Advantages Section */}
                <BariatricAdvantages onBookClick={handleBookAppointment} />

                {/* Why Choose Section */}
                <BariatricWhyChoose onBookClick={handleBookAppointment} />

                {/* Science Section */}
                <BariatricScience onBookClick={handleBookAppointment} />

                {/* CTA Banner */}
                <BariatricCTA onBookClick={handleBookAppointment} />

                {/* Doctors Section */}
                <BariatricDoctors onBookClick={handleBookAppointment} />

                {/* FAQ Section */}
                <BariatricFAQ onBookClick={handleBookAppointment} />
            </main>

            <BariatricFooter onBookClick={handleBookAppointment} />

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
                    className="fixed bottom-4 right-4 md:bottom-8 md:right-8 bg-pink-700 text-white p-2 md:p-3 rounded-full shadow-2xl hover:bg-pink-800 transition-all transform hover:scale-110 z-[60] flex items-center justify-center border-2 border-white/20"
                >
                    <IoIosArrowUp className="w-5 h-5 md:w-6 md:h-6" />
                </button>
            )}
        </>
    );
};

export default BariatricSurgeryPage;
