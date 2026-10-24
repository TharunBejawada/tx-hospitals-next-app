"use client";
import Image from "next/image";
import useIsMobile from "@/hooks/useIsMobile";

export default function OverviewSection() {

    const isMobile = useIsMobile();
    return (
        <>
            {isMobile ? (
                <section className="w-full mt-2">
                    <div className="bg-gray-50 text-center py-3">
                        <h1 className="text-2xl font-semibold text-pink-700">Overview</h1>
                    </div>
                    <div className="relative -mt-3">
                        <img
                            src="/assets/Overview/Overview Banner Iamge.webp"
                            alt="TX Hospitals Overview"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex flex-col justify-center px-6 text-white">
                            <h3 className="text-base font-semibold leading-snug drop-shadow-lg">
                                Redefining Healthcare <br /> Excellence Across India
                            </h3>
                        </div>
                    </div>
                    <div className="px-2 py-2 text-gray-900 space-y-1 text-justify text-xs leading-relaxed">
                        <p>
                            TX Hospitals Group is one of the country’s largest and fastest-growing chains of
                            multi-super specialty hospitals. We have opened six healthcare facilities in five
                            years since opening our first hospital in Hyderabad in 2020.
                        </p>
                        <p>
                            TX offers a comprehensive array of integrated healthcare services including
                            clinics, pharmacies, diagnostic labs, wellness centres, home healthcare, fertility
                            centres and quaternary care. Thousands of patients are treated every year with a
                            focus on raising healthcare standards in the country.
                        </p>
                        <p>
                            TX hospitals has world-renowned medical teams using advanced technologies and
                            evidence-based protocols. We prioritize clinical excellence, patient safety,
                            dignity, transparency, affordability and accessibility to ensure that every
                            patient receives quality care.
                        </p>
                    </div>
                </section>
            ) : (
                <section className="w-full">
                    <div className="bg-gray-50 pl-16 text-center py-8">
                        <h1 className="text-4xl font-semibold text-pink-700">Overview</h1>
                    </div>
                    <div className="relative -mt-4 w-full h-[300px]">
                        <Image
                            src="/assets/Overview/Overview Banner Iamge.webp"
                            alt="TX Hospitals Overview"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 flex flex-col justify-center px-24 text-white">
                            <h3 className="text-4xl font-semibold leading-snug max-w-[600px]">
                                Redefining Healthcare <br /> Excellence Across India
                            </h3>
                        </div>
                    </div>
                    <div className="max-w-6xl mx-auto px-12 py-12 text-gray-950 space-y-8 text-justify">
                        <p>
                            TX Hospitals Group is one of the country’s largest and fastest-growing chains of multi-super specialty hospitals. We have opened six healthcare facilities (including projects under development) in five years since opening our first hospital in Hyderabad in 2020. With our expansion across the country, we plan to open more locations than just Hyderabad, including Mumbai, Delhi, and Bangalore, in addition to six fully functional hospitals with 100 beds.
                        </p>
                        <p>
                            TX brand and logo projects that offer treatment or therapy for every disease. TX offers a comprehensive array of integrated healthcare services, ranging from clinics, retail pharmacies, wellness centres, diagnostic labs, health insurance, home healthcare, Fertility Centres and quaternary care facilities. Thousands of patients are treated by the TX hospitals every year with a clear focus on raising the standards of health care in the country. Considering the strategic locations of our TX hospitals within the cities of India, they are easy to reach in an emergency situation.
                        </p>
                        <p>
                            TX hospitals has world-renowned medical teams that utilize the latest technologies, including international evidence-based protocols, to provide the most comprehensive treatment in all specialties of medicine across a wide range of terms. Upon providing quality, compassionate care to all of its patients, it places a high priority on clinical excellence, patient safety, dignity, transparency, affordability, and accessibility of quality care in order to ensure that all of its patients receive the best possible care in a patient-friendly environment.
                        </p>
                    </div>
                </section>
            )}
        </>
    );
}
