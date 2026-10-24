import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import SecondaryLayout from '@/components/Layouts/SecondaryLayout';
import BranchSpecialtiesLanding from '@/components/BranchSpecialtiesLanding/BranchSpecialtiesLanding';
import LocalitySchema from '@/utils/LocalitySchema';
import Breadcrumb from '@/components/Common/Breadcrumb';

export default function BranchSpecialtiesPage({ location, wasBracketUrl }) {
    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;

        if (wasBracketUrl || (location && (location.includes('[') || location.includes(']')))) {
            router.replace('/uppal/specialties/');
        }
    }, [location, wasBracketUrl, router]);

    const cleanLocation = (!location || location.includes('[')) ? 'uppal' : location;
    const formattedLocation = cleanLocation
        .split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: formattedLocation, href: `/${cleanLocation}/` },
        { label: "Specialties" },
    ];

    return (
        <>
            <Head>
                <title>Specialties at TX Hospitals {formattedLocation}</title>
                <meta name="description" content={`Explore all the medical specialties and advanced treatments available at TX Hospitals ${formattedLocation}.`} />
            </Head>
            <LocalitySchema
                location={cleanLocation}
                pageTitle={`Specialties at TX Hospitals ${formattedLocation}`}
                description={`Explore all the medical specialties and advanced treatments available at TX Hospitals ${formattedLocation}.`}
                pageUrl={`/${cleanLocation}/specialties/`}
            />
            <SecondaryLayout>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
                    <Breadcrumb items={breadcrumbItems} />
                </div>
                <BranchSpecialtiesLanding location={cleanLocation} />
            </SecondaryLayout>
        </>
    );
}

export async function getServerSideProps(context) {
    let { url: location } = context.params;
    const isBracketLocation = !location || location.includes('[') || location.includes(']');
    const targetLocation = isBracketLocation ? 'uppal' : location;

    return {
        props: {
            location: targetLocation,
            wasBracketUrl: isBracketLocation
        }
    };
}
