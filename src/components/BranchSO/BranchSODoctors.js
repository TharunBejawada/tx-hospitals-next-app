import React, { useState } from "react";
import { Clock } from "lucide-react";
import sanitize from "@/utils/sanitize";
import BookAppointmentForm from "@/components/Blogs/BookAppointemntForm";

const THANK_YOU_MAP = {
    uppal: "/thank-you-uppal",
    kachiguda: "/thank-you-kachiguda",
    "banjara hills": "/thank-you-banjara-hills",
    "banjara-hills": "/thank-you-banjara-hills",
    miyapur: "/thank-you-miyapur",
};

function getThankYouRoute(location) {
    if (!location) return "/thank-you";
    const key = String(location).trim().toLowerCase();
    return THANK_YOU_MAP[key] || "/thank-you";
}

export default function BranchSODoctors({ doctorsSection = {}, location = "" }) {
    const [showModal, setShowModal] = useState(false);

    const doctors = Array.isArray(doctorsSection.doctors) ? doctorsSection.doctors : [];
    const hasCta =
        doctorsSection.ctaTitle?.trim() ||
        doctorsSection.ctaDescription?.trim() ||
        doctorsSection.ctaButtonText?.trim();
    const hasContent =
        doctorsSection.title?.trim() ||
        doctorsSection.description?.trim() ||
        doctors.length > 0 ||
        hasCta;

    if (!hasContent) return null;

    const thankYouUrl = getThankYouRoute(location);
    const branchLabel = location ? `TX Hospitals ${location}` : "TX Hospitals";

    return (
        <>
            <section className="w-full bg-[#FAF1F4] py-12 md:py-16 px-4 sm:px-6 lg:px-8 font-inter">
                <div className="max-w-7xl mx-auto bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-10 shadow-sm">
                    {doctorsSection.title && (
                        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#1A1A1A] leading-tight mb-4">
                            {doctorsSection.title}
                        </h2>
                    )}

                    {doctorsSection.description && (
                        <div
                            className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8 [&_p]:mb-3 [&_p:last-child]:mb-0 [&_strong]:text-gray-800 [&_a]:text-[#A8204B] [&_a]:underline"
                            dangerouslySetInnerHTML={{ __html: sanitize(doctorsSection.description) }}
                        />
                    )}

                    {doctors.length > 0 && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            {doctors.map((doc, idx) => (
                                <div
                                    key={doc.id || idx}
                                    className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm flex flex-col justify-between"
                                >
                                    <div className="flex flex-col sm:flex-row gap-5 items-start">
                                        <div className="w-28 sm:w-32 h-36 rounded-lg overflow-hidden border border-[#A8204B]/40 flex-shrink-0 bg-[#FAF1F4]">
                                            <img
                                                src={
                                                    doc.image ||
                                                    "https://tx-hospital-doctor-images.s3.ap-south-2.amazonaws.com/doctors/default-doctor.webp"
                                                }
                                                alt={doc.name || "Specialist Doctor"}
                                                className="w-full h-full object-cover object-top"
                                                loading="lazy"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0 w-full">
                                            {doc.name && (
                                                <h3 className="text-lg font-bold text-[#A8204B] leading-snug mb-1">
                                                    {doc.name}
                                                </h3>
                                            )}
                                            {doc.designation && (
                                                <p className="text-xs sm:text-sm font-semibold text-[#7E1F3F] leading-snug mb-2.5">
                                                    {doc.designation}
                                                </p>
                                            )}
                                            {doc.qualification && (
                                                <div className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-md mb-2.5">
                                                    {doc.qualification}
                                                </div>
                                            )}
                                            {doc.experience && (
                                                <p className="text-xs sm:text-sm text-gray-800 mb-2.5">
                                                    <strong className="font-semibold">Experience:</strong>{" "}
                                                    {doc.experience}
                                                </p>
                                            )}
                                            {doc.timings && (
                                                <div className="inline-flex items-center gap-1.5 bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-xs font-medium px-3 py-1.5 rounded-md w-full">
                                                    <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                                                    <span>Available: {doc.timings}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mt-5">
                                        <button
                                            type="button"
                                            onClick={() => setShowModal(true)}
                                            className="bg-[#A8204B] hover:bg-[#8E193E] text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition cursor-pointer"
                                        >
                                            Book appointment
                                        </button>
                                        <a
                                            href="tel:+919144514459"
                                            className="border border-[#A8204B]/40 hover:bg-[#FAF1F4] text-[#A8204B] font-semibold py-2.5 px-4 rounded-lg text-sm text-center transition"
                                        >
                                            Call now
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {hasCta && (
                        <div className="bg-[#FAF1F4] rounded-xl px-6 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                            <div className="flex-1">
                                {doctorsSection.ctaTitle && (
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                                        {doctorsSection.ctaTitle}
                                    </h3>
                                )}
                                {doctorsSection.ctaDescription && (
                                    <div
                                        className="text-gray-600 text-sm leading-relaxed [&_p]:mb-0 [&_strong]:text-gray-800"
                                        dangerouslySetInnerHTML={{
                                            __html: sanitize(doctorsSection.ctaDescription),
                                        }}
                                    />
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
                                {doctorsSection.ctaButtonText && (
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(true)}
                                        className="bg-[#A8204B] hover:bg-[#8E193E] text-white font-semibold px-6 py-3 rounded-full text-sm transition cursor-pointer"
                                    >
                                        {doctorsSection.ctaButtonText}
                                    </button>
                                )}
                                <a
                                    href="tel:+919144514459"
                                    className="border border-[#A8204B]/40 bg-white hover:bg-gray-50 text-[#A8204B] font-semibold px-6 py-3 rounded-full text-sm transition inline-flex items-center justify-center"
                                >
                                    Call 91445 14459
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <BookAppointmentForm
                showModal={showModal}
                setShowModal={setShowModal}
                redirectUrl={thankYouUrl}
                defaultLocation={branchLabel}
            />
        </>
    );
}
