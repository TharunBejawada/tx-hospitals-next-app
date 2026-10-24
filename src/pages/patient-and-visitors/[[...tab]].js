import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import SecondaryLayout from "@/components/Layouts/SecondaryLayout";
import useIsMobile from "@/hooks/useIsMobile";
import Breadcrumb from "@/components/Common/Breadcrumb";

// Importing components
// import InPatients from "@/components/Patients&Visitors/In-Patients";
import PatientsGuidelines from "@/components/Patients&Visitors/PatientsGuidelines";
// import RoomsFacilities from "@/components/Patients&Visitors/RoomsFacilities";
import VisitorsGuidelines from "@/components/Patients&Visitors/VisitorsGuidelines";
// import InternationalPatients from "@/components/Patients&Visitors/InternationalPatients";
// import Insurance from "@/components/Patients&Visitors/Insurance";

const PatientVisitorsPage = () => {
    const isMobile = useIsMobile();
    const router = useRouter();
    const { tab } = router.query;
    const [selectedTab, setSelectedTab] = useState("");

    useEffect(() => {
        if (tab) {
            // Next.js catch-all route returns an array
            const currentTab = Array.isArray(tab) ? tab[0] : tab;
            setSelectedTab(currentTab || "");
        } else {
            setSelectedTab("");
        }
    }, [tab]);

    useEffect(() => {
        // Scroll to top on tab change, similar to the original React code's window.scrollTo
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [selectedTab]);

    const handleTabClick = (key) => {
        // Ensure path starts with / and ends correctly for Next.js routing
        const path = key ? `/patient-and-visitors/${key}` : `/patient-and-visitors`;
        router.push(path, undefined, { shallow: true });
    };

    const tabs = [
        { name: "Patient's Guidelines", key: "" },
        { name: "Visitor's Guidelines", key: "visitors" },
        // { name: "In-Patient", key: "in-patient" },
        // { name: "Rooms's Facilities & Services", key: "rooms" },
        // { name: "Insurance", key: "insurance" },
        // { name: "International Patients Services", key: "international-patients" }
    ];

    const BannerSection = () => (
        <div className={`relative w-full overflow-hidden shadow-2xl ${isMobile ? "h-24 -mt-6 mb-5" : "max-w-[1180px] mx-auto h-[200px] mb-10 rounded-3xl mt-6"}`}>
            {/* Base Image */}
            <img
                loading="lazy"
                src="/assets/patient-visitors/Banner Box Image.png"
                alt="Banner Box"
                className="w-full h-full object-cover"
            />
            {/* Layered Content Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
                <h1 className={`text-white font-sans font-bold text-center px-4 tracking-wide uppercase transition-all duration-700 ${isMobile ? "text-xl" : "text-4xl md:text-5xl lg:text-7xl"}`}>
                    THERAPY FOR EVERY ILLNESS
                </h1>
            </div>
        </div>
    );

    return (
        <SecondaryLayout>
            <Head>
                <title>Patient & Visitors Guidelines | TX Hospitals</title>
                <meta name="description" content="Important guidelines for patients and visitors at TX Hospitals. Find information on in-patient services, insurance, and more." />
            </Head>

            <div className="min-h-screen bg-gray-50 pb-10">
                <div className="max-w-[1180px] mx-auto px-4 pt-4 pb-2">
                    <Breadcrumb items={[
                        { label: "Home", href: "/" },
                        { label: "Patient & Visitors", href: "/patient-and-visitors" },
                        ...(selectedTab ? [{ label: selectedTab === "visitors" ? "Visitor's Guidelines" : selectedTab }] : [])
                    ]} />
                </div>
                <BannerSection />

                {/* Navigation Controls */}
                <div className="container mx-auto px-4 mb-5">
                    <div className={`
                        flex flex-wrap items-center justify-center gap-2 md:gap-4
                        ${isMobile ? "grid grid-cols-2" : ""}
                    `}>
                        {tabs.map(({ name, key }) => (
                            <button
                                key={key}
                                onClick={() => handleTabClick(key)}
                                className={`
                                    relative overflow-hidden transition-all duration-300 font-semibold px-4 py-2 md:px-6 md:py-2.5 rounded-full border border-gray-800
                                    ${isMobile ? "text-[10px] py-2" : "text-base lg:text-lg"}
                                    ${selectedTab === key
                                        ? "bg-pink-700 text-white border-pink-700 shadow-lg scale-105"
                                        : "bg-transparent text-black hover:bg-pink-700 hover:text-white hover:border-pink-700 shadow-sm"}
                                `}
                            >
                                {name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Section */}
                <main className="container mx-auto px-4 max-w-7xl animate-fadeIn">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
                        {selectedTab === "" && <PatientsGuidelines />}
                        {selectedTab === "visitors" && <VisitorsGuidelines />}
                        {/* {selectedTab === "in-patient" && <InPatients />}
                        {selectedTab === "rooms" && <RoomsFacilities />}
                        {selectedTab === "insurance" && <Insurance />}
                        {selectedTab === "international-patients" && <InternationalPatients />} */}
                    </div>
                </main>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>
        </SecondaryLayout>
    );
};

export default PatientVisitorsPage;
