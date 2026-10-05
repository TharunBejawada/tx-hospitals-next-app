import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import useIsMobile from "@/hooks/useIsMobile";
import CONFIG from "@/config";
import { FaUser } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import Head from "next/head";
import Breadcrumb from "@/components/Common/Breadcrumb";
import AppointmentForm from "@/components/Common/AppointmentForm";

export default function TagBlogs() {

    const router = useRouter();
    const [currentUrl, setCurrentUrl] = useState("");
    const [category, setCategory] = useState("");
    const [departments, setDepartments] = useState([]);
    const isMobile = useIsMobile();
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [topBlogs, setTopBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setCurrentUrl(window.location.href);
        }
    }, []);

    useEffect(() => {
        window.scrollTo({ left: document.body.scrollWidth, top: 0, behavior: "smooth" });
    }, [category]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedDepartments = localStorage.getItem("departmentsList");
            if (savedDepartments) setDepartments(JSON.parse(savedDepartments));
        }
    }, []);

    useEffect(() => {
        if (!router.isReady) return;
        const { slug } = router.query;
        if (!slug) return;
        const readableCategory = decodeURIComponent(slug).replace(/-/g, " ");
        setCategory(readableCategory);

    }, [router.isReady, router.query.slug]);


    useEffect(() => {
        if (!category) return;
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${CONFIG.API_BASE_URL}/blogs/getBlogsByTag/${category}`);
                const sortedAndFilteredBlogs = response.data
                    ?.filter(blog => (blog.status ? blog.status === "active" : blog.enabled !== false) && blog.status !== "inactive" && blog.enabled !== false)
                    .sort((a, b) => new Date(b.timeline) - new Date(a.timeline));
                setBlogs(sortedAndFilteredBlogs);
                setFilteredBlogs(sortedAndFilteredBlogs);
                setTopBlogs(sortedAndFilteredBlogs.slice(0, 2));
            } catch (err) {
                console.error('Error fetching blogs:', err);
            }
        };

        fetchBlogs();
    }, [category]);

    const handleReadMore = async (blog) => {
        if (!blog || !blog.url || !blog.url.trim() || blog.url === "#") return;
        try {
            router.push(`/${blog.url.replace(/^\/|\/$/g, '')}/`);
        } catch (err) {
            console.error("Error fetching blog details:", err);
        }
    };

    const slugify = (text) =>
        text
            .toLowerCase()
            .replace(/&/g, "&")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim();

    const handleCategoryClick = (categoryName) => {
        const slug = slugify(categoryName);
        localStorage.setItem("departmentsList", JSON.stringify(departments));
        router.push(`/category/${slug}/`);
    };

    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredBlogs(blogs);
            return;
        }

        const lowerSearch = searchTerm.toLowerCase();

        const filtered = blogs.filter(blog =>
            blog.blogTitle.toLowerCase().includes(lowerSearch) ||
            blog.categories?.some(cat => cat.toLowerCase().includes(lowerSearch)) ||
            blog.keywords?.some(keyword => keyword.name.toLowerCase().includes(lowerSearch))
        );

        setFilteredBlogs(filtered);
    }, [searchTerm, blogs]);

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Blogs", href: "/blog" },
        { label: `${category} Blogs` }
    ];

    return (
        <>
            <Head>
                <title>TX Hospitals Health Blog – Awareness, Tips & Medical Updates</title>
                <meta name="description" content="Explore medical insights, health tips, and awareness posts by TX Hospitals in Hyderabad—your go-to health and wellness blog for expert healthcare guidance." />
                <meta name="keywords" content="TX Hospitals health blog" />
            </Head>
            {isMobile ? (
                <></>
            ) : (
                <div className="mt-7 px-4 font-inter">
                    <h1 className="text-4xl text-left font-bold pl-5 text-pink-700">
                        {category} Blogs
                    </h1>
                    <div className="pl-7 mt-4 -mb-4">
                        <Breadcrumb items={breadcrumbItems} />
                    </div>
                    <div className="flex gap-2 p-3">
                        <div className="flex-1 w-[65%]">
                            <div className="p-4 mx-w-full relative">
                                {filteredBlogs?.map((blog, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.2 }}
                                        className="mb-4"
                                    >
                                        <div className="mx-auto bg-white shadow-md overflow-hidden flex flex-col w-full h-full">
                                            <motion.img
                                                src={blog.blogImage}
                                                alt={blog.blogTitle}
                                                className="w-full h-full object-cover"
                                                transition={{ duration: 0.3 }}
                                            />
                                            {blog?.categories && blog.categories.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mt-10 pl-2">
                                                    {blog.categories.map((category, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => handleCategoryClick(category)}
                                                            className="border text-base border-pink-600 text-pink-600 rounded px-3 py-1 hover:bg-pink-50 transition-colors"
                                                        >
                                                            {category}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                            <div className="p-2 pl-2 flex-1 mb-2 flex flex-col">
                                                <h3 className="text-2xl font-semibold text-pink-700 line-clamp-2">
                                                    {blog.blogTitle}
                                                </h3>
                                                <div className="flex items-center gap-4 text-gray-600 text-sm mt-2">
                                                    <div className="flex items-center gap-1">
                                                        <FaUser />
                                                        <span>{blog.author}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <FaRegCalendarAlt />
                                                        <span>{new Date(blog.timeline).toLocaleDateString("en-US", {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}</span>
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 mt-2 text-base leading-relaxed line-clamp-3">
                                                    {DOMPurify.sanitize(
                                                        blog.extraFields?.find(field => field.heading === "Introduction")
                                                            ?.description.replace(/(<([^>]+)>)/gi, "")
                                                    )}
                                                </p>
                                                <button
                                                    disabled={!blog.url || !blog.url.trim() || blog.url === "#"}
                                                    className={`mt-4 mr-auto py-2 px-6 bg-pink-600 text-white font-semibold transition-all ${!blog.url || !blog.url.trim() || blog.url === "#"
                                                            ? "opacity-50 cursor-not-allowed"
                                                            : "hover:bg-pink-700 cursor-pointer"
                                                        }`}
                                                    onClick={(e) => {
                                                        if (!blog.url || !blog.url.trim() || blog.url === "#") {
                                                            e.stopPropagation();
                                                            return;
                                                        }
                                                        handleReadMore(blog);
                                                    }}
                                                >
                                                    Read More
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4 w-[30%]">
                            <input
                                type="text"
                                placeholder="Search blog title, category, or keyword..."
                                className="w-full p-2 border border-gray-400 rounded mb-2"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <h2 className="text-2xl mt-4 font-bold mb-4 border-b-4 border-pink-600 inline-block pb-1">
                                Share this
                            </h2>
                            <div className="flex space-x-6 mb-6 flex-wrap">
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img loading="lazy" src="/assets/Blogs/TXHospitalsFacebook.webp" alt="Facebook" className="w-10 h-10 cursor-pointer" />
                                </a>
                                <a
                                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=Check this out!`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img loading="lazy" src="/assets/Blogs/txhospitalstwitter-68879ef165ce9.webp" alt="Twitter" className="w-10 h-10 cursor-pointer" />
                                </a>
                                <a
                                    href="https://www.instagram.com/txhospitals/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img loading="lazy" src="/assets/Blogs/TXHospitalsInstagram.webp" alt="Instagram" className="w-10 h-10 cursor-pointer" />
                                </a>
                                <a
                                    href="https://www.youtube.com/channel/UCuHZd4Yi3wTHciJoMz7mq2A"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img loading="lazy" src="/assets/Blogs/TXHospitalsYoutub.webp" alt="YouTube" className="w-10 h-10 cursor-pointer" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/tx-hospitals/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img loading="lazy" src="/assets/Blogs/TXHospitalsLinkidin.webp" alt="LinkedIn" className="w-10 h-10 cursor-pointer" />
                                </a>
                                <a
                                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img loading="lazy" src="/assets/Blogs/TXHospitalsWhatsup.webp" alt="WhatsApp" className="w-10 h-10 cursor-pointer" />
                                </a>
                            </div>
                            <h2 className="text-2xl font-bold border-b-4 border-pink-600 inline-block pb-1">
                                Book Appointment
                            </h2>
                            <AppointmentForm />
                            <h2 className="text-2xl mt-2 font-bold border-b-4 border-pink-600 inline-block pb-1 mb-2">
                                Recent Posts
                            </h2>
                            <ul className="list-disc list-outside text-sm pl-4 text-gray-800 mb-2">
                                {topBlogs.map((blog, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleReadMore(blog)}
                                        className="cursor-pointer hover:text-pink-600 transition-colors"
                                    >
                                        {blog.blogTitle}
                                    </li>
                                ))}
                            </ul>
                            <h2 className="text-2xl mt-4 font-bold mb-4 border-b-4 border-pink-600 inline-block pb-1">
                                Categories
                            </h2>
                            <ul className="divide-y divide-gray-200">
                                {departments.map((dept, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleCategoryClick(dept)}
                                        className="py-2 hover:text-pink-600 cursor-pointer transition-colors"
                                    >
                                        {dept}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}