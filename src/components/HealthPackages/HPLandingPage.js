"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import useIsMobile from "@/hooks/useIsMobile";
import CONFIG from "@/config";
import HealthPackageCard from "@/components/HealthPackages/HealthPackageCard";
import WhyChooseHealthPackages from "@/components/HealthPackages/WhyChooseHealthPackages";
import Breadcrumb from "@/components/Common/Breadcrumb";
import BookAppointmentForm from "@/components/Blogs/BookAppointemntForm";

export default function HPLandingPage({ initialPackages = null }) {

    const isMobile = useIsMobile();
    const [active, setActive] = useState("All Packages");
    const hasInitial = Array.isArray(initialPackages) && initialPackages.length > 0;
    const [packages, setPackages] = useState(hasInitial ? initialPackages : []);
    const [loading, setLoading] = useState(!hasInitial);
    const [showModal, setShowModal] = useState(false);

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Health Packages" },
    ];

    const filters = [
        "All Packages",
        "Basic",
        "Comprehensive",
        "Executive",
    ];

    useEffect(() => {
        if (hasInitial) {
            setLoading(false);
            return;
        }

        const fetchPackages = async () => {
            try {
                const res = await fetch(
                    `${CONFIG.API_BASE_URL}/new-healthpackages/getAllHealthPackages`
                );
                const data = await res.json();
                setPackages(data?.Items || []);
            } catch (error) {
                console.error("Failed to fetch packages", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, [hasInitial]);

    const handleCall = () => {
        window.location.href = "tel:+919144514459";
    };

    const filteredPackages = packages.filter((pkg) => {
        const price = Number(pkg.offerPrice) || 0;
        if (active === "Basic") return price < 2000;
        if (active === "Comprehensive") return price >= 2000 && price <= 10000;
        if (active === "Executive") return price > 10000;
        return true;
    });

    return (
        <>
            {isMobile ? (
                <>
                    <div className="bg-gray-50 flex justify-center py-2 -mt-6">
                        <Breadcrumb items={breadcrumbItems} />
                    </div>
                    <section className="relative mt-2 w-full h-[200px] flex items-center justify-center overflow-hidden">
                        <Image
                            src="/assets/HP/Health Packages _ Banner_.webp"
                            alt="Background"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="relative z-10 container mx-auto px-2 flex flex-row items-center justify-between gap-6">
                            {/* Left side text */}
                            <div className="text-white max-w-xl">
                                <h1 className="text-xl font-bold mb-2 leading-snug">
                                    Health Checkup Packages
                                </h1>
                                <p className="text-xs mb-4 text-gray-200">
                                    Comprehensive health screening
                                    designed to suit your age, lifestyle,
                                    and health needs. Take the first step
                                    towards better health today
                                </p>
                            </div>

                            {/* Right side image */}
                            <div className="relative w-[450px] h-[450px]">
                                <Image
                                    src="/assets/HP/Banner Image.webp"
                                    alt="Doctors Group"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>
                    </section>
                    <section className="container mx-auto px-2 py-2">
                        {loading ? (
                            <p className="text-center text-gray-500">
                                Loading health packages...
                            </p>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 items-stretch">
                                {[...filteredPackages]
                                    .sort((a, b) => Number(b.offerPrice) - Number(a.offerPrice))
                                    .map((pkg) => (
                                        <HealthPackageCard
                                            key={pkg.hpId}
                                            title={pkg.hpTitle}
                                            description={
                                                pkg.packageDetails
                                                    ?.replace(/<[^>]*>/g, "")
                                            }
                                            packageCovers={pkg.packageCovers}
                                            actualPrice={pkg.actualPrice}
                                            offerPrice={pkg.offerPrice}
                                            detailsUrl={pkg.url}
                                        />
                                    ))}
                            </div>
                        )}
                    </section>
                    <WhyChooseHealthPackages />
                    <div className="px-2 mt-2 text-center">
                        <h2 className="text-lg font-bold text-pink-700 mb-1">
                            Ready to take Charge of Your Health?
                        </h2>
                        <p className="text-xs text-gray-700 mb-2 leading-relaxed">
                            Book your comprehensive health checkup today and gain clear
                            insights into body’s well-being. Our expert doctors at TX
                            Hospitals are here to guide you with advanced diagnostics,
                            timely advice and personalized care every step of the way.
                        </p>
                        <div className="flex justify-center items-center gap-2 mb-2">
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-pink-700 text-xs hover:bg-pink-800 text-white font-semibold px-2 py-1 rounded-full transition"
                            >
                                Book Appointment
                            </button>
                            <button
                                onClick={handleCall}
                                className="border border-pink-700 text-pink-700 hover:bg-pink-700 hover:text-white text-xs font-semibold px-2 py-1 rounded-full transition"
                            >
                                Talk to our Experts
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="bg-gray-50 px-16 py-4 mt-8">
                        <Breadcrumb items={breadcrumbItems} />
                    </div>
                    <section className="relative w-full h-[350px] flex items-center justify-center overflow-hidden">
                        <Image
                            src="/assets/HP/Health Packages _ Banner_.webp"
                            alt="Background"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="relative z-10 container mx-auto px-14 flex flex-row items-center justify-between gap-6">
                            {/* Left side text */}
                            <div className="text-white max-w-xl">
                                <h1 className="text-4xl font-bold mb-4 leading-snug">
                                    Health Checkup Packages
                                </h1>
                                <p className="text-lg mb-8 text-gray-200">
                                    Comprehensive health screening
                                    designed to suit your age, lifestyle,
                                    and health needs. Take the first step
                                    towards better health today
                                </p>
                            </div>

                            {/* Right side image */}
                            <div className="relative mt-12 w-[450px] h-[450px]">
                                <Image
                                    src="/assets/HP/Banner Image.webp"
                                    alt="Doctors Group"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>
                    </section>
                    <div className="w-full flex flex-wrap gap-4 justify-center mt-4">
                        {filters.map((item) => (
                            <button
                                key={item}
                                onClick={() => setActive(item)}
                                className={`px-6 py-2 rounded-full border text-lg font-semibold transition-all
                                    ${active === item
                                        ? "bg-pink-700 text-white border-pink-700"
                                        : "bg-white text-bg-pink-700 border-pink-700"
                                    }
                                `}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                    <section className="container mx-auto px-14 py-10">
                        {loading ? (
                            <p className="text-center text-gray-500">
                                Loading health packages...
                            </p>
                        ) : (
                            <div className="grid grid-cols-3 gap-8 items-stretch">
                                {[...filteredPackages]
                                    .sort((a, b) => Number(b.offerPrice) - Number(a.offerPrice))
                                    .map((pkg) => (
                                        <HealthPackageCard
                                            key={pkg.hpId}
                                            title={pkg.hpTitle}
                                            description={pkg.packageDetails?.replace(/<[^>]*>/g, "")}
                                            packageCovers={pkg.packageCovers}
                                            actualPrice={pkg.actualPrice}
                                            offerPrice={pkg.offerPrice}
                                            detailsUrl={pkg.url}
                                        />
                                    ))}
                            </div>
                        )}
                    </section>
                    <WhyChooseHealthPackages />
                    <div className="max-w-6xl mx-auto px-6 mt-4 text-center">
                        <h2 className="text-4xl font-bold text-pink-700 mb-3">
                            Ready to take Charge of Your Health?
                        </h2>
                        <p className="text-base text-gray-700 max-w-5xl mx-auto mb-6 leading-relaxed">
                            Book your comprehensive health checkup today and gain clear
                            insights into body’s well-being. Our expert doctors at TX
                            Hospitals are here to guide you with advanced diagnostics,
                            timely advice and personalized care every step of the way.
                        </p>
                        <div className="flex justify-center items-center gap-12 mb-4">
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-pink-700 hover:bg-pink-800 text-white text-xl font-semibold px-8 py-3 rounded-full transition"
                            >
                                Book Appointment
                            </button>
                            <button
                                onClick={handleCall}
                                className="border-2 border-pink-700 text-pink-700 hover:bg-pink-700 hover:text-white text-xl font-semibold px-8 py-3 rounded-full transition"
                            >
                                Talk to our Experts
                            </button>
                        </div>
                    </div>
                </>
            )}
            <BookAppointmentForm showModal={showModal} setShowModal={setShowModal} />
        </>
    );
}