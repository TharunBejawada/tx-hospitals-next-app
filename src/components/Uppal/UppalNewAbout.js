import React from 'react';
import Image from 'next/image';

const UppalNewAbout = () => {
    return (
        <section id="about" style={{ background: 'rgb(255, 255, 255)' }} className="px-6">
            <div className="max-w-[1170px] mx-auto flex flex-col lg:flex-row">
                <div className="w-full lg:w-[48%] flex-shrink-0 flex items-center justify-center p-6">
                    <div className="w-full rounded-2xl overflow-hidden shadow-md">
                        <Image
                            src="/assets/Uppal/Welcome-Uppal.jpg"
                            alt="Welcome to TX Hospitals Uppal Multispecialty Building Exterior"
                            width={600}
                            height={400}
                            className="w-full h-auto object-contain"
                            priority
                        />
                    </div>
                </div>
                <div className="flex-1 flex flex-col justify-center py-2 lg:py-4 lg:pl-10 lg:pr-11">
                    <h2 className="mb-2" style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', fontWeight: 600, color: 'rgb(3, 2, 19)', lineHeight: 1.25 }}>
                        Multi specialty Hospital in Uppal - <span style={{ color: 'rgb(189, 56, 92)' }}>TX Hospitals</span>
                    </h2>
                    <p className="mb-3" style={{ fontSize: '14px', fontWeight: 400, color: 'rgb(30, 30, 30)', lineHeight: 1.75 }}>
                        TX Hospitals, Uppal brings trusted healthcare closer to your neighbourhood with experienced doctors, 24/7 emergency care, CT scan, diagnostics, ICU support, modern operation theatres and surgical care under one roof.
                    </p>
                    <p className="mb-2" style={{ fontSize: '14px', fontWeight: 400, color: 'rgb(30, 30, 30)', lineHeight: 1.75 }}>
                        From regular health checkups to emergency treatment and specialist consultations, TX Hospitals, Uppal offers convenient, patient-friendly care for families in Uppal, Nagole, Boduppal, Ramanthapur, Habsiguda, Kothapet and nearby areas.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default UppalNewAbout;
