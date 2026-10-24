import { generateXML, apiUrl } from "../utils/sitemap";
import axios from "axios";

const baseRoutes = [
    "/banjara-hills/",
    "/banjara-hills/specialties/",
    "/banjarahills-gallery/",
];

const fallbackSpecialtyRoutes = [
    "/banjara-hills/specialties/cardiologist-hospital/",
    "/banjara-hills/specialties/dentist-hospital/",
    "/banjara-hills/specialties/dermatologist-hospital/",
    "/banjara-hills/specialties/ent-hospital/",
    "/banjara-hills/specialties/gastroenterologist-hospital/",
    "/banjara-hills/specialties/general-medicine-hospital/",
    "/banjara-hills/specialties/gynecologist-hospital/",
    "/banjara-hills/specialties/kidney-transplant-hospital-banjara-hills/",
    "/banjara-hills/specialties/liver-transplant-hospital-banjara-hills/",
    "/banjara-hills/specialties/nephrologist-hospital/",
    "/banjara-hills/specialties/neurologist-hospital/",
    "/banjara-hills/specialties/oncologist-hospital/",
    "/banjara-hills/specialties/orthopaedic-hospital/",
    "/banjara-hills/specialties/pediatric-hospital/",
    "/banjara-hills/specialties/pulmonologist-hospital/",
    "/banjara-hills/specialties/rheumatologist-hospital/",
    "/banjara-hills/specialties/urologist-hospital/",
];

export async function getServerSideProps({ res }) {
    let routes = [...baseRoutes];

    try {
        const response = await axios.get(`${apiUrl}/api/specialities/Banjara%20Hills`, {
            timeout: 10000,
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            },
        });
        let data = response.data;

        if (data && !Array.isArray(data) && Array.isArray(data.value)) {
            data = data.value;
        }

        const dynamicRoutes = (Array.isArray(data) ? data : [])
            .map((item) => item?.LandingPageUrl)
            .filter(Boolean);

        if (dynamicRoutes.length > 0) {
            routes = [...baseRoutes, ...dynamicRoutes];
        } else {
            routes = [...baseRoutes, ...fallbackSpecialtyRoutes];
        }

        res.setHeader("Content-Type", "text/xml");
        res.setHeader(
            "Cache-Control",
            "public, s-maxage=86400, stale-while-revalidate"
        );
        res.write(generateXML(routes));
        res.end();
    } catch (error) {
        console.error("Error fetching Banjara Hills specialities for sitemap:", error?.message || error);
        routes = [...baseRoutes, ...fallbackSpecialtyRoutes];
        res.setHeader("Content-Type", "text/xml");
        res.setHeader(
            "Cache-Control",
            "public, s-maxage=3600, stale-while-revalidate"
        );
        res.write(generateXML(routes));
        res.end();
    }

    return {
        props: {},
    };
}

export default function SiteMap() { }
