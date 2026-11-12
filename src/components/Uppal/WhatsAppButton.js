'use client';
import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = ({ 
    phoneNumber = "919247903419", 
    message = "Hi, I would like to book an appointment.",
    className = "",
    sizeClass = "py-3 px-8 text-base"
}) => {
    const [hovered, setHovered] = useState(false);

    const handleClick = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <button 
            onClick={handleClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                backgroundColor: hovered ? '#25D366' : '#ffffff',
                color: hovered ? '#ffffff' : '#128C7E',
                borderColor: '#25D366',
                transform: hovered ? 'translateY(-4px) scale(1.05)' : 'translateY(0) scale(1)',
                boxShadow: hovered
                    ? '0 20px 40px rgba(37, 211, 102, 0.35)'
                    : '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease-in-out',
            }}
            className={`border-2 font-bold ${sizeClass} rounded-full flex items-center justify-center gap-3 shrink-0 ${className}`}
        >
            <FaWhatsapp 
                style={{ 
                    color: hovered ? '#ffffff' : '#25D366',
                    transition: 'color 0.3s ease-in-out',
                    width: '24px', 
                    height: '24px', 
                    flexShrink: 0 
                }} 
            />
            <span>Chat on WhatsApp</span>
        </button>
    );
};

export default WhatsAppButton;
