export const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Hospital", "MedicalOrganization", "Organization"],
    "@id": "https://txhospitals.in/#organization",
    "name": "TX Hospitals",
    "alternateName": [
        "TX Multi-Speciality Hospitals",
        "TX Hospitals Hyderabad"
    ],
    "url": "https://txhospitals.in/",
    "logo": "https://txhospitals.in/TXlogoWB.jpg",
    "image": "https://txhospitals.in/TXlogoWB.jpg",
    "description": "TX Hospitals offers world-class multi-specialty care in Hyderabad across Banjara Hills, Uppal, Kachiguda, and Miyapur with expert doctors, advanced medical infrastructure, and 24/7 emergency services.",
    "telephone": "+91 9144514459",
    "email": "info@txhospitals.in",
    "contactPoint": [
        {
            "@type": "ContactPoint",
            "telephone": "+91 9144514459",
            "contactType": "customer service",
            "areaServed": "IN",
            "availableLanguage": ["English", "Telugu", "Hindi"]
        },
        {
            "@type": "ContactPoint",
            "telephone": "+91 9963229765",
            "contactType": "emergency",
            "areaServed": "IN",
            "availableLanguage": ["English", "Telugu", "Hindi"]
        }
    ],
    "sameAs": [
        "https://www.facebook.com/txhospitals/",
        "https://www.instagram.com/txhospitals/",
        "https://www.youtube.com/@TXHOSPITALOfficial",
        "https://www.linkedin.com/company/tx-hospitals",
        "https://twitter.com/txhospitals"
    ],
    "address": [
        {
            "@type": "PostalAddress",
            "streetAddress": "8-2-680/A, Road No. 12, Sri Ram Nagar Colony, Banjara Hills",
            "addressLocality": "Banjara Hills, Hyderabad",
            "addressRegion": "Telangana",
            "postalCode": "500028",
            "addressCountry": "IN"
        },
        {
            "@type": "PostalAddress",
            "streetAddress": "# 2-6-71, Bharath Nagar Colony, Near Masjid Uppal",
            "addressLocality": "Uppal, Hyderabad",
            "addressRegion": "Telangana",
            "postalCode": "500039",
            "addressCountry": "IN"
        },
        {
            "@type": "PostalAddress",
            "streetAddress": "# 3-2-841/1, Kachiguda Station Rd, Mahalaxmi Nilayam, Kachiguda",
            "addressLocality": "Kachiguda, Hyderabad",
            "addressRegion": "Telangana",
            "postalCode": "500027",
            "addressCountry": "IN"
        },
        {
            "@type": "PostalAddress",
            "streetAddress": "Pillar No A 600, Plot 65 & 66, Miyapur Cross Road, Mathrusree Nagar, Hafeezpet",
            "addressLocality": "Miyapur, Hyderabad",
            "addressRegion": "Telangana",
            "postalCode": "500059",
            "addressCountry": "IN"
        }
    ],
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
        }
    ],
    "department": [
        {
            "@type": "Hospital",
            "name": "TX Hospitals, Banjara Hills",
            "url": "https://txhospitals.in/banjara-hills/",
            "telephone": "040-66529999",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "8-2-680/A, Road No. 12, Sri Ram Nagar Colony, Banjara Hills",
                "addressLocality": "Banjara Hills, Hyderabad",
                "addressRegion": "Telangana",
                "postalCode": "500028",
                "addressCountry": "IN"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 17.408587,
                "longitude": 78.444494
            }
        },
        {
            "@type": "Hospital",
            "name": "TX Hospitals, Uppal",
            "url": "https://txhospitals.in/uppal/",
            "telephone": "+91-40-43 108 108",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "# 2-6-71, Bharath Nagar Colony, Near Masjid Uppal",
                "addressLocality": "Uppal, Hyderabad",
                "addressRegion": "Telangana",
                "postalCode": "500039",
                "addressCountry": "IN"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 17.402553,
                "longitude": 78.566944
            }
        },
        {
            "@type": "Hospital",
            "name": "TX Hospitals, Kachiguda",
            "url": "https://txhospitals.in/kachiguda/",
            "telephone": "+91-40-48 108 108",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "# 3-2-841/1, Kachiguda Station Rd, Mahalaxmi Nilayam, Kachiguda",
                "addressLocality": "Kachiguda, Hyderabad",
                "addressRegion": "Telangana",
                "postalCode": "500027",
                "addressCountry": "IN"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 17.389778,
                "longitude": 78.495443
            }
        },
        {
            "@type": "Hospital",
            "name": "TX Hospitals, Miyapur",
            "url": "https://txhospitals.in/miyapur/",
            "telephone": "040-21999999",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Pillar No A 600, Plot 65 & 66, Miyapur Cross Road, Mathrusree Nagar, Hafeezpet",
                "addressLocality": "Miyapur, Hyderabad",
                "addressRegion": "Telangana",
                "postalCode": "500059",
                "addressCountry": "IN"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 17.495941,
                "longitude": 78.364664
            }
        }
    ]
};

export default organizationSchema;
