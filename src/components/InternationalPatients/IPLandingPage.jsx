import React from "react";
import IPHeroSection from "@/components/InternationalPatients/IPHeroSection";
import IPServicesSection from "@/components/InternationalPatients/IPServicesSection";
import PlanYourTrip from "@/components/InternationalPatients/PlanYourTrip";
import IPSpecialtiesSection from "@/components/InternationalPatients/IPSpecialtiesSection";
import IPWhyChooseSection from "@/components/InternationalPatients/IPWhyChooseSection";
import MedicalOpinion from "@/components/InternationalPatients/MedicalOpinion";
import IPBranchesSection from "@/components/InternationalPatients/IPBranchesSection";
import IPCTASection from "@/components/InternationalPatients/IPCTASection";
import IPFAQSection from "@/components/InternationalPatients/IPFAQSection";

export default function IPLandingPage() {
    return (
        <div className="bg-white">
            {/* Step 1: Redesigned Hero Section with 4-Branches Carousel & Overlapping Enquiry Form */}
            <IPHeroSection />

            {/* Step 2: What We Offer - Our International Patient Services */}
            <IPServicesSection />

            {/* Step 3: Plan Your Travel (Kept same as requested) */}
            <PlanYourTrip />

            {/* Step 4: Our Specialties Grid with 14 Specialties & Direct Navigations */}
            <IPSpecialtiesSection />

            {/* Step 5: Why Choose TX Hospitals? (8 Features Dark Grid) */}
            <IPWhyChooseSection />

            {/* Step 6: Free Medical Opinion, Testimonials & Query Form with Searchable Dropdowns */}
            <MedicalOpinion />

            {/* Step 7: 4 Hospital Branches (Banjara Hills, Uppal, Kachiguda, Miyapur) with Book Appointment Trigger */}
            <IPBranchesSection />

            {/* Step 8: Begin Your Journey CTA Section */}
            <IPCTASection />

            {/* Step 9: Frequently Asked Questions (Initially all closed) */}
            <IPFAQSection />
        </div>
    );
}
