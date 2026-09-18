import React from 'react';

const AcademicsSection2 = () => {
    return (
        <section id="programs" className="bg-gray-50 pt-12 pb-6 md:pt-16 md:pb-4">
            <div className="mx-auto max-w-7xl px-8 lg:px-12">
                <div className="max-w-2xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-700">Programs &amp; Seats</p>
                    <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl text-gray-900">Accredited pathways across every stage of a medical career.</h2>
                    <p className="mt-4 text-gray-600">From DNB Broad and Super Specialty tracks to fellowships and diplomas — explore current seats and accreditations across our campuses.</p>
                </div>
                <div className="mt-12 space-y-8">
                    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <header className="flex flex-col gap-4 border-b border-gray-200 bg-gradient-to-r from-pink-700 to-pink-900 px-6 py-5 text-white md:flex-row md:items-center md:justify-between md:px-8">
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/15 backdrop-blur">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-stethoscope h-5 w-5" aria-hidden="true" alt="Image">
                                        <path d="M11 2v2"></path>
                                        <path d="M5 2v2"></path>
                                        <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"></path>
                                        <path d="M8 15a6 6 0 0 0 12 0v-3"></path>
                                        <circle cx="20" cy="10" r="2"></circle>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold md:text-2xl">DNB Broad Specialty Courses</h3>
                                    <p className="text-sm text-white/80">Broad-based specialty training with rigorous mentorship across core clinical disciplines.</p>
                                </div>
                            </div>
                            <span className="inline-flex w-fit items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-wider backdrop-blur">3 Years</span>
                        </header>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500">
                                    <tr>
                                        <th className="px-6 py-3 md:px-8">S.No</th>
                                        <th className="px-6 py-3">Specialty</th>
                                        <th className="px-6 py-3">Accredited By</th>
                                        <th className="px-8 py-3 text-center min-w-[140px]">Banjara Hills</th>
                                        <th className="px-6 py-3 text-center">Uppal</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 text-gray-700">
                                    <tr className="transition hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-500 md:px-8">1</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">General Medicine</td>
                                        <td className="px-6 py-4 text-gray-500">NBEMS</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex h-7 min-w-[2rem] items-center justify-center rounded-md bg-pink-100 px-2 text-sm font-semibold text-pink-700">2</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex h-7 min-w-[2rem] items-center justify-center rounded-md bg-pink-100 px-2 text-sm font-semibold text-pink-700">1</span>
                                        </td>
                                    </tr>
                                    <tr className="transition hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-500 md:px-8">2</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">General Surgery</td>
                                        <td className="px-6 py-4 text-gray-500">NBEMS</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex h-7 min-w-[2rem] items-center justify-center rounded-md bg-pink-100 px-2 text-sm font-semibold text-pink-700">1</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-gray-400">—</span>
                                        </td>
                                    </tr>
                                    <tr className="transition hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-500 md:px-8">3</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">Anaesthesia</td>
                                        <td className="px-6 py-4 text-gray-500">NBEMS</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex h-7 min-w-[2rem] items-center justify-center rounded-md bg-pink-100 px-2 text-sm font-semibold text-pink-700">2</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-gray-400">—</span>
                                        </td>
                                    </tr>
                                    <tr className="transition hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-500 md:px-8">4</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">Orthopaedics</td>
                                        <td className="px-6 py-4 text-gray-500">NBEMS</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-800">Under Review</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-gray-400">—</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </article>

                    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <header className="flex flex-col gap-4 border-b border-gray-200 bg-gradient-to-r from-pink-700 to-pink-900 px-6 py-5 text-white md:flex-row md:items-center md:justify-between md:px-8">
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/15 backdrop-blur">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart-pulse h-5 w-5" aria-hidden="true" alt="Image">
                                        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
                                        <path d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold md:text-2xl">DNB Super Specialty Courses</h3>
                                    <p className="text-sm text-white/80">Advanced sub-specialty programs designed for consultants pursuing focused expertise.</p>
                                </div>
                            </div>
                            <span className="inline-flex w-fit items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-wider backdrop-blur">3 Years</span>
                        </header>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500">
                                    <tr>
                                        <th className="px-6 py-3 md:px-8">S.No</th>
                                        <th className="px-6 py-3">Specialty</th>
                                        <th className="px-6 py-3">Accredited By</th>
                                        <th className="px-8 py-3 text-center min-w-[140px]">Banjara Hills</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 text-gray-700">
                                    <tr className="transition hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-500 md:px-8">1</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">Cardiology</td>
                                        <td className="px-6 py-4 text-gray-500">NBEMS</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-800">Under Review</span>
                                        </td>
                                    </tr>
                                    <tr className="transition hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-500 md:px-8">2</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">Nephrology</td>
                                        <td className="px-6 py-4 text-gray-500">NBEMS</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-800">Under Review</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </article>

                    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <header className="flex flex-col gap-4 border-b border-gray-200 bg-gradient-to-r from-pink-700 to-pink-900 px-6 py-5 text-white md:flex-row md:items-center md:justify-between md:px-8">
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/15 backdrop-blur">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open h-5 w-5" aria-hidden="true" alt="Image">
                                        <path d="M12 7v14"></path>
                                        <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold md:text-2xl">DNB Diploma Courses</h3>
                                    <p className="text-sm text-white/80">Structured diploma programs delivering focused clinical competence.</p>
                                </div>
                            </div>
                            <span className="inline-flex w-fit items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-wider backdrop-blur">2 Years</span>
                        </header>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500">
                                    <tr>
                                        <th className="px-6 py-3 md:px-8">S.No</th>
                                        <th className="px-6 py-3">Specialty</th>
                                        <th className="px-6 py-3">Accredited By</th>
                                        <th className="px-8 py-3 text-center min-w-[140px]">Banjara Hills</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 text-gray-700">
                                    <tr className="transition hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-500 md:px-8">1</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">Anaesthesia</td>
                                        <td className="px-6 py-4 text-gray-500">NBEMS</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex h-7 min-w-[2rem] items-center justify-center rounded-md bg-pink-100 px-2 text-sm font-semibold text-pink-700">1</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </article>

                    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <header className="flex flex-col gap-4 border-b border-gray-200 bg-gradient-to-r from-pink-700 to-pink-900 px-6 py-5 text-white md:flex-row md:items-center md:justify-between md:px-8">
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/15 backdrop-blur">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-award h-5 w-5" aria-hidden="true" alt="Image">
                                        <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
                                        <circle cx="12" cy="8" r="6"></circle>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold md:text-2xl">Fellowship Courses</h3>
                                    <p className="text-sm text-white/80">Elite fellowship tracks in critical care, emergency medicine and pediatric emergencies.</p>
                                </div>
                            </div>
                            <span className="inline-flex w-fit items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-wider backdrop-blur">2 Years</span>
                        </header>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500">
                                    <tr>
                                        <th className="px-6 py-3 md:px-8">S.No</th>
                                        <th className="px-6 py-3">Specialty</th>
                                        <th className="px-6 py-3">Accredited By</th>
                                        <th className="px-8 py-3 text-center min-w-[140px]">Banjara Hills</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 text-gray-700">
                                    <tr className="transition hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-500 md:px-8">1</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">IDCCM</td>
                                        <td className="px-6 py-4 text-gray-500">ISCCM</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex h-7 min-w-[2rem] items-center justify-center rounded-md bg-pink-100 px-2 text-sm font-semibold text-pink-700">2</span>
                                        </td>
                                    </tr>
                                    <tr className="transition hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-500 md:px-8">2</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">IDCCN</td>
                                        <td className="px-6 py-4 text-gray-500">ISCCM</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex h-7 min-w-[2rem] items-center justify-center rounded-md bg-pink-100 px-2 text-sm font-semibold text-pink-700">4</span>
                                        </td>
                                    </tr>
                                    <tr className="transition hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-500 md:px-8">3</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">Fellowship in Emergency Medicine</td>
                                        <td className="px-6 py-4 text-gray-500">Medvarsity — Royal College of Emergency Medicine, UK</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex h-7 min-w-[2rem] items-center justify-center rounded-md bg-pink-100 px-2 text-sm font-semibold text-pink-700">2</span>
                                        </td>
                                    </tr>
                                    <tr className="transition hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-500 md:px-8">4</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">Pediatric Emergency Medicine</td>
                                        <td className="px-6 py-4 text-gray-500">Indian Academy of Pediatrics — PEM Chapter</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex h-7 min-w-[2rem] items-center justify-center rounded-md bg-pink-100 px-2 text-sm font-semibold text-pink-700">1</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </article>

                    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <header className="flex flex-col gap-4 border-b border-gray-200 bg-gradient-to-r from-pink-700 to-pink-900 px-6 py-5 text-white md:flex-row md:items-center md:justify-between md:px-8">
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/15 backdrop-blur">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity h-5 w-5" aria-hidden="true" alt="Image">
                                        <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold md:text-2xl">Diploma Courses</h3>
                                    <p className="text-sm text-white/80">Specialized diploma tracks accredited by leading international bodies.</p>
                                </div>
                            </div>
                            <span className="inline-flex w-fit items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-wider backdrop-blur">1–2 Years</span>
                        </header>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500">
                                    <tr>
                                        <th className="px-6 py-3 md:px-8">S.No</th>
                                        <th className="px-6 py-3">Specialty</th>
                                        <th className="px-6 py-3">Accredited By</th>
                                        <th className="px-8 py-3 text-center min-w-[140px]">Banjara Hills</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 text-gray-700">
                                    <tr className="transition hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-500 md:px-8">1</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">Diploma in Cardiology</td>
                                        <td className="px-6 py-4 text-gray-500">Texila International Management</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex h-7 min-w-[2rem] items-center justify-center rounded-md bg-pink-100 px-2 text-sm font-semibold text-pink-700">2</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default AcademicsSection2;
