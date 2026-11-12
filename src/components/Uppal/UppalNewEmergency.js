import React, { useState } from 'react';
import { Calendar, Phone, Heart } from 'lucide-react';
import BookAppointmentForm from '@/components/Blogs/BookAppointemntForm';

const UppalNewEmergency = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="py-12 md:py-16 px-6" style={{ background: 'rgb(255, 255, 255)' }}>
            <div
                className="max-w-[1170px] mx-auto rounded-3xl p-8 md:p-14 text-white text-center shadow-xl relative overflow-hidden px-6 lg:pr-11"
                style={{ background: 'rgb(189, 56, 92)' }}
            >
                {/* Background decorative subtle circles */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-12 -translate-y-12" />
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-16 translate-y-16" />

                <div className="relative z-10">
                    <h2
                        className="mb-6 text-2xl md:text-3xl lg:text-4xl font-bold leading-tight"

                    >
                        24/7 Emergency Care in Uppal, Ready When You Need Us Most
                    </h2>

                    <p
                        className="max-w-[850px] mx-auto text-sm md:text-base leading-relaxed mb-8 text-white/90"
                        style={{ fontWeight: 400 }}
                    >
                        TX Hospitals, Uppal offers 24/7 emergency care for accidents, injuries, chest pain, breathing difficulties, high fever and other urgent health concerns. Our expert team, ICU support, diagnostics and ambulance services ensure quick medical attention.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center justify-center gap-2 bg-white text-[#BD385C] px-6 py-3 rounded-lg hover:bg-white/90 transition-all duration-200 w-full sm:w-auto shadow-md font-semibold text-sm md:text-base border border-transparent"

                        >
                            <Calendar className="w-[18px] h-[18px]" />
                            Book Appointment
                        </button>

                        <a
                            href="tel:+919144514459"
                            className="flex items-center justify-center gap-2 border border-white text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-all duration-200 w-full sm:w-auto font-semibold text-sm md:text-base"

                        >
                            <Phone className="w-[18px] h-[18px]" />
                            Call +919144514459
                        </a>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center justify-center gap-2 border border-white text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-all duration-200 w-full sm:w-auto font-semibold text-sm md:text-base"

                        >
                            <Heart className="w-[18px] h-[18px]" />
                            Book Health Check Up
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <BookAppointmentForm
                    showModal={isModalOpen}
                    setShowModal={setIsModalOpen}
                    redirectUrl="/thank-you-uppal"
                    defaultLocation="TX Hospitals Uppal"
                />
            )}
        </section>
    );
};

export default UppalNewEmergency;
