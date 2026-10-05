"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import CONFIG from "@/config";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 }
};

export default function HealthLibrary() {
    const router = useRouter();
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(`${CONFIG.API_BASE_URL}/blogs/getAllBlogs`);
                const data = await response.json();
                const sortedAndFilteredBlogs = data?.Items
                    ?.filter(blog => (blog.status ? blog.status === "active" : blog.enabled !== false) && blog.status !== "inactive" && blog.enabled !== false)
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setBlogs(sortedAndFilteredBlogs?.slice(0, 6));
            } catch (err) {
                console.error("Error fetching blogs:", err);
            }
        };
        fetchBlogs();
    }, []);

    const handleReadMore = async (blog) => {
        if (!blog || !blog.url || !blog.url.trim() || blog.url === "#") return;
        try {
            router.push(`/${blog.url.replace(/^\/|\/$/g, '')}/`);
        } catch (err) {
            console.error("Error fetching blog details:", err);
        }
    };

    return (
        <section className="bg-pink-50/50 py-8 px-4 md:py-10 md:px-6 xl:py-12 xl:px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto text-center">
                {/* Heading Block */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-[10px] font-bold uppercase tracking-widest mb-3 border border-pink-200">
                        Expert Articles
                    </span>
                    <h2 className="font-extrabold text-gray-900 mb-4 text-4xl md:text-5xl">
                        Health <span className="text-pink-700 relative">Library
                            <span className="absolute -bottom-1 left-0 w-full h-1 bg-pink-200/50 rounded-full"></span>
                        </span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-600 font-medium leading-relaxed text-sm px-2 md:text-lg md:px-0">
                        A reliable resource of easy-to-read articles on diseases, symptoms and treatments for informed health decisions.
                    </p>
                </motion.div>

                {/* Blog Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "200px" }}
                    className="grid gap-3 grid-cols-2 md:grid-cols-3 md:gap-6"
                >
                    {blogs.map((blog, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white border border-pink-100"
                        >
                            <div className={`relative aspect-video w-full overflow-hidden ${!blog.url || !blog.url.trim() || blog.url === "#" ? "cursor-default" : "cursor-pointer"}`}>
                                <Image
                                    src={blog.blogImage}
                                    alt={blog.blogTitle || "Health Article"}
                                    fill
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
                                    priority={idx < 3}
                                    quality={80}
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    onClick={() => handleReadMore(blog)}
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Show More Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-14"
                >
                    <button
                        onClick={() => router.push("/blog")}
                        className="inline-flex items-center gap-2 text-pink-700 font-bold px-8 py-3 rounded-full border-2 border-pink-600 hover:bg-pink-600 hover:text-white transition-all duration-300 shadow-sm active:scale-95"
                    >
                        Explore More Articles
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
