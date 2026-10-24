import React from 'react';
import Head from 'next/head';
import SecondaryLayout from '@/components/Layouts/SecondaryLayout';
import MiyapurHero from '@/components/Miyapur/MiyapurHero';
import MiyapurAbout from '@/components/Miyapur/MiyapurAbout';
import MiyapurSpecialties from '@/components/Miyapur/MiyapurSpecialties';
import MiyapurRoboticKnee from '@/components/Miyapur/MiyapurRoboticKnee';
import MiyapurDoctors from '@/components/Miyapur/MiyapurDoctors';
import MiyapurWhyChoose from '@/components/Miyapur/MiyapurWhyChoose';
import MiyapurTestimonials from '@/components/Miyapur/MiyapurTestimonials';
import MiyapurBookConsultation from '@/components/Miyapur/MiyapurBookConsultation';
import MiyapurLocations from '@/components/Miyapur/MiyapurLocations';
import MiyapurBlogs from '@/components/Miyapur/MiyapurBlogs';
import MiyapurFAQ from '@/components/Miyapur/MiyapurFAQ';
import Breadcrumb from '@/components/Common/Breadcrumb';

export default function MiyapurPage() {
    return (
        <>
            <Head>
                <title>Best Hospital in Miyapur, Hyderabad | TX Hospitals Miyapur</title>
                <meta name="description" content="TX Hospitals Miyapur is a leading multi-specialty hospital in Miyapur, Hyderabad, offering expert doctors, 24/7 emergency care, advanced treatments, ICU facilities services." />
                <meta name="keywords" content="TX Hospitals Miyapur, Best Hospital in Miyapur, Multi Specialty Hospital in Miyapur, Hospital in Miyapur Hyderabad, Best Hospital Near Miyapur, Emergency Hospital in Miyapur, 24/7 Hospital in Miyapur, Healthcare Services in Miyapur, Best Doctors in Miyapur, Super Specialty Hospital in Miyapur, Cashless Hospital in Miyapur, Hospital Near Hafeezpet, Hospital Near Chandanagar, Hospital Near Madinaguda, Hospital Near Kukatpally, Hospital Near Nizampet, Advanced Healthcare in Miyapur" />
            </Head>
            <SecondaryLayout>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
                    <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Miyapur" }]} />
                </div>
                <main>
                    {/* Hero Section */}
                    <MiyapurHero />

                    {/* About Section */}
                    <MiyapurAbout />

                    {/* Specialties Section */}
                    <MiyapurSpecialties />

                    {/* Robotic Knee Section */}
                    <MiyapurRoboticKnee />

                    {/* Doctors Section */}
                    <MiyapurDoctors />

                    {/* Why Choose Section */}
                    <MiyapurWhyChoose />

                    {/* Testimonials Section */}
                    <MiyapurTestimonials />

                    {/* Book Consultation Section */}
                    <MiyapurBookConsultation />

                    {/* Locations Section */}
                    <MiyapurLocations />

                    {/* Blogs Section */}
                    <MiyapurBlogs />

                    {/* FAQ Section */}
                    <MiyapurFAQ />
                </main>
            </SecondaryLayout>
        </>
    );
}
