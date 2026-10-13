"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import useIsMobile from "@/hooks/useIsMobile";
import CONFIG from "../../config";
import countryOptions from "@/utils/countryOptions";
import { submitMyKareLead } from "@/utils/leadService";

const DetailsForm = ({
    department,
    selectedCountry,
    setSelectedCountry,
    isOtherCountry,
}) => {
    const router = useRouter();
    const isMobile = useIsMobile();
    const [whatsappSame, setWhatsappSame] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        whatsapp: "",
        message: "",
    });

    useEffect(() => {
        if (whatsappSame) {
            setFormData((prev) => ({ ...prev, whatsapp: prev.mobile }));
        }
    }, [whatsappSame, formData.mobile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const leadPayload = {
                ...formData,
                department,
            };
            const response = await fetch(`${CONFIG.API_BASE_URL}/send-email/COE`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(leadPayload),
            });
            submitMyKareLead(leadPayload);

            if (response.ok) {
                router.push("/thank-you");
            } else {
                console.error("Failed to send email");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const renderFormFields = (small = false) => (
        <>
            <input
                type="text"
                name="name"
                placeholder="Name"
                className={`w-full border rounded-full focus:outline-pink-300 ${small ? "p-1 mt-2" : "p-2 mt-2"}`}
                required
                value={formData.name}
                onChange={handleChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                className={`w-full border rounded-full focus:outline-pink-300 ${small ? "p-1 mt-2" : "p-2 mt-2"}`}
                required
                value={formData.email}
                onChange={handleChange}
            />

            {isOtherCountry && (
                <select
                    className={`w-full border focus:outline-pink-300 rounded-full ${small ? "p-1 mt-2" : "px-3 py-2 mt-2"}`}
                    value={selectedCountry.name}
                    onChange={(e) => {
                        setSelectedCountry(
                            countryOptions.find((c) => c.name === e.target.value)
                        );
                        setFormData((prev) => ({ ...prev, mobile: "", whatsapp: "" }));
                    }}
                >
                    {countryOptions
                        .filter((c) => c.name !== "India")
                        .map((country) => (
                            <option key={country.code} value={country.name}>

                                {country.name} ({country.code})
                            </option>
                        ))}
                </select>
            )}

            <div
                className={`relative bg-white flex items-center border rounded-full ${small ? "p-1 mt-2" : "p-2 mt-2"
                    }`}
            >
                <div className="absolute left-2 flex items-center gap-1 pointer-events-none">
                    <Image
                        src={selectedCountry.flag}
                        alt={selectedCountry.name}
                        width={20}
                        height={14}
                        className="inline-block"
                    />
                    <span className="text-sm font-medium text-gray-700">{selectedCountry.code}</span>
                </div>
                <div className="absolute left-20 h-[60%] border-l border-gray-400"></div>
                <input
                    type="tel"
                    name="mobile"
                    className="w-full pl-20 outline-none bg-transparent"
                    placeholder="Phone Number"
                    required
                    value={formData.mobile}
                    onChange={(e) => {
                        const digits = e.target.value.replace(/[^0-9]/g, "");
                        setFormData((prev) => ({ ...prev, mobile: digits }));
                    }}
                />
            </div>

            <div className={`flex items-center ${small ? "mt-2" : "mt-2"}`}>
                <input
                    type="checkbox"
                    className="accent-pink-700 mr-2"
                    checked={whatsappSame}
                    onChange={() => setWhatsappSame(!whatsappSame)}
                />
                <span className={`${small ? "text-sm" : ""}`}>Yes same as WhatsApp Number</span>
            </div>

            {!whatsappSame && (
                <div
                    className={`relative bg-white flex items-center border rounded-full ${small ? "p-1 mt-2" : "p-2 mt-2"}`}
                >
                    <div className="absolute left-2 flex items-center gap-1 pointer-events-none">
                        <Image
                            src={selectedCountry.flag}
                            alt={selectedCountry.name}
                            width={20}
                            height={14}
                            className="inline-block"
                        />
                        <span className="text-sm font-medium text-gray-700">{selectedCountry.code}</span>
                    </div>
                    <div className="absolute left-20 h-[60%] border-l border-gray-400"></div>
                    <input
                        type="tel"
                        name="whatsapp"
                        placeholder="WhatsApp Number"
                        required
                        value={formData.whatsapp}
                        onChange={(e) => {
                            const digits = e.target.value.replace(/[^0-9]/g, "");
                            setFormData((prev) => ({ ...prev, whatsapp: digits }));
                        }}
                        className="w-full pl-20 outline-none bg-transparent"
                    />
                </div>
            )}

            <textarea
                name="message"
                placeholder="Message"
                className={`w-full border rounded-xl focus:outline-pink-300 resize-none ${small ? "p-1 mt-2 h-16" : "p-2 mt-2 h-24"
                    }`}
                required
                value={formData.message}
                onChange={handleChange}
            ></textarea>

            <button
                type="submit"
                className={`w-full bg-pink-700 text-white rounded-full ${small ? "p-1 mt-2" : "p-2 mt-4"
                    }`}
            >
                Submit
            </button>
        </>
    );

    return <form onSubmit={handleSubmit}>{renderFormFields(isMobile)}</form>;
};

export default DetailsForm;
