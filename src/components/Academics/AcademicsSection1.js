import React from 'react';
import Link from 'next/link';

const AcademicsSection1 = ({ imageSrc, altText, width, height }) => {
    const handleScroll = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - 100, // Account for sticky navbar height
                behavior: "smooth"
            });
        }
    };

    return (
        <section className="relative overflow-hidden bg-pink-900">
            <div className="absolute inset-0">
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt={altText || "Academics"}
                        width={width}
                        height={height}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    // Fallback background color gradient if no image is provided yet
                    <div className="h-full w-full bg-gradient-to-r from-pink-900 to-pink-800"></div>
                )}
                <div
                    className="absolute inset-0"
                    style={{ background: 'var(--gradient-hero, linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)))' }}
                ></div>
            </div>

            <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-12 md:pt-12 md:pb-16">
                <div className="text-white">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] backdrop-blur">
                        <span className="h-1.5 w-1.5 rounded-full bg-white"></span> Academics 2026
                    </span>

                    <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                        Where future doctors <span className="italic text-white/95">learn by healing.</span>
                    </h1>

                    <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
                        At TX Hospitals, academics go beyond classroom learning. We provide aspiring healthcare professionals with expert mentorship, advanced hospital infrastructure and hands-on clinical exposure — shaping capable, compassionate and future-ready medical professionals.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link href="#programs" onClick={(e) => handleScroll(e, "programs")} className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-10 rounded-md px-8 bg-white text-pink-700 hover:bg-white/90">
                            Explore Programs
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-1 h-4 w-4" aria-hidden="true" alt="Explore Program">
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>
                        </Link>
                        <Link href="#contact" onClick={(e) => handleScroll(e, "contact")} className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border shadow-sm h-10 rounded-md px-8 border-white/60 bg-transparent text-white hover:bg-white/10 hover:text-white">
                            Contact Us
                        </Link>
                    </div>

                    <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
                        <div className="border-l border-white/25 pl-4">
                            <dt className="text-3xl font-semibold">15+</dt>
                            <dd className="mt-1 text-xs uppercase tracking-wider text-white/75">Courses</dd>
                        </div>
                        <div className="border-l border-white/25 pl-4">
                            <dt className="text-3xl font-semibold">4</dt>
                            <dd className="mt-1 text-xs uppercase tracking-wider text-white/75">Hospital Campuses</dd>
                        </div>
                        <div className="border-l border-white/25 pl-4">
                            <dt className="text-3xl font-semibold">20+</dt>
                            <dd className="mt-1 text-xs uppercase tracking-wider text-white/75">Training Seats</dd>
                        </div>
                        <div className="border-l border-white/25 pl-4">
                            <dt className="text-3xl font-semibold">100%</dt>
                            <dd className="mt-1 text-xs uppercase tracking-wider text-white/75">Clinical Exposure</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </section>
    );
};

export default AcademicsSection1;
