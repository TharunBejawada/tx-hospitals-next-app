import React from "react";
import Head from "next/head";

// Clean plain text helper
const cleanText = (val) => {
    if (!val || typeof val !== "string") return "";
    return val
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/gi, " ")
        .replace(/&amp;/gi, "&")
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .replace(/&apos;/gi, "'")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">")
        .replace(/\s+/g, " ")
        .trim();
};

// Safe ISO date formatter
const toISODate = (val) => {
    if (!val) return null;
    try {
        const d = new Date(val);
        if (!isNaN(d.getTime())) {
            return d.toISOString();
        }
    } catch {
        // ignore
    }
    return null;
};

/**
 * Builds Schema.org BlogPosting / Article schema for an individual blog article.
 */
export function buildBlogArticleSchema(blogData, currentUrl = "") {
    if (!blogData || typeof blogData !== "object") return null;

    const rawUrl = blogData.url || currentUrl || "";
    const canonicalPath = rawUrl.startsWith("http")
        ? rawUrl
        : `https://txhospitals.in${rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`}`;

    const title = cleanText(blogData.blogTitle || blogData.seoTitle || "TX Hospitals Health Blog");
    const description = cleanText(blogData.metaDescription || blogData.metaKeywords || title);

    const imageUrl = blogData.blogImage || "https://txhospitals.in/TXlogoWB.jpg";

    const datePublished = toISODate(blogData.createdAt || blogData.date) || new Date().toISOString();
    const dateModified = toISODate(blogData.modifiedAt || blogData.updatedAt || blogData.createdAt) || datePublished;

    const authorName = (blogData.author && typeof blogData.author === "string")
        ? blogData.author.trim()
        : "TX Hospitals Medical Team";

    const isAuthorPerson = authorName.toLowerCase().startsWith("dr") ||
        (authorName.length > 0 && !authorName.toLowerCase().includes("txhospital"));

    const authorEntity = isAuthorPerson
        ? {
            "@type": "Person",
            "name": authorName,
            "url": "https://txhospitals.in/find-doctor/",
        }
        : {
            "@type": "Organization",
            "@id": "https://txhospitals.in/#organization",
            "name": "TX Hospitals",
            "url": "https://txhospitals.in/",
        };

    // Extract categories
    let categories = [];
    if (Array.isArray(blogData.categories)) {
        categories = blogData.categories.filter(Boolean);
    }

    // Extract tags
    let tagsList = [];
    if (Array.isArray(blogData.tags)) {
        tagsList = blogData.tags
            .map((t) => (typeof t === "string" ? t : t?.name || ""))
            .filter(Boolean);
    }

    return {
        "@context": "https://schema.org",
        "@type": ["BlogPosting", "Article"],
        "@id": `${canonicalPath}#article`,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalPath,
        },
        "headline": title,
        "name": title,
        "description": description,
        "image": [imageUrl],
        "datePublished": datePublished,
        "dateModified": dateModified,
        "author": authorEntity,
        "publisher": {
            "@type": "Organization",
            "@id": "https://txhospitals.in/#organization",
            "name": "TX Hospitals",
            "url": "https://txhospitals.in/",
            "logo": {
                "@type": "ImageObject",
                "url": "https://txhospitals.in/TXlogoWB.jpg",
            },
        },
        ...(categories.length > 0 ? { "articleSection": categories.join(", ") } : {}),
        ...(tagsList.length > 0 ? { "keywords": tagsList.join(", ") } : {}),
        "inLanguage": "en-IN",
        "isAccessibleForFree": "True",
    };
}

/**
 * Builds Schema.org Blog schema for the main blog listing / category pages.
 */
export function buildBlogListingSchema({
    title = "TX Hospitals Health Blog – Awareness, Tips & Medical Updates",
    description = "Explore medical insights, health tips, and awareness posts by TX Hospitals in Hyderabad—your go-to health and wellness blog for expert healthcare guidance.",
    url = "https://txhospitals.in/blog/",
}) {
    const canonicalUrl = url.startsWith("http")
        ? url
        : `https://txhospitals.in${url.startsWith("/") ? url : `/${url}`}`;

    return {
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": `${canonicalUrl}#blog`,
        "name": title,
        "description": description,
        "url": canonicalUrl,
        "publisher": {
            "@type": "Organization",
            "@id": "https://txhospitals.in/#organization",
            "name": "TX Hospitals",
            "url": "https://txhospitals.in/",
            "logo": {
                "@type": "ImageObject",
                "url": "https://txhospitals.in/TXlogoWB.jpg",
            },
        },
        "inLanguage": "en-IN",
    };
}

/**
 * React Component for injecting Blog Article Schema into <Head>
 */
export default function BlogSchema({ blogData, currentUrl = "" }) {
    const schema = buildBlogArticleSchema(blogData, currentUrl);
    if (!schema) return null;

    return (
        <Head>
            <script
                key="blog-article-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
        </Head>
    );
}

/**
 * React Component for injecting Blog Listing / Collection Schema into <Head>
 */
export function BlogListingSchema({ title, description, url }) {
    const schema = buildBlogListingSchema({ title, description, url });

    return (
        <Head>
            <script
                key="blog-listing-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
        </Head>
    );
}
