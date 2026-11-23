import React from 'react';
import Head from "next/head";
import SecondaryLayout from '@/components/Layouts/SecondaryLayout';
import DoctorsLandingPage from '@/components/Doctors/DoctorsLandingPage';
import axios from 'axios';
import CONFIG from '@/config';

const BRANCH_SLUG_MAP = {
    "banjara-hills-doctors": "Banjara Hills",
    "kachiguda-doctors": "Kachiguda",
    "miyapur-doctors": "Miyapur",
    "uppal-doctors": "Uppal",

    // Aliases to canonicalize
    "banjarahills-doctors": "Banjara Hills",
    "banjara-hills": "Banjara Hills",
    "banjarahills": "Banjara Hills",
    "kachiguda": "Kachiguda",
    "miyapur": "Miyapur",
    "uppal": "Uppal",
    "doctors-in-banjara-hills": "Banjara Hills",
    "doctors-in-kachiguda": "Kachiguda",
    "doctors-in-miyapur": "Miyapur",
    "doctors-in-uppal": "Uppal",
};

const CANONICAL_BRANCH_SLUGS = {
    "Banjara Hills": "banjara-hills-doctors",
    "Kachiguda": "kachiguda-doctors",
    "Miyapur": "miyapur-doctors",
    "Uppal": "uppal-doctors",
};

export async function getServerSideProps(context) {
    const rawSlug = context.params?.slug ? String(context.params.slug).trim().toLowerCase() : "";
    const matchedBranch = BRANCH_SLUG_MAP[rawSlug];

    if (!matchedBranch) {
        return {
            notFound: true,
        };
    }

    const canonicalSlug = CANONICAL_BRANCH_SLUGS[matchedBranch];
    if (rawSlug !== canonicalSlug) {
        return {
            redirect: {
                destination: `/find-doctor/${canonicalSlug}/`,
                permanent: true,
            },
        };
    }

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
                initialLocation: matchedBranch,
                canonicalSlug,
            }
        };
    } catch (err) {
        console.error("SSR Doctors list error:", err.message);
        return {
            props: {
                initialDoctors: [],
                initialLocation: matchedBranch,
                canonicalSlug,
            }
        };
    }
}

export default function BranchDoctor_Page({ initialDoctors, initialLocation, canonicalSlug }) {
    const pageTitle = `Best Specialist Doctors in ${initialLocation}, Hyderabad | TX Hospitals`;
    const pageDescription = `Find top specialist doctors and surgeons at TX Hospitals ${initialLocation}, Hyderabad. Browse specialists by department, OPD availability, and book consultations.`;
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
                <DoctorsLandingPage initialDoctors={initialDoctors} initialLocation={initialLocation} />
            </SecondaryLayout>
        </>
    );
}
