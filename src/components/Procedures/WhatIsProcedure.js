import React from "react";
import sanitize from "@/utils/sanitize";

const WhatIsProcedure = ({ data }) => {
    if (!data || data.length === 0) return null;

    return (
        <div className="max-w-7xl mx-auto md:px-12 px-4 py-8 font-inter">
            {data.map((content, idx) => {
                const rawHeading = content?.heading || "";
                const prefixMatch = rawHeading.match(/^(What is(?:\s+an?)?)\s+(.+)$/i);
                const prefixText = prefixMatch ? prefixMatch[1] : rawHeading;
                const procedureText = prefixMatch ? prefixMatch[2] : "";

                return (
                    <div
                        key={idx}
                        className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 mb-10 last:mb-0"
                    >
                        {/* Left Column: Text Content */}
                        <div className={`w-full ${content?.image ? "lg:w-3/5" : "lg:w-full"} order-2 lg:order-1`}>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-snug">
                                {prefixMatch ? (
                                    <>
                                        {prefixText}{" "}
                                        <span className="text-[#C23358]">{procedureText}</span>
                                    </>
                                ) : (
                                    <span className="text-[#C23358]">{rawHeading}</span>
                                )}
                            </h2>
                            <div
                                className="text-gray-700 text-base md:text-lg leading-relaxed space-y-4 prose prose-a:text-[#C23358] prose-a:font-semibold max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html: sanitize(content?.description),
                                }}
                            />
                        </div>

                        {/* Right Column: Image */}
                        {content?.image && (
                            <div className="w-full lg:w-2/5 order-1 lg:order-2 flex justify-center">
                                <img
                                    src={content.image}
                                    alt={content.heading || "Procedure"}
                                    className="w-full h-auto object-contain max-h-[400px] rounded-lg shadow-sm"
                                    loading="lazy"
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default WhatIsProcedure;
