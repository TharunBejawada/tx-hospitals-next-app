import React from "react";
import Head from "next/head";
import { getBranchData } from "./branchLocationData";

const BRANCH_SCHEMA_META = {
    "banjara-hills": {
        name: "TX Hospitals, Banjara Hills",
        url: "https://txhospitals.in/banjara-hills/",
        streetAddress: "8-2-680/A, Road No. 12, Sri Ram Nagar Colony, Banjara Hills",
        addressLocality: "Banjara Hills, Hyderabad",
        addressRegion: "Telangana",
        postalCode: "500028",
        telephone: "040-66529999",
        coords: [17.408587026550897, 78.44449394391825],
        image: "https://txhospitals.in/assets/Our%20Location/Banjara%20Hills%20%20Hospitals%20Image.png",
        displayName: "Banjara Hills",
    },
    "uppal": {
        name: "TX Hospitals, Uppal",
        url: "https://txhospitals.in/uppal/",
        streetAddress: "# 2-6-71, Bharath Nagar Colony, Near Masjid Uppal",
        addressLocality: "Uppal, Hyderabad",
        addressRegion: "Telangana",
        postalCode: "500039",
        telephone: "+91-40-43 108 108",
        coords: [17.402553358453122, 78.56694358887127],
        image: "https://txhospitals.in/assets/Our%20Location/Uppal%20Location%20Image.png",
        displayName: "Uppal",
    },
    "kachiguda": {
        name: "TX Hospitals, Kachiguda",
        url: "https://txhospitals.in/kachiguda/",
        streetAddress: "# 3-2-841/1, Kachiguda Station Rd, Mahalaxmi Nilayam, Kachiguda",
        addressLocality: "Kachiguda, Hyderabad",
        addressRegion: "Telangana",
        postalCode: "500027",
        telephone: "+91-40-48 108 108",
        coords: [17.389777991297837, 78.49544286499808],
        image: "https://txhospitals.in/assets/Our%20Location/Kachiguda%20Image.png",
        displayName: "Kachiguda",
    },
    "miyapur": {
        name: "TX Hospitals, Miyapur",
        url: "https://txhospitals.in/miyapur/",
        streetAddress: "Pillar No A 600, Plot 65 & 66, Miyapur Cross Road, Mathrusree Nagar, Hafeezpet",
        addressLocality: "Miyapur, Hyderabad",
        addressRegion: "Telangana",
        postalCode: "500059",
        telephone: "040-21999999",
        coords: [17.49594147086547, 78.36466448274872],
        image: "https://txhospitals.in/assets/ContactUs/TX%20Hospitals%20Miyapur.webp",
        displayName: "Miyapur",
    },
};

export function getLocalityData(locationSlug) {
    if (!locationSlug) return BRANCH_SCHEMA_META["banjara-hills"];
    const key = String(locationSlug).toLowerCase().trim().replace(/\s+/g, "-");
    return BRANCH_SCHEMA_META[key] || BRANCH_SCHEMA_META["banjara-hills"];
}

export function buildLocalitySchema({
    location = "uppal",
    speciality = "",
    pageTitle = "",
    description = "",
    pageUrl = "",
    image = "",
}) {
    const branch = getLocalityData(location);
    const canonicalUrl = pageUrl
        ? `https://txhospitals.in${pageUrl.startsWith("/") ? pageUrl : `/${pageUrl}`}`
        : branch.url;

    const schemaName = pageTitle || (speciality
        ? `${branch.name} - ${speciality} Department`
        : branch.name);

    const schemaDescription = description || (speciality
        ? `Comprehensive ${speciality} healthcare, consultations, and treatments at ${branch.name}, Hyderabad.`
        : `TX Hospitals ${branch.displayName} is a leading multi-specialty hospital in Hyderabad offering 24/7 emergency care, advanced ICU, top doctors, and modern healthcare facilities.`);

    return {
        "@context": "https://schema.org",
        "@type": ["Hospital", "MedicalClinic", "LocalBusiness"],
        "@id": `${canonicalUrl}#hospital`,
        "name": schemaName,
        "url": canonicalUrl,
        "logo": "https://txhospitals.in/TXlogoWB.jpg",
        "image": image || branch.image || "https://txhospitals.in/TXlogoWB.jpg",
        "description": schemaDescription,
        "telephone": branch.telephone,
        "email": "info@txhospitals.in",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": branch.streetAddress,
            "addressLocality": branch.addressLocality,
            "addressRegion": branch.addressRegion,
            "postalCode": branch.postalCode,
            "addressCountry": "IN",
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": branch.coords[0],
            "longitude": branch.coords[1],
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                ],
                "opens": "00:00",
                "closes": "23:59",
            },
        ],
        ...(speciality ? { "medicalSpecialty": speciality } : {}),
        "priceRange": "₹₹",
        "hasMap": `https://maps.google.com/?q=${encodeURIComponent(branch.name)}`,
        "parentOrganization": {
            "@type": "Organization",
            "@id": "https://txhospitals.in/#organization",
            "name": "TX Hospitals",
            "url": "https://txhospitals.in/",
        },
        "areaServed": [
            {
                "@type": "AdministrativeArea",
                "name": branch.addressLocality,
            },
            {
                "@type": "City",
                "name": "Hyderabad",
            },
            {
                "@type": "State",
                "name": "Telangana",
            },
        ],
    };
}

export default function LocalitySchema({
    location = "uppal",
    speciality = "",
    pageTitle = "",
    description = "",
    pageUrl = "",
    image = "",
}) {
    const schema = buildLocalitySchema({
        location,
        speciality,
        pageTitle,
        description,
        pageUrl,
        image,
    });

    return (
        <Head>
            <script
                key={`locality-schema-${location}-${speciality || "branch"}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
        </Head>
    );
}
