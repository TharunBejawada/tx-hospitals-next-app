import DOMPurify from 'dompurify';

export const cleanLinks = (html) => {
    if (!html || typeof html !== 'string') return html;
    // Strip hardcoded site domain so internal links remain relative paths (prevents cross-domain linker decoration)
    let clean = html.replace(/https?:\/\/(?:www\.)?txhospitals\.in(?=\/|$)/gi, "");
    // Strip tracking parameters like _gl, _gcl_au from href attributes
    clean = clean.replace(/(href=["'][^"']*?)(?:[?&]_gl=[^"'\s&]+)([^"']*?["'])/gi, '$1$2');
    clean = clean.replace(/(href=["'][^"']*?)(?:[?&]_gcl_[a-z0-9_]+=[^"'\s&]+)([^"']*?["'])/gi, '$1$2');
    // Fix dangling ? or & in href
    clean = clean.replace(/(href=["'][^"']*?)\?(?:&|["'])/gi, (m, p1) => m.endsWith('"') || m.endsWith("'") ? p1 + m.slice(-1) : p1 + '?');
    return clean;
};

const sanitize = (html) => {
    if (!html) return "";
    const cleaned = cleanLinks(html);
    if (typeof window !== 'undefined') {
        return DOMPurify.sanitize(cleaned);
    }
    return cleaned;
};

export default sanitize;
