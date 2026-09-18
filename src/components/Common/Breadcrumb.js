"use client";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

export default function Breadcrumb({ items = [], separator = <FaChevronRight size={12} /> }) {
    return (
        <nav data-block="Breadcrumb" className="flex items-center text-sm text-gray-500">
            {items.map((item, index) => {
                const isFirst = index === 0;
                const isLast = index === items.length - 1;

                return (
                    <div key={index} data-block="BreadcrumbItem" className="flex items-center">
                        {/* clickable link if href exists */}
                        {!isLast && item.href ? (
                            <Link
                                href={item.href}
                                title={item.fullLabel || item.label}
                                className="flex items-center hover:text-pink-600 transition-colors cursor-pointer"
                            >
                                {isFirst && (
                                    <svg
                                        className="w-3 h-3 me-2.5"
                                        aria-hidden="true"
                                        alt="Image"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                    </svg>
                                )}
                                {item.label}
                            </Link>
                        ) : (
                            <span
                                title={item.fullLabel || item.label}
                                className={`font-medium ${isLast ? "text-pink-700" : "text-gray-700"
                                    }`}
                            >
                                {item.label}
                            </span>
                        )}

                        {/* Separator (not for last item) */}
                        {!isLast && <span className="mx-2 text-gray-400">{separator}</span>}
                    </div>
                );
            })}
        </nav>
    );
}
