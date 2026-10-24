"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { ArrowRight, Clock } from "lucide-react";
import CONFIG from "@/config";

/**
 * Normalizes and extracts keywords from a department string.
 */
function getDepartmentKeywords(dept) {
    if (!dept) return [];
    const d = dept.toLowerCase();
    const keywords = [d];

    if (d.includes("cardio") || d.includes("cardiac") || d.includes("heart")) {
        keywords.push("cardio", "cardiac", "heart");
    }
    if (d.includes("gastro") || d.includes("digestive") || d.includes("liver")) {
        keywords.push("gastro", "liver", "digestive", "stomach", "endoscopy");
    }
    if (d.includes("ortho") || d.includes("bone") || d.includes("joint") || d.includes("spine")) {
        keywords.push("ortho", "bone", "joint", "spine", "knee", "hip");
    }
    if (d.includes("neuro") || d.includes("brain")) {
        keywords.push("neuro", "brain", "stroke");
    }
    if (d.includes("nephro") || d.includes("kidney") || d.includes("renal")) {
        keywords.push("nephro", "kidney", "renal", "dialysis");
    }
    if (d.includes("uro")) {
        keywords.push("uro", "prostate", "bladder");
    }
    if (d.includes("onco") || d.includes("cancer")) {
        keywords.push("onco", "cancer", "tumor");
    }
    if (d.includes("pulmo") || d.includes("chest") || d.includes("lung") || d.includes("respiratory")) {
        keywords.push("pulmo", "chest", "lung", "asthma");
    }
    if (d.includes("gyn") || d.includes("matern") || d.includes("obstet") || d.includes("women")) {
        keywords.push("gyn", "women", "maternity", "pregnancy");
    }
    if (d.includes("ped") || d.includes("paed") || d.includes("child")) {
        keywords.push("ped", "child", "infant");
    }
    if (d.includes("derma") || d.includes("skin")) {
        keywords.push("derma", "skin", "cosmet");
    }
    if (d.includes("ent") || d.includes("ear") || d.includes("throat")) {
        keywords.push("ent", "ear", "throat", "nose");
    }
    if (d.includes("endo") || d.includes("diabet")) {
        keywords.push("endo", "diabet", "thyroid");
    }

    return Array.from(new Set(keywords));
}

export default function DoctorBlogs({ department, doctorName, maxCards = 3 }) {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isCancelled = false;
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${CONFIG.API_BASE_URL}/blogs/getAllBlogs`);
                const raw = response.data?.Items || (Array.isArray(response.data) ? response.data : []);

                const active = raw
                    .filter(
                        (b) =>
                            (b.status ? b.status === "active" : b.enabled !== false) &&
                            b.status !== "inactive" &&
                            b.enabled !== false
                    )
                    .sort((a, b) => new Date(b.createdAt || b.timeline || 0) - new Date(a.createdAt || a.timeline || 0));

                if (isCancelled) return;

                // Match by department keywords
                const keywords = getDepartmentKeywords(department);
                const matched = [];
                const other = [];

                active.forEach((blog) => {
                    const cats = (blog.categories || []).map((c) => (c || "").toLowerCase());
                    const title = (blog.blogTitle || "").toLowerCase();
                    const tags = Array.isArray(blog.tags)
                        ? blog.tags.map((t) => (typeof t === "string" ? t : t?.name || "").toLowerCase())
                        : [];

                    const isMatch = keywords.some(
                        (k) =>
                            cats.some((c) => c.includes(k) || k.includes(c)) ||
                            tags.some((t) => t.includes(k) || k.includes(t)) ||
                            title.includes(k)
                    );

                    if (isMatch) {
                        matched.push(blog);
                    } else {
                        other.push(blog);
                    }
                });

                // Prioritize matched department blogs, fill up to maxCards with others if needed
                const combined = [...matched, ...other].slice(0, maxCards);
                setBlogs(combined);
            } catch (err) {
                console.error("Error fetching doctor department blogs:", err);
                if (!isCancelled) setBlogs([]);
            } finally {
                if (!isCancelled) setLoading(false);
            }
        };

        fetchBlogs();
        return () => {
            isCancelled = true;
        };
    }, [department, maxCards]);

    const formatDate = (raw) => {
        if (!raw) return "";
        const d = new Date(raw);
        return isNaN(d.getTime())
            ? raw
            : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    };

    const estimateReadTime = (blog) => {
        const words = (blog.extraFields || [])
            .map((f) => (f.description || "").replace(/<[^>]+>/g, ""))
            .join(" ")
            .split(/\s+/).length;
        const mins = Math.max(1, Math.round(words / 200));
        return `${mins} min read`;
    };

    if (loading) {
        return (
            <section className="py-10 md:py-14 bg-[#f8f9fa] border-t border-gray-100 font-inter">
                <div className="max-w-6xl mx-auto px-4 md:px-6">
                    <div className="text-center mb-8">
                        <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-3 animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-72 bg-gray-200 rounded-xl animate-pulse" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (!blogs || blogs.length === 0) {
        return null;
    }

    return (
        <section className="py-10 md:py-14 bg-[#f8f9fa] border-t border-gray-100 font-inter">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <h2
                        className="mb-2 font-bold"
                        style={{ fontSize: "clamp(22px, 3vw, 32px)", color: "rgb(3, 2, 19)" }}
                    >
                        Health Articles &amp; <span style={{ color: "rgb(189, 56, 92)" }}>Insights</span>
                    </h2>
                    <p className="max-w-xl mx-auto text-gray-500 text-sm md:text-base leading-relaxed">
                        Read health guides, expert medical insights, and wellness tips related to{" "}
                        <span className="font-semibold text-gray-700">{department || "our specialties"}</span>.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {blogs.map((blog, idx) => {
                        const slug = blog.url ? `/${blog.url.replace(/^\/|\/$/g, "")}/` : null;
                        const hasLink = !!slug && slug !== "/#/";
                        const category = (blog.categories || [])[0] || department || "Health";
                        const date = formatDate(blog.timeline || blog.createdAt);
                        const readTime = estimateReadTime(blog);

                        return (
                            <Link
                                key={idx}
                                href={hasLink ? slug : "#"}
                                onClick={(e) => {
                                    if (!hasLink) e.preventDefault();
                                }}
                                className={`flex flex-col rounded-xl bg-white overflow-hidden transition-all duration-300 group ${
                                    hasLink
                                        ? "hover:shadow-md hover:-translate-y-1 cursor-pointer"
                                        : "cursor-default"
                                }`}
                                style={{
                                    border: "0.5px solid rgb(215, 215, 215)",
                                    boxShadow: "rgba(0, 0, 0, 0.05) 0px 4px 12px",
                                }}
                            >
                                {/* Thumbnail */}
                                <div className="overflow-hidden relative h-48 bg-gray-100">
                                    <img
                                        src={blog.blogImage}
                                        alt={blog.blogTitle}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                                    />
                                </div>

                                {/* Body */}
                                <div className="flex flex-col flex-1 p-5 gap-3">
                                    <div className="flex items-center justify-between">
                                        <span
                                            className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                                            style={{
                                                background: "rgb(253, 238, 242)",
                                                color: "rgb(189, 56, 92)",
                                            }}
                                        >
                                            {category}
                                        </span>
                                        <span className="flex items-center gap-1 text-xs text-gray-500">
                                            <Clock className="w-3 h-3" /> {readTime}
                                        </span>
                                    </div>

                                    <h3
                                        className="font-semibold text-gray-900 line-clamp-2 text-base leading-snug group-hover:text-[#b01752] transition-colors"
                                    >
                                        {blog.blogTitle}
                                    </h3>

                                    <div
                                        className="flex items-center justify-between pt-3 mt-auto text-xs text-gray-500 border-t border-gray-100"
                                    >
                                        <span>{date}</span>
                                        <span
                                            className="flex items-center gap-1 font-semibold group-hover:gap-2 transition-all"
                                            style={{ color: "rgb(189, 56, 92)" }}
                                        >
                                            Read More <ArrowRight className="w-3.5 h-3.5" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* View All Button */}
                <div className="text-center mt-10">
                    <Link
                        href="/blog/"
                        className="inline-flex items-center gap-2 font-semibold px-6 py-2.5 rounded-full border-2 transition-all hover:gap-3 cursor-pointer"
                        style={{
                            borderColor: "rgb(189, 56, 92)",
                            color: "rgb(189, 56, 92)",
                            fontSize: 14,
                        }}
                    >
                        View All Articles <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
