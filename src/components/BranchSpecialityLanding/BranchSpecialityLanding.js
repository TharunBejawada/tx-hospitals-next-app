import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import HeroSection from './HeroSection';
import TreatmentsSection from './TreatmentsSection';
import ConditionsTreatedSection from './ConditionsTreatedSection';
import SpecialistsSection from './SpecialistsSection';
import DiagnosticsAndWhenToSeeSection from './DiagnosticsAndWhenToSeeSection';
import CTASection from './CTASection';
import FAQSection from './FAQSection';
import CONFIG from '@/config';
import Head from 'next/head';

const BranchSpecialityLanding = ({ location, speciality }) => {
    const router = useRouter();
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!location || !speciality) return;

        const fetchData = async () => {
            try {
                const canonicalPath = `/${location}/specialties/${speciality}/`;
                const url = `${CONFIG.API_BASE_URL}/api/speciality-landing-pages/by-url?url=${encodeURIComponent(canonicalPath)}`;
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    setPageData(data);

                    // Update browser url to match canonical API seo url
                    const canonicalUrl = data?.seo?.url || data?.seo?.Url || data?.seoUrl;
                    if (canonicalUrl) {
                        window.history.replaceState(null, '', canonicalUrl);
                    }
                } else {
                    setPageData(null);
                }
            } catch (error) {
                console.error("Error fetching specialty landing page data:", error);
                setPageData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [location, speciality]);

    useEffect(() => {
        if (!loading && !pageData) {
            router.replace("/");
        }
    }, [loading, pageData, router]);

    if (loading) {
        return (
            <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-gray-50">
                <div className="w-16 h-16 border-4 border-[#bd385c] border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-[#bd385c] font-semibold font-['Poppins']">Loading Speciality Data...</p>
            </div>
        );
    }

    if (!pageData) {
        return null;
    }

    // Default to the provided structure from the API
    const content = pageData.PageData || {};

    return (
        <div className="w-full bg-white" >
            {pageData.seo && (
                <Head>
                    {pageData.seo.title && <title>{pageData.seo.title}</title>}
                    {pageData.seo.metaDescription && <meta name="description" content={pageData.seo.metaDescription} key="description" />}
                    {pageData.seo.keywords && <meta name="keywords" content={pageData.seo.keywords} key="keywords" />}
                </Head>
            )}

            {/* 1. Hero / Header Section */}
            <HeroSection pageData={content} location={location} speciality={speciality} />

            {/* 2. Treatments Section */}
            {content.treatments && (
                <TreatmentsSection data={content.treatments} />
            )}

            {/* 3. Conditions Treated Section */}
            {content.conditionsTreated && (
                <ConditionsTreatedSection data={content.conditionsTreated} />
            )}

            {/* 4. Specialists Section */}
            {content.specialists && (
                <SpecialistsSection data={content.specialists} location={location} speciality={speciality} />
            )}

            {/* 5. Diagnostics and When To See Section */}
            {(content.diagnostics || content.whenToSee) && (
                <DiagnosticsAndWhenToSeeSection diagnostics={content.diagnostics} whenToSee={content.whenToSee} speciality={speciality} />
            )}

            {/* 6. CTA Section */}
            {content.cta && (
                <CTASection data={content.cta} />
            )}

            {/* 7. FAQ Section */}
            {content.faqs && (
                <FAQSection data={content.faqs} />
            )}

            {/* Upcoming Sections will be placed here */}
        </div>
    );
};

export default BranchSpecialityLanding;
