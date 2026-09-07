import React from "react";
import { FaPhoneAlt } from "react-icons/fa";

export default function HealthAwarenessCallToAction({ onBookClick }) {
    return (
        <section className="w-full bg-white py-10 md:py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="bg-[#c22055] rounded-3xl py-6 px-3 sm:px-12 md:py-12 md:px-2 text-center text-white shadow-xl flex flex-col items-center justify-center">

                    {/* Heading */}
                    <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-6 max-w-4xl">
                        Awareness Is the First Step. Action Is the Next.
                    </h2>

                    {/* Paragraph 1 & 2 */}
                    <div className="max-w-3xl mx-auto space-y-4 text-pink-50/95 text-sm sm:text-base md:text-base leading-relaxed mb-8 sm:mb-10 font-normal">
                        <p>
                            Reading about a health condition is useful, but your health should never depend on online information alone. If you have persistent symptoms, a family history of disease or simply have not had a check-up in a while, speak with a healthcare professional.
                        </p>
                        <p className="text-pink-100/90 text-xs sm:text-sm md:text-base font-normal">
                            At TX Hospitals, our multidisciplinary medical teams provide preventive, diagnostic and advanced treatment services across multiple specialties.
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-2xl">
                        {/* Phone Call Button */}
                        <a
                            href="tel:+919144514459"
                            className="w-full sm:w-auto bg-white hover:bg-pink-50 text-[#c22055] px-7 py-3.5 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 whitespace-nowrap"
                        >
                            <FaPhoneAlt className="text-sm text-[#c22055]" />
                            <span>+91 91445 14459</span>
                        </a>

                        {/* Symptom Check / Book Button */}
                        <button
                            onClick={onBookClick}
                            className="w-full sm:w-auto border border-white/40 bg-white/10 hover:bg-white/20 text-white px-4 py-3.5 rounded-full font-medium text-xs sm:text-sm md:text-sm transition-all duration-200 active:scale-95 text-center"
                        >
                            Worried about a symptom? Don’t keep guessing. Get it checked.
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}
