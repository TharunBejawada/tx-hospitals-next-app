import React from 'react';
import Image from 'next/image';
import useIsMobile from '@/hooks/useIsMobile';

const HeroSection = ({
    title,
    highlightedTitle,
    subtitle,
    description,
    buttons,
    bannerImage,
    backgroundImage
}) => {
    const isMobile = useIsMobile();

    // Mobile Design
    if (isMobile) {
        // Find the "Book An Appointment" button
        const bookButton = buttons.find(btn => btn.text === "Book An Appointment");

        return (
            <section className="w-full bg-[#fde8e8] mt-2 px-4 py-4 overflow-hidden">
                <div className="max-w-md mx-auto flex flex-col items-center">
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-center leading-tight">
                        <span className="text-[#B12C49]">{highlightedTitle}</span>
                        <br />
                        <span className="text-[#1a1a1a]">{subtitle}</span>
                    </h1>

                    {/* Image */}
                    <div className="relative w-full max-w-[280px]">
                        {/* The background box/frame */}
                        <Image
                            src={backgroundImage}
                            alt="Transplantation Background Box"
                            width={400}
                            height={400}
                            className="w-full h-auto drop-shadow-xl"
                            priority
                        />
                        {/* The Actual Kidney Image inside */}
                        <div className="absolute inset-0 flex items-center justify-center p-[15%]">
                            <Image
                                src={bannerImage}
                                alt={highlightedTitle}
                                width={300}
                                height={300}
                                className="w-full h-auto object-contain"
                                priority
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-[#1a1a1a] text-base leading-relaxed text-center font-medium px-2">
                        {description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col items-center gap-3 w-full px-4">
                        {buttons.map((btn, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (btn.onClick) {
                                        btn.onClick();
                                    }
                                }}
                                className={`${btn.className} px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold shadow-lg transition-all transform active:scale-95 flex-1`}
                            >
                                {btn.icon && (
                                    <Image
                                        src={btn.icon}
                                        alt={btn.alt}
                                        width={20}
                                        height={20}
                                        className="w-5 h-5 object-contain"
                                    />
                                )}
                                {btn.text}
                            </button>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // Desktop Design (Original)
    return (
        <section className="w-full bg-[#fde8e8] px-16 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-6">
                {/* Left Content */}
                <div className="w-1/2 space-y-8">
                    <h1 className="text-4xl font-bold text-[#1a1a1a] leading-tight">
                        <span className="text-[#B12C49]">{highlightedTitle}</span> <br className="hidden md:block" />
                        {subtitle}
                    </h1>
                    <p className="text-[#4a4a4a] text-xl leading-relaxed max-w-xl font-medium">
                        {description}
                    </p>
                    <div className="flex flex-row items-center gap-4 pt-4">
                        {buttons.map((btn, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (btn.onClick) {
                                        btn.onClick();
                                    }
                                }}
                                className={`${btn.className} px-6 py-2 rounded-xl flex items-center justify-center gap-3 text-lg font-bold shadow-lg transition-all transform hover:scale-105 active:scale-95`}
                            >
                                {btn.icon && (
                                    <Image
                                        src={btn.icon}
                                        alt={btn.alt}
                                        width={btn.width || 32}
                                        height={btn.height || 32}
                                        className="w-8 h-8 object-contain"
                                    />
                                )}
                                {btn.text}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Image */}
                <div className="w-1/2 relative flex justify-center items-center">
                    <div className="relative w-full max-w-[550px]">
                        {/* The background box/frame */}
                        <Image
                            src={backgroundImage}
                            alt="Transplantation Background Box"
                            width={600}
                            height={600}
                            className="w-full h-auto drop-shadow-2xl"
                            priority
                        />
                        {/* The Actual Liver Image inside */}
                        <div className="absolute inset-0 flex items-center justify-center p-[15%]">
                            <Image
                                src={bannerImage}
                                alt={highlightedTitle}
                                width={450}
                                height={450}
                                className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
