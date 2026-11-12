import CONFIG from "@/config";
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

// export default function KachigudaPage({ initialDoctors = [], initialBlogs = [] }) {
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
import LocalitySchema from '@/utils/LocalitySchema';

export default function KachigudaPage({ initialDoctors = [], initialBlogs = [] }) {
    return (
        <>
            <Head>
                <title>Best Multi-Specialty Care in Kachiguda, Hyderabad | TX Hospitals</title>
                <meta name="description" content="TX Hospitals Kachiguda offers world-class multi-specialty healthcare, 24/7 emergency, and top doctors. Book your free consultation today!" />
            </Head>
            <LocalitySchema
                location="kachiguda"
                pageTitle="Best Multi-Specialty Care in Kachiguda, Hyderabad | TX Hospitals"
                description="TX Hospitals Kachiguda offers world-class multi-specialty healthcare, 24/7 emergency, and top doctors. Book your free consultation today!"
                pageUrl="/kachiguda/"
            />
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
                    <KachigudaNewDoctors initialDoctors={initialDoctors} />

                    {/* Why choose section */}
                    <KachigudaNewWhyChoose />

                    {/* Testimonials Section */}
                    <KachigudaNewTestimonials />

                    {/* CTA Section */}
                    <KachigudaNewCTA />

                    {/* Locations Section */}
                    <KachigudaNewLocations />

                    {/* Blogs Section */}
                    <KachigudaNewBlogs initialBlogs={initialBlogs} />

                    {/* FAQ Section */}
                    <KachigudaNewFAQ />
                </main>
            </SecondaryLayout>
        </>
    );
}



export async function getServerSideProps({ res }) {
    if (res) {
        res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    }
    let initialDoctors = [];
    let initialBlogs = [];
    try {
        const [docsRes, blogsRes] = await Promise.all([
            fetch(`${CONFIG.API_BASE_URL}/getDoctorsList`).then(r => r.ok ? r : fetch(`${CONFIG.API_BASE_URL}/getAllDoctors`)),
            fetch(`${CONFIG.API_BASE_URL}/blogs/getBlogsList/${encodeURIComponent('Kachiguda')}`)
        ]);

        if (docsRes.ok) {
            const data = await docsRes.json();
            const targetIds = [
                'drgabrielsukumarchinnam@txhospitals.in',
                'drkaranmpatel@txhospitals.in',
                'drnareshdude@txhospitals.in'
            ];
            initialDoctors = targetIds.map(id => (data || []).find(doc => doc.id === id)).filter(Boolean);
        }

        if (blogsRes.ok) {
            const bData = await blogsRes.json();
            const raw = bData?.Items || (Array.isArray(bData) ? bData : []);
            initialBlogs = raw
                .filter(b => (b.status ? b.status === 'active' : b.enabled !== false) && b.status !== 'inactive' && b.enabled !== false)
                .sort((a, b) => new Date(b.createdAt || b.timeline || 0) - new Date(a.createdAt || a.timeline || 0));
        }
    } catch (err) {
        console.error("Error in Kachiguda getServerSideProps:", err);
    }

    return {
        props: {
            initialDoctors,
            initialBlogs
        }
    };
}
