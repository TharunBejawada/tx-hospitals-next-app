import React from 'react';
import Head from "next/head";
import SecondaryLayout from '@/components/Layouts/SecondaryLayout';
import CategoryBlogs from '@/components/Blogs/CategoryBlogs';
import axios from 'axios';
import CONFIG from '@/config';

export async function getServerSideProps(context) {
    const { slug } = context.params || {};
    if (!slug) {
        return { redirect: { destination: "/blog/", permanent: false } };
    }

    const readableCategory = String(slug)
        .replace(/-/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase());

    try {
        const response = await axios.get(`${CONFIG.API_BASE_URL}/blogs/getBlogsByCategory/${encodeURIComponent(readableCategory)}`, { timeout: 6000 });
        const raw = Array.isArray(response.data) ? response.data : (response.data?.Items || []);
        const initialBlogs = raw
            .filter(blog => (blog.status ? blog.status === "active" : blog.enabled !== false) && blog.status !== "inactive" && blog.enabled !== false)
            .sort((a, b) => new Date(b.timeline || b.createdAt || 0) - new Date(a.timeline || a.createdAt || 0));

        return {
            props: {
                initialCategory: readableCategory,
                initialBlogs
            }
        };
    } catch (err) {
        console.error("SSR Category blogs error:", err.message);
        return {
            props: {
                initialCategory: readableCategory,
                initialBlogs: []
            }
        };
    }
}

export default function Category_Blogs({ initialCategory, initialBlogs }) {
    return (
        <>
            <Head>
                <title>{`${initialCategory || 'Health'} Articles & Updates | TX Hospitals`}</title>
                <meta name="description" content={`Explore ${initialCategory || 'health'} insights, articles and medical updates from TX Hospitals specialists in Hyderabad.`} />
            </Head>
            <SecondaryLayout>
                <CategoryBlogs initialCategory={initialCategory} initialBlogs={initialBlogs} />
            </SecondaryLayout>
        </>
    );
}
