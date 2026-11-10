export const departmentData = {
    "cardiac-sciences": {
        title: "Cardiac Sciences",
        image: "/assets/COE/Cardio _.webp",
    },
    "neuro-sciences": {
        title: "Neuro Sciences",
        image: "/assets/COE/Neuro.webp",
    },
    "nephrology": {
        title: "Nephrology",
        image: "/assets/COE/Nephrology.webp",
    },
    "urology": {
        title: "Urology",
        image: "/assets/COE/Urology.webp",
    },
    "gastro-sciences": {
        title: "Gastro Sciences",
        image: "/assets/COE/Gaastro.webp",
    },
    "oncology": {
        title: "Oncology",
        image: "/assets/COE/Oncology.webp",
    },
    "orthopaedics": {
        title: "Orthopaedics",
        image: "/assets/COE/Orthopedics.webp",
    },
    "internal-medicine": {
        title: "Internal Medicine",
        image: "/assets/COE/Internal Medicine _.webp",
    },
    "mother-child-care": {
        title: "Mother & Child Care",
        image: "/assets/COE/Mother and Child Care.webp",
    },
    "anaesthesia-and-pain-management": {
        title: "Anaesthesia & Pain Management",
        image: "/assets/COE/Anesthesia.webp",
    },
    "dermatology-cosmetic-care": {
        title: "Dermatology & Cosmetic Care",
        image: "/assets/COE/Skin.webp",
    },
    "eye-ophthalmology": {
        title: "Eye (Ophthalmology)",
        image: "/assets/COE/Opthalmology.webp",
    },
    "dental-and-maxillofacial-care": {
        title: "Dental & Maxillofacial Care",
        image: "/assets/COE/Dental.webp",
    },
    "endocrinology": {
        title: "Endocrinology",
        image: "/assets/COE/Endocrinology.webp",
    },
    "transplant-medicine": {
        title: "Transplant Medicine",
        image: "/assets/COE/Organ transplant.webp",
    },
    "pulmonology": {
        title: "Pulmonology",
        image: "/assets/COE/Pulmonology.webp",
    },
    "robotics-science": {
        title: "Robotics Science",
        image: "/assets/COE/Robotic.webp",
    },
    "ent": {
        title: "ENT",
        image: "/assets/COE/ENT.webp",
    },
    "rheumatology": {
        title: "Rheumatology",
        image: "/assets/COE/Rheumatology.webp",
    },
    "cardiothoracic-vascular-surgery": {
        title: "Cardiothoracic & Vascular Surgery",
        image: "/assets/COE/CARDIOTHORACIC &  Vascular Surgery.webp",
    },
    "medical-gastroenterology": {
        title: "Medical Gastroenterology",
        image: "/assets/COE/MEDICAL GASTROENTEROLOGY.webp",
    },
    "surgical-gastroenterology": {
        title: "Surgical Gastroenterology",
        image: "/assets/COE/SURGICAL GASTROENTEROLOGY.webp",
    },
    "gynaecology": {
        title: "Gynaecology",
        image: "/assets/COE/GYNAECOLOGY.webp",
    },
    "paediatrics": {
        title: "Paediatrics",
        image: "/assets/COE/PAEDIATRICS.webp",
    },
};

export function getDepartmentDetails(slug) {
    if (!slug) return { title: "Department", image: "/assets/coe/default.jpg" };
    return (
        departmentData[slug] || {
            title: slug
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" "),
            image: "/assets/coe/default.jpg",
        }
    );
}