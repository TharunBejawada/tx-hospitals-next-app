import React, { useState } from "react";
import sanitize from "@/utils/sanitize";
import BookAppointmentForm from "@/components/Blogs/BookAppointemntForm";

export default function DiagnosticWhyDone({ whyDoneSection = {}, diagnosticName = "" }) {
    const [showModal, setShowModal] = useState(false);

    if (!whyDoneSection?.title && !whyDoneSection?.subTitle && !whyDoneSection?.description) {
        return null;
    }

    return (
        <>
            <section className="w-full bg-[#fdf0f4] py-12 md:py-16 px-4 sm:px-6 lg:px-8 font-inter">
                <div className="max-w-4xl mx-auto">
                    {whyDoneSection.title && (
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#b51f56] text-center mb-3">
                            {whyDoneSection.title}
                        </h2>
                    )}

                    {whyDoneSection.subTitle && (
                        <p className="text-base sm:text-lg text-gray-800 text-center mb-8">
                            {whyDoneSection.subTitle}
                        </p>
                    )}

                    {whyDoneSection.description && (
                        <div className="bg-white rounded-3xl shadow-sm p-6 sm:p-10 mb-8">
                            <div
                                className="text-gray-800 text-sm sm:text-base leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-3 [&_p]:mb-3 [&_strong]:font-semibold [&_strong]:text-gray-900"
                                dangerouslySetInnerHTML={{ __html: sanitize(whyDoneSection.description) }}
                            />
                        </div>
                    )}

                    <div className="flex justify-center">
                        <div className="inline-flex flex-wrap items-center justify-center gap-4 bg-[#fdfdc7] rounded-full px-6 py-2.5 shadow-sm">
                            <span className="text-sm sm:text-base font-medium text-gray-900">
                                Need an appointment ?
                            </span>
                            <button
                                type="button"
                                onClick={() => setShowModal(true)}
                                className="bg-[#ffd426] hover:bg-[#f5c710] text-gray-900 font-bold px-6 py-2 rounded-full transition cursor-pointer text-sm sm:text-base"
                            >
                                Click Here
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl">
                        <BookAppointmentForm
                            pageName={diagnosticName || whyDoneSection.title || "TX Hospitals Diagnostics"}
                            onClose={() => setShowModal(false)}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
