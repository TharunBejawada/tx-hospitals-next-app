import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import CONFIG from '@/config';

const MiyapurSpecialties = () => {
    const [specialtiesList, setSpecialtiesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchSpecialities = async () => {
            try {
                const response = await fetch(`${CONFIG.API_BASE_URL}/api/specialities/Miyapur`);
                if (response.ok) {
                    const data = await response.json();
                    setSpecialtiesList(data || []);
                }
            } catch (error) {
                console.error("Failed to fetch specialities:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSpecialities();
    }, []);

    const visibleSpecialties = showAll ? specialtiesList : specialtiesList.slice(0, 8);

    return (
        <section id="specialties" className="py-16" style={{ background: 'rgb(254, 236, 236)' }}>
            <div className="max-w-[1170px] mx-auto px-6">
                <div className="text-center mb-10">
                    <h2 className="mb-4" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: 'rgb(189, 56, 92)' }}>
                        Our Specialties
                    </h2>
                    <h3 className="mb-4" style={{ fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 600, color: 'rgb(3, 2, 19)' }}>
                        Expert Care Across <span style={{ color: 'rgb(189, 56, 92)' }}>Major Medical Departments</span>
                    </h3>
                    <p className="max-w-[850px] mx-auto" style={{ fontSize: '15px', fontWeight: 400, color: 'rgb(30, 30, 30)', lineHeight: 1.7 }}>
                        At TX Hospitals, Miyapur, patients can consult experienced doctors across multiple specialties — supported by advanced diagnostics, trained medical teams and a patient-first approach.
                    </p>
                </div>

                {loading || specialtiesList.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 animate-pulse">
                        <div className="w-12 h-12 border-4 border-pink-700 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p style={{ fontSize: '18px', fontWeight: 600, color: 'rgb(189, 56, 92)' }}>
                            Data coming soon...
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
                            {visibleSpecialties.map((item, index) => {
                                const path = item?.LandingPageUrl || `/Miyapur/specialities/${item.SpecialityName}/`;
                                return (
                                    <div
                                        key={index}
                                        onClick={() => router.push(path)}
                                        className="flex flex-col items-center justify-center gap-4 p-5 rounded-xl bg-white cursor-pointer hover:shadow-md transition-shadow"
                                        style={{ border: '0.5px solid rgb(224, 208, 208)', boxShadow: 'rgba(0, 0, 0, 0.06) 0px 1px 3px', minHeight: '160px' }}
                                    >
                                        <div className="relative w-[60px] h-[60px] flex items-center justify-center">
                                            {item.IconUrl && (
                                                <Image
                                                    src={item.IconUrl}
                                                    alt={item.SpecialityName || "Speciality"}
                                                    fill
                                                    className="object-contain"
                                                    sizes="60px"
                                                />
                                            )}
                                        </div>
                                        <span className="text-center" style={{ fontSize: '13px', fontWeight: 600, color: 'rgb(3, 2, 19)', lineHeight: 1.4 }}>
                                            {item.SpecialityName}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {specialtiesList.length > 8 && (
                            <div className="text-center">
                                <button
                                    onClick={() => router.push('/miyapur/specialties/')}
                                    className="px-8 py-2.5 rounded transition-opacity hover:opacity-90 cursor-pointer"
                                    style={{ background: 'rgb(189, 56, 92)', fontSize: '15px', fontWeight: 500, color: 'rgb(255, 255, 255)', border: 'none' }}
                                >
                                    View More
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default MiyapurSpecialties;

