import React from 'react';
import Head from "next/head";
import SecondaryLayout from '@/components/Layouts/SecondaryLayout';
import PatientTalks from '@/components/VideosPage/PatientTalks';
import Breadcrumb from '@/components/Common/Breadcrumb';

export default function PatientTalksPage() {
    return (
        <>
            <Head>
                <title>TX Hospitals – Leading Multi-Specialty Hospitals in Hyderabad</title>
                <meta name="description" content="TX Hospitals offers world-class multi-specialty care in Hyderabad across Uppal, Kachiguda & Banjara Hills—with advanced diagnostics, expert doctors, and patient-centric services." />
                <meta name="keywords" content="TX Hospitals Hyderabad, Multi-specialty hospital Hyderabad, Super specialty hospital Hyderabad, Best hospital in Hyderabad, Top Hospitals in Hyderabad" />
            </Head>
            <SecondaryLayout>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
                    <Breadcrumb items={[
                        { label: "Home", href: "/" },
                        { label: "News & Media", href: "/news-and-media" },
                        { label: "Patient Talks" }
                    ]} />
                </div>
                <PatientTalks />
            </SecondaryLayout>
        </>
    );
}