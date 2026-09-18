import React from 'react';

const AcademicsSection3 = () => {
    return (
        <section id="contact" className="mx-auto max-w-7xl px-8 lg:px-12 py-2 md:py-2">
            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-r from-pink-700 to-pink-900">
                <div className="p-8 text-white md:p-14">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Get in touch</p>
                    <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">Take the next step in your medical career.</h2>
                    <p className="mt-4 max-w-md text-white/80">Reach out to our academics team for program details, eligibility criteria and next steps.</p>
                    <ul className="mt-8 space-y-3 text-sm">
                        <li className="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" alt="Image" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user h-4 w-4" aria-hidden="true">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            <span>
                                Dr Kavya Sri N, <span className="text-white/90">Academic Coordinator</span>
                            </span>
                        </li>
                        <li className="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" alt="Image" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone h-4 w-4" aria-hidden="true">
                                <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
                            </svg>
                            6300 143 3702
                        </li>
                        <li className="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" alt="Image" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail h-4 w-4" aria-hidden="true">
                                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                            </svg>
                            academics@txhospitals.in
                        </li>
                        <li className="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" alt="Image" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check mt-0.5 h-4 w-4" aria-hidden="true">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="m9 12 2 2 4-4"></path>
                            </svg>
                            Campuses: Banjara Hills · Uppal · Kachiguda · Miyapur
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default AcademicsSection3;
