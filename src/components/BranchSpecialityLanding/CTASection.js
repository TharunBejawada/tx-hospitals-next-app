import React, { useState } from 'react';
import { Calendar, Phone } from 'lucide-react';
import BookAppointmentForm from '@/components/Blogs/BookAppointemntForm';

const CTASection = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!data) return null;

    return (
        <section className="py-10 md:py-14" style={{ background: 'linear-gradient(135deg, #fdf8f9 0%, #f4f6f9 100%)' }}>
            <div className="max-w-[1150px] mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className="rounded-2xl md:rounded-[24px] p-8 md:p-12 lg:p-16 text-center relative overflow-hidden"
                    style={{ backgroundColor: 'rgb(189, 56, 92)', boxShadow: '0 20px 40px rgba(189, 56, 92, 0.15)' }}
                >
                    <div className="relative z-10 max-w-4xl mx-auto">
                        {data.title && (
                            <h2 className="text-2xl md:text-[36px] font-bold text-white mb-6 leading-tight">
                                {data.title}
                            </h2>
                        )}

                        {data.description && (
                            <div
                                className="text-white text-[15px] md:text-[16.5px] leading-relaxed mb-6 font-normal mx-auto cta-desc"
                                dangerouslySetInnerHTML={{ __html: data.description }}
                                style={{ opacity: 0.95 }}
                            />
                        )}

                        <p className="text-white font-bold text-[16px] md:text-[18px] mb-10">
                            Call +91 9144514459 to book your appointment today.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full sm:w-auto bg-white text-[#bd385c] hover:bg-gray-50 flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-md transition-all duration-300 font-semibold text-[15px] shadow-sm transform hover:-translate-y-0.5"
                            >
                                <Calendar className="w-[18px] h-[18px]" strokeWidth={2.5} />
                                Book Appointment
                            </button>

                            <a
                                href="tel:+919144514459"
                                className="w-full sm:w-auto bg-transparent border-[1.5px] border-white text-white hover:bg-white/10 flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-md transition-all duration-300 font-semibold text-[15px] transform hover:-translate-y-0.5"
                            >
                                <Phone className="w-[18px] h-[18px]" strokeWidth={2.5} />
                                Call +91 91445 14459
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scoped style to ensure any API injected text adopts the white theme */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .cta-desc p, .cta-desc span {
                    color: inherit !important;
                }
            `}} />

            {isModalOpen && (
                <BookAppointmentForm
                    showModal={isModalOpen}
                    setShowModal={setIsModalOpen}
                />
            )}
        </section>
    );
};

export default CTASection;
