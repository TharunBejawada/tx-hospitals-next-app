import React from "react";

export default function DiagnosticHighlights({ highlightsSection = {} }) {
    const items = Array.isArray(highlightsSection?.items)
        ? highlightsSection.items.filter((it) => it && (it.title?.trim() || it.description?.trim()))
        : [];

    if (!highlightsSection?.title && items.length === 0) return null;

    return (
        <section className="w-full bg-white py-6 md:py-10 px-4 sm:px-6 lg:px-8 font-inter">
            <div className="max-w-5xl mx-auto">
                {highlightsSection.title && (
                    <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-5">
                        {highlightsSection.title}
                    </h2>
                )}

                {items.length > 0 && (
                    <div className="space-y-3.5">
                        {items.map((item, idx) => {
                            const rawTitle = (item.title || "").trim();
                            const formattedTitle = rawTitle
                                ? rawTitle.endsWith(":")
                                    ? rawTitle
                                    : `${rawTitle}:`
                                : "";

                            return (
                                <div
                                    key={idx}
                                    className="w-full bg-[#fde0c2] rounded-full px-6 py-3.5 text-sm sm:text-[15px] text-gray-900 leading-relaxed"
                                >
                                    {formattedTitle && (
                                        <span className="font-bold text-gray-900 mr-1.5">
                                            {formattedTitle}
                                        </span>
                                    )}
                                    <span className="text-gray-800">{item.description}</span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
