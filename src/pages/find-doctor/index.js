import React from 'react';
import Head from "next/head";
import SecondaryLayout from '@/components/Layouts/SecondaryLayout';
import DoctorsLandingPage from '@/components/Doctors/DoctorsLandingPage';
import axios from 'axios';
import CONFIG from '@/config';

const LOCATION_SLUG_MAP = {
    "uppal": "uppal-doctors",
    "kachiguda": "kachiguda-doctors",
    "banjara hills": "banjara-hills-doctors",
    "banjarahills": "banjara-hills-doctors",
    "miyapur": "miyapur-doctors",
};

export async function getServerSideProps(context) {
    const { query } = context;
    const rawLocation = query?.location ? String(query.location).trim().toLowerCase() : null;

    if (rawLocation && LOCATION_SLUG_MAP[rawLocation]) {
        return {
            redirect: {
                destination: `/find-doctor/${LOCATION_SLUG_MAP[rawLocation]}/`,
                permanent: true,
            }
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
                initialLocation: null,
            }
        };
    } catch (err) {
        console.error("SSR Doctors list error:", err.message);
        return {
            props: {
                initialDoctors: [],
                initialLocation: null,
            }
        };
    }
}

export default function FindDoctor_Page({ initialDoctors, initialLocation }) {
    const pageTitle = "Find a Specialist Doctor in Hyderabad | TX Hospitals";
    const pageDescription = "Easily find a doctor in Hyderabad at TX Hospitals—browse top specialists by specialty, location, and availability for expert multi-specialty care.";
    const pageKeywords = "find doctor in Hyderabad, Top Doctors in Hyderabad, Best Doctors in Hyderabad, Top Surgeons in Hyderabad, Best Surgeons in Hyderabad, Find a Surgeons in Hyderabad, Hyderabad Doctors list, Hyderabad Doctors";
    const canonicalUrl = "https://txhospitals.in/find-doctor/";

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
