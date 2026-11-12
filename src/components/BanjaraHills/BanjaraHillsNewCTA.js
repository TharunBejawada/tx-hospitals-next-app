import React, { useState } from 'react';
import { Calendar, Phone, Heart } from 'lucide-react';
import BookAppointmentForm from '@/components/Blogs/BookAppointemntForm';

const BanjaraHillsNewCTA = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="py-8 md:py-10 bg-[#FCEBEB]">
            <div className="max-w-[1170px] mx-auto px-6">
                <div className="rounded-2xl p-8 md:p-10 text-center flex flex-col items-center gap-6 shadow-md" style={{ background: 'rgb(189, 56, 92)' }}>
                    <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 600, color: 'rgb(255, 255, 255)', lineHeight: 1.3 }}>
                        Top Kidney & Liver Transplant Care in Banjara Hills
                    </h2>
                    
                    <p className="max-w-[950px]" style={{ fontSize: '14.5px', fontWeight: 400, color: 'rgba(255, 255, 255, 0.95)', lineHeight: 1.7 }}>
                        TX Hospitals Banjara Hills provides expert care for patients who need advanced kidney and liver transplant support. Our transplant team helps patients with evaluation, diagnosis, donor assessment, pre-transplant guidance, surgery planning and post-transplant follow-up care. With experienced specialists, advanced ICU support and a multidisciplinary approach, we focus on safe treatment, smooth recovery and long-term patient care.
                    </p>

                    <div style={{ fontSize: '15px', fontWeight: 600, color: 'rgb(255, 255, 255)', letterSpacing: '0.5px' }} className="my-1">
                        Kidney Transplant | Liver Transplant | Donor Evaluation | Post-Transplant Care
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-4 mt-2">
                        <button 
                            onClick={() => setIsModalOpen(true)} 
                            className="flex items-center gap-2 px-6 py-3 rounded-lg transition-opacity hover:opacity-90 shadow-sm" 
                            style={{ background: 'rgb(255, 255, 255)', fontSize: '14px', fontWeight: 600, color: 'rgb(189, 56, 92)', border: 'none' }}
                        >
                            <Calendar className="w-4 h-4" />
                            Book Appointment
                        </button>
                        
                        <a 
                            href="tel:+919144514459" 
                            className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all hover:bg-white hover:text-[#BD385C]" 
                            style={{ background: 'transparent', fontSize: '14px', fontWeight: 600, color: 'rgb(255, 255, 255)', border: '1.5px solid rgba(255, 255, 255, 0.8)' }}
                        >
                            <Phone className="w-4 h-4" />
                            Call +91-91445 14459
                        </a>
                        
                        <button 
                            onClick={() => setIsModalOpen(true)} 
                            className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all hover:bg-white hover:text-[#BD385C]" 
                            style={{ background: 'transparent', fontSize: '14px', fontWeight: 600, color: 'rgb(255, 255, 255)', border: '1.5px solid rgba(255, 255, 255, 0.8)' }}
                        >
                            <Heart className="w-4 h-4" />
                            Book Health Check Up
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <BookAppointmentForm
                    showModal={isModalOpen}
                    setShowModal={setIsModalOpen}
                    redirectUrl="/thank-you-banjara-hills"
                    defaultLocation="TX Hospitals Banjara Hills"
                />
            )}
        </section>
    );
};

export default BanjaraHillsNewCTA;
