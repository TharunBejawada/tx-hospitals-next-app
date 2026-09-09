"use client";
import Image from "next/image";

export default function Management() {

    const directors = [
        {
            id: "management-0",
            name: "Dr. Ghantasala Navaneeth",
            qualification: "MBBS, MS (Orthopaedics)",
            designation: "Director – Business growth & Strategy, TX Hospitals",
            image: "/assets/Management/Dr. Ghantasala Navaneeth.webp",
            description: `Dr. Ghantasala Navaneeth is an experienced Orthopaedic Surgeon 
and a key leader at TX Hospitals, overseeing Business growth & 
Strategy. With over 6 years in clinical practice and healthcare 
management, he ensures streamlined operations, strategic growth 
and excellence across hospital services. His dual expertise in 
medicine and administration strengthens TX Hospitals commitment 
to quality and innovation.`,
        },
        {
            id: "management-1",
            name: "L Panduranga Reddy",
            qualification: "B.Sc, B.E",
            designation: "Director – Group Facility",
            image: "/assets/Management/L Panduranga Reddy.webp",
            description: `Mr. L. Panduranga Reddy, Group Facility Director at TX Hospitals, 
holds a double graduation with over 16 years of extensive experience 
in hospital facility and infrastructure management. He is a key pillar in 
ensuring operational excellence across all hospital units. He oversees 
critical aspects such as infrastructure planning, safety standards and 
facility compliance. Mr. Reddy is also actively involved in implementing 
and maintaining NABH and JCI standards, ensuring that TX Hospitals 
consistently meets national and international benchmarks in quality and 
patient safety. His leadership continues to drive efficiency, compliance 
and a culture of continuous improvement.`,
        },
        {
            id: "management-2",
            name: "Dr. J. Ravi Kiran",
            qualification: "MBBS, MD – Paediatrics",
            designation: "Director – TX Hospital, Miyapur",
            image: "/assets/Management/Dr. J Ravi Kiran.webp",
            description: `Dr. J. Ravi Kiran is a Consultant Neonatologist, Paediatrician, and healthcare leader with over 10 years of experience in child healthcare, newborn care, and hospital administration. As the Director of TX Hospital, Miyapur, he provides strategic leadership in strengthening clinical operations, promoting quality healthcare, and enhancing patient experiences through a collaborative and patient-centric approach.
Dr. Ravi Kiran continues to deliver comprehensive paediatric care, and also Committed to excellence beyond clinical practice, he works closely with multidisciplinary teams to improve patient safety, streamline healthcare services, and foster a culture of innovation and continuous quality improvement. His vision is to build a healthcare environment where clinical excellence, compassionate care, and operational efficiency come together to provide every child and family with the highest standards of medical care.`,
        },
        {
            id: "management-3",
            name: "Dr. Srikanth Vodnala",
            qualification: "DMS, MBA- Healthcare, EGMP-IIMB, LLB",
            designation: "Group Chief Operating Officer",
            image: "/assets/Management/Dr. Srikanth Vodnala.webp",
            description: ` Dr. Srikanth Vodnala is a seasoned healthcare administrator with over
 16 years of diverse experience in healthcare management. An alumnus
 of IIM Bangalore, he holds an MBA specializing in healthcare
 management, complemented by a Bachelor of Law (LLB). His expertise
 spans strategic healthcare leadership, operational efficiency and legal
 aspects of healthcare administration. He plays a pivotal role in shaping
 the hospital’s strategic direction, ensuring compliance and enhancing
 the delivery of quality care to patients.`,
        },
        {
            id: "management-4",
            name: "Sudha Rani Paranam",
            qualification: "FCA, DISA – Chartered Accountant",
            designation: "Chief Financial Officer (CFO) – TX Hospitals",
            image: "/assets/Management/Sudha Rani Paranam.webp",
            description: `Ms. Sudha Rani Paranam is a distinguished Chartered Accountant with over 14 years of experience in financial management across the healthcare, automobile, infrastructure, real estate, retail, and cooperative sectors. As the Chief Financial Officer of TX Hospitals, she oversees financial planning, budgeting, compliance, risk management, and strategic decision-making to ensure the organization's financial strength and sustainable growth. Her expertise lies in delivering data-driven financial insights, automating reporting systems, strengthening governance, and ensuring regulatory compliance. With a strong focus on operational efficiency and fiscal discipline, Ms. Sudha Rani plays a vital role in supporting the hospital's long-term vision while enabling investments that enhance healthcare services and patient care. Her strategic financial leadership continues to contribute significantly to the growth and stability of TX Hospitals.`,
        },
        {
            id: "management-5",
            name: "Shrikant Patnaik",
            qualification: "M.Com (Osmania University), Certification in M&A and Corporate Finance (Swayam)",
            designation: "Finance & Accounts – TX Hospitals",
            image: "/assets/Management/Shrikant Patnaik.webp",
            description: `Mr. Shrikant Patnaik is an accomplished finance and accounting professional with over 8 years of experience across healthcare, hospitals, biotechnology, and other diverse industries. At TX Hospitals, he plays a key role in strengthening the organization's financial operations by ensuring accurate reporting, regulatory compliance, and effective financial governance. His expertise includes financial reporting, accounting operations, forex management, statutory compliance, internal controls, and process optimization. With a detail-oriented and analytical approach, he supports strategic financial planning while enhancing operational efficiency and transparency. His commitment to maintaining robust financial systems and delivering timely, data-driven insights contributes significantly to informed decision-making, sustainable growth, and the continued financial stability of TX Hospitals.`,
        },
        {
            id: "management-6",
            name: "Dr. Naveen Meesala",
            qualification: "B.Sc, MHM, MBA, M.Phil (BITS Pilani), Doctorate.",
            designation: "Director – TX Hospital, Uppal - Operations & Business Development",
            image: "/assets/Management/Dr. Naveen Meesala.webp",
            description: `Dr. Naveen Meesala is a highly accomplished healthcare administrator with over 25 years of experience across private and government healthcare sectors. As Director – Operations & Business Development at TX Hospital, Uppal, he leads strategic initiatives focused on operational excellence, organizational growth, and quality healthcare delivery. His extensive experience in end-to-end hospital management, revenue optimization, team leadership, and healthcare administration continues to play a key role in enhancing operational efficiency and supporting TX Hospital's commitment to delivering quality, patient-focused healthcare.Beginning his administrative career at the age of 21, he was featured in the Apollo Hospitals magazine for his exceptional achievement. Dr. Naveen holds a Doctorate, an MBA from Osmania University, a Master of Hospital Management from Apollo Institute, and an M.Phil. from BITS Pilani. He was also honored with the Best Employee Award (2008) by Katuri Bai Medical College Hospital, Nagpur University.`,
        },
        {
            id: "management-7",
            name: "Navya Vani S",
            qualification: "MHM, LLB",
            designation: "TX Hospitals Banjara Hills - COO",
            image: "/assets/Management/Navya Vani S.webp",
            description: `Navya Vani S is a distinguished healthcare management professional
 with over 19 years of experience in hospital operations, quality
 assurance and accreditations. With expertise in process development 
and implementation, she has significantly contributed to improving 
healthcare standards through her strategic leadership. She is skilled 
in driving continuous improvement initiatives while ensuring the 
hospital adheres to regulatory standards, enhancing operational
 excellence.`,
        },
        {
            id: "management-8",
            name: "Kishore Kumar Akula",
            qualification: "MBA – Healthcare",
            designation: "Chief Operating Officer (COO) – TX Hospitals, Uppal",
            image: "/assets/Management/Kishore Kumar Akula.webp",
            description: `Mr. Kishore Kumar Akula is a healthcare management professional with over 18 years of experience in hospital operations and administration. As the Chief Operating Officer of TX Hospitals, Uppal, he leads operational strategy, process optimization, quality initiatives, and multidisciplinary teams to ensure seamless healthcare delivery and an exceptional patient experience. His expertise spans hospital operations, strategic planning, revenue growth, and organizational development. Having held leadership positions in several renowned multi-specialty and specialty hospitals, he brings a wealth of experience in driving operational excellence and sustainable growth. His commitment to innovation, efficiency, and patient-centered care continues to strengthen TX Hospitals' mission of delivering quality healthcare services.`,
        },
        {
            id: "management-9",
            name: "Vade Dileep Reddy",
            qualification: "B.Tech, MBA – Healthcare & Hospital Management",
            designation: "Chief Operating Officer (COO) – TX Hospitals, Kachiguda",
            image: "/assets/Management/Vade Dileep Reddy.webp",
            description: `Mr. Vade Dileep Reddy is a healthcare management professional with over 13 years of experience in hospital operations and administration. As the Chief Operating Officer of TX Hospitals, Kachiguda, he oversees hospital operations, strengthens service quality, and drives strategic initiatives that enhance patient care and operational efficiency. His leadership focuses on optimizing healthcare delivery while fostering a culture of excellence and continuous improvement. Holding a B.Tech degree and an MBA in Healthcare & Hospital Management from the University of Hyderabad, he brings extensive expertise in hospital administration, quality management, strategic planning, and patient experience. His commitment to streamlining processes and building efficient healthcare systems continues to support TX Hospitals' mission of delivering high-quality, patient-centered healthcare services.`,
        },
        {
            id: "management-10",
            name: "Chantati Padma Janardhana Rao",
            qualification: "",
            designation: "Chief Operating Officer (COO) – TX Hospitals, Miyapur",
            image: "/assets/Management/Chantati Padma Janardhana Rao.webp",
            description: `Mr. Chantati Padma Janardhana Rao is an accomplished healthcare management professional with over 22 years of experience in hospital operations, administration, and strategic business management. As the Chief Operating Officer of TX Hospitals, Miyapur, he leads operational planning, process optimization, and quality initiatives to ensure efficient healthcare delivery and exceptional patient care. Throughout his career, he has successfully driven organizational growth, operational excellence, and business transformation across reputed healthcare institutions. His expertise spans hospital operations, strategic planning, revenue enhancement, team development, and patient experience management. With a strong focus on innovation, collaboration, and continuous improvement, Mr. Janardhana Rao is committed to strengthening healthcare systems and advancing TX Hospitals' mission of delivering high-quality, patient-centric, and sustainable healthcare services.`,
        },
        {
            id: "management-11",
            name: "M. V. Padmalatha",
            qualification: "MBA – HR",
            designation: "Group Head – Human Resources, TX Hospitals",
            image: "/assets/Management/M.V.Padmalatha.webp",
            description: `Ms. M. V. Padmalatha is a seasoned Human Resource leader with over 20 years of experience in strategic HR management. As the Group Head – Human Resources at TX Hospitals, she leads the HR function across all branches, driving workforce planning, talent acquisition, employee engagement, and organizational development. She specializes in implementing data-driven HR strategies, retention initiatives, grievance resolution, and competency development for both clinical and non-clinical teams. Working closely with senior leadership, she plays a key role in shaping organizational culture, strengthening people practices, and aligning HR initiatives with the hospital's long-term vision. Through structured training programs and effective people management, Ms. Padmalatha continues to build a skilled, motivated workforce that supports operational excellence and quality healthcare delivery.`,
        },
        {
            id: "management-12",
            name: "M. Manoj Reddy",
            qualification: "PGDM",
            designation: "Human Resources – TX Hospitals, Banjara Hills",
            image: "/assets/Management/M Manoj Reddy.webp",
            description: `Mr. M. Manoj Reddy is a Human Resource professional with over seven years of experience in HR operations and payroll management. At TX Hospitals, Banjara Hills, he oversees key HR functions, including recruitment, onboarding, payroll processing, attendance and leave management, employee relations, statutory compliance, and HR documentation. Having worked with NABH and JCI-accredited hospitals, he possesses strong expertise in implementing HR processes that align with national and international healthcare quality standards. He also supports manpower planning, performance management, policy implementation, and cross-functional coordination to ensure smooth day-to-day HR operations. His commitment to operational efficiency and employee engagement contributes to building a productive workforce and delivering quality healthcare services.`,
        },
        {
            id: "management-13",
            name: "P. Buchi Babu",
            qualification: "MBA – Human Resources",
            designation: "TX Hospitals Miyapur - HR",
            image: "/assets/Management/P. Buchi Babu.webp",
            description: `Buchi Babu is a dynamic Human Resource professional with over a decade of extensive HR and administrative experience across the pharmaceutical, automobile and biotechnology sectors. He specializes in talent acquisition, end-to-end recruitment lifecycle management, strategic contract labor management, and ensuring absolute statutory compliance with labor laws. He has successfully spearheaded employee engagement calendars, robust reward and recognition programs, and seamless payroll and exit processes. Equipped with strong analytical and conflict-resolution skills, Buchi Babu effectively bridges plant operations with corporate HR strategy, driving organizational compliance through rigorous internal and external audits while fostering a positive, safe, and collaborative workplace culture.`,
        },
        {
            id: "management-14",
            name: "Kambham Nagajyothi",
            qualification: "MBA – HR & Finance",
            designation: "Human Resources – TX Hospitals, Kachiguda",
            image: "/assets/Management/Kambham Nagajyothi.webp",
            description: `Ms. Kambham Nagajyothi is an HR professional with five years of experience across the IT and healthcare sectors, including three years in hospital human resource management. At TX Hospitals, Kachiguda, she manages recruitment, onboarding, payroll coordination, employee records, attendance, performance appraisals, and workforce planning. She works closely with department heads to ensure efficient staffing and smooth HR operations. Her expertise also includes HR compliance, background verification, employee engagement, and exit management. With a people-centric approach, she contributes to building a productive workforce and fostering a positive workplace culture that supports quality healthcare delivery.`,
        },
        {
            id: "management-15",
            name: "Mohammad Abdul Khayyum",
            qualification: "MBA – Human Resource Management",
            designation: "Human Resources – TX Hospitals, Uppal",
            image: "/assets/Management/Mohammad Abdul Khayyum.webp",
            description: `Mr. Mohammad Abdul Khayyum is a Human Resource professional with over six years of experience in the healthcare industry. At TX Hospitals, Uppal, he manages key HR functions, including recruitment, onboarding, payroll processing, attendance and leave management, HR documentation, and statutory compliance. He works closely with department heads to support workforce planning, employee engagement, and seamless HR operations. Known for his strong organizational and interpersonal skills, he is committed to maintaining efficient HR systems, ensuring regulatory compliance, and fostering a positive work environment that contributes to the hospital's operational excellence and long-term growth.`,
        }
    ];

    return (
        <section className="bg-[#f3f3f3] py-12">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-[#a32035] mb-8">
                    Management
                </h1>

                <div className="flex flex-col gap-8">
                    {directors.map((director, index) => (
                        <div
                            key={index}
                            id={director.id}
                            className="bg-white shadow-md rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8"
                        >
                            {/* Left: Image */}
                            <div className="w-full md:w-[40%] flex justify-center pb-8 md:pb-0">
                                <div className="relative w-56 h-56 md:w-64 md:h-64 flex items-center justify-center">
                                    <Image
                                        src="/assets/Management/Mangement Person Backside Box 2.webp"
                                        alt="Background"
                                        width={400}
                                        height={400}
                                        className="absolute w-full h-full object-contain mt-6 md:mt-10 rounded-xl"
                                    />
                                    <div className="relative z-10 w-full md:-mb-1.5 mb-1.5 h-full flex items-center justify-center">
                                        <Image
                                            src={director.image}
                                            alt={director.name}
                                            width={300}
                                            height={300}
                                            className="w-full h-full object-contain rounded-xl"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Right: Content */}
                            <div className="w-full md:w-[60%] text-left">
                                <h3 className="text-xl md:text-2xl font-bold text-[#a32035]">
                                    {director.name}
                                </h3>
                                <p className="text-base font-semibold mt-1">
                                    {director.qualification}
                                </p>
                                <p className="text-base font-semibold mt-1">
                                    {director.designation}
                                </p>
                                <p className="text-gray-700 mt-4 leading-relaxed text-sm md:text-base">
                                    {director.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
