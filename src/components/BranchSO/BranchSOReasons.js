import React from "react";
import sanitize from "@/utils/sanitize";

export default function BranchSOReasons({ reasonsSection = {} }) {
    const hasLeft = reasonsSection?.leftTitle?.trim() || reasonsSection?.leftDescription?.trim();
    const hasRight = reasonsSection?.rightTitle?.trim() || reasonsSection?.rightDescription?.trim();
    if (!hasLeft && !hasRight) return null;

    return (
        <section className="w-full bg-[#FAF1F4] py-12 md:py-16 px-4 sm:px-6 lg:px-8 font-inter">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                {/* Left Card (White) */}
                {hasLeft && (
                    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col">
                        {reasonsSection.leftTitle && (
                            <h2 className="text-2xl sm:text-[26px] font-bold text-[#1A1A1A] leading-snug mb-4">
                                {reasonsSection.leftTitle}
                            </h2>
                        )}
                        {reasonsSection.leftDescription && (
                            <div
                                className="branch-so-left-rich text-gray-600 text-sm sm:text-base leading-relaxed [&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:text-gray-800 [&_a]:text-[#A8204B] [&_a]:underline"
                                dangerouslySetInnerHTML={{ __html: sanitize(reasonsSection.leftDescription) }}
                            />
                        )}
                    </div>
                )}

                {/* Right Card (Maroon) */}
                {hasRight && (
                    <div className="bg-[#A8204B] text-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col">
                        {reasonsSection.rightTitle && (
                            <h2 className="text-2xl sm:text-[26px] font-bold text-white leading-snug mb-4">
                                {reasonsSection.rightTitle}
                            </h2>
                        )}
                        {reasonsSection.rightDescription && (
                            <div
                                className="branch-so-right-rich text-white/95 text-sm sm:text-base leading-relaxed [&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:text-white [&_a]:text-white [&_a]:underline"
                                dangerouslySetInnerHTML={{ __html: sanitize(reasonsSection.rightDescription) }}
                            />
                        )}
                    </div>
                )}
            </div>

            <style jsx global>{`
                .branch-so-left-rich ul,
                .branch-so-right-rich ul {
                    list-style: none;
                    padding-left: 0;
                    margin: 1rem 0;
                }
                .branch-so-left-rich ul li,
                .branch-so-right-rich ul li {
                    position: relative;
                    padding-left: 1.75rem;
                    margin-bottom: 0.65rem;
                }
                .branch-so-left-rich ul li::before {
                    content: "✓";
                    position: absolute;
                    left: 0;
                    top: 0.2rem;
                    width: 1.15rem;
                    height: 1.15rem;
                    border-radius: 9999px;
                    background-color: #fce7ee;
                    color: #a8204b;
                    font-size: 0.7rem;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .branch-so-right-rich ul li::before {
                    content: "✓";
                    position: absolute;
                    left: 0;
                    top: 0.05rem;
                    color: #ffffff;
                    font-size: 0.9rem;
                    font-weight: 700;
                }
            `}</style>
        </section>
    );
}
