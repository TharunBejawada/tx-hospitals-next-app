import React from 'react';
import SpecialitiesHomepage from '@/components/Specialities/SpecialitiesHomepage';
import Head from "next/head";
import SecondaryLayout from '@/components/Layouts/SecondaryLayout';
import Breadcrumb from "@/components/Common/Breadcrumb";
import useIsMobile from '@/hooks/useIsMobile';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const OurLocations = dynamic(() => import('@/components/HomePage/OurLocations'), {
    loading: () => <div className="w-full min-h-[200px] animate-pulse bg-white" />
});

export default function Specialities() {

    const isMobile = useIsMobile();
    const router = useRouter();
    const isClinicalResearch = router.query.source === 'clinical-research';

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Specialties" },
    ];

    return (
        <>
            <Head>
                <title>Best Multi Speciality Hospitals in Hyderabad | Top Hospitals in India | TX Hospitals</title>
                <meta name="description" content="Explore comprehensive medical specialities at TX Hospitals, including cardiology, neurology, orthopaedics, gastroenterology, pulmonology, nephrology, oncology, paediatrics, and more. Expert doctors and advanced treatments across multiple disciplines in Hyderabad." />
                <meta name="keywords" content="Best Speciality Hospitals in Hyderabad" />
            </Head>
            <SecondaryLayout isClinicalResearch={isClinicalResearch}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
                    <Breadcrumb items={breadcrumbItems} />
                </div>
                <SpecialitiesHomepage isClinicalResearch={isClinicalResearch} />
                {!isClinicalResearch && (
                    <div className="mt-8 md:mt-12">
                        <OurLocations />
                    </div>
                )}
            </SecondaryLayout>
        </>
    );
}