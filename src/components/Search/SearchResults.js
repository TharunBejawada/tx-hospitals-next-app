import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { FiSearch, FiChevronRight, FiGrid, FiBookOpen, FiPackage, FiActivity, FiFileText } from "react-icons/fi";
import { BiLoaderAlt } from "react-icons/bi";
import CONFIG from "@/config";

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const CATEGORIES = [
    { key: "all",            label: "All Results",           icon: FiGrid },
    { key: "DAT",            label: "Diseases & Treatments", icon: FiActivity },
    { key: "SecondOpinion",  label: "Surgeries",             icon: FiFileText },
    { key: "Blogs",          label: "Blogs",                 icon: FiBookOpen },
    { key: "Procedures",     label: "Procedures",            icon: FiFileText },
    { key: "HealthPackages", label: "Health Packages",       icon: FiPackage },
];

const RESULTS_PER_SECTION = 6;

function ResultCard({ item, type, onViewMore }) {
    const getTitle = () => {
        if (type === "DAT") return item.dtTitle;
        if (type === "SecondOpinion") return item.soTitle;
        if (type === "Blogs") return item.blogTitle;
        if (type === "Procedures") return item.procedureTitle || item.title;
        if (type === "HealthPackages") return item.packageTitle || item.title;
        return item.title || "Untitled";
    };

    const getImage = () => {
        if (type === "DAT") return item.dtImage;
        if (type === "SecondOpinion") return item.soImage;
        if (type === "Blogs") return item.blogImage;
        if (type === "Procedures") return item.procedureImage || item.image;
        if (type === "HealthPackages") return item.packageImage || item.image;
        return null;
    };

    const getDescription = () => {
        const extraFields = item.extraFields || [];
        if (extraFields.length > 0) {
            const raw = extraFields[0]?.description || "";
            const stripped = raw.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ").trim();
            return stripped.substring(0, 130) + (stripped.length > 130 ? "..." : "");
        }
        if (type === "Blogs" && item.categories?.length) {
            return `Categories: ${item.categories.join(", ")}`;
        }
        return "";
    };

    const getDepartment = () => {
        if (type === "DAT" && item.department) return item.department;
        if (type === "Blogs" && item.categories?.length) return item.categories[0];
        return null;
    };

    const title = getTitle();
    const image = getImage();
    const description = getDescription();
    const department = getDepartment();

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col group">
            {/* Image / Fallback */}
            {image ? (
                <div className="relative h-40 overflow-hidden bg-pink-50">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                            e.target.style.display = "none";
                            if (e.target.parentElement) {
                                e.target.parentElement.classList.add("fallback-bg");
                            }
                        }}
                    />
                </div>
            ) : (
                <div className="h-40 bg-pink-50 flex items-center justify-center border-b border-gray-100">
                    <span className="text-5xl font-bold text-pink-200 select-none">
                        {title ? title.charAt(0).toUpperCase() : "?"}
                    </span>
                </div>
            )}

            <div className="p-4 flex flex-col flex-1">
                {department && (
                    <span className="inline-block text-xs font-semibold text-pink-700 bg-pink-50 rounded-full px-2 py-0.5 mb-2 w-fit truncate max-w-full border border-pink-100">
                        {department}
                    </span>
                )}
                <h3 className="font-semibold text-gray-800 text-sm leading-snug mb-2 line-clamp-2">{title}</h3>
                {description && (
                    <p className="text-gray-500 text-xs leading-relaxed mb-3 flex-1 line-clamp-3">{description}</p>
                )}
                <button
                    onClick={() => onViewMore(item.url)}
                    className="mt-auto flex items-center gap-1 text-xs font-bold text-pink-700 hover:text-pink-900 group-hover:gap-2 transition-all duration-200 w-fit"
                >
                    View More <FiChevronRight size={14} />
                </button>
            </div>
        </div>
    );
}

function CategorySection({ title, items, type, onViewMore, showAll, onToggle }) {
    if (!items || items.length === 0) return null;
    const visible = showAll ? items : items.slice(0, RESULTS_PER_SECTION);

    return (
        <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <span className="w-1 h-6 bg-pink-700 rounded-full inline-block"></span>
                    {title}
                    <span className="text-sm font-normal text-gray-400 ml-1">({items.length})</span>
                </h2>
                {items.length > RESULTS_PER_SECTION && (
                    <button
                        onClick={onToggle}
                        className="text-xs font-semibold text-pink-700 hover:text-pink-900 underline transition-colors"
                    >
                        {showAll ? "Show Less" : `View All ${items.length}`}
                    </button>
                )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {visible.map((item, idx) => (
                    <ResultCard key={idx} item={item} type={type} onViewMore={onViewMore} />
                ))}
            </div>
        </div>
    );
}

export default function SearchResults({ initialQuery = "" }) {
    const router = useRouter();
    const [query, setQuery] = useState(initialQuery);
    const [inputValue, setInputValue] = useState(initialQuery);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("all");
    const [activeLetter, setActiveLetter] = useState(null);
    const [showAllMap, setShowAllMap] = useState({});

    const totalResults = results
        ? Object.values(results).reduce((sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0), 0)
        : 0;

    const fetchResults = useCallback(async (keyword) => {
        if (!keyword) return;
        setLoading(true);
        setError(null);
        setResults(null);
        setShowAllMap({});
        setActiveTab("all");
        try {
            const encodedKeyword = keyword === "#" ? "%23" : encodeURIComponent(keyword);
            const res = await axios.get(`${CONFIG.API_BASE_URL}/getDataByKeyword/${encodedKeyword}`);
            setResults(res.data);
        } catch (err) {
            console.error("Search error:", err);
            setError("Failed to fetch results. Please try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    /* Sync from URL on mount and when router.query changes */
    useEffect(() => {
        if (initialQuery) {
            setQuery(initialQuery);
            setInputValue(initialQuery);
            fetchResults(initialQuery);
        }
    }, [initialQuery, fetchResults]);

    const handleSearch = (e) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;
        const kw = inputValue.trim();
        setQuery(kw);
        setActiveLetter(null);
        router.replace({ pathname: "/search", query: { q: kw } }, undefined, { shallow: true });
        fetchResults(kw);
    };

    const handleAlphabetClick = (letter) => {
        setActiveLetter(letter);
        setInputValue(letter);
        setQuery(letter);
        router.replace({ pathname: "/search", query: { q: letter } }, undefined, { shallow: true });
        fetchResults(letter);
    };

    const handleHashClick = () => {
        setActiveLetter("#");
        setInputValue("#");
        setQuery("#");
        router.replace({ pathname: "/search", query: { q: "#" } }, undefined, { shallow: true });
        fetchResults("#");
    };

    const handleViewMore = (url) => {
        if (!url) return;
        const cleanUrl = url.replace(/^\/|\/$/g, "");
        router.push(`/${cleanUrl}`);
    };

    const toggleShowAll = (key) => {
        setShowAllMap(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const getFilteredResults = () => {
        if (!results) return {};
        if (activeTab === "all") return results;
        return { [activeTab]: results[activeTab] || [] };
    };

    const filteredResults = getFilteredResults();

    const getCategoryCount = (key) => {
        if (!results) return 0;
        if (key === "all") return totalResults;
        return Array.isArray(results[key]) ? results[key].length : 0;
    };

    const QUICK_SEARCHES = ["Diabetes", "Heart Disease", "Cancer", "Arthritis", "Brain Tumor", "Kidney Stone"];

    return (
        <div className="min-h-screen bg-gray-50">

            {/* ── Hero Search Banner ── */}
            <div className="relative overflow-hidden" style={{ minHeight: "420px" }}>

                {/* Real hospital image as base */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "url('/assets/Header/Cardiac-Sciences.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center top",
                    }}
                />

                {/* Multi-layer overlay: dark + brand tint */}
                <div className="absolute inset-0 bg-gradient-to-b from-pink-950/85 via-pink-900/80 to-pink-950/90" />
                {/* Horizontal shimmer layer */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

                {/* Animated pulsing orb — left */}
                <div
                    className="absolute left-[-60px] top-1/3 w-64 h-64 rounded-full pointer-events-none"
                    style={{
                        background: "radial-gradient(circle, rgba(244,63,94,0.25) 0%, transparent 70%)",
                        animation: "pulse 4s ease-in-out infinite",
                    }}
                />
                {/* Animated pulsing orb — right */}
                <div
                    className="absolute right-[-60px] bottom-0 w-72 h-72 rounded-full pointer-events-none"
                    style={{
                        background: "radial-gradient(circle, rgba(251,113,133,0.2) 0%, transparent 70%)",
                        animation: "pulse 5s ease-in-out infinite 1s",
                    }}
                />

                {/* Dot-grid texture — top right */}
                <div
                    className="absolute top-0 right-0 w-56 h-56 opacity-[0.06] pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)",
                        backgroundSize: "18px 18px",
                    }}
                />
                {/* Dot-grid texture — bottom left */}
                <div
                    className="absolute bottom-0 left-0 w-56 h-56 opacity-[0.06] pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)",
                        backgroundSize: "18px 18px",
                    }}
                />

                {/* Top shimmer accent line */}
                <div className="absolute top-0 left-0 right-0 h-[3px]"
                    style={{ background: "linear-gradient(90deg, transparent, #f9a8d4, #be185d, #f9a8d4, transparent)" }}
                />

                {/* ── Content ── */}
                <div className="relative z-10 max-w-4xl mx-auto px-4 py-14">

                    {/* Badge */}
                    <div className="flex justify-center mb-5">
                        <span className="inline-flex items-center gap-2 text-xs font-semibold text-pink-100 px-5 py-2 rounded-full border border-pink-400/30"
                            style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)" }}>
                            <FiSearch size={11} />
                            TX Hospitals · Knowledge Base
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-center font-bold leading-tight mb-2">
                        <span className="block text-white text-3xl md:text-4xl lg:text-5xl">
                            Find Any Disease,
                        </span>
                        <span className="block mt-1 text-2xl md:text-3xl lg:text-4xl font-light"
                            style={{ color: "#fda4af" }}>
                            Treatment or Surgery
                        </span>
                    </h1>
                    <p className="text-pink-200/80 text-sm text-center mb-8 max-w-md mx-auto leading-relaxed">
                        Instantly explore our comprehensive medical database — conditions, procedures, surgeries, blogs &amp; health packages.
                    </p>

                    {/* Search bar */}
                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-5">
                        <div className="flex items-center rounded-full overflow-hidden shadow-2xl"
                            style={{ background: "rgba(255,255,255,0.96)", border: "2px solid rgba(190,24,93,0.3)" }}>
                            <span className="pl-5 text-pink-400 flex-shrink-0">
                                <FiSearch size={20} />
                            </span>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="e.g. Heart Disease, Cancer, Arthritis..."
                                className="flex-1 py-4 px-4 text-gray-700 text-sm bg-transparent focus:outline-none placeholder-gray-400"
                            />
                            <button
                                type="submit"
                                className="flex-shrink-0 m-1.5 bg-pink-700 hover:bg-pink-800 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 flex items-center gap-2 shadow-lg"
                            >
                                Search <FiChevronRight size={15} />
                            </button>
                        </div>
                    </form>

                    {/* Quick search pills */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {QUICK_SEARCHES.map((term) => (
                            <button
                                key={term}
                                onClick={() => {
                                    setInputValue(term);
                                    setQuery(term);
                                    setActiveLetter(null);
                                    router.replace({ pathname: "/search", query: { q: term } }, undefined, { shallow: true });
                                    fetchResults(term);
                                }}
                                className="text-xs text-white/80 hover:text-white border border-white/20 hover:border-pink-300 hover:bg-white/10 px-3 py-1.5 rounded-full transition-all duration-150 backdrop-blur-sm"
                            >
                                {term}
                            </button>
                        ))}
                    </div>

                    {/* Alphabet strip */}
                    <div className="rounded-2xl p-4 border border-white/10"
                        style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(10px)" }}>
                        <p className="text-pink-200/70 text-[10px] font-bold mb-3 uppercase tracking-[0.18em] text-center">
                            ── Browse A to Z ──
                        </p>
                        <div className="flex flex-wrap gap-1.5 justify-center">
                            {ALPHABETS.map((letter) => (
                                <button
                                    key={letter}
                                    onClick={() => handleAlphabetClick(letter)}
                                    className={`w-8 h-8 rounded-full text-[11px] font-bold transition-all duration-150 ${
                                        activeLetter === letter
                                            ? "bg-white text-pink-700 shadow-lg scale-110"
                                            : "text-white/80 hover:bg-white/20 border border-white/10"
                                    }`}
                                    style={activeLetter === letter ? {} : { background: "rgba(255,255,255,0.08)" }}
                                >
                                    {letter}
                                </button>
                            ))}
                            <button
                                onClick={handleHashClick}
                                className={`px-3 h-8 rounded-full text-[11px] font-bold transition-all duration-150 ${
                                    activeLetter === "#"
                                        ? "bg-white text-pink-700 shadow-lg scale-110"
                                        : "text-white/80 hover:bg-white/20 border border-white/10"
                                }`}
                                style={activeLetter === "#" ? {} : { background: "rgba(255,255,255,0.08)" }}
                            >
                                #
                            </button>
                        </div>
                    </div>
                </div>

                {/* Curved wave bottom */}
                <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
                    <svg alt="Play Icon" viewBox="0 0 1440 54" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
                        style={{ display: "block", width: "100%", height: "54px" }}>
                        <path
                            d="M0,32 C240,60 480,8 720,32 C960,56 1200,8 1440,32 L1440,54 L0,54 Z"
                            fill="#f9fafb"
                        />
                    </svg>
                </div>
            </div>

            {/* ── Results Area ── */}
            <div className="max-w-6xl mx-auto px-4 py-8">

                {/* Query info */}
                {query && !loading && results && (
                    <p className="text-gray-600 text-sm mb-6">
                        Showing{" "}
                        <span className="font-semibold text-gray-800">{totalResults}</span>{" "}
                        results for{" "}
                        <span className="font-semibold text-pink-700">&quot;{query}&quot;</span>
                    </p>
                )}

                {/* Category Tabs */}
                {results && totalResults > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                        {CATEGORIES.map(({ key, label, icon: Icon }) => {
                            const count = getCategoryCount(key);
                            if (key !== "all" && count === 0) return null;
                            return (
                                <button
                                    key={key}
                                    onClick={() => setActiveTab(key)}
                                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                                        activeTab === key
                                            ? "bg-pink-700 text-white border-pink-700 shadow"
                                            : "bg-white text-gray-600 border-gray-200 hover:border-pink-700 hover:text-pink-700"
                                    }`}
                                >
                                    <Icon size={14} />
                                    {label}
                                    <span className={`text-xs rounded-full px-1.5 py-0.5 ml-0.5 ${
                                        activeTab === key ? "bg-pink-800 text-white" : "bg-pink-50 text-pink-700"
                                    }`}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <BiLoaderAlt className="animate-spin text-pink-700" size={40} />
                        <p className="text-gray-500 font-medium">Searching...</p>
                    </div>
                )}

                {/* Error */}
                {error && !loading && (
                    <div className="text-center py-20">
                        <p className="text-red-500 font-medium mb-2">{error}</p>
                        <button
                            onClick={() => fetchResults(query)}
                            className="text-sm text-pink-700 underline hover:text-pink-900"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* No results */}
                {!loading && !error && results && totalResults === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center border border-pink-100">
                            <FiSearch className="text-pink-300" size={32} />
                        </div>
                        <p className="text-gray-700 font-semibold text-lg">No results found</p>
                        <p className="text-gray-400 text-sm text-center max-w-sm">
                            Try a different keyword or browse using the alphabetical buttons above.
                        </p>
                    </div>
                )}

                {/* Pre-search empty state */}
                {!loading && !error && !results && !query && (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center border border-pink-100">
                            <FiSearch className="text-pink-300" size={32} />
                        </div>
                        <p className="text-gray-500 text-sm">
                            Use the search bar or click a letter above to get started
                        </p>
                    </div>
                )}

                {/* Results */}
                {!loading && !error && filteredResults && (
                    <>
                        <CategorySection
                            title="Diseases & Treatments"
                            items={filteredResults.DAT}
                            type="DAT"
                            onViewMore={handleViewMore}
                            showAll={!!showAllMap.DAT}
                            onToggle={() => toggleShowAll("DAT")}
                        />
                        <CategorySection
                            title="Surgeries & Second Opinions"
                            items={filteredResults.SecondOpinion}
                            type="SecondOpinion"
                            onViewMore={handleViewMore}
                            showAll={!!showAllMap.SecondOpinion}
                            onToggle={() => toggleShowAll("SecondOpinion")}
                        />
                        <CategorySection
                            title="Procedures"
                            items={filteredResults.Procedures}
                            type="Procedures"
                            onViewMore={handleViewMore}
                            showAll={!!showAllMap.Procedures}
                            onToggle={() => toggleShowAll("Procedures")}
                        />
                        <CategorySection
                            title="Blogs & Articles"
                            items={filteredResults.Blogs}
                            type="Blogs"
                            onViewMore={handleViewMore}
                            showAll={!!showAllMap.Blogs}
                            onToggle={() => toggleShowAll("Blogs")}
                        />
                        <CategorySection
                            title="Health Packages"
                            items={filteredResults.HealthPackages}
                            type="HealthPackages"
                            onViewMore={handleViewMore}
                            showAll={!!showAllMap.HealthPackages}
                            onToggle={() => toggleShowAll("HealthPackages")}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
