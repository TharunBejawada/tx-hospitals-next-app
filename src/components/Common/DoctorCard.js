import React from 'react';
import { Award, User } from 'lucide-react';
import Link from 'next/link';
import DoctorAvailability from './DoctorAvailability';

const DoctorCard = ({
    name,
    specialty,
    designation,
    experience,
    imageSrc,
    profileLink = null,
    doctorId,
    onBookClick
}) => {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group">
            {/* Image Section */}
            <div className="relative h-48 sm:h-56 w-full bg-[#fdf5f8] overflow-hidden">
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt={name}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-pink-50">
                        <User size={48} className="text-pink-200" />
                    </div>
                )}

            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="mb-2 flex flex-wrap gap-1">
                    {(Array.isArray(specialty)
                        ? specialty
                        : (specialty ? String(specialty).split(/[,/]+/).map(s => s.trim()).filter(Boolean) : [])
                    ).slice(0, 2).map((item, idx) => (
                        <span key={idx} className="inline-block max-w-full bg-pink-700 text-white text-[9px] sm:text-[10px] font-bold px-2 sm:px-3 py-1 rounded-lg sm:rounded-full shadow-sm truncate">
                            {item}
                        </span>
                    ))}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 line-clamp-2 leading-tight group-hover:text-pink-700 transition-colors duration-300">{name}</h3>
                <p className="text-xs sm:text-sm text-gray-600 font-semibold mb-4 line-clamp-2">{designation}</p>

                {doctorId && <DoctorAvailability doctorId={doctorId} />}

                {/* Spacer pushes experience + button to the bottom */}
                <div className="flex-grow" />

                <div className="flex items-start gap-2 text-pink-600 mb-6 bg-pink-50/30 px-3 py-2 rounded-xl border border-pink-100/30">
                    <Award size={18} className="fill-pink-100 mt-0.5 flex-shrink-0 text-pink-700" />
                    <span className="text-sm sm:text-base font-bold leading-snug text-pink-700">
                        {experience ? experience.toString().replace(/years?|experience/gi, '').trim() : '0'} Years Experience
                    </span>
                </div>

                <div className="mt-auto space-y-2">
                    <button
                        onClick={onBookClick}
                        className="w-full bg-pink-700 hover:bg-pink-800 text-white font-bold py-2.5 rounded-lg text-sm transition-colors shadow-sm"
                    >
                        Book Appointment
                    </button>
                    {profileLink && (
                        <Link href={profileLink} className="block w-full text-center bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold py-2.5 rounded-lg text-sm transition-colors">
                            View Profile
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorCard;
