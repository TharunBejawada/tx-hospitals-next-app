/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import useIsMobile from "@/hooks/useIsMobile";
import { FaChevronDown, FaChevronUp, FaTags } from "react-icons/fa";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import ActionButtons from "@/components/Common/ActionButtons";
import AppointmentForm from "@/components/Common/AppointmentForm";
import BookAppointmentForm from "@/components/Blogs/BookAppointemntForm";
import FAQSchema from "@/utils/FAQSchema";

export default function BlogDetails({ blogData, departments }) {

    const router = useRouter();
    const isMobile = useIsMobile();
    const [currentUrl, setCurrentUrl] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [open, setOpen] = useState(false);
    const [faqOpenIndex, setFaqOpenIndex] = useState(-1);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setCurrentUrl(window.location.href);
        }
    }, []);

    useEffect(() => {
        window.scrollTo({ left: document.body.scrollWidth, top: 0, behavior: "smooth" });
    }, []);



    function fixOrderedListNumbering(html) {
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, "text/html");

        let lists = doc.querySelectorAll("ol");
        let currentNumber = 1;

        lists.forEach((ol) => {
            if (currentNumber > 1) {
                ol.setAttribute("start", currentNumber);
            }
            let count = ol.querySelectorAll("li").length;
            currentNumber += count;
        });

        return doc.body.innerHTML;
    }

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

    const tagSlugify = (text) =>
        text
            .replace(/&/g, "&")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim();

    const handleTagClick = (tagName) => {
        const slug = tagSlugify(tagName);
        localStorage.setItem("departmentsList", JSON.stringify(departments));
        router.push(`/tag/${slug}/`);
    };

    return (
        <>
            <Head>
                <title>{blogData?.seoTitle}</title>
                <meta name="description" content={blogData?.metaKeywords} />
                <meta name="keywords" content={blogData?.metaDescription} />
            </Head>
            {isMobile ? (
                <div className="-mt-8 px-2 font-inter">
                    <h1 className="text-xl text-pink-700 font-bold mt-4">{blogData?.blogTitle}</h1>
                    <div className="flex flex-col gap-2 p-1">
                        <div>
                            <h2 className="text-lg mt-1 font-bold mb-2 border-b-2 border-pink-600 inline-block">
                                Share this
                            </h2>
                            <div className="flex space-x-3 mb-2 flex-wrap">
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img loading="lazy" src="/assets/Blogs/TXHospitalsFacebook.webp" alt="Facebook" className="w-8 h-8 cursor-pointer" />
                                </a>
                                <a
                                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=Check this out!`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img loading="lazy" src="/assets/Blogs/txhospitalstwitter-68879ef165ce9.webp" alt="Twitter" className="w-8 h-8 cursor-pointer" />
                                </a>
                                <a
                                    href="https://www.instagram.com/txhospitals/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img loading="lazy" src="/assets/Blogs/TXHospitalsInstagram.webp" alt="Instagram" className="w-8 h-8 cursor-pointer" />
                                </a>
                                <a
                                    href="https://www.youtube.com/channel/UCuHZd4Yi3wTHciJoMz7mq2A"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img loading="lazy" src="/assets/Blogs/TXHospitalsYoutub.webp" alt="YouTube" className="w-8 h-8 cursor-pointer" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/tx-hospitals/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img loading="lazy" src="/assets/Blogs/TXHospitalsLinkidin.webp" alt="LinkedIn" className="w-8 h-8 cursor-pointer" />
                                </a>
                                <a
                                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img loading="lazy" src="/assets/Blogs/TXHospitalsWhatsup.webp" alt="WhatsApp" className="w-8 h-8 cursor-pointer" />
                                </a>
                            </div>
                        </div>
                        {/* <ActionButtons onBookNow={() => setShowModal(true)} />
                        {showModal && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                <div className="w-full max-w-lg relative p-6">
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="absolute top-2 right-2 text-white hover:text-pink-700 text-2xl font-bold"
                                    >
                                        &times;
                                    </button>
                                    <AppointmentForm />
                                </div>
                            </div>
                        )} */}
                        <div
                            onClick={() => setOpen(!open)}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <h2 className="text-lg font-bold text-black border-b-2 border-pink-600">Categories</h2>
                            {open ? (
                                <FaChevronUp className="text-pink-600 text-sm" />
                            ) : (
                                <FaChevronDown className="text-pink-600 text-sm" />
                            )}
                        </div>
                        {open && (
                            <ul className="mt-2 divide-y divide-gray-200 bg-white rounded-md shadow-sm">
                                {departments.map((dept, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleCategoryClick(dept)}
                                        className="py-2 px-2 hover:text-pink-600 text-xs cursor-pointer transition-colors"
                                    >
                                        {dept}
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className="relative w-full">
                            <div className="relative">
                                <motion.img
                                    src={blogData?.blogImage}
                                    alt={blogData?.blogTitle}
                                    className="w-full h-full object-cover rounded-md shadow-lg"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>

                            {blogData?.extraFields?.map((field, index) => {
                                const getHeadingTag = () => {
                                    if (index === 0 || index === 1) return 'h2';
                                    return 'h3';
                                };

                                const HeadingTag = getHeadingTag();
                                return (
                                    <div key={index}>
                                        <HeadingTag className={`${index <= 1 ? 'text-xl' : 'text-lg'} font-bold text-pink-700 mb-1`}>{field.heading}</HeadingTag>
                                        {(() => {
                                            let html = field.description;

                                            html = html
                                                .replace(/<ul>/g, '<ul class="list-disc ml-6">')
                                                .replace(/<ol>/g, '<ol class="list-decimal ml-6">');

                                            html = fixOrderedListNumbering(html);

                                            const sanitized = DOMPurify.sanitize(html);

                                            return (
                                                <div
                                                    className="text-gray-700 text-sm leading-relaxed"
                                                    dangerouslySetInnerHTML={{ __html: sanitized }}
                                                ></div>
                                            );
                                        })()}
                                        {index === 1 && (
                                            <ActionButtons onBookNow={() => setShowModal(true)} />
                                        )}
                                    </div>
                                )
                            })}
                            {blogData?.faqs && Array.isArray(blogData.faqs) && blogData.faqs.length > 0 && (
                                <>
                                    <FAQSchema faqs={blogData.faqs} />
                                    <div className="mt-6 mb-4">
                                        <h2 className="text-lg font-bold text-pink-700 mb-3">Frequently Asked Questions</h2>
                                        <div className="space-y-3">
                                            {blogData.faqs.map((faq, index) => {
                                                const isOpen = faqOpenIndex === index;
                                                const answerText = faq.answer || faq.description || "";
                                                const sanitizedAnswer = DOMPurify.sanitize(answerText);
                                                return (
                                                    <div
                                                        key={index}
                                                        className={`border-2 rounded-lg overflow-hidden transition-all ${isOpen ? "border-pink-600" : "border-pink-300"
                                                            }`}
                                                    >
                                                        <button
                                                            className={`w-full p-3 flex justify-between items-center text-left font-medium text-sm ${isOpen ? "text-white bg-pink-600" : "text-pink-600 bg-white"
                                                                }`}
                                                            onClick={() => setFaqOpenIndex(isOpen ? -1 : index)}
                                                        >
                                                            <span>{faq.question}</span>
                                                            {isOpen ? (
                                                                <FaChevronUp className="text-white flex-shrink-0 ml-2" />
                                                            ) : (
                                                                <FaChevronDown className="text-pink-600 flex-shrink-0 ml-2" />
                                                            )}
                                                        </button>
                                                        {isOpen && (
                                                            <div className="p-3 text-black text-sm bg-white border-t border-pink-200">
                                                                <div dangerouslySetInnerHTML={{ __html: sanitizedAnswer }} />
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    {blogData?.tags && blogData.tags.length > 0 && (
                        <div className="flex flex-wrap w-full gap-2 mt-2 mb-2">
                            <FaTags className="text-pink-700 w-5 h-5 mt-1" />
                            <p className="text-gray-600 text-sm">
                                {blogData.tags.map((tag, index) => (
                                    <span key={index}>
                                        <button
                                            onClick={() => handleTagClick(tag.name)}
                                            className="hover:text-pink-700 transition-colors"
                                        >
                                            {tag.name}
                                        </button>
                                        {index < blogData.tags.length - 1 && ', '}
                                    </span>
                                ))}
                            </p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="mt-7 px-4 font-inter">
                    <h1 className="text-4xl text-pink-700 font-bold pl-6 mt-4">{blogData?.blogTitle}</h1>
                    <div className="flex gap-4 p-3">
                        <div className="flex-1 w-[65%]">
                            <div className="relative w-full min-h-full">
                                <div className="p-4 relative">
                                    <motion.img
                                        src={blogData?.blogImage}
                                        alt={blogData?.blogTitle}
                                        className="w-full h-full object-cover rounded-md shadow-lg"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>
                                <div className="pl-4">

                                    {blogData?.extraFields?.map((field, index) => {
                                        const getHeadingTag = () => {
                                            if (index === 0 || index === 1) return 'h2';
                                            return 'h3';
                                        };

                                        const HeadingTag = getHeadingTag();
                                        return (
                                            <div key={index}>
                                                <HeadingTag className={`${index <= 1 ? 'text-2xl' : 'text-xl'} font-bold text-pink-700 mb-2`}>{field.heading}</HeadingTag>
                                                {(() => {
                                                    let html = field.description;

                                                    html = html
                                                        .replace(/<ul>/g, '<ul class="list-disc ml-6">')
                                                        .replace(/<ol>/g, '<ol class="list-decimal ml-6">');

                                                    html = fixOrderedListNumbering(html);

                                                    const sanitized = DOMPurify.sanitize(html);

                                                    return (
                                                        <div
                                                            className="text-gray-700 pl-6 leading-relaxed"
                                                            dangerouslySetInnerHTML={{ __html: sanitized }}
                                                        ></div>
                                                    );
                                                })()}
                                                {/* Show appointment CTA after every 2 fields */}
                                                {index === 1 && (
                                                    <div className="flex justify-center">
                                                        <ActionButtons onBookNow={() => setShowModal(true)} />
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                    {blogData?.faqs && Array.isArray(blogData.faqs) && blogData.faqs.length > 0 && (
                                        <>
                                            <FAQSchema faqs={blogData.faqs} />
                                            <div className="mt-8 mb-6">
                                                <h2 className="text-2xl font-bold text-pink-700 mb-4">Frequently Asked Questions</h2>
                                                <div className="space-y-4">
                                                    {blogData.faqs.map((faq, index) => {
                                                        const isOpen = faqOpenIndex === index;
                                                        const answerText = faq.answer || faq.description || "";
                                                        const sanitizedAnswer = DOMPurify.sanitize(answerText);
                                                        return (
                                                            <div
                                                                key={index}
                                                                className={`border-2 rounded-lg overflow-hidden transition-all ${isOpen ? "border-pink-600" : "border-pink-300"
                                                                    }`}
                                                            >
                                                                <button
                                                                    className={`w-full p-4 flex justify-between items-center text-left font-medium text-base ${isOpen ? "text-white bg-pink-600" : "text-pink-600 bg-white"
                                                                        }`}
                                                                    onClick={() => setFaqOpenIndex(isOpen ? -1 : index)}
                                                                >
                                                                    <span>{faq.question}</span>
                                                                    {isOpen ? (
                                                                        <FaChevronUp className="text-white flex-shrink-0 ml-2" />
                                                                    ) : (
                                                                        <FaChevronDown className="text-pink-600 flex-shrink-0 ml-2" />
                                                                    )}
                                                                </button>
                                                                {isOpen && (
                                                                    <div className="p-4 text-black text-base bg-white border-t border-pink-200">
                                                                        <div dangerouslySetInnerHTML={{ __html: sanitizedAnswer }} />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="w-[30%]">
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
                    {blogData?.tags && blogData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4 mb-4 pl-8">
                            <FaTags className="text-pink-700 w-5 h-5 mt-1" />
                            <p className="text-gray-600">
                                {blogData.tags.map((tag, index) => (
                                    <span key={index}>
                                        <button
                                            onClick={() => handleTagClick(tag.name)}
                                            className="hover:text-pink-700 transition-colors"
                                        >
                                            {tag.name}
                                        </button>
                                        {index < blogData.tags.length - 1 && ', '}
                                    </span>
                                ))}
                            </p>
                        </div>
                    )}
                </div>
            )}
            <BookAppointmentForm showModal={showModal} setShowModal={setShowModal} />
        </>
    );
}