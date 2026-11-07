import React from 'react';
import dynamic from 'next/dynamic';
import Layout from '@/components/Layouts/Layout';
import Specialities from '@/components/HomePage/Specialities';
import DiseaseSearch from '@/components/HomePage/DiseaseSearch';
import WhyChooseUs from '@/components/HomePage/WhyChooseUs';
import VideoSection from '@/components/HomePage/VideoSection';
import HealthLibrary from '@/components/HomePage/HealthLibrary';
import FAQ from '@/components/HomePage/FAQ';
import OurLocations from '@/components/HomePage/OurLocations';
import Head from "next/head";
import CONFIG from "@/config";

const SocialSidebar = dynamic(() => import('@/components/HomePage/SocialSidebar'), { 
    ssr: false,
    loading: () => null
});

export default function HomePage({ initialBlogs = [] }) {
    return (
        <>
            <Head>
                <title>TX Hospitals | Leading Multi-Specialty Hospitals Hyderabad</title>
                <meta name="description" content="TX Hospitals offers world-class multi-specialty care in Hyderabad at Uppal, Kachiguda, Banjara Hills & Miyapur with expert doctors and advanced care." />
                <meta name="keywords" content="TX Hospitals Hyderabad, Multi-specialty hospital Hyderabad, Super specialty hospital Hyderabad, Best hospital in Hyderabad, Top Hospitals in Hyderabad" />
                
                {/* Preload critical LCP Hero Poster Image */}
                <link rel="preload" as="image" href="/assets/Header/hero-poster.webp" type="image/webp" fetchPriority="high" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="TX Hospitals | Leading Multi-Specialty Hospitals Hyderabad" />
                <meta property="og:description" content="TX Hospitals offers world-class multi-specialty care in Hyderabad at Uppal, Kachiguda, Banjara Hills & Miyapur with expert doctors and advanced care." />
                <meta property="og:image" content="https://txhospitals.in/TXlogoWB.jpg" />
                <meta property="og:url" content="https://txhospitals.in/" />
                <meta property="og:site_name" content="TX Hospitals" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="TX Hospitals | Leading Multi-Specialty Hospitals Hyderabad" />
                <meta name="twitter:description" content="TX Hospitals offers world-class multi-specialty care in Hyderabad at Uppal, Kachiguda, Banjara Hills & Miyapur with expert doctors and advanced care." />
                <meta name="twitter:image" content="https://txhospitals.in/TXlogoWB.jpg" />
                <meta name="twitter:site" content="@txhospitals" />
            </Head>
            <Layout>
                <h1 className="sr-only">TX Hospitals | Leading Multi-Specialty Hospitals Hyderabad</h1>
                <SocialSidebar />
                <Specialities />
                <DiseaseSearch />
                <WhyChooseUs />
                <VideoSection />
                <HealthLibrary initialBlogs={initialBlogs} />
                <FAQ />
                <OurLocations />
            </Layout>
        </>
    );
}

export async function getServerSideProps({ res }) {
    if (res) {
        res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    }
    let initialBlogs = [];
    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}/blogs/getBlogsList`);
        if (response.ok) {
            const data = await response.json();
            const sortedAndFilteredBlogs = (data?.Items || [])
                .filter(blog => (blog.status ? blog.status === "active" : blog.enabled !== false) && blog.status !== "inactive" && blog.enabled !== false)
                .sort((a, b) => new Date(b.createdAt || b.timeline || 0) - new Date(a.createdAt || a.timeline || 0));
            initialBlogs = sortedAndFilteredBlogs.slice(0, 6);
        }
    } catch (err) {
        console.error("Error in homepage getServerSideProps:", err);
    }
    return {
        props: {
            initialBlogs
        }
    };
}
