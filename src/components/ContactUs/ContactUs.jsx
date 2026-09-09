import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import { locations } from "@/components/ContactUs/locations";
import useIsMobile from "@/hooks/useIsMobile";
import dynamic from "next/dynamic";
const MapClient = dynamic(
    () => import("@/components/ContactUs/MapClient"),
    { ssr: false }
);

export default function ContactUs() {

    const router = useRouter();
    const { locationName } = router.query;
    const isMobile = useIsMobile();

    const getLocationBySlug = (slug) =>
        locations.find(loc => loc.slug === slug) || locations[0];

    const [selectedLocation, setSelectedLocation] = useState(locations[0]);

    useEffect(() => {
        if (!router.isReady) return;

        if (locationName) {
            const isBracket = locationName.includes('[') || locationName.includes(']');
            const matched = locations.find(loc => loc.slug === locationName);

            if (isBracket || !matched) {
                const defaultLoc = locations[0];
                setSelectedLocation(defaultLoc);
                router.replace(`/contact-us/${defaultLoc.slug}/`);
            } else {
                setSelectedLocation(matched);
            }
        } else {
            const defaultLoc = locations[0];
            setSelectedLocation(defaultLoc);
            router.replace(`/contact-us/${defaultLoc.slug}/`);
        }
    }, [locationName, router.isReady]);

    const handleLocationChange = (loc) => {
        router.push(`/contact-us/${loc.slug}/`);
        setSelectedLocation(loc);
    };

    const openGoogleMaps = (coords) => {
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${coords[0]},${coords[1]}`, "_blank");
    };

    const makeCall = (phoneNumber) => {
        window.location.href = `tel:${phoneNumber}`;
    };

    const openWhatsApp = () => {
        const message = encodeURIComponent(`Hello, I would like to enquire about ${selectedLocation.name}.`);
        window.open(`https://wa.me/919144514459?text=${message}`, "_blank");
    };

    const openGoogleReviews = (placeName) => {
        const query = encodeURIComponent(placeName);
        window.open(`https://www.google.com/search?q=${query}&hl=en&tbm=lcl`, "_blank");
    };

    return (
        <>
            <Head>
                <title>{selectedLocation.seoTitle}</title>
                <meta name="description" content={selectedLocation.seoDescription} />
                <meta name="keywords" content={selectedLocation.seoKeywords} />
            </Head>
            {isMobile ? (
                <>
                    <h1 className="text-3xl font-inter text-center font-bold -mt-5">Contact Us</h1>
                    <div className="grid grid-cols-2 gap-2 font-inter p-2">
                        {locations.map((loc) => (
                            <div
                                key={loc.id}
                                className={`p-1 text-[12px] mb-2 cursor-pointer rounded-lg ${selectedLocation.id === loc.id ? "bg-pink-700 text-white" : "bg-gray-200"
                                    }`}
                                onClick={() => handleLocationChange(loc)}
                            >
                                {loc.name}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col font-inter items-center p-6">
                        <div className="h-64 w-full md:w-2/3 relative z-0 rounded-lg overflow-hidden shadow-lg">
                            <MapClient
                                coords={selectedLocation.mapCoords}
                                name={selectedLocation.name}
                            />
                        </div>
                        <div className="text-2xl font-bold mt-3">Address</div>
                        <div className="bg-white p-3 w-full md:w-2/3 flex flex-col items-center text-center">
                            <img loading="lazy" src={selectedLocation.image} alt="Hospital" className="w-full h-full object-cover" />
                            <div className="mt-4">
                                <div className="text-large font-bold text-pink-700">{selectedLocation.name}</div>
                                <div className="text-sm mt-2">{selectedLocation.address}</div>
                            </div>

                            {/* Buttons Section */}
                            <div className="mt-4 flex flex-col items-center gap-2">
                                <button className="w-full md:w-64 px-4 py-2 flex items-center gap-2 bg-white"
                                    onClick={() => openGoogleMaps(selectedLocation.mapCoords)}>
                                    <img loading="lazy" src="/assets/ContactUs/Get Directions Icon.png" alt="Get Directions" className="w-5 h-5 bg-pink-700 p-1 rounded-full" />
                                    <div className="text-pink-700 text-base font-semibold">Get Directions</div>
                                </button>

                                <button className="w-full md:w-64 px-4 py-2 flex items-center gap-2 bg-white"
                                    onClick={() => makeCall(selectedLocation.phone)}>
                                    <img loading="lazy" src="/assets/ContactUs/Call Icon.png" alt="Call" className="w-5 h-5 bg-pink-700 p-1 rounded-full" />
                                    <div className="text-pink-700 text-base font-semibold">{selectedLocation.phone}</div>
                                </button>

                                <button className="w-full md:w-64 px-4 py-2 flex items-center gap-2 bg-white"
                                    onClick={() => openWhatsApp()}>
                                    <img loading="lazy" src="/assets/ContactUs/Enquire Now Icon.png" alt="Enquiry Icon" className="w-5 h-5 bg-pink-700 p-1 rounded-full" />
                                    <div className="text-pink-700 text-base font-semibold">Enquire Now</div>
                                </button>

                                <button className="w-full md:w-64 px-4 py-2 flex items-center gap-2 bg-white"
                                    onClick={() => openGoogleReviews(selectedLocation.name)}>
                                    <img loading="lazy" src="/assets/ContactUs/Google Review Icon.png" alt="Google Review Icon" className="w-5 h-5 bg-pink-700 p-1 rounded-full" />
                                    <div className="text-pink-700 text-base font-semibold">Google Reviews</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="mt-4 px-10 font-inter">
                    <div className="flex h-auto bg-gray-100">
                        <div className="w-1/4 bg-white shadow-lg p-4">
                            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
                            <ul>
                                {locations.map((loc) => (
                                    <li
                                        key={loc.id}
                                        className={`p-3 mb-2 cursor-pointer rounded-lg ${selectedLocation.id === loc.id ? "bg-pink-700 text-white" : "bg-gray-200"
                                            }`}
                                        onClick={() => handleLocationChange(loc)}
                                    >
                                        {loc.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex-1 p-2 mt-4">
                            <div className="h-64 w-full mb-3 relative z-0">
                                <MapClient
                                    coords={selectedLocation.mapCoords}
                                    name={selectedLocation.name}
                                />
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-md flex items-center relative gap-4 z-10">
                                <div className="flex-shrink-0">
                                    <img loading="lazy" src={selectedLocation.image} alt="Hospital" className="w-24 h-24 rounded-lg" />
                                </div>
                                <div className="">
                                    <div className="text-2xl font-bold text-pink-700">{selectedLocation.name}</div>
                                    <p className="text-gray-700">{selectedLocation.address}</p>
                                    <div className="mt-2 flex gap-2">
                                        <button className="px-3 py-1 flex items-center gap-2" onClick={() => openGoogleMaps(selectedLocation.mapCoords)}>
                                            <img loading="lazy" src="/assets/ContactUs/Get Directions Icon.png" alt="Get Directions" className="bg-pink-700 w-5 h-5 p-1 rounded-full" />
                                            <span className="text-pink-700 font-semibold" >Get Directions</span>
                                        </button>
                                        <button className="px-3 py-1 flex items-center gap-2" onClick={() => makeCall(selectedLocation.phone)}>
                                            <img loading="lazy" src="/assets/ContactUs/Call Icon.png" alt="Call" className="bg-pink-700 w-5 h-5 p-1 rounded-ful" />
                                            <span className="text-pink-700 font-semibold">{selectedLocation.phone}</span>
                                        </button>
                                        <button className="px-3 py-1 flex items-center gap-2" onClick={() => openWhatsApp()}>
                                            <img loading="lazy" src="/assets/ContactUs/Enquire Now Icon.png" alt="Enquiry Icon" className="bg-pink-700 w-5 h-5 p-1 rounded-full" />
                                            <span className="text-pink-700 font-semibold">Enquire Now</span>
                                        </button>
                                        <button className="px-3 py-1 flex items-center gap-2" onClick={() => openGoogleReviews(selectedLocation.name)}>
                                            <img loading="lazy" src="/assets/ContactUs/Google Review Icon.png" alt="Google Review Icon" className="bg-pink-700 w-5 h-5 p-1 rounded-full" />
                                            <span className="text-pink-700 font-semibold">Google Reviews</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}