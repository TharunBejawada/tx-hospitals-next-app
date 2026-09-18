import Image from "next/image";
import { FiChevronRight } from "react-icons/fi";
import { useState } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import { useRouter } from "next/router";
import Link from "next/link";

const specialities = [
    {
        title: "Cardiac Sciences",
        desc: "Advanced heart care with modern diagnostics and minimally invasive treatments.",
        img: "/assets/specialities/Cardiac Image.png",
        path: "/specialities/cardiac-sciences/"
    },
    {
        title: "Gastro Sciences",
        desc: "Complete digestive and liver care with endoscopy and advanced surgery.",
        img: "/assets/specialities/Gastro Image.png",
        path: "/specialities/gastro-sciences/"
    },
    {
        title: "Ortho Sciences",
        desc: "Expert bone, joint and spine solutions with surgical and rehab support.",
        img: "/assets/specialities/Orthopediac image.png",
        path: "/specialities/orthopaedics/"
    },
    {
        title: "Nephrology",
        desc: "Expert treatment for kidney diseases, dialysis and renal transplants.",
        img: "/assets/specialities/Urology Image.png",
        path: "/specialities/nephrology/"
    },
    {
        title: "Urology",
        desc: "Advanced care for urinary tract, prostate and bladder disorders.",
        img: "/assets/specialities/Urology.webp",
        path: "/specialities/urology/"
    },
    {
        title: "Gynecology",
        desc: "Comprehensive care for women's health, pregnancy, fertility, and gynecological conditions.",
        img: "/assets/specialities/Gynecology.webp",
        path: "/specialities/gynecology-hospitals/"
    },
    {
        title: "Pediatrics",
        desc: "Expert healthcare for newborns, infants, children, and adolescents with compassionate care.",
        img: "/assets/specialities/Pediatric.webp",
        path: "/specialities/pediatric-hospitals/"
    },
    {
        title: "Transplant Medicine",
        desc: "Life-saving organ transplants with expert surgical precision.",
        img: "/assets/specialities/Transplant.webp",
        path: "/specialities/transplant-medicine/"
    },
    {
        title: "Robotic Sciences",
        desc: "Robotic-assisted surgeries for greater accuracy and faster recovery.",
        img: "/assets/specialities/Robotics.webp",
        path: "/specialities/robotics-science/"
    },
    {
        title: "Neurology",
        desc: "Advanced care for brain, spine and nervous system disorders.",
        img: "/assets/specialities/Neuro.webp",
        path: "/specialities/neuro-sciences/"
    },
    {
        title: "Oncology",
        desc: "Complete cancer care with surgery, chemotherapy and radiation.",
        img: "/assets/specialities/Oncology.webp",
        path: "/specialities/oncology/"
    },
    {
        title: "Pulmonology",
        desc: "Specialized care for lung and respiratory health.",
        img: "/assets/specialities/Pulmonology.webp",
        path: "/specialities/pulmonology/"
    },
    {
        title: "ENT",
        desc: "Expert solutions for ear, nose and throat conditions with modern techniques.",
        img: "/assets/specialities/ENT.webp",
        path: "/specialities/ent/"
    },
    {
        title: "Internal Medicine",
        desc: "Preventive and chronic disease management for overall adult health.",
        img: "/assets/specialities/Internal medicine.webp",
        path: "/specialities/internal-medicine/"
    },
    {
        title: "Skin & Cosmetic Care",
        desc: "Medical and aesthetic treatments for healthy skin, hair and beauty.",
        img: "/assets/specialities/Skin.webp",
        path: "/specialities/dermatology-cosmetic-care/"
    },
    {
        title: "Dental & Maxillofacial",
        desc: "Comprehensive dental, oral and facial procedures including cosmetics.",
        img: "/assets/specialities/Dental.webp",
        path: "/specialities/dental-and-maxillofacial-care/"
    },
    {
        title: "Anaesthesia & Pain Management",
        desc: "Safe anaesthesia and advanced pain relief for surgery and chronic pain.",
        img: "/assets/specialities/Anaesthesia.webp",
        path: "/specialities/anaesthesia-and-pain-management/"
    },
    {
        title: "Eye / Ophthalmology",
        desc: "Precision diagnosis and treatment for vision and eye disorders.",
        img: "/assets/specialities/Eye.webp",
        path: "/specialities/eye-ophthalmology/"
    }
];

const faqs = [
    {
        question: "What makes TX Hospitals different from others?",
        answer:
            "TX Hospitals offers advanced technology, experienced specialists, and compassionate care across all departments, ensuring precise diagnosis, effective treatment, and faster recovery.",
    },
    {
        question: "How do I choose the right specialist for my problem?",
        answer:
            "Call 91445 14459 for guidance. Our patient care team connects you to the best specialist based on your symptoms and medical needs.",
    },
    {
        question: "Does TX Hospitals offer minimally invasive or robotic surgeries?",
        answer:
            "Yes. We use advanced robotic and laparoscopic techniques for faster recovery, minimal pain, smaller incisions, and better surgical precision across major specialties.",
    },
    {
        question:
            "Is emergency and trauma care available 24/7?",
        answer:
            "Yes. Our emergency units operate round-the-clock with on-site trauma, cardiac, and neuro specialists ready to handle all medical and surgical emergencies.",
    },
    {
        question: "Are diagnostic and imaging services available within the hospital?",
        answer:
            "Yes. We offer CT, MRI, ultrasound, and laboratory testing under one roof, ensuring accurate diagnosis and seamless patient experience at TX Hospitals.",
    },
    {
        question: "Does TX Hospitals treat international patients?",
        answer: "Yes. Our International Patient Services assist with visa support, travel, accommodation, treatment coordination, and post-care for patients from various countries."
    },
    {
        question: "Are insurance and cashless facilities available?",
        answer: "Yes. TX Hospitals is empanelled with leading insurance providers and TPAs, offering cashless hospitalization and quick claim support for all treatments."
    },
    {
        question: "How can I book an appointment with a doctor?",
        answer: "Call 91445 14459, visit www.txhospitals.in, or walk into TX Hospitals at Banjara Hills, Kachiguda, or Uppal."
    },
    {
        question: "Does TX Hospitals provide preventive health checkups?",
        answer: "Yes. We offer customized health check packages for men, women, and seniors to detect diseases early and promote long-term wellness."
    },
    {
        question: "What safety measures are followed at TX Hospitals?",
        answer: "TX Hospitals follows strict infection control, sterilization, and hygiene protocols, ensuring a safe, clean, and patient-friendly environment across all hospital facilities."
    },
];

export default function SpecialitiesHomepage({ isClinicalResearch = false }) {
    const [openIndex, setOpenIndex] = useState(null);
    const isMobile = useIsMobile();
    const router = useRouter();

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleNavigate = (path) => {
        router.push(path);
    };

    return (
        <main>
            {isMobile ? (
                <>
                    <section className="relative w-full -mt-8 h-[300px] flex items-center justify-center text-center overflow-hidden">
                        <Image
                            src="/assets/specialities/Centres of Excellence Back Side Image.webp"
                            alt="Centres of Clinical Excellence"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
                        <div className="relative z-10">
                            <h2 className="text-2xl mt-4 font-bold text-pink-700 mb-4">
                                Centres of Clinical Excellence
                            </h2>
                            <p className="text-sm text-black font-medium leading-relaxed">
                                At TX Hospitals, we bring together medical expertise, modern technology
                                and patient-first care under one roof. <br />
                                Our Centres of Excellence are dedicated to delivering comprehensive
                                treatment across major specialties, ensuring every patient receives the
                                best possible outcome.
                            </p>
                        </div>
                    </section>
                    <section className="max-w-3xl mx-auto px-2 py-2">
                        <h2 className="text-2xl text-center font-bold text-black mb-2">
                            Our Specialties
                        </h2>
                        <div className="grid grid-cols-1 gap-20 px-6 pt-14 justify-items-center">
                            {specialities.map((item, index) => (
                                <Link href={item.path} key={index} className="w-full flex-shrink-0 flex justify-center cursor-pointer">
                                    <div className="relative bg-white border border-gray-300 shadow-md rounded-lg overflow-visible w-[300px] text-center pt-24 mb-8">
                                        {/* Image */}
                                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-lg overflow-hidden shadow-md">
                                            <Image
                                                src={item.img}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Text */}
                                        <div className="p-2">
                                            <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                                            <p className="text-gray-600 text-sm mt-2 leading-snug">
                                                {item.desc}
                                            </p>
                                        </div>

                                        {/* Button */}
                                        <div className="flex justify-center pb-4">
                                            <div
                                                className="flex items-center justify-center w-7 h-7 bg-pink-600 hover:bg-pink-700 text-white rounded-full shadow-md"
                                            >
                                                <FiChevronRight size={16} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                    {!isClinicalResearch && (
                        <>
                            <section className="bg-pink-700 text-white rounded-xl p-4 text-center max-w-4xl mx-auto shadow-lg">
                                <h2 className="text-2xl font-bold mb-2">24/7 Emergency Care</h2>
                                <p className="text-sm leading-relaxed mb-4">
                                    When every second counts, our emergency department is equipped with
                                    advanced life support systems and staffed by experienced emergency
                                    physicians ready to provide immediate, life-saving care.
                                </p>
                                <button className="flex items-center justify-center gap-2 bg-white text-pink-700 font-semibold rounded-full px-6 py-3 mx-auto transition hover:scale-105 hover:shadow-md">
                                    <Image
                                        src="/assets/specialities/7373323.png"
                                        alt="Emergency Icon"
                                        width={24}
                                        height={24}
                                    />
                                    <span className="font-bold text-lg">Emergency Services</span>
                                </button>
                            </section>
                            <section className="bg-white rounded-2xl p-2 mt-2 text-center shadow-2xl">
                                <h2 className="text-lg font-bold mb-2">Ready to Experience Excellence in Healthcare?</h2>
                                <p className="text-sm leading-relaxed mb-4">
                                    Schedule an appointment with our specialists or learn more about our
                                    comprehensive medical services. We're here to provide you with
                                    personalized, compassionate care
                                </p>
                                <div className="flex items-center justify-center gap-2">
                                    <button className="flex items-center justify-center gap-1 bg-pink-700 text-white font-semibold rounded-full px-4 py-2 transition hover:scale-105 hover:shadow-md">
                                        <Image
                                            src="/assets/specialities/Book an appointment Icon.png"
                                            alt="Book Appointment Icon"
                                            width={20}
                                            height={20}
                                        />
                                        <span className="font-bold text-xs">Book Appointment</span>
                                    </button>
                                    <button className="flex items-center justify-center gap-2 border border-pink-700 bg-white text-pink-700 font-semibold rounded-full px-4 py-2 transition hover:scale-105 hover:shadow-md">
                                        <Image
                                            src="/assets/specialities/Call Icon.webp"
                                            alt="Contact Us Icon"
                                            width={20}
                                            height={20}
                                        />
                                        <span className="font-bold text-xs">Contact Us</span>
                                    </button>
                                </div>
                            </section>
                            <section className="py-3 mt-2 px-2">
                                <div className="max-w-2xl mx-auto">
                                    {/* Heading */}
                                    <h2 className="text-center text-xl font-bold text-pink-700 mb-4">
                                        Frequently Asked Questions (FAQs)
                                    </h2>

                                    {/* FAQ List */}
                                    <div className="space-y-2">
                                        {faqs.map((faq, idx) => (
                                            <div key={idx}>
                                                <button
                                                    onClick={() => toggleFAQ(idx)}
                                                    className={`w-full flex justify-between items-center px-3 py-2 rounded-full border text-sm text-left transition
                                        ${openIndex === idx
                                                            ? "bg-pink-700 text-white font-medium"
                                                            : "border-pink-600 text-pink-700 hover:bg-pink-50"
                                                        }`}
                                                >
                                                    <span>{faq.question}</span>
                                                    <svg alt="Toggle Icon"
                                                        className={`w-5 h-5 transform transition-transform ${openIndex === idx ? "rotate-180" : ""
                                                            }`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 9l-7 7-7-7"
                                                        />
                                                    </svg>
                                                </button>

                                                {openIndex === idx && (
                                                    <div className="px-3 py-2 text-sm    bg-gray-50 text-gray-700 rounded-full">
                                                        {faq.answer}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </>
                    )}
                </>
            ) : (
                <>
                    <section className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center text-center overflow-hidden">
                        <Image
                            src="/assets/specialities/Centres of Excellence Back Side Image.webp"
                            alt="Centres of Clinical Excellence"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
                        <div className="relative z-10 max-w-5xl mx-auto px-4">
                            <h2 className="text-2xl md:text-4xl font-bold text-pink-700 mb-4">
                                Centres of Clinical Excellence
                            </h2>
                            <p className="text-lg text-black font-medium leading-relaxed">
                                At TX Hospitals, we bring together medical expertise, modern technology
                                and patient-first care under one roof. <br />
                                Our Centres of Excellence are dedicated to delivering comprehensive
                                treatment across major specialties, ensuring every patient receives the
                                best possible outcome.
                            </p>
                        </div>
                    </section>
                    <section className="max-w-7xl mx-auto px-6 py-4">
                        <h2 className="text-4xl text-center font-bold text-black mb-4">
                            Our Specialties
                        </h2>
                        <div className="grid grid-cols-4 gap-20 px-12 pt-14 justify-items-center">
                            {specialities.map((item, index) => (
                                <Link href={item.path} key={index} className="block cursor-pointer">
                                    <div
                                        className="relative bg-white border border-gray-400 shadow-2xl rounded-2xl overflow-visible w-[250px] text-center mx-auto pt-24 h-full flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-40 h-40 rounded-xl overflow-hidden">
                                                <Image
                                                    src={item.img}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            <div className="p-4">
                                                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                                                <p className="text-gray-600 text-sm mt-2 leading-snug">{item.desc}</p>
                                            </div>
                                        </div>

                                        <div className="flex justify-center pb-4">
                                            <div
                                                className="flex items-center justify-center w-7 h-7 bg-pink-600 hover:bg-pink-700 text-white rounded-full shadow-md"
                                            >
                                                <FiChevronRight size={16} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                    {!isClinicalResearch && (
                        <>
                            <section className="bg-pink-700 text-white rounded-2xl p-8 text-center max-w-6xl mx-auto shadow-lg">
                                <h2 className="text-4xl font-bold mb-4">24/7 Emergency Care</h2>
                                <p className="text-xl leading-relaxed mb-8">
                                    When every second counts, our emergency department is equipped with
                                    advanced life support systems and staffed by experienced emergency
                                    physicians ready to provide immediate, life-saving care.
                                </p>
                                <button className="flex items-center justify-center gap-2 bg-white text-pink-700 font-semibold rounded-full px-6 py-3 mx-auto transition hover:scale-105 hover:shadow-md">
                                    <Image
                                        src="/assets/specialities/7373323.png"
                                        alt="Emergency Icon"
                                        width={28}
                                        height={28}
                                    />
                                    <span className="font-bold text-xl">Emergency Services</span>
                                </button>
                            </section>
                            <section className="bg-white rounded-2xl mt-12 p-8 text-center max-w-6xl mx-auto shadow-2xl">
                                <h2 className="text-4xl font-bold mb-4">Ready to Experience Excellence in Healthcare?</h2>
                                <p className="text-xl leading-relaxed mb-8">
                                    Schedule an appointment with our specialists or learn more about our
                                    comprehensive medical services. We're here to provide you with
                                    personalized, compassionate care
                                </p>
                                <div className="flex items-center justify-center gap-4">
                                    <button className="flex items-center justify-center gap-2 bg-pink-700 text-white font-semibold rounded-full px-6 py-3 transition hover:scale-105 hover:shadow-md">
                                        <Image
                                            src="/assets/specialities/Book an appointment Icon.png"
                                            alt="Book Appointment Icon"
                                            width={28}
                                            height={28}
                                        />
                                        <span className="font-bold text-xl">Book Appointment</span>
                                    </button>
                                    <button className="flex items-center justify-center gap-2 border border-pink-700 bg-white text-pink-700 font-semibold rounded-full px-6 py-3 transition hover:scale-105 hover:shadow-md">
                                        <Image
                                            src="/assets/specialities/Call Icon.webp"
                                            alt="Contact Us Icon"
                                            width={28}
                                            height={28}
                                        />
                                        <span className="font-bold text-xl">Contact Us</span>
                                    </button>
                                </div>
                            </section>
                            <section className="py-6 mt-4 px-6">
                                <div className="max-w-4xl mx-auto">
                                    {/* Heading */}
                                    <h2 className="text-center text-2xl md:text-3xl font-bold text-pink-700 mb-8">
                                        Frequently Asked Questions (FAQs)
                                    </h2>

                                    {/* FAQ List */}
                                    <div className="space-y-4">
                                        {faqs.map((faq, idx) => (
                                            <div key={idx}>
                                                <button
                                                    onClick={() => toggleFAQ(idx)}
                                                    className={`w-full flex justify-between items-center px-6 py-4 rounded-full border text-left transition
                                        ${openIndex === idx
                                                            ? "bg-pink-700 text-white font-medium"
                                                            : "border-pink-600 text-pink-700 hover:bg-pink-50"
                                                        }`}
                                                >
                                                    <span>{faq.question}</span>
                                                    <svg alt="Toggle Icon"
                                                        className={`w-5 h-5 transform transition-transform ${openIndex === idx ? "rotate-180" : ""
                                                            }`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 9l-7 7-7-7"
                                                        />
                                                    </svg>
                                                </button>

                                                {openIndex === idx && (
                                                    <div className="px-6 py-4 bg-gray-50 text-gray-700 rounded-full">
                                                        {faq.answer}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </>
                    )}
                </>
            )}
        </main>
    );
}