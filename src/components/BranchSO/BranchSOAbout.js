import React from "react";
import sanitize from "@/utils/sanitize";

export default function BranchSOAbout({ about = {} }) {
    const hasContent = about?.title?.trim() || about?.description?.trim() || about?.image?.trim();
    if (!hasContent) return null;

    return (
        <section className="w-full bg-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 font-inter">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                {/* Left Column: Title + Description */}
                <div className={`w-full ${about.image ? "lg:w-7/12" : "lg:w-full"}`}>
                    {about.title && (
                        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#1A1A1A] leading-tight mb-5">
                            {about.title}
                        </h2>
                    )}

                    {about.description && (
                        <div
                            className="text-gray-600 text-base leading-relaxed [&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:text-gray-800 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_a]:text-[#A8204B] [&_a]:underline"
                            dangerouslySetInnerHTML={{ __html: sanitize(about.description) }}
                        />
                    )}
                </div>

                {/* Right Column: Image */}
                {about.image && (
                    <div className="w-full lg:w-5/12 flex justify-center">
                        <div className="w-full rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white">
                            <img
                                src={about.image}
                                alt={about.title || "Procedure Overview"}
                                className="w-full h-auto max-h-[420px] object-contain mx-auto"
                                loading="lazy"
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
