import React from "react";
import sanitize from "@/utils/sanitize";

export default function BranchSOBenefits({ benefitsSection = {} }) {
    const items = Array.isArray(benefitsSection.items)
        ? benefitsSection.items.filter((item) => item && (item.title?.trim() || item.description?.trim()))
        : [];

    const hasContent =
        benefitsSection.title?.trim() ||
        benefitsSection.description?.trim() ||
        items.length > 0 ||
        benefitsSection.bottomDescription?.trim();

    if (!hasContent) return null;

    return (
        <section className="w-full bg-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 font-inter">
            <div className="max-w-7xl mx-auto">
                {benefitsSection.title && (
                    <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#1A1A1A] leading-tight mb-3">
                        {benefitsSection.title}
                    </h2>
                )}

                {benefitsSection.description && (
                    <div
                        className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8 [&_p]:mb-3 [&_p:last-child]:mb-0 [&_strong]:text-gray-800 [&_a]:text-[#A8204B] [&_a]:underline"
                        dangerouslySetInnerHTML={{ __html: sanitize(benefitsSection.description) }}
                    />
                )}

                {items.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                        {items.map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl border border-[#F3DCE4] p-5 sm:p-6 shadow-sm flex flex-col"
                            >
                                <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#FCE7EE] text-[#A8204B] font-bold text-xs mb-4">
                                    {String(idx + 1).padStart(2, "0")}
                                </span>

                                {item.title && (
                                    <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug">
                                        {item.title}
                                    </h3>
                                )}

                                {item.description && (
                                    <div
                                        className="text-gray-600 text-sm leading-relaxed [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:text-gray-800 [&_a]:text-[#A8204B] [&_a]:underline"
                                        dangerouslySetInnerHTML={{ __html: sanitize(item.description) }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {benefitsSection.bottomDescription && (
                    <div
                        className="text-gray-600 text-sm sm:text-base leading-relaxed [&_p]:mb-3 [&_p:last-child]:mb-0 [&_strong]:text-gray-800 [&_a]:text-[#A8204B] [&_a]:underline"
                        dangerouslySetInnerHTML={{ __html: sanitize(benefitsSection.bottomDescription) }}
                    />
                )}
            </div>
        </section>
    );
}
