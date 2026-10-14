/**
 * Shared branch location data used by FAQ+Map sections across
 * both the Branch Specialties Landing and Branch Specialty Detail pages.
 *
 * Keys are lowercase location slugs (matching URL params).
 */
const BRANCH_LOCATION_DATA = {
    'banjara-hills': {
        coords: [17.408587026550897, 78.44449394391825],
        mapName: 'TX Hospitals, Banjara Hills, Hyderabad',
        displayName: 'Banjara Hills',
        address: '8-2-680/A, Road No. 12, Sri Ram Nagar Colony, Banjara Hills, Hyderabad, Telangana 500028',
        phone: '040-66529999',
        phoneHref: 'tel:04066529999',
        blogLocation: 'Banjara Hills',
    },
    'kachiguda': {
        coords: [17.389777991297837, 78.49544286499808],
        mapName: 'TX Hospitals, Kachiguda, Hyderabad',
        displayName: 'Kachiguda',
        address: '3-2-841/1, Kachiguda Station Rd, Mahalaxmi Nilayam, Kachiguda, Hyderabad, Telangana 500027',
        phone: '+91-40-48 108 108',
        phoneHref: 'tel:+914048108108',
        blogLocation: 'Kachiguda',
    },
    'miyapur': {
        coords: [17.49594147086547, 78.36466448274872],
        mapName: 'TX Hospitals, Miyapur, Hyderabad',
        displayName: 'Miyapur',
        address: 'Pillar No A 600, Plot 65 & 66, Miyapur Cross Road, Mathrusree Nagar, Hafeezpet, Hyderabad, Telangana 500059',
        phone: '040-21999999',
        phoneHref: 'tel:04021999999',
        blogLocation: 'Miyapur',
    },
    'uppal': {
        coords: [17.402553358453122, 78.56694358887127],
        mapName: 'TX Hospitals, Uppal, Hyderabad',
        displayName: 'Uppal',
        address: '#2-6-71, Bharath Nagar Colony, Near Masjid Uppal, Hyderabad, Telangana 500039',
        phone: '+91-40-43 108 108',
        phoneHref: 'tel:+914043108108',
        blogLocation: 'Uppal',
    },
};

/**
 * Resolve branch data from a location slug.
 * Falls back to Banjara Hills if no match found.
 */
export function getBranchData(locationSlug) {
    if (!locationSlug) return BRANCH_LOCATION_DATA['banjara-hills'];
    const key = locationSlug.toLowerCase().replace(/\s+/g, '-');
    return BRANCH_LOCATION_DATA[key] || BRANCH_LOCATION_DATA['banjara-hills'];
}

export default BRANCH_LOCATION_DATA;
