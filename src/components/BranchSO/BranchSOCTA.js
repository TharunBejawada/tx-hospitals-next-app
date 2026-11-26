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

export default function BranchSOCTA({ ctaSection = {}, location = "" }) {
    const [showModal, setShowModal] = useState(false);

    const hasContent = ctaSection?.title?.trim() || ctaSection?.description?.trim();
    if (!hasContent) return null;

    const thankYouUrl = getThankYouRoute(location);
    const branchLabel = location ? `TX Hospitals ${location}` : "TX Hospitals";

    return (
        <>
            <section className="w-full bg-white py-10 md:py-14 px-4 sm:px-6 lg:px-8 font-inter">
                <div className="max-w-7xl mx-auto bg-[#A8204B] rounded-2xl px-6 sm:px-10 py-8 sm:py-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-md">
                    <div className="flex-1">
                        {ctaSection.title && (
                            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-3">
                                {ctaSection.title}
                            </h2>
                        )}
                        {ctaSection.description && (
                            <div
                                className="text-white/90 text-sm sm:text-base leading-relaxed [&_p]:mb-3 [&_p:last-child]:mb-0 [&_strong]:text-white [&_a]:text-white [&_a]:underline"
                                dangerouslySetInnerHTML={{ __html: sanitize(ctaSection.description) }}
                            />
                        )}
                    </div>

                    <div className="flex flex-col gap-3 w-full sm:w-56 flex-shrink-0">
                        <button
                            type="button"
                            onClick={() => setShowModal(true)}
                            className="w-full bg-white hover:bg-gray-100 text-[#A8204B] font-semibold py-3 px-6 rounded-full text-sm text-center transition cursor-pointer shadow-sm"
                        >
                            Book appointment
                        </button>
                        <a
                            href="tel:+919144514459"
                            className="w-full border border-white/70 hover:bg-white/10 text-white font-semibold py-3 px-6 rounded-full text-sm text-center transition"
                        >
                            Call 91445 14459
                        </a>
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
