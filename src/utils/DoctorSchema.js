import React from "react";
import Head from "next/head";
import { getBranchData } from "./branchLocationData";

// Utility to clean HTML to plain text
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

/**
 * Extracts list items (li) from HTML string
 */
const extractListItems = (html) => {
    if (!html || typeof html !== "string") return [];
    const matches = html.match(/<li[^>]*>(.*?)<\/li>/gi);
    if (!matches) return [];
    return matches.map((m) => cleanText(m)).filter(Boolean);
};

/**
 * Builds Schema.org Physician, MedicalOrganization, and Person schema graph for a doctor profile page.
 */
export function buildDoctorSchema(doctorData) {
    if (!doctorData || typeof doctorData !== "object") return null;

    const rawUrl = doctorData.url || "";
    const canonicalUrl = rawUrl.startsWith("http")
        ? rawUrl
        : `https://txhospitals.in${rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`}`;

    const name = cleanText(doctorData.name || "Doctor");
    const designation = cleanText(doctorData.designation || "Medical Specialist");
    const department = cleanText(doctorData.department || doctorData.category || "Multi-Specialty");

    // Extract biography / description
    let bio = cleanText(doctorData.metaDescription || "");
    if (!bio && Array.isArray(doctorData.extraFields)) {
        const aboutField = doctorData.extraFields.find((f) =>
            f.heading && f.heading.toLowerCase().includes("about")
        );
        if (aboutField?.description) {
            bio = cleanText(aboutField.description).slice(0, 300);
        }
    }
    if (!bio) {
        bio = `${name} is an experienced ${department} specialist consulting at TX Hospitals, Hyderabad.`;
    }

    // Resolve branch data
    const locationStr = doctorData.location || "Banjara Hills";
    const branch = getBranchData(locationStr);
    const branchSlug = branch.displayName ? branch.displayName.toLowerCase().replace(/\s+/g, "-") : "banjara-hills";

    // Extract qualifications / education
    const alumniList = [];
    if (doctorData.qualification) {
        alumniList.push({
            "@type": "EducationalOrganization",
            "name": cleanText(doctorData.qualification),
        });
    }

    // Extract procedures / available services from extraFields if present
    const availableServices = [];
    if (Array.isArray(doctorData.extraFields)) {
        const treatmentsField = doctorData.extraFields.find((f) =>
            f.heading && (f.heading.toLowerCase().includes("treatment") || f.heading.toLowerCase().includes("expertise"))
        );
        if (treatmentsField?.description) {
            const items = extractListItems(treatmentsField.description);
            items.slice(0, 8).forEach((item) => {
                availableServices.push({
                    "@type": "MedicalProcedure",
                    "name": item,
                });
            });
        }
    }
    if (availableServices.length === 0 && department) {
        availableServices.push({
            "@type": "MedicalProcedure",
            "name": `${department} Consultation & Treatments`,
        });
    }

    const imageUrl = doctorData.image || "https://txhospitals.in/TXlogoWB.jpg";

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Physician",
                "@id": `${canonicalUrl}#physician`,
                "name": name,
                "url": canonicalUrl,
                "image": imageUrl,
                "description": bio,
                "telephone": branch.phone || "+91 9144514459",
                "email": "info@txhospitals.in",
                "priceRange": "₹₹",
                "currenciesAccepted": "INR",
                "paymentAccepted": "Cash, Credit Card, Debit Card, Insurance",
                "isAcceptingNewPatients": "True",
                "medicalSpecialty": department,
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": branch.address,
                    "addressLocality": `${branch.displayName}, Hyderabad`,
                    "addressRegion": "Telangana",
                    "postalCode": branch.postalCode || "500028",
                    "addressCountry": "IN",
                },
                ...(branch.coords ? {
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": branch.coords[0],
                        "longitude": branch.coords[1],
                    }
                } : {}),
                "openingHoursSpecification": [
                    {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        "opens": "09:00",
                        "closes": "18:00",
                    },
                ],
                "hospitalAffiliation": {
                    "@type": "Hospital",
                    "@id": `https://txhospitals.in/${branchSlug}/#hospital`,
                    "name": `TX Hospitals, ${branch.displayName}`,
                    "url": `https://txhospitals.in/${branchSlug}/`,
                },
                "parentOrganization": {
                    "@type": "MedicalOrganization",
                    "@id": "https://txhospitals.in/#organization",
                    "name": "TX Hospitals",
                    "url": "https://txhospitals.in/",
                    "logo": "https://txhospitals.in/TXlogoWB.jpg",
                },
                ...(availableServices.length > 0 ? { "availableService": availableServices } : {}),
                "hasMap": `https://maps.google.com/?q=${encodeURIComponent(branch.mapName || "TX Hospitals")}`,
            },
            {
                "@type": "Person",
                "@id": `${canonicalUrl}#person`,
                "name": name,
                "jobTitle": designation,
                "image": imageUrl,
                "description": bio,
                "url": canonicalUrl,
                "worksFor": {
                    "@type": "MedicalOrganization",
                    "@id": "https://txhospitals.in/#organization",
                    "name": "TX Hospitals",
                    "url": "https://txhospitals.in/",
                },
                ...(alumniList.length > 0 ? { "alumniOf": alumniList } : {}),
                "knowsAbout": [department, "Healthcare", "Surgery", "Patient Consultations"],
            },
        ],
    };
}

/**
 * React Component for injecting Physician / MedicalOrganization Schema into <Head>
 */
export default function DoctorSchema({ doctorData }) {
    const schema = buildDoctorSchema(doctorData);
    if (!schema) return null;

    return (
        <Head>
            <script
                key="doctor-physician-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
        </Head>
    );
}
