import React from "react";
import Head from "next/head";
import DiagnosticHero from "@/components/DiagnosticsPage/DiagnosticHero";
import DiagnosticAbout from "@/components/DiagnosticsPage/DiagnosticAbout";
import DiagnosticHighlights from "@/components/DiagnosticsPage/DiagnosticHighlights";
import DiagnosticWhyDone from "@/components/DiagnosticsPage/DiagnosticWhyDone";
import DiagnosticVisualCards from "@/components/DiagnosticsPage/DiagnosticVisualCards";
import DiagnosticTypes from "@/components/DiagnosticsPage/DiagnosticTypes";
import DiagnosticSteps from "@/components/DiagnosticsPage/DiagnosticSteps";
import DiagnosticResults from "@/components/DiagnosticsPage/DiagnosticResults";
import DiagnosticCTA from "@/components/DiagnosticsPage/DiagnosticCTA";

export default function DiagnosticPage({ diagnosticPageData }) {
    const pageData = diagnosticPageData?.PageData || {};
    const seo = pageData?.seo || {};
    const diagnosticName = diagnosticPageData?.DiagnosticName || "";

    return (
        <>
            <Head>
                {(seo.title || diagnosticName) && (
                    <title key="title">{seo.title || diagnosticName}</title>
                )}
                {seo.metaDescription && (
                    <meta name="description" content={seo.metaDescription} key="description" />
                )}
                {seo.keywords && (
                    <meta name="keywords" content={seo.keywords} key="keywords" />
                )}
            </Head>

            <main className="w-full min-h-[60vh] bg-white">
                {pageData.hero && (
                    <DiagnosticHero
                        hero={pageData.hero}
                        diagnosticName={diagnosticName}
                        seoTitle={seo.title}
                    />
                )}

                {pageData.about && (
                    <DiagnosticAbout about={pageData.about} />
                )}

                {pageData.highlightsSection && (
                    <DiagnosticHighlights highlightsSection={pageData.highlightsSection} />
                )}

                {pageData.whyDoneSection && (
                    <DiagnosticWhyDone
                        whyDoneSection={pageData.whyDoneSection}
                        diagnosticName={diagnosticName}
                    />
                )}

                {pageData.visualCardsSection && (
                    <DiagnosticVisualCards visualCardsSection={pageData.visualCardsSection} />
                )}

                {pageData.typesSection && (
                    <DiagnosticTypes typesSection={pageData.typesSection} />
                )}

                {pageData.stepsSection && (
                    <DiagnosticSteps stepsSection={pageData.stepsSection} />
                )}

                {pageData.resultsSection && (
                    <DiagnosticResults resultsSection={pageData.resultsSection} />
                )}

                {pageData.ctaSection && (
                    <DiagnosticCTA ctaSection={pageData.ctaSection} />
                )}
            </main>
        </>
    );
}
