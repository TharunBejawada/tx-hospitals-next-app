import React from 'react';
import Head from "next/head";
import SecondaryLayout from '@/components/Layouts/SecondaryLayout';
import SOLandingPage from '@/components/SecondOpinion/SOLandingPgae';
import CONFIG from '@/config';

export default function Second_Opinipon({ initialSurgeryOptions = [] }) {
    return (
        <>
            <Head>
                <title>Surgery Care & Second Opinion in Hyderabad | TX Hospitals</title>
                <meta name="description" content="TX Hospitals offers advanced surgery care in Hyderabad with expert surgeons, minimally invasive options, and a reliable second opinion for your treatment decisions." />
                <meta name="keywords" content="Second opinion surgery Hyderabad, Surgery second opinion Hyderabad, Best second opinion hospital Hyderabad, Second opinion doctors Hyderabad, TX Hospitals second opinion" />
            </Head>
            <SecondaryLayout>
                <SOLandingPage initialSurgeryOptions={initialSurgeryOptions} />
            </SecondaryLayout>
        </>
    );
}

export async function getServerSideProps({ res }) {
    if (res) {
        res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    }
    let initialSurgeryOptions = [];
    try {
        const endpoint = `${CONFIG.API_BASE_URL}/new-secondopinion/getAllSecondOpinion`;
        const response = await fetch(endpoint);
        if (response.ok) {
            const data = await response.json();
            initialSurgeryOptions = (data.Items || []).map((item) => {
                const raw = (item.url || "").replace(/\//g, "").replace(/-/g, " ");
                const name = raw
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");
                return {
                    id: item.soId,
                    name,
                    image: item?.soImage,
                    url: item?.url,
                };
            }).sort((a, b) => a.name.localeCompare(b.name));
        }
    } catch (error) {
        console.error("Error fetching surgery options in getServerSideProps: ", error);
    }

    return {
        props: {
            initialSurgeryOptions
        }
    };
}
