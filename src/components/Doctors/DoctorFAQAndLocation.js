"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ChevronDown, MapPin, Phone } from "lucide-react";
import FAQSchema from "@/utils/FAQSchema";
import BRANCH_LOCATION_DATA from "@/utils/branchLocationData";

const MapClient = dynamic(
    () => import("@/components/ContactUs/MapClient"),
    { ssr: false }
);

/**
 * Resolves doctor's branch location data.
 * Supports single branch or multiple branches (e.g. "Uppal, Kachiguda").
 */
function getDoctorBranches(locationStr) {
    if (!locationStr) return [BRANCH_LOCATION_DATA["banjara-hills"]];
    const lower = locationStr.toLowerCase();
    const matched = [];

    if (lower.includes("uppal")) matched.push(BRANCH_LOCATION_DATA["uppal"]);
    if (lower.includes("kachiguda")) matched.push(BRANCH_LOCATION_DATA["kachiguda"]);
    if (lower.includes("banjara")) matched.push(BRANCH_LOCATION_DATA["banjara-hills"]);
    if (lower.includes("miyapur")) matched.push(BRANCH_LOCATION_DATA["miyapur"]);

    return matched.length > 0 ? matched : [BRANCH_LOCATION_DATA["banjara-hills"]];
}

export default function DoctorFAQAndLocation({ doctorData }) {
    const [openIndex, setOpenIndex] = useState(-1);
    const [activeBranchIndex, setActiveBranchIndex] = useState(0);

    const branches = getDoctorBranches(doctorData?.location);
    const activeBranch = branches[activeBranchIndex] || branches[0];

    const openGoogleMaps = () => {
        if (!activeBranch?.coords) return;
        window.open(
            `https://www.google.com/maps/dir/?api=1&destination=${activeBranch.coords[0]},${activeBranch.coords[1]}`,
            "_blank"
        );
    };

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    // Default consultation FAQs if none provided on doctorData
    const defaultFaqs = [
        {
            question: `How can I book an appointment with ${doctorData?.name || "the doctor"}?`,
            answer: `You can book an appointment online via the "Book Appointment" button on this profile, or by contacting our 24/7 patient desk at ${activeBranch.phone || "+91-9144514459"}.`,
        },
        {
            question: `Which branch does ${doctorData?.name || "the doctor"} consult at?`,
            answer: `${doctorData?.name || "The doctor"} is available for consultations at TX Hospitals ${doctorData?.location || activeBranch.displayName}. Please refer to the location map and OPD schedule on this page.`,
        },
        {
            question: `Does ${doctorData?.name || "the doctor"} provide second opinions?`,
            answer: `Yes, ${doctorData?.name || "the doctor"} provides specialized second opinions for diagnosis, medical reports, and surgical evaluations.`,
        },
        {
            question: `Are consultations and treatments covered under health insurance?`,
            answer: `Yes, TX Hospitals accepts all major health insurance providers, TPAs, and corporate policies with cashless hospitalization support.`,
        },
    ];

    const rawFaqs = (doctorData?.faqs && doctorData.faqs.length > 0) ? doctorData.faqs : defaultFaqs;
    const faqs = rawFaqs.map((f) => ({
        question: f.question,
        answer: f.answer || f.description || "",
    }));

    return (
        <section id="faq-location" className="py-10 md:py-16 font-inter" style={{ background: "rgb(243, 243, 245)" }}>
            <FAQSchema faqs={faqs} />
            <div className="max-w-[1170px] mx-auto px-4 md:px-6">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <h2
                        className="mb-3 font-bold"
                        style={{ fontSize: "clamp(24px, 3vw, 36px)", color: "rgb(3, 2, 19)" }}
                    >
                        Find Us &amp; <span style={{ color: "rgb(189, 56, 92)" }}>FAQs</span>
                    </h2>
                    <p className="max-w-[580px] mx-auto text-gray-500 text-sm md:text-base leading-relaxed">
                        Visit {doctorData?.name || "our specialist"} at TX Hospitals or get answers to your most common questions below.
                    </p>
                </div>

                {/* Two-column layout: FAQs left | Map Card right */}
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* ── LEFT: FAQ Accordion ── */}
                    <div className="w-full lg:w-[58%] flex flex-col gap-3 order-2 lg:order-1">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div
                                    key={index}
                                    className="rounded-lg overflow-hidden transition-all duration-300 bg-white"
                                    style={{
                                        border: "0.5px solid rgb(215,215,215)",
                                        boxShadow: "rgba(0,0,0,0.03) 0px 4px 12px",
                                    }}
                                >
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors cursor-pointer"
                                        style={{ background: isOpen ? "rgb(189,56,92)" : "rgb(255,255,255)" }}
                                    >
                                        <span
                                            style={{
                                                fontSize: 15,
                                                fontWeight: 500,
                                                color: isOpen ? "#fff" : "rgb(3,2,19)",
                                                lineHeight: 1.5,
                                            }}
                                        >
                                            {faq.question}
                                        </span>
                                        <ChevronDown
                                            className={`flex-shrink-0 ml-4 transition-transform duration-300 ${
                                                isOpen ? "rotate-180" : ""
                                            }`}
                                            style={{ color: isOpen ? "#fff" : "rgb(189,56,92)" }}
                                            size={18}
                                            strokeWidth={2.5}
                                        />
                                    </button>
                                    {isOpen && (
                                        <div className="px-5 py-4" style={{ background: "rgb(254,236,236)" }}>
                                            <div
                                                style={{
                                                    fontSize: 14,
                                                    fontWeight: 400,
                                                    color: "rgb(30,30,30)",
                                                    lineHeight: 1.7,
                                                }}
                                                dangerouslySetInnerHTML={{ __html: faq.answer }}
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* ── RIGHT: Location Map Card (sticky) ── */}
                    <div
                        className="w-full lg:w-[42%] lg:sticky lg:top-36 flex flex-col rounded-2xl overflow-hidden bg-white order-1 lg:order-2"
                        style={{
                            border: "0.5px solid rgb(215,215,215)",
                            boxShadow: "rgba(0,0,0,0.07) 0px 8px 24px",
                        }}
                    >
                        {/* Branch Selector if doctor practices at multiple branches */}
                        {branches.length > 1 && (
                            <div className="flex border-b border-gray-200 bg-gray-50 p-2 gap-2">
                                {branches.map((b, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveBranchIndex(idx)}
                                        className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                            activeBranchIndex === idx
                                                ? "bg-pink-700 text-white shadow-xs"
                                                : "text-gray-600 hover:text-pink-700 bg-white border border-gray-200"
                                        }`}
                                    >
                                        {b.displayName}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Leaflet Map */}
                        <div className="w-full relative z-0" style={{ height: 280 }}>
                            <MapClient coords={activeBranch.coords} name={activeBranch.mapName} />
                        </div>

                        {/* Location Details */}
                        <div className="p-5 flex flex-col gap-3">
                            <h3 className="font-bold text-base" style={{ color: "rgb(3,2,19)" }}>
                                TX Hospitals — {activeBranch.displayName}
                            </h3>
                            <div className="flex items-start gap-2.5">
                                <MapPin className="mt-0.5 flex-shrink-0 w-4 h-4" style={{ color: "rgb(189,56,92)" }} />
                                <span className="text-gray-600" style={{ fontSize: 13, lineHeight: 1.65 }}>
                                    {activeBranch.address}
                                </span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Phone className="flex-shrink-0 w-4 h-4" style={{ color: "rgb(189,56,92)" }} />
                                <a
                                    href={activeBranch.phoneHref}
                                    className="hover:underline font-medium"
                                    style={{ fontSize: 13, color: "rgb(189,56,92)" }}
                                >
                                    {activeBranch.phone}
                                </a>
                            </div>
                            <button
                                onClick={openGoogleMaps}
                                className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg py-2.5 font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer"
                                style={{ background: "rgb(189,56,92)", fontSize: 13 }}
                            >
                                <MapPin className="w-4 h-4" /> Get Directions
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
