import React, { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import SecondaryLayout from "@/components/Layouts/SecondaryLayout";
import RoboticSurgeryHeader from "@/components/RoboticSurgery/RoboticSurgeryHeader";
import WhatIsRoboticSurgery from "@/components/RoboticSurgery/WhatIsRoboticSurgery";
import RoboticProcedures from "@/components/RoboticSurgery/RoboticProcedures";
import RoboticSurgeons from "@/components/RoboticSurgery/RoboticSurgeons";
import RoboticBenefits from "@/components/RoboticSurgery/RoboticBenefits";
import RoboticLeadForm from "@/components/RoboticSurgery/RoboticLeadForm";
import RoboticWhyChoose from "@/components/RoboticSurgery/RoboticWhyChoose";
import RoboticRecovery from "@/components/RoboticSurgery/RoboticRecovery";
import RoboticFirstStep from "@/components/RoboticSurgery/RoboticFirstStep";
import RoboticFAQ from "@/components/RoboticSurgery/RoboticFAQ";
import BookAppointmentForm from "@/components/Blogs/BookAppointemntForm";
import dynamic from "next/dynamic";

const OurLocations = dynamic(() => import("@/components/HomePage/OurLocations"), {
    loading: () => <div className="w-full min-h-[200px] animate-pulse bg-white" />
});

export default function RoboticCancerSurgeryPage({ initialData = null }) {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(!initialData);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const pageUrl = "/specialities/robotic-cancer-surgery-in-hyderabad/";
    const apiUrl = `https://api.txhospitals.vgworld.in/robotic-surgery/getRoboticSurgerybyURL/${encodeURIComponent(pageUrl)}`;

    useEffect(() => {
        if (initialData) return;
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl);
                if (response.data && response.data.length > 0) {
                    setData(response.data[0]);
                } else {
                    setError("No data found");
                }
            } catch (err) {
                console.error("Error fetching robotic surgery data:", err);
                setError("Failed to load data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [apiUrl]);

    if (loading) {
        return (
            <SecondaryLayout>
                <div className="flex justify-center items-center min-h-[60vh]">
                    <div className="w-12 h-12 border-4 border-[#b02a44] border-t-transparent rounded-full animate-spin"></div>
                </div>
            </SecondaryLayout>
        );
    }

    if (error || !data) {
        return (
            <SecondaryLayout>
                <div className="text-center py-20">
                    <h1 className="text-2xl font-bold text-gray-800">{error || "Page Not Found"}</h1>
                </div>
            </SecondaryLayout>
        );
    }

    return (
        <>
            <Head>
                <title>{data.seoTitle || data.rsTitle}</title>
                <meta name="description" content={data.metaDescription} />
                <meta name="keywords" content={data.metaKeywords} />
            </Head>
            <SecondaryLayout>
                <div className="pb-10">
                    <RoboticSurgeryHeader data={data} onBookNow={() => setShowModal(true)} />
                    <WhatIsRoboticSurgery data={data.whatIsRS} />
                    <RoboticProcedures data={data.proceduresList} />
                    <RoboticSurgeons data={data.surgeons} onBookNow={() => setShowModal(true)} />
                    <RoboticBenefits data={data.benefits} />
                    <RoboticLeadForm />
                    <RoboticWhyChoose data={data.whyChoose} />
                    <RoboticRecovery data={data.recovery} />
                    <RoboticFirstStep data={data.firstSteps} onBookNow={() => setShowModal(true)} />
                    <RoboticFAQ data={data.faqs} />
                </div>

                <div className="mt-8 md:mt-12">
                    <OurLocations />
                </div>

                <BookAppointmentForm showModal={showModal} setShowModal={setShowModal} />
            </SecondaryLayout>
        </>
    );
}

export async function getServerSideProps({ res }) {
    if (res) {
        res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    }
    const pageUrl = "/specialities/robotic-cancer-surgery-in-hyderabad/";
    let initialData = null;
    try {
        const apiUrl = `https://api.txhospitals.vgworld.in/robotic-surgery/getRoboticSurgerybyURL/${encodeURIComponent(pageUrl)}`;
        const response = await fetch(apiUrl);
        if (response.ok) {
            const result = await response.json();
            if (Array.isArray(result) && result.length > 0) {
                initialData = result[0];
            }
        }
    } catch (err) {
        console.error("Error in robotic index getServerSideProps:", err);
    }
    return {
        props: {
            initialData
        }
    };
}

