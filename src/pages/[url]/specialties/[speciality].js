import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import SecondaryLayout from '@/components/Layouts/SecondaryLayout';
import HeroSection from '@/components/BranchSpecialityLanding/HeroSection';
import TreatmentsSection from '@/components/BranchSpecialityLanding/TreatmentsSection';
import ConditionsTreatedSection from '@/components/BranchSpecialityLanding/ConditionsTreatedSection';
import SpecialistsSection from '@/components/BranchSpecialityLanding/SpecialistsSection';
import DiagnosticsAndWhenToSeeSection from '@/components/BranchSpecialityLanding/DiagnosticsAndWhenToSeeSection';
import CTASection from '@/components/BranchSpecialityLanding/CTASection';
import FAQSection from '@/components/BranchSpecialityLanding/FAQSection';
import BranchBlogsSection from '@/components/Blogs/BranchBlogsSection';
import { getBranchData } from '@/utils/branchLocationData';
import CONFIG from '@/config';
import Breadcrumb from '@/components/Common/Breadcrumb';
import LocalitySchema from '@/utils/LocalitySchema';

const BranchSpecialtyPage = ({ pageData, error, targetLocation, targetSpeciality, wasBracketUrl }) => {
    const router = useRouter();
    const { url: location, speciality } = router.query;

    // Resolve the blog-friendly location name from the URL slug
    const currentLoc = location || targetLocation || 'uppal';
    const currentSpec = speciality || targetSpeciality || 'cardiology';
    const branch = getBranchData(currentLoc);
    const blogLocation = branch.blogLocation;

    useEffect(() => {
        if (!router.isReady) return;

        const hasBracketInQuery = currentLoc.includes('[') || currentLoc.includes(']') || currentSpec.includes('[') || currentSpec.includes(']');

        if (wasBracketUrl || hasBracketInQuery) {
            const cleanLoc = (targetLocation && !targetLocation.includes('[')) ? targetLocation : 'uppal';
            const cleanSpec = (targetSpeciality && !targetSpeciality.includes('[')) ? targetSpeciality : 'cardiology';
            const canonicalUrl = pageData?.seo?.url || pageData?.seo?.Url || pageData?.seoUrl || `/${cleanLoc}/specialties/${cleanSpec}/`;
            router.replace(canonicalUrl);
        } else if (pageData) {
            const canonicalUrl = pageData?.seo?.url || pageData?.seo?.Url || pageData?.seoUrl;
            if (canonicalUrl) {
                window.history.replaceState(null, '', canonicalUrl);
            }
        } else if (error) {
            router.replace("/");
        }
    }, [pageData, error, currentLoc, currentSpec, targetLocation, targetSpeciality, wasBracketUrl, router]);

    if (error || !pageData) {
        return (
            <SecondaryLayout>
                <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-gray-50">
                    <div className="w-10 h-10 border-4 border-pink-700 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-pink-700 font-semibold font-['Poppins']">Redirecting...</p>
                </div>
            </SecondaryLayout>
        );
    }

    const defaultTitle = currentSpec ? `${currentSpec} at TX Hospitals ${currentLoc}` : 'Specialty | TX Hospitals';
    const defaultDescription = `Expert ${currentSpec} care at TX Hospitals ${currentLoc}.`;

    const content = pageData.PageData || {};

    const formattedLocName = branch.name ? branch.name.replace("TX Hospitals, ", "") : currentLoc;
    const formattedSpecName = currentSpec ? currentSpec.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Specialty';

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: formattedLocName, href: `/${currentLoc}/` },
        { label: formattedSpecName }
    ];

    const canonicalPageUrl = pageData?.seo?.url || pageData?.seo?.Url || pageData?.seoUrl || `/${currentLoc}/specialties/${currentSpec}/`;

    return (
        <>
            <Head>
                <title>{content?.seo?.title || defaultTitle}</title>
                <meta name="description" content={content?.seo?.metaDescription || defaultDescription} key="description" />
                {content?.seo?.keywords && <meta name="keywords" content={content.seo.keywords} key="keywords" />}
            </Head>

            <LocalitySchema
                location={currentLoc}
                speciality={formattedSpecName}
                pageTitle={content?.seo?.title || defaultTitle}
                description={content?.seo?.metaDescription || defaultDescription}
                pageUrl={canonicalPageUrl}
            />

            <SecondaryLayout>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
                    <Breadcrumb items={breadcrumbItems} />
                </div>
                <main className="w-full bg-white font-['Poppins']">
                    {/* 1. Hero / Header Section */}
                    <HeroSection pageData={content} location={currentLoc} speciality={currentSpec} />

                    {/* 2. Treatments Section */}
                    {content.treatments && (
                        <TreatmentsSection data={content.treatments} />
                    )}

                    {/* 3. Conditions Treated Section */}
                    {content.conditionsTreated && (
                        <ConditionsTreatedSection data={content.conditionsTreated} />
                    )}

                    {/* 4. Specialists Section */}
                    <SpecialistsSection data={content.specialists || null} location={currentLoc} speciality={currentSpec} />

                    {/* 5. Diagnostics and When To See Section */}
                    {(content.diagnostics || content.whenToSee) && (
                        <DiagnosticsAndWhenToSeeSection diagnostics={content.diagnostics} whenToSee={content.whenToSee} speciality={currentSpec} />
                    )}

                    {/* 6. CTA Section */}
                    {content.cta && (
                        <CTASection data={content.cta} />
                    )}

                    {/* 7. Blogs Section */}
                    <BranchBlogsSection location={blogLocation} maxCards={3} />

                    {/* 8. FAQ + Map Section */}
                    {content.faqs && (
                        <FAQSection data={content.faqs} location={currentLoc} />
                    )}
                </main>
            </SecondaryLayout>
        </>
    );
};

export async function getServerSideProps(context) {
    let { url: location, speciality } = context.params;

    const isBracketLocation = !location || location.includes('[') || location.includes(']');
    const isBracketSpeciality = !speciality || speciality.includes('[') || speciality.includes(']');

    const targetLocation = isBracketLocation ? 'uppal' : location;
    const targetSpeciality = isBracketSpeciality ? 'cardiology' : speciality;

    let pageData = null;
    let error = false;

    try {
        const canonicalPath = `/${targetLocation}/specialties/${targetSpeciality}/`;
        const apiUrl = `${CONFIG.API_BASE_URL}/api/speciality-landing-pages/by-url?url=${encodeURIComponent(canonicalPath)}`;
        const res = await fetch(apiUrl);
        if (res.ok) {
            pageData = await res.json();
        } else {
            error = true;
        }
    } catch (err) {
        console.error("Error fetching specialty landing page data:", err);
        error = true;
    }

    return {
        props: {
            pageData,
            error,
            targetLocation,
            targetSpeciality,
            wasBracketUrl: isBracketLocation || isBracketSpeciality
        }
    };
}

export default BranchSpecialtyPage;
