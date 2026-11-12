/**
 * Utility to filter and rank top active doctors for a specific hospital branch.
 *
 * @param {Array} doctorsList - List of all doctors from the API.
 * @param {string|RegExp} locationFilter - Branch name or regex (e.g. "Banjara", "Miyapur").
 * @param {number} limit - Maximum number of top doctors to return (default: 3).
 * @returns {Array} - Top active doctors sorted by priorityOrder ascending and experience descending.
 */
const parseExperience = (exp) => {
    const num = parseInt(String(exp || '').replace(/\D+/g, ''), 10);
    return isNaN(num) ? 0 : num;
};

export function getDoctorPriorityOrder(doc) {
    const raw = doc?.priorityOrder;
    if (raw === undefined || raw === null || String(raw).trim() === '') {
        return 999;
    }
    const num = Number(raw);
    return Number.isFinite(num) ? num : 999;
}

export function isActiveDoctor(doc) {
    if (!doc || typeof doc !== 'object') return false;
    if (!doc.name || !String(doc.name).trim()) return false;
    const status = doc.status ? String(doc.status).toLowerCase() : '';
    return (status ? status === 'active' : doc.enabled !== false)
        && status !== 'inactive'
        && doc.enabled !== false;
}

export function sortDoctorsByPriority(doctors = []) {
    if (!Array.isArray(doctors)) return [];
    return [...doctors].sort((a, b) => {
        const prioA = getDoctorPriorityOrder(a);
        const prioB = getDoctorPriorityOrder(b);

        if (prioA !== prioB) {
            return prioA - prioB;
        }

        const expDiff = parseExperience(b?.experience) - parseExperience(a?.experience);
        if (expDiff !== 0) {
            return expDiff;
        }

        return String(a?.name || '').localeCompare(String(b?.name || ''));
    });
}

export function getTopBranchDoctors(doctorsList = [], locationFilter = '', limit = 3) {
    if (!Array.isArray(doctorsList) || !locationFilter) return [];

    const locRegex = typeof locationFilter === 'string'
        ? new RegExp(locationFilter, 'i')
        : locationFilter;

    const matching = doctorsList.filter((doc) => {
        if (!isActiveDoctor(doc)) return false;

        // Location check across location string and locations array
        const locStr = (doc.location || '') + ' ' + (Array.isArray(doc.locations) ? doc.locations.join(' ') : '');
        return locRegex.test(locStr);
    });

    return sortDoctorsByPriority(matching).slice(0, limit);
}

export default getTopBranchDoctors;

