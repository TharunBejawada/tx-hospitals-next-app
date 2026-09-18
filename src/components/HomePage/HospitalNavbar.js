"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FiArrowRight, FiX, FiChevronDown, FiChevronUp, FiChevronRight } from "react-icons/fi";
import { Menu, X } from "lucide-react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { MdPhoneInTalk } from "react-icons/md";
import Image from "next/image";
import LanguageDropdown from "@/components/HomePage/LanguageDropdown";
import useIsMobile from "@/hooks/useIsMobile";
import { dropdowns, quickLinks, managementNames, directorsNames, locations, departments, healthConditions, treatmetnAndProcedures, diagnosticsGuide, symptomsGuide, medicineGuide, medicalTechnology, secondOpinion, healthPackages } from "@/utils/dropdownValues";

export default function HospitalNavbar({ variant = "primary", forceSecondary = false, setForceSecondary }) {

    const navRef = useRef(null);
    const router = useRouter();
    const isMobile = useIsMobile();
    const [openMenu, setOpenMenu] = useState(null);
    const [hoveredAboutItem, setHoveredAboutItem] = useState(null);
    const [hoveredLibraryItem, setHoveredLibraryItem] = useState(null);
    const [navHeight, setNavHeight] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
    const [isMobileSpecialtiesOpen, setIsMobileSpecialtiesOpen] = useState(false);
    const [isMobileLibraryOpen, setIsMobileLibraryOpen] = useState(false);
    const [mobileOpenSubItem, setMobileOpenSubItem] = useState(null); // Tracks nested accordion state
    const [hoveredSpecialty, setHoveredSpecialty] = useState(dropdowns.specialties.part1[0]);

    const isSecondary = variant === "secondary" || forceSecondary;

    const bgClass = isSecondary
        ? "bg-gray-50 text-black shadow-md fixed top-0 left-0 w-full z-50"
        : "text-white absolute top-0 left-0 w-full z-20";

    const linkClass = `
        relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px]
        after:w-0 after:h-[2px] after:bg-pink-700 after:transition-all after:duration-300
        hover:after:w-full
    `;

    useEffect(() => {
        if (navRef.current) setNavHeight(navRef.current.offsetHeight);
    }, [isSecondary]);

    const handleOpen = (menu) => {
        setOpenMenu(menu);
        if (menu === "specialties") setHoveredSpecialty(dropdowns.specialties.part1[0]);
        if (setForceSecondary) setForceSecondary(true);
    };

    const handleClose = () => {
        setOpenMenu(null);
        if (setForceSecondary) setForceSecondary(false);
    };

    const handleMenuClick = (path, scrollId = null) => {
        if (router.pathname === path) {
            handleClose();

            if (scrollId) {
                const element = document.getElementById(scrollId);
                if (element) {
                    const navHeight = document.querySelector("nav")?.offsetHeight || 0;
                    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({
                        top: elementPosition - navHeight - 10,
                        behavior: "smooth",
                    });
                }
            }
        } else {
            router.push(path).then(() => {
                if (scrollId) {
                    const element = document.getElementById(scrollId);
                    if (element) {
                        const navHeight = document.querySelector("nav")?.offsetHeight || 0;
                        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                        window.scrollTo({
                            top: elementPosition - navHeight - 10,
                            behavior: "smooth",
                        });
                    }
                }
            });
        }
    };

    const renderAboutDropdown = () => (
        <div
            onMouseEnter={() => handleOpen("about")}
            onMouseLeave={handleClose}
            className="fixed left-0 w-full bg-pink-50 shadow-md border-t border-gray-200 z-40 px-10 py-4"
            style={{ top: navHeight }}
        >
            <div className="max-w-7xl mx-auto flex justify-between text-black text-sm gap-6">
                {/* Left: About items */}
                <div className="flex flex-col gap-2 min-w-[220px] border-r border-gray-200 pr-4">
                    {dropdowns.about.map((item, idx) => (
                        <div
                            key={idx}
                            onMouseEnter={() => setHoveredAboutItem(item)}
                            onClick={() => {
                                if (item === "Chairman’s Message") {
                                    handleMenuClick("/", "chairman-message-section");
                                    return;
                                }
                                if (item === "Why Choose Us") {
                                    handleMenuClick("/", "why-choose-us");
                                    return;
                                }
                                if (item === "Overview") handleMenuClick("/about-us/");
                                if (item === "Contact Us") handleMenuClick("/contact-us/");
                                if (item === "FAQ’s") handleMenuClick("/faqs/");
                                if (item === "International Patient") handleMenuClick("/international-patient-services/");
                                if (item === "Board of Directors") handleMenuClick("/board-of-directors/");
                                if (item === "Management") handleMenuClick("/management/");
                            }}
                            className={`flex items-center justify-between py-2 px-3 rounded cursor-pointer transition-colors font-bold
                                ${hoveredAboutItem === item ? "bg-pink-100 text-pink-700" : "text-gray-800 hover:bg-gray-100"}`}
                        >
                            <span>{item}</span>
                            {(item === "Management" || item === "Board of Directors" || item === "Contact Us") && (
                                <FiChevronRight className={`${hoveredAboutItem === item ? "opacity-100" : "opacity-50"}`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Center: Dynamic content */}
                <div className="flex-1 min-w-[250px] border-r border-gray-200 pr-4">
                    {hoveredAboutItem === "Management" && (
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                            {managementNames.map((name, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleMenuClick("/management", `management-${i}`)}
                                    className="text-left text-gray-700 hover:text-pink-700 py-2 px-2 transition-colors font-medium border-b border-gray-100"
                                >
                                    {name}
                                </button>
                            ))}
                        </div>
                    )}
                    {hoveredAboutItem === "Board of Directors" && (
                        <div className="flex flex-col gap-1">
                            {directorsNames.map((name, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleMenuClick("/board-of-directors", `director-${i}`)}
                                    className="text-left text-gray-700 hover:text-pink-700 py-2 px-2 transition-colors font-medium border-b border-gray-100 last:border-0"
                                >
                                    {name}
                                </button>
                            ))}
                        </div>
                    )}
                    {hoveredAboutItem === "Contact Us" && (
                        <div className="grid grid-cols-1 gap-1">
                            {locations.map((location, i) => (
                                <button
                                    key={i}
                                    onClick={() => { handleMenuClick(location?.path); setOpenMenu(null); }}
                                    className="text-left text-gray-700 hover:text-pink-700 py-2 px-2 transition-colors font-medium border-b border-gray-100 last:border-0"
                                >
                                    {location?.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: Quick Links */}
                <div className="w-64 space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="font-bold text-lg text-left">Quick Links</span>
                        <button onClick={handleClose} className="text-gray-600 hover:text-black">
                            <FiX />
                        </button>
                    </div>
                    <div className="bg-blue-100 p-2 rounded-lg text-left">
                        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-wider">
                            Emergency & 24/7 Support
                        </p>
                        <p className="text-sm font-bold text-black">9144514459 / 9963229765</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        {quickLinks.map((link, idx) => (
                            <button
                                key={idx}
                                className="flex items-center justify-between bg-pink-700 text-white text-xs font-bold p-2.5 rounded hover:bg-pink-800 transition shadow-sm"
                                onClick={() => handleNavigate(link.path)}
                            >
                                {link.name} <FiArrowRight />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderLibraryDropdown = () => (
        <div
            onMouseEnter={() => handleOpen("library")}
            onMouseLeave={handleClose}
            className="fixed left-0 w-full bg-pink-50 shadow-md border-t border-gray-200 z-40 px-10 py-4"
            style={{ top: navHeight }}
        >
            <div className="max-w-7xl mx-auto flex justify-between text-black text-sm gap-6">
                {/* Left: Library items */}
                <div className="flex flex-col gap-2 min-w-[220px] border-r border-gray-200 pr-4">
                    {dropdowns.library.map((item, idx) => (
                        <div
                            key={idx}
                            onMouseEnter={() => setHoveredLibraryItem(item?.name)}
                            onClick={() => {
                                if (item?.path) handleNavigate(item?.path);
                                setHoveredLibraryItem(item?.name);
                            }}
                            className={`flex items-center justify-between py-2 px-3 rounded cursor-pointer transition-colors font-bold
                                ${hoveredLibraryItem === item?.name ? "bg-pink-100 text-pink-700" : "text-gray-800 hover:bg-gray-100"}`}
                        >
                            <span>{item?.name}</span>
                            {item?.name !== "News & Media" && (
                                <FiChevronRight className={`${hoveredLibraryItem === item?.name ? "opacity-100" : "opacity-50"}`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Center: Dynamic content based on hovered item */}
                <div className="flex-1 min-w-[400px] border-r border-gray-200 pr-4 overflow-y-auto max-h-[400px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-1">
                        {hoveredLibraryItem === "Health Conditions" && healthConditions.map((name, i) => (
                            <button key={i} className="text-left text-gray-700 hover:text-pink-700 py-2 px-2 transition-colors font-medium border-b border-gray-100">
                                {name}
                            </button>
                        ))}
                        {hoveredLibraryItem === "Treatments & Procedures" && treatmetnAndProcedures.map((name, i) => (
                            <button key={i} className="text-left text-gray-700 hover:text-pink-700 py-2 px-2 transition-colors font-medium border-b border-gray-100">
                                {name}
                            </button>
                        ))}
                        {hoveredLibraryItem === "Diagnostics Guide" && diagnosticsGuide.map((name, i) => (
                            <button key={i} className="text-left text-gray-700 hover:text-pink-700 py-2 px-2 transition-colors font-medium border-b border-gray-100">
                                {name}
                            </button>
                        ))}
                        {hoveredLibraryItem === "Medicine Guide" && medicineGuide.map((name, i) => (
                            <button key={i} className="text-left text-gray-700 hover:text-pink-700 py-2 px-2 transition-colors font-medium border-b border-gray-100">
                                {name}
                            </button>
                        ))}
                        {hoveredLibraryItem === "Symptoms Guide" && symptomsGuide.map((name, i) => (
                            <button key={i} className="text-left text-gray-700 hover:text-pink-700 py-2 px-2 transition-colors font-medium border-b border-gray-100">
                                {name}
                            </button>
                        ))}
                        {hoveredLibraryItem === "Medical Technology" && medicalTechnology.map((name, i) => (
                            <button key={i} className="text-left text-gray-700 hover:text-pink-700 py-2 px-2 transition-colors font-medium border-b border-gray-100">
                                {name}
                            </button>
                        ))}
                        {hoveredLibraryItem === "Second Opinion" && secondOpinion.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => { handleMenuClick(item?.path); setOpenMenu(null); }}
                                className={`text-left py-2 px-2 transition-colors font-medium border-b border-gray-100 
                                ${item.name === "View More"
                                        ? "text-pink-700 underline font-bold"
                                        : "text-gray-700 hover:text-pink-700"
                                    }`}
                            >
                                {item?.name}
                            </button>
                        ))}
                        {hoveredLibraryItem === "Health Packages" && healthPackages.map((item, i) => (
                            <button key={i} onClick={() => { handleMenuClick(item?.path); setOpenMenu(null); }} className="text-left text-gray-700 hover:text-pink-700 py-2 px-2 transition-colors font-medium border-b border-gray-100">
                                {item?.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Quick Links */}
                <div className="w-64 space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="font-bold text-lg text-left">Quick Links</span>
                        <button onClick={handleClose} className="text-gray-600 hover:text-black">
                            <FiX />
                        </button>
                    </div>
                    <div className="bg-blue-100 p-2 rounded-lg text-left">
                        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-wider">
                            Emergency & 24/7 Support
                        </p>
                        <p className="text-sm font-bold text-black">9144514459 / 9963229765</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        {quickLinks.map((link, idx) => (
                            <button
                                key={idx}
                                className="flex items-center justify-between bg-pink-700 text-white text-xs font-bold p-2.5 rounded hover:bg-pink-800 transition shadow-sm"
                                onClick={() => handleNavigate(link.path)}
                            >
                                {link.name} <FiArrowRight />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSpecialtiesDropdown = () => (
        <div
            onMouseEnter={() => handleOpen("specialties")}
            onMouseLeave={handleClose}
            className="fixed left-0 w-full bg-pink-50 shadow-md border-t border-gray-200 z-40 px-10 py-4"
            style={{ top: navHeight }}
        >
            <div className="max-w-7xl mx-auto flex justify-between text-black text-sm gap-6">
                {/* Column 1: Main Categories */}
                <div className="flex flex-col gap-2 min-w-[200px] border-r border-gray-200 pr-4">
                    {dropdowns.specialties.part1.map((item, idx) => (
                        <div
                            key={idx}
                            onMouseEnter={() => setHoveredSpecialty(item)}
                            onClick={() => {
                                if (item.path) {
                                    handleMenuClick(item.path);
                                    setOpenMenu(null);
                                }
                            }}
                            className={`flex items-center justify-between py-2 px-2 rounded cursor-pointer transition-colors font-bold
                                ${hoveredSpecialty?.name === item.name ? "bg-pink-100 text-pink-700" : "text-gray-800 hover:bg-gray-100"}`}
                        >
                            <span>{item.name}</span>
                            {item.subItems && item.subItems.length > 0 && (
                                <FiChevronRight className={`${hoveredSpecialty?.name === item.name ? "opacity-100" : "opacity-50"}`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Column 2: Sub-items of selected Category */}
                <div className="flex flex-col gap-2 min-w-[220px] border-r border-gray-200 pr-4">
                    {hoveredSpecialty?.subItems?.map((sub, i) => (
                        <button
                            key={i}
                            onClick={() => { handleMenuClick(sub.path); setOpenMenu(null); }}
                            className="text-left text-gray-700 hover:text-pink-700 py-1 px-2 transition-colors font-medium"
                        >
                            {sub.name}
                        </button>
                    ))}
                </div>

                {/* Column 3: Fixed Categories */}
                <div className="flex flex-col gap-2 min-w-[180px] border-r border-gray-200 pr-4">
                    {dropdowns.specialties.part3.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                if (item.path) {
                                    handleMenuClick(item.path);
                                    setOpenMenu(null);
                                }
                            }}
                            className="text-left text-gray-800 hover:text-pink-700 py-2 px-2 transition-colors font-semibold"
                        >
                            {item.name}
                        </button>
                    ))}
                </div>

                {/* Column 4: Fixed Categories */}
                <div className="flex flex-col gap-2 min-w-[200px] border-r border-gray-200 pr-4">
                    {dropdowns.specialties.part4.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                if (item.path) {
                                    handleMenuClick(item.path);
                                    setOpenMenu(null);
                                }
                            }}
                            className="text-left text-gray-800 hover:text-pink-700 py-2 px-2 transition-colors font-semibold"
                        >
                            {item.name}
                        </button>
                    ))}
                </div>

                {/* Column 5: Quick Links */}
                <div className="w-64 space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="font-bold text-lg text-left">Quick Links</span>
                        <button onClick={handleClose} className="text-gray-600 hover:text-black">
                            <FiX />
                        </button>
                    </div>
                    <div className="bg-blue-100 p-2 rounded-lg text-left">
                        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-wider">
                            Emergency & 24/7 Support
                        </p>
                        <p className="text-sm font-bold text-black">9144514459 / 9963229765</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        {quickLinks.map((link, idx) => (
                            <button
                                key={idx}
                                className="flex items-center justify-between bg-pink-700 text-white text-xs font-bold p-2.5 rounded hover:bg-pink-800 transition shadow-sm"
                                onClick={() => handleNavigate(link.path)}
                            >
                                {link.name} <FiArrowRight />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderDropdown = (title, items) => {
        if (title === "about") return renderAboutDropdown();
        if (title === "library") return renderLibraryDropdown();
        if (title === "specialties") return renderSpecialtiesDropdown();
        const list = items;
        return (
            <div
                onMouseEnter={() => handleOpen(title)}
                onMouseLeave={handleClose}
                className={`fixed left-0 w-full bg-pink-50 shadow-md border-t border-gray-200 z-40 px-10 py-4`}
                style={{ top: navHeight }}
            >
                <div className="max-w-6xl mx-auto flex justify-between text-black text-sm">
                    <div
                        className="flex flex-col ml-40 cursor-pointer gap-x-12 gap-y-4 font-semibold"
                    >
                        {list.map((item, idx) => (
                            <span
                                key={idx}
                                className="cursor-pointer text-gray-800 hover:text-pink-700"
                            >
                                {item}
                            </span>
                        ))}
                    </div>

                    {/* Right side quick links */}
                    <div className="w-72 pl-4 border-l border-gray-500 space-y-4 relative">
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-lg text-left">Quick Links</span>
                            <button
                                onClick={handleClose}
                                className="text-gray-600 hover:text-black text-xl font-bold"
                            >
                                <FiX />
                            </button>
                        </div>
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <p className="text-xs text-gray-600 font-semibold">
                                Emergency & 24/7 Health Support
                            </p>
                            <p className="text-sm font-medium text-black">9144514459 / 9963229765</p>
                        </div>

                        <div className="flex flex-col gap-2">
                            {quickLinks.map((link, idx) => (
                                <button
                                    key={idx}
                                    className="flex items-center justify-between bg-pink-700 text-white text-left font-semibold p-2 rounded hover:bg-pink-800 transition"
                                    onClick={() => handleNavigate(link.path)}
                                >
                                    {link.name} <FiArrowRight />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const handleNavigate = (path) => {
        router.push(path);
        setIsMenuOpen(false);
    };

    return (
        <>
            {isMobile ? (
                <>
                    {/* Header */}
                    <div
                        className={`flex justify-between items-center p-2 ${isMenuOpen || isSecondary
                            ? "bg-gray-50 text-black shadow-md fixed top-0 left-0 w-full z-50"
                            : "text-white absolute top-0 left-0 w-full z-50"
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <Image
                                src={
                                    isMenuOpen || isSecondary
                                        ? "/assets/Header/Logo.png"
                                        : "/assets/Header/Whit Logo.png"
                                }
                                alt="TX Hospitals"
                                width={60}
                                height={60}
                                className="w-14 h-auto cursor-pointer"
                                onClick={() => router.push("/")}
                            />
                        </div>

                        <LanguageDropdown
                            setForceSecondary={setForceSecondary}
                            isSecondary={isSecondary}
                            isMobile={true}
                            languages={["English", "Telugu", "Hindi", "Bengali", "Tamil", "Marathi", "Malayalam", "Kannada", "Arabic", "Urdu", "Swahili", "Somali", "Italian", "Spanish", "Persian", "Portuguese", "Amharic", "French", "Russian", "Chinese (Simplified)", "Nepali", "Pashto", "Gujarati", "Punjabi"]}
                        />

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`p-2 rounded-md ${isMenuOpen || isSecondary ? "bg-gray-200 text-black" : "bg-white/10 text-white"}`}
                        >
                            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>

                    {/* Menu Panel */}
                    {isMenuOpen && (
                        <div className="fixed top-[70px] left-0 w-full sm:w-3/4 h-[calc(100vh-70px)] bg-white text-black z-40 shadow-xl p-5 pb-24 overflow-y-auto transition-all duration-300">
                            {/* Menu Items */}
                            <ul className="space-y-4">
                                {/* ABOUT ACCORDION */}
                                <li>
                                    <button
                                        className="text-gray-800 hover:text-pink-600 w-full flex justify-between items-center text-lg transition-colors"
                                        onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
                                    >
                                        About
                                        {isMobileAboutOpen ? <FiChevronUp /> : <FiChevronDown />}
                                    </button>
                                    {isMobileAboutOpen && (
                                        <ul className="ml-4 mt-2 space-y-2 border-l-2 border-pink-100 pl-4 transition-all">
                                            {dropdowns.about.filter(item => item !== "Contact Us").map((item, idx) => {
                                                const hasSub = ["Management", "Board of Directors"].includes(item);
                                                const isSubOpen = mobileOpenSubItem === `about-${item}`;
                                                return (
                                                    <li key={idx}>
                                                        <div className="flex flex-col">
                                                            <button
                                                                className={`text-sm flex justify-between items-center text-left w-full py-2 transition-colors ${isSubOpen ? 'text-pink-600 font-semibold' : 'text-gray-600 hover:text-pink-500'}`}
                                                                onClick={() => {
                                                                    if (hasSub) {
                                                                        setMobileOpenSubItem(isSubOpen ? null : `about-${item}`);
                                                                    } else {
                                                                        if (item === "Chairman’s Message") handleMenuClick("/", "chairman-message-section");
                                                                        else if (item === "Why Choose Us") handleMenuClick("/", "why-choose-us");
                                                                        else if (item === "Overview") handleNavigate("/about-us/");
                                                                        else if (item === "FAQ’s") handleNavigate("/faqs/");
                                                                        else if (item === "International Patient") handleNavigate("/international-patient-services/");
                                                                        setOpenMenu(null);
                                                                        setIsMenuOpen(false);
                                                                    }
                                                                }}
                                                            >
                                                                {item}
                                                                {hasSub && (isSubOpen ? <FiChevronUp className="text-xs" /> : <FiChevronDown className="text-xs" />)}
                                                            </button>

                                                            {isSubOpen && (
                                                                <ul className="ml-4 space-y-1 border-l border-gray-100 pl-3 py-1 grid grid-cols-1 overflow-y-auto max-h-[250px]">
                                                                    {item === "Management" && managementNames.map((name, i) => (
                                                                        <li key={i}><button className="text-xs text-gray-500 py-1 text-left w-full" onClick={() => handleNavigate("/management")}>{name}</button></li>
                                                                    ))}
                                                                    {item === "Board of Directors" && directorsNames.map((name, i) => (
                                                                        <li key={i}><button className="text-xs text-gray-500 py-1 text-left w-full" onClick={() => handleNavigate("/board-of-directors")}>{name}</button></li>
                                                                    ))}
                                                                    {item === "Contact Us" && locations.map((loc, i) => (
                                                                        <li key={i}><button className="text-xs text-gray-500 py-1 text-left w-full" onClick={() => handleNavigate(loc.path)}>{loc.name}</button></li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </li>

                                {/* SPECIALTIES ACCORDION */}
                                <li>
                                    <button
                                        className="text-gray-800 hover:text-pink-600 w-full flex justify-between items-center text-lg transition-colors"
                                        onClick={() => setIsMobileSpecialtiesOpen(!isMobileSpecialtiesOpen)}
                                    >
                                        Specialties
                                        {isMobileSpecialtiesOpen ? <FiChevronUp /> : <FiChevronDown />}
                                    </button>

                                    {isMobileSpecialtiesOpen && (
                                        <ul className="ml-4 mt-2 space-y-2 border-l-2 border-pink-100 pl-4">
                                            {dropdowns.specialties.part1.map((dept, idx) => {
                                                const isSubOpen = mobileOpenSubItem === `spec-${dept.name}`;
                                                return (
                                                    <li key={idx}>
                                                        <div className="flex flex-col">
                                                            <button
                                                                className={`text-sm flex justify-between items-center text-left w-full py-2 transition-colors ${isSubOpen ? 'text-pink-600 font-semibold' : 'text-gray-600 hover:text-pink-500'}`}
                                                                onClick={() => {
                                                                    if (dept.subItems && dept.subItems.length > 0) {
                                                                        setMobileOpenSubItem(isSubOpen ? null : `spec-${dept.name}`)
                                                                    } else if (dept.path) {
                                                                        handleNavigate(dept.path);
                                                                    }
                                                                }}
                                                            >
                                                                {dept.name}
                                                                {dept.subItems && dept.subItems.length > 0 && (
                                                                    isSubOpen ? <FiChevronUp className="text-xs" /> : <FiChevronDown className="text-xs" />
                                                                )}
                                                            </button>
                                                            {isSubOpen && (
                                                                <ul className="ml-4 space-y-1 border-l border-gray-100 pl-3 py-1">
                                                                    {dept.subItems.map((sub, i) => (
                                                                        <li key={i}>
                                                                            <button className="text-xs text-gray-500 py-1 text-left w-full" onClick={() => { handleNavigate(sub.path); setIsMenuOpen(false); }}>
                                                                                {sub.name}
                                                                            </button>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                            {/* Other Specialties from Part 3 & 4 */}
                                            {[...dropdowns.specialties.part3, ...dropdowns.specialties.part4].map((dept, idx) => (
                                                <li key={`fixed-${idx}`}>
                                                    <button className="text-sm text-gray-600 hover:text-pink-500 text-left w-full py-2" onClick={() => {
                                                        if (dept.path) handleNavigate(dept.path);
                                                    }}>
                                                        {dept.name}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>

                                {/* DOCTORS LINK */}
                                <li>
                                    <button
                                        onClick={() => handleNavigate("/find-doctor/")}
                                        className="text-gray-800 hover:text-pink-600 w-full text-left text-lg transition-colors"
                                    >
                                        Doctors
                                    </button>
                                </li>

                                {/* LIBRARY ACCORDION */}
                                <li>
                                    <button
                                        className="text-gray-800 hover:text-pink-600 w-full flex justify-between items-center text-lg transition-colors"
                                        onClick={() => setIsMobileLibraryOpen(!isMobileLibraryOpen)}
                                    >
                                        Library
                                        {isMobileLibraryOpen ? <FiChevronUp /> : <FiChevronDown />}
                                    </button>
                                    {isMobileLibraryOpen && (
                                        <ul className="ml-4 mt-2 space-y-2 border-l-2 border-pink-100 pl-4">
                                            {dropdowns.library.map((item, idx) => {
                                                const hasSub = item.name !== "News & Media"; // Only News & Media has no sub-menu in desktop either
                                                const isSubOpen = mobileOpenSubItem === `lib-${item.name}`;
                                                return (
                                                    <li key={idx}>
                                                        <div className="flex flex-col">
                                                            <button
                                                                className={`text-sm flex justify-between items-center text-left w-full py-2 transition-colors ${isSubOpen ? 'text-pink-600 font-semibold' : 'text-gray-600 hover:text-pink-500'}`}
                                                                onClick={() => {
                                                                    if (hasSub) setMobileOpenSubItem(isSubOpen ? null : `lib-${item.name}`);
                                                                    else if (item.path || item.name === "News & Media") {
                                                                        handleNavigate(item.path || "/news-and-media/");
                                                                        setIsMenuOpen(false);
                                                                    }
                                                                }}
                                                            >
                                                                {item.name}
                                                                {hasSub && (isSubOpen ? <FiChevronUp className="text-xs" /> : <FiChevronDown className="text-xs" />)}
                                                            </button>
                                                            {isSubOpen && (
                                                                <ul className="ml-4 space-y-1 border-l border-gray-100 pl-3 py-1 grid grid-cols-1 overflow-y-auto max-h-[250px]">
                                                                    {item.name === "Health Conditions" && healthConditions.map((n, i) => <li key={i}><button className="text-xs text-gray-500 py-1 text-left w-full" onClick={() => { handleNavigate('#'); setIsMenuOpen(false); }}>{n}</button></li>)}
                                                                    {item.name === "Treatments & Procedures" && treatmetnAndProcedures.map((n, i) => <li key={i}><button className="text-xs text-gray-500 py-1 text-left w-full" onClick={() => { handleNavigate('#'); setIsMenuOpen(false); }}>{n}</button></li>)}
                                                                    {item.name === "Diagnostics Guide" && diagnosticsGuide.map((n, i) => <li key={i}><button className="text-xs text-gray-500 py-1 text-left w-full" onClick={() => { handleNavigate('#'); setIsMenuOpen(false); }}>{n}</button></li>)}
                                                                    {item.name === "Medicine Guide" && medicineGuide.map((n, i) => <li key={i}><button className="text-xs text-gray-500 py-1 text-left w-full" onClick={() => { handleNavigate('#'); setIsMenuOpen(false); }}>{n}</button></li>)}
                                                                    {item.name === "Symptoms Guide" && symptomsGuide.map((n, i) => <li key={i}><button className="text-xs text-gray-500 py-1 text-left w-full" onClick={() => { handleNavigate('#'); setIsMenuOpen(false); }}>{n}</button></li>)}
                                                                    {item.name === "Medical Technology" && medicalTechnology.map((n, i) => <li key={i}><button className="text-xs text-gray-500 py-1 text-left w-full" onClick={() => { handleNavigate('#'); setIsMenuOpen(false); }}>{n}</button></li>)}
                                                                    {item.name === "Second Opinion" && secondOpinion.map((sub, i) => <li key={i}><button className="text-xs text-gray-500 py-1 text-left w-full" onClick={() => { handleNavigate(sub.path); setIsMenuOpen(false); }}>{sub.name}</button></li>)}
                                                                    {item.name === "Health Packages" && healthPackages.map((sub, i) => <li key={i}><button className="text-xs text-gray-500 py-1 text-left w-full" onClick={() => { handleNavigate(sub.path); setIsMenuOpen(false); }}>{sub.name}</button></li>)}
                                                                </ul>
                                                            )}
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </li>
                            </ul>

                            {/* Mobile Quick Links */}
                            <div className="mt-8 border-t border-gray-100 pt-6">
                                <h3 className="text-xs font-bold text-gray-400 mb-4 tracking-wider uppercase">Quick Links</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    <button onClick={() => handleNavigate('/clinical-research')} className="bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-pink-600 rounded-lg py-2.5 px-3 text-sm font-medium text-left transition-colors">Clinical Research</button>
                                    <button onClick={() => handleNavigate('/academic')} className="bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-pink-600 rounded-lg py-2.5 px-3 text-sm font-medium text-left transition-colors">Academics</button>
                                    <button onClick={() => handleNavigate('/blog')} className="bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-pink-600 rounded-lg py-2.5 px-3 text-sm font-medium text-left transition-colors">Blogs</button>
                                </div>
                            </div>

                            {/* Contact & Appointment Buttons */}
                            <div className="mt-8 flex flex-col gap-3 border-t border-gray-100 pt-6">
                                <a href="tel:9144514459" className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-pink-200 bg-pink-50 text-pink-700 font-bold hover:bg-pink-100 transition-colors">
                                    <MdPhoneInTalk size={20} />
                                    <span>9144514459 / 9963229765</span>
                                </a>
                                <button onClick={() => { window.dispatchEvent(new CustomEvent('open-appointment-modal')); setIsMenuOpen(false); }} className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-pink-700 text-white font-bold hover:bg-pink-800 transition-colors shadow-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" alt="Image" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    <span>Book Appointment</span>
                                </button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <>
                    {/* NAVBAR */}
                    <nav
                        ref={navRef}
                        className={`flex justify-center items-center text-base font-bold uppercase tracking-wider px-6 transition-all ${bgClass}`}
                    >
                        {/* Left */}
                        <div className="flex items-center gap-8">
                            <a href="tel:9144514459">
                                <div className="flex items-center gap-3 text-white bg-pink-700 rounded-full px-4 py-1 cursor-pointer whitespace-nowrap text-sm">
                                    <MdPhoneInTalk size={18} /> 9144514459 / 9963229765
                                </div>
                            </a>

                            {/* Dropdown triggers */}
                            {["about", "specialties"].map((menu) => {
                                const isSpecialties = menu === "specialties";
                                return (
                                    <div
                                        key={menu}
                                        onMouseEnter={() => handleOpen(menu)}
                                        onMouseLeave={handleClose}
                                        className="relative py-12"
                                    >
                                        <a
                                            href={isSpecialties ? "/specialities/" : `#${menu}`}
                                            className={`${linkClass} cursor-pointer flex items-center gap-1`}
                                            onClick={(e) => {
                                                if (!isSpecialties) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            {menu.charAt(0).toUpperCase() + menu.slice(1)}
                                            <FiChevronDown size={16} />
                                        </a>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Logo */}
                        <div className="mx-16">
                            <Image
                                src={
                                    isSecondary
                                        ? "/assets/Header/Logo.png"
                                        : "/assets/Header/Whit Logo.png"
                                }
                                alt="TX Hospitals"
                                width={80}
                                height={60}
                                className="cursor-pointer"
                                onClick={() => router.push("/")}
                            />
                        </div>

                        {/* Right */}
                        <div className="flex items-center gap-8">
                            <button className={linkClass} onClick={() => router.push("/find-doctor")}>
                                DOCTORS
                            </button>
                            <div
                                onMouseEnter={() => handleOpen("library")}
                                onMouseLeave={handleClose}
                                className="relative py-12"
                            >
                                <a
                                    href="#library"
                                    className={`${linkClass} cursor-pointer flex items-center gap-1`}
                                    onClick={(e) => e.preventDefault()}
                                >
                                    Library
                                    <FiChevronDown size={16} />
                                </a>
                            </div>
                            <LanguageDropdown
                                isSecondary={isSecondary}
                                isMobile={false}
                                setForceSecondary={setForceSecondary}
                                languages={["English", "Telugu", "Hindi", "Bengali", "Tamil", "Marathi", "Malayalam", "Kannada", "Arabic", "Urdu", "Swahili", "Somali", "Italian", "Spanish", "Persian", "Portuguese", "Amharic", "French", "Russian", "Chinese (Simplified)", "Nepali", "Pashto", "Gujarati", "Punjabi"]}
                            />
                        </div>
                    </nav>

                    {/* DROPDOWNS */}
                    {openMenu &&
                        renderDropdown(openMenu, dropdowns[openMenu] || [])}
                </>
            )}
        </>
    );
}
