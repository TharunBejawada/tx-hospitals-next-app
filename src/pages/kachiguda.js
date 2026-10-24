// import React from 'react';
// import Head from 'next/head';
// import SecondaryLayout from '@/components/Layouts/SecondaryLayout';
// import KachigudaHero from '@/components/Kachiguda/KachigudaHero';
// import KachigudaTrustBar from '@/components/Kachiguda/KachigudaTrustBar';
// import KachigudaSpecialties from '@/components/Kachiguda/KachigudaSpecialties';
// import KachigudaWhyChoose from '@/components/Kachiguda/KachigudaWhyChoose';
// import KachigudaSpecialists from '@/components/Kachiguda/KachigudaSpecialists';
// import KachigudaTestimonials from '@/components/Kachiguda/KachigudaTestimonials';
// import KachigudaMap from '@/components/Kachiguda/KachigudaMap';
// import KachigudaCTA from '@/components/Kachiguda/KachigudaCTA';

// export default function KachigudaPage() {
//     return (
//         <>
// <Head>
//     <title>Best Multi-Specialty Care in Kachiguda, Hyderabad | TX Hospitals</title>
//     <meta name="description" content="TX Hospitals Kachiguda offers world-class multi-specialty healthcare, 24/7 emergency, and top doctors. Book your free consultation today!" />
// </Head>
//             <SecondaryLayout>
//                 <main>
//                     {/* First Section: Hero Section with Appointment Form */}
//                     <KachigudaHero />

//                     {/* Second Section: Trust Highlights Bar */}
//                     <KachigudaTrustBar />

//                     {/* Third Section: Specialties Grid */}
//                     <KachigudaSpecialties />

//                     {/* Fourth Section: Why Choose TX Kachiguda */}
//                     <KachigudaWhyChoose />

//                     {/* Fifth Section: Senior Specialists Grid */}
//                     <KachigudaSpecialists />

//                     {/* Sixth Section: Patient Success Stories Testimonials */}
//                     <KachigudaTestimonials />

//                     {/* Seventh Section: Find Us / Interactive Google Map & Contacts */}
//                     <KachigudaMap />

//                     {/* Eighth Section: Ready to Get World-Class Care CTA Banner */}
//                     <KachigudaCTA />
//                 </main>
//             </SecondaryLayout>
//         </>
//     );
// }

import React from 'react';
import Head from 'next/head';
import SecondaryLayout from '@/components/Layouts/SecondaryLayout';
import KachigudaNewHero from '@/components/Kachiguda/KachigudaNewHero';
import KachigudaNewAbout from '@/components/Kachiguda/KachigudaNewAbout';
import KachigudaNewSpecialties from '@/components/Kachiguda/KachigudaNewSpecialties';
import KachigudaNewDoctors from '@/components/Kachiguda/KachigudaNewDoctors';
import KachigudaNewWhyChoose from '@/components/Kachiguda/KachigudaNewWhyChoose';
import KachigudaNewTestimonials from '@/components/Kachiguda/KachigudaNewTestimonials';
import KachigudaNewCTA from '@/components/Kachiguda/KachigudaNewCTA';
import KachigudaNewLocations from '@/components/Kachiguda/KachigudaNewLocations';
import KachigudaNewBlogs from '@/components/Kachiguda/KachigudaNewBlogs';
import KachigudaNewFAQ from '@/components/Kachiguda/KachigudaNewFAQ';
import Breadcrumb from '@/components/Common/Breadcrumb';

export default function KachigudaPage() {
    return (
        <>
            <Head>
                <title>Best Multi-Specialty Care in Kachiguda, Hyderabad | TX Hospitals</title>
                <meta name="description" content="TX Hospitals Kachiguda offers world-class multi-specialty healthcare, 24/7 emergency, and top doctors. Book your free consultation today!" />
            </Head>
            <SecondaryLayout>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
                    <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Kachiguda" }]} />
                </div>
                <main>
                    {/* Hero Section */}
                    <KachigudaNewHero />

                    {/* Welcome Section */}
                    <KachigudaNewAbout />

                    {/* Specialties Section */}
                    <KachigudaNewSpecialties />

                    {/* Doctors Section */}
                    <KachigudaNewDoctors />

                    {/* Why choose section */}
                    <KachigudaNewWhyChoose />

                    {/* Testimonials Section */}
                    <KachigudaNewTestimonials />

                    {/* CTA Section */}
                    <KachigudaNewCTA />

                    {/* Locations Section */}
                    <KachigudaNewLocations />

                    {/* Blogs Section */}
                    <KachigudaNewBlogs />

                    {/* FAQ Section */}
                    <KachigudaNewFAQ />
                </main>
            </SecondaryLayout>
        </>
    );
}

