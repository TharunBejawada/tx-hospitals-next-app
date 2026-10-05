import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const KachigudaNewBlogs = () => {
    const blogs = [
        {
            title: "World Ankylosing Spondylitis Day 2026: Don’t Ignore Chronic Back Pain",
            description: "World Ankylosing Spondylitis Day 2026 raises awareness about chronic back pain, early diagnosis, spine health, and timely rheumatology care at TX Hospitals.",
            date: "May 21, 2026",
            category: "Health Care",
            readTime: "5 min read",
            image: "https://tx-hospital-blog-images.s3.ap-south-2.amazonaws.com/blogs/1779357112861-Ankylosing%20Spondylitis.webp",
            slug: "/world-ankylosing-spondylitis-day-2026/"
        },
        {
            title: "Food Safety in Summer: Tips to Avoid Food Poisoning",
            description: "Learn essential summer food safety tips to prevent food poisoning, protect your digestion, and stay healthy with expert guidance from TX Hospitals.",
            date: "May 21, 2026",
            category: "Health Care",
            readTime: "5 min read",
            image: "https://tx-hospital-blog-images.s3.ap-south-2.amazonaws.com/blogs/1779343583705-Food%20Safety%20in%20%20Summer.webp",
            slug: "/food-safety-in-summer-tips-to-avoid-food-poisoning/"
        },
        {
            title: "Recovery After Angioplasty: Do’s and Don’ts to Maintain a Healthy Heart",
            description: "Learn essential do’s and don’ts after angioplasty to support safe recovery, prevent complications, and maintain better heart health with expert cardiac care.",
            date: "May 19, 2026",
            category: "Cardiology",
            readTime: "5 min read",
            image: "https://tx-hospital-blog-images.s3.ap-south-2.amazonaws.com/blogs/1779194119230-Angioplasty%20.webp",
            slug: "/recovery-after-angioplasty-dos-and-donts/"
        }
    ];

    return (
        <section id="blogs" className="py-16" style={{ background: 'rgb(243, 243, 245)' }}>
            <div className="max-w-[1170px] mx-auto px-6">
                <div className="text-center mb-10">
                    <h2 className="mb-3" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 600, color: 'rgb(3, 2, 19)' }}>
                        <span style={{ color: 'rgb(189, 56, 92)' }}>Blogs</span>
                    </h2>
                    <p className="max-w-[760px] mx-auto" style={{ fontSize: '15px', fontWeight: 400, color: 'rgb(30, 30, 30)', lineHeight: 1.7 }}>
                        Read simple and useful health articles from our experts to understand symptoms, treatment options, prevention tips and when to consult a doctor.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {blogs.map((blog, idx) => (
                        <Link
                            href={blog.slug && blog.slug.trim() && blog.slug !== "#" ? blog.slug : "#"}
                            key={idx}
                            onClick={(e) => {
                                if (!blog.slug || !blog.slug.trim() || blog.slug === "#") {
                                    e.preventDefault();
                                }
                            }}
                            className={`flex flex-col rounded-xl bg-white overflow-hidden transition-all duration-300 group ${!blog.slug || !blog.slug.trim() || blog.slug === "#" ? "cursor-default" : "hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                                }`}
                            style={{ border: '0.5px solid rgb(215, 215, 215)', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 4px 12px' }}
                        >
                            <div className="overflow-hidden" style={{ height: '200px' }}>
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    loading="eager"
                                    decoding="async"
                                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                                />
                            </div>
                            <div className="flex flex-col flex-1 p-5 gap-3">
                                <div className="flex items-center justify-between">
                                    <span className="px-2.5 py-0.5 rounded-full" style={{ background: 'rgb(240, 223, 229)', fontSize: '11px', fontWeight: 500, color: 'rgb(189, 56, 92)' }}>
                                        {blog.category}
                                    </span>
                                    <span style={{ fontSize: '11px', color: 'rgb(108, 108, 108)' }}>
                                        {blog.readTime}
                                    </span>
                                </div>
                                <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'rgb(3, 2, 19)', lineHeight: 1.5, margin: '0px' }}>
                                    {blog.title}
                                </h3>
                                <p className="flex-1" style={{ fontSize: '13px', fontWeight: 400, color: 'rgb(108, 108, 108)', lineHeight: 1.65, margin: '0px' }}>
                                    {blog.description}
                                </p>
                                <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgb(240, 223, 229)' }}>
                                    <span style={{ fontSize: '12px', color: 'rgb(108, 108, 108)' }}>
                                        {blog.date}
                                    </span>
                                    <span className="flex items-center gap-1 group-hover:gap-2 transition-all" style={{ fontSize: '12px', fontWeight: 500, color: 'rgb(189, 56, 92)' }}>
                                        Read More <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default KachigudaNewBlogs;
