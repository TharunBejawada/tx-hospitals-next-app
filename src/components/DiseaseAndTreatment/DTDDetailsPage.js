import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import CONFIG from "@/config";
import DTHeroSection from "@/components/DiseaseAndTreatment/DTHeroSection";
import DTAppointmentForm from "@/components/DiseaseAndTreatment/DTAppointmentForm";
import BookAppointmentForm from "../Blogs/BookAppointemntForm";
import WhatIsDT from "@/components/DiseaseAndTreatment/WhatIsDT";
import TypesOfDT from "@/components/DiseaseAndTreatment/TypesOfDT";
import CausesAndRiskFactors from "@/components/DiseaseAndTreatment/CausesAndRiskFactors";
import SymptomsDT from "@/components/DiseaseAndTreatment/SymptomsDT";
import WhenToSeekCare from "@/components/DiseaseAndTreatment/WhenToSeekCare";
import DiagnosisDT from "@/components/DiseaseAndTreatment/DiagnosisDT";
import TreatmentOptionsDT from "@/components/DiseaseAndTreatment/TreatmentOptionsDT";
import ComplicationsDT from "@/components/DiseaseAndTreatment/ComplicationsDT";
import PreventionDT from "@/components/DiseaseAndTreatment/PreventionDT";
import WhenToSeekMedicalHelpDT from "@/components/DiseaseAndTreatment/WhenToSeekMedicalHelpDT";
import WhyChooseUsDT from "@/components/DiseaseAndTreatment/WhyChooseUsDT";
import TakeFirstStepDT from "@/components/DiseaseAndTreatment/TakeFirstStepDT";
import FAQDT from "@/components/DiseaseAndTreatment/FAQDT";

export default function DTDDetailsPage({ url }) {
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!url) return;
        const fetchData = async () => {
            try {
                // Fetching from the new API with encoded slug
                const response = await axios.get(
                    `${CONFIG.API_BASE_URL}/new-dieseasesandtreatments/getNewDATbyURL/${encodeURIComponent(url)}`
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
        if (!loading && !data) {
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

    if (!data) {
        return null;
    }

    return (
        <>
            <Head>
                <title>{data.seoTitle}</title>
                <meta name="description" content={data.metaKeywords} />
                <meta name="keywords" content={data.metaDescription} />
            </Head>

            {(data.dtTitle || data.dtdescription) && (
                <div className="max-w-7xl mx-auto md:px-12 px-4 py-10 md:py-7">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 bg-white">
                        <DTHeroSection
                            dtTitle={data.dtTitle}
                            dtdescription={data.dtdescription}
                            onSchedule={() => setShowModal(true)}
                            onLearnMore={() => {
                                const el = document.getElementById("dt-content");
                                if (el) el.scrollIntoView({ behavior: "smooth" });
                            }}
                        />
                        <DTAppointmentForm heading={data.dtTitle} />
                    </div>
                </div>
            )}
            {/* What is DT Section */}
            {data.whatIsdt && data.whatIsdt.length > 0 && (
                <WhatIsDT data={data.whatIsdt} />
            )}

            {/* Types of DT Section */}
            {data.typesOfdt && data.typesOfdt.length > 0 && (
                <TypesOfDT data={data.typesOfdt} openModal={() => setShowModal(true)} />
            )}

            {/* Causes & Risk Factors Section */}
            {data.causesandRiskFactors && data.causesandRiskFactors.length > 0 && (
                <CausesAndRiskFactors data={data.causesandRiskFactors} openModal={() => setShowModal(true)} />
            )}

            {/* Symptoms Section */}
            {data.symptoms && data.symptoms.length > 0 && (
                <SymptomsDT data={data.symptoms} />
            )}

            {/* When to Seek Care Section */}
            {data.whentoSeekCare && data.whentoSeekCare.length > 0 && (
                <WhenToSeekCare data={data.whentoSeekCare} openModal={() => setShowModal(true)} />
            )}

            {/* Diagnosis Section */}
            {data.diagnosis && data.diagnosis.length > 0 && (
                <DiagnosisDT data={data.diagnosis} openModal={() => setShowModal(true)} />
            )}

            {/* Treatment Options Section */}
            {data.treatmentOptions && data.treatmentOptions.length > 0 && (
                <TreatmentOptionsDT data={data.treatmentOptions} />
            )}

            {/* Complications Section */}
            {data.complications && data.complications.length > 0 && (
                <ComplicationsDT data={data.complications} />
            )}

            {/* Prevention Section */}
            {data.prevention && data.prevention.length > 0 && (
                <PreventionDT data={data.prevention} />
            )}

            {/* When to Seek Medical Help Section */}
            {data.whentoSeekMedicalCare && data.whentoSeekMedicalCare.length > 0 && (
                <WhenToSeekMedicalHelpDT data={data.whentoSeekMedicalCare} />
            )}

            {/* Why Choose Us Section */}
            {data.whyChooseUs && data.whyChooseUs.length > 0 && (
                <WhyChooseUsDT data={data.whyChooseUs} />
            )}

            {/* Take First Step Section */}
            {data.takefirstStep && data.takefirstStep.length > 0 && (
                <TakeFirstStepDT data={data.takefirstStep} openModal={() => setShowModal(true)} />
            )}

            {/* FAQs Section */}
            {data.faqs && data.faqs.length > 0 && (
                <FAQDT faqs={data.faqs} />
            )}

            <BookAppointmentForm showModal={showModal} setShowModal={setShowModal} />
        </>
    );
}
