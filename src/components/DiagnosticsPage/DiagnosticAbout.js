import React from "react";
import sanitize from "@/utils/sanitize";

export default function DiagnosticAbout({ about = {} }) {
    if (!about?.title && !about?.description) return null;

    return (
        <section className="w-full bg-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 font-inter">
            <div className="max-w-5xl mx-auto">
                {about.title && (
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#b51f56] text-center mb-6">
                        {about.title}
                    </h2>
                )}

                {about.description && (
                    <div
                        className="text-gray-800 text-base sm:text-[17px] leading-relaxed [&_p]:mb-3 [&_strong]:font-semibold [&_strong]:text-gray-900 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:text-[#b51f56] [&_a]:underline"
                        dangerouslySetInnerHTML={{ __html: sanitize(about.description) }}
                    />
                )}
            </div>
        </section>
    );
}
