import React from 'react';
import Head from "next/head";
import SecondaryLayout from '@/components/Layouts/SecondaryLayout';
import HealthPackageDetails from '@/components/HealthPackages/HealthPackageDetails';
import axios from 'axios';
import CONFIG from '@/config';

export async function getServerSideProps(context) {
    const { slug } = context.params || {};
    if (!slug) {
        return { redirect: { destination: "/health-package/", permanent: false } };
    }

    const fullPath = `/health-package/${slug}/`;
    const encodedPath = encodeURIComponent(fullPath);

    try {
        const res = await axios.get(`${CONFIG.API_BASE_URL}/new-healthpackages/getHealthPackagebyURL/${encodedPath}`, { timeout: 6000 });
        const initialPackageData = Array.isArray(res.data) ? res.data[0] : (res.data?.Item || null);

        if (!initialPackageData) {
            return {
                redirect: {
                    destination: "/health-package/",
                    permanent: false
                }
            };
        }

        return {
            props: {
                initialPackageData
            }
        };
    } catch (err) {
        console.error("SSR Health package detail error:", err.message);
        return {
            props: {
                initialPackageData: null
            }
        };
    }
}

export default function Health_Package_Details({ initialPackageData }) {
    const title = initialPackageData?.hpTitle 
        ? `${initialPackageData.hpTitle} | Health Checkup TX Hospitals`
        : "Comprehensive Health Checks in Hyderabad | Preventive Care";
    const desc = initialPackageData?.metaDescription || "Get comprehensive health checks in Hyderabad. Early detection, expert analysis, and personalized care plans.";

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={desc} />
            </Head>
            <SecondaryLayout>
                <HealthPackageDetails initialPackageData={initialPackageData} />
            </SecondaryLayout>
        </>
    );
}
