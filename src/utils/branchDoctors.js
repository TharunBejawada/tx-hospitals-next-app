/**
 * Utility to filter and rank top active doctors for a specific hospital branch.
 *
 * @param {Array} doctorsList - List of all doctors from the API.
 * @param {string|RegExp} locationFilter - Branch name or regex (e.g. "Banjara", "Miyapur").
 * @param {number} limit - Maximum number of top doctors to return (default: 3).
 * @returns {Array} - Top active doctors sorted by priorityOrder ascending and experience descending.
 */
export function getTopBranchDoctors(doctorsList = [], locationFilter = '', limit = 3) {
    if (!Array.isArray(doctorsList) || !locationFilter) return [];

    const locRegex = typeof locationFilter === 'string'
        ? new RegExp(locationFilter, 'i')
        : locationFilter;

    const parseExperience = (exp) => {
        const num = parseInt(String(exp || '').replace(/\D+/g, ''), 10);
        return isNaN(num) ? 0 : num;
    };

    return doctorsList
        .filter((doc) => {
            if (!doc) return false;

            // Only active & enabled doctors
            const isActive = (doc.status ? doc.status.toLowerCase() === 'active' : doc.enabled !== false)
                && doc.status !== 'inactive'
                && doc.enabled !== false;
            if (!isActive) return false;

            // Location check across location string and locations array
            const locStr = (doc.location || '') + ' ' + (Array.isArray(doc.locations) ? doc.locations.join(' ') : '');
            return locRegex.test(locStr);
        })
        .sort((a, b) => {
            const prioA = (a.priorityOrder !== undefined && a.priorityOrder !== null && a.priorityOrder !== '')
                ? Number(a.priorityOrder)
                : 999;
            const prioB = (b.priorityOrder !== undefined && b.priorityOrder !== null && b.priorityOrder !== '')
                ? Number(b.priorityOrder)
                : 999;

            if (prioA !== prioB) {
                return prioA - prioB;
            }

            return parseExperience(b.experience) - parseExperience(a.experience);
        })
        .slice(0, limit);
}

export default getTopBranchDoctors;

