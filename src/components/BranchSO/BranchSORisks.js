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

export default function BranchSORisks({ risksSection = {}, location = "" }) {
    const [showModal, setShowModal] = useState(false);

    const items = Array.isArray(risksSection.items)
        ? risksSection.items.filter((item) => item && (item.title?.trim() || item.description?.trim()))
        : [];

    const hasRight = Boolean(risksSection.rightDescription?.trim());
    const hasContent = risksSection.title?.trim() || items.length > 0 || hasRight;

    if (!hasContent) return null;

    const thankYouUrl = getThankYouRoute(location);
    const branchLabel = location ? `TX Hospitals ${location}` : "TX Hospitals";

    return (
        <>
            <section className="w-full bg-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 font-inter">
                <div className="max-w-7xl mx-auto">
                    {risksSection.title && (
                        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#1A1A1A] leading-tight mb-8">
                            {risksSection.title}
                        </h2>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        {/* Left Column: Numbered Risk Cards + CTA Buttons */}
                        <div>
                            {items.length > 0 && (
                                <div className="space-y-4">
                                    {items.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm flex items-start gap-4"
                                        >
                                            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#FCE7EE] text-[#A8204B] font-bold text-xs flex-shrink-0 mt-0.5">
                                                {String(idx + 1).padStart(2, "0")}
                                            </span>
                                            <div className="flex-1 min-w-0">
                                                {item.title && (
                                                    <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1">
                                                        {item.title}
                                                    </h3>
                                                )}
                                                {item.description && (
                                                    <div
                                                        className="text-gray-600 text-xs sm:text-sm leading-relaxed [&_p]:mb-1.5 [&_p:last-child]:mb-0 [&_strong]:text-gray-800"
                                                        dangerouslySetInnerHTML={{
                                                            __html: sanitize(item.description),
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(true)}
                                    className="bg-[#A8204B] hover:bg-[#8E193E] text-white font-semibold py-3 px-6 rounded-full text-sm transition cursor-pointer"
                                >
                                    Get a second opinion
                                </button>
                                <a
                                    href="tel:+919144514459"
                                    className="border border-[#A8204B]/40 hover:bg-[#FAF1F4] text-[#A8204B] font-semibold py-3 px-6 rounded-full text-sm text-center transition"
                                >
                                    Call 91445 14459
                                </a>
                            </div>
                        </div>

                        {/* Right Column: Dark Card */}
                        {hasRight && (
                            <div className="bg-[#230F17] text-white rounded-2xl p-6 sm:p-8 shadow-sm">
                                <div
                                    className="branch-so-risks-right text-white/90 text-sm sm:text-base leading-relaxed [&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:text-white [&_a]:text-rose-300 [&_a]:underline"
                                    dangerouslySetInnerHTML={{
                                        __html: sanitize(risksSection.rightDescription),
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <style jsx global>{`
                    .branch-so-risks-right ul {
                        list-style: none;
                        padding-left: 0;
                        margin: 1rem 0;
                    }
                    .branch-so-risks-right ul li {
                        position: relative;
                        padding-left: 1.5rem;
                        margin-bottom: 0.65rem;
                    }
                    .branch-so-risks-right ul li::before {
                        content: "✓";
                        position: absolute;
                        left: 0;
                        top: 0.05rem;
                        color: #f48fb1;
                        font-size: 0.9rem;
                        font-weight: 700;
                    }
                `}</style>
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
