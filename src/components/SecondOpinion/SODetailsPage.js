import useIsMobile from "@/hooks/useIsMobile";
import Head from "next/head";
import Image from "next/image";
import SOBookAppointemntForm from "@/components/SecondOpinion/SOBookAppointmentForm";
import CommonReasons from "@/components/SecondOpinion/CommonReasons";
import WhySecondOpinion from "@/components/SecondOpinion/WhySecondOpinion";
import Benefits from "@/components/SecondOpinion/Benefits";
import RiskOfDelay from "@/components/SecondOpinion/RiskOfDelay";
import OtpForm from "@/components/SecondOpinion/OtpForm";
import WhyChoose from "@/components/SecondOpinion/WhyChoose";
import BookAppointmentForm from "@/components/Blogs/BookAppointemntForm";
import sanitize from "@/utils/sanitize";
import FAQSchema from "@/utils/FAQSchema";
import { ChevronUp } from "lucide-react";
import { useState } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";

export default function SODetailsPage({ surgeryData }) {

    const isMobile = useIsMobile();
    const [openIndex, setOpenIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        {
            label: isMobile ? "SO" : "Second Opinion",
            href: "/surgery-care/",
            fullLabel: "Second Opinion"
        },
        {
            label: isMobile && surgeryData?.soTitle?.length > 15
                ? surgeryData.soTitle.substring(0, 12) + "..."
                : surgeryData?.soTitle,
            fullLabel: surgeryData?.soTitle
        },
    ];

    return (
        <>
            <Head>
                <title>{surgeryData?.seoTitle}</title>
                <meta name="description" content={surgeryData?.metaDescription} />
                <meta name="keywords" content={surgeryData?.metaKeywords} />
            </Head>
            {
                isMobile ? (
                    <section className="w-full">
                        <div className="bg-gray-50 text-center -mt-6">
                            <h1 className="text-xl font-semibold text-pink-700">{surgeryData?.soTitle}</h1>
                            <div className="flex justify-center mt-2 px-2">
                                <Breadcrumb items={breadcrumbItems} />
                            </div>
                        </div>
                        <section className="relative w-full bg-[#910114] overflow-hidden">
                            <div className="absolute inset-0">
                                <Image
                                    src={surgeryData?.soField[0]?.image}
                                    alt={surgeryData?.soTitle}
                                    fill
                                    priority
                                    className="object-cover opacity-20"
                                />
                            </div>
                            <div className="relative max-w-6xl mx-auto py-2 flex flex-col items-center gap-4">
                                <div className="text-white text-center">
                                    <h2 className="text-xl font-semibold leading-snug mb-3">
                                        {surgeryData?.soField[0]?.heading}
                                    </h2>

                                    <div
                                        className="text-lg leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: surgeryData?.soField[0]?.description }}
                                    />
                                </div>
                                <SOBookAppointemntForm />
                            </div>
                        </section>
                        <section className="w-full bg-white py-2">
                            <h2 className="text-xl font-semibold text-pink-700 mb-3">
                                {surgeryData?.whatIsSO[0]?.heading}
                            </h2>
                            <div className="flex flex-col gap-3 items-center">
                                <div className="items-center">
                                    <Image
                                        src={surgeryData?.whatIsSO[0]?.image}
                                        alt={surgeryData?.whatIsSO[0]?.heading}
                                        width={100}
                                        height={100}
                                        className="object-contain"
                                    />
                                </div>
                                <div>
                                    <div
                                        className="prose text-sm px-2 prose-p:text-gray-800 prose-li:text-gray-800 prose-strong:text-gray-900"
                                        dangerouslySetInnerHTML={{
                                            __html: surgeryData?.whatIsSO[0]?.description
                                                .replace(/<p>/g, '<p class="mb-2>')
                                                .replace(/<ul>/g, '<ul class="list-disc ml-6">'),
                                        }}
                                    />
                                </div>
                            </div>
                        </section>
                        <CommonReasons data={surgeryData?.commonReasons[0]} />
                        <WhySecondOpinion data={surgeryData?.whySO[0]} />
                        <Benefits data={surgeryData?.benefits?.[0]} />
                        <RiskOfDelay data={surgeryData?.risk[0]} />
                        <OtpForm />
                        <WhyChoose data={surgeryData?.whyChoose[0]} />
                        <div className="w-full bg-pink-100 rounded-2xl py-2 mx-auto px-6 text-center">
                            <h2 className="text-xl font-bold text-pink-700 mb-2">
                                {surgeryData?.bookingField[0]?.heading}
                            </h2>
                            <p
                                className="text-sm text-gray-700 mb-3 leading-relaxed"
                                dangerouslySetInnerHTML={{
                                    __html: sanitize(surgeryData?.bookingField[0]?.description),
                                }}
                            />
                            <div className="flex justify-center items-center gap-2 mb-2">
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="bg-pink-700 text-xs hover:bg-pink-800 text-white font-semibold px-2 py-1 rounded-full transition"
                                >
                                    Book Appointment
                                </button>
                                <a href="tel:9144514459">
                                    <button
                                        className="border border-pink-700 text-pink-700 hover:bg-pink-700 hover:text-white text-xs font-semibold px-2 py-1 rounded-full transition"
                                    >
                                        Talk to our Experts
                                    </button>
                                </a>
                            </div>
                        </div>
                        <section className="w-full px-2 py-2">
                            <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] p-2">
                                <h2 className="text-2xl font-bold text-pink-700 mb-6">
                                    Frequently Asked Questions (FAQs)
                                </h2>
                                <FAQSchema faqs={surgeryData?.faqs} />
                                <div className="space-y-2">
                                    {surgeryData?.faqs.map((faq, index) => (
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
                    </section>
                ) : (
                    <section className="w-full">
                        <div className="bg-gray-50 px-16 mt-8 mb-4 flex flex-col items-start min-h-[80px]">
                            <div className="mb-2">
                                <Breadcrumb items={breadcrumbItems} />
                            </div>
                            <h1 className="w-full text-center text-4xl font-semibold text-pink-700">
                                {surgeryData?.soTitle}
                            </h1>
                        </div>
                        <section className="relative w-full bg-pink-900/50 overflow-hidden">
                            <div className="absolute inset-0">
                                <Image
                                    src={surgeryData?.soField[0]?.image}
                                    alt={surgeryData?.soField[0]?.heading || "Surgery Banner"}
                                    fill
                                    priority
                                    className="object-cover opacity-20"
                                />
                            </div>
                            <div className="relative max-w-6xl mx-auto py-2 flex items-center gap-10">
                                <div className="text-white">
                                    <h2 className="text-5xl font-semibold leading-snug mb-3">
                                        {surgeryData?.soField[0]?.heading}
                                    </h2>

                                    <div
                                        className="text-lg leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: surgeryData?.soField[0]?.description }}
                                    />
                                </div>
                                <SOBookAppointemntForm />
                            </div>
                        </section>
                        <section className="w-full bg-white py-2">
                            <div className="max-w-6xl mx-auto flex gap-12 items-start">
                                <div>
                                    <h2 className="text-4xl font-semibold text-pink-700 mb-3">
                                        {surgeryData?.whatIsSO[0]?.heading}
                                    </h2>

                                    <div
                                        className="prose max-w-none prose-p:text-gray-800 prose-li:text-gray-800 prose-strong:text-gray-900"
                                        dangerouslySetInnerHTML={{
                                            __html: surgeryData?.whatIsSO[0]?.description
                                                .replace(/<p>/g, '<p class="mb-1>')
                                                .replace(/<ul>/g, '<ul class="list-disc ml-6">'),
                                        }}
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <div className="relative w-full max-w-lg">
                                        <Image
                                            src={surgeryData?.whatIsSO[0]?.image}
                                            alt={surgeryData?.whatIsSO[0]?.heading}
                                            width={700}
                                            height={700}
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                        <CommonReasons data={surgeryData?.commonReasons[0]} />
                        <WhySecondOpinion data={surgeryData?.whySO[0]} />
                        <Benefits data={surgeryData?.benefits?.[0]} />
                        <RiskOfDelay data={surgeryData?.risk[0]} />
                        <OtpForm />
                        <WhyChoose data={surgeryData?.whyChoose[0]} />
                        <div className="max-w-6xl bg-pink-100 rounded-2xl py-4 mx-auto px-6 mt-4 text-center">
                            <h2 className="text-4xl font-bold text-pink-700 mb-3">
                                {surgeryData?.bookingField[0]?.heading}
                            </h2>
                            <p
                                className="text-base text-gray-700 mb-6 leading-relaxed"
                                dangerouslySetInnerHTML={{
                                    __html: sanitize(surgeryData?.bookingField[0]?.description),
                                }}
                            />
                            <div className="flex justify-center items-center gap-12 mb-4">
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="bg-pink-700 hover:bg-pink-800 text-white text-xl font-semibold px-8 py-3 rounded-full transition"
                                >
                                    Book Appointment
                                </button>
                                <a href="tel:9144514459">
                                    <button
                                        className="border-2 border-pink-700 text-pink-700 hover:bg-pink-700 hover:text-white text-xl font-semibold px-8 py-3 rounded-full transition"
                                    >
                                        Talk to our Experts
                                    </button>
                                </a>
                            </div>
                        </div>
                        <section className="w-full px-12 py-8">
                            <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] p-6">
                                <h2 className="text-4xl font-bold text-pink-700 mb-12">
                                    Frequently Asked Questions (FAQs)
                                </h2>
                                <FAQSchema faqs={surgeryData?.faqs} />
                                <div className="space-y-6">
                                    {surgeryData?.faqs.map((faq, index) => (
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
                    </section>
                )
            }
            <BookAppointmentForm showModal={showModal} setShowModal={setShowModal} />
        </>
    );
}
