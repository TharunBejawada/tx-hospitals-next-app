import React from "react";
import { FiCheckSquare } from "react-icons/fi";
import sanitize from "@/utils/sanitize";

function renderDescriptionWithTickIcons(html) {
    if (!html) return null;
    const clean = sanitize(html);
    const parts = clean.split(/(<ul[^>]*>[\s\S]*?<\/ul>)/gi);

    return parts.map((part, idx) => {
        if (!part || !part.trim()) return null;

        if (/^<ul/i.test(part.trim())) {
            const listItems = [];
            const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
            let match;
            while ((match = liRegex.exec(part)) !== null) {
                if (match[1]?.trim()) {
                    listItems.push(match[1]);
                }
            }

            if (listItems.length === 0) return null;

            return (
                <ul key={idx} className="space-y-3 my-5">
                    {listItems.map((liHtml, liIdx) => (
                        <li key={liIdx} className="flex items-start gap-3">
                            <FiCheckSquare className="w-5 h-5 text-[#A8204B] flex-shrink-0 mt-0.5" />
                            <span
                                className="text-gray-700 text-sm sm:text-base leading-relaxed [&_strong]:text-gray-900 [&_a]:text-[#A8204B] [&_a]:underline"
                                dangerouslySetInnerHTML={{ __html: liHtml }}
                            />
                        </li>
                    ))}
                </ul>
            );
        }

        return (
            <div
                key={idx}
                className="text-gray-600 text-sm sm:text-base leading-relaxed [&_p]:mb-3 [&_p:last-child]:mb-0 [&_strong]:text-gray-900 [&_a]:text-[#A8204B] [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: part }}
            />
        );
    });
}

export default function BranchSOWhyChoose({ whyChooseSection = {} }) {
    const hasContent =
        whyChooseSection.title?.trim() ||
        whyChooseSection.description?.trim() ||
        whyChooseSection.bottomDescription?.trim();

    if (!hasContent) return null;

    return (
        <section className="w-full bg-[#FAF1F4] py-12 md:py-16 px-4 sm:px-6 lg:px-8 font-inter">
            <div className="max-w-7xl mx-auto">
                {whyChooseSection.title && (
                    <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#A8204B] leading-tight mb-4">
                        {whyChooseSection.title}
                    </h2>
                )}

                {whyChooseSection.description && (
                    <div className="mb-5">
                        {renderDescriptionWithTickIcons(whyChooseSection.description)}
                    </div>
                )}

                {whyChooseSection.bottomDescription && (
                    <div
                        className="text-gray-600 text-sm sm:text-base leading-relaxed mt-5 [&_p]:mb-3 [&_p:last-child]:mb-0 [&_strong]:text-gray-900 [&_a]:text-[#A8204B] [&_a]:underline"
                        dangerouslySetInnerHTML={{
                            __html: sanitize(whyChooseSection.bottomDescription),
                        }}
                    />
                )}
            </div>
        </section>
    );
}
