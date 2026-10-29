import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";
import BreadcrumbArrow from "@/utils/BreadcrumbArrow";
import Breadcrumb from "@/components/Common/Breadcrumb";
import DoctorsHeader from "@/components/Doctors/DoctorsHeader";
import CONFIG from "@/config";
import FiltersSidebar from "@/components/Doctors/FilterSidebar";
import useIsMobile from "@/hooks/useIsMobile";
import AppointmentModal from "@/components/Doctors/AppointmentModal";
import DoctorAvailability from "@/components/Common/DoctorAvailability";
import { matchesDepartment, getDoctorSpecialities } from "@/utils/specialityAliases";

const locations = [
    { value: "Uppal", label: "Uppal" },
    { value: "Kachiguda", label: "Kachiguda" },
    { value: "Banjara Hills", label: "Banjara Hills" },
    { value: "Miyapur", label: "Miyapur" },
];

export default function DoctorsLandingPage() {

    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [doctorsData, setDoctorsData] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedSpeciality, setSelectedSpeciality] = useState("");
    const [visibleDoctors, setVisibleDoctors] = useState(20);
    const isMobile = useIsMobile();
    const [locationSearch, setLocationSearch] = useState("");
    const [specialitySearch, setSpecialitySearch] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    useEffect(() => {
        window.scrollTo({ left: document.body.scrollWidth, top: 0, behavior: "smooth" });
        if (router.query.location) {
            setSelectedLocation(router.query.location);
        }
    }, [router.query.location]);

    const filteredDoctors = useMemo(() => {
        return doctorsData.filter((doctor) => {
            const docSpecs = getDoctorSpecialities(doctor).map(s => s.toLowerCase());
            const selectedCat = selectedSpeciality ? selectedSpeciality.toLowerCase() : "";

            const doctorLocs = [
                ...(Array.isArray(doctor.locations) ? doctor.locations : []),
                ...(doctor.location ? doctor.location.split(/[,/]+/).map(s => s.trim()) : [])
            ].map(s => s.toLowerCase());

            const matchesSpeciality = !selectedCat || docSpecs.includes(selectedCat) || matchesDepartment(selectedCat, doctor);
            const matchesLocation = !selectedLocation || doctorLocs.some(loc => loc.includes(selectedLocation.toLowerCase()));
            const matchesSearch = !searchTerm || (
                (doctor.name && doctor.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                docSpecs.some(s => s.includes(searchTerm.toLowerCase())) ||
                matchesDepartment(searchTerm.toLowerCase(), doctor)
            );

            return matchesSpeciality && matchesLocation && matchesSearch;
        });
    }, [doctorsData, selectedSpeciality, selectedLocation, searchTerm]);

    const categoryOrder = [
        "Cardiothoracic & Vascular Surgery",
        "Cardiac Sciences",
        "Robotics Science",
        "Robotic Surgery",
        "Robotic Sciences",
        "Medical Gastroenterology",
        "Surgical Gastroenterology",
        "Nephrology",
        "Urology",
        "Gynaecology",
        "Paediatrics",
        "Neuro Sciences",
        "oncology",
        "Orthopaedics",
        "Pulmonology",
        "ENT",
        "Internal Medicine",
        "Rheumatology",
        "Skin & Cosmetic Care",
        "Dental & Maxillofacial",
        "Endocrinology",
        "Opthalmology",
        "Radiology",
        "Anaesthesia & Pain Management"
    ];

    // Sorted and deduplicated doctors: each doctor appears EXACTLY ONCE
    const sortedDoctors = useMemo(() => {
        const getCategoryRank = (doc) => {
            const specs = getDoctorSpecialities(doc).map(s => s.toLowerCase());
            let minRank = Infinity;
            for (const spec of specs) {
                const idx = categoryOrder.findIndex(cat => cat.toLowerCase() === spec);
                if (idx !== -1 && idx < minRank) {
                    minRank = idx;
                }
            }
            return minRank;
        };

        const uniqueDocs = [];
        const seen = new Set();
        for (const doc of filteredDoctors) {
            const key = doc.id || doc.name;
            if (!seen.has(key)) {
                seen.add(key);
                uniqueDocs.push(doc);
            }
        }

        return uniqueDocs.sort((a, b) => {
            const rankA = getCategoryRank(a);
            const rankB = getCategoryRank(b);
            if (rankA !== rankB) return rankA - rankB;
            return (Number(a.priorityOrder) || 999) - (Number(b.priorityOrder) || 999);
        });
    }, [filteredDoctors]);

    // Reset pagination when filter criteria changes
    useEffect(() => {
        setVisibleDoctors(20);
    }, [selectedLocation, selectedSpeciality, searchTerm]);

    // Load more doctors when scrolling
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
                setVisibleDoctors(prev => prev + 20);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        fetch(`${CONFIG.API_BASE_URL}/getAllDoctors`)
            .then((response) => response.json())
            .then((data) => {

                // Extract unique department names for dropdown (case-insensitive deduplication)
                const seenDepts = new Set();
                const uniqueDepartments = [];
                data.forEach((doc) => {
                    getDoctorSpecialities(doc).forEach((dept) => {
                        const cleaned = String(dept || "").trim();
                        const lower = cleaned.toLowerCase();
                        if (cleaned && cleaned !== "undefined" && cleaned !== "null" && !seenDepts.has(lower)) {
                            seenDepts.add(lower);
                            uniqueDepartments.push(cleaned);
                        }
                    });
                });
                uniqueDepartments.sort((a, b) => a.localeCompare(b));

                // Flatten the array for filtering & display
                const flatDoctorsArray = data.map((doctor) => ({
                    ...doctor,
                    category: doctor.department || "",
                }));

                setDoctorsData(flatDoctorsArray);
                setDepartments(uniqueDepartments);
                setError(null);
                setLoading(false);
                const existingMap = JSON.parse(localStorage.getItem('slugMap') || '{}');
                const newMap = { ...existingMap };
                data.forEach(doctor => {
                    newMap[doctor.url.replace(/^\/|\/$/g, "")] = { id: doctor.id, type: 'doctor' };
                });
                localStorage.setItem('slugMap', JSON.stringify(newMap));
            })
            .catch((error) => console.error("Error fetching doctors data:", error));
    }, []);

    if (loading) {
        return (
            <div className="flex flex-row justify-center items-center mt-20 mb-4 gap-2">
                <div className="w-8 h-8 border-2 border-pink-700 border-t-transparent rounded-full animate-spin"></div>
                <div className="text-pink-700 text-lg font-medium animate-pulse">
                    Loading...
                </div>
            </div>
        );
    }

    if (error) return <p className="text-center mt-28 font-inter p-4 text-lg text-pink-700 font-semibold">{error}</p>;

    const filteredLocations = locations.filter((loc) =>
        loc.label.toLowerCase().includes(locationSearch.toLowerCase())
    );

    const filteredDepartments = departments
        .filter((dept) => dept.toLowerCase().includes(specialitySearch.toLowerCase()))
        .sort((a, b) => {
            const indexA = categoryOrder.findIndex(cat => cat.toLowerCase() === a.toLowerCase());
            const indexB = categoryOrder.findIndex(cat => cat.toLowerCase() === b.toLowerCase());

            if (indexA === -1 && indexB === -1) return a.localeCompare(b);
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;
            return indexA - indexB;
        });

    return (
        <>
            <DoctorsHeader
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            {isMobile ? (
                <div className="relative bg-gray-200 w-full min-h-full">
                    <div className="flex justify-between items-center pt-4 px-4">
                        {/* Breadcrumbs */}
                        <div>
                            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Doctors" }]} />
                        </div>
                    </div>
                    <div className="p-4 max-w-full relative flex flex-col gap-6 items-start">
                        {/* Filters Sidebar */}
                        <FiltersSidebar
                            filteredDepartments={filteredDepartments}
                            filteredLocations={filteredLocations}
                            selectedSpeciality={selectedSpeciality}
                            setSelectedSpeciality={setSelectedSpeciality}
                            selectedLocation={selectedLocation}
                            setSelectedLocation={setSelectedLocation}
                            locationSearch={locationSearch}
                            setLocationSearch={setLocationSearch}
                            specialitySearch={specialitySearch}
                            setSpecialitySearch={setSpecialitySearch}
                        />
                        {/* Doctors Content */}
                        <div className="flex-1 w-full">
                            {sortedDoctors.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4 mb-8">
                                    {sortedDoctors.slice(0, visibleDoctors).map((doctor, i) => (
                                        <div
                                            className="bg-white rounded-lg shadow-lg border border-gray-500 p-2 flex flex-col justify-between"
                                            key={doctor.id || i}
                                        >
                                            <motion.div
                                                initial={{ opacity: 0, y: 50 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: (i % 6) * 0.1 }}
                                                className="flex gap-2"
                                            >
                                                <div className="relative w-28 h-32 z-10">
                                                    <img
                                                        loading="lazy"
                                                        src="/assets/Doctors/image.png"
                                                        alt="Background"
                                                        className="absolute inset-0 w-full h-full"
                                                    />
                                                    <motion.img
                                                        src={doctor.image}
                                                        alt={doctor.name}
                                                        className="relative z-10 w-28 rounded-sm object-cover"
                                                        whileHover={{ scale: 1.1 }}
                                                        transition={{ duration: 0.3 }}
                                                    />
                                                </div>

                                                <div className="flex-1">
                                                    <h3 className="text-base pb-1 font-bold text-pink-700">{doctor.name}</h3>
                                                    <p className="text-xs pb-1 text-gray-600">{doctor.designation}</p>
                                                    <div className="text-xs p-1 bg-gray-200 rounded-lg text-gray-600">
                                                        {doctor.qualification}
                                                    </div>
                                                    <div className="text-gray-700 text-xs font-bold">
                                                        Experience: {doctor.experience}
                                                    </div>
                                                    <DoctorAvailability doctorId={doctor.id} />
                                                    <div className="flex items-center gap-3">
                                                        <Image
                                                            src="/assets/Doctors/Location Icon.webp"
                                                            alt="Location Icon"
                                                            width={10}
                                                            height={10}
                                                        />
                                                        <div>{selectedLocation || (doctor.location ? doctor.location.split(/[,/]+/).map(s => s.trim())[0] : "")}</div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                            <div className="flex flex-col justify-between mx-auto mt-4">
                                                <button
                                                    className="w-full py-1 px-4 border border-pink-700 text-pink-700 font-semibold rounded-lg hover:scale-105 transition"
                                                    onClick={() => {
                                                        setSelectedDoctor(doctor);
                                                        setOpen(true);
                                                    }}
                                                >
                                                    Book Appointment
                                                </button>
                                                <button
                                                    className="w-full py-2 text-pink-700 underline font-semibold rounded-lg hover:scale-105 transition"
                                                    onClick={() => router.push(`/${doctor.url.replace(/^\/|\/$/g, '')}/`)}
                                                >
                                                    View Profile
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-10">
                                    <p className="text-gray-600 text-lg font-medium">No doctors found matching your criteria.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="relative bg-gray-200 w-full min-h-full px-8">
                    <div className="flex justify-between items-center pt-4 px-4">
                        {/* Breadcrumbs */}
                        <div>
                            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Doctors" }]} />
                        </div>
                    </div>
                    <div className="p-4 max-w-full relative flex gap-6 items-start">
                        {/* Filters Sidebar */}
                        <FiltersSidebar
                            filteredDepartments={filteredDepartments}
                            filteredLocations={filteredLocations}
                            selectedSpeciality={selectedSpeciality}
                            setSelectedSpeciality={setSelectedSpeciality}
                            selectedLocation={selectedLocation}
                            setSelectedLocation={setSelectedLocation}
                            locationSearch={locationSearch}
                            setLocationSearch={setLocationSearch}
                            specialitySearch={specialitySearch}
                            setSpecialitySearch={setSpecialitySearch}
                        />
                        {/* Doctors Content */}
                        <div className="flex-1">
                            {sortedDoctors.length > 0 ? (
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    {sortedDoctors.slice(0, visibleDoctors).map((doctor, i) => (
                                        <div
                                            className="bg-white rounded-lg shadow-lg border border-gray-500 p-4 flex flex-col justify-between"
                                            key={doctor.id || i}
                                        >
                                            <motion.div
                                                initial={{ opacity: 0, y: 50 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: (i % 6) * 0.1 }}
                                                className="flex gap-4"
                                            >
                                                <div className="relative w-32 h-36 z-10">
                                                    <img
                                                        loading="lazy"
                                                        src="/assets/Doctors/image.png"
                                                        alt="Background"
                                                        className="absolute inset-0 w-full h-full"
                                                    />
                                                    <motion.img
                                                        src={doctor.image}
                                                        alt={doctor.name}
                                                        className="relative z-10 w-32 h-34 rounded-sm object-cover"
                                                        whileHover={{ scale: 1.1 }}
                                                        transition={{ duration: 0.3 }}
                                                    />
                                                </div>

                                                <div className="flex-1">
                                                    <h3 className="text-xl pb-2 font-bold text-pink-700">{doctor.name}</h3>
                                                    <p className="text-sm pb-2 text-gray-600">{doctor.designation}</p>
                                                    <div className="text-sm p-2 bg-gray-200 rounded-lg text-gray-600">
                                                        {doctor.qualification}
                                                    </div>
                                                    <div className="text-gray-700 text-sm font-bold">
                                                        Experience: {doctor.experience}
                                                    </div>
                                                    <DoctorAvailability doctorId={doctor.id} />
                                                    <div className="flex items-center gap-3">
                                                        <Image
                                                            src="/assets/Doctors/Location Icon.webp"
                                                            alt="Location Icon"
                                                            width={12}
                                                            height={12}
                                                        />
                                                        <div>{selectedLocation || (doctor.location ? doctor.location.split(/[,/]+/).map(s => s.trim())[0] : "")}</div>
                                                    </div>
                                                </div>
                                            </motion.div>

                                            {/* Buttons */}
                                            <div className="flex flex-col justify-between mx-auto mt-4">
                                                <button
                                                    className="w-full py-1 px-4 border border-pink-700 text-pink-700 font-semibold rounded-lg hover:scale-105 transition"
                                                    onClick={() => {
                                                        setSelectedDoctor(doctor);
                                                        setOpen(true);
                                                    }}
                                                >
                                                    Book Appointment
                                                </button>
                                                <button
                                                    className="w-full py-2 text-pink-700 underline font-semibold rounded-lg hover:scale-105 transition"
                                                    onClick={() => router.push(`/${doctor.url.replace(/^\/|\/$/g, '')}/`)}
                                                >
                                                    View Profile
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-10">
                                    <p className="text-gray-600 text-lg font-medium">No doctors found matching your criteria.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {open && <AppointmentModal doctorData={selectedDoctor} closeModal={() => setOpen(false)} />}
        </>
    );
}