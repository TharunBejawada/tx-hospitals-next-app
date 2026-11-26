import React from "react";

export default function DiagnosticCTA({ ctaSection = {} }) {
    if (!ctaSection?.title && !ctaSection?.description && !ctaSection?.belowText) {
        return null;
    }

    return (
        <section className="w-full bg-white py-10 md:py-14 px-4 sm:px-6 lg:px-8 font-inter">
            <div className="max-w-5xl mx-auto bg-[#fde0c2] rounded-3xl px-6 sm:px-12 py-10 text-center shadow-sm">
                {ctaSection.title && (
                    <h2 className="text-xl sm:text-2xl font-bold text-[#c11850] mb-4">
                        {ctaSection.title}
                    </h2>
                )}

                {ctaSection.description && (
                    <p className="text-gray-900 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto mb-6 whitespace-pre-line">
                        {ctaSection.description}
                    </p>
                )}

                <div>
                    <a
                        href="tel:+919144514459"
                        className="inline-block bg-[#b5174d] hover:bg-[#991240] text-white font-bold text-sm sm:text-base px-8 py-3 rounded-full shadow-sm transition"
                    >
                        Call Now: +91 91445 14459
                    </a>
                </div>

                {ctaSection.belowText && (
                    <p className="text-gray-900 text-sm sm:text-base mt-5">
                        {ctaSection.belowText}
                    </p>
                )}
            </div>
        </section>
    );
}
