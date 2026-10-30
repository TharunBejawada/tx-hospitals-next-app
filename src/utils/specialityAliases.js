/**
 * Maps URL slug keywords (lowercase) to their corresponding DB department keywords (lowercase).
 * Used to bridge the gap between URL-friendly speciality slugs, multiple specialities,
 * and the department field values stored in the getAllDoctors API response.
 */

export const SPECIALITY_ALIASES = {
    // Cardiac
    'cardiology': ['cardiac sciences', 'cardiology', 'cardiac', 'cardiologist', 'heart', 'cardiothoracic & vascular surgery', 'cardiothoracic and vascular surgery', 'cardiothoracic vascular surgery'],
    'cardiac': ['cardiac sciences', 'cardiology', 'cardiac', 'heart'],
    'cardiac sciences': ['cardiac sciences', 'cardiology', 'cardiac', 'cardiologist', 'heart'],
    'cardiac science': ['cardiac sciences', 'cardiology', 'cardiac', 'cardiologist', 'heart'],
    'cardiologist': ['cardiac sciences', 'cardiology', 'cardiac'],
    'heart': ['cardiac sciences', 'cardiology'],
    'cardiothoracic': ['cardiothoracic & vascular surgery', 'cardiothoracic and vascular surgery', 'cardiothoracic vascular surgery', 'cardiac sciences', 'cardiology'],
    'cardiothoracic & vascular surgery': ['cardiothoracic & vascular surgery', 'cardiothoracic and vascular surgery', 'cardiothoracic vascular surgery', 'cardiac sciences', 'cardiology'],
    'cardiothoracic vascular surgery': ['cardiothoracic & vascular surgery', 'cardiothoracic and vascular surgery', 'cardiothoracic vascular surgery', 'cardiac sciences', 'cardiology'],

    // Robotics (general & compound specialties)
    'robotics': ['robotics science', 'robotic surgery', 'robotic sciences', 'robotic', 'robotics'],
    'robotic': ['robotics science', 'robotic surgery', 'robotic sciences', 'robotic', 'robotics'],
    'robotics science': ['robotics science', 'robotic surgery', 'robotic sciences', 'robotic', 'robotics'],
    'robotic science': ['robotics science', 'robotic surgery', 'robotic sciences', 'robotic', 'robotics'],
    'robotic surgery': ['robotics science', 'robotic surgery', 'robotic sciences', 'robotic', 'robotics'],
    'robotic sciences': ['robotics science', 'robotic surgery', 'robotic sciences', 'robotic', 'robotics'],

    // Robotic Orthopaedics
    'robotic orthopaedics': ['robotic orthopaedics', 'robotic orthopaedic', 'robotic orthopedics', 'robotic orthopedic', 'robotic orthopaedic surgery', 'robotic orthopedic surgery', 'robotic surgery', 'orthopaedics', 'orthopedics', 'robotics', 'robotic'],
    'robotic orthopaedic': ['robotic orthopaedics', 'robotic orthopaedic', 'robotic orthopedics', 'robotic orthopedic', 'robotic orthopaedic surgery', 'robotic orthopedic surgery', 'robotic surgery', 'orthopaedics', 'orthopedics', 'robotics', 'robotic'],
    'robotic orthopedics': ['robotic orthopaedics', 'robotic orthopaedic', 'robotic orthopedics', 'robotic orthopedic', 'robotic orthopaedic surgery', 'robotic orthopedic surgery', 'robotic surgery', 'orthopaedics', 'orthopedics', 'robotics', 'robotic'],
    'robotic orthopedic': ['robotic orthopaedics', 'robotic orthopaedic', 'robotic orthopedics', 'robotic orthopedic', 'robotic orthopaedic surgery', 'robotic orthopedic surgery', 'robotic surgery', 'orthopaedics', 'orthopedics', 'robotics', 'robotic'],
    'robotic orthopaedic surgery': ['robotic orthopaedics', 'robotic orthopaedic', 'robotic orthopedics', 'robotic orthopedic', 'robotic orthopaedic surgery', 'robotic orthopedic surgery', 'robotic surgery', 'orthopaedics', 'orthopedics', 'robotics', 'robotic'],
    'robotic orthopedic surgery': ['robotic orthopaedics', 'robotic orthopaedic', 'robotic orthopedics', 'robotic orthopedic', 'robotic orthopaedic surgery', 'robotic orthopedic surgery', 'robotic surgery', 'orthopaedics', 'orthopedics', 'robotics', 'robotic'],

    // Robotic Gynaecology
    'robotic gynaecology': ['robotic gynaecology', 'robotic gynecology', 'robotic gynaecology surgery', 'robotic gynecology surgery', 'robotic surgery', 'gynaecology', 'gynecology', 'robotics', 'robotic'],
    'robotic gynecology': ['robotic gynaecology', 'robotic gynecology', 'robotic gynaecology surgery', 'robotic gynecology surgery', 'robotic surgery', 'gynaecology', 'gynecology', 'robotics', 'robotic'],
    'robotic gynaecology surgery': ['robotic gynaecology', 'robotic gynecology', 'robotic gynaecology surgery', 'robotic gynecology surgery', 'robotic surgery', 'gynaecology', 'gynecology', 'robotics', 'robotic'],
    'robotic gynecology surgery': ['robotic gynaecology', 'robotic gynecology', 'robotic gynaecology surgery', 'robotic gynecology surgery', 'robotic surgery', 'gynaecology', 'gynecology', 'robotics', 'robotic'],

    // Robotic Urology
    'robotic urology': ['robotic urology', 'robotic urology surgery', 'robotic urologic surgery', 'robotic surgery', 'urology', 'robotics', 'robotic'],
    'robotic urology surgery': ['robotic urology', 'robotic urology surgery', 'robotic urologic surgery', 'robotic surgery', 'urology', 'robotics', 'robotic'],
    'robotic urologic surgery': ['robotic urology', 'robotic urology surgery', 'robotic urologic surgery', 'robotic surgery', 'urology', 'robotics', 'robotic'],

    // Robotic Oncology / Cancer Surgery
    'robotic oncology': ['robotic oncology', 'robotic cancer surgery', 'robotic surgical oncology', 'robotic surgery', 'oncology', 'cancer', 'robotics', 'robotic'],
    'robotic cancer surgery': ['robotic oncology', 'robotic cancer surgery', 'robotic surgical oncology', 'robotic surgery', 'oncology', 'cancer', 'robotics', 'robotic'],
    'robotic surgical oncology': ['robotic oncology', 'robotic cancer surgery', 'robotic surgical oncology', 'robotic surgery', 'oncology', 'cancer', 'robotics', 'robotic'],

    // Robotic Gastrointestinal
    'robotic gastrointestinal': ['robotic gastrointestinal surgery', 'robotic gastro', 'robotic gastroenterology', 'robotic surgery', 'gastroenterology', 'gastro', 'robotics', 'robotic'],
    'robotic gastrointestinal surgery': ['robotic gastrointestinal surgery', 'robotic gastro', 'robotic gastroenterology', 'robotic surgery', 'gastroenterology', 'gastro', 'robotics', 'robotic'],
    'robotic gastro': ['robotic gastrointestinal surgery', 'robotic gastro', 'robotic gastroenterology', 'robotic surgery', 'gastroenterology', 'gastro', 'robotics', 'robotic'],
    'robotic gastroenterology': ['robotic gastrointestinal surgery', 'robotic gastro', 'robotic gastroenterology', 'robotic surgery', 'gastroenterology', 'gastro', 'robotics', 'robotic'],

    // Gastroenterology
    'gastroenterology': ['gastroenterology', 'gastro sciences', 'gastro', 'gastroenterologist', 'medical gastroenterology', 'surgical gastroenterology'],
    'gastro': ['gastroenterology', 'gastro sciences', 'medical gastroenterology', 'surgical gastroenterology'],
    'gastroenterologist': ['gastroenterology', 'gastro sciences', 'medical gastroenterology', 'surgical gastroenterology'],
    'gastro sciences': ['gastroenterology', 'gastro sciences', 'medical gastroenterology', 'surgical gastroenterology'],
    'medical gastroenterology': ['medical gastroenterology', 'gastroenterology', 'gastro sciences'],
    'surgical gastroenterology': ['surgical gastroenterology', 'gastroenterology', 'gastro sciences'],

    // Neurology
    'neurology': ['neuro sciences', 'neurology', 'neurosurgery', 'neuro', 'neurologist', 'neurosurgeon'],
    'neuro': ['neuro sciences', 'neurology', 'neurosurgery'],
    'neuro sciences': ['neuro sciences', 'neurology', 'neurosurgery', 'neuro', 'neurologist', 'neurosurgeon'],
    'neurologist': ['neuro sciences', 'neurology'],
    'neurosurgery': ['neuro sciences', 'neurology', 'neurosurgery', 'neurosurgeon'],
    'neurosurgeon': ['neuro sciences', 'neurology', 'neurosurgery'],

    // Orthopaedics
    'orthopaedics': ['orthopaedics', 'orthopedics', 'orthopaedic', 'orthopedic'],
    'orthopedics': ['orthopaedics', 'orthopedics', 'orthopaedic', 'orthopedic'],
    'orthopedic': ['orthopaedics', 'orthopedics', 'orthopaedic', 'orthopedic'],
    'orthopaedic': ['orthopaedics', 'orthopedics', 'orthopaedic', 'orthopedic'],

    // Urology & Nephrology
    'urology': ['urology', 'urologist'],
    'urologist': ['urology'],
    'nephrology': ['nephrology', 'nephrologist', 'kidney'],
    'nephrologist': ['nephrology'],
    'kidney': ['nephrology', 'urology'],

    // Pulmonology
    'pulmonology': ['pulmonology', 'pulmonologist', 'lungs'],
    'pulmonologist': ['pulmonology'],
    'lungs': ['pulmonology'],

    // ENT
    'ent': ['ent', 'ear nose throat'],

    // Paediatrics & Gynaecology
    'paediatrics': ['paediatrics', 'pediatrics', 'pediatrician', 'paediatrician', 'mother and child care', 'mother & child care'],
    'pediatrics': ['paediatrics', 'pediatrics', 'pediatrician', 'paediatrician', 'mother and child care', 'mother & child care'],
    'pediatric': ['paediatrics', 'pediatrics', 'pediatrician', 'paediatrician'],
    'paediatric': ['paediatrics', 'pediatrics', 'pediatrician', 'paediatrician'],
    'pediatrician': ['paediatrics', 'pediatrics'],
    'paediatrician': ['paediatrics', 'pediatrics'],
    'mother and child care': ['mother and child care', 'mother & child care', 'paediatrics', 'gynaecology'],
    'mother child care': ['mother and child care', 'mother & child care', 'paediatrics', 'gynaecology'],
    'gynaecology': ['gynaecology', 'gynecology', 'gynaecologist', 'gynecologist', 'obstetrics', 'mother and child care'],
    'gynecology': ['gynaecology', 'gynecology', 'gynaecologist', 'gynecologist', 'obstetrics'],
    'gynecologist': ['gynaecology', 'gynecology'],
    'gynaecologist': ['gynaecology', 'gynecology'],
    'obstetrics': ['gynaecology', 'gynecology'],

    // Oncology
    'oncology': ['oncology', 'oncologist', 'cancer', 'surgical oncology'],
    'oncologist': ['oncology', 'cancer'],
    'cancer': ['oncology', 'cancer'],
    'surgical oncology': ['surgical oncology', 'oncology'],

    // Dermatology & Cosmetic
    'plastic': ['plastic surgery', 'cosmetic', 'dermatology', 'skin', 'skin & cosmetic care'],
    'plastic surgery': ['plastic surgery', 'cosmetic', 'dermatology', 'skin', 'skin & cosmetic care'],
    'cosmetic': ['cosmetic', 'plastic surgery', 'dermatology', 'skin', 'skin & cosmetic care'],
    'dermatology': ['dermatology', 'cosmetic', 'skin', 'skin & cosmetic care', 'plastic surgery'],
    'skin': ['skin', 'dermatology', 'cosmetic', 'skin & cosmetic care'],
    'skin & cosmetic care': ['skin & cosmetic care', 'skin', 'dermatology', 'cosmetic', 'plastic surgery'],

    // Other Specialities
    'endocrinology': ['endocrinology', 'diabetes', 'endocrinologist'],
    'diabetes': ['endocrinology'],
    'rheumatology': ['rheumatology', 'rheumatologist'],
    'radiology': ['radiology', 'radiologist', 'interventional radiology'],
    'interventional radiology': ['interventional radiology', 'radiology', 'radiologist'],
    'anaesthesia': ['anaesthesia & pain management', 'anaesthesia', 'anesthesia', 'pain management', 'pain'],
    'anesthesia': ['anaesthesia & pain management', 'anaesthesia', 'anesthesia', 'pain management', 'pain'],
    'anaesthesia & pain management': ['anaesthesia & pain management', 'anaesthesia', 'anesthesia', 'pain management', 'pain'],
    'pain': ['anaesthesia & pain management', 'anaesthesia', 'pain management', 'pain'],
    'internal medicine': ['internal medicine', 'general medicine'],
    'general medicine': ['internal medicine', 'general medicine'],
    'ophthalmology': ['ophthalmology', 'opthalmology', 'eye'],
    'opthalmology': ['ophthalmology', 'opthalmology', 'eye'],
    'eye': ['ophthalmology', 'opthalmology'],
    'dental': ['dental & maxillofacial', 'dental', 'dentist', 'dentistry'],
    'dental & maxillofacial': ['dental & maxillofacial', 'dental', 'dentist', 'dentistry'],
    'dentist': ['dental & maxillofacial', 'dental', 'dentistry']
};

/**
 * Extracts all specialities / departments from a doctor record into a clean unique array
 */
export const getDoctorSpecialities = (doc) => {
    if (!doc) return [];
    if (Array.isArray(doc)) return doc.map(s => String(s).trim()).filter(Boolean);
    if (typeof doc === 'string') return doc.split(/[,/]+/).map(s => s.trim()).filter(Boolean);

    const list = [
        ...(Array.isArray(doc.departments) ? doc.departments : []),
        ...(Array.isArray(doc.specialities) ? doc.specialities : []),
        ...((doc.category || doc.department || "").split(/[,/]+/).map(s => s.trim()).filter(Boolean))
    ];
    return Array.from(new Set(list.map(s => String(s).trim()))).filter(Boolean);
};

/**
 * Normalizes speciality/department strings:
 * - Lowercases and trims
 * - Replaces hyphens/underscores with spaces
 * - Normalizes spelling variants (orthopaed <-> orthoped, paed <-> ped, gynaec <-> gynec, anaesth <-> anesth)
 * - Strips location words and facility words (hospitals, clinics, etc.)
 * - Stems trailing plural 's' (orthopaedics -> orthopaedic)
 */
export const normalizeSpecialityKey = (str) => {
    if (!str) return '';
    let s = String(str)
        .toLowerCase()
        .replace(/[-_]/g, ' ')
        .replace(/[^\w\s&]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    // Spelling normalizations
    s = s.replace(/orthopaed/g, 'orthoped');
    s = s.replace(/paed/g, 'ped');
    s = s.replace(/gynaec/g, 'gynec');
    s = s.replace(/anaesth/g, 'anesth');
    s = s.replace(/opthalm/g, 'ophthalm');

    // Strip facility and location stop words
    const stopWords = /\b(hospitals?|centres?|centers?|departments?|clinics?|units?|banjara hills|kachiguda|miyapur|uppal|hyderabad)\b/g;
    s = s.replace(stopWords, ' ').replace(/\s+/g, ' ').trim();

    // Normalize tokens: stem trailing 's' unless 'ss' or short word (e.g. orthopaedics -> orthopaedic)
    const tokens = s.split(' ').filter(Boolean).map(w => {
        if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) {
            return w.slice(0, -1);
        }
        return w;
    });
    return tokens.join(' ');
};

function containsWholeWord(text, term) {
    if (!text || !term) return false;
    if (text === term) return true;
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|\\s)${escaped}(\\s|$)`, 'i');
    return regex.test(text);
}

/**
 * Resolves a speciality slug/name against a doctor record or department string.
 * Supports:
 * - Direct exact matches (case-insensitive, whitespace & hyphen normalized)
 * - Custom departments added via admin
 * - Multi-speciality arrays (departments & specialities)
 * - Alias groups (e.g. robotics, cardiac sciences, neurology, etc.)
 * - Stemming & plural/singular invariance (orthopaedics <-> orthopaedic)
 * - Spelling variants (orthopaedic <-> orthopedic, paed <-> ped, etc.)
 * - Safe whole-word matching (prevents "urology" matching "neurology")
 *
 * @param {string} specKey - target speciality slug or name (e.g. "cardiology", "robotics", "ROBOTIC ORTHOPAEDIC")
 * @param {object|string|Array} docOrDept - doctor object, department array, or department string
 * @returns {boolean}
 */
export function matchesDepartment(specKey, docOrDept) {
    if (!specKey || !docOrDept) return false;

    const rawDoctorSpecs = getDoctorSpecialities(docOrDept);
    if (rawDoctorSpecs.length === 0) return false;

    const normTarget = normalizeSpecialityKey(specKey);
    if (!normTarget) return false;

    const normDoctorSpecs = rawDoctorSpecs.map(normalizeSpecialityKey).filter(Boolean);

    // 1. Direct equality check on normalized stem (handles all casing, plurals, spelling)
    if (normDoctorSpecs.some(spec => spec === normTarget)) {
        return true;
    }

    // 2. Safe whole-word check on normalized text
    if (normDoctorSpecs.some(spec => containsWholeWord(spec, normTarget))) {
        return true;
    }

    // 3. Reverse whole-word check for multi-word targets
    for (const spec of normDoctorSpecs) {
        if (spec.length >= 4 && containsWholeWord(normTarget, spec)) {
            return true;
        }
    }

    // 4. Token subset matching for multi-word medical specialities (e.g. 'robotic orthopedic surgery' vs 'robotic orthopedic')
    const targetTokens = normTarget.split(' ').filter(w => !['surgery', 'care', 'unit', 'service'].includes(w));
    if (targetTokens.length >= 2) {
        for (const spec of normDoctorSpecs) {
            const specTokens = spec.split(' ').filter(w => !['surgery', 'care', 'unit', 'service'].includes(w));
            if (specTokens.length >= 2) {
                const targetContainsSpec = specTokens.every(t => targetTokens.includes(t));
                const specContainsTarget = targetTokens.every(t => specTokens.includes(t));
                if (targetContainsSpec || specContainsTarget) return true;
            }
        }
    }

    // 5. Alias dictionary matching (both target and aliases normalized)
    const targetAliases = (SPECIALITY_ALIASES[normTarget] || []).map(normalizeSpecialityKey);
    if (targetAliases.length > 0) {
        if (normDoctorSpecs.some(s => targetAliases.includes(s) || targetAliases.some(a => containsWholeWord(s, a)))) {
            return true;
        }
    }

    // 6. Check reverse aliases: does any doctor speciality map to target?
    for (const spec of normDoctorSpecs) {
        const specAliases = (SPECIALITY_ALIASES[spec] || []).map(normalizeSpecialityKey);
        if (specAliases.includes(normTarget) || specAliases.some(a => containsWholeWord(normTarget, a))) {
            return true;
        }
    }

    return false;
}
