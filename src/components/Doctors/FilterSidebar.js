"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useIsMobile from "@/hooks/useIsMobile";

export default function FiltersSidebar({
    filteredDepartments = [],
    filteredLocations = [],
    selectedSpeciality,
    setSelectedSpeciality,
    selectedLocation,
    setSelectedLocation,
    locationSearch,
    setLocationSearch,
    specialitySearch,
    setSpecialitySearch,
    selectedAvailability = "",
    setSelectedAvailability,
    availabilityLoading = false,
}) {
    const [showAllSpecialities, setShowAllSpecialities] = useState(false);
    const isMobile = useIsMobile();

    const visibleDepartments = showAllSpecialities
        ? filteredDepartments
        : filteredDepartments.slice(0, 5);

    return (
        <>
            {isMobile ? (
                <aside className="w-full bg-gray-50 p-3 rounded-lg shadow-sm">
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => setShowAllSpecialities(!showAllSpecialities)}
                    >
                        <h2 className="text-xl font-bold text-pink-700">Filters</h2>
                        <span className="text-pink-700 font-semibold">
                            {showAllSpecialities ? "—" : "+"}
                        </span>
                    </div>
                    {showAllSpecialities && (
                        <div className="mt-4">
                            <div className="mb-6">
                                <h3 className="text-gray-700 font-semibold mb-2">Specialities</h3>

                                <div className="relative mb-3">
                                    <input
                                        type="text"
                                        placeholder="Search Specialities"
                                        value={specialitySearch}
                                        onChange={(e) => setSpecialitySearch(e.target.value)}
                                        className="w-full bg-transparent border border-gray-400 rounded-full pl-8 pr-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-pink-600"
                                    />
                                    <FaSearch className="absolute left-2 top-2 text-gray-500 text-sm" />
                                </div>

                                <div className="space-y-2 text-sm">
                                    {visibleDepartments.length > 0 ? (
                                        visibleDepartments.map((dept, i) => (
                                            <label key={i} className="flex items-center gap-2 text-gray-800">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedSpeciality === dept}
                                                    onChange={() =>
                                                        setSelectedSpeciality(
                                                            selectedSpeciality === dept ? "" : dept
                                                        )
                                                    }
                                                    className="accent-pink-600"
                                                />
                                                {dept}
                                            </label>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-xs">No specialities found</p>
                                    )}

                                    {filteredDepartments.length > 5 && (
                                        <button
                                            type="button"
                                            onClick={() => setShowAllSpecialities(!showAllSpecialities)}
                                            className="text-pink-700 font-semibold text-sm mt-1"
                                        >
                                            {showAllSpecialities
                                                ? "Show Less"
                                                : `+${filteredDepartments.length - 5} More`}
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="mb-6">
                                <h3 className="text-gray-700 font-semibold mb-2">Location</h3>
                                <div className="space-y-2 text-sm">
                                    {filteredLocations.length > 0 ? (
                                        filteredLocations.map((loc, i) => (
                                            <label key={i} className="flex items-center gap-2 text-gray-800">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedLocation === loc.value}
                                                    onChange={() =>
                                                        setSelectedLocation(
                                                            selectedLocation === loc.value ? "" : loc.value
                                                        )
                                                    }
                                                    className="accent-pink-600"
                                                />
                                                {loc.label}
                                            </label>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-xs">No locations found</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-gray-700 font-semibold">Availability</h3>
                                    {availabilityLoading && (
                                        <span className="text-[11px] text-pink-600 animate-pulse font-medium">Filtering...</span>
                                    )}
                                </div>
                                <div className="space-y-2 text-sm">
                                    {["Today", "Tomorrow"].map((day) => (
                                        <label key={day} className="flex items-center gap-2 text-gray-800 cursor-pointer select-none">
                                            <input
                                                type="checkbox"
                                                checked={selectedAvailability === day}
                                                onChange={() =>
                                                    setSelectedAvailability &&
                                                    setSelectedAvailability(selectedAvailability === day ? "" : day)
                                                }
                                                className="accent-pink-600 cursor-pointer"
                                            />
                                            {day}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </aside>
            ) : (
                <aside className="w-full md:w-[25%] bg-gray-50 p-4 rounded-lg shadow-sm">
                    <h2 className="text-2xl font-bold text-pink-700 mb-4">Filters</h2>

                    {/* Specialities */}
                    <div className="mb-6">
                        <h3 className="text-gray-700 font-semibold mb-2">Specialities</h3>
                        <div className="relative mb-3">
                            <input
                                type="text"
                                placeholder="Search Specialities"
                                value={specialitySearch}
                                onChange={(e) => setSpecialitySearch(e.target.value)}
                                className="w-full bg-transparent border border-gray-400 rounded-full pl-8 pr-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-pink-600"
                            />
                            <FaSearch className="absolute left-2 top-2 text-gray-500 text-sm" />
                        </div>

                        <div className="space-y-2 text-sm">
                            {visibleDepartments.length > 0 ? (
                                visibleDepartments.map((dept, i) => (
                                    <label key={i} className="flex items-center gap-2 text-gray-800">
                                        <input
                                            type="checkbox"
                                            checked={selectedSpeciality === dept}
                                            onChange={() =>
                                                setSelectedSpeciality(
                                                    selectedSpeciality === dept ? "" : dept
                                                )
                                            }
                                            className="accent-pink-600"
                                        />
                                        {dept}
                                    </label>
                                ))
                            ) : (
                                <p className="text-gray-500 text-xs">No specialities found</p>
                            )}

                            {filteredDepartments.length > 5 && (
                                <button
                                    type="button"
                                    onClick={() => setShowAllSpecialities(!showAllSpecialities)}
                                    className="text-pink-700 font-semibold text-sm mt-1"
                                >
                                    {showAllSpecialities
                                        ? "Show Less"
                                        : `+${filteredDepartments.length - 5} More`}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Location */}
                    <div className="mb-6">
                        <h3 className="text-gray-700 font-semibold mb-2">Location</h3>
                        <div className="space-y-2 text-sm">
                            {filteredLocations.length > 0 ? (
                                filteredLocations.map((loc, i) => (
                                    <label key={i} className="flex items-center gap-2 text-gray-800">
                                        <input
                                            type="checkbox"
                                            checked={selectedLocation === loc.value}
                                            onChange={() =>
                                                setSelectedLocation(
                                                    selectedLocation === loc.value ? "" : loc.value
                                                )
                                            }
                                            className="accent-pink-600"
                                        />
                                        {loc.label}
                                    </label>
                                ))
                            ) : (
                                <p className="text-gray-500 text-xs">No locations found</p>
                            )}
                        </div>
                    </div>

                    {/* Availability */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-gray-700 font-semibold">Availability</h3>
                            {availabilityLoading && (
                                <span className="text-[11px] text-pink-600 animate-pulse font-medium">Filtering...</span>
                            )}
                        </div>
                        <div className="space-y-2 text-sm">
                            {["Today", "Tomorrow"].map((day) => (
                                <label key={day} className="flex items-center gap-2 text-gray-800 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={selectedAvailability === day}
                                        onChange={() =>
                                            setSelectedAvailability &&
                                            setSelectedAvailability(selectedAvailability === day ? "" : day)
                                        }
                                        className="accent-pink-600 cursor-pointer"
                                    />
                                    {day}
                                </label>
                            ))}
                        </div>
                    </div>
                </aside>
            )}
        </>
    );
}
