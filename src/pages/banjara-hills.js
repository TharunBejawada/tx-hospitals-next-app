import CONFIG from "@/config";
import React from 'react';
import Head from 'next/head';
import SecondaryLayout from '@/components/Layouts/SecondaryLayout';
import BanjaraHillsNewHero from '@/components/BanjaraHills/BanjaraHillsNewHero';
import BanjaraHillsNewAbout from '@/components/BanjaraHills/BanjaraHillsNewAbout';
import BanjaraHillsNewSpecialties from '@/components/BanjaraHills/BanjaraHillsNewSpecialties';
import BanjaraHillsNewCTA from '@/components/BanjaraHills/BanjaraHillsNewCTA';
import BanjaraHillsNewRoboticSurgery from '@/components/BanjaraHills/BanjaraHillsNewRoboticSurgery';
import BanjaraHillsNewDoctors from '@/components/BanjaraHills/BanjaraHillsNewDoctors';
import BanjaraHillsNewWhyChoose from '@/components/BanjaraHills/BanjaraHillsNewWhyChoose';
import BanjaraHillsNewTestimonials from '@/components/BanjaraHills/BanjaraHillsNewTestimonials';
import BanjaraHillsNewLocations from '@/components/BanjaraHills/BanjaraHillsNewLocations';
import BanjaraHillsNewBlogs from '@/components/BanjaraHills/BanjaraHillsNewBlogs';
import BanjaraHillsNewFAQ from '@/components/BanjaraHills/BanjaraHillsNewFAQ';
import Breadcrumb from '@/components/Common/Breadcrumb';
import LocalitySchema from '@/utils/LocalitySchema';
import { getTopBranchDoctors } from '@/utils/branchDoctors';

export default function BanjaraHillsPage({ initialDoctors = [], initialBlogs = [] }) {
    return (
        <>
            <Head>
                <title>Best Multi Speciality Hospital in Banjara Hills, Hyderabad | TX Hospitals</title>
                <meta
                    name="description"
                    content="Looking for the best hospital in Banjara Hills? TX Hospitals offers expert doctors, 24x7 emergency care, advanced ICU, cashless insurance, and specialist consultations. Book your free consultation today!"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <LocalitySchema
                location="banjara-hills"
                pageTitle="Best Multi Speciality Hospital in Banjara Hills, Hyderabad | TX Hospitals"
                description="Looking for the best hospital in Banjara Hills? TX Hospitals offers expert doctors, 24x7 emergency care, advanced ICU, cashless insurance, and specialist consultations."
                pageUrl="/banjara-hills/"
            />
            <SecondaryLayout>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
                    <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Banjara Hills" }]} />
                </div>
                <main>
                    {/* First Section: Hero Section with Appointment Form & Background Image */}
                    <BanjaraHillsNewHero />

                    {/* Second Section: Welcome Section */}
                    <BanjaraHillsNewAbout />

                    {/* Third Section: Our Specialities Grid */}
                    <BanjaraHillsNewSpecialties />

                    {/* Fourth Section: Advanced Kidney & Liver Transplant Care CTA */}
                    <BanjaraHillsNewCTA />

                    {/* Fifth Section: Advanced Robotic Surgery */}
                    <BanjaraHillsNewRoboticSurgery />

                    {/* Sixth Section: Expert Doctors Row */}
                    <BanjaraHillsNewDoctors initialDoctors={initialDoctors} />

                    {/* Seventh Section: Why Choose TX Hospitals */}
                    <BanjaraHillsNewWhyChoose />

                    {/* Eighth Section: Patient Testimonials */}
                    <BanjaraHillsNewTestimonials />

                    {/* Ninth Section: Our Locations */}
                    <BanjaraHillsNewLocations />

                    {/* Tenth Section: Health Insights & Articles */}
                    <BanjaraHillsNewBlogs initialBlogs={initialBlogs} />

                    {/* Eleventh Section: Frequently Asked Questions */}
                    <BanjaraHillsNewFAQ />
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
            fetch(`${CONFIG.API_BASE_URL}/blogs/getBlogsList/${encodeURIComponent('Banjara Hills')}`)
        ]);

        if (docsRes.ok) {
            const data = await docsRes.json();
            initialDoctors = getTopBranchDoctors(data, 'Banjara', 3);
        }

        if (blogsRes.ok) {
            const bData = await blogsRes.json();
            const raw = bData?.Items || (Array.isArray(bData) ? bData : []);
            initialBlogs = raw
                .filter(b => (b.status ? b.status === 'active' : b.enabled !== false) && b.status !== 'inactive' && b.enabled !== false)
                .sort((a, b) => new Date(b.createdAt || b.timeline || 0) - new Date(a.createdAt || a.timeline || 0));
        }
    } catch (err) {
        console.error("Error in Banjara Hills getServerSideProps:", err);
    }

    return {
        props: {
            initialDoctors,
            initialBlogs
        }
    };
}
