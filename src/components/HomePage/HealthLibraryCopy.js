// components/HealthLibrary.js
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function HealthLibrary() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch("https://api.txhospitals.vgworld.in/blogs/getAllBlogs");
                const data = await res.json();
                const activeBlogs = (data.Items || []).filter(blog => (blog.status ? blog.status === "active" : blog.enabled !== false) && blog.status !== "inactive" && blog.enabled !== false);
                setBlogs(activeBlogs);
            } catch (err) {
                console.error("Error fetching blogs:", err);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <section className="py-6">
            <div className="w-full">
                {/* Heading */}
                <h2 className="text-center text-2xl md:text-3xl font-bold text-pink-700 mb-8">
                    Health Library
                </h2>

                {/* Blog Images + Show More */}
                <div className="relative flex items-center">
                    {/* Scrolling container */}
                    <div className="overflow-hidden w-full">
                        <div className="scroll-container-ltr flex gap-6">
                            {blogs.concat(blogs).map((blog, idx) => (
                                <Link
                                    key={idx}
                                    href={blog.url && blog.url.trim() && blog.url !== "#" ? (blog.url.startsWith('/') ? blog.url : `/${blog.url}`) : "#"}
                                    onClick={(e) => {
                                        if (!blog.url || !blog.url.trim() || blog.url === "#") {
                                            e.preventDefault();
                                        }
                                    }}
                                    target={blog.url && blog.url.trim() && blog.url !== "#" ? "_blank" : "_self"}
                                    rel="noopener noreferrer"
                                    className={`flex-shrink-0 w-72 rounded-xl overflow-hidden shadow-md transition-transform duration-300 ${!blog.url || !blog.url.trim() || blog.url === "#" ? "cursor-default" : "hover:shadow-lg hover:scale-105 cursor-pointer"
                                        }`}
                                >
                                    <div className="relative aspect-video w-full">
                                        <Image
                                            src={blog.blogImage}
                                            alt={blog.blogTitle || "Health Article"}
                                            width={400}
                                            height={250}
                                            sizes="300px"
                                            loading={idx < 4 ? "eager" : "lazy"}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Animation keyframes */}
            <style jsx>{`
        @keyframes scrollLtr {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .scroll-container-ltr {
          display: flex;
          width: max-content;
          animation: scrollLtr 1000s linear infinite;
          animation-play-state: running;
        }
        .scroll-container-ltr:hover {
          animation-play-state: paused;
        }
      `}</style>
        </section>
    );
}
