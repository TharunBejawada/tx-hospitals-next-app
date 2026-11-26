import React from "react";

const STEP_THEMES = [
    {
        circle: "bg-[#fde1c4] border-[#f59e6c] text-[#f59e6c]",
        line: "bg-[#fde1c4]",
    },
    {
        circle: "bg-[#f4f1b8] border-[#c8c04e] text-[#6b651a]",
        line: "bg-[#f9d7e7]",
    },
    {
        circle: "bg-[#f9d7e7] border-[#d46b9a] text-[#d46b9a]",
        line: "bg-[#dbeafe]",
    },
    {
        circle: "bg-[#dbeafe] border-[#60a5fa] text-[#2563eb]",
        line: "bg-[#d1fae5]",
    },
    {
        circle: "bg-[#d1fae5] border-[#34d399] text-[#059669]",
        line: "bg-[#ede9fe]",
    },
    {
        circle: "bg-[#ede9fe] border-[#a78bfa] text-[#7c3aed]",
        line: "bg-[#fde1c4]",
    },
];

export default function DiagnosticSteps({ stepsSection = {} }) {
    const steps = Array.isArray(stepsSection?.steps)
        ? stepsSection.steps.filter((s) => s && (s.title?.trim() || s.description?.trim()))
        : [];

    if (!stepsSection?.title && steps.length === 0) return null;

    return (
        <section className="w-full bg-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 font-inter">
            <div className="max-w-4xl mx-auto">
                {stepsSection.title && (
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#b51f56] text-center mb-10">
                        {stepsSection.title}
                    </h2>
                )}

                {steps.length > 0 && (
                    <div className="flex flex-col">
                        {steps.map((step, idx) => {
                            const theme = STEP_THEMES[idx % STEP_THEMES.length];
                            const isLast = idx === steps.length - 1;
                            const rawTitle = (step.title || "").trim();
                            const formattedTitle = rawTitle
                                ? rawTitle.endsWith(":")
                                    ? rawTitle
                                    : `${rawTitle}:`
                                : "";

                            return (
                                <div key={idx} className="flex items-stretch gap-5 sm:gap-7">
                                    {/* Left Circle + Connecting Line */}
                                    <div className="flex flex-col items-center shrink-0">
                                        <div
                                            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-lg shrink-0 ${theme.circle}`}
                                        >
                                            {idx + 1}
                                        </div>
                                        {!isLast && (
                                            <div className={`w-0.5 flex-1 min-h-[32px] my-1 ${theme.line}`} />
                                        )}
                                    </div>

                                    {/* Right Content */}
                                    <div className={isLast ? "pt-1" : "pt-1 pb-8"}>
                                        {formattedTitle && (
                                            <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1.5">
                                                {formattedTitle}
                                            </h3>
                                        )}
                                        {step.description && (
                                            <p className="text-gray-800 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                                                {step.description}
                                            </p>
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
