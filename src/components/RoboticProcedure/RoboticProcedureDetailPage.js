"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import SecondaryLayout from "@/components/Layouts/SecondaryLayout";
import RPHeader from "@/components/RoboticProcedure/RPHeader";
import RPWhatIs from "@/components/RoboticProcedure/RPWhatIs";
import RPBenefits from "@/components/RoboticProcedure/RPBenefits";
import RPCandidates from "@/components/RoboticProcedure/RPCandidates";
import RPConditions from "@/components/RoboticProcedure/RPConditions";
import RPSteps from "@/components/RoboticProcedure/RPSteps";
import RPComparison from "@/components/RoboticProcedure/RPComparison";
import RPCosts from "@/components/RoboticProcedure/RPCosts";
import RPSafetyAndCandidates from "@/components/RoboticProcedure/RPSafetyAndCandidates";
import RPWhyChoose from "@/components/RoboticProcedure/RPWhyChoose";
import RPBooking from "@/components/RoboticProcedure/RPBooking";
import RPFAQ from "@/components/RoboticProcedure/RPFAQ";
import BookAppointmentForm from "@/components/Blogs/BookAppointemntForm";

export default function RoboticProcedureDetailPage() {
    const router = useRouter();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Wait until the router is ready (asPath is populated)
        if (!router.isReady) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Use the actual current URL path — works for any robotic surgery
                // e.g. /specialities/robotic-gynaecology-surgery-in-hyderabad-india/robotic-total-hysterectomy-surgery
                //      /specialities/robotic-cancer-surgery-in-hyderabad/robotic-prostatectomy
                const cleanPath = router.asPath.split("?")[0].replace(/\/+$/, ""); // strip query params and trailing slash
                const encodedUrl = encodeURIComponent(cleanPath);
                const apiUrl = `https://api.txhospitals.vgworld.in/robotic-procedures/getRoboticProceduresbyURL/${encodedUrl}`;

                const response = await axios.get(apiUrl);
                if (response.data && response.data.length > 0) {
                    setData(response.data[0]);
                } else {
                    setError("No data found for this procedure.");
                }
            } catch (err) {
                console.error("Error fetching robotic procedure data:", err);
                setError("Failed to load procedure data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router.isReady, router.asPath]);

    useEffect(() => {
        if (!loading && (error || !data)) {
            router.replace("/");
        }
    }, [loading, error, data, router]);

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
        return null;
    }

    return (
        <>
            <Head>
                <title>{data.seoTitle || data.rpTitle}</title>
                <meta name="description" content={data.metaDescription} />
                <meta name="keywords" content={data.metaKeywords} />
            </Head>
            <SecondaryLayout>
                <div className="pb-10">
                    {/* Hero Section */}
                    {data && <RPHeader data={data} onBookNow={() => setShowModal(true)} />}

                    {/* What Is Procedure */}
                    {data.whatIsRP && data.whatIsRP.length > 0 && <RPWhatIs data={data.whatIsRP} />}

                    {/* Benefits of Robotic Surgery */}
                    {data.benefits && data.benefits.length > 0 && <RPBenefits data={data.benefits} />}

                    {/* Conditions Treated */}
                    {data.conditionsTreated && data.conditionsTreated.length > 0 && <RPConditions data={data.conditionsTreated} onBookNow={() => setShowModal(true)} />}

                    {/* Step-by-Step Procedure */}
                    {data.procedureSteps && data.procedureSteps.length > 0 && <RPSteps data={data.procedureSteps} onBookNow={() => setShowModal(true)} />}

                    {/* Robotic vs Traditional Comparison */}
                    {data.roboticVsTraditional && data.roboticVsTraditional.length > 0 && <RPComparison data={data.roboticVsTraditional} />}

                    {/* Procedure Costs and Factors */}
                    {data.procedureCosts && data.procedureCosts.length > 0 && <RPCosts data={data.procedureCosts} onBookNow={() => setShowModal(true)} />}

                    {/* Safety Advantages & Ideal Candidates */}
                    <RPSafetyAndCandidates safetyData={data.isProcedureSafe} candidateData={data.idealCandidates} />

                    {/* Why Choose TX Hospitals */}
                    {data.whyChoose && data.whyChoose.length > 0 && <RPWhyChoose data={data.whyChoose} />}

                    {/* Book a Consultation Section */}
                    {data.bookingField && data.bookingField.length > 0 && <RPBooking data={data.bookingField} onBookNow={() => setShowModal(true)} />}

                    {/* Frequently Asked Questions (FAQs) */}
                    {data.faqs && data.faqs.length > 0 && <RPFAQ data={data.faqs} />}
                </div>

                <BookAppointmentForm showModal={showModal} setShowModal={setShowModal} />
            </SecondaryLayout>
        </>
    );
}
