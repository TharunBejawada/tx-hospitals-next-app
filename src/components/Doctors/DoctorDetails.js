"use client";
import { useEffect, useRef, useState } from "react";
import DetailsForm from "@/components/COE/DetailsForm";
import countryOptions from "@/utils/countryOptions";
import useIsMobile from "@/hooks/useIsMobile";

export default function DoctorDetails({ doctorData }) {
    const isMobile = useIsMobile();
    const [country, setCountry] = useState("India");
    const [selectedCountry, setSelectedCountry] = useState(countryOptions[0]);
    const formRef = useRef(null);
    const sectionRefs = useRef({});
    const [splitSections, setSplitSections] = useState({});

    const extraFields = doctorData?.extraFields || [];

    // Extract About Section
    const aboutSection = extraFields.find((f) =>
        ["about doctor", "about the doctor", "about"].includes(
            f.heading?.toLowerCase()
        )
    );

    // Other Sections
    const otherSections = extraFields.filter(
        (f) =>
            !["about doctor", "about the doctor", "about"].includes(
                f.heading?.toLowerCase()
            )
    );

    useEffect(() => {
        if (!formRef.current) return;

        const formHeight = formRef.current.offsetHeight;
        const newSplit = {};

        otherSections.forEach((field) => {
            const sec = sectionRefs.current[field.heading];
            if (!sec) return;

            const secHeight = sec.offsetHeight;

            newSplit[field.heading] = secHeight >= formHeight;
        });

        setSplitSections(newSplit);
    }, [doctorData]);

    const scrollToSection = (heading) => {
        sectionRefs.current[heading]?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    useEffect(() => {
        if (country === "India") {
            setSelectedCountry(countryOptions[0]);
        } else {
            setSelectedCountry(countryOptions[1]);
        }
    }, [country]);

    if (!extraFields.length) return null;

    return (
        <>
            {isMobile ? (
                <div className="mt-1 px-2">
                    {aboutSection && (
                        <div className="">
                            <h2 className="text-3xl font-bold text-pink-700 mb-4">
                                {aboutSection.heading}
                            </h2>
                            <div
                                className="text-gray-800 leading-relaxed"
                                dangerouslySetInnerHTML={{
                                    __html: (aboutSection.description || "").replace(
                                        /<p>/g,
                                        '<p class="mb-3">'
                                    ),
                                }}
                            />
                        </div>
                    )}

                    <div className="flex flex-wrap mt-2 gap-1 mb-2">
                        {otherSections.map((field, i) => (
                            <button
                                key={i}
                                onClick={() => scrollToSection(field.heading)}
                                className="px-4 py-2 border border-pink-700 rounded-full text-pink-700 font-semibold hover:bg-pink-700 hover:text-white transition"
                            >
                                {field.heading}
                            </button>
                        ))}
                    </div>
                    <div className="flex flex-col gap-5 mt-5">
                        <div className="w-full space-y-2">
                            {otherSections.map((field, i) => (
                                <div
                                    key={i}
                                    ref={(el) => { if (el) sectionRefs.current[field.heading] = el; }}
                                    className="scroll-mt-20"
                                >
                                    <h2 className="text-xl font-bold text-pink-700 mb-1">
                                        {field.heading}
                                    </h2>

                                    <div
                                        className="text-gray-800 text-sm leading-relaxed"
                                        dangerouslySetInnerHTML={{
                                            __html: (field.description || "")
                                                .replace(/<p>/g, '<p class="mb-1">')
                                                .replace(/<ul>/g, '<ul class="list-disc ml-6">'),
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="w-full">
                            <div
                                ref={formRef}
                                className="border bg-gray-200 shadow-lg rounded-xl sticky top-5"
                            >
                                <p className="bg-pink-700 text-white text-xl text-center p-2 rounded-t-xl font-semibold">
                                    Talk to a Doctor Today!
                                </p>
                                <div className="p-4">
                                    <div className="flex px-6 gap-6">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="countryType"
                                                value="India"
                                                checked={country === "India"}
                                                onChange={() => setCountry("India")}
                                                className="h-4 w-4 accent-gray-700"
                                            />
                                            <span>India</span>
                                        </label>

                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="countryType"
                                                value="Other Countries"
                                                checked={country === "Other Countries"}
                                                onChange={() => setCountry("Other Countries")}
                                                className="h-4 w-4 accent-gray-700"
                                            />
                                            <span>Other Countries</span>
                                        </label>
                                    </div>

                                    <DetailsForm
                                        department="N/A"
                                        selectedCountry={selectedCountry}
                                        setSelectedCountry={setSelectedCountry}
                                        isOtherCountry={country === "Other Countries"}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mt-2 px-12">
                    {aboutSection && (
                        <div className="">
                            <h2 className="text-3xl font-bold text-pink-700 mb-4">
                                {aboutSection.heading}
                            </h2>
                            <div
                                className="text-gray-800 leading-relaxed"
                                dangerouslySetInnerHTML={{
                                    __html: (aboutSection.description || "").replace(
                                        /<p>/g,
                                        '<p class="mb-3">'
                                    ),
                                }}
                            />
                        </div>
                    )}

                    <div className="flex flex-wrap mt-4 gap-2 mb-4">
                        {otherSections.map((field, i) => (
                            <button
                                key={i}
                                onClick={() => scrollToSection(field.heading)}
                                className="px-4 py-2 border border-pink-700 rounded-full text-pink-700 font-semibold hover:bg-pink-700 hover:text-white transition"
                            >
                                {field.heading}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-10 mt-10">
                        <div className="w-[70%] space-y-10">
                            {otherSections.map((field, i) => (
                                <div
                                    key={i}
                                    ref={(el) => { if (el) sectionRefs.current[field.heading] = el; }}
                                    className="scroll-mt-32"
                                >
                                    <h2 className="text-2xl font-bold text-pink-700 mb-3">
                                        {field.heading}
                                    </h2>

                                    <div
                                        className="text-gray-800 leading-relaxed"
                                        dangerouslySetInnerHTML={{
                                            __html: (field.description || "")
                                                .replace(/<p>/g, '<p class="mb-3">')
                                                .replace(/<ul>/g, '<ul class="list-disc ml-6">'),
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="w-[30%]">
                            <div
                                ref={formRef}
                                className="border bg-gray-200 shadow-lg rounded-xl sticky top-5"
                            >
                                <p className="bg-pink-700 text-white text-xl text-center p-2 rounded-t-xl font-semibold">
                                    Talk to a Doctor Today!
                                </p>
                                <div className="p-4">
                                    <div className="flex px-6 gap-6">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="countryType"
                                                value="India"
                                                checked={country === "India"}
                                                onChange={() => setCountry("India")}
                                                className="h-4 w-4 accent-gray-700"
                                            />
                                            <span>India</span>
                                        </label>

                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="countryType"
                                                value="Other Countries"
                                                checked={country === "Other Countries"}
                                                onChange={() => setCountry("Other Countries")}
                                                className="h-4 w-4 accent-gray-700"
                                            />
                                            <span>Other Countries</span>
                                        </label>
                                    </div>

                                    <DetailsForm
                                        department="N/A"
                                        selectedCountry={selectedCountry}
                                        setSelectedCountry={setSelectedCountry}
                                        isOtherCountry={country === "Other Countries"}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
