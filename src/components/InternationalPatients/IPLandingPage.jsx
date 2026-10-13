import { useState } from "react";
import { submitMyKareLead } from '@/utils/leadService';
import countryOptions from "@/utils/countryOptions";
import Image from "next/image";
import useIsMobile from "@/hooks/useIsMobile";
import CONFIG from "@/config";
import { useRouter } from "next/router";
import About from "@/components/InternationalPatients/About";
import PlanYourTrip from "@/components/InternationalPatients/PlanYourTrip";
import MedicalOpinion from "@/components/InternationalPatients/MedicalOpinion";
import OurSpecialities from "@/components/InternationalPatients/OurSpecialities";

export default function IPLandingPage() {

    const router = useRouter();
    const isMobile = useIsMobile();
    const [selectedCountryObj, setSelectedCountryObj] = useState(null);

    const [whatsappSame, setWhatsappSame] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        whatsapp: "",
        message: "",
        country: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCountryChange = (e) => {
        const selected = countryOptions.find((c) => c.name === e.target.value);
        setSelectedCountryObj(selected || null);
        setFormData((prev) => ({ ...prev, country: e.target.value, mobile: "", whatsapp: "" }));
    };

    const handleMobileChange = (e) => {
        const digits = e.target.value.replace(/[^0-9]/g, "");
        setFormData((prev) => ({ ...prev, mobile: digits }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: formData.name,
            email: formData.email,
            mobile: selectedCountryObj
                ? `${selectedCountryObj.code} ${formData.mobile}`
                : formData.mobile,
            country: formData.country,
            message: formData.message,
        };

        try {
            const res = await fetch(`${CONFIG.API_BASE_URL}/send-email/international-patients`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            submitMyKareLead(payload);

            router.push("/thank-you/");
        } catch (err) {
            console.error("Error submitting form:", err);
        }
    };

    return (
        <>
            {isMobile ? (
                <>
                    <div className="-mt-6 mb-1">
                        <div className="relative w-full h-full overflow-hidden mb-2">
                            {/* Background Image */}
                            <img loading="lazy"
                                src="/assets/International_Patients/Slider Box Inside Image.png"
                                alt="Background"
                                className="absolute inset-0 w-full h-full object-cover -z-10"
                            />

                            {/* Content */}
                            <div className="w-full h-full flex flex-row items-center justify-between px-3 py-5">
                                {/* Left Text Section */}
                                <div className="text-black max-w-xs space-y-1">
                                    <h1 className="font-inter text-lg font-bold leading-tight">
                                        World-Class Treatment.
                                    </h1>
                                    <h2 className="text-base font-inter font-semibold leading-tight">
                                        India's Leading Doctors.
                                    </h2>
                                    <h2 className="text-base font-inter font-semibold leading-tight">
                                        Only at <strong>TX Hospitals.</strong>
                                    </h2>
                                    <button className="bg-pink-700 font-inter text-sm text-white px-3 py-1 rounded-3xl font-semibold shadow-lg hover:bg-pink-600 transition">
                                        Plan your Trip Now
                                    </button>
                                </div>

                                {/* Right Map Image */}
                                <div className="mt-0 max-w-[37%]">
                                    <img
                                        loading="lazy"
                                        src="/assets/International_Patients/Slider Image World Country.png"
                                        alt="World Map"
                                        className="max-w-[110%] object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between items-stretch gap-2 px-2 py-1 bg-white">
                            {/* Left Section - Benefits */}
                            <div className="bg-pink-800 text-white px-5 py-6 rounded-2xl w-full max-w-3xl">
                                <div className="flex flex-col items-center gap-4 w-full">
                                    {/* Top: 1 item centred */}
                                    <div className="flex flex-col items-center text-center gap-2">
                                        <img loading="lazy" src="/assets/International_Patients/30 years Experienced  Icon.png" alt="DoctorIcon" className="w-14 h-14" />
                                        <p className="text-sm font-inter font-medium">30+ Years</p>
                                        <p className="text-sm font-inter font-medium">Experienced Doctors</p>
                                    </div>
                                    {/* Bottom: 2 items side-by-side */}
                                    <div className="flex justify-around w-full">
                                        <div className="flex flex-col items-center text-center gap-2">
                                            <img loading="lazy" src="/assets/International_Patients/Long Standing Resources Icon.png" alt="ResourcesIcon" className="w-14 h-14" />
                                            <p className="text-sm font-inter font-medium">Long Standing</p>
                                            <p className="text-sm font-inter font-medium">Resources</p>
                                        </div>
                                        <div className="flex flex-col items-center text-center gap-2">
                                            <img loading="lazy" src="/assets/International_Patients/Patient Wider Countries Icon.png" alt="GlobeIcon" className="w-14 h-14" />
                                            <p className="text-sm font-inter font-medium">Patients from</p>
                                            <p className="text-sm font-inter font-medium">Wider Countries</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Section - Form */}
                            <div className="bg-white border border-gray-300 shadow-2xl rounded-2xl p-4 w-full max-w-sm">
                                <h2 className="text-xl font-semibold text-pink-800 mb-6 text-center">TALK TO OUR EXPERTS</h2>
                                <form
                                    className="flex flex-col gap-4"
                                    onSubmit={handleSubmit}
                                >
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name*"
                                        required
                                        className="border font-inter border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-600"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email*"
                                        required
                                        className="border font-inter border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-600"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleCountryChange}
                                        className="border border-gray-300 rounded-md px-4 py-2"
                                        required
                                    >
                                        <option value="">Select Country</option>
                                        {countryOptions.map((c, idx) => (
                                            <option key={idx} value={c.name}>
                                                {c.name} ({c.code})
                                            </option>
                                        ))}
                                    </select>
                                    {/* Phone field with locked dial code prefix */}
                                    <div className="relative flex items-center border border-gray-300 rounded-md bg-white">
                                        {selectedCountryObj && (
                                            <div className="flex items-center gap-1 pl-3 pr-2 border-r border-gray-300 pointer-events-none select-none shrink-0">
                                                <Image
                                                    src={selectedCountryObj.flag}
                                                    alt={selectedCountryObj.name}
                                                    width={20}
                                                    height={14}
                                                    className="inline-block"
                                                />
                                                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{selectedCountryObj.code}</span>
                                            </div>
                                        )}
                                        <input
                                            type="tel"
                                            name="mobile"
                                            placeholder="Phone Number*"
                                            required
                                            value={formData.mobile}
                                            onChange={handleMobileChange}
                                            className="w-full px-3 py-2 outline-none bg-transparent focus:ring-2 focus:ring-pink-600 rounded-md"
                                        />
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={whatsappSame}
                                            onChange={() => setWhatsappSame(!whatsappSame)}
                                        />
                                        <span>Yes same as WhatsApp Number</span>
                                    </div>
                                    {!whatsappSame && (
                                        <div className="relative flex items-center border border-gray-300 rounded-md bg-white">
                                            {selectedCountryObj && (
                                                <div className="flex items-center gap-1 pl-3 pr-2 border-r border-gray-300 pointer-events-none select-none shrink-0">
                                                    <Image
                                                        src={selectedCountryObj.flag}
                                                        alt={selectedCountryObj.name}
                                                        width={20}
                                                        height={14}
                                                        className="inline-block"
                                                    />
                                                    <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{selectedCountryObj.code}</span>
                                                </div>
                                            )}
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
                                                className="w-full px-3 py-2 outline-none bg-transparent focus:ring-2 focus:ring-pink-600 rounded-md"
                                            />
                                        </div>
                                    )}
                                    <textarea
                                        name="message"
                                        placeholder="Message"
                                        rows="3"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="border font-inter border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-600"
                                    ></textarea>

                                    <button
                                        type="submit"
                                        className="bg-pink-800 font-inter text-white rounded-full py-2 font-semibold hover:bg-pink-700 transition"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <About />
                    <PlanYourTrip />
                    <MedicalOpinion />
                    <OurSpecialities />
                </>
            ) : (
                <>
                    <div className="mt-6">
                        <div className="relative w-full h-full overflow-hidden mb-4">
                            <img loading="lazy"
                                src="/assets/International_Patients/Slider Box Inside Image.png"
                                alt="Background"
                                className="absolute inset-0 w-full h-full object-cover -z-10"
                            />
                            <div className="w-full h-full flex flex-row items-center justify-between px-12 py-10">
                                <div className="text-black max-w-lg space-y-2">
                                    <h1 className="font-inter text-4xl font-bold leading-tight">
                                        World-Class Treatment.
                                    </h1>
                                    <h2 className="text-3xl font-inter font-semibold leading-tight">
                                        India's Leading Doctors.
                                    </h2>
                                    <h2 className="text-3xl font-inter font-semibold leading-tight">
                                        Only at <strong>TX Hospitals.</strong>
                                    </h2>
                                    <button className="bg-pink-700 font-inter text-white px-6 py-2 rounded-3xl font-semibold shadow-lg hover:bg-pink-600 transition">
                                        Plan your Trip Now
                                    </button>
                                </div>
                                <div className="mt-0 max-w-[55%]">
                                    <img
                                        loading="lazy"
                                        src="/assets/International_Patients/Slider Image World Country.png"
                                        alt="World Map"
                                        className="w-full object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-stretch gap-4 px-14 py-5 bg-white">
                            <div className="bg-pink-800 text-white px-10 py-8 rounded-2xl w-full max-w-3xl flex items-center justify-center">
                                <div className="flex flex-col items-center gap-8 w-full">
                                    {/* Top: 1 item centred */}
                                    <div className="flex flex-col items-center text-center gap-3">
                                        <img loading="lazy" src="/assets/International_Patients/30 years Experienced  Icon.png" alt="DoctorIcon" className="w-24 h-24" />
                                        <p className="text-xl font-inter font-medium">30+ Years</p>
                                        <p className="text-xl font-inter font-medium">Experienced Doctors</p>
                                    </div>
                                    {/* Bottom: 2 items side-by-side */}
                                    <div className="flex justify-around w-full">
                                        <div className="flex flex-col items-center text-center gap-3">
                                            <img loading="lazy" src="/assets/International_Patients/Long Standing Resources Icon.png" alt="ResourcesIcon" className="w-24 h-24" />
                                            <p className="text-xl font-inter font-medium">Long Standing</p>
                                            <p className="text-xl font-inter font-medium">Resources</p>
                                        </div>
                                        <div className="flex flex-col items-center text-center gap-3">
                                            <img loading="lazy" src="/assets/International_Patients/Patient Wider Countries Icon.png" alt="GlobeIcon" className="w-24 h-24" />
                                            <p className="text-xl font-inter font-medium">Patients from</p>
                                            <p className="text-xl font-inter font-medium">Wider Countries</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white border border-gray-300 shadow-2xl rounded-2xl p-8 w-full max-w-sm">
                                <h2 className="text-xl font-semibold text-pink-800 mb-6 text-center">TALK TO OUR EXPERTS</h2>
                                <form
                                    className="flex flex-col gap-4"
                                    onSubmit={handleSubmit}
                                >
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name*"
                                        required
                                        className="border font-inter border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-600"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email*"
                                        required
                                        className="border font-inter border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-600"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleCountryChange}
                                        className="border border-gray-300 rounded-md px-4 py-2 flex items-center gap-2"
                                        required
                                    >
                                        <option value="">Select Country</option>
                                        {countryOptions.map((c, idx) => (
                                            <option key={idx} value={c.name}>
                                                {c.name} ({c.code})
                                            </option>
                                        ))}
                                    </select>
                                    {/* Phone field with locked dial code prefix */}
                                    <div className="relative flex items-center border border-gray-300 rounded-md bg-white">
                                        {selectedCountryObj && (
                                            <div className="flex items-center gap-1 pl-3 pr-2 border-r border-gray-300 pointer-events-none select-none shrink-0">
                                                <Image
                                                    src={selectedCountryObj.flag}
                                                    alt={selectedCountryObj.name}
                                                    width={20}
                                                    height={14}
                                                    className="inline-block"
                                                />
                                                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{selectedCountryObj.code}</span>
                                            </div>
                                        )}
                                        <input
                                            type="tel"
                                            name="mobile"
                                            placeholder="Phone Number*"
                                            required
                                            value={formData.mobile}
                                            onChange={handleMobileChange}
                                            className="w-full px-3 py-2 outline-none bg-transparent focus:ring-2 focus:ring-pink-600 rounded-md"
                                        />
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={whatsappSame}
                                            onChange={() => setWhatsappSame(!whatsappSame)}
                                        />
                                        <span>Yes same as WhatsApp Number</span>
                                    </div>
                                    {!whatsappSame && (
                                        <div className="relative flex items-center border border-gray-300 rounded-md bg-white">
                                            {selectedCountryObj && (
                                                <div className="flex items-center gap-1 pl-3 pr-2 border-r border-gray-300 pointer-events-none select-none shrink-0">
                                                    <Image
                                                        src={selectedCountryObj.flag}
                                                        alt={selectedCountryObj.name}
                                                        width={20}
                                                        height={14}
                                                        className="inline-block"
                                                    />
                                                    <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{selectedCountryObj.code}</span>
                                                </div>
                                            )}
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
                                                className="w-full px-3 py-2 outline-none bg-transparent focus:ring-2 focus:ring-pink-600 rounded-md"
                                            />
                                        </div>
                                    )}
                                    <textarea
                                        name="message"
                                        placeholder="Message"
                                        rows="3"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="border font-inter border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-600"
                                    ></textarea>

                                    <button
                                        type="submit"
                                        className="bg-pink-800 font-inter text-white rounded-full py-2 font-semibold hover:bg-pink-700 transition"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <About />
                    <PlanYourTrip />
                    <MedicalOpinion />
                    <OurSpecialities />
                </>
            )}
        </>
    );
}