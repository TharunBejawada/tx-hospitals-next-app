import React from "react";
import Head from "next/head";
import BranchSOHero from "@/components/BranchSO/BranchSOHero";
import BranchSOAbout from "@/components/BranchSO/BranchSOAbout";
import BranchSOReasons from "@/components/BranchSO/BranchSOReasons";
import BranchSOTypes from "@/components/BranchSO/BranchSOTypes";
import BranchSOBenefits from "@/components/BranchSO/BranchSOBenefits";
import BranchSODoctors from "@/components/BranchSO/BranchSODoctors";
import BranchSOCost from "@/components/BranchSO/BranchSOCost";
import BranchSOPackage from "@/components/BranchSO/BranchSOPackage";
import BranchSORisks from "@/components/BranchSO/BranchSORisks";
import BranchSOWhyChoose from "@/components/BranchSO/BranchSOWhyChoose";
import BranchSOCTA from "@/components/BranchSO/BranchSOCTA";
import BranchSOFAQ from "@/components/BranchSO/BranchSOFAQ";

export default function BranchSOPage({ soPageData }) {
    const pageData = soPageData?.PageData || {};
    const seo = pageData?.seo || {};
    const location = soPageData?.Location || "";

    return (
        <>
            <Head>
                {seo.title && <title key="title">{seo.title}</title>}
                {seo.metaDescription && (
                    <meta name="description" content={seo.metaDescription} key="description" />
                )}
                {seo.keywords && (
                    <meta name="keywords" content={seo.keywords} key="keywords" />
                )}
            </Head>

            <main className="w-full min-h-[60vh] bg-white">
                {pageData.hero && (
                    <BranchSOHero
                        hero={pageData.hero}
                        location={location}
                        seoTitle={seo.title}
                    />
                )}

                {pageData.about && (
                    <BranchSOAbout about={pageData.about} />
                )}

                {pageData.reasonsSection && (
                    <BranchSOReasons reasonsSection={pageData.reasonsSection} />
                )}

                {pageData.typesSection && (
                    <BranchSOTypes
                        typesSection={pageData.typesSection}
                        location={location}
                    />
                )}

                {pageData.benefitsSection && (
                    <BranchSOBenefits benefitsSection={pageData.benefitsSection} />
                )}

                {pageData.doctorsSection && (
                    <BranchSODoctors
                        doctorsSection={pageData.doctorsSection}
                        location={location}
                    />
                )}

                {pageData.costSection && (
                    <BranchSOCost costSection={pageData.costSection} />
                )}

                {pageData.packageSection && (
                    <BranchSOPackage
                        packageSection={pageData.packageSection}
                        location={location}
                    />
                )}

                {pageData.risksSection && (
                    <BranchSORisks
                        risksSection={pageData.risksSection}
                        location={location}
                    />
                )}

                {pageData.whyChooseSection && (
                    <BranchSOWhyChoose whyChooseSection={pageData.whyChooseSection} />
                )}

                {pageData.ctaSection && (
                    <BranchSOCTA
                        ctaSection={pageData.ctaSection}
                        location={location}
                    />
                )}

                {pageData.faqSection && (
                    <BranchSOFAQ faqSection={pageData.faqSection} />
                )}
            </main>
        </>
    );
}
