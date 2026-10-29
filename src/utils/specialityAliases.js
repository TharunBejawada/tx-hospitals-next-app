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
    'cardiologist': ['cardiac sciences', 'cardiology', 'cardiac'],
    'heart': ['cardiac sciences', 'cardiology'],
    'cardiothoracic': ['cardiothoracic & vascular surgery', 'cardiothoracic and vascular surgery', 'cardiothoracic vascular surgery', 'cardiac sciences', 'cardiology'],
    'cardiothoracic & vascular surgery': ['cardiothoracic & vascular surgery', 'cardiothoracic and vascular surgery', 'cardiothoracic vascular surgery', 'cardiac sciences', 'cardiology'],
    'cardiothoracic vascular surgery': ['cardiothoracic & vascular surgery', 'cardiothoracic and vascular surgery', 'cardiothoracic vascular surgery', 'cardiac sciences', 'cardiology'],

    // Robotics
    'robotics': ['robotics science', 'robotic surgery', 'robotic sciences', 'robotic', 'robotics'],
    'robotic': ['robotics science', 'robotic surgery', 'robotic sciences', 'robotic', 'robotics'],
    'robotics science': ['robotics science', 'robotic surgery', 'robotic sciences', 'robotic', 'robotics'],
    'robotic surgery': ['robotics science', 'robotic surgery', 'robotic sciences', 'robotic', 'robotics'],
    'robotic sciences': ['robotics science', 'robotic surgery', 'robotic sciences', 'robotic', 'robotics'],

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
    'radiology': ['radiology', 'radiologist'],
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

const normalizeStr = (str) =>
    String(str || '')
        .toLowerCase()
        .replace(/[-_]/g, ' ')
        .replace(/[^\w\s&]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

function containsWholeWord(text, term) {
    if (!text || !term) return false;
    const cleanText = normalizeStr(text);
    const cleanTerm = normalizeStr(term);
    if (!cleanText || !cleanTerm) return false;

    if (cleanText === cleanTerm) return true;
    const regex = new RegExp(`\\b${cleanTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    return regex.test(cleanText);
}

/**
 * Resolves a speciality slug/name against a doctor record or department string.
 * Supports:
 * - Direct exact matches (case-insensitive, whitespace & hyphen normalized)
 * - Custom departments added via admin
 * - Multi-speciality arrays (departments & specialities)
 * - Alias groups (e.g. robotics, cardiac sciences, neurology, etc.)
 * - Safe whole-word matching (prevents "urology" matching "neurology")
 *
 * @param {string} specKey - target speciality slug or name (e.g. "cardiology", "robotics", "Sports Medicine")
 * @param {object|string|Array} docOrDept - doctor object, department array, or department string
 * @returns {boolean}
 */
export function matchesDepartment(specKey, docOrDept) {
    if (!specKey || !docOrDept) return false;

    const cleanTarget = normalizeStr(specKey);
    if (!cleanTarget) return false;

    const doctorSpecs = getDoctorSpecialities(docOrDept);
    if (doctorSpecs.length === 0) return false;

    const cleanDoctorSpecs = doctorSpecs.map(normalizeStr).filter(Boolean);

    // 1. Direct equality check (supports custom departments directly)
    if (cleanDoctorSpecs.some(spec => spec === cleanTarget)) {
        return true;
    }

    // 2. Safe whole-word check
    if (cleanDoctorSpecs.some(spec => containsWholeWord(spec, cleanTarget))) {
        return true;
    }

    // 3. Reverse whole-word check for multi-word targets (e.g. target "surgical gastroenterology", doc "gastroenterology")
    for (const spec of cleanDoctorSpecs) {
        if (spec.length >= 4 && containsWholeWord(cleanTarget, spec)) {
            return true;
        }
    }

    // 4. Alias lookup from dictionary
    const aliasTerms = SPECIALITY_ALIASES[cleanTarget] || null;
    if (aliasTerms) {
        const matchesAlias = aliasTerms.some(alias => {
            const cleanAlias = normalizeStr(alias);
            return cleanDoctorSpecs.some(spec => spec === cleanAlias || containsWholeWord(spec, cleanAlias));
        });
        if (matchesAlias) return true;
    }

    // Check reverse aliases: does any of the doctor's specialities have an alias map that includes cleanTarget?
    for (const spec of cleanDoctorSpecs) {
        const specAliases = SPECIALITY_ALIASES[spec];
        if (specAliases && specAliases.some(alias => normalizeStr(alias) === cleanTarget)) {
            return true;
        }
    }

    // 5. Common spelling variants (paed <-> ped)
    const term1 = cleanTarget.replace(/paed/g, 'ped');
    const term2 = cleanTarget.replace(/\bped\b/g, 'paed');
    if (cleanDoctorSpecs.some(spec => spec === term1 || spec === term2)) {
        return true;
    }

    return false;
}
