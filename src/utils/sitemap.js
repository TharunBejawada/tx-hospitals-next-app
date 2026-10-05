import axios from "axios";

export const baseUrl = "https://txhospitals.in";
export const apiUrl = "https://api.txhospitals.vgworld.in";

export const staticRoutes = [
    "/",
    "/about-us/",
    "/board-of-directors/",
    "/management/",
    "/why-tx-hospitals/",
    "/faqs/",
    "/contact-us/",
    "/contact-us/uppal/",
    "/contact-us/kachiguda/",
    "/contact-us/banjara-hills1/",
    "/contact-us/banjara-hills2/",
    "/patient-and-visitors/",
    "/patient-and-visitors/visitors/",
    "/patient-and-visitors/in-patient/",
    "/patient-and-visitors/rooms/",
    "/patient-and-visitors/insurance/",
    "/patient-and-visitors/international-patients/",
    "/facilities/",
    "/facilities/diagnostic/",
    "/facilities/pharmacy/",
    "/facilities/others/",
    "/find-doctor/",
    "/book-an-appointment/",
    "/disclaimer/",
    "/privacy-policy/",
    "/blog/",
    "/health-package/",
    "/surgery-care/",
    "/international-patient-services/",
    "/thank-you/",
    "/biomedical-wastage/",
    "/uppal/",
    "/miyapur/",
    "/banjara-hills/",
    "/kachiguda/",
    "/clinical-research/"
];

export const COERoutes = [
    "/specialities/cardiac-sciences/",
    "/specialities/cardiac-sciences/disease-and-treatment/",
    "/specialities/cardiac-sciences/diagnostics/",
    "/specialities/cardiac-sciences/procedures/",
    "/specialities/cardiac-sciences/technology-and-facilities/",
    "/specialities/cardiac-sciences/our-clinical-team/",
    "/liver-transplantation-surgery/",
    "/kidney-transplantation-surgery/",
    "/specialities/cardiothoracic-and-vascular-surgery-hospitals/",
    "/specialities/cardiothoracic-and-vascular-surgery-hospitals/disease-and-treatment/",
    "/specialities/cardiothoracic-and-vascular-surgery-hospitals/procedures/",
    "/specialities/cardiothoracic-and-vascular-surgery-hospitals/our-clinical-team/",
    "/specialities/neuro-sciences/",
    "/specialities/neuro-sciences/disease-and-treatment/",
    "/specialities/neuro-sciences/diagnostics/",
    "/specialities/neuro-sciences/procedures/",
    "/specialities/neuro-sciences/technology-and-facilities/",
    "/specialities/neuro-sciences/our-clinical-team/",
    "/specialities/urology/",
    "/specialities/urology/disease-and-treatment/",
    "/specialities/urology/diagnostics/",
    "/specialities/urology/procedures/",
    "/specialities/urology/technology-and-facilities/",
    "/specialities/urology/our-clinical-team/",
    "/specialities/nephrology/",
    "/specialities/nephrology/disease-and-treatment/",
    "/specialities/nephrology/diagnostics/",
    "/specialities/nephrology/procedures/",
    "/specialities/nephrology/technology-and-facilities/",
    "/specialities/nephrology/our-clinical-team/",
    "/specialities/medical-gastro-hospitals/",
    "/specialities/surgical-gastroenterology-hospitals/",
    "/specialities/oncology/",
    "/specialities/oncology/disease-and-treatment/",
    "/specialities/oncology/diagnostics/",
    "/specialities/oncology/procedures/",
    "/specialities/oncology/technology-and-facilities/",
    "/specialities/oncology/our-clinical-team/",
    "/specialities/orthopaedics/",
    "/specialities/orthopaedics/disease-and-treatment/",
    "/specialities/orthopaedics/diagnostics/",
    "/specialities/orthopaedics/procedures/",
    "/specialities/orthopaedics/technology-and-facilities/",
    "/specialities/orthopaedics/our-clinical-team/",
    "/specialities/internal-medicine/",
    "/specialities/internal-medicine/disease-and-treatment/",
    "/specialities/internal-medicine/diagnostics/",
    "/specialities/internal-medicine/procedures/",
    "/specialities/internal-medicine/technology-and-facilities/",
    "/specialities/internal-medicine/our-clinical-team/",
    "/specialities/gynecology-hospitals/",
    "/specialities/gynecology-hospitals/disease-and-treatment/",
    "/specialities/gynecology-hospitals/procedures/",
    "/specialities/gynecology-hospitals/our-clinical-team/",
    "/specialities/pediatric-hospitals/",
    "/specialities/pediatric-hospitals/disease-and-treatment/",
    "/specialities/pediatric-hospitals/procedures/",
    "/specialities/pediatric-hospitals/our-clinical-team/",
    "/specialities/anaesthesia-and-pain-management/",
    "/specialities/anaesthesia-and-pain-management/disease-and-treatment/",
    "/specialities/anaesthesia-and-pain-management/diagnostics/",
    "/specialities/anaesthesia-and-pain-management/procedures/",
    "/specialities/anaesthesia-and-pain-management/technology-and-facilities/",
    "/specialities/anaesthesia-and-pain-management/our-clinical-team/",
    "/specialities/dermatology-cosmetic-care/",
    "/specialities/dermatology-cosmetic-care/disease-and-treatment/",
    "/specialities/dermatology-cosmetic-care/diagnostics/",
    "/specialities/dermatology-cosmetic-care/procedures/",
    "/specialities/dermatology-cosmetic-care/technology-and-facilities/",
    "/specialities/dermatology-cosmetic-care/our-clinical-team/",
    "/specialities/eye-ophthalmology/",
    "/specialities/eye-ophthalmology/disease-and-treatment/",
    "/specialities/eye-ophthalmology/diagnostics/",
    "/specialities/eye-ophthalmology/procedures/",
    "/specialities/eye-ophthalmology/technology-and-facilities/",
    "/specialities/eye-ophthalmology/our-clinical-team/",
    "/specialities/dental-and-maxillofacial-care/",
    "/specialities/dental-and-maxillofacial-care/disease-and-treatment/",
    "/specialities/dental-and-maxillofacial-care/diagnostics/",
    "/specialities/dental-and-maxillofacial-care/procedures/",
    "/specialities/dental-and-maxillofacial-care/technology-and-facilities/",
    "/specialities/dental-and-maxillofacial-care/our-clinical-team/",
    "/specialities/endocrinology/",
    "/specialities/endocrinology/disease-and-treatment/",
    "/specialities/endocrinology/diagnostics/",
    "/specialities/endocrinology/procedures/",
    "/specialities/endocrinology/technology-and-facilities/",
    "/specialities/endocrinology/our-clinical-team/",
    "/specialities/transplant-medicine/",
    "/specialities/transplant-medicine/disease-and-treatment/",
    "/specialities/transplant-medicine/diagnostics/",
    "/specialities/transplant-medicine/procedures/",
    "/specialities/transplant-medicine/technology-and-facilities/",
    "/specialities/transplant-medicine/our-clinical-team/",
    "/specialities/pulmonology/",
    "/specialities/pulmonology/disease-and-treatment/",
    "/specialities/pulmonology/diagnostics/",
    "/specialities/pulmonology/procedures/",
    "/specialities/pulmonology/technology-and-facilities/",
    "/specialities/pulmonology/our-clinical-team/",
    "/specialities/ent/",
    "/specialities/ent/disease-and-treatment/",
    "/specialities/ent/diagnostics/",
    "/specialities/ent/procedures/",
    "/specialities/ent/technology-and-facilities/",
    "/specialities/ent/our-clinical-team/",
    "/specialities/rheumatology/",
    "/specialities/rheumatology/disease-and-treatment/",
    "/specialities/rheumatology/diagnostics/",
    "/specialities/rheumatology/procedures/",
    "/specialities/rheumatology/technology-and-facilities/",
    "/specialities/rheumatology/our-clinical-team/",
    "/specialities/robotic-orthopaedic-surgery-hyderabad",
    "/specialities/robotic-gastrointestinal-surgery-in-hyderabad/",
    "/specialities/robotic-urologic-surgery-in-hyderabad/",
    "/specialities/robotic-gynaecology-surgery-in-hyderabad-india/",
    "/specialities/robotic-cancer-surgery-in-hyderabad/",
    "/liver-transplantation-surgery/",
    "/kidney-transplantation-surgery/",
];

export const fetchRoutes = async (key, endpoint) => {
    try {
        const response = await axios.get(endpoint, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        let data = response.data;
        if (data && !Array.isArray(data) && Array.isArray(data.Items)) {
            data = data.Items;
        }

        if (!Array.isArray(data)) {
            return [];
        }

        if (key === "blogs") {
            data = data.filter(item => (item.status ? item.status === "active" : item.enabled !== false) && item.status !== "inactive" && item.enabled !== false);
        }

        return data.map((item) => item.url).filter(Boolean);
    } catch (err) {
        console.error(err);
        return [];
    }
};

export const generateXML = (routes, errorMsg = "") => {
    return `<?xml version="1.0" encoding="UTF-8"?>
${errorMsg ? `<!-- Error: ${errorMsg} -->` : ""}
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

    ${routes
            .map(
                (route) => `
      <url>
        <loc>${baseUrl}${route}</loc>
        <changefreq>always</changefreq>
        <priority>1.0</priority>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
    `
            )
            .join("")}

  </urlset>`;
};