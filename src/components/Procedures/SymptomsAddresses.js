import React from "react";
import sanitize from "@/utils/sanitize";

const SymptomsAddresses = ({ data }) => {
    if (!data || data.length === 0) return null;

    const content = data[0];

    const formatDescription = (htmlContent) => {
        if (!htmlContent) return "";
        return htmlContent
            .replace(/<ul>/g, '<ul class="space-y-2">')
            .replace(/<li[^>]*>/g, `
                <li class="flex gap-3 items-start">
                    <span class="text-[#C23358] min-w-[20px] mt-1.5 flex-shrink-0">
                        <svg alt="Star Icon" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
                    </span>
                    <span class="text-gray-700 flex-1">
            `)
            .replace(/<\/li>/g, '</span></li>');
    };

    return (
        <div className="max-w-7xl mx-auto md:px-12 px-4 py-4 font-inter">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                {/* Left Column: Text Content */}
                <div className="w-full lg:w-3/5">
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
                        {content.heading}
                    </h2>
                    <div
                        className="text-gray-700 text-base md:text-lg leading-relaxed space-y-4"
                        dangerouslySetInnerHTML={{
                            __html: sanitize(formatDescription(content.description))
                        }}
                    />
                </div>

                {/* Right Column: Image */}
                {content.image && (
                    <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
                        <img
                            src={content.image}
                            alt={content.heading}
                            className="w-full h-auto object-contain max-h-[400px] rounded-xl"
                            loading="lazy"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SymptomsAddresses;
