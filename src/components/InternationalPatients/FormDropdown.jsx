import React from "react";
import SearchableDropdown from "@/components/Common/SearchableDropdown";

/**
 * Reusable FormDropdown component built on top of the project's SearchableDropdown.
 * Features an interactive searchable floating menu, clean chevron, label with required indicator,
 * and exact styling matching the International Patients form design.
 */
export default function FormDropdown({
    label,
    name,
    value,
    onChange,
    options = [],
    placeholder = "Select an option",
    required = false,
    disabled = false,
    className = "",
    style = {},
    error = "",
}) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                fontSize: "12.5px",
                fontWeight: 600,
                color: "rgb(58, 49, 52)",
            }}
            className={className}
        >
            {label && (
                <label className="flex items-center gap-1 select-none">
                    {label}
                    {required && <span style={{ color: "rgb(189, 40, 80)", fontWeight: 700 }}>*</span>}
                </label>
            )}

            <SearchableDropdown
                name={name}
                value={value}
                onChange={onChange}
                options={options}
                placeholder={placeholder}
                disabled={disabled}
                className="w-full min-h-[38px] flex items-center justify-between text-[13.5px] rounded-[10px] px-3 py-2 text-[#1F1A1C] transition-all bg-[rgb(253,251,252)] hover:border-[#BD2850]"
                style={{
                    minHeight: "40px",
                    border: error ? "1.5px solid #E11D48" : "1px solid rgb(227, 214, 218)",
                    background: disabled ? "rgb(243, 240, 241)" : "rgb(253, 251, 252)",
                    borderRadius: "10px",
                    ...style,
                }}
            />

            {error && (
                <span className="text-[11px] text-[#BD2850] font-normal">{error}</span>
            )}
        </div>
    );
}
