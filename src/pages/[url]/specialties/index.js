import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import SecondaryLayout from '@/components/Layouts/SecondaryLayout';
import BranchSpecialtiesLanding from '@/components/BranchSpecialtiesLanding/BranchSpecialtiesLanding';

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

    return (
        <>
            <Head>
                <title>Specialties at TX Hospitals {formattedLocation}</title>
                <meta name="description" content={`Explore all the medical specialties and advanced treatments available at TX Hospitals ${formattedLocation}.`} />
            </Head>
            <SecondaryLayout>
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
