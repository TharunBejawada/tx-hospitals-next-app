import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import BookAppointmentForm from "@/components/Blogs/BookAppointemntForm";

const branches = [
    {
        id: "banjara-hills",
        name: "TX Hospitals, Banjara Hills",
        image: "/assets/Our Location/Banjara Hills  Hospitals Image.png",
        address: "Road No. 12, Sri Ram Nagar Colony, Banjara Hills, Hyderabad - 500028",
        path: "/banjara-hills/",
        defaultLocation: "TX Hospitals Banjara Hills",
        redirectUrl: "/thank-you-banjara-hills",
    },
    {
        id: "uppal",
        name: "TX Hospitals, Uppal",
        image: "/assets/Our Location/Uppal Location Image.png",
        address: "# 2-6-71, Near Masjid, Bharath Nagar Colony, Uppal, Hyderabad - 500039",
        path: "/uppal/",
        defaultLocation: "TX Hospitals Uppal",
        redirectUrl: "/thank-you-uppal",
    },
    {
        id: "kachiguda",
        name: "TX Hospitals, Kachiguda",
        image: "/assets/Our Location/Kachiguda Image.png",
        address: "# 3-2-841/1, Kachiguda Station Rd, Mahalaxmi Nilayam, Hyderabad - 500027",
        path: "/kachiguda/",
        defaultLocation: "TX Hospitals Kachiguda",
        redirectUrl: "/thank-you-kachiguda",
    },
    {
        id: "miyapur",
        name: "TX Hospitals, Miyapur",
        image: "/assets/ContactUs/TX Hospitals Miyapur.webp",
        address: "Pillar No A 600, Miyapur Cross Road, Hafeezpet, Hyderabad - 500059",
        path: "/miyapur/",
        defaultLocation: "TX Hospitals Miyapur",
        redirectUrl: "/thank-you-miyapur",
    }
];

export default function IPBranchesSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState(branches[0]);

    const handleBookNow = (branch) => {
        setSelectedBranch(branch);
        setIsModalOpen(true);
    };

    return (
        <section id="our-branches" className="py-8 sm:py-10 md:py-12 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header matching exact design */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6 sm:mb-8">
                    <div className="max-w-2xl">
                        <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#BD2850] block mb-2">
                            HOSPITAL LOCATIONS
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#111827] tracking-tight leading-tight">
                            Our Hospitals in Hyderabad
                        </h2>
                        <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                            Visit any of our five TX Hospitals locations across Hyderabad, Telangana, India.
                        </p>
                    </div>

                    <div className="shrink-0">
                        <a
                            href="tel:+919144514459"
                            className="inline-flex items-center justify-center px-6 sm:px-7 py-2.5 rounded-full border border-[#BD2850] text-[#BD2850] font-semibold text-sm sm:text-base hover:bg-[#BD2850] hover:text-white transition-all duration-200 active:scale-95 shadow-sm"
                        >
                            Call +919144514459
                        </a>
                    </div>
                </div>

                {/* 4 Branches Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {branches.map((branch) => (
                        <div
                            key={branch.id}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-pink-200 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                        >
                            {/* Hospital Image - Displayed properly and fully without cropping */}
                            <div className="relative w-full h-56 sm:h-60 md:h-64 bg-gray-50/50 p-2 overflow-hidden flex items-center justify-center border-b border-gray-100">
                                <Image
                                    src={branch.image}
                                    alt={branch.name}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    className="object-contain p-1.5 group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* Hospital Details */}
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>

                                    {/* Branch Title */}
                                    <h3 className="text-base font-bold text-gray-900 group-hover:text-[#BD2850] transition-colors leading-snug">
                                        {branch.name}
                                    </h3>

                                    {/* Address */}
                                    <div className="flex items-start gap-1.5 mt-2.5 text-xs text-gray-500 leading-relaxed">
                                        <MapPin className="w-4 h-4 text-[#BD2850] shrink-0 mt-0.5" />
                                        <span className="line-clamp-2">{branch.address}</span>
                                    </div>
                                </div>

                                {/* CTAs */}
                                <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
                                    {/* Book Now Button */}
                                    <button
                                        type="button"
                                        onClick={() => handleBookNow(branch)}
                                        className="w-full bg-[#BD2850] hover:bg-[#a62346] text-white font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider shadow-md shadow-pink-900/10 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                                    >
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>Book Now</span>
                                    </button>

                                    {/* Branch Link */}
                                    <Link
                                        href={branch.path}
                                        className="w-full py-1.5 text-center text-xs font-semibold text-gray-600 hover:text-[#BD2850] flex items-center justify-center gap-1 transition-colors group/link"
                                    >
                                        <span>Explore Hospital</span>
                                        <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Book Appointment Modal */}
            {isModalOpen && (
                <BookAppointmentForm
                    showModal={isModalOpen}
                    setShowModal={setIsModalOpen}
                    defaultLocation={selectedBranch?.defaultLocation || "TX Hospitals Banjara Hills"}
                    redirectUrl={selectedBranch?.redirectUrl || "/thank-you/"}
                />
            )}
        </section>
    );
}

