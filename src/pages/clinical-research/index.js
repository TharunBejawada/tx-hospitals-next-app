import Head from "next/head";
import SecondaryLayout from "@/components/Layouts/SecondaryLayout";
import ClinicalResearchLanding from "@/components/ClinicalResearch/ClinicalResearchLanding";
import Breadcrumb from "@/components/Common/Breadcrumb";

export default function ClinicalResearchPage() {
    return (
        <>
            <Head>
                <title>Clinical Research & Trials | TX Hospitals</title>
                <meta name="description" content="Discover advanced clinical research and trials at TX Hospitals. We conduct Phase II-IV studies, BA/BE, and observational research with ethical excellence and patient safety." />
            </Head>
            <SecondaryLayout hideFooter={true} isClinicalResearch={true}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
                    <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Clinical Research" }]} />
                </div>
                <ClinicalResearchLanding />
            </SecondaryLayout>
        </>
    );
}
