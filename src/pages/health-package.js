import React from 'react';
import Head from "next/head";
import SecondaryLayout from '@/components/Layouts/SecondaryLayout';
import HPLandingPage from '@/components/HealthPackages/HPLandingPage';
import axios from 'axios';
import CONFIG from '@/config';

export async function getServerSideProps() {
    try {
        const res = await axios.get(`${CONFIG.API_BASE_URL}/new-healthpackages/getAllHealthPackages`, { timeout: 6000 });
        const initialPackages = res.data?.Items || [];
        return {
            props: {
                initialPackages
            }
        };
    } catch (err) {
        console.error("SSR Health packages error:", err.message);
        return {
            props: {
                initialPackages: []
            }
        };
    }
}

export default function Health_Packages({ initialPackages }) {
    return (
        <>
            <Head>
                <title>Comprehensive Health Checks in Hyderabad | Preventive Care</title>
                <meta name="description" content="Get comprehensive health checks in Hyderabad. Early detection, expert analysis, and personalized care plans for a healthier life. Book your health checkup today!" />
            </Head>
            <SecondaryLayout>
                <HPLandingPage initialPackages={initialPackages} />
            </SecondaryLayout>
        </>
    );
}
