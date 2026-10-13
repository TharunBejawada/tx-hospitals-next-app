import { useEffect, useState } from "react";
import { submitMyKareLead } from '@/utils/leadService';
import Image from "next/image";
import countryOptions from "@/utils/countryOptions";
import useIsMobile from "@/hooks/useIsMobile";
import { countryFlags } from "@/utils/countryFlags";
import { useRouter } from "next/router";
import CONFIG from "@/config";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MedicalOpinion() {

    const router = useRouter();
    const isMobile = useIsMobile();
    const [videos, setVideos] = useState([]);
    const [selectedCountryObj, setSelectedCountryObj] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        whatsapp: "",
        country: "",
        query: "",
        fileUrl: "",
    });

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch(`${CONFIG.API_BASE_URL}/patient-testimonials`);
                const data = await response.json();
                const formattedVideos = data.videos
                    .slice(0, 3)
                    .map((url) => {
                        const videoId = new URL(url).pathname.split("/").pop();
                        return { id: videoId, title: "Patient Testimonial" };
                    });
                setVideos(formattedVideos);
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        };

        fetchVideos();
    }, []);

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
        setFormData((prev) => ({ ...prev, country: e.target.value, whatsapp: "" }));
    };

    const handleWhatsappChange = (e) => {
        const digits = e.target.value.replace(/[^0-9]/g, "");
        setFormData((prev) => ({ ...prev, whatsapp: digits }));
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(`${CONFIG.API_BASE_URL}/upload`, formData);
            const { fileUrl } = response.data;

            setFormData((prev) => ({ ...prev, fileUrl }));
            toast.success("File uploaded successfully!");
        } catch (error) {
            toast.error("File upload failed");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                whatsapp: selectedCountryObj
                    ? `${selectedCountryObj.code} ${formData.whatsapp}`
                    : formData.whatsapp,
            };
            const res = await fetch(`${CONFIG.API_BASE_URL}/send-email/international-patients-query-form`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            submitMyKareLead(payload);

            router.push("/thank-you/");
        } catch (err) {
            console.error("Submission error:", err);
        }
    };

    // Reusable WhatsApp field with locked dial code prefix
    const WhatsAppField = ({ className = "" }) => (
        <div className={`relative flex items-center border border-gray-300 rounded bg-white ${className}`}>
            {selectedCountryObj && (
                <div className="flex items-center gap-1 pl-2 pr-2 border-r border-gray-300 pointer-events-none select-none shrink-0">
                    <Image
                        src={selectedCountryObj.flag}
                        alt={selectedCountryObj.name}
                        width={18}
                        height={13}
                        className="inline-block"
                    />
                    <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{selectedCountryObj.code}</span>
                </div>
            )}
            <input
                type="tel"
                name="whatsapp"
                placeholder="WhatsApp No*"
                required
                value={formData.whatsapp}
                onChange={handleWhatsappChange}
                className="w-full px-2 py-2 font-inter outline-none bg-transparent"
            />
        </div>
    );

    return (
        <>
            {isMobile ? (
                <>
                    <div className="flex flex-col gap-8 mt-2 p-2">
                        {/* Left Side */}
                        <div className="w-full space-y-2 rounded-lg shadow-md border border-gray-200 bg-gray-200 px-4 py-4">
                            {/* Get Free Medical Opinion */}
                            <div>
                                <h2 className="text-2xl font-semibold text-pink-700 font-inter text-center mb-4">Get Free Medical Opinion</h2>
                                <div className="grid grid-cols-3 gap-4">
                                    {countryFlags.map((flag, idx) => (
                                        <div key={idx} className="border border-black bg-white rounded-lg p-1 text-center hover:shadow-md transition">
                                            <img loading="lazy" src={flag.src} alt={flag.name} className="h-10 mx-auto mb-2" />
                                            <p className="text-[10px] font-inter font-medium">{flag.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Talk to Our Experts Form */}
                            <div className="bg-white p-3 rounded-lg shadow-md">
                                <h2 className="text-lg font-inter font-semibold text-pink-800 mb-2">TALK TO OUR EXPERTS</h2>
                                <form
                                    className="space-y-4"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="grid grid-cols-1 gap-4">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Name*"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="border font-inter p-2 rounded"
                                        />
                                        {/* Country Dropdown */}
                                        <select
                                            name="country"
                                            value={formData.country}
                                            onChange={handleCountryChange}
                                            required
                                            className="border border-gray-300 font-inter p-2 rounded"
                                        >
                                            <option value="">Select Country*</option>
                                            {countryOptions.map((c, idx) => (
                                                <option key={idx} value={c.name}>
                                                    {c.name} ({c.code})
                                                </option>
                                            ))}
                                        </select>
                                        {/* WhatsApp with locked dial code */}
                                        <WhatsAppField />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email*"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="border font-inter p-2 rounded"
                                        />
                                        <div>
                                            <label className="block mb-1 font-inter text-sm font-medium">
                                                Upload Reports (pdf/doc/jpg):
                                            </label>
                                            <input
                                                type="file"
                                                name="attachment"
                                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                                onChange={handleFileUpload}
                                                className="border p-1 font-inter rounded w-full"
                                            />
                                        </div>
                                    </div>

                                    <textarea
                                        name="query"
                                        placeholder="Query"
                                        value={formData.query}
                                        onChange={handleChange}
                                        required
                                        className="border p-2 font-inter rounded w-full"
                                        rows="3"
                                    ></textarea>
                                    <button
                                        type="submit"
                                        className="bg-pink-800 font-inter text-white px-6 py-2 rounded hover:bg-pink-700"
                                    >
                                        <span className="font-inter">Submit</span>
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Right Side - Testimonials */}
                        <div className="w-full space-y-3 rounded-lg shadow-md border border-gray-200 bg-rose-200 px-1 py-1">
                            <h2 className="text-2xl font-inter font-semibold text-pink-700 text-center">Testimonials</h2>
                            {videos.map((video, idx) => (
                                <div key={idx} className="rounded-lg px-1 overflow-hidden shadow-md">
                                    <iframe
                                        title={video.title}
                                        width="100%"
                                        height="200"
                                        src={`https://www.youtube.com/embed/${video.id}`}
                                        frameBorder="0"
                                        allowFullScreen
                                        className="w-full h-full"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex flex-row gap-4 mt-6 px-12">
                    {/* Left Side */}
                    <div className="w-[60%] space-y-8 rounded-lg shadow-md border border-gray-200 bg-gray-200 px-4 py-4">
                        {/* Get Free Medical Opinion */}
                        <div>
                            <h2 className="text-4xl font-semibold text-pink-700 font-inter text-center mb-8">Get Free Medical Opinion</h2>
                            <div className="grid grid-cols-4 gap-4">
                                {countryFlags.map((flag, idx) => (
                                    <div key={idx} className="border border-black bg-white rounded-lg p-2 text-center hover:shadow-md transition">
                                        <img loading="lazy" src={flag.src} alt={flag.name} className="h-20 mx-auto mb-2" />
                                        <p className="text-sm font-inter font-medium">{flag.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Talk to Our Experts Form */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-inter font-semibold text-pink-800 mb-4">TALK TO OUR EXPERTS</h2>
                            <form
                                className="space-y-4"
                                onSubmit={handleSubmit}
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name*"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="border font-inter p-2 rounded"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email*"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="border font-inter p-2 rounded"
                                    />
                                    {/* Country Dropdown - spans full width */}
                                    <div className="col-span-2">
                                        <select
                                            name="country"
                                            value={formData.country}
                                            onChange={handleCountryChange}
                                            required
                                            className="w-full border border-gray-300 font-inter p-2 rounded"
                                        >
                                            <option value="">Select Country*</option>
                                            {countryOptions.map((c, idx) => (
                                                <option key={idx} value={c.name}>
                                                    {c.name} ({c.code})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {/* WhatsApp with locked dial code - spans full width */}
                                    <div className="col-span-2">
                                        <WhatsAppField />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block mb-1 font-inter text-sm font-medium">
                                            Upload Reports (pdf/doc/jpg):
                                        </label>
                                        <input
                                            type="file"
                                            name="attachment"
                                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                            onChange={handleFileUpload}
                                            className="border p-1 font-inter rounded w-full"
                                        />
                                    </div>
                                </div>

                                <textarea
                                    name="query"
                                    placeholder="Query"
                                    value={formData.query}
                                    onChange={handleChange}
                                    required
                                    className="border p-2 font-inter rounded w-full"
                                    rows="3"
                                ></textarea>
                                <button
                                    type="submit"
                                    className="bg-pink-800 font-inter text-white px-6 py-2 rounded hover:bg-pink-700"
                                >
                                    <span className="font-inter">Submit</span>
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Side - Testimonials */}
                    <div className="w-[40%] space-y-6 rounded-lg shadow-md border border-gray-200 bg-rose-200 p-4">
                        <h2 className="text-4xl font-inter font-semibold text-pink-700 text-center">Testimonials</h2>
                        {videos.map((video, idx) => (
                            <div key={idx} className="rounded-lg overflow-hidden shadow-md">
                                <iframe
                                    title={video.title}
                                    width="100%"
                                    height="200"
                                    src={`https://www.youtube.com/embed/${video.id}`}
                                    frameBorder="0"
                                    allowFullScreen
                                    className="w-full h-72"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}