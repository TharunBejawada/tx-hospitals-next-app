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
 * Builds Schema.org Physician / MedicalOrganization schema for a doctor.
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

    // Extract qualifications / education
    const alumniList = [];
    if (doctorData.qualification) {
        alumniList.push({
            "@type": "EducationalOrganization",
            "name": cleanText(doctorData.qualification),
        });
    }

    const imageUrl = doctorData.image || "https://txhospitals.in/TXlogoWB.jpg";

    return {
        "@context": "https://schema.org",
        "@type": ["Physician", "MedicalOrganization", "Person"],
        "@id": `${canonicalUrl}#physician`,
        "name": name,
        "url": canonicalUrl,
        "image": imageUrl,
        "description": bio,
        "jobTitle": designation,
        "medicalSpecialty": department,
        "telephone": branch.phone || "+91 9144514459",
        "email": "info@txhospitals.in",
        "priceRange": "₹₹",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": branch.address,
            "addressLocality": `${branch.displayName}, Hyderabad`,
            "addressRegion": "Telangana",
            "addressCountry": "IN",
        },
        ...(branch.coords ? {
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": branch.coords[0],
                "longitude": branch.coords[1],
            }
        } : {}),
        "hospitalAffiliation": {
            "@type": "Hospital",
            "@id": "https://txhospitals.in/#organization",
            "name": `TX Hospitals, ${branch.displayName}`,
            "url": `https://txhospitals.in/${branch.displayName.toLowerCase().replace(/\s+/g, "-")}/`,
        },
        "worksFor": {
            "@type": "MedicalOrganization",
            "@id": "https://txhospitals.in/#organization",
            "name": "TX Hospitals",
            "url": "https://txhospitals.in/",
            "logo": "https://txhospitals.in/TXlogoWB.jpg",
        },
        ...(alumniList.length > 0 ? { "alumniOf": alumniList } : {}),
        "knowsAbout": [department, "Healthcare", "Surgery", "Patient Care"],
        "hasMap": `https://maps.google.com/?q=${encodeURIComponent(branch.mapName || "TX Hospitals")}`,
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
