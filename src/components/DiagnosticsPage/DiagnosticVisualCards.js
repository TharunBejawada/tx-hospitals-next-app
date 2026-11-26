import React from "react";

export default function DiagnosticVisualCards({ visualCardsSection = {} }) {
    const tabs = Array.isArray(visualCardsSection?.tabs)
        ? visualCardsSection.tabs.filter((t) => t && (t.title?.trim() || t.description?.trim()))
        : [];

    if (!visualCardsSection?.title && !visualCardsSection?.image && tabs.length === 0) {
        return null;
    }

    return (
        <section className="w-full bg-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 font-inter">
            <div className="max-w-7xl mx-auto">
                {visualCardsSection.title && (
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
                        {visualCardsSection.title}
                    </h2>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Left Numbered Cards */}
                    <div className={visualCardsSection.image ? "lg:col-span-7" : "lg:col-span-12"}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {tabs.map((tab, idx) => (
                                <div
                                    key={idx}
                                    className="relative bg-[#fdf6f8] border border-[#f5dfe6] rounded-xl shadow-sm p-5 pt-4 overflow-hidden"
                                >
                                    {/* Top-left Number Badge */}
                                    <div className="flex items-start gap-3 mb-2">
                                        <span className="bg-[#b5174d] text-white font-bold text-lg w-12 h-11 -ml-5 -mt-4 flex items-center justify-center rounded-br-2xl shrink-0">
                                            {String(idx + 1).padStart(2, "0")}
                                        </span>
                                        <div className="pt-0.5">
                                            {tab.title && (
                                                <h3 className="text-[#b5174d] font-bold text-base sm:text-[17px] leading-snug">
                                                    {tab.title}
                                                </h3>
                                            )}
                                            <div className="w-8 h-0.5 bg-[#b5174d] mt-1.5" />
                                        </div>
                                    </div>

                                    {tab.description && (
                                        <p className="text-gray-700 text-sm leading-relaxed pl-9">
                                            {tab.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Diagram / Image */}
                    {visualCardsSection.image && (
                        <div className="lg:col-span-5 flex justify-center">
                            <img
                                src={visualCardsSection.image}
                                alt={visualCardsSection.title || "Diagnostic Illustration"}
                                className="w-full max-w-md object-contain"
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
