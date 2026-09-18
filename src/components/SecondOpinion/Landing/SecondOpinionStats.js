"use client";

export default function SecondOpinionStats({ stats = [] }) {
    // Fallback default stats with custom inline SVGs if none are provided
    const defaultStats = [
        {
            value: "2,00,000+",
            label: "Happy Patients",
            icon: (
                <svg alt="Icon" className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            )
        },
        {
            value: "25,000+",
            label: "Surgeries Performed",
            icon: (
                <svg alt="Icon" className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
            )
        },
        {
            value: "150+",
            label: "Expert Specialists",
            icon: (
                <svg alt="Icon" className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.5 2h15" />
                    <path d="M6 2v6a6 6 0 0 0 12 0V2" />
                    <path d="M12 14v4a2 2 0 1 0 4 0v-4" />
                    <path d="M12 14v3a2 2 0 0 0 4 0v-3" />
                </svg>
            )
        },
        {
            value: "NABH",
            label: "Accredited Hospital",
            icon: (
                <svg alt="Icon" className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Ribbon */}
                    <path d="M8 2L12 11L16 2" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 2L12 9L14 2" stroke="#eab308" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Medal */}
                    <circle cx="12" cy="15" r="5" fill="#facc15" stroke="#eab308" strokeWidth="1.5" />
                    <circle cx="12" cy="15" r="2" fill="#eab308" />
                </svg>
            )
        },
        {
            value: "24x7",
            label: "Emergency Care",
            icon: (
                <svg alt="Icon" className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                    <path d="M12 7v5l4 2" />
                </svg>
            )
        }
    ];

    const displayStats = stats.length > 0 ? stats : defaultStats;

    return (
        <section className="w-full bg-white py-6 md:py-10 px-4 sm:px-6 lg:px-12 overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                <div className="bg-[#fff5f6] rounded-[24px] lg:rounded-[32px] py-8 px-6 md:px-10 lg:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 gap-x-4 md:gap-6 lg:gap-8">
                        {displayStats.map((item, index) => (
                            <div 
                                key={index} 
                                className={`${
                                    index === 4 ? "col-span-2 md:col-span-1" : ""
                                } flex flex-col items-center justify-center text-center`}
                            >
                                {/* Icon wrapper floating directly on the pink card background */}
                                <div className="text-blue-600 mb-2.5 shrink-0 flex items-center justify-center h-8">
                                    {item.icon}
                                </div>
                                
                                {/* Counter / Value */}
                                <span className="text-xl lg:text-[22px] font-bold text-slate-900 leading-none">
                                    {item.value}
                                </span>
                                
                                {/* Label */}
                                <span className="text-xs font-semibold text-slate-600 mt-2 tracking-wide leading-tight max-w-[145px]">
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
