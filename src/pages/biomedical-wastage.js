import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import CONFIG from '../config';
import Head from "next/head";
import SecondaryLayout from '@/components/Layouts/SecondaryLayout';
import useIsMobile from "@/hooks/useIsMobile";
import Breadcrumb from "@/components/Common/Breadcrumb";

const BioMedicalWastage = () => {

    const isMobile = useIsMobile();
    const [branch, setBranch] = useState("");
    const [filterType, setFilterType] = useState("");
    const [date, setDate] = useState("");
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.scrollTo({ left: document.body.scrollWidth, top: 0, behavior: "smooth" });
        }
    }, []);

    const branches = ["Banjara Hills", "Kachiguda", "Uppal"];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2016 + 1 }, (_, i) => 2016 + i).reverse();
    const months = [
        { name: "January", value: "01" },
        { name: "February", value: "02" },
        { name: "March", value: "03" },
        { name: "April", value: "04" },
        { name: "May", value: "05" },
        { name: "June", value: "06" },
        { name: "July", value: "07" },
        { name: "August", value: "08" },
        { name: "September", value: "09" },
        { name: "October", value: "10" },
        { name: "November", value: "11" },
        { name: "December", value: "12" },
    ];

    const fetchData = async () => {
        try {
            let apiUrl = "";
            if (filterType === "date" && date) {
                apiUrl = `${CONFIG.API_BASE_URL}/getBioMedicalWastage/${branch}/${date}`;
            } else if (filterType === "month" && year && month) {
                apiUrl = `${CONFIG.API_BASE_URL}/getBioMedicalWastageByDate/${branch}/${year}/${month}`;
            } else if (filterType === "month" && year) {
                apiUrl = `${CONFIG.API_BASE_URL}/getBioMedicalWastageByDate/${branch}/${year}`;
            }

            if (apiUrl) {
                const res = await axios.get(apiUrl);
                let result = res.data;
                if (result && !Array.isArray(result)) {
                    result = [result];
                }
                setData(result || []);
            }
        } catch (err) {
            console.error("Failed to fetch:", err);
        }
    };

    return (
        <>
            <Head>
                <title>Bio Medical Wastage - TX Hospitals</title>
                <meta name="description" content="Check Bio Medical Wastage data for TX Hospitals branches in Banjara Hills, Kachiguda, and Uppal." />
            </Head>
            <SecondaryLayout>
                <div className="lg:max-w-7xl sm:w-full mx-auto px-4 lg:px-12 pt-4 pb-2">
                    <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Bio Medical Wastage" }]} />
                </div>
                <div className="lg:max-w-7xl sm:w-full mx-auto px-2 lg:px-12 lg:py-6">
                    {!isMobile && (
                        <div className="font-inter">
                            <h1 className="text-5xl text-left font-bold pl-5 text-pink-700 mb-8">
                                Bio Medical Wastage
                            </h1>
                            <div className="flex flex-wrap items-center justify-center bg-white shadow-md rounded-2xl py-3 gap-4 w-full border border-gray-100 mb-10">
                                {/* Branch Selector */}
                                <div className="flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-pink-600" />
                                    <select
                                        value={branch}
                                        onChange={(e) => setBranch(e.target.value)}
                                        className="outline-none bg-transparent text-sm border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                    >
                                        <option value="">Select Branch</option>
                                        {branches.map((b) => (
                                            <option key={b} value={b}>{b}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Divider */}
                                <div className="h-6 w-px bg-gray-300" />

                                {/* Filter Type Radio */}
                                <div className="flex items-center gap-4 text-sm">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            value="date"
                                            checked={filterType === "date"}
                                            onChange={(e) => setFilterType(e.target.value)}
                                            className="mr-2 text-pink-600 focus:ring-pink-500"
                                        />
                                        Date
                                    </label>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            value="month"
                                            checked={filterType === "month"}
                                            onChange={(e) => setFilterType(e.target.value)}
                                            className="mr-2 text-pink-600 focus:ring-pink-500"
                                        />
                                        Month & Year
                                    </label>
                                </div>

                                {/* Divider */}
                                <div className="h-6 w-px bg-gray-300" />

                                {/* Conditional Filters */}
                                {filterType === "date" && (
                                    <div className="flex items-center gap-2">
                                        <FaCalendarAlt className="text-gray-600" />
                                        <input
                                            type="date"
                                            className="border px-3 py-2 rounded-md text-sm outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                    </div>
                                )}

                                {filterType === "month" && (
                                    <div className="flex items-center gap-2">
                                        <FaCalendarAlt className="text-gray-600" />
                                        <select
                                            value={year}
                                            onChange={(e) => setYear(e.target.value)}
                                            className="border px-3 py-2 rounded-md text-sm outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                                        >
                                            <option value="">Select Year</option>
                                            {years.map((y) => (
                                                <option key={y} value={y}>{y}</option>
                                            ))}
                                        </select>
                                        <select
                                            value={month}
                                            onChange={(e) => setMonth(e.target.value)}
                                            className="border px-3 py-2 rounded-md text-sm outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                                        >
                                            <option value="">Select Month (optional)</option>
                                            {months.map((m) => (
                                                <option key={m.value} value={m.value}>{m.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* Search Button */}
                                <div className="">
                                    <button
                                        onClick={fetchData}
                                        className="bg-pink-700 hover:bg-pink-600 text-white p-3 rounded-xl transition-all shadow-lg hover:shadow-pink-200 active:scale-95"
                                    >
                                        <FaSearch />
                                    </button>
                                </div>
                            </div>
                            {/* Table */}
                            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
                                {data.length > 0 ? (
                                    <table className="min-w-full border-collapse text-center">
                                        <thead>
                                            <tr className="bg-pink-700 text-white">
                                                <th className="px-6 py-4 border-b font-semibold text-sm">Hospital</th>
                                                <th className="px-6 py-4 border-b font-semibold text-sm">Wastage - Date</th>
                                                <th className="px-6 py-4 border-b font-semibold text-sm">Clinical - Waste</th>
                                                <th className="px-6 py-4 border-b font-semibold text-sm">Infectious - Waste</th>
                                                <th className="px-6 py-4 border-b font-semibold text-sm">Sharp - Waste</th>
                                                <th className="px-6 py-4 border-b font-semibold text-sm">Bottle - Waste</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((entry, idx) => (
                                                <tr key={idx} className="hover:bg-pink-50 transition-colors">
                                                    <td className="px-6 py-4 border-b text-sm text-gray-700 font-medium">{entry.branch}</td>
                                                    <td className="px-6 py-4 border-b text-sm text-gray-600">{entry.date}</td>
                                                    <td className="px-6 py-4 border-b text-sm text-gray-600">{entry.ClinicalWaste}</td>
                                                    <td className="px-6 py-4 border-b text-sm text-gray-600">{entry.InfectiousWaste}</td>
                                                    <td className="px-6 py-4 border-b text-sm text-gray-600">{entry.SharpWaste}</td>
                                                    <td className="px-6 py-4 border-b text-sm text-gray-600">{entry.BottleWaste}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="text-center py-20 text-gray-400 italic bg-gray-50 rounded-xl">
                                        <FaSearch className="mx-auto text-4xl mb-4 text-gray-200" />
                                        No data available. Please select filters and search...
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    {isMobile && (
                        <div className="-mt-4 font-inter">
                            <h1 className="text-2xl text-center font-bold text-pink-700 mb-2 px-4">
                                Bio Medical Wastage
                            </h1>
                            <div className="flex flex-col items-center justify-center bg-white shadow-xl rounded-2xl py-3 px-4 gap-3 w-full border border-gray-100 mb-8">
                                {/* Branch Selector */}
                                <div className="flex flex-col w-full gap-2">
                                    <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-2">
                                        <FaMapMarkerAlt className="text-pink-600" /> Select Branch
                                    </label>
                                    <select
                                        value={branch}
                                        onChange={(e) => setBranch(e.target.value)}
                                        className="w-full outline-none bg-gray-50 text-sm border border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-pink-500 transition-all"
                                    >
                                        <option value="">Select Branch</option>
                                        {branches.map((b) => (
                                            <option key={b} value={b}>{b}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Filter Type Radio */}
                                <div className="flex items-center justify-around w-full bg-gray-50 p-1 rounded-xl">
                                    <label className={`flex-1 text-center py-2 rounded-lg cursor-pointer transition-all text-sm font-medium ${filterType === 'date' ? 'bg-white shadow text-pink-700' : 'text-gray-500'}`}>
                                        <input
                                            type="radio"
                                            value="date"
                                            checked={filterType === "date"}
                                            onChange={(e) => setFilterType(e.target.value)}
                                            className="hidden"
                                        />
                                        Date
                                    </label>
                                    <label className={`flex-1 text-center py-2 rounded-lg cursor-pointer transition-all text-sm font-medium ${filterType === 'month' ? 'bg-white shadow text-pink-700' : 'text-gray-500'}`}>
                                        <input
                                            type="radio"
                                            value="month"
                                            checked={filterType === "month"}
                                            onChange={(e) => setFilterType(e.target.value)}
                                            className="hidden"
                                        />
                                        Month & Year
                                    </label>
                                </div>

                                {/* Conditional Filters */}
                                {filterType === "date" && (
                                    <div className="flex flex-col w-full gap-2">
                                        <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-2">
                                            <FaCalendarAlt className="text-gray-600" /> Select Date
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full border border-gray-200 px-4 py-3 rounded-xl text-sm bg-gray-50 focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                    </div>
                                )}

                                {filterType === "month" && (
                                    <div className="flex flex-col w-full gap-4">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-2">
                                                <FaCalendarAlt className="text-gray-600" /> Select Year & Month
                                            </label>
                                            <div className="flex gap-2">
                                                <select
                                                    value={year}
                                                    onChange={(e) => setYear(e.target.value)}
                                                    className="flex-1 border border-gray-200 px-4 py-3 rounded-xl text-sm bg-gray-50 focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                                                >
                                                    <option value="">Year</option>
                                                    {years.map((y) => (
                                                        <option key={y} value={y}>{y}</option>
                                                    ))}
                                                </select>
                                                <select
                                                    value={month}
                                                    onChange={(e) => setMonth(e.target.value)}
                                                    className="flex-1 border border-gray-200 px-4 py-3 rounded-xl text-sm bg-gray-50 focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                                                >
                                                    <option value="">Month</option>
                                                    {months.map((m) => (
                                                        <option key={m.value} value={m.value}>{m.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Search Button */}
                                <button
                                    onClick={fetchData}
                                    className="w-full bg-pink-700 hover:bg-pink-600 text-white py-2 rounded-xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-pink-100 active:scale-95 transition-all"
                                >
                                    <FaSearch /> Search Records
                                </button>
                            </div>
                            {/* Table */}
                            <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-100 mb-10">
                                {data.length > 0 ? (
                                    <table className="min-w-full text-center">
                                        <thead className="bg-pink-700 text-white">
                                            <tr>
                                                <th className="px-4 py-3 text-[10px] uppercase tracking-wider font-bold">Hosp.</th>
                                                <th className="px-4 py-3 text-[10px] uppercase tracking-wider font-bold">Date</th>
                                                <th className="px-2 py-3 text-[10px] uppercase tracking-wider font-bold">Clinical</th>
                                                <th className="px-2 py-3 text-[10px] uppercase tracking-wider font-bold">Infect.</th>
                                                <th className="px-2 py-3 text-[10px] uppercase tracking-wider font-bold">Sharp</th>
                                                <th className="px-2 py-3 text-[10px] uppercase tracking-wider font-bold">Bottle</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {data.map((entry, idx) => (
                                                <tr key={idx} className="active:bg-pink-50">
                                                    <td className="px-4 py-3 text-[11px] font-bold text-gray-800">{entry.branch.split(' ')[0]}</td>
                                                    <td className="px-4 py-3 text-[10px] text-gray-600">{entry.date}</td>
                                                    <td className="px-2 py-3 text-[11px] text-gray-700">{entry.ClinicalWaste}</td>
                                                    <td className="px-2 py-3 text-[11px] text-gray-700">{entry.InfectiousWaste}</td>
                                                    <td className="px-2 py-3 text-[11px] text-gray-700">{entry.SharpWaste}</td>
                                                    <td className="px-2 py-3 text-[11px] text-gray-700">{entry.BottleWaste}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="text-center py-16 text-gray-400 italic px-6">
                                        <FaSearch className="mx-auto text-3xl mb-3 text-gray-200" />
                                        <p className="text-sm">No data available yet.</p>
                                        <p className="text-xs mt-1">Select your filters and tap search.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </SecondaryLayout>
        </>
    );
};

export default BioMedicalWastage;