import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import ProcedureHeroSection from "./ProcedureHeroSection";
import ProcedureAppointmentForm from "./ProcedureAppointmentForm";
import WhatIsProcedure from "./WhatIsProcedure";
import WhyProcedureNeeded from "./WhyProcedureNeeded";
import BookAppointmentForm from "../Blogs/BookAppointemntForm";
import SymptomsAddresses from "./SymptomsAddresses";
import RisksOfAvoiding from "./RisksOfAvoiding";
import TypesOfProcedures from "./TypesOfProcedures";
import HowProcedurePerformed from "./HowProcedurePerformed";
import BenefitsAndRecovery from "./BenefitsAndRecovery";
import WhyChooseProcedure from "./WhyChooseProcedure";
import TakeChargeOfHealth from "./TakeChargeOfHealth";
import ProcedureFAQ from "./ProcedureFAQ";
import CONFIG from "@/config";

export default function ProcedureDetailsPage({ url }) {
    console.log("Received URL prop:", url);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!url) return;
        const fetchData = async () => {
            try {
                // Fetching from the new API with encoded slug
                const response = await axios.get(
                    `${CONFIG.API_BASE_URL}/new-procedures/getNewProceduresbyURL/${encodeURIComponent(url)}`
                );
                setData(response?.data[0]);
            } catch (err) {
                console.error("Error fetching procedure data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    useEffect(() => {
        if (!loading && (!data || !data.pHeroSection)) {
            router.replace("/");
        }
    }, [loading, data, router]);

    if (loading) {
        return (
            <div className="flex flex-row justify-center items-center mt-20 mb-4 gap-2">
                <div className="w-8 h-8 border-2 border-pink-700 border-t-transparent rounded-full animate-spin"></div>
                <div className="text-pink-700 text-lg font-medium animate-pulse">
                    Loading...
                </div>
            </div>
        );
    }

    if (!data || !data.pHeroSection) {
        return null;
    }

    const { pHeroSection, WhatIsProcedure: whatIsProcedureData, whyIsProcedureNeeded, conditionsTreated, symptoms, risksAvoided, typesOfProcedure, howIsProcedurePerformed, pDuration, benefits, recovery, whyChoose, takeCharge, faqs } = data;

    return (
        <>
            <Head>
                <title>{data?.seoTitle} - TX Hospitals</title>
                <meta name="description" content={data?.metaDescription} />
                <meta name="keywords" content={data?.metaKeywords} />
            </Head>

            <div className="font-inter bg-white text-black text-left">
                {/* Hero Section */}
                <div className="max-w-7xl mx-auto md:px-12 px-2 -mt-4 md:pt-12">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
                        <ProcedureHeroSection pHeroSection={pHeroSection} />
                        <ProcedureAppointmentForm heading={pHeroSection.heading} />
                    </div>
                </div>

                {/* What is Procedure Section */}
                {whatIsProcedureData && whatIsProcedureData.length > 0 && (
                    <WhatIsProcedure data={whatIsProcedureData} />
                )}

                {/* Why Procedure Needed & Conditions Treated Section */}
                <WhyProcedureNeeded
                    whyData={whyIsProcedureNeeded}
                    conditionsData={conditionsTreated}
                    openModal={() => setShowModal(true)}
                />

                {/* Symptoms Section */}
                {symptoms && symptoms.length > 0 && (
                    <SymptomsAddresses data={symptoms} />
                )}

                {/* Risks Avoided Section */}
                {risksAvoided && risksAvoided.length > 0 && (
                    <RisksOfAvoiding data={risksAvoided} />
                )}

                {/* Types of Procedures Section */}
                {typesOfProcedure && typesOfProcedure.length > 0 && (
                    <TypesOfProcedures
                        data={typesOfProcedure}
                        openModal={() => setShowModal(true)}
                    />
                )}

                {/* How Procedure Performed Section */}
                {howIsProcedurePerformed && howIsProcedurePerformed.length > 0 && (
                    <HowProcedurePerformed
                        data={howIsProcedurePerformed}
                        durationData={pDuration}
                        openModal={() => setShowModal(true)}
                    />
                )}

                {/* Benefits and Recovery Section */}
                <BenefitsAndRecovery benefitsData={benefits} recoveryData={recovery} />

                {/* Why Choose Section */}
                {whyChoose && whyChoose.length > 0 && (
                    <WhyChooseProcedure data={whyChoose} openModal={() => setShowModal(true)} />
                )}

                {/* Take Charge Section */}
                {takeCharge && takeCharge.length > 0 && (
                    <TakeChargeOfHealth data={takeCharge} openModal={() => setShowModal(true)} />
                )}

                {/* FAQ Section */}
                {faqs && faqs.length > 0 && (
                    <ProcedureFAQ faqs={faqs} />
                )}

                {/* Appointment Modal */}
                <BookAppointmentForm showModal={showModal} setShowModal={setShowModal} />
            </div>
        </>
    );
}
