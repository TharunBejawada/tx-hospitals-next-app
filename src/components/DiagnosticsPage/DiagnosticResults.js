import React from "react";
import sanitize from "@/utils/sanitize";

export default function DiagnosticResults({ resultsSection = {} }) {
    if (!resultsSection?.title && !resultsSection?.description) return null;

    return (
        <section className="w-full bg-[#fdf7f9] py-12 md:py-16 px-4 sm:px-6 lg:px-8 font-inter">
            <div className="max-w-4xl mx-auto">
                {resultsSection.title && (
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#b51f56] text-center mb-6">
                        {resultsSection.title}
                    </h2>
                )}

                {resultsSection.description && (
                    <div
                        className="text-gray-800 text-base sm:text-[17px] leading-relaxed [&_p]:text-center [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-5 [&_ul]:text-left [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-5 [&_ol]:text-left [&_li]:mb-2.5 [&_strong]:font-bold [&_strong]:text-gray-900 [&_a]:text-[#b51f56] [&_a]:underline"
                        dangerouslySetInnerHTML={{ __html: sanitize(resultsSection.description) }}
                    />
                )}
            </div>
        </section>
    );
}
