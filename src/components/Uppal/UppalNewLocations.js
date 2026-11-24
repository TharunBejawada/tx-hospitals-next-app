import React from 'react';
import { MapPin, Star } from 'lucide-react';

const UppalNewLocations = () => {
    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="max-w-[1170px] mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    <div className="lg:w-[280px] flex-shrink-0">
                        <h2 className="mb-4" style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, color: 'rgb(189, 56, 92)', lineHeight: 1.15 }}>
                            Our<br />Locations
                        </h2>
                        <p className="mb-8" style={{ fontSize: '15px', fontWeight: 400, color: 'rgb(30, 30, 30)', lineHeight: 1.7 }}>
                            Find the world-class hospital nearest to you. TX Hospitals brings expert multispeciality care across Hyderabad.
                        </p>
                    </div>

                    <div className="flex-1">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">

                            {/* Location 1: Uppal */}
                            <div className="bg-white rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" style={{ border: '0.5px solid rgb(183, 183, 183)', boxShadow: 'rgba(0, 0, 0, 0.08) 0px 1px 1px, rgba(0, 0, 0, 0.05) 0px 1px 1.5px' }}>
                                <div className="overflow-hidden" style={{ height: '190px' }}>
                                    <img src="/assets/Our Location/Uppal Location Image.png" alt="TX Hospitals Uppal Branch Building Exterior" className="w-full h-full object-cover bg-white" />
                                </div>
                                <div className="p-4">
                                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'rgb(3, 2, 19)', lineHeight: 1.35 }}>
                                        TX Hospitals, Uppal
                                    </p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <MapPin className="w-3 h-3 text-[#6C6C6C]" strokeWidth={2} />
                                        <span style={{ fontSize: '11px', fontWeight: 400, color: 'rgb(108, 108, 108)' }}>
                                            Uppal, Hyderabad
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 mt-2">
                                        <Star className="w-3 h-3 text-[#BD385C]" fill="currentColor" strokeWidth={2} />
                                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgb(189, 56, 92)' }}>
                                            4.8
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Location 2: Kachiguda */}
                            <div className="bg-white rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" style={{ border: '0.5px solid rgb(183, 183, 183)', boxShadow: 'rgba(0, 0, 0, 0.08) 0px 1px 1px, rgba(0, 0, 0, 0.05) 0px 1px 1.5px' }}>
                                <div className="overflow-hidden" style={{ height: '190px' }}>
                                    <img src="/assets/Our Location/Kachiguda Image.png" alt="TX Hospitals Kachiguda Branch Building Exterior" className="w-full h-full object-cover bg-white" />
                                </div>
                                <div className="p-4">
                                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'rgb(3, 2, 19)', lineHeight: 1.35 }}>
                                        TX Hospitals, Kachiguda
                                    </p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <MapPin className="w-3 h-3 text-[#6C6C6C]" strokeWidth={2} />
                                        <span style={{ fontSize: '11px', fontWeight: 400, color: 'rgb(108, 108, 108)' }}>
                                            Kachiguda, Hyderabad
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 mt-2">
                                        <Star className="w-3 h-3 text-[#BD385C]" fill="currentColor" strokeWidth={2} />
                                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgb(189, 56, 92)' }}>
                                            4.5
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Location 3: Banjara Hills */}
                            <div className="bg-white rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" style={{ border: '0.5px solid rgb(183, 183, 183)', boxShadow: 'rgba(0, 0, 0, 0.08) 0px 1px 1px, rgba(0, 0, 0, 0.05) 0px 1px 1.5px' }}>
                                <div className="overflow-hidden" style={{ height: '190px' }}>
                                    <img src="/assets/Our Location/Banjara Hills  Hospitals Image.png" alt="TX Hospitals Banjara Hills Branch Building Exterior" className="w-full h-full object-cover bg-white" />
                                </div>
                                <div className="p-4">
                                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'rgb(3, 2, 19)', lineHeight: 1.35 }}>
                                        TX Hospitals, Banjara Hills
                                    </p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <MapPin className="w-3 h-3 text-[#6C6C6C]" strokeWidth={2} />
                                        <span style={{ fontSize: '11px', fontWeight: 400, color: 'rgb(108, 108, 108)' }}>
                                            Banjara Hills, Hyderabad
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 mt-2">
                                        <Star className="w-3 h-3 text-[#BD385C]" fill="currentColor" strokeWidth={2} />
                                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgb(189, 56, 92)' }}>
                                            4.4
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Location 4: Children Hospitals, Banjara Hills */}
                            <div className="bg-white rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" style={{ border: '0.5px solid rgb(183, 183, 183)', boxShadow: 'rgba(0, 0, 0, 0.08) 0px 1px 1px, rgba(0, 0, 0, 0.05) 0px 1px 1.5px' }}>
                                <div className="overflow-hidden" style={{ height: '190px' }}>
                                    <img src="/assets/Our Location/Banjara Hills Children Image.png" alt="TX Children Hospitals Banjara Hills Branch Building Exterior" className="w-full h-full object-cover bg-white" />
                                </div>
                                <div className="p-4">
                                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'rgb(3, 2, 19)', lineHeight: 1.35 }}>
                                        TX Children Hospitals, Banjara Hills
                                    </p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <MapPin className="w-3 h-3 text-[#6C6C6C]" strokeWidth={2} />
                                        <span style={{ fontSize: '11px', fontWeight: 400, color: 'rgb(108, 108, 108)' }}>
                                            Banjara Hills, Hyderabad
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 mt-2">
                                        <Star className="w-3 h-3 text-[#BD385C]" fill="currentColor" strokeWidth={2} />
                                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgb(189, 56, 92)' }}>
                                            4.6
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Location 5: Miyapur */}
                            <div className="bg-white rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" style={{ border: '0.5px solid rgb(183, 183, 183)', boxShadow: 'rgba(0, 0, 0, 0.08) 0px 1px 1px, rgba(0, 0, 0, 0.05) 0px 1px 1.5px' }}>
                                <div className="overflow-hidden" style={{ height: '190px' }}>
                                    <img src="/assets/ContactUs/TX Hospitals Miyapur.webp" alt="TX Hospitals Miyapur Branch Building Exterior" className="w-full h-full object-cover bg-white" />
                                </div>
                                <div className="p-4">
                                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'rgb(3, 2, 19)', lineHeight: 1.35 }}>
                                        TX Hospitals, Miyapur
                                    </p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <MapPin className="w-3 h-3 text-[#6C6C6C]" strokeWidth={2} />
                                        <span style={{ fontSize: '11px', fontWeight: 400, color: 'rgb(108, 108, 108)' }}>
                                            Miyapur, Hyderabad
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 mt-2">
                                        <Star className="w-3 h-3 text-[#BD385C]" fill="currentColor" strokeWidth={2} />
                                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgb(189, 56, 92)' }}>
                                            4.8
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UppalNewLocations;
