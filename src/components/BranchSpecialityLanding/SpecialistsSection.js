import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Award, MapPin, Calendar, Phone } from 'lucide-react';
import BookAppointmentForm from '@/components/Blogs/BookAppointemntForm';
import CONFIG from '@/config';
import { matchesDepartment } from '@/utils/specialityAliases';

const SpecialistsSection = ({ data, location, speciality }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [doctorsList, setDoctorsList] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);

    const formatString = (str) => {
        if (!str) return '';
        return str.split(/[-_]+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
    };

    // Strip trailing facility-type and location words so e.g. "Orthopedic Hospital Banjara Hills" → "Orthopedic"
    const cleanSpeciality = (str) => {
        if (!str) return '';
        const stopWords = /\b(hospital|hospitals|centre|center|department|departments|clinic|clinics|care|unit|units|services?|specialists?|banjara hills|kachiguda|miyapur|uppal|hyderabad)\b/gi;
        return str.replace(stopWords, ' ').replace(/\s+/g, ' ').trim();
    };

    const formattedLocation = formatString(location);
    const formattedSpeciality = cleanSpeciality(formatString(speciality));

    useEffect(() => {
        if (!formattedLocation && !formattedSpeciality) return;

        setFetchLoading(true);
        const fetchDoctors = async () => {
            try {
                const res = await axios.get(`${CONFIG.API_BASE_URL}/getAllDoctors`);
                if (res.data) {
                    const specKey = formattedSpeciality || speciality;
                    const filtered = res.data.filter(doc => {
                        if (!doc) return false;
                        const locMatch = !formattedLocation || (() => {
                            const targetLoc = formattedLocation.toLowerCase().trim();
                            const docLocs = [
                                ...(Array.isArray(doc.locations) ? doc.locations : []),
                                ...(typeof doc.location === 'string' ? doc.location.split(/[,/]+/) : [])
                            ].map(l => String(l || '').toLowerCase().trim()).filter(Boolean);

                            return docLocs.length === 0 || docLocs.some(l => l.includes(targetLoc) || targetLoc.includes(l));
                        })();

                        const deptMatch = matchesDepartment(specKey, doc) || matchesDepartment(speciality, doc);
                        return locMatch && deptMatch;
                    });
                    // Deduplicate doctors
                    const uniqueFiltered = filtered.filter((doc, idx, arr) =>
                        arr.findIndex(d => (d.id || d.name) === (doc.id || doc.name)) === idx
                    );
                    setDoctorsList(uniqueFiltered);
                }
            } catch (error) {
                console.error("Error fetching doctors:", error);
            } finally {
                setFetchLoading(false);
            }
        };
        fetchDoctors();
    }, [formattedLocation, formattedSpeciality, speciality]);

    if (!data && !formattedLocation && !formattedSpeciality) return null;

    const renderTitle = (title) => {
        if (!title) return null;
        const splitText = "TX Hospitals";
        const splitIndex = title.indexOf(splitText);

        if (splitIndex !== -1) {
            const firstPart = title.substring(0, splitIndex);
            const secondPart = title.substring(splitIndex);
            return (
                <>
                    {firstPart}
                    <span style={{ color: 'rgb(189, 56, 92)' }}>{secondPart}</span>
                </>
            );
        }
        return title;
    };

    return (
        <section className="py-10 md:py-12" style={{ backgroundColor: '#fff1f3' }}>
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-12 max-w-4xl mx-auto">
                    {data.title && (
                        <h2 className="text-2xl md:text-[34px] font-bold text-[#1e1e1e] leading-snug mb-5">
                            {renderTitle(data.title)}
                        </h2>
                    )}
                    {data.description && (
                        <div
                            className="text-[#3c3c3c] text-[15px] md:text-[16px] leading-relaxed flex flex-col gap-4 font-normal"
                            dangerouslySetInnerHTML={{ __html: data.description }}
                        />
                    )}
                </div>

                {/* Doctors Grid */}
                {doctorsList.length > 0 ? (
                    <>
                        <div className="flex flex-wrap justify-center gap-6">
                            {(showAll ? doctorsList : doctorsList.slice(0, 3)).map((doctor, index) => (
                                <div key={index} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-[380px] bg-white rounded-xl overflow-hidden flex flex-col" style={{ border: '0.5px solid rgb(220, 220, 220)', boxShadow: 'rgba(0, 0, 0, 0.08) 0px 4px 12px' }}>
                                    <div className="w-full h-[240px] overflow-hidden bg-[#F5F7FA] pt-4 flex justify-center">
                                        <img
                                            src={doctor.image}
                                            alt={doctor.name}
                                            className="h-full w-auto object-contain object-bottom"
                                            onError={(e) => {
                                                e.target.src = "https://tx-hospital-doctor-images.s3.ap-south-2.amazonaws.com/doctors/placeholder.png";
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3 p-5 flex-1">
                                        <div>
                                            <h3 style={{ fontSize: '17px', fontWeight: 600, color: 'rgb(3, 2, 19)', lineHeight: 1.3 }}>
                                                {doctor.name}
                                            </h3>
                                            <p className="mt-1" style={{ fontSize: '13px', fontWeight: 500, color: 'rgb(30, 30, 30)', lineHeight: 1.5 }}>
                                                {doctor.designation}
                                            </p>
                                            <p className="mt-1.5" style={{ fontSize: '12px', fontWeight: 400, color: 'rgb(108, 108, 108)' }}>
                                                {doctor.qualification}
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-1.5 mt-auto pt-3">
                                            <div className="flex items-center gap-2">
                                                <Award className="w-[14px] h-[14px] text-[#BD385C]" strokeWidth={2} />
                                                <span style={{ fontSize: '13px', color: 'rgb(30, 30, 30)' }}>
                                                    Experience: <strong style={{ color: 'rgb(189, 56, 92)', fontWeight: 600 }}>{doctor.experience}</strong>
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-[14px] h-[14px] text-[#BD385C]" strokeWidth={2} />
                                                <span style={{ fontSize: '13px', color: 'rgb(30, 30, 30)' }}>
                                                    {doctor.location}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 pt-4 border-t border-gray-100 mt-4">
                                            <button
                                                onClick={() => setIsModalOpen(true)}
                                                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded transition-opacity hover:opacity-90"
                                                style={{ background: 'rgb(189, 56, 92)', fontSize: '13px', fontWeight: 500, color: 'rgb(255, 255, 255)', border: 'none' }}
                                            >
                                                <Calendar className="w-[14px] h-[14px]" />
                                                Book Now
                                            </button>
                                            <a
                                                href="tel:9144514459"
                                                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded transition-all hover:bg-[#BD385C] hover:text-white"
                                                style={{ background: 'rgb(255, 255, 255)', fontSize: '13px', fontWeight: 500, color: 'rgb(189, 56, 92)', border: '1px solid rgb(189, 56, 92)' }}
                                            >
                                                <Phone className="w-[14px] h-[14px]" />
                                                Call
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {doctorsList.length > 3 && (
                            <div className="text-center mt-10">
                                <button
                                    onClick={() => setShowAll(!showAll)}
                                    className="inline-block px-8 py-2.5 rounded transition-all hover:bg-[#BD385C] hover:text-white"
                                    style={{ background: 'rgb(255, 255, 255)', fontSize: '15px', fontWeight: 500, color: 'rgb(189, 56, 92)', border: '1.5px solid rgb(189, 56, 92)', cursor: 'pointer' }}
                                >
                                    {showAll ? 'View Less' : 'View More'}
                                </button>
                            </div>
                        )}
                    </>
                ) : fetchLoading ? (
                    <div className="text-center py-10">
                        <div className="w-10 h-10 border-4 border-[#BD385C] border-t-transparent rounded-full animate-spin mx-auto" />
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-500 font-medium">No specialists found for this location.</p>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <BookAppointmentForm
                    showModal={isModalOpen}
                    setShowModal={setIsModalOpen}
                />
            )}
        </section>
    );
};

export default SpecialistsSection;
