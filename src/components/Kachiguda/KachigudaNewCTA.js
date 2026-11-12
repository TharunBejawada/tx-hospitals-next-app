import React, { useState } from 'react';
import { Calendar, Phone, HeartPulse } from 'lucide-react';
import BookAppointmentForm from '@/components/Blogs/BookAppointemntForm';

const KachigudaNewCTA = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="py-14" style={{ background: 'linear-gradient(rgba(189, 56, 92, 0.15) 0%, rgba(31, 17, 50, 0.12) 100%)' }}>
            <div className="max-w-[1170px] mx-auto px-6">
                <div className="rounded-lg p-10 text-center flex flex-col items-center gap-6" style={{ background: 'rgb(189, 56, 92)' }}>
                    <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 600, color: 'rgb(255, 255, 255)' }}>
                        Need Expert Medical Care in Kachiguda?
                    </h2>
                    <p className="max-w-[850px]" style={{ fontSize: '15px', fontWeight: 400, color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.7 }}>
                        Don't delay your health concerns. Whether it is a regular consultation, emergency care, diagnostic test, surgery or second opinion, TX Hospitals Kachiguda is ready to help you with trusted medical care close to home.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-8 py-3 rounded transition-opacity hover:opacity-90 shadow-md" style={{ background: 'rgb(255, 255, 255)', fontSize: '15px', fontWeight: 500, color: 'rgb(189, 56, 92)', border: 'none' }}>
                            <Calendar className="w-4 h-4" />
                            Book Appointment
                        </button>
                        <a href="tel:+919144514459" className="flex items-center gap-2 px-6 py-3 rounded transition-all hover:bg-white hover:text-[#BD385C]" style={{ background: 'transparent', fontSize: '15px', fontWeight: 500, color: 'rgb(255, 255, 255)', border: '1.5px solid rgba(255, 255, 255, 0.7)' }}>
                            <Phone className="w-4 h-4" />
                            Call +919144514459
                        </a>
                        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-6 py-3 rounded transition-all hover:bg-white hover:text-[#BD385C]" style={{ background: 'transparent', fontSize: '15px', fontWeight: 500, color: 'rgb(255, 255, 255)', border: '1.5px solid rgba(255, 255, 255, 0.7)' }}>
                            <HeartPulse className="w-4 h-4" />
                            Book Health Check Up
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <BookAppointmentForm
                    showModal={isModalOpen}
                    setShowModal={setIsModalOpen}
                    redirectUrl="/thank-you-kachiguda"
                    defaultLocation="TX Hospitals Kachiguda"
                />
            )}
        </section>
    );
};

export default KachigudaNewCTA;
