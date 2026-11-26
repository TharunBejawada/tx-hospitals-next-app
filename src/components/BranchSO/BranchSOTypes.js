import React, { useState } from "react";
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

export default function BranchSOTypes({ typesSection = {}, location = "" }) {
    const [showModal, setShowModal] = useState(false);

    const typesList = Array.isArray(typesSection.types)
        ? typesSection.types.filter((t) => t && (t.title?.trim() || t.description?.trim()))
        : [];
    const hasCta = typesSection.ctaTitle?.trim() || typesSection.ctaDescription?.trim();
    const hasContent =
        typesSection.title?.trim() ||
        typesSection.description?.trim() ||
        typesList.length > 0 ||
        hasCta;

    if (!hasContent) return null;

    const thankYouUrl = getThankYouRoute(location);
    const branchLabel = location ? `TX Hospitals ${location}` : "TX Hospitals";

    return (
        <>
            <section className="w-full bg-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 font-inter">
                <div className="max-w-7xl mx-auto">
                    {typesSection.title && (
                        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#1A1A1A] leading-tight mb-3">
                            {typesSection.title}
                        </h2>
                    )}

                    {typesSection.description && (
                        <div
                            className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8 [&_p]:mb-3 [&_p:last-child]:mb-0 [&_strong]:text-gray-800 [&_a]:text-[#A8204B] [&_a]:underline"
                            dangerouslySetInnerHTML={{ __html: sanitize(typesSection.description) }}
                        />
                    )}

                    {typesList.length > 0 && (
                        <div className="space-y-6 mb-10">
                            {typesList.map((item, idx) => (
                                <div key={idx}>
                                    {item.title && (
                                        <h3 className="text-lg sm:text-xl font-bold text-[#A8204B] mb-1.5">
                                            {item.title}
                                        </h3>
                                    )}
                                    {item.description && (
                                        <div
                                            className="text-gray-600 text-sm sm:text-base leading-relaxed [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:text-gray-800 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 [&_a]:text-[#A8204B] [&_a]:underline"
                                            dangerouslySetInnerHTML={{ __html: sanitize(item.description) }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Bottom Maroon CTA Banner */}
                    <div className="bg-[#A8204B] rounded-2xl px-6 sm:px-10 py-6 sm:py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
                        <div className="flex-1">
                            {typesSection.ctaTitle && (
                                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                                    {typesSection.ctaTitle}
                                </h3>
                            )}
                            {typesSection.ctaDescription && (
                                <div
                                    className="text-white/90 text-sm sm:text-base [&_p]:mb-0 [&_strong]:text-white"
                                    dangerouslySetInnerHTML={{ __html: sanitize(typesSection.ctaDescription) }}
                                />
                            )}
                        </div>

                        <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
                            <button
                                type="button"
                                onClick={() => setShowModal(true)}
                                className="bg-white hover:bg-gray-100 text-[#A8204B] font-semibold px-6 py-3 rounded-full shadow-sm transition cursor-pointer text-sm"
                            >
                                Book a second opinion
                            </button>

                            <a
                                href="tel:+919144514459"
                                className="border border-white/70 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-full transition inline-flex items-center justify-center text-sm"
                            >
                                Call 91445 14459
                            </a>
                        </div>
                    </div>
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
