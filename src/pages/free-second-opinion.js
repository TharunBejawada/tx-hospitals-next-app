import React from "react";
import Head from "next/head";
import SecondaryLayout from "@/components/Layouts/SecondaryLayout";
import SecondOpinionLanding from "@/components/SecondOpinion/Landing/SecondOpinionLanding";
import CONFIG from "@/config";

export default function SecondOpinionPage({ initialDoctors = [] }) {
    return (
        <>
            <Head>
                <title>Expert Free Second Opinion Consultation in Hyderabad | TX Hospitals</title>
                <meta
                    name="description"
                    content="Get a free second opinion from our expert specialists at TX Hospitals. Make informed decisions about your health with accurate diagnosis and treatment guidance."
                />
                <meta
                    name="keywords"
                    content="Second opinion consultation Hyderabad, Medical second opinion Hyderabad, Best specialists Hyderabad, TX Hospitals second opinion"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <SecondaryLayout>
                <SecondOpinionLanding
                    customTitle="Your Health Decision Deserves the Right  Opinion"
                    initialDoctors={initialDoctors}
                />
            </SecondaryLayout>
        </>
    );
}

export async function getServerSideProps({ res }) {
    if (res) {
        res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    }
    let initialDoctors = [];
    try {
        let response = await fetch(`${CONFIG.API_BASE_URL}/getDoctorsList`);
        if (!response.ok) response = await fetch(`${CONFIG.API_BASE_URL}/getAllDoctors`);
        if (response.ok) {
            const data = await response.json();
            const sorted = [...data].sort((a, b) => Number(a.priorityOrder || 9999) - Number(b.priorityOrder || 9999));
            initialDoctors = sorted.slice(0, 4);
        }
    } catch (err) {
        console.error("Error in free-second-opinion getServerSideProps:", err);
    }
    return {
        props: {
            initialDoctors
        }
    };
}
