import React from "react";
import sanitize from "@/utils/sanitize";

const CARD_THEMES = [
    {
        headerBg: "bg-[#f9d7b5]",
        bodyBg: "bg-[#fcead7]",
        typeColor: "text-[#9a6b3b]",
    },
    {
        headerBg: "bg-[#f3ee9a]",
        bodyBg: "bg-[#f8f5c4]",
        typeColor: "text-[#8a8230]",
    },
    {
        headerBg: "bg-[#f7bcd5]",
        bodyBg: "bg-[#fbdce9]",
        typeColor: "text-[#9e4f72]",
    },
];

export default function DiagnosticTypes({ typesSection = {} }) {
    const items = Array.isArray(typesSection?.items)
        ? typesSection.items.filter(
              (it) => it && (it.type?.trim() || it.title?.trim() || it.subTitle?.trim() || it.description?.trim())
          )
        : [];

    if (!typesSection?.title && !typesSection?.subTitle && items.length === 0) {
        return null;
    }

    return (
        <section className="w-full bg-[#fdf0f4] py-12 md:py-16 px-4 sm:px-6 lg:px-8 font-inter">
            <div className="max-w-6xl mx-auto">
                {typesSection.title && (
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#b51f56] text-center mb-3">
                        {typesSection.title}
                    </h2>
                )}

                {typesSection.subTitle && (
                    <p className="text-base sm:text-lg text-gray-800 text-center mb-10">
                        {typesSection.subTitle}
                    </p>
                )}

                {items.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {items.map((item, idx) => {
                            const theme = CARD_THEMES[idx % CARD_THEMES.length];
                            return (
                                <div
                                    key={idx}
                                    className="rounded-3xl overflow-hidden shadow-sm flex flex-col"
                                >
                                    <div className={`${theme.headerBg} p-6`}>
                                        {item.type && (
                                            <p className={`text-sm font-medium mb-1.5 ${theme.typeColor}`}>
                                                {item.type}
                                            </p>
                                        )}
                                        {item.title && (
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                {item.title}
                                            </h3>
                                        )}
                                        {item.subTitle && (
                                            <p className="text-sm font-bold text-gray-900 leading-snug">
                                                {item.subTitle}
                                            </p>
                                        )}
                                    </div>

                                    <div className={`${theme.bodyBg} p-6 flex-1`}>
                                        {item.description && (
                                            <div
                                                className="text-gray-800 text-sm sm:text-[15px] leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-2.5 [&_p]:mb-2.5 [&_strong]:font-semibold"
                                                dangerouslySetInnerHTML={{ __html: sanitize(item.description) }}
                                            />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
