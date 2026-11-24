import React from 'react';
import Head from "next/head";
import SecondaryLayout from '@/components/Layouts/SecondaryLayout';
import DoctorsLandingPage from '@/components/Doctors/DoctorsLandingPage';
import axios from 'axios';
import CONFIG from '@/config';

const BRANCH_METADATA = {
    "uppal-doctors": {
        location: "Uppal",
        title: "Specialist Doctors in Uppal, Hyderabad | TX Hospitals Uppal",
        description: "Meet specialist doctors in uppal at TX Hospitals Uppal: cardiology, neurology, nephrology, urology, gynaecology, gastro, ortho, ENT & more. Call +91 91445 14459",
        heading: "Specialist Doctors at TX Hospitals Uppal, Hyderabad",
    },
    "miyapur-doctors": {
        location: "Miyapur",
        title: "Best Specialist Doctors in Miyapur, Hyderabad | TX Hospitals",
        description: "Find top specialist doctors and surgeons at TX Hospitals Miyapur, Hyderabad. Browse specialists by department, OPD availability, and book consultations.",
        heading: "Best Specialist Doctors in Miyapur, Hyderabad",
    },
    "kachiguda-doctors": {
        location: "Kachiguda",
        title: "Best Specialist Doctors in Kachiguda, Hyderabad | TX Hospitals",
        description: "Find top specialist doctors and surgeons at TX Hospitals Kachiguda, Hyderabad. Browse specialists by department, OPD availability, and book consultations",
        heading: "The Physicians Behind Your Care",
    },
    "banjara-hills-doctors": {
        location: "Banjara Hills",
        title: "Best Doctors in Banjara Hills, Hyderabad | TX Hospitals",
        description: "Find experienced specialist doctors at TX Hospitals, Banjara Hills, Hyderabad. Explore doctor profiles by specialty and book your appointment online.",
        heading: "Find Specialist Doctors in Banjara Hills, Hyderabad",
    },
};

const BRANCH_SLUG_MAP = {
    "banjara-hills-doctors": "banjara-hills-doctors",
    "kachiguda-doctors": "kachiguda-doctors",
    "miyapur-doctors": "miyapur-doctors",
    "uppal-doctors": "uppal-doctors",

    // Aliases to canonicalize
    "banjarahills-doctors": "banjara-hills-doctors",
    "banjara-hills": "banjara-hills-doctors",
    "banjarahills": "banjara-hills-doctors",
    "kachiguda": "kachiguda-doctors",
    "miyapur": "miyapur-doctors",
    "uppal": "uppal-doctors",
    "doctors-in-banjara-hills": "banjara-hills-doctors",
    "doctors-in-kachiguda": "kachiguda-doctors",
    "doctors-in-miyapur": "miyapur-doctors",
    "doctors-in-uppal": "uppal-doctors",
};

export async function getServerSideProps(context) {
    const rawSlug = context.params?.slug ? String(context.params.slug).trim().toLowerCase() : "";
    const canonicalSlug = BRANCH_SLUG_MAP[rawSlug];

    if (!canonicalSlug || !BRANCH_METADATA[canonicalSlug]) {
        return {
            notFound: true,
        };
    }

    if (rawSlug !== canonicalSlug) {
        return {
            redirect: {
                destination: `/find-doctor/${canonicalSlug}/`,
                permanent: true,
            },
        };
    }

    const branchMeta = BRANCH_METADATA[canonicalSlug];

    try {
        let response;
        try {
            response = await axios.get(`${CONFIG.API_BASE_URL}/getDoctorsList`, { timeout: 6000 });
        } catch (e) {
            response = await axios.get(`${CONFIG.API_BASE_URL}/getAllDoctors`, { timeout: 6000 });
        }
        let initialDoctors = Array.isArray(response?.data) ? response.data : [];
        if (initialDoctors.length === 0) {
            try {
                const fallback = await axios.get(`${CONFIG.API_BASE_URL}/getAllDoctors`, { timeout: 6000 });
                if (Array.isArray(fallback?.data) && fallback.data.length > 0) {
                    initialDoctors = fallback.data;
                }
            } catch (_) {}
        }

        return {
            props: {
                initialDoctors,
                initialLocation: branchMeta.location,
                canonicalSlug,
                pageTitle: branchMeta.title,
                pageDescription: branchMeta.description,
                pageHeading: branchMeta.heading,
            }
        };
    } catch (err) {
        console.error("SSR Doctors list error:", err.message);
        return {
            props: {
                initialDoctors: [],
                initialLocation: branchMeta.location,
                canonicalSlug,
                pageTitle: branchMeta.title,
                pageDescription: branchMeta.description,
                pageHeading: branchMeta.heading,
            }
        };
    }
}

export default function BranchDoctor_Page({
    initialDoctors,
    initialLocation,
    canonicalSlug,
    pageTitle,
    pageDescription,
    pageHeading,
}) {
    const pageKeywords = `doctors in ${initialLocation}, top doctors in ${initialLocation} Hyderabad, best surgeons in ${initialLocation}, TX Hospitals ${initialLocation} doctors list, hospital doctors ${initialLocation}`;
    const canonicalUrl = `https://txhospitals.in/find-doctor/${canonicalSlug}/`;

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content={pageKeywords} />
                <link rel="canonical" href={canonicalUrl} key="canonical" />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:type" content="website" />
            </Head>
            <SecondaryLayout>
                <DoctorsLandingPage
                    initialDoctors={initialDoctors}
                    initialLocation={initialLocation}
                    customHeading={pageHeading}
                />
            </SecondaryLayout>
        </>
    );
}
