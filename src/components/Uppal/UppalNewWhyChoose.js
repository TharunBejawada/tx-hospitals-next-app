import React from 'react';
import { Award, Stethoscope, Cpu, Clock, MapPin, UserCheck } from 'lucide-react';

const UppalNewWhyChoose = () => {
    return (
        <section id="why-choose" className="py-16" style={{ background: 'rgb(254, 236, 236)' }}>
            <div className="max-w-[1170px] mx-auto px-6">
                <div className="text-center mb-10">
                    <h2 className="mb-3" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 600, color: 'rgb(3, 2, 19)' }}>
                        Why Choose <span style={{ color: 'rgb(189, 56, 92)' }}>TX Hospitals Uppal?</span>
                    </h2>
                    <p className="max-w-[800px] mx-auto" style={{ fontSize: '15px', fontWeight: 400, color: 'rgb(30, 30, 30)', lineHeight: 1.7 }}>
                        TX Hospitals Uppal is a NABH-accredited multispeciality hospital offering safe, trusted and patient-focused care with experienced doctors, advanced diagnostics, emergency support, and modern facilities.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* Item 1 */}
                    <div className="flex gap-4 p-5 rounded-xl bg-white" style={{ border: '0.5px solid rgb(240, 223, 229)', boxShadow: 'rgba(0, 0, 0, 0.08) 0px 1px 1px, rgba(0, 0, 0, 0.05) 0px 1px 1.5px' }}>
                        <div className="flex items-center justify-center w-11 h-11 rounded-full flex-shrink-0" style={{ background: 'rgb(240, 223, 229)' }}>
                            <Award className="w-5 h-5 text-[#BD385C]" strokeWidth={1.8} />
                        </div>
                        <div>
                            <h3 className="mb-1" style={{ fontSize: '14px', fontWeight: 600, color: 'rgb(3, 2, 19)', lineHeight: 1.4 }}>
                                NABH-Accredited Care
                            </h3>
                            <p style={{ fontSize: '13px', fontWeight: 400, color: 'rgb(108, 108, 108)', lineHeight: 1.6, margin: 0 }}>
                                Quality care with patient safety standards.
                            </p>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex gap-4 p-5 rounded-xl bg-white" style={{ border: '0.5px solid rgb(240, 223, 229)', boxShadow: 'rgba(0, 0, 0, 0.08) 0px 1px 1px, rgba(0, 0, 0, 0.05) 0px 1px 1.5px' }}>
                        <div className="flex items-center justify-center w-11 h-11 rounded-full flex-shrink-0" style={{ background: 'rgb(240, 223, 229)' }}>
                            <Stethoscope className="w-5 h-5 text-[#BD385C]" strokeWidth={1.8} />
                        </div>
                        <div>
                            <h3 className="mb-1" style={{ fontSize: '14px', fontWeight: 600, color: 'rgb(3, 2, 19)', lineHeight: 1.4 }}>
                                Expert Doctors
                            </h3>
                            <p style={{ fontSize: '13px', fontWeight: 400, color: 'rgb(108, 108, 108)', lineHeight: 1.6, margin: 0 }}>
                                Experienced specialists across major departments.
                            </p>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex gap-4 p-5 rounded-xl bg-white" style={{ border: '0.5px solid rgb(240, 223, 229)', boxShadow: 'rgba(0, 0, 0, 0.08) 0px 1px 1px, rgba(0, 0, 0, 0.05) 0px 1px 1.5px' }}>
                        <div className="flex items-center justify-center w-11 h-11 rounded-full flex-shrink-0" style={{ background: 'rgb(240, 223, 229)' }}>
                            <Cpu className="w-5 h-5 text-[#BD385C]" strokeWidth={1.8} />
                        </div>
                        <div>
                            <h3 className="mb-1" style={{ fontSize: '14px', fontWeight: 600, color: 'rgb(3, 2, 19)', lineHeight: 1.4 }}>
                                Advanced Diagnostics
                            </h3>
                            <p style={{ fontSize: '13px', fontWeight: 400, color: 'rgb(108, 108, 108)', lineHeight: 1.6, margin: 0 }}>
                                24/7 CT scan and accurate testing for faster decisions.
                            </p>
                        </div>
                    </div>

                    {/* Item 4 */}
                    <div className="flex gap-4 p-5 rounded-xl bg-white" style={{ border: '0.5px solid rgb(240, 223, 229)', boxShadow: 'rgba(0, 0, 0, 0.08) 0px 1px 1px, rgba(0, 0, 0, 0.05) 0px 1px 1.5px' }}>
                        <div className="flex items-center justify-center w-11 h-11 rounded-full flex-shrink-0" style={{ background: 'rgb(240, 223, 229)' }}>
                            <Clock className="w-5 h-5 text-[#BD385C]" strokeWidth={1.8} />
                        </div>
                        <div>
                            <h3 className="mb-1" style={{ fontSize: '14px', fontWeight: 600, color: 'rgb(3, 2, 19)', lineHeight: 1.4 }}>
                                24/7 Emergency Support
                            </h3>
                            <p style={{ fontSize: '13px', fontWeight: 400, color: 'rgb(108, 108, 108)', lineHeight: 1.6, margin: 0 }}>
                                Ready care for urgent medical needs.
                            </p>
                        </div>
                    </div>

                    {/* Item 5 */}
                    <div className="flex gap-4 p-5 rounded-xl bg-white" style={{ border: '0.5px solid rgb(240, 223, 229)', boxShadow: 'rgba(0, 0, 0, 0.08) 0px 1px 1px, rgba(0, 0, 0, 0.05) 0px 1px 1.5px' }}>
                        <div className="flex items-center justify-center w-11 h-11 rounded-full flex-shrink-0" style={{ background: 'rgb(240, 223, 229)' }}>
                            <MapPin className="w-5 h-5 text-[#BD385C]" strokeWidth={1.8} />
                        </div>
                        <div>
                            <h3 className="mb-1" style={{ fontSize: '14px', fontWeight: 600, color: 'rgb(3, 2, 19)', lineHeight: 1.4 }}>
                                Easy Location Access
                            </h3>
                            <p style={{ fontSize: '13px', fontWeight: 400, color: 'rgb(108, 108, 108)', lineHeight: 1.6, margin: 0 }}>
                                Conveniently located in Uppal, near Nagole & Boduppal.
                            </p>
                        </div>
                    </div>

                    {/* Item 6 */}
                    <div className="flex gap-4 p-5 rounded-xl bg-white" style={{ border: '0.5px solid rgb(240, 223, 229)', boxShadow: 'rgba(0, 0, 0, 0.08) 0px 1px 1px, rgba(0, 0, 0, 0.05) 0px 1px 1.5px' }}>
                        <div className="flex items-center justify-center w-11 h-11 rounded-full flex-shrink-0" style={{ background: 'rgb(240, 223, 229)' }}>
                            <UserCheck className="w-5 h-5 text-[#BD385C]" strokeWidth={1.8} />
                        </div>
                        <div>
                            <h3 className="mb-1" style={{ fontSize: '14px', fontWeight: 600, color: 'rgb(3, 2, 19)', lineHeight: 1.4 }}>
                                Patient-First Approach
                            </h3>
                            <p style={{ fontSize: '13px', fontWeight: 400, color: 'rgb(108, 108, 108)', lineHeight: 1.6, margin: 0 }}>
                                Clear guidance, comfort, and compassionate care.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UppalNewWhyChoose;
