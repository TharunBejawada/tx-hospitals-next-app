import CONFIG from "@/config";
import React from 'react';
import Head from 'next/head';
import SecondaryLayout from '@/components/Layouts/SecondaryLayout';
import MiyapurHero from '@/components/Miyapur/MiyapurHero';
import MiyapurAbout from '@/components/Miyapur/MiyapurAbout';
import MiyapurSpecialties from '@/components/Miyapur/MiyapurSpecialties';
import MiyapurRoboticKnee from '@/components/Miyapur/MiyapurRoboticKnee';
import MiyapurDoctors from '@/components/Miyapur/MiyapurDoctors';
import MiyapurWhyChoose from '@/components/Miyapur/MiyapurWhyChoose';
import MiyapurTestimonials from '@/components/Miyapur/MiyapurTestimonials';
import MiyapurBookConsultation from '@/components/Miyapur/MiyapurBookConsultation';
import MiyapurLocations from '@/components/Miyapur/MiyapurLocations';
import MiyapurBlogs from '@/components/Miyapur/MiyapurBlogs';
import MiyapurFAQ from '@/components/Miyapur/MiyapurFAQ';
import Breadcrumb from '@/components/Common/Breadcrumb';
import LocalitySchema from '@/utils/LocalitySchema';
import { getTopBranchDoctors } from '@/utils/branchDoctors';

export default function MiyapurPage({ initialDoctors = [], initialBlogs = [] }) {
    return (
        <>
            <Head>
                <title>Best Hospital in Miyapur, Hyderabad | TX Hospitals Miyapur</title>
                <meta name="description" content="TX Hospitals Miyapur is a leading multi-specialty hospital in Miyapur, Hyderabad, offering expert doctors, 24/7 emergency care, advanced treatments, ICU facilities services." />
                <meta name="keywords" content="TX Hospitals Miyapur, Best Hospital in Miyapur, Multi Specialty Hospital in Miyapur, Hospital in Miyapur Hyderabad, Best Hospital Near Miyapur, Emergency Hospital in Miyapur, 24/7 Hospital in Miyapur, Healthcare Services in Miyapur, Best Doctors in Miyapur, Super Specialty Hospital in Miyapur, Cashless Hospital in Miyapur, Hospital Near Hafeezpet, Hospital Near Chandanagar, Hospital Near Madinaguda, Hospital Near Kukatpally, Hospital Near Nizampet, Advanced Healthcare in Miyapur" />
            </Head>
            <LocalitySchema
                location="miyapur"
                pageTitle="Best Hospital in Miyapur, Hyderabad | TX Hospitals Miyapur"
                description="TX Hospitals Miyapur is a leading multi-specialty hospital in Miyapur, Hyderabad, offering expert doctors, 24/7 emergency care, advanced treatments, ICU facilities services."
                pageUrl="/miyapur/"
            />
            <SecondaryLayout>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
                    <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Miyapur" }]} />
                </div>
                <main>
                    {/* Hero Section */}
                    <MiyapurHero />

                    {/* About Section */}
                    <MiyapurAbout />

                    {/* Specialties Section */}
                    <MiyapurSpecialties />

                    {/* Robotic Knee Section */}
                    <MiyapurRoboticKnee />

                    {/* Doctors Section */}
                    <MiyapurDoctors initialDoctors={initialDoctors} />

                    {/* Why Choose Section */}
                    <MiyapurWhyChoose />

                    {/* Testimonials Section */}
                    <MiyapurTestimonials />

                    {/* Book Consultation Section */}
                    <MiyapurBookConsultation />

                    {/* Locations Section */}
                    <MiyapurLocations />

                    {/* Blogs Section */}
                    <MiyapurBlogs initialBlogs={initialBlogs} />

                    {/* FAQ Section */}
                    <MiyapurFAQ />
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
            fetch(`${CONFIG.API_BASE_URL}/blogs/getBlogsList/${encodeURIComponent('Miyapur')}`)
        ]);

        if (docsRes.ok) {
            const data = await docsRes.json();
            initialDoctors = getTopBranchDoctors(data, 'Miyapur', 3);
        }

        if (blogsRes.ok) {
            const bData = await blogsRes.json();
            const raw = bData?.Items || (Array.isArray(bData) ? bData : []);
            initialBlogs = raw
                .filter(b => (b.status ? b.status === 'active' : b.enabled !== false) && b.status !== 'inactive' && b.enabled !== false)
                .sort((a, b) => new Date(b.createdAt || b.timeline || 0) - new Date(a.createdAt || a.timeline || 0));
        }
    } catch (err) {
        console.error("Error in Miyapur getServerSideProps:", err);
    }

    return {
        props: {
            initialDoctors,
            initialBlogs
        }
    };
}
