import React, { useState, useEffect } from "react";
import IPHeroSection from "@/components/InternationalPatients/IPHeroSection";
import IPServicesSection from "@/components/InternationalPatients/IPServicesSection";
import PlanYourTrip from "@/components/InternationalPatients/PlanYourTrip";
import IPSpecialtiesSection from "@/components/InternationalPatients/IPSpecialtiesSection";
import IPWhyChooseSection from "@/components/InternationalPatients/IPWhyChooseSection";
import MedicalOpinion from "@/components/InternationalPatients/MedicalOpinion";
import IPBranchesSection from "@/components/InternationalPatients/IPBranchesSection";
import IPCTASection from "@/components/InternationalPatients/IPCTASection";
import IPFAQSection from "@/components/InternationalPatients/IPFAQSection";
import IPAutoAppointmentModal from "@/components/InternationalPatients/IPAutoAppointmentModal";

export default function IPLandingPage() {
    const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
    const [modalCountry, setModalCountry] = useState("");
    const [modalCountryCode, setModalCountryCode] = useState("+00");
    const [modalLocation, setModalLocation] = useState("TX Hospitals Banjara Hills");

    const handleOpenModal = ({ country = "", countryCode = "+00", location = "TX Hospitals Banjara Hills" } = {}) => {
        setModalCountry(country);
        setModalCountryCode(countryCode);
        setModalLocation(location);
        setIsAppointmentModalOpen(true);
    };

    // Automatically trigger the Book Appointment popup on page land or refresh
    useEffect(() => {
        const timer = setTimeout(() => {
            handleOpenModal();
        }, 700);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-white">
            {/* Auto Book Appointment Popup on Page Land/Refresh */}
            <IPAutoAppointmentModal
                isOpen={isAppointmentModalOpen}
                onClose={() => setIsAppointmentModalOpen(false)}
                initialCountry={modalCountry}
                initialCountryCode={modalCountryCode}
                initialLocation={modalLocation}
            />

            {/* Step 1: Redesigned Hero Section with 4-Branches Carousel & Plan Journey CTA */}
            <IPHeroSection onOpenAppointmentModal={() => handleOpenModal()} />

            {/* Step 2: What We Offer - Our International Patient Services */}
            <IPServicesSection />

            {/* Step 3: Plan Your Travel (Kept same as requested) */}
            <PlanYourTrip />

            {/* Step 4: Our Specialties Grid with 14 Specialties & Direct Navigations */}
            <IPSpecialtiesSection />

            {/* Step 5: Why Choose TX Hospitals? (8 Features Dark Grid) */}
            <IPWhyChooseSection />

            {/* Step 6: Free Medical Opinion & Testimonials (Flag clicks trigger modal with country + dial code) */}
            <MedicalOpinion
                onSelectCountry={({ country, dialCode }) =>
                    handleOpenModal({ country, countryCode: dialCode })
                }
            />

            {/* Step 7: 4 Hospital Branches with Book Appointment Trigger */}
            <IPBranchesSection
                onBookNow={(loc) => handleOpenModal({ location: loc })}
            />

            {/* Step 8: Begin Your Journey CTA Section */}
            <IPCTASection onOpenAppointmentModal={() => handleOpenModal()} />

            {/* Step 9: Frequently Asked Questions (Initially all closed) */}
            <IPFAQSection />
        </div>
    );
}
