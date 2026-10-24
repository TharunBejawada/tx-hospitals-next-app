import Head from "next/head";

// Utility to safely strip HTML tags and decode common HTML entities into clean plain text
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

const FAQSchema = ({ faqs = [] }) => {
    if (!faqs || !Array.isArray(faqs) || faqs.length === 0) return null;

    const mainEntity = faqs
        .map((faq) => {
            if (!faq || typeof faq !== "object") return null;

            const question = cleanText(faq.question || faq.q || faq.title || "");
            const answer = cleanText(faq.answer || faq.description || faq.a || "");

            if (!question || !answer) return null;

            return {
                "@type": "Question",
                "name": question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": answer,
                },
            };
        })
        .filter(Boolean);

    if (mainEntity.length === 0) return null;

    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": mainEntity,
    };

    return (
        <Head>
            <script
                key="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
        </Head>
    );
};

export default FAQSchema;
