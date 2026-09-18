import React from 'react';
import { motion } from 'framer-motion';
import {
    Heart, Bone, Brain, Activity, ShieldPlus,
    Wind, Droplet, Microscope, Ear, Stethoscope,
    User, Smile, Eye, ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const specialtiesData = [
    {
        title: "Cardiology",
        icon: <Heart size={32} />,
        desc: "Heart care, ECG, echo, cardiac consultations & interventions by expert cardiologists near you.",
        path: "/specialities/cardiac-sciences/"
    },
    {
        title: "Orthopedics",
        icon: <Bone size={32} />,
        desc: "Bone, joint & spine treatment. Fractures, joint replacements, sports injuries & physiotherapy.",
        path: "/specialities/orthopaedics/"
    },
    {
        title: "Neurology",
        icon: <Brain size={32} />,
        desc: "Brain & nervous system care, stroke, epilepsy, migraines and neurological disorders.",
        path: "/specialities/neuro-sciences/"
    },
    {
        title: "Gastroenterology",
        icon: <Activity size={32} />,
        desc: "Digestive health, liver care, endoscopy, colonoscopy & hernia surgery by expert GI doctors.",
        path: "/specialities/gastro-sciences/"
    },
    {
        title: "Oncology",
        icon: <ShieldPlus size={32} />,
        desc: "Cancer diagnosis, treatment & support, chemotherapy, surgical oncology & palliative care.",
        path: "/specialities/oncology/"
    },
    {
        title: "Pulmonology",
        icon: <Wind size={32} />,
        desc: "Lung & respiratory care, asthma, COPD, sleep apnea, bronchoscopy & chest infections.",
        path: "/specialities/pulmonology/"
    },
    {
        title: "Nephrology",
        icon: <Droplet size={32} />,
        desc: "Kidney care, dialysis, chronic kidney disease management & transplant coordination.",
        path: "/specialities/nephrology/"
    },
    {
        title: "Urology",
        icon: <Microscope size={32} />,
        desc: "Urinary tract, kidney stones, prostate & bladder conditions, minimally invasive surgeries.",
        path: "/specialities/urology/"
    },
    {
        title: "ENT",
        icon: <Ear size={32} />,
        desc: "Ear, nose & throat care, hearing loss, sinus infections, tonsil surgery & voice disorders.",
        path: "/specialities/ent/"
    },
    {
        title: "Internal Medicine",
        icon: <Stethoscope size={32} />,
        desc: "General physician consultations, diabetes, thyroid, hypertension & chronic disease management.",
        path: "/specialities/internal-medicine/"
    },
    {
        title: "Dermatology",
        icon: <User size={32} />,
        desc: "Skin, hair & nail conditions, acne, psoriasis, eczema, laser therapy & cosmetic dermatology.",
        path: "/specialities/dermatology-cosmetic-care/"
    },
    {
        title: "Dental",
        icon: <Smile size={32} />,
        desc: "Complete dental care, cleaning, fillings, root canals, implants & orthodontic treatments.",
        path: "/specialities/dental-and-maxillofacial-care/"
    },
    {
        title: "Ophthalmology",
        icon: <Eye size={32} />,
        desc: "Eye care, cataract, glaucoma, retinal disorders, LASIK & routine eye examinations.",
        path: "/specialities/eye-ophthalmology/"
    }
];

const UppalSpecialties = () => {
    return (
        <section className="bg-[#fcfafa] py-10 md:py-16 px-6 md:px-10 lg:px-12">
            <div className="max-w-[1400px] mx-auto">
                {/* Header Section */}
                <div className="mb-8 md:mb-12 max-w-3xl">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-pink-700 mb-2 block">
                        What We Treat
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        All Specialties, <span className="text-pink-700">Near You</span> in Uppal
                    </h2>
                    <div className="w-12 h-1 bg-pink-700 mb-6"></div>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium">
                        No need to travel far. TX Hospitals in Uppal brings you 13+ medical specialties with the best doctors in your area, all at one convenient location.
                    </p>
                </div>

                {/* Specialties Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4">
                    {specialtiesData.map((spec, index) => (
                        <Link href={spec.path} key={index} className="flex h-full w-full">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col h-full w-full relative overflow-hidden group cursor-pointer"
                            >
                                {/* Bottom Border Accent */}
                                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-pink-700 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
                                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-pink-700/20"></div>

                                {/* Icon */}
                                <div className="w-14 h-14 rounded-xl bg-pink-50 flex items-center justify-center text-pink-700 mb-6 transition-transform group-hover:scale-110 duration-300">
                                    {spec.icon}
                                </div>

                                {/* Content */}
                                <h3 className="font-bold text-gray-900 text-2xl mb-3">{spec.title}</h3>
                                <p className="text-lg text-gray-600 leading-relaxed flex-grow">
                                    {spec.desc}
                                </p>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UppalSpecialties;
