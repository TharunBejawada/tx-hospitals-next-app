import React from 'react';
import Head from "next/head";
import SecondaryLayout from '@/components/Layouts/SecondaryLayout';
import IPLandingPage from '@/components/InternationalPatients/IPLandingPage';
import Breadcrumb from '@/components/Common/Breadcrumb';

export default function International_Patients() {
    return (
        <>
            <Head>
                <title>Medical Tourism & International Patient Care in Hyderabad – TX Hospitals</title>
                <meta name="description" content="TX Hospitals in Hyderabad offers dedicated international patient services—visa & travel planning, second opinions, translator support, and global-intelligent care." />
                <meta name="keywords" content="International Patient Services Hyderabad, Medical tourism Hyderabad, International patients hospital Hyderabad, TX Hospitals medical tourism, Global patient care Hyderabad, Medical visa assistance Hyderabad" />
            </Head>
            <SecondaryLayout>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
                    <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "International Patient Services" }]} />
                </div>
                <IPLandingPage />
            </SecondaryLayout>
        </>
    );
}