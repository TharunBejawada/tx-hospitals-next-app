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

export default function BranchSOPackage({ packageSection = {}, location = "" }) {
    const [showModal, setShowModal] = useState(false);

    const hasLeft = packageSection?.leftTitle?.trim() || packageSection?.leftDescription?.trim();
    const hasRight = packageSection?.rightTitle?.trim() || packageSection?.rightDescription?.trim();
    if (!hasLeft && !hasRight) return null;

    const thankYouUrl = getThankYouRoute(location);
    const branchLabel = location ? `TX Hospitals ${location}` : "TX Hospitals";

    return (
        <>
            <section className="w-full bg-[#FAF1F4] pt-2 pb-12 md:pb-16 px-4 sm:px-6 lg:px-8 font-inter">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    {/* Left Card (White) */}
                    {hasLeft && (
                        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col">
                            {packageSection.leftTitle && (
                                <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] mb-4">
                                    {packageSection.leftTitle}
                                </h3>
                            )}
                            {packageSection.leftDescription && (
                                <div
                                    className="branch-so-pkg-left text-gray-700 text-sm sm:text-base leading-relaxed [&_p]:mb-3 [&_p:last-child]:mb-0 [&_strong]:text-gray-900"
                                    dangerouslySetInnerHTML={{
                                        __html: sanitize(packageSection.leftDescription),
                                    }}
                                />
                            )}
                        </div>
                    )}

                    {/* Right Card (Dark) */}
                    {hasRight && (
                        <div className="bg-[#230F17] text-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
                            <div>
                                {packageSection.rightTitle && (
                                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                                        {packageSection.rightTitle}
                                    </h3>
                                )}
                                {packageSection.rightDescription && (
                                    <div
                                        className="text-white/85 text-sm sm:text-base leading-relaxed mb-6 [&_p]:mb-3 [&_p:last-child]:mb-0 [&_strong]:text-white [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-3"
                                        dangerouslySetInnerHTML={{
                                            __html: sanitize(packageSection.rightDescription),
                                        }}
                                    />
                                )}
                            </div>

                            {packageSection.rightButtonText?.trim() && (
                                <button
                                    type="button"
                                    onClick={() => setShowModal(true)}
                                    className="bg-[#A8204B] hover:bg-[#8E193E] text-white font-semibold px-6 py-3 rounded-full text-sm transition cursor-pointer w-fit"
                                >
                                    {packageSection.rightButtonText}
                                </button>
                            )}
                        </div>
                    )}
                </div>

                <style jsx global>{`
                    .branch-so-pkg-left ul {
                        list-style: none;
                        padding-left: 0;
                        margin: 0.5rem 0;
                    }
                    .branch-so-pkg-left ul li {
                        position: relative;
                        padding-left: 1.5rem;
                        margin-bottom: 0.65rem;
                    }
                    .branch-so-pkg-left ul li::before {
                        content: "✓";
                        position: absolute;
                        left: 0;
                        top: 0.05rem;
                        color: #a8204b;
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
