import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { openBranchInGoogleMaps } from '@/utils/branchLocationData';

const BanjaraHillsNewLocations = () => {
    const locationList = [
        {
            name: "TX Hospitals, Uppal",
            address: "Uppal, Hyderabad",
            rating: "4.8",
            image: "/assets/Our Location/Uppal Location Image.png",
            mapQuery: "TX Hospitals, Uppal, Hyderabad",
            coords: [17.402553358453122, 78.56694358887127]
        },
        {
            name: "TX Hospitals, Kachiguda",
            address: "Kachiguda, Hyderabad",
            rating: "4.5",
            image: "/assets/Our Location/Kachiguda Image.png",
            mapQuery: "TX Hospitals, Kachiguda, Hyderabad",
            coords: [17.389777991297837, 78.49544286499808]
        },
        {
            name: "TX Hospitals, Banjara Hills",
            address: "Banjara Hills, Hyderabad",
            rating: "4.4",
            image: "/assets/Our Location/Banjara Hills  Hospitals Image.png",
            mapQuery: "TX Hospitals, Banjara Hills, Hyderabad",
            coords: [17.408587026550897, 78.44449394391825]
        },
        {
            name: "TX Children Hospitals, Banjara Hills",
            address: "Banjara Hills, Hyderabad",
            rating: "4.6",
            image: "/assets/Our Location/Banjara Hills Children Image.png",
            mapQuery: "TX Children's Hospital, Banjara Hills, Hyderabad",
            coords: [17.40854607691875, 78.44500892800298]
        },
        {
            name: "TX Hospitals, Miyapur",
            address: "Miyapur, Hyderabad",
            rating: "4.8",
            image: "/assets/ContactUs/TX Hospitals Miyapur.webp",
            mapQuery: "TX Hospitals, Miyapur, Hyderabad",
            coords: [17.49594147086547, 78.36466448274872]
        }
    ];

    return (
        <section className="py-10 md:py-12 bg-white overflow-hidden">
            <div className="max-w-[1170px] mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12 items-start">

                    {/* Left text column */}
                    <div className="lg:w-[280px] flex-shrink-0">
                        <h2 className="mb-4" style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, color: 'rgb(189, 56, 92)', lineHeight: 1.15 }}>
                            Our<br />Locations
                        </h2>
                        <p className="mb-8 text-gray-700" style={{ fontSize: '15px', fontWeight: 400, lineHeight: 1.7 }}>
                            Find the world-class hospital nearest to you. TX Hospitals brings expert multispeciality care across Hyderabad.
                        </p>
                    </div>

                    {/* Right grid column */}
                    <div className="flex-1 w-full">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                            {locationList.map((loc, index) => (
                                <div
                                    key={index}
                                    onClick={() => openBranchInGoogleMaps(loc.mapQuery, loc.coords)}
                                    className="bg-white rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                                    style={{ border: '0.5px solid rgb(215, 215, 215)', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 4px 12px' }}
                                >
                                    <div className="overflow-hidden" style={{ height: '190px' }}>
                                        <img
                                            src={loc.image}
                                            alt={loc.name}
                                            className="w-full h-full object-cover bg-white"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <p style={{ fontSize: '13px', fontWeight: 600, color: 'rgb(3, 2, 19)', lineHeight: 1.35 }}>
                                            {loc.name}
                                        </p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <MapPin className="w-3 h-3 text-[#6C6C6C]" strokeWidth={2} />
                                            <span style={{ fontSize: '11px', fontWeight: 400, color: 'rgb(108, 108, 108)' }}>
                                                {loc.address}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 mt-2">
                                            <Star className="w-3 h-3 text-[#BD385C]" fill="currentColor" strokeWidth={2} />
                                            <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgb(189, 56, 92)' }}>
                                                {loc.rating}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default BanjaraHillsNewLocations;
