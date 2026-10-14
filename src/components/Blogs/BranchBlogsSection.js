import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import CONFIG from '@/config';

/**
 * BranchBlogsSection
 *
 * Props:
 *  - location  {string}  One of: "Hyderabad" | "Banjara Hills" | "Uppal" | "Kachiguda" | "Miyapur"
 *              When location === "Hyderabad" (or not provided) it falls back to getAllBlogs.
 *  - maxCards  {number}  How many cards to show (default 3)
 */
const BranchBlogsSection = ({ location, maxCards = 3 }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('ALL');

    // ── Fetch ──────────────────────────────────────────────────────────────────
    useEffect(() => {
        let cancelled = false;
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const url =
                    location && location !== 'Hyderabad'
                        ? `${CONFIG.API_BASE_URL}/blogs/getBlogsByLocation/${encodeURIComponent(location)}`
                        : `${CONFIG.API_BASE_URL}/blogs/getAllBlogs`;

                const response = await axios.get(url);

                // Both endpoints return Items array; single location may return array directly
                const raw =
                    response.data?.Items ||
                    (Array.isArray(response.data) ? response.data : []);

                const active = raw
                    .filter(
                        (b) =>
                            (b.status ? b.status === 'active' : b.enabled !== false) &&
                            b.status !== 'inactive' &&
                            b.enabled !== false
                    )
                    .sort((a, b) => new Date(b.createdAt || b.timeline || 0) - new Date(a.createdAt || a.timeline || 0));

                if (!cancelled) setBlogs(active);
            } catch {
                if (!cancelled) setBlogs([]);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        fetchBlogs();
        return () => { cancelled = true; };
    }, [location]);

    // ── Unique categories ──────────────────────────────────────────────────────
    const categories = useMemo(() => {
        const set = new Set();
        blogs.forEach((b) => (b.categories || []).forEach((c) => c && set.add(c)));
        return Array.from(set);
    }, [blogs]);

    // ── Filter by category then slice ─────────────────────────────────────────
    const visibleBlogs = useMemo(() => {
        const filtered =
            selectedCategory === 'ALL'
                ? blogs
                : blogs.filter((b) => (b.categories || []).includes(selectedCategory));
        return filtered.slice(0, maxCards);
    }, [blogs, selectedCategory, maxCards]);

    // ── Format date helper ────────────────────────────────────────────────────
    const formatDate = (raw) => {
        if (!raw) return '';
        const d = new Date(raw);
        return isNaN(d.getTime())
            ? raw
            : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    // ── Read-time estimate ────────────────────────────────────────────────────
    const estimateReadTime = (blog) => {
        const words =
            (blog.extraFields || [])
                .map((f) => (f.description || '').replace(/<[^>]+>/g, ''))
                .join(' ')
                .split(/\s+/).length;
        const mins = Math.max(1, Math.round(words / 200));
        return `${mins} min read`;
    };

    // ── Loading skeleton ──────────────────────────────────────────────────────
    if (loading) {
        return (
            <section className="py-10 md:py-12" style={{ background: 'rgb(243, 243, 245)' }}>
                <div className="max-w-[1170px] mx-auto px-6">
                    <div className="text-center mb-10">
                        <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-3 animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="rounded-xl bg-white overflow-hidden animate-pulse"
                                style={{ border: '0.5px solid rgb(215,215,215)', boxShadow: 'rgba(0,0,0,0.05) 0px 4px 12px' }}>
                                <div className="w-full bg-gray-200" style={{ height: 200 }} />
                                <div className="p-5 space-y-3">
                                    <div className="h-3 bg-gray-200 rounded w-24" />
                                    <div className="h-4 bg-gray-200 rounded w-full" />
                                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // ── Coming-soon state ─────────────────────────────────────────────────────
    if (blogs.length === 0) {
        return (
            <section id="blogs" className="py-10 md:py-12" style={{ background: 'rgb(243, 243, 245)' }}>
                <div className="max-w-[1170px] mx-auto px-6">
                    <div className="text-center mb-10">
                        <h2 className="mb-3 text-2xl md:text-3xl lg:text-4xl font-bold" style={{ color: 'rgb(3, 2, 19)' }}>
                            Health Insights &amp; <span style={{ color: 'rgb(189, 56, 92)' }}>Articles</span>
                        </h2>
                        <p className="max-w-[620px] mx-auto text-gray-700"
                            style={{ fontSize: '15px', fontWeight: 400, lineHeight: 1.7 }}>
                            Explore easy-to-read health articles from TX Hospitals specialists.
                        </p>
                    </div>

                    {/* Coming Soon Card */}
                    <div className="flex flex-col items-center justify-center py-16 px-6 rounded-2xl bg-white text-center"
                        style={{ border: '1.5px dashed rgb(189, 56, 92)', maxWidth: 560, margin: '0 auto' }}>
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                            style={{ background: 'rgb(240, 223, 229)' }}>
                            <BookOpen className="w-8 h-8" style={{ color: 'rgb(189, 56, 92)' }} />
                        </div>
                        <h3 className="text-xl font-bold mb-2" style={{ color: 'rgb(3, 2, 19)' }}>
                            Blog Articles Coming Soon
                        </h3>
                        <p className="text-gray-500 mb-6" style={{ fontSize: 14, lineHeight: 1.7 }}>
                            We&apos;re preparing expert health articles specifically for our{' '}
                            <strong style={{ color: 'rgb(189, 56, 92)' }}>{location}</strong> branch.
                            Check back soon for insightful reads on health, wellness, and medical updates.
                        </p>
                        <Link
                            href="/blog/"
                            className="inline-flex items-center gap-2 font-semibold px-5 py-2.5 rounded-full text-white transition-all hover:gap-3"
                            style={{ background: 'rgb(189, 56, 92)', fontSize: 14 }}
                        >
                            Browse All Blogs <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    // ── Main render ───────────────────────────────────────────────────────────
    return (
        <section id="blogs" className="py-10 md:py-12" style={{ background: 'rgb(243, 243, 245)' }}>
            <div className="max-w-[1170px] mx-auto px-6">
                {/* Section header */}
                <div className="text-center mb-8">
                    <h2 className="mb-3 text-2xl md:text-3xl lg:text-4xl font-bold" style={{ color: 'rgb(3, 2, 19)' }}>
                        Health Insights &amp; <span style={{ color: 'rgb(189, 56, 92)' }}>Articles</span>
                    </h2>
                    <p className="max-w-[620px] mx-auto text-gray-700"
                        style={{ fontSize: '15px', fontWeight: 400, lineHeight: 1.7 }}>
                        Explore easy-to-read health articles from TX Hospitals specialists for informed and confident care decisions.
                    </p>
                </div>

                {/* Category filter pills — same pattern as BlogsLandingPage categories */}
                {categories.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        <button
                            onClick={() => setSelectedCategory('ALL')}
                            className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                            style={
                                selectedCategory === 'ALL'
                                    ? { background: 'rgb(189, 56, 92)', color: '#fff' }
                                    : { background: 'rgb(255,255,255)', color: 'rgb(80,80,80)', border: '1px solid rgb(215,215,215)' }
                            }
                        >
                            All
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                                style={
                                    selectedCategory === cat
                                        ? { background: 'rgb(189, 56, 92)', color: '#fff' }
                                        : { background: 'rgb(255,255,255)', color: 'rgb(80,80,80)', border: '1px solid rgb(215,215,215)' }
                                }
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}

                {/* No results after category filter */}
                {visibleBlogs.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-gray-500 font-medium">No blogs found in this category.</p>
                        <button
                            onClick={() => setSelectedCategory('ALL')}
                            className="mt-3 text-sm font-semibold underline"
                            style={{ color: 'rgb(189, 56, 92)' }}
                        >
                            Show all
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {visibleBlogs.map((blog, idx) => {
                            const slug = blog.url
                                ? `/${blog.url.replace(/^\/|\/$/g, '')}/`
                                : null;
                            const hasLink = !!slug && slug !== '/#/';
                            const category = (blog.categories || [])[0] || '';
                            const date = formatDate(blog.timeline || blog.createdAt);
                            const readTime = estimateReadTime(blog);

                            return (
                                <Link
                                    key={idx}
                                    href={hasLink ? slug : '#'}
                                    onClick={(e) => { if (!hasLink) e.preventDefault(); }}
                                    className={`flex flex-col rounded-xl bg-white overflow-hidden transition-all duration-300 group ${hasLink ? 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer' : 'cursor-default'}`}
                                    style={{ border: '0.5px solid rgb(215, 215, 215)', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 4px 12px' }}
                                >
                                    {/* Image */}
                                    <div className="overflow-hidden relative" style={{ height: 200 }}>
                                        <img
                                            src={blog.blogImage}
                                            alt={`Health Article: ${blog.blogTitle}`}
                                            loading="eager"
                                            decoding="async"
                                            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                                        />
                                    </div>

                                    {/* Body */}
                                    <div className="flex flex-col flex-1 p-5 gap-3">
                                        {/* Category + read-time */}
                                        <div className="flex items-center justify-between">
                                            {category ? (
                                                <span className="px-2.5 py-0.5 rounded-full"
                                                    style={{ background: 'rgb(240, 223, 229)', fontSize: 11, fontWeight: 500, color: 'rgb(189, 56, 92)' }}>
                                                    {category}
                                                </span>
                                            ) : <span />}
                                            <span className="flex items-center gap-1" style={{ fontSize: 11, color: 'rgb(108, 108, 108)' }}>
                                                <Clock className="w-3 h-3" /> {readTime}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 style={{ fontSize: 15, fontWeight: 600, color: 'rgb(3, 2, 19)', lineHeight: 1.5, margin: 0 }}
                                            className="line-clamp-2">
                                            {blog.blogTitle}
                                        </h3>

                                        {/* Footer: date + read-more */}
                                        <div className="flex items-center justify-between pt-3 mt-auto"
                                            style={{ borderTop: '1px solid rgb(240, 223, 229)' }}>
                                            <span style={{ fontSize: 12, color: 'rgb(108, 108, 108)' }}>{date}</span>
                                            <span className="flex items-center gap-1 group-hover:gap-2 transition-all font-semibold"
                                                style={{ fontSize: 12, color: 'rgb(189, 56, 92)' }}>
                                                Read More <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}

                {/* View all link */}
                {blogs.length > maxCards && (
                    <div className="text-center mt-8">
                        <Link
                            href="/blog/"
                            className="inline-flex items-center gap-2 font-semibold px-6 py-2.5 rounded-full border-2 transition-all hover:gap-3"
                            style={{ borderColor: 'rgb(189, 56, 92)', color: 'rgb(189, 56, 92)', fontSize: 14 }}
                        >
                            View All Articles <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BranchBlogsSection;
