import React from 'react';
import { LuStethoscope, LuHeartPulse, LuBookOpen, LuAward, LuActivity } from 'react-icons/lu';

const ICON_MAP = {
    stethoscope: LuStethoscope,
    heartPulse: LuHeartPulse,
    bookOpen: LuBookOpen,
    award: LuAward,
    activity: LuActivity,
};

const ACADEMIC_PROGRAMS = [
    {
        id: "dnb-broad",
        title: "DrNB Broad Specialty Courses",
        description: "Broad-based specialty training with rigorous mentorship across core clinical disciplines.",
        duration: "3 Years",
        icon: "stethoscope",
        campuses: [
            { key: "banjaraHills", label: "Banjara Hills", minWidth: true },
            { key: "uppal", label: "Uppal" },
            { key: "kachiguda", label: "Kachiguda" },
        ],
        courses: [
            { sNo: 1, specialty: "General Medicine", accreditedBy: "NBEMS", seats: { banjaraHills: 2, uppal: 1, kachiguda: null } },
            { sNo: 2, specialty: "General Surgery", accreditedBy: "NBEMS", seats: { banjaraHills: 1, uppal: null, kachiguda: null } },
            { sNo: 3, specialty: "Anaesthesia", accreditedBy: "NBEMS", seats: { banjaraHills: 2, uppal: null, kachiguda: null } },
            { sNo: 4, specialty: "Orthopaedics", accreditedBy: "NBEMS", seats: { banjaraHills: 3, uppal: null, kachiguda: 1 } },
        ],
    },
    {
        id: "drnb-super",
        title: "DrNB Super Specialty Courses",
        description: "Advanced sub-specialty programs designed for consultants pursuing focused expertise.",
        duration: "3 Years",
        icon: "heartPulse",
        campuses: [
            { key: "banjaraHills", label: "Banjara Hills", minWidth: true },
        ],
        courses: [
            { sNo: 1, specialty: "Cardiology", accreditedBy: "NBEMS", seats: { banjaraHills: 2 } },
            { sNo: 2, specialty: "Nephrology", accreditedBy: "NBEMS", seats: { banjaraHills: 2 } },
        ],
    },
    {
        id: "dnb-diploma",
        title: "DrNB Diploma Courses",
        description: "Structured diploma programs delivering focused clinical competence.",
        duration: "2 Years",
        icon: "bookOpen",
        campuses: [
            { key: "banjaraHills", label: "Banjara Hills", minWidth: true },
        ],
        courses: [
            { sNo: 1, specialty: "Anaesthesia", accreditedBy: "NBEMS", seats: { banjaraHills: 1 } },
        ],
    },
    {
        id: "fellowship",
        title: "Fellowship Courses",
        description: "Elite fellowship tracks in critical care, emergency medicine and pediatric emergencies.",
        duration: "2 Years",
        icon: "award",
        campuses: [
            { key: "banjaraHills", label: "Banjara Hills", minWidth: true },
        ],
        courses: [
            { sNo: 1, specialty: "IDCCM", accreditedBy: "ISCCM", seats: { banjaraHills: 2 } },
            { sNo: 2, specialty: "IDCCN", accreditedBy: "ISCCM", seats: { banjaraHills: 4 } },
            { sNo: 3, specialty: "Fellowship in Emergency Medicine", accreditedBy: "Medvarsity — Royal College of Emergency Medicine, UK", seats: { banjaraHills: 2 } },
            { sNo: 4, specialty: "Pediatric Emergency Medicine", accreditedBy: "Indian Academy of Pediatrics — PEM Chapter", seats: { banjaraHills: 1 } },
        ],
    },
    {
        id: "diploma",
        title: "Diploma Courses",
        description: "Specialized diploma tracks accredited by leading international bodies.",
        duration: "1–2 Years",
        icon: "activity",
        campuses: [
            { key: "banjaraHills", label: "Banjara Hills", minWidth: true },
        ],
        courses: [
            { sNo: 1, specialty: "Diploma in Cardiology", accreditedBy: "Texila International Management", seats: { banjaraHills: 2 } },
        ],
    },
];

const renderSeatBadge = (value) => {
    if (value === null || value === undefined || value === "—") {
        return <span className="text-gray-400">—</span>;
    }
    if (value === "Under Review") {
        return (
            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-800">
                Under Review
            </span>
        );
    }
    return (
        <span className="inline-flex h-7 min-w-[2rem] items-center justify-center rounded-md bg-pink-100 px-2 text-sm font-semibold text-pink-700">
            {value}
        </span>
    );
};

const AcademicsSection2 = () => {
    return (
        <section id="programs" className="bg-gray-50 pt-12 pb-6 md:pt-16 md:pb-4">
            <div className="mx-auto max-w-7xl px-8 lg:px-12">
                <div className="max-w-2xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-700">Programs &amp; Seats</p>
                    <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl text-gray-900">Accredited pathways across every stage of a medical career.</h2>
                    <p className="mt-4 text-gray-600">From DrNB Broad and DrNB Super Specialty tracks to fellowships and diplomas — explore current seats and accreditations across our campuses.</p>
                </div>
                <div className="mt-12 space-y-8">
                    {ACADEMIC_PROGRAMS.map((program) => {
                        const IconComponent = ICON_MAP[program.icon];
                        return (
                            <article key={program.id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                                <header className="flex flex-col gap-4 border-b border-gray-200 bg-gradient-to-r from-pink-700 to-pink-900 px-6 py-5 text-white md:flex-row md:items-center md:justify-between md:px-8">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/15 backdrop-blur">
                                            {IconComponent && <IconComponent className="h-5 w-5" aria-hidden="true" />}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold md:text-2xl">{program.title}</h3>
                                            <p className="text-sm text-white/80">{program.description}</p>
                                        </div>
                                    </div>
                                    <span className="inline-flex w-fit items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-wider backdrop-blur">
                                        {program.duration}
                                    </span>
                                </header>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500">
                                            <tr>
                                                <th className="px-6 py-3 md:px-8">S.No</th>
                                                <th className="px-6 py-3">Specialty</th>
                                                <th className="px-6 py-3">Accredited By</th>
                                                {program.campuses.map((campus) => (
                                                    <th
                                                        key={campus.key}
                                                        className={campus.minWidth ? "px-8 py-3 text-center min-w-[140px]" : "px-6 py-3 text-center"}
                                                    >
                                                        {campus.label}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 text-gray-700">
                                            {program.courses.map((course) => (
                                                <tr key={course.sNo} className="transition hover:bg-gray-50">
                                                    <td className="px-6 py-4 font-medium text-gray-500 md:px-8">{course.sNo}</td>
                                                    <td className="px-6 py-4 font-medium text-gray-900">{course.specialty}</td>
                                                    <td className="px-6 py-4 text-gray-500">{course.accreditedBy}</td>
                                                    {program.campuses.map((campus) => (
                                                        <td key={campus.key} className="px-6 py-4 text-center">
                                                            {renderSeatBadge(course.seats[campus.key])}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default AcademicsSection2;
