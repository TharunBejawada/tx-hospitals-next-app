import React from "react";
import sanitize from "@/utils/sanitize";

export default function BranchSOCost({ costSection = {} }) {
    const items = Array.isArray(costSection.items)
        ? costSection.items.filter((item) => item && (item.title?.trim() || item.description?.trim()))
        : [];

    const hasContent =
        costSection.title?.trim() ||
        costSection.description?.trim() ||
        costSection.subTitle?.trim() ||
        items.length > 0;

    if (!hasContent) return null;

    return (
        <section className="w-full bg-[#FAF1F4] py-12 md:py-16 px-4 sm:px-6 lg:px-8 font-inter">
            <div className="max-w-7xl mx-auto">
                {costSection.title && (
                    <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#1A1A1A] leading-tight mb-3">
                        {costSection.title}
                    </h2>
                )}

                {costSection.description && (
                    <div
                        className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8 [&_p]:mb-3 [&_p:last-child]:mb-0 [&_strong]:text-gray-800 [&_a]:text-[#A8204B] [&_a]:underline"
                        dangerouslySetInnerHTML={{ __html: sanitize(costSection.description) }}
                    />
                )}

                {costSection.subTitle && (
                    <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] mb-5">
                        {costSection.subTitle}
                    </h3>
                )}

                {items.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {items.map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-xl border border-gray-200/70 p-5 shadow-sm flex flex-col"
                            >
                                {item.title && (
                                    <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5 leading-snug">
                                        {item.title}
                                    </h4>
                                )}
                                {item.description && (
                                    <div
                                        className="text-gray-600 text-xs sm:text-sm leading-relaxed [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:text-gray-800 [&_a]:text-[#A8204B] [&_a]:underline"
                                        dangerouslySetInnerHTML={{ __html: sanitize(item.description) }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
