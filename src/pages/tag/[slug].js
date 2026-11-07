import React from 'react';
import Head from "next/head";
import SecondaryLayout from '@/components/Layouts/SecondaryLayout';
import TagBlogs from '@/components/Blogs/TagBlogs';
import axios from 'axios';
import CONFIG from '@/config';

export async function getServerSideProps(context) {
    const { slug } = context.params || {};
    if (!slug) {
        return { redirect: { destination: "/blog/", permanent: false } };
    }

    const readableTag = String(slug)
        .replace(/-/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase());

    try {
        const response = await axios.get(`${CONFIG.API_BASE_URL}/blogs/getBlogsByTag/${encodeURIComponent(readableTag)}`, { timeout: 6000 });
        const raw = Array.isArray(response.data) ? response.data : (response.data?.Items || []);
        const initialBlogs = raw
            .filter(blog => (blog.status ? blog.status === "active" : blog.enabled !== false) && blog.status !== "inactive" && blog.enabled !== false)
            .sort((a, b) => new Date(b.timeline || b.createdAt || 0) - new Date(a.timeline || a.createdAt || 0));

        return {
            props: {
                initialTag: readableTag,
                initialBlogs
            }
        };
    } catch (err) {
        console.error("SSR Tag blogs error:", err.message);
        return {
            props: {
                initialTag: readableTag,
                initialBlogs: []
            }
        };
    }
}

export default function Tag_Blogs({ initialTag, initialBlogs }) {
    return (
        <>
            <Head>
                <title>{`Health Tag: ${initialTag || 'Health'} | TX Hospitals`}</title>
                <meta name="description" content={`Articles and health advice tagged with ${initialTag || 'health'} from TX Hospitals experts.`} />
            </Head>
            <SecondaryLayout>
                <TagBlogs initialTag={initialTag} initialBlogs={initialBlogs} />
            </SecondaryLayout>
        </>
    );
}
