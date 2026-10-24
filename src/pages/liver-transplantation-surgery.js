import React, { useState } from 'react';
import Head from 'next/head';
import SecondaryLayout from '@/components/Layouts/SecondaryLayout';
import HeroSection from '@/components/LiverTransplant/HeroSection';
import AboutSection from '@/components/LiverTransplant/AboutSection';
import ServicesSection from '@/components/LiverTransplant/ServicesSection';
import EvaluationSection from '@/components/LiverTransplant/EvaluationSection';
import CtaSection from '@/components/LiverTransplant/CtaSection';
import InfrastructureSection from '@/components/LiverTransplant/InfrastructureSection';
import DonorSafetySection from '@/components/LiverTransplant/DonorSafetySection';
import WhyChooseSection from '@/components/LiverTransplant/WhyChooseSection';
import FinalCtaSection from '@/components/LiverTransplant/FinalCtaSection';
import BookAppointmentForm from "@/components/Blogs/BookAppointemntForm";
import TransplantSurgeons from '@/components/LiverTransplant/TransplantSurgeons';
import Breadcrumb from "@/components/Common/Breadcrumb";

export default function LiverTransplantationSurgery() {
    // State Management
    const [showModal, setShowModal] = useState(false);

    // Handler Functions
    const handleCall = () => {
        window.location.href = "tel:9144514459";
    };

    const surgeonsData = [
        {
            heading: "Best Liver Transplant Surgeons in Hyderabad",
            description: "Our expert liver transplant team delivers advanced surgical precision, comprehensive critical care support and improved transplant outcomes using state-of-the-art technology and global treatment protocols.",
            doctors: [
                {
                    name: "Dr. Bharath Vattekunta",
                    designation: "Lead Consultant – HPB & Liver Transplant Surgeon",
                    experience: "16+ Years",
                    location: "Banjara Hills, Hyderabad",
                    url: "https://txhospitals.in/dr-bharath-vattekunta-best-liver-transplant-surgeon-hyderabad/",
                    image: "https://tx-hospital-doctor-images.s3.ap-south-2.amazonaws.com/doctors/1769595011814-Dr.%20BHARATH.webp"
                },
                {
                    name: "Dr. Hareesh Tarigoppula",
                    designation: "Consultant – Liver Transplant Anaesthesia & Liver Intensive Care",
                    experience: "8+ Years",
                    location: "Banjara Hills, Hyderabad",
                    url: "https://txhospitals.in/dr-hareesh-tarigoppula-liver-transplant-anaesthesia/",
                    image: "https://tx-hospital-doctor-images.s3.ap-south-2.amazonaws.com/doctors/1772187753528-Dr.%20Hareesh%20Tarigoppula.webp"
                },
                {
                    name: "Dr. Naren Mandalapu",
                    designation: "Associate Consultant – Hepato-Pancreato-Biliary Surgery & Liver Transplantation",
                    experience: "8+ Years",
                    location: "Banjara Hills, Hyderabad",
                    url: "https://txhospitals.in/dr-naren-mandalapu-hpb-liver-transplant-surgeon/",
                    image: "https://tx-hospital-doctor-images.s3.ap-south-2.amazonaws.com/doctors/1772188836050-Dr.%20Naren%20Mandalapu.webp"
                },
                {
                    name: "Dr. Shravan Reddy G",
                    designation: "Consultant - Anaesthesia & Critical Care",
                    experience: "8+ Years",
                    location: "Banjara Hills, Hyderabad",
                    url: "https://txhospitals.in/dr-shravan-reddy-g-anaesthesia-critical-care/",
                    image: "https://tx-hospital-doctor-images.s3.ap-south-2.amazonaws.com/doctors/1772190239905-Dr.%20Shravan%20Reddy%20G.webp"
                },
                {
                    name: "Dr. Vinod W. Chahare",
                    designation: "Consultant - Medical Gastroenterologist, Hepatologist and Intervention Endoscopist",
                    experience: "11+ Years",
                    location: "Banjara Hills, Hyderabad",
                    url: "https://txhospitals.in/dr-w-vinod-chahare/",
                    image: "https://tx-hospital-doctor-images.s3.ap-south-2.amazonaws.com/doctors/1757067986860-Dr%20Vinod%20W%20Chahare.webp"
                },
            ]
        }
    ];

    // Data Objects
    const heroData = {
        highlightedTitle: "Liver Transplantation Surgery",
        subtitle: "in Hyderabad, India",
        description: "Advanced Liver Transplant Care with Compassion, Precision & Global Standards. A new beginning awaits — hope, healing and world-class expertise.",
        bannerImage: "/assets/surgeries/live-transplant/Transplantation Surgery  Banner Image.webp",
        backgroundImage: "/assets/surgeries/live-transplant/Transplantation Surgery  Banner Image Back Box.webp",
        buttons: [
            {
                text: "Book An Appointment",
                icon: "/assets/surgeries/live-transplant/Book an Appointment  Icon 3.webp",
                alt: "Calendar Icon",
                className: "bg-[#B12C49] text-white hover:bg-[#96253d]",
                onClick: () => setShowModal(true)
            },
            {
                text: "Call Now",
                icon: "/assets/surgeries/live-transplant/Call Icon 3.webp",
                alt: "Phone Icon",
                width: 20,
                height: 20,
                className: "border-2 border-[#B12C49] text-[#B12C49] bg-[#fde8eb] hover:bg-[#fbdada]",
                onClick: handleCall
            }
        ]
    };

    const aboutData = {
        whatIs: {
            title: "What is a Liver Transplant?",
            paragraphs: [
                "A liver transplant is a surgical procedure in which a diseased or failing liver is replaced with a healthy liver from living donor or deceased donor. It is recommended for patients with end-stage liver disease or acute liver failure when medical treatment is no longer effective.",
                "With modern surgical techniques, meticulous patient selection and structured post-operative care, Liver Transplantation surgery in India today offers excellent survival outcomes.",
                <>Our expert hepatology team at <span className="text-[#B12C49] font-bold">TX Hospitals</span> carefully evaluates every patient to determine the right timing, suitability and safest transplant approach, ensuring outcomes that meet international benchmarks followed by the <span className="text-[#B12C49] font-bold underline">Best Liver Transplant Hospitals in Hyderabad.</span></>
            ]
        },
        whoNeeds: {
            title: "Who Needs a Liver Transplant?",
            subtitle: "You may be advised a liver transplant if you have:",
            icon: "/assets/surgeries/live-transplant/Right Icon.webp",
            list: [
                "End-stage liver disease or liver cirrhosis",
                "Acute liver failure",
                "Alcohol-related liver disease",
                "Chronic hepatitis B or C with liver damage",
                "Fatty liver disease (NASH / NAFLD)",
                "Metabolic or genetic liver disorders",
                "Pediatric liver diseases",
                "Liver failure with complications such as ascites, jaundice, bleeding or encephalopathy"
            ]
        }
    };

    const servicesData = {
        header: {
            title: "Comprehensive",
            highlightedPart: "Liver Transplant",
            subtitle: "Services",
            description: <>At <span className="text-[#B12C49] font-bold">TX Hospitals,</span> we provide a complete spectrum of liver transplant services under one roof:</>
        },
        services: [
            {
                title: "Living Donor <br /> Liver Transplantation (LDLT)",
                description: "A healthy donor donates a portion of their liver, which regenerates naturally in both donor and recipient. This allows timely transplantation with excellent long-term outcomes."
            },
            {
                title: "Emergency <br /> Liver Transplant",
                description: "Rapid evaluation and prioritization for patients with acute liver failure or life-threatening complications requiring immediate intervention."
            },
            {
                title: "Pediatric <br /> Liver Transplantation",
                description: "Specialized transplant care for children with congenital or acquired liver diseases, led by the best pediatric liver transplant specialist in India, supported by multidisciplinary team"
            }
        ]
    };

    const evaluationData = {
        content: {
            title: "Comprehensive",
            highlightedPart: "Pre-Transplant",
            subtitle: "Evaluation",
            paragraphs: [
                "Successful liver transplantation begins with thorough preparation. At TX Hospitals, our multidisciplinary transplant team conducts:",
                "This holistic approach ensures that every patient is physically, emotionally and medically prepared before surgery under the supervision of a dedicated Liver Transplant Specialist."
            ]
        },
        items: [
            { title: "Medical Assessment", desc: "Detailed medical assessment and liver disease staging", icon: "Medical Assessment Icon.webp" },
            { title: "Blood Tests", desc: "Advanced blood tests and liver function evaluation", icon: "Blood Tests Icon.webp" },
            { title: "Imaging Studies", desc: "CT, MRI, Doppler ultrasound imaging", icon: "Imaging Studies Icon.webp" },
            { title: "Health Screening", desc: "Cardiac, pulmonary, and infection screening", icon: "Health Screening Icon.webp" },
            { title: "Nutrition", desc: "Nutritional assessment and optimization", icon: "Nutrition Icon.webp" },
            { title: "Donor Evaluation", desc: "Psychological evaluation and donor compatibility testing", icon: "Donor Evaluation Icon.webp" }
        ]
    };

    const ctaButtons = [
        {
            text: "Book An Appointment",
            icon: "/assets/surgeries/live-transplant/Book an Appointment  Icon 3.webp",
            alt: "Calendar Icon",
            className: "border-2 border-white text-white",
            iconBgClass: "p-2 rounded-lg",
            iconClass: "w-7 h-7 object-contain brightness-0 invert transition-all group-hover:brightness-100 group-hover:invert-0",
            onClick: () => setShowModal(true)
        },
        {
            text: "Call Now",
            icon: "/assets/surgeries/live-transplant/Call Icon 3.webp",
            alt: "Phone Icon",
            width: 24,
            height: 24,
            className: "bg-white text-[#B12C49] shadow-2xl hover:bg-gray-100",
            iconBgClass: "p-2 rounded-lg",
            iconClass: "w-6 h-6 object-contain",
            onClick: handleCall
        }
    ];

    const infrastructureData = {
        header: {
            title: "Expert Surgical Care &",
            highlightedPart: "Advanced Infrastructure",
            description: `Liver transplant surgeries at TX Hospitals are performed by some of the <span class="text-[#B12C49] font-bold">Top Liver Transplantation Surgeons in Hyderabad</span>, using state-of-the-art operating theaters and advanced anesthesia systems.`
        },
        infrastructure: {
            title: "Our Infrastructure",
            items: [
                { text: "Advanced organ preservation and surgical technologies", icon: "Our Infrastructure Icon 1.webp" },
                { text: "Dedicated liver transplant intensive care units", icon: "Our Infrastructure Icon 2.webp" },
                { text: "Strict infection-control protocols and sterile pathways", icon: "Our Infrastructure Icon 3.webp" },
                { text: "24/7 transplant emergency response teams", icon: "Our Infrastructure Icon 4.webp" }
            ]
        },
        postCare: {
            title: "Post-Transplant Care & Long-Term Follow-Up",
            description: `Our commitment to patients extends well beyond surgery. Post-transplant care at <span class="font-bold underline">TX Hospitals</span> includes:`,
            items: [
                { text: "Personalized immunosuppression management", icon: "Post Transplant Care  & Long -Term Follow up Ionc 1.webp" },
                { text: "Continuous monitoring for rejection and infections", icon: "Post Transplant Care  & Long -Term Follow up Ionc 2.webp" },
                { text: "Regular liver function and graft surveillance", icon: "Post Transplant Care  & Long -Term Follow up Ionc 3.webp" },
                { text: "Nutrition therapy, physiotherapy and rehabilitation", icon: "Post Transplant Care  & Long -Term Follow up Ionc 4.webp" },
                { text: "Lifestyle guidance and preventive health monitoring", icon: "Post Transplant Care  & Long -Term Follow up Ionc 5.webp" },
                { text: "Lifelong follow-up through specialized transplant clinics", icon: "Post Transplant Care  & Long -Term Follow up Ionc 6.webp" }
            ],
            footer: `This structured follow-up model, guided by <span class="font-bold">Liver Transplant Specialists in Hyderabad at TX Hospitals</span>, is essential for long-term graft survival and sustained quality of life.`
        }
    };

    const safetyData = {
        content: {
            title: "Living Donor Safety & ",
            highlightedPart: "Ethical Practices",
            description: "TX Hospitals follows the highest ethical standards in living donor liver transplantation. We are committed to complete transparency and donor well-being at every stage.",
            items: [
                "Strict donor eligibility and medical screening",
                "Independent donor counselling and informed consent",
                "Minimally invasive surgical techniques wherever feasible",
                "Comprehensive long-term donor follow-up and care"
            ]
        },
        grid: {
            quote: "Donor safety is our top priority",
            items: [
                { title: "Safe Procedures", icon: "Safe Procedures Icon.webp" },
                { title: "Ethical Care", icon: "Ethical Care Icon.webp" },
                { title: "Expert Team", icon: "Expert Team Icon.webp" },
                { title: "Long term Support", icon: "Long term Support Icon.webp" }
            ]
        }
    };

    const whyChooseData = {
        header: {
            title: "Why Choose",
            highlightedPart: "TX Hospitals",
            subtitle: "for",
            subtitle2: "Liver Transplantation?"
        },
        features: [
            { title: "Highly Experienced Team", desc: "Expert liver transplant surgeons with global training and decades of experience", icon: "Highly Experienced Team icon.webp" },
            { title: "Advanced Technology", desc: "State-of-the-art surgical equipment and global transplant protocols", icon: "Advanced Technology icon.webp" },
            { title: "Ethical Practices", desc: "Transparent and ethical transplant practices with complete donor safety", icon: "Ethical Practices icon.webp" },
            { title: "Excellent Outcomes", desc: "Outstanding patient and graft survival rates above global standards", icon: "Excellent Outcomes icon.webp" },
            { title: "Comprehensive Care", desc: "Complete care under one roof from evaluation to lifelong follow-up", icon: "Comprehensive Care ixon.webp" },
            { title: "International Support", desc: "Dedicated support services for international patients and families", icon: "International Support ixon.webp" }
        ]
    };

    const finalCtaData = {
        title: "Start Your Liver Transplant Journey",
        description: "If you or a loved one is facing advanced liver disease, timely expert care can be life-changing. At TX Hospitals, we are committed to delivering safe, advanced and compassionate liver transplant care tailored to every patient’s needs. Contact TX Hospitals today to schedule a liver transplant consultation and take the first step toward renewed health, confidence and a brighter future.",
        buttons: ctaButtons
    };

    return (
        <>
            <Head>
                <title>Best Liver Transplantation Surgery in Hyderabad, India | TX Hospitals</title>
                <meta name="description" content="TX Hospitals offers advanced liver transplantation surgery in Hyderabad with expert surgeons and world-class facilities. Book your appointment today." />
            </Head>
            <SecondaryLayout>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
                    <Breadcrumb items={[
                        { label: "Home", href: "/" },
                        { label: "Specialities", href: "/specialities/" },
                        { label: "Liver Transplantation Surgery" }
                    ]} />
                </div>
                <div>
                    <HeroSection
                        title={heroData.title}
                        highlightedTitle={heroData.highlightedTitle}
                        subtitle={heroData.subtitle}
                        description={heroData.description}
                        buttons={heroData.buttons}
                        bannerImage={heroData.bannerImage}
                        backgroundImage={heroData.backgroundImage}
                    />
                    <AboutSection
                        whatIsData={aboutData.whatIs}
                        whoNeedsData={aboutData.whoNeeds}
                    />
                    <ServicesSection
                        headerData={servicesData.header}
                        servicesData={servicesData.services}
                    />
                    <EvaluationSection
                        contentData={evaluationData.content}
                        evaluationItems={evaluationData.items}
                    />
                    <CtaSection
                        buttons={ctaButtons}
                    />
                    <TransplantSurgeons
                        data={surgeonsData}
                        onBookNow={() => setShowModal(true)}
                    />
                    <InfrastructureSection
                        headerData={infrastructureData.header}
                        infrastructureData={infrastructureData.infrastructure}
                        postCareData={infrastructureData.postCare}
                    />
                    <DonorSafetySection
                        safetyData={safetyData.content}
                        gridData={safetyData.grid}
                    />
                    <WhyChooseSection
                        headerData={whyChooseData.header}
                        features={whyChooseData.features}
                    />
                    <FinalCtaSection
                        title={finalCtaData.title}
                        description={finalCtaData.description}
                        buttons={finalCtaData.buttons}
                    />
                    <BookAppointmentForm showModal={showModal} setShowModal={setShowModal} />
                </div>
            </SecondaryLayout>
        </>
    );
}
