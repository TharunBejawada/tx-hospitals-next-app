import React from 'react';
import Head from "next/head";
import { useRouter } from "next/router";
import SecondaryLayout from '@/components/Layouts/SecondaryLayout';
import DoctorsLandingPage from '@/components/Doctors/DoctorsLandingPage';
import axios from 'axios';
import CONFIG from '@/config';

const LOCATION_DISPLAY_NAMES = {
    "uppal": "Uppal",
    "kachiguda": "Kachiguda",
    "banjara hills": "Banjara Hills",
    "banjarahills": "Banjara Hills",
    "miyapur": "Miyapur",
};

export async function getServerSideProps(context) {
    const { query } = context;
    const rawLocation = query?.location ? String(query.location).trim() : null;
    let initialLocation = null;
    if (rawLocation) {
        const lower = rawLocation.toLowerCase();
        initialLocation = LOCATION_DISPLAY_NAMES[lower] || rawLocation;
    }

    try {
        let response;
        try {
            response = await axios.get(`${CONFIG.API_BASE_URL}/getDoctorsList`, { timeout: 6000 });
        } catch (e) {
            response = await axios.get(`${CONFIG.API_BASE_URL}/getAllDoctors`, { timeout: 6000 });
        }
        const initialDoctors = Array.isArray(response?.data) ? response.data : [];

        return {
            props: {
                initialDoctors,
                initialLocation,
            }
        };
    } catch (err) {
        console.error("SSR Doctors list error:", err.message);
        return {
            props: {
                initialDoctors: [],
                initialLocation,
            }
        };
    }
}

export default function FindDoctor_Page({ initialDoctors, initialLocation }) {
    const router = useRouter();
    const activeLocation = (router.query.location ? String(router.query.location).trim() : null) || initialLocation;

    let pageTitle = "Find a Specialist Doctor in Hyderabad | TX Hospitals";
    let pageDescription = "Easily find a doctor in Hyderabad at TX Hospitals—browse top specialists by specialty, location, and availability for expert multi-specialty care.";
    let pageKeywords = "find doctor in Hyderabad, Top Doctors in Hyderabad, Best Doctors in Hyderabad, Top Surgeons in Hyderabad, Best Surgeons in Hyderabad, Find a Surgeons in Hyderabad, Hyderabad Doctors list, Hyderabad Doctors";
    let canonicalUrl = "https://txhospitals.in/find-doctor/";

    if (activeLocation) {
        const lower = activeLocation.toLowerCase();
        const displayLocation = LOCATION_DISPLAY_NAMES[lower] || activeLocation;
        pageTitle = `Best Specialist Doctors in ${displayLocation}, Hyderabad | TX Hospitals`;
        pageDescription = `Find top specialist doctors and surgeons at TX Hospitals ${displayLocation}, Hyderabad. Browse specialists by department, OPD availability, and book consultations.`;
        pageKeywords = `doctors in ${displayLocation}, top doctors in ${displayLocation} Hyderabad, best surgeons in ${displayLocation}, TX Hospitals ${displayLocation} doctors list, hospital doctors ${displayLocation}`;
        canonicalUrl = `https://txhospitals.in/find-doctor/?location=${encodeURIComponent(displayLocation)}`;
    }

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
