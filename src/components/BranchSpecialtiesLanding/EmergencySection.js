import React, { useState } from 'react';
import { Calendar, Phone, ShieldAlert } from 'lucide-react';
import BookAppointmentForm from '@/components/Blogs/BookAppointemntForm';

const EmergencySection = ({ location }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const formatString = (str) => {
        if (!str) return '';
        return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    };

    const formattedLocation = formatString(location) || 'Uppal';

    const conditions = [
        "Chest pain and cardiac emergencies",
        "Breathing difficulty",
        "Stroke symptoms",
        "Serious injuries and fractures",
        "Severe abdominal pain",
        "High fever and infections",
        "Seizures or loss of consciousness",
        "Sudden deterioration in existing medical conditions"
    ];

    return (
        <section className="py-16 bg-[#fff6f7]">
            <div className="max-w-[1170px] mx-auto px-6">
                <div className="bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden flex flex-col lg:flex-row">

                    {/* Left Panel: Primary Content */}
                    <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-4 bg-red-50 text-[#BD385C] px-3 py-1 rounded-full w-fit">
                            <ShieldAlert className="w-4 h-4 animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-wider">Emergency Support</span>
                        </div>

                        <h2 className="text-3xl font-bold mb-6 text-gray-900 leading-tight">
                            24/7 Emergency Care in <span className="text-[#BD385C]">{formattedLocation}</span>
                        </h2>

                        <p className="text-[15px] font-normal text-gray-700 leading-relaxed mb-6">
                            Medical emergencies can happen at any time. TX Hospitals {formattedLocation} provides 24/7 emergency care for patients who require immediate medical attention, stabilisation and further specialist treatment.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex-1 flex items-center justify-center gap-2 bg-[#BD385C] text-white px-6 py-3 rounded hover:bg-[#a53151] transition-all font-semibold text-sm w-full sm:w-auto"
                            >
                                <Calendar className="w-[16px] h-[16px]" />
                                Book Appointment
                            </button>

                            <a
                                href="tel:+919144514459"
                                className="flex-1 flex items-center justify-center gap-2 border-2 border-[#BD385C] text-[#BD385C] px-6 py-3 rounded hover:bg-red-50 transition-all font-semibold text-sm w-full sm:w-auto"
                            >
                                <Phone className="w-[16px] h-[16px]" />
                                Call +919144514459
                            </a>
                        </div>
                    </div>

                    {/* Right Panel: Managed Conditions */}
                    <div
                        className="w-full lg:w-1/2 p-8 md:p-12 text-white flex flex-col justify-center"
                        style={{ background: 'linear-gradient(135deg, rgb(189, 56, 92) 0%, rgb(148, 38, 69) 100%)' }}
                    >
                        <h3 className="text-lg font-bold mb-5 flex items-center gap-2 text-white/95">
                            Our emergency team is equipped to assess and manage conditions such as:
                        </h3>

                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                            {conditions.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2.5 text-sm font-medium text-white/90">
                                    <span className="w-1.5 h-1.5 bg-white rounded-full mt-1.5 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <p className="text-[13px] italic font-normal text-white/80 border-t border-white/10 pt-4">
                            Critical patients can be supported with specialist consultation and Critical Care services when required.
                        </p>
                    </div>

                </div>
            </div>

            {isModalOpen && (
                <BookAppointmentForm
                    showModal={isModalOpen}
                    setShowModal={setIsModalOpen}
                    redirectUrl={`/thank-you-${location?.toLowerCase() || 'uppal'}`}
                    defaultLocation={`TX Hospitals ${formattedLocation}`}
                />
            )}
        </section>
    );
};

export default EmergencySection;
