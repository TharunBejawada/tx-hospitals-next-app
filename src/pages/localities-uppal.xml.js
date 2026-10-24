import { generateXML, apiUrl } from "../utils/sitemap";
import axios from "axios";

const baseRoutes = [
    "/uppal/",
    "/uppal/specialties/",
    "/uppal/bariatric-surgery/",
    "/uppal/gastro-hospital/",
    "/uppal/hernia-surgery/",
];

const fallbackSpecialtyRoutes = [
    "/uppal/specialties/cardiologist-hospital/",
    "/uppal/specialties/ent-hospital/",
    "/uppal/specialties/gastroenterologist-hospital/",
    "/uppal/specialties/general-medicine-hospital/",
    "/uppal/specialties/gynecologist-hospital/",
    "/uppal/specialties/nephrologist-hospital/",
    "/uppal/specialties/neurologist-hospital/",
    "/uppal/specialties/oncologist-hospital/",
    "/uppal/specialties/orthopedic-hospital/",
    "/uppal/specialties/pediatric-hospital/",
    "/uppal/specialties/pulmonologist-hospital/",
    "/uppal/specialties/urologist-hospital/",
];

export async function getServerSideProps({ res }) {
    let routes = [...baseRoutes];

    try {
        const response = await axios.get(`${apiUrl}/api/specialities/Uppal`, {
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
        console.error("Error fetching Uppal specialities for sitemap:", error?.message || error);
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
