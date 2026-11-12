import { useState, useEffect } from "react";
import useIsMobile from "@/hooks/useIsMobile"
import PatientDetailsForm from "@/components/HealthPackages/PatientDetailsForm";
import { useRouter } from "next/router";
import sanitize from "@/utils/sanitize";
import CONFIG from "@/config";
import Image from "next/image";
import FAQSchema from "@/utils/FAQSchema";
import { ChevronUp } from "lucide-react";
import Head from "next/head";
import Breadcrumb from "@/components/Common/Breadcrumb";
import BookAppointmentForm from "@/components/Blogs/BookAppointemntForm";

export default function HealthPackageDetails({ initialPackageData = null }) {

    const router = useRouter();
    const isMobile = useIsMobile();

    const [packageData, setPackageData] = useState(initialPackageData || null);
    const [loading, setLoading] = useState(!initialPackageData);
    const [openIndex, setOpenIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        {
            label: isMobile ? "HP" : "Health Packages",
            href: "/health-package/",
            fullLabel: "Health Packages"
        },
        {
            label: isMobile && packageData?.hpTitle?.length > 15
                ? packageData.hpTitle.substring(0, 12) + "..."
                : packageData?.hpTitle,
            fullLabel: packageData?.hpTitle
        },
    ];

    useEffect(() => {
        if (initialPackageData) {
            setLoading(false);
            return;
        }

        if (!router.isReady) return;
        let fullPath = router.asPath;
        if (!fullPath.endsWith("/")) {
            fullPath = fullPath + "/";
        }
        const encodedPath = encodeURIComponent(fullPath);
        const fetchPackage = async () => {
            try {
                const res = await fetch(
                    `${CONFIG.API_BASE_URL}/new-healthpackages/getHealthPackagebyURL/${encodedPath}`
                );
                const data = await res.json();
                setPackageData(data?.[0]);
            } catch (error) {
                console.error("Failed to fetch health package", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPackage();
    }, [router.isReady, router.asPath, initialPackageData]);

    const handleCall = () => {
        window.location.href = "tel:+919144514459";
    };

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (loading || !packageData) return null;

    return (
        <>
            <Head>
                <title>{packageData?.seoTitle}</title>
                <meta name="description" content={packageData?.metaKeywords} />
                <meta name="keywords" content={packageData?.metaDescription} />
            </Head>
            {isMobile ? (
                <>
                    <div className="bg-gray-50 flex justify-center py-2 -mt-6">
                        <Breadcrumb items={breadcrumbItems} />
                    </div>
                    <section className="w-full px-2">
                        <div className="grid grid-cols-1 gap-2">
                            <div className="bg-pink-700 rounded-3xl p-2 text-white flex flex-col justify-center">
                                <h1 className="text-2xl font-bold leading-tight">
                                    {packageData.hpTitle}
                                </h1>

                                <div
                                    className="mt-2 text-sm leading-relaxed max-w-xl"
                                    dangerouslySetInnerHTML={{
                                        __html: packageData.packageDetails,
                                    }}
                                />

                                <div className="mt-2">
                                    <button className="bg-white text-pink-700 font-semibold px-4 py-1 rounded-full hover:bg-gray-100 transition">
                                        Book Your Screening
                                    </button>
                                </div>
                            </div>
                            <PatientDetailsForm title={packageData?.hpTitle} />
                        </div>
                    </section>
                    <section className="w-full px-2 py-2">
                        <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] p-2">
                            <h2 className="text-center text-2xl font-bold text-pink-700 mb-2">
                                Package Covers
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                                {packageData.packageCovers.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] px-6 py-8 hover:shadow-[0_10px_40px_rgba(0,0,0,0.25)] text-center transition"
                                    >
                                        <h3 className="text-xs font-semibold text-pink-700 mb-1">
                                            {item.name}
                                        </h3>
                                        <div
                                            className="text-gray-700 text-[10px] leading-relaxed"
                                            dangerouslySetInnerHTML={{
                                                __html: sanitize(item.description),
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    <section className="w-full px-2 py-2">
                        <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] p-2">
                            <h2 className="text-center text-2xl font-bold text-pink-700 mb-3">
                                Expert Consultations
                            </h2>
                            <div className="grid grid-cols-1 gap-2">
                                {packageData.expertConsultations.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-pink-700 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] px-2 py-3 hover:shadow-[0_10px_40px_rgba(0,0,0,0.25)] text-left transition"
                                    >
                                        <h3 className="text-lg font-semibold text-white mb-2">
                                            {item.name}
                                        </h3>
                                        <div
                                            className="text-white text-sm leading-relaxed"
                                            dangerouslySetInnerHTML={{
                                                __html: sanitize(item.description),
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    <section className="w-full px-2 py-2">
                        <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] p-2">
                            <h2 className="text-center text-2xl font-bold text-pink-700 mb-3">
                                {packageData?.whoShouldHeadline}
                            </h2>
                            <div className="grid grid-cols-1 gap-2">
                                {packageData?.whoShould?.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 bg-white rounded-xl
                                       shadow-[0_8px_25px_rgba(0,0,0,0.15)]
                                       px-2 py-2"
                                    >
                                        <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center border-2 border-pink-700 rounded-md bg-white">
                                            <Image
                                                src="/assets/HP/Right Icon.webp"
                                                alt="Tick"
                                                width={12}
                                                height={12}
                                            />
                                        </div>
                                        <div
                                            className="text-sm text-gray-900 font-medium leading-relaxed"
                                            dangerouslySetInnerHTML={{
                                                __html: sanitize(item.description),
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    <section className="w-full px-2 py-2">
                        <div className="bg-pink-800 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] p-2">
                            <h2 className="text-center text-xl font-bold text-white mb-6">
                                {packageData?.whyShouldHeadline}
                            </h2>
                            <div className="grid grid-cols-2 gap-2 text-center">
                                {packageData?.whyShould.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center text-white"
                                    >
                                        <div className="relative w-20 h-20 mb-2">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <h3 className="text-base font-bold mb-2">
                                            {item.name}
                                        </h3>
                                        <div
                                            className="text-xs leading-relaxed opacity-90 max-w-xs"
                                            dangerouslySetInnerHTML={{
                                                __html: sanitize(item.description),
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    <div className="px-2 mt-2 text-center">
                        <h2 className="text-2xl font-bold text-pink-700 mb-1">
                            {packageData?.readyToTakeCharge[0]?.headline}
                        </h2>
                        <p
                            className="text-xs text-gray-700 mb-2 leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: sanitize(packageData?.readyToTakeCharge[0]?.description),
                            }}
                        />
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
                    <section className="w-full px-2 py-2">
                        <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] p-2">
                            <h2 className="text-2xl font-bold text-pink-700 mb-6">
                                Frequently Asked Questions (FAQs)
                            </h2>
                            <FAQSchema faqs={packageData?.faqs} />
                            <div className="space-y-2">
                                {packageData?.faqs.map((faq, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-xl border border-pink-600 overflow-hidden transition"
                                    >
                                        <button
                                            onClick={() => toggle(index)}
                                            className="w-full flex items-center justify-between px-4 py-2 text-left"
                                        >
                                            <span className="text-sm font-semibold text-gray-900">
                                                {faq.question}
                                            </span>

                                            <ChevronUp
                                                className={`w-5 h-5 text-pink-600 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </button>

                                        {/* Answer */}
                                        {openIndex === index && (
                                            <div className="px-3 pb-2 text-gray-700 text-sm leading-relaxed">
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: sanitize(
                                                            faq.description || faq.answer
                                                        ),
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </>
            ) : (
                <>
                    <div className="bg-gray-50 px-16 mt-12">
                        <Breadcrumb items={breadcrumbItems} />
                    </div>
                    <section className="w-full px-12 py-4">
                        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-4">
                            <div className="bg-pink-700 rounded-3xl p-8 text-white flex flex-col justify-center">
                                <h1 className="text-5xl font-bold leading-tight">
                                    {packageData.hpTitle}
                                </h1>

                                <div
                                    className="mt-6 text-lg leading-relaxed max-w-xl"
                                    dangerouslySetInnerHTML={{
                                        __html: packageData.packageDetails,
                                    }}
                                />

                                <div className="mt-8">
                                    <button className="bg-white text-pink-700 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition">
                                        Book Your Screening
                                    </button>
                                </div>
                            </div>
                            <PatientDetailsForm title={packageData?.hpTitle} />
                        </div>
                    </section>
                    <section className="w-full px-12 py-4">
                        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] p-6">
                            <h2 className="text-center text-4xl font-bold text-pink-700 mb-12">
                                Package Covers
                            </h2>
                            <div className="grid grid-cols-4 gap-6">
                                {packageData.packageCovers.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] px-6 py-8 hover:shadow-[0_10px_40px_rgba(0,0,0,0.25)] text-center transition"
                                    >
                                        <h3 className="text-lg font-semibold text-pink-700 mb-2">
                                            {item.name}
                                        </h3>
                                        <div
                                            className="text-gray-700 text-sm leading-relaxed"
                                            dangerouslySetInnerHTML={{
                                                __html: sanitize(item.description),
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    <section className="w-full px-12 py-8">
                        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] p-6">
                            <h2 className="text-center text-4xl font-bold text-pink-700 mb-12">
                                Expert Consultations
                            </h2>
                            <div className="grid grid-cols-2 gap-6">
                                {packageData.expertConsultations.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-pink-700 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] px-6 py-8 hover:shadow-[0_10px_40px_rgba(0,0,0,0.25)] text-left transition"
                                    >
                                        <h3 className="text-lg font-semibold text-white mb-2">
                                            {item.name}
                                        </h3>
                                        <div
                                            className="text-white text-sm leading-relaxed"
                                            dangerouslySetInnerHTML={{
                                                __html: sanitize(item.description),
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    <section className="w-full px-12 py-8">
                        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] p-6">
                            <h2 className="text-center text-4xl font-bold text-pink-700 mb-12">
                                {packageData?.whoShouldHeadline}
                            </h2>
                            <div className="grid grid-cols-1 gap-6">
                                {packageData?.whoShould?.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 bg-white rounded-xl
                                       shadow-[0_8px_25px_rgba(0,0,0,0.15)]
                                       px-6 py-5"
                                    >
                                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-pink-700 rounded-md bg-white">
                                            <Image
                                                src="/assets/HP/Right Icon.webp"
                                                alt="Tick"
                                                width={25}
                                                height={25}
                                            />
                                        </div>
                                        <div
                                            className="text-lg text-gray-900 font-medium leading-relaxed"
                                            dangerouslySetInnerHTML={{
                                                __html: sanitize(item.description),
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    <section className="w-full px-12 py-8">
                        <div className="max-w-7xl bg-pink-800 mx-auto rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] p-6">
                            <h2 className="text-center text-4xl font-bold text-white mb-12">
                                {packageData?.whyShouldHeadline}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
                                {packageData?.whyShould.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center text-white"
                                    >
                                        <div className="relative w-24 h-24 mb-6">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">
                                            {item.name}
                                        </h3>
                                        <div
                                            className="text-sm leading-relaxed opacity-90 max-w-xs"
                                            dangerouslySetInnerHTML={{
                                                __html: sanitize(item.description),
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    <div className="max-w-6xl mx-auto px-6 mt-4 text-center">
                        <h2 className="text-4xl font-bold text-pink-700 mb-3">
                            {packageData?.readyToTakeCharge[0]?.headline}
                        </h2>
                        <p
                            className="text-base text-gray-700 mb-6 leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: sanitize(packageData?.readyToTakeCharge[0]?.description),
                            }}
                        />
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
                    <section className="w-full px-12 py-8">
                        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] p-6">
                            <h2 className="text-4xl font-bold text-pink-700 mb-12">
                                Frequently Asked Questions (FAQs)
                            </h2>
                            <FAQSchema faqs={packageData?.faqs} />
                            <div className="space-y-6">
                                {packageData?.faqs.map((faq, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-xl border border-pink-600 overflow-hidden transition"
                                    >
                                        <button
                                            onClick={() => toggle(index)}
                                            className="w-full flex items-center justify-between px-4 py-3 text-left"
                                        >
                                            <span className="text-lg font-semibold text-gray-900">
                                                {faq.question}
                                            </span>

                                            <ChevronUp
                                                className={`w-5 h-5 text-pink-600 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </button>

                                        {/* Answer */}
                                        {openIndex === index && (
                                            <div className="px-6 pb-6 text-gray-700 text-base leading-relaxed">
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: sanitize(
                                                            faq.description || faq.answer
                                                        ),
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </>
            )}
            <BookAppointmentForm showModal={showModal} setShowModal={setShowModal} />
        </>
    )
}