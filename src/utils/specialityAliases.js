/**
 * Maps URL slug keywords (lowercase) to their corresponding DB department keywords (lowercase).
 * Used to bridge the gap between URL-friendly speciality slugs, multiple specialities,
 * and the department field values stored in the getAllDoctors API response.
 */

export const SPECIALITY_ALIASES = {
    // Cardiac (keep Cardiac Sciences/Cardiology separate from Cardiothoracic & Vascular Surgery)
    'cardiology': ['cardiac sciences', 'cardiology', 'cardiac', 'cardiologist', 'heart'],
    'cardiac': ['cardiac sciences', 'cardiology', 'cardiac', 'cardiologist', 'heart'],
    'cardiac sciences': ['cardiac sciences', 'cardiology', 'cardiac', 'cardiologist', 'heart'],
    'cardiac science': ['cardiac sciences', 'cardiology', 'cardiac', 'cardiologist', 'heart'],
    'cardiologist': ['cardiac sciences', 'cardiology', 'cardiac'],
    'heart': ['cardiac sciences', 'cardiology'],
    'cardiothoracic': ['cardiothoracic & vascular surgery', 'cardiothoracic and vascular surgery', 'cardiothoracic vascular surgery', 'cardiothoracic surgery'],
    'cardiothoracic surgery': ['cardiothoracic & vascular surgery', 'cardiothoracic and vascular surgery', 'cardiothoracic vascular surgery', 'cardiothoracic surgery'],
    'cardiothoracic & vascular surgery': ['cardiothoracic & vascular surgery', 'cardiothoracic and vascular surgery', 'cardiothoracic vascular surgery', 'cardiothoracic surgery'],
    'cardiothoracic and vascular surgery': ['cardiothoracic & vascular surgery', 'cardiothoracic and vascular surgery', 'cardiothoracic vascular surgery', 'cardiothoracic surgery'],
    'cardiothoracic vascular surgery': ['cardiothoracic & vascular surgery', 'cardiothoracic and vascular surgery', 'cardiothoracic vascular surgery', 'cardiothoracic surgery'],
    'vascular surgery': ['cardiothoracic & vascular surgery', 'cardiothoracic and vascular surgery', 'cardiothoracic vascular surgery', 'vascular surgery'],

    // Robotics (general umbrella only - subspecialties stay isolated below)
    'robotics': ['robotics science', 'robotic surgery', 'robotic sciences', 'robotic', 'robotics'],
    'robotic': ['robotics science', 'robotic surgery', 'robotic sciences', 'robotic', 'robotics'],
    'robotics science': ['robotics science', 'robotic surgery', 'robotic sciences', 'robotic', 'robotics'],
    'robotic science': ['robotics science', 'robotic surgery', 'robotic sciences', 'robotic', 'robotics'],
    'robotic surgery': ['robotics science', 'robotic surgery', 'robotic sciences', 'robotic', 'robotics'],
    'robotic sciences': ['robotics science', 'robotic surgery', 'robotic sciences', 'robotic', 'robotics'],

    // Robotic Orthopaedics (strictly orthopaedic robotics)
    'robotic orthopaedics': ['robotic orthopaedics', 'robotic orthopaedic', 'robotic orthopedics', 'robotic orthopedic', 'robotic orthopaedic surgery', 'robotic orthopedic surgery'],
    'robotic orthopaedic': ['robotic orthopaedics', 'robotic orthopaedic', 'robotic orthopedics', 'robotic orthopedic', 'robotic orthopaedic surgery', 'robotic orthopedic surgery'],
    'robotic orthopedics': ['robotic orthopaedics', 'robotic orthopaedic', 'robotic orthopedics', 'robotic orthopedic', 'robotic orthopaedic surgery', 'robotic orthopedic surgery'],
    'robotic orthopedic': ['robotic orthopaedics', 'robotic orthopaedic', 'robotic orthopedics', 'robotic orthopedic', 'robotic orthopaedic surgery', 'robotic orthopedic surgery'],
    'robotic orthopaedic surgery': ['robotic orthopaedics', 'robotic orthopaedic', 'robotic orthopedics', 'robotic orthopedic', 'robotic orthopaedic surgery', 'robotic orthopedic surgery'],
    'robotic orthopedic surgery': ['robotic orthopaedics', 'robotic orthopaedic', 'robotic orthopedics', 'robotic orthopedic', 'robotic orthopaedic surgery', 'robotic orthopedic surgery'],

    // Robotic Gynaecology (strictly gynaecological robotics)
    'robotic gynaecology': ['robotic gynaecology', 'robotic gynecology', 'robotic gynaecology surgery', 'robotic gynecology surgery'],
    'robotic gynecology': ['robotic gynaecology', 'robotic gynecology', 'robotic gynaecology surgery', 'robotic gynecology surgery'],
    'robotic gynaecology surgery': ['robotic gynaecology', 'robotic gynecology', 'robotic gynaecology surgery', 'robotic gynecology surgery'],
    'robotic gynecology surgery': ['robotic gynaecology', 'robotic gynecology', 'robotic gynaecology surgery', 'robotic gynecology surgery'],

    // Robotic Urology (strictly urological robotics)
    'robotic urology': ['robotic urology', 'robotic urology surgery', 'robotic urologic surgery'],
    'robotic urology surgery': ['robotic urology', 'robotic urology surgery', 'robotic urologic surgery'],
    'robotic urologic surgery': ['robotic urology', 'robotic urology surgery', 'robotic urologic surgery'],

    // Robotic Oncology / Cancer Surgery (strictly oncological robotics)
    'robotic oncology': ['robotic oncology', 'robotic cancer surgery', 'robotic surgical oncology'],
    'robotic cancer surgery': ['robotic oncology', 'robotic cancer surgery', 'robotic surgical oncology'],
    'robotic surgical oncology': ['robotic oncology', 'robotic cancer surgery', 'robotic surgical oncology'],

    // Robotic Gastrointestinal (strictly GI robotics)
    'robotic gastrointestinal': ['robotic gastrointestinal surgery', 'robotic gastro', 'robotic gastroenterology'],
    'robotic gastrointestinal surgery': ['robotic gastrointestinal surgery', 'robotic gastro', 'robotic gastroenterology'],
    'robotic gastro': ['robotic gastrointestinal surgery', 'robotic gastro', 'robotic gastroenterology'],
    'robotic gastroenterology': ['robotic gastrointestinal surgery', 'robotic gastro', 'robotic gastroenterology'],

    // Gastroenterology (umbrella maps to Medical & Surgical GI; subspecialties stay strictly separate)
    'gastroenterology': ['gastroenterology', 'gastro sciences', 'gastro', 'gastroenterologist', 'medical gastroenterology', 'surgical gastroenterology'],
    'gastro': ['gastroenterology', 'gastro sciences', 'medical gastroenterology', 'surgical gastroenterology'],
    'gastroenterologist': ['gastroenterology', 'gastro sciences', 'medical gastroenterology', 'surgical gastroenterology'],
    'gastro sciences': ['gastroenterology', 'gastro sciences', 'medical gastroenterology', 'surgical gastroenterology'],
    'medical gastroenterology': ['medical gastroenterology', 'medical gastro'],
    'medical gastro': ['medical gastroenterology', 'medical gastro'],
    'surgical gastroenterology': ['surgical gastroenterology', 'surgical gastro'],
    'surgical gastro': ['surgical gastroenterology', 'surgical gastro'],

    // Neurology
    'neurology': ['neuro sciences', 'neurosciences', 'neurology', 'neurosurgery', 'neuro', 'neurologist', 'neurosurgeon'],
    'neuro': ['neuro sciences', 'neurosciences', 'neurology', 'neurosurgery'],
    'neuro sciences': ['neuro sciences', 'neurosciences', 'neurology', 'neurosurgery', 'neuro', 'neurologist', 'neurosurgeon'],
    'neurosciences': ['neuro sciences', 'neurosciences', 'neurology', 'neurosurgery', 'neuro', 'neurologist', 'neurosurgeon'],
    'neurologist': ['neuro sciences', 'neurosciences', 'neurology'],
    'neurosurgery': ['neuro sciences', 'neurosciences', 'neurology', 'neurosurgery', 'neurosurgeon'],
    'neurosurgeon': ['neuro sciences', 'neurosciences', 'neurology', 'neurosurgery'],

    // Orthopaedics
    'orthopaedics': ['orthopaedics', 'orthopedics', 'orthopaedic', 'orthopedic', 'robotic orthopaedics'],
    'orthopedics': ['orthopaedics', 'orthopedics', 'orthopaedic', 'orthopedic', 'robotic orthopaedics'],
    'orthopedic': ['orthopaedics', 'orthopedics', 'orthopaedic', 'orthopedic', 'robotic orthopaedics'],
    'orthopaedic': ['orthopaedics', 'orthopedics', 'orthopaedic', 'orthopedic', 'robotic orthopaedics'],
    'orthopaedic surgery': ['orthopaedics', 'orthopedics', 'orthopaedic', 'orthopedic', 'robotic orthopaedics'],
    'orthopedic surgery': ['orthopaedics', 'orthopedics', 'orthopaedic', 'orthopedic', 'robotic orthopaedics'],

    // Urology & Nephrology
    'urology': ['urology', 'urologist', 'robotic urology'],
    'urologist': ['urology', 'robotic urology'],
    'nephrology': ['nephrology', 'nephrologist'],
    'nephrologist': ['nephrology'],
    'kidney': ['nephrology', 'urology'],

    // Pulmonology
    'pulmonology': ['pulmonology', 'pulmonologist', 'lungs'],
    'pulmonologist': ['pulmonology'],
    'lungs': ['pulmonology'],

    // ENT
    'ent': ['ent', 'ear nose throat'],
    'ear nose throat': ['ent', 'ear nose throat'],

    // Paediatrics & Gynaecology (keep Paediatrics and Gynaecology separate; Mother & Child Care spans both)
    'paediatrics': ['paediatrics', 'pediatrics', 'pediatrician', 'paediatrician'],
    'pediatrics': ['paediatrics', 'pediatrics', 'pediatrician', 'paediatrician'],
    'pediatric': ['paediatrics', 'pediatrics', 'pediatrician', 'paediatrician'],
    'paediatric': ['paediatrics', 'pediatrics', 'pediatrician', 'paediatrician'],
    'pediatrician': ['paediatrics', 'pediatrics'],
    'paediatrician': ['paediatrics', 'pediatrics'],
    'mother and child care': ['mother and child care', 'mother & child care', 'paediatrics', 'gynaecology', 'obstetrics'],
    'mother child care': ['mother and child care', 'mother & child care', 'paediatrics', 'gynaecology', 'obstetrics'],
    'gynaecology': ['gynaecology', 'gynecology', 'gynaecologist', 'gynecologist', 'obstetrics', 'robotic gynaecology'],
    'gynecology': ['gynaecology', 'gynecology', 'gynaecologist', 'gynecologist', 'obstetrics', 'robotic gynaecology'],
    'gynecologist': ['gynaecology', 'gynecology', 'robotic gynaecology'],
    'gynaecologist': ['gynaecology', 'gynecology', 'robotic gynaecology'],
    'obstetrics': ['gynaecology', 'gynecology', 'obstetrics'],

    // Oncology
    'oncology': ['oncology', 'oncologist', 'cancer', 'surgical oncology', 'robotic oncology'],
    'oncologist': ['oncology', 'cancer', 'surgical oncology', 'robotic oncology'],
    'cancer': ['oncology', 'cancer', 'surgical oncology', 'robotic oncology'],
    'surgical oncology': ['surgical oncology', 'oncology', 'robotic oncology'],

    // Transplant Medicine & Liver Transplantation
    'transplant medicine': ['transplant medicine', 'liver transplantation surgery', 'liver transplant', 'organ transplant'],
    'transplant': ['transplant medicine', 'liver transplantation surgery', 'liver transplant', 'organ transplant'],
    'organ transplant': ['transplant medicine', 'liver transplantation surgery', 'liver transplant', 'organ transplant'],
    'liver transplantation surgery': ['liver transplantation surgery', 'transplant medicine', 'liver transplant'],
    'liver transplant': ['liver transplantation surgery', 'transplant medicine', 'liver transplant'],

    // Dermatology & Cosmetic
    'plastic': ['plastic surgery', 'cosmetic', 'dermatology', 'skin', 'skin & cosmetic care', 'dermatology cosmetic care'],
    'plastic surgery': ['plastic surgery', 'cosmetic', 'dermatology', 'skin', 'skin & cosmetic care', 'dermatology cosmetic care'],
    'cosmetic': ['cosmetic', 'cosmetic surgery', 'plastic surgery', 'dermatology', 'skin', 'skin & cosmetic care', 'dermatology cosmetic care'],
    'cosmetic surgery': ['cosmetic', 'cosmetic surgery', 'plastic surgery', 'dermatology', 'skin', 'skin & cosmetic care', 'dermatology cosmetic care'],
    'dermatology': ['dermatology', 'cosmetic', 'skin', 'skin & cosmetic care', 'plastic surgery', 'dermatology cosmetic care'],
    'dermatology cosmetic care': ['dermatology cosmetic care', 'dermatology, cosmetic care & plastic surgery', 'dermatology', 'cosmetic', 'skin', 'skin & cosmetic care', 'plastic surgery'],
    'dermatology, cosmetic care & plastic surgery': ['dermatology cosmetic care', 'dermatology, cosmetic care & plastic surgery', 'dermatology', 'cosmetic', 'skin', 'skin & cosmetic care', 'plastic surgery'],
    'skin': ['skin', 'dermatology', 'cosmetic', 'skin & cosmetic care', 'dermatology cosmetic care'],
    'skin & cosmetic care': ['skin & cosmetic care', 'skin', 'dermatology', 'cosmetic', 'plastic surgery', 'dermatology cosmetic care'],

    // Other Specialities
    'endocrinology': ['endocrinology', 'diabetes', 'endocrinologist'],
    'diabetes': ['endocrinology'],
    'rheumatology': ['rheumatology', 'rheumatologist'],
    'radiology': ['radiology', 'radiologist', 'interventional radiology'],
    'interventional radiology': ['interventional radiology', 'radiology', 'radiologist'],
    'anaesthesia': ['anaesthesia & pain management', 'anaesthesia and pain management', 'anaesthesia', 'anesthesia', 'pain management', 'pain'],
    'anesthesia': ['anaesthesia & pain management', 'anaesthesia and pain management', 'anaesthesia', 'anesthesia', 'pain management', 'pain'],
    'anaesthesia & pain management': ['anaesthesia & pain management', 'anaesthesia and pain management', 'anaesthesia', 'anesthesia', 'pain management', 'pain'],
    'anaesthesia and pain management': ['anaesthesia & pain management', 'anaesthesia and pain management', 'anaesthesia', 'anesthesia', 'pain management', 'pain'],
    'pain': ['anaesthesia & pain management', 'anaesthesia and pain management', 'anaesthesia', 'pain management', 'pain'],
    'internal medicine': ['internal medicine', 'general medicine'],
    'general medicine': ['internal medicine', 'general medicine'],
    'critical care medicine': ['critical care medicine', 'critical care'],
    'critical care': ['critical care medicine', 'critical care'],
    'general and laparoscopic surgery': ['general and laparoscopic surgery', 'general surgery', 'laparoscopic surgery'],
    'general surgery': ['general and laparoscopic surgery', 'general surgery', 'laparoscopic surgery'],
    'laparoscopic surgery': ['general and laparoscopic surgery', 'laparoscopic surgery', 'surgical gastroenterology'],
    'ophthalmology': ['ophthalmology', 'opthalmology', 'eye'],
    'opthalmology': ['ophthalmology', 'opthalmology', 'eye'],
    'eye': ['ophthalmology', 'opthalmology'],
    'eye ophthalmology': ['ophthalmology', 'opthalmology', 'eye'],
    'dental': ['dental & maxillofacial', 'dental and maxillofacial care', 'dental', 'dentist', 'dentistry'],
    'dental & maxillofacial': ['dental & maxillofacial', 'dental and maxillofacial care', 'dental', 'dentist', 'dentistry'],
    'dental and maxillofacial care': ['dental & maxillofacial', 'dental and maxillofacial care', 'dental', 'dentist', 'dentistry'],
    'dentist': ['dental & maxillofacial', 'dental and maxillofacial care', 'dental', 'dentistry'],
    'physiotherapy': ['physiotherapy', 'physiotherapist', 'physical therapy']
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
        .replace(/[-_&,/]/g, ' ')
        .replace(/[^\w\s]/g, ' ')
        .replace(/\band\b/g, ' ')
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

const NORMALIZED_ALIAS_MAP = Object.entries(SPECIALITY_ALIASES).reduce((acc, [key, values]) => {
    const normKey = normalizeSpecialityKey(key);
    if (!normKey) return acc;
    const normVals = values.map(normalizeSpecialityKey).filter(Boolean);
    acc[normKey] = Array.from(new Set([...(acc[normKey] || []), ...normVals]));
    return acc;
}, {});

const GENERIC_NON_UNIQUE_TOKENS = new Set([
    'robotic', 'surgery', 'surgical', 'medical', 'medicine',
    'science', 'care', 'general', 'unit', 'service', 'specialist',
    'doctor', 'hospital', 'center', 'centre', 'disorder', 'treatment', 'transplant'
]);

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
 * - Direct exact matches (case-insensitive, whitespace, & / and & hyphen normalized)
 * - Custom departments added via admin
 * - Multi-speciality arrays (departments & specialities)
 * - Directional alias groups (prevents sub-specialities or robotic fields leaking across specialties)
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
    if (normDoctorSpecs.length === 0) return false;

    // 1. Direct equality check on normalized stem (handles all casing, plurals, spelling, & / and)
    if (normDoctorSpecs.some(spec => spec === normTarget)) {
        return true;
    }

    // 2. Safe whole-word check when target is a parent/base keyword contained inside doctor's spec
    //    (e.g. target="orthopedic" matches doctor spec="robotic orthopedic")
    if (normDoctorSpecs.some(spec => containsWholeWord(spec, normTarget))) {
        return true;
    }

    // 3. Token subset matching for multi-word medical specialities (e.g. 'robotic orthopedic surgery' vs 'robotic orthopedic')
    const ignoredSubsetWords = new Set(['surgery', 'care', 'unit', 'service', 'hospital']);
    const targetTokens = normTarget.split(' ').filter(w => !ignoredSubsetWords.has(w));
    if (targetTokens.length >= 2) {
        for (const spec of normDoctorSpecs) {
            const specTokens = spec.split(' ').filter(w => !ignoredSubsetWords.has(w));
            if (specTokens.length >= 2) {
                const targetContainsSpec = specTokens.every(t => targetTokens.includes(t));
                const specContainsTarget = targetTokens.every(t => specTokens.includes(t));
                if (targetContainsSpec || specContainsTarget) return true;
            }
        }
    }

    // 4. Directional alias dictionary matching (normalized keys & values)
    const targetAliases = NORMALIZED_ALIAS_MAP[normTarget];
    if (targetAliases && targetAliases.length > 0) {
        return normDoctorSpecs.some(
            s => targetAliases.includes(s) || targetAliases.some(a => containsWholeWord(s, a))
        );
    }

    // 5. Fallback reverse whole-word check ONLY for unmapped long SEO slugs (e.g. "orthopedic-surgeon-banjara-hills")
    //    Never match bare generic modifier tokens like "robotic", "surgery", "care", "medicine".
    for (const spec of normDoctorSpecs) {
        if (spec.length >= 4 && !GENERIC_NON_UNIQUE_TOKENS.has(spec) && containsWholeWord(normTarget, spec)) {
            return true;
        }
    }

    return false;
}
