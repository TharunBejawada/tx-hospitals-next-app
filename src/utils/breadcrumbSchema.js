const BASE_URL = "https://txhospitals.in";

/**
 * Generate Google BreadcrumbList JSON-LD schema
 * @param {Array<{ label: string, href?: string, fullLabel?: string }>} items
 * @param {string} currentPath
 * @returns {object|null}
 */
export function generateBreadcrumbSchema(items = [], currentPath = "") {
    if (!items || !Array.isArray(items) || items.length === 0) return null;

    const itemListElement = items.map((item, index) => {
        let itemUrl = item.href;

        // Fallback for the last (current) item if href was not explicitly provided
        if (!itemUrl && index === items.length - 1 && currentPath) {
            itemUrl = currentPath;
        }

        if (itemUrl && !itemUrl.startsWith("http")) {
            itemUrl = `${BASE_URL}${itemUrl.startsWith("/") ? "" : "/"}${itemUrl}`;
        }

        const listItem = {
            "@type": "ListItem",
            "position": index + 1,
            "name": item.fullLabel || item.label || `Item ${index + 1}`,
        };

        if (itemUrl) {
            listItem.item = itemUrl;
        }

        return listItem;
    });

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": itemListElement,
    };
}

export default generateBreadcrumbSchema;
