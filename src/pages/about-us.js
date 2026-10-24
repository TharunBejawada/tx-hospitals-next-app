import React from 'react';
import Head from "next/head";
import SecondaryLayout from '@/components/Layouts/SecondaryLayout';
import OverviewPage from '@/components/Overview/OverviewPage';
import Breadcrumb from '@/components/Common/Breadcrumb';

export default function Overview_Page() {
    return (
        <>
            <Head>
                <title>Best Multi-Super Specialty Hospital in Hyderabad | TX Hospitals</title>
                <meta name="description" content="TX Hospitals is the best multi specialty health care hospital in Hyderabad. Providing highest quality healthcare services in kachiguda, uppal, banjarahills and all over hyderabad with cutting-edge technology and good infrastructure facilities." />
                <meta name="keywords" content="best multi specialty hospital in uppal, best multi specialty hospital in kachiguda, best multi specialty hospital in banjarahills, best multi specialty hospital in hyderabad, top multi specialty hospital in kachiguda, top multi specialty hospital in uppal, top multi specialty hospital in banjarahills, top multispecialty hospital in hyderabad" />
            </Head>
            <SecondaryLayout>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
                    <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />
                </div>
                <OverviewPage />
            </SecondaryLayout>
        </>
    );
}