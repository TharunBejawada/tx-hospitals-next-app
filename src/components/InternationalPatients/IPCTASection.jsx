import React, { useState } from "react";
import BookAppointmentForm from "@/components/Blogs/BookAppointemntForm";
import { Phone, Calendar } from "lucide-react";

export default function IPCTASection() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="py-6 sm:py-8 md:py-10 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className="rounded-[28px] p-6 sm:p-10 md:p-12 shadow-xl relative overflow-hidden"
                    style={{ backgroundColor: "#BD2850" }}
                >
                    {/* Background subtle decorative glow */}
                    <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-white/5 pointer-events-none blur-2xl" />
                    <div className="absolute -left-24 -bottom-24 w-80 h-80 rounded-full bg-black/10 pointer-events-none blur-2xl" />

                    <div className="relative z-10 max-w-3xl">
                        {/* Heading */}
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-white tracking-tight leading-tight">
                            Begin Your Journey Towards Better Health
                        </h2>

                        {/* Location Subtitle */}
                        <p className="mt-2.5 sm:mt-3 text-sm sm:text-base font-medium text-pink-100/90">
                            Location: Hyderabad, Telangana, India
                        </p>

                        {/* Action Buttons */}
                        <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
                            {/* Book Appointment CTA */}
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(true)}
                                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white text-[#BD2850] font-bold text-sm sm:text-base shadow-lg hover:bg-pink-50 transition-all duration-200 active:scale-95 cursor-pointer"
                            >
                                <Calendar className="w-4 h-4 text-[#BD2850]" />
                                <span>Book an Appointment</span>
                            </button>

                            {/* Call Us Link */}
                            <a
                                href="tel:+919144514459"
                                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-transparent text-white font-semibold text-sm sm:text-base border border-white/80 hover:border-white hover:bg-white/10 transition-all duration-200 active:scale-95"
                            >
                                <Phone className="w-4 h-4 text-white" />
                                <span>Call +919144514459</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Appointment Booking Modal */}
            {isModalOpen && (
                <BookAppointmentForm
                    showModal={isModalOpen}
                    setShowModal={setIsModalOpen}
                    redirectUrl="/thank-you/"
                    defaultLocation="TX Hospitals Banjara Hills"
                />
            )}
        </section>
    );
}

