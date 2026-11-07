import React from 'react';
import Head from "next/head";
import SecondaryLayout from '@/components/Layouts/SecondaryLayout';
import BlogsLandingPage from '@/components/Blogs/BlogsLandingPage';
import { BlogListingSchema } from '@/utils/BlogSchema';
import axios from 'axios';
import CONFIG from '@/config';

export async function getServerSideProps() {
    try {
        const response = await axios.get(`${CONFIG.API_BASE_URL}/blogs/getBlogsList`, { timeout: 6000 });
        const rawBlogs = response.data?.Items || [];
        const initialBlogs = rawBlogs
            .filter(blog => (blog.status ? blog.status === "active" : blog.enabled !== false) && blog.status !== "inactive" && blog.enabled !== false)
            .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

        return {
            props: {
                initialBlogs
            }
        };
    } catch (err) {
        console.error("SSR Blog list error:", err.message);
        return {
            props: {
                initialBlogs: []
            }
        };
    }
}

export default function Blog_Page({ initialBlogs }) {
    return (
        <>
            <Head>
                <title>TX Hospitals Health Blog – Awareness, Tips & Medical Updates</title>
                <meta name="description" content="Explore medical insights, health tips, and awareness posts by TX Hospitals in Hyderabad—your go-to health and wellness blog for expert healthcare guidance." />
                <meta name="keywords" content="TX Hospitals health blog" />
            </Head>
            <BlogListingSchema
                title="TX Hospitals Health Blog – Awareness, Tips & Medical Updates"
                description="Explore medical insights, health tips, and awareness posts by TX Hospitals in Hyderabad—your go-to health and wellness blog for expert healthcare guidance."
                url="https://txhospitals.in/blog/"
            />
            <SecondaryLayout>
                <BlogsLandingPage initialBlogs={initialBlogs} />
            </SecondaryLayout>
        </>
    );
}
