import React from 'react';
import HeroSection from './HeroSection';
import SpecialtiesSection from './SpecialtiesSection';
import DoctorsSection from './DoctorsSection';
import SecondOpinionSection from './SecondOpinionSection';
import EmergencySection from './EmergencySection';
import CTASection from './CTASection';
import FAQSection from './FAQSection';
import BranchBlogsSection from '@/components/Blogs/BranchBlogsSection';
import { getBranchData } from '@/utils/branchLocationData';

const BranchSpecialtiesLanding = ({ location }) => {
    // Resolve the blog-friendly location name from the URL slug
    const branch = getBranchData(location);
    const blogLocation = branch.blogLocation;

    return (
        <div className="w-full flex flex-col" >
            {/* 1. Hero Section */}
            <HeroSection location={location} />

            {/* 2. Specialties Section */}
            <SpecialtiesSection location={location} />

            {/* 3. Doctors Section */}
            <DoctorsSection location={location} />

            {/* 4. Second Opinion Support Section */}
            <SecondOpinionSection location={location} />

            {/* 4.5 Emergency Section for Uppal */}
            {location?.toLowerCase() === 'uppal' && (
                <EmergencySection location={location} />
            )}

            {/* 5. CTA Section */}
            <CTASection location={location} />

            {/* 6. Blogs Section */}
            <BranchBlogsSection location={blogLocation} maxCards={3} />

            {/* 7. FAQ + Map Section */}
            <FAQSection location={location} />

        </div>
    );
};

export default BranchSpecialtiesLanding;
