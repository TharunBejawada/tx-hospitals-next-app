/*
import React from 'react';
import Head from 'next/head';
import SecondaryLayout from '@/components/Layouts/SecondaryLayout';
import UppalHero from '@/components/Uppal/UppalHero';
import UppalStats from '@/components/Uppal/UppalStats';
import UppalAbout from '@/components/Uppal/UppalAbout';
import UppalSpecialties from '@/components/Uppal/UppalSpecialties';
import UppalEmergency from '@/components/Uppal/UppalEmergency';
import UppalDoctors from '@/components/Uppal/UppalDoctors';
import UppalWhyChoose from '@/components/Uppal/UppalWhyChoose';
import UppalInsurance from '@/components/Uppal/UppalInsurance';
import UppalFAQ from '@/components/Uppal/UppalFAQ';
import UppalCTA from '@/components/Uppal/UppalCTA';


export default function UppalPageOld() {
    return (
        <>
            <Head>
                <title>Best Hospital in Uppal, Hyderabad | TX Hospitals Uppal</title>
                <meta name="description" content="TX Hospitals Uppal is a leading multi-specialty hospitals in Uppal, Hyderabad offering expert doctors, 24/7 emergency care, advanced treatments, ICU, and cashless insurance facilities." />
                <meta name="keywords" content="TX Hospitals Uppal, Best Hospital in Uppal, Multi Specialty Hospital in Uppal, Hospital in Uppal Hyderabad, Best Hospital Near Uppal, Emergency Hospital in Uppal, 24/7 Hospital in Uppal, Healthcare Services in Uppal" />
            </Head>
            <SecondaryLayout>
                <main>
                    <UppalHero />

                    <UppalStats />

                    <UppalSpecialties />

                    <UppalAbout />

                    <UppalEmergency />

                    <UppalDoctors />

                    <UppalWhyChoose />

                    <UppalInsurance />

                    <UppalFAQ />

                    <UppalCTA />

                </main>
            </SecondaryLayout>
        </>
    );
}
*/

import React from 'react';
import Head from 'next/head';
import SecondaryLayout from '@/components/Layouts/SecondaryLayout';
import UppalNewHero from '@/components/Uppal/UppalNewHero';
import UppalNewAbout from '@/components/Uppal/UppalNewAbout';
import UppalNewSpecialties from '@/components/Uppal/UppalNewSpecialties';
import UppalNewCTScan from '@/components/Uppal/UppalNewCTScan';
import UppalNewEmergency from '@/components/Uppal/UppalNewEmergency';
import UppalNewDoctors from '@/components/Uppal/UppalNewDoctors';
import UppalNewTestimonials from '@/components/Uppal/UppalNewTestimonials';
import UppalNewLocations from '@/components/Uppal/UppalNewLocations';
import UppalNewBlogs from '@/components/Uppal/UppalNewBlogs';
import UppalNewFAQ from '@/components/Uppal/UppalNewFAQ';
import Breadcrumb from '@/components/Common/Breadcrumb';

export default function UppalPage() {
    return (
        <>
            <Head>
                <title>Best Hospital in Uppal, Hyderabad | TX Hospitals Uppal</title>
                <meta name="description" content="TX Hospitals Uppal is a leading multi-specialty hospitals in Uppal, Hyderabad offering expert doctors, 24/7 emergency care, advanced treatments, ICU, and cashless insurance facilities." />
                <meta name="keywords" content="TX Hospitals Uppal, Best Hospital in Uppal, Multi Specialty Hospital in Uppal, Hospital in Uppal Hyderabad, Best Hospital Near Uppal, Emergency Hospital in Uppal, 24/7 Hospital in Uppal, Healthcare Services in Uppal" />
                
                {/* Open Graph */}
                <meta property="og:type" content="business.business" />
                <meta property="og:title" content="TX Hospitals Uppal | Multispecialty Hospital in Hyderabad" />
                <meta property="og:description" content="24/7 emergency care, cardiology, orthopedics & maternity in Uppal, Hyderabad. Expert doctors. Book now." />
                <meta property="og:url" content="https://txhospitals.in/uppal/" />
                <meta property="og:image" content="https://txhospitals.in/wp-content/uploads/uppal-og-image.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:locale" content="en_IN" />
                <meta property="og:site_name" content="TX Hospitals" />

                {/* Twitter / X card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="TX Hospitals Uppal | Multispecialty Hospital in Hyderabad" />
                <meta name="twitter:description" content="24/7 emergency, cardiology, ortho & maternity in Uppal, Hyderabad. Book an appointment today." />
                <meta name="twitter:image" content="https://txhospitals.in/wp-content/uploads/uppal-og-image.jpg" />

                {/* Hospital structured data (JSON-LD) */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Hospital",
                            "name": "TX Hospitals Uppal",
                            "url": "https://txhospitals.in/uppal/",
                            "logo": "https://txhospitals.in/wp-content/uploads/logo.png",
                            "image": "https://txhospitals.in/wp-content/uploads/uppal-hospital.jpg",
                            "description": "TX Hospitals Uppal is a multispecialty hospital in Uppal, Hyderabad offering emergency care, cardiology, orthopedics, maternity, and more.",
                            "telephone": "+91-40-43 108 108",
                            "email": "info@txhospitals.in",
                            "address": {
                                "@type": "PostalAddress",
                                "streetAddress": "# 2-6-71, Bharath Nagar Colony, Near Masjid Uppal",
                                "addressLocality": "Uppal",
                                "addressRegion": "Telangana",
                                "postalCode": "500039",
                                "addressCountry": "IN"
                            },
                            "geo": {
                                "@type": "GeoCoordinates",
                                "latitude": 17.402553,
                                "longitude": 78.566944
                            },
                            "openingHoursSpecification": [
                                {
                                    "@type": "OpeningHoursSpecification",
                                    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                                    "opens": "00:00",
                                    "closes": "23:59"
                                }
                            ],
                            "availableService": [
                                { "@type": "MedicalTherapy", "name": "Emergency Care" },
                                { "@type": "MedicalTherapy", "name": "Cardiology" },
                                { "@type": "MedicalTherapy", "name": "Orthopedics" },
                                { "@type": "MedicalTherapy", "name": "Maternity & Gynecology" },
                                { "@type": "MedicalTherapy", "name": "Neurology" }
                            ],
                            "priceRange": "₹₹",
                            "hasMap": "https://maps.google.com/?q=TX+Hospitals+Uppal+Hyderabad",
                            "sameAs": [
                                "https://www.facebook.com/txhospitals/",
                                "https://www.instagram.com/txhospitals"
                            ]
                        })
                    }}
                />
            </Head>
            <SecondaryLayout>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
                    <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Uppal" }]} />
                </div>
                <main>
                    {/* Hero Section */}
                    <UppalNewHero />

                    {/* Welcome Section */}
                    <UppalNewAbout />

                    {/* Specialties Section */}
                    <UppalNewSpecialties />

                    {/* CT Scan Section */}
                    <UppalNewCTScan />

                    {/* Emergency Section */}
                    <UppalNewEmergency />

                    {/* Doctors Section */}
                    <UppalNewDoctors />

                    {/* Testimonials Section */}
                    <UppalNewTestimonials />

                    {/* Locations Section */}
                    <UppalNewLocations />

                    {/* Blogs Section */}
                    <UppalNewBlogs />

                    {/* FAQ Section */}
                    <UppalNewFAQ />
                </main>
            </SecondaryLayout>
        </>
    );
}