import React from 'react';
import Head from "next/head";
import SecondaryLayout from '@/components/Layouts/SecondaryLayout';
import DoctorsLandingPage from '@/components/Doctors/DoctorsLandingPage';
import axios from 'axios';
import CONFIG from '@/config';

export async function getServerSideProps() {
    try {
        let response;
        try {
            response = await axios.get(`${CONFIG.API_BASE_URL}/getDoctorsList`, { timeout: 6000 });
        } catch (e) {
            response = await axios.get(`${CONFIG.API_BASE_URL}/getAllDoctors`, { timeout: 6000 });
        }
        const initialDoctors = Array.isArray(response?.data) ? response.data : [];

        return {
            props: {
                initialDoctors
            }
        };
    } catch (err) {
        console.error("SSR Doctors list error:", err.message);
        return {
            props: {
                initialDoctors: []
            }
        };
    }
}

export default function FindDoctor_Page({ initialDoctors }) {
    return (
        <>
            <Head>
                <title>Find a Specialist Doctor in Hyderabad | TX Hospitals</title>
                <meta name="description" content="Easily find a doctor in Hyderabad at TX Hospitals—browse top specialists by specialty, location, and availability for expert multi-specialty care." />
                <meta name="keywords" content="find doctor in Hyderabad, Top Doctors in Hyderabad, Best Doctors in Hyderabad, Top Surgeons in Hyderabad, Best Surgeons in Hyderabad, Find a Surgeons in Hyderabad, Hyderabad Doctors list, Hyderabad Doctors" />
            </Head>
            <SecondaryLayout>
                <DoctorsLandingPage initialDoctors={initialDoctors} />
            </SecondaryLayout>
        </>
    );
}
