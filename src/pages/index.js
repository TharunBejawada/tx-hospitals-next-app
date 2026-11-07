import React from 'react';
import dynamic from 'next/dynamic';
import Layout from '@/components/Layouts/Layout';
import Specialities from '@/components/HomePage/Specialities';
import LocationsBar from '@/components/HomePage/LocationsBar';
import Head from "next/head";
import CONFIG from "@/config";

const DiseaseSearch = dynamic(() => import('@/components/HomePage/DiseaseSearch'), { 
    loading: () => <div className="w-full min-h-[100px] animate-pulse bg-gray-50" />
});
const WhyChooseUs = dynamic(() => import('@/components/HomePage/WhyChooseUs'), {
    loading: () => <div className="w-full min-h-[200px] animate-pulse bg-white" />
});
const HealthLibrary = dynamic(() => import('@/components/HomePage/HealthLibrary'), {
    loading: () => <div className="w-full min-h-[200px] animate-pulse bg-white" />
});
const FAQ = dynamic(() => import('@/components/HomePage/FAQ'), {
    loading: () => <div className="w-full min-h-[200px] animate-pulse bg-white" />
});
const OurLocations = dynamic(() => import('@/components/HomePage/OurLocations'), {
    loading: () => <div className="w-full min-h-[200px] animate-pulse bg-white" />
});

const SocialSidebar = dynamic(() => import('@/components/HomePage/SocialSidebar'), { 
    ssr: false,
    loading: () => null
});
const VideoSection = dynamic(() => import('@/components/HomePage/VideoSection'), { 
    ssr: false,
    loading: () => <div className="w-full bg-[#fceef2] min-h-[400px] md:min-h-[500px] animate-pulse" />
});

export default function HomePage({ initialBlogs = [] }) {
    return (
        <>
            <Head>
                <title>TX Hospitals | Leading Multi-Specialty Hospitals Hyderabad</title>
                <meta name="description" content="TX Hospitals offers world-class multi-specialty care in Hyderabad at Uppal, Kachiguda, Banjara Hills & Miyapur with expert doctors and advanced care." />
                <meta name="keywords" content="TX Hospitals Hyderabad, Multi-specialty hospital Hyderabad, Super specialty hospital Hyderabad, Best hospital in Hyderabad, Top Hospitals in Hyderabad" />
                
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

