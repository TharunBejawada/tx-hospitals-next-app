import useIsMobile from "@/hooks/useIsMobile";
import Link from "next/link";

const titleToPath = {
    "Cardiac Science": "/specialities/cardiac-sciences/",
    "Oncology": "/specialities/oncology/",
    "Internal Medicine": "/specialities/internal-medicine/",
    "Endocrinology": "/specialities/endocrinology/",
    "Pulmonology": "/specialities/pulmonology/",
    "Neuro Science": "/specialities/neuro-sciences/",
    "Gastro Science": "/specialities/gastro-sciences/",
    "Orthopedics & Rheumatology": "/specialities/orthopaedics/",
    "Mother & Child": "/specialities/mother-child-care/",
    "Skin Science": "/specialities/dermatology-cosmetic-care/",
    "Transplant Center": "/specialities/transplant-medicine/",
    "Dental Science": "/specialities/dental-and-maxillofacial-care/"
};

export default function Speciality({ icon, title }) {
    const isMobile = useIsMobile();
    const path = titleToPath[title] || "/specialities/";

    return (
        <Link href={path} className="flex flex-col items-center text-center group cursor-pointer hover:scale-105 transition-transform duration-300">
            {isMobile ? (
                <div className="flex flex-col items-center text-center">
                    <img loading="lazy" src={icon} alt={title} className="h-10 w-10" />
                    <p className="font-inter text-xs mt-2 text-gray-800 font-medium group-hover:text-pink-700 transition-colors">{title}</p>
                </div>
            ) : (
                <div className="flex flex-col items-center text-center">
                    <img loading="lazy" src={icon} alt={title} className="h-24 w-24" />
                    <p className="font-inter text-sm mt-2 text-gray-800 font-medium group-hover:text-pink-700 transition-colors">{title}</p>
                </div>
            )}
        </Link>
    );
}