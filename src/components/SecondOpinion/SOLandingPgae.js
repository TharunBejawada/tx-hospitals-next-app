"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import CONFIG from "@/config";
import Image from "next/image";
import useIsMobile from "@/hooks/useIsMobile";
import WhenToSeekSecondOpinion from "@/components/SecondOpinion/WhenToSeekSecondOpinion";
import WhatToExpectCard from "@/components/SecondOpinion/WhatToExpectCard";
import BookAppointmentForm from "@/components/Blogs/BookAppointemntForm";
import { useRouter } from "next/router";
import Breadcrumb from "@/components/Common/Breadcrumb";

export default function SOLandingPage({ initialSurgeryOptions = [] }) {

    const router = useRouter();
    const isMobile = useIsMobile();
    const [surgeryOptions, setSurgeryOptions] = useState(initialSurgeryOptions || []);
    const [selectedSurgery, setSelectedSurgery] = useState(initialSurgeryOptions?.[0]?.name || "");
    const [showAll, setShowAll] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: "", phone: "" });

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Second Opinion" },
    ];

    useEffect(() => {
        window.scrollTo({ left: document.body.scrollWidth, top: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        if (initialSurgeryOptions && initialSurgeryOptions.length > 0) {
            try {
                const existingMap = JSON.parse(localStorage.getItem('slugMap') || '{}');
                const newMap = { ...existingMap };
                initialSurgeryOptions.forEach(option => {
                    if (option.url) {
                        newMap[option.url.replace(/^\/|\/$/g, "")] = { id: option.id, type: 'surgery' };
                    }
                });
                localStorage.setItem('slugMap', JSON.stringify(newMap));
            } catch (e) {}
            return;
        }
        const fetchData = async () => {
            try {
                const endpoint = `${CONFIG.API_BASE_URL}/new-secondopinion/getAllSecondOpinion`;
                const response = await axios.get(endpoint);

                const options = response.data.Items.map((item) => {
                    const raw = item.url.replace(/\//g, "").replace(/-/g, " ");
                    const name = raw
                        .split(" ")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ");
                    return {
                        id: item.soId,
                        name,
                        image: item?.soImage,
                        url: item?.url,
                    };
                }).sort((a, b) => a.name.localeCompare(b.name));

                setSurgeryOptions(options);
                setSelectedSurgery(options[0]?.name || "");
                const existingMap = JSON.parse(localStorage.getItem('slugMap') || '{}');
                const newMap = { ...existingMap };
                response.data.Items.forEach(option => {
                    newMap[option.url.replace(/^\/|\/$/g, "")] = { id: option.soId, type: 'surgery' };
                });
                localStorage.setItem('slugMap', JSON.stringify(newMap));
            } catch (error) {
                console.error("Error fetching packages: ", error);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/send-email/surgery-booking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    mobile: formData.phone,
                    surgerytype: selectedSurgery,
                }),
            });
            router.push("/thank-you/");
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    };

    return (
        <>
            {isMobile ? (
                <section className="w-full">
                    <div className="bg-gray-50 px-2 mt-4 mb-4 flex justify-start">
                        <Breadcrumb items={breadcrumbItems} />
                    </div>
                    <section className="relative w-full h-full px-2">
                        <div className="absolute inset-0 -z-10">
                            <Image
                                src="/assets/SO/Banner _.webp"
                                alt="Second Opinion Background"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-blue-900/60"></div>
                        </div>
                        <div className="flex flex-col text-white">
                            <h1 className="text-2xl text-center font-bold leading-snug mb-3">
                                Get a Second Opinion from
                                India’s Leading Surgeons
                            </h1>
                            <p className="text-base text-center leading-relaxed mb-2">
                                Whether you’re uncertain about a diagnosis or
                                planning a major surgery, our senior specialists
                                help you make informed and confident healthcare decisions
                            </p>
                        </div>
                        <div className="relative text-white bg-white/10 backdrop-blur-sm border border-blue-300/40 rounded-3xl p-3">
                            <h2 className="text-2xl font-bold mb-3 text-center">
                                Book Appointment
                            </h2>
                            <form className="space-y-1" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block mb-1 text-lg">Enter your Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Name*"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full bg-transparent text-white border border-cyan-300 rounded-full px-4 py-1 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-lg">Mobile Number</label>
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="Phone*"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full bg-transparent text-white border border-cyan-300 rounded-full px-4 py-1 pr-20 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block mb-2 text-lg">Select Surgery</label>
                                    <select
                                        name="surgery"
                                        value={selectedSurgery}
                                        onChange={(e) => setSelectedSurgery(e.target.value)}
                                        className="w-full bg-transparent text-white border border-cyan-300 rounded-full px-4 py-1 outline-none"
                                    >
                                        <option value="" className="bg-white text-gray-700">
                                            Please Select
                                        </option>
                                        {surgeryOptions.map((option, index) => (
                                            <option
                                                key={index}
                                                value={option.name}
                                                className="bg-white text-gray-700"
                                            >
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="bg-pink-700 text-white mt-2 px-4 rounded-full text-xl font-semibold"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>
                    <div className="flex justify-center md:justify-end">
                        <Image
                            src="/assets/SO/Why Choose TX Hospitals image.webp"
                            alt="Doctor Consultation"
                            width={700}
                            height={550}
                            className="object-contain"
                            priority
                        />
                    </div>
                    <div className="px-2 flex flex-col justify-center">
                        <h2 className="text-xl text-center font-bold text-pink-700 mb-2">
                            Why Choose TX Hospitals for a Second Opinion?
                        </h2>

                        <p className="text-sm leading-relaxed text-gray-700 mb-2">
                            TX Hospitals stands among India’s most trusted names in
                            advanced surgical and diagnostic excellence. With NABH
                            accreditation, robotic technology and highly experienced
                            specialists, we offer trusted second opinions that help
                            patients avoid unnecessary procedures and choose the
                            safest, most effective path to recovery.
                        </p>
                        <ul className="text-sm text-gray-800">
                            <li className="flex items-start gap-1">
                                <span className="text-red-600">✓</span>
                                Senior Consultants in Every Specialty
                            </li>

                            <li className="flex items-start gap-1">
                                <span className="text-red-600">✓</span>
                                Robotic & Minimally Invasive Surgery Experts
                            </li>

                            <li className="flex items-start gap-1">
                                <span className="text-red-600">✓</span>
                                Accurate, Transparent and Honest Guidance
                            </li>

                            <li className="flex items-start gap-1">
                                <span className="text-red-600">✓</span>
                                24×7 Critical & Emergency Care
                            </li>

                            <li className="flex items-start gap-1">
                                <span className="text-red-600">✓</span>
                                Fast, Secure Report Review within 24–48 Hours
                            </li>
                        </ul>
                    </div>
                    <div className="px-2 mt-2">
                        <h2 className="text-xl text-center font-bold text-pink-700 mb-1">
                            Get a Second Opinion Before Your Surgery
                        </h2>

                        <p className="text-sm leading-relaxed text-gray-700 mb-2">
                            Not sure if surgery is the right step? We’re here to help.
                            At TX Hospitals, our expert surgeons from diverse special es carefully assess your
                            medical reports and scans to provide a clear, unbiased second opinion
                        </p>
                    </div>
                    <div className="px-2">
                        <div className="grid grid-cols-2 gap-2">
                            {(showAll ? surgeryOptions : surgeryOptions.slice(0, 8)).map((option, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
                                    onClick={() => router.push(`/${option.url.replace(/^\/|\/$/g, '')}/`)}
                                >
                                    <div className="w-28 h-28 rounded-full border-pink-700 flex items-center justify-center p-1">
                                        <img loading="lazy"
                                            src={option?.image}
                                            alt={option.name}
                                            className="w-28 h-28 object-contain"
                                        />
                                    </div>
                                    <p className="text-center text-sm font-medium">{option.name}</p>
                                </div>
                            ))}
                        </div>
                        {surgeryOptions.length > 8 && (
                            <div className="flex justify-center mt-4">
                                <button
                                    onClick={() => setShowAll(!showAll)}
                                    className="text-pink-700 font-semibold text-lg underline hover:text-pink-900 transition"
                                >
                                    {showAll ? "Show Less" : "Show More"}
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="px-2">
                        <WhenToSeekSecondOpinion />
                    </div>
                    <div className="bg-pink-300 px-2 py-1 my-2 flex justify-center items-center">
                        <p className="text-black text-base font-semibold mr-4">
                            Need an Appointment?
                        </p>
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-pink-700 text-white text-lg font-semibold px-2 rounded-md hover:bg-pink-700 transition"
                        >
                            Click here
                        </button>
                    </div>
                    <div className="px-2">
                        <h2 className="text-xl text-center font-bold text-pink-700 mb-1">
                            Expert Consultation on for a Confident Decision
                        </h2>

                        <p className="text-sm leading-relaxed text-gray-700 mb-2">
                            When you come to TX Hospitals for a second opinion, our specialists go
                            beyond just reviewing reports — they truly understand you.<br />
                            Here’s what to expect:
                        </p>
                    </div>
                    <div className="mt-16 px-2">
                        <WhatToExpectCard />
                        <p className="text-sm leading-relaxed text-gray-700">
                            At TX Hospitals, we combine precision, exper se and empathy —
                            empowering you to make informed choices with confidence.
                        </p>
                    </div>
                    <div className="bg-[#f8f0e7] rounded-xl mb-2 px-2">
                        <h2 className="text-[#b01640] text-center text-xl font-bold mb-2">
                            Book Your Second Opinion Today
                        </h2>
                        <p className="text-gray-900 text-sm leading-relaxed">
                            You deserve clarity, confidence and care that goes beyond a single
                            opinion. <br />
                            At TX Hospitals, we help you make informed health decisions backed by
                            advanced <br />
                            diagnostics and experienced specialists. <br />
                            Call us at <span className="font-bold">+91 9144514459</span> or by
                            visiting TX Hospitals website to book your consultation now
                        </p>
                        <div className="mt-2 px-20">
                            <a href="tel:+919144514459">
                                <button className="bg-pink-700 text-white text-lg font-semibold px-2 py-1 rounded-md hover:bg-pink-800 transition">
                                    Call us Today
                                </button>
                            </a>
                        </div>
                    </div>
                </section>
            ) : (
                <section className="w-full">
                    <div className="bg-gray-50 px-16 mt-8 mb-4 flex items-center relative min-h-[60px]">
                        <div className="z-10">
                            <Breadcrumb items={breadcrumbItems} />
                        </div>
                        <h2 className="absolute inset-0 flex items-center justify-center text-4xl font-semibold text-pink-700 pointer-events-none">
                            Second Opinion
                        </h2>
                    </div>
                    <section className="relative w-full h-full px-6">
                        <div className="absolute inset-0 -z-10">
                            <Image
                                src="/assets/SO/Banner _.webp"
                                alt="Second Opinion Background"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-blue-900/60"></div>
                        </div>
                        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 gap-5 text-white">
                            <div className="flex flex-col justify-center">
                                <h1 className="text-3xl md:text-4xl font-bold leading-snug mb-6">
                                    Get a Second Opinion from <br />
                                    India’s Leading Surgeons
                                </h1>
                                <p className="text-lg leading-relaxed">
                                    Whether you’re uncertain about a diagnosis or
                                    planning a major surgery, our senior specialists
                                    help you make informed and confident healthcare decisions
                                </p>
                            </div>
                            <div className="relative bg-white/10 backdrop-blur-sm border border-blue-300/40 rounded-3xl p-8">
                                {/* <button className="absolute top-4 right-6 text-2xl font-bold text-white hover:text-gray-200">
                                    X
                                </button> */}
                                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                                    Book Appointment
                                </h2>
                                <form className="space-y-2" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block mb-2 text-lg">Enter your Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Name*"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full bg-transparent text-white border border-cyan-300 rounded-full px-5 py-2 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-lg">Mobile Number</label>
                                            <div className="relative">
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    placeholder="Phone*"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full bg-transparent text-white border border-cyan-300 rounded-full px-5 py-2 pr-20 outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-lg">Select Surgery</label>
                                        <select
                                            name="surgery"
                                            value={selectedSurgery}
                                            onChange={(e) => setSelectedSurgery(e.target.value)}
                                            className="w-full bg-transparent text-white border border-cyan-300 rounded-full px-5 py-2 outline-none"
                                        >
                                            <option value="" className="bg-white text-gray-700">
                                                Please Select
                                            </option>
                                            {surgeryOptions.map((option, index) => (
                                                <option
                                                    key={index}
                                                    value={option.name}
                                                    className="bg-white text-gray-700"
                                                >
                                                    {option.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex justify-center">
                                        <button
                                            type="submit"
                                            className="bg-pink-700 text-white px-10 py-2 rounded-full text-xl font-semibold"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                    <section className="w-full px-6 bg-white">
                        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 gap-5">
                            <div className="flex flex-col justify-center">
                                <h2 className="text-2xl font-bold text-pink-700 mb-3">
                                    Why Choose TX Hospitals for a Second Opinion?
                                </h2>

                                <p className="text-base leading-relaxed text-gray-700 mb-6">
                                    TX Hospitals stands among India’s most trusted names in
                                    advanced surgical and diagnostic excellence. With NABH
                                    accreditation, robotic technology and highly experienced
                                    specialists, we offer trusted second opinions that help
                                    patients avoid unnecessary procedures and choose the
                                    safest, most effective path to recovery.
                                </p>
                                <ul className="text-base text-gray-800">
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-600 text-2xl">✓</span>
                                        Senior Consultants in Every Specialty
                                    </li>

                                    <li className="flex items-start gap-2">
                                        <span className="text-red-600 text-2xl">✓</span>
                                        Robotic & Minimally Invasive Surgery Experts
                                    </li>

                                    <li className="flex items-start gap-2">
                                        <span className="text-red-600 text-2xl">✓</span>
                                        Accurate, Transparent and Honest Guidance
                                    </li>

                                    <li className="flex items-start gap-2">
                                        <span className="text-red-600 text-2xl">✓</span>
                                        24×7 Critical & Emergency Care
                                    </li>

                                    <li className="flex items-start gap-2">
                                        <span className="text-red-600 text-2xl">✓</span>
                                        Fast, Secure Report Review within 24–48 Hours
                                    </li>
                                </ul>
                            </div>
                            <div className="flex justify-center md:justify-end">
                                <Image
                                    src="/assets/SO/Why Choose TX Hospitals image.webp"
                                    alt="Doctor Consultation"
                                    width={700}
                                    height={550}
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>
                        <div className="max-w-4xl mx-auto px-6 text-center">
                            <h2 className="text-2xl font-bold text-pink-700 mb-2">
                                Get a Second Opinion Before Your Surgery
                            </h2>

                            <p className="text-base leading-relaxed text-gray-700 mb-3">
                                Not sure if surgery is the right step? We’re here to help.
                                At TX Hospitals, our expert surgeons from diverse special es carefully assess your
                                medical reports and scans to provide a clear, unbiased second opinion
                            </p>
                        </div>
                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-4 gap-2">
                                {(showAll ? surgeryOptions : surgeryOptions.slice(0, 8)).map((option, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
                                        onClick={() => router.push(`/${option.url.replace(/^\/|\/$/g, '')}/`)}
                                    >
                                        <div className="w-36 h-36 rounded-full border-pink-700 flex items-center justify-center p-2">
                                            <img loading="lazy"
                                                src={option.image}
                                                alt={option.name}
                                                className="w-36 h-36 object-contain"
                                            />
                                        </div>
                                        <p className="text-center mt-2 text-base font-medium">{option.name}</p>
                                    </div>
                                ))}
                            </div>
                            {surgeryOptions.length > 8 && (
                                <div className="flex justify-center mt-4">
                                    <button
                                        onClick={() => setShowAll(!showAll)}
                                        className="text-pink-700 font-semibold text-lg underline hover:text-pink-900 transition"
                                    >
                                        {showAll ? "Show Less" : "Show More"}
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="max-w-6xl mx-auto">
                            <WhenToSeekSecondOpinion />
                        </div>
                    </section>
                    <section className="w-full px-6 py-2">
                        <div className="bg-pink-300 max-w-6xl mx-auto py-6 flex justify-center items-center">
                            <p className="text-black text-xl font-semibold mr-4">
                                Need an Appointment?
                            </p>
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-pink-700 text-white text-lg font-semibold px-6 py-2 rounded-md hover:bg-pink-700 transition"
                            >
                                Click here
                            </button>
                        </div>
                        <div className="max-w-xl mx-auto px-6 text-center">
                            <h2 className="text-2xl font-bold text-pink-700 mb-2">
                                Expert Consultation on for a Confident Decision
                            </h2>

                            <p className="text-base leading-relaxed text-gray-700 mb-3">
                                When you come to TX Hospitals for a second opinion, our specialists go
                                beyond just reviewing reports — they truly understand you.<br />
                                Here’s what to expect:
                            </p>
                        </div>
                        <div className="mt-16 max-w-6xl mx-auto px-6">
                            <WhatToExpectCard />
                            <p className="text-base text-center leading-relaxed text-gray-700 my-4">
                                At TX Hospitals, we combine precision, exper se and empathy —
                                empowering you to make informed choices with confidence.
                            </p>
                        </div>
                        <div className="max-w-6xl mx-auto bg-[#f8f0e7] rounded-xl py-2 px-5 text-center">
                            <h2 className="text-[#b01640] text-2xl md:text-3xl font-bold mb-4">
                                Book Your Second Opinion Today
                            </h2>
                            <p className="text-gray-900 text-lg leading-relaxed max-w-6xl mx-auto">
                                You deserve clarity, confidence and care that goes beyond a single
                                opinion. <br />
                                At TX Hospitals, we help you make informed health decisions backed by
                                advanced <br />
                                diagnostics and experienced specialists. <br />
                                Call us at <span className="font-bold">+91 9144514459</span> or by
                                visiting TX Hospitals website to book your consultation now
                            </p>
                            <div className="mt-6">
                                <a href="tel:+919144514459">
                                    <button className="bg-pink-700 text-white text-lg font-semibold px-4 py-2 rounded-md hover:bg-pink-800 transition">
                                        Call us Today
                                    </button>
                                </a>
                            </div>
                        </div>
                    </section>
                </section>
            )}
            <BookAppointmentForm showModal={showModal} setShowModal={setShowModal} />
        </>
    );
}
