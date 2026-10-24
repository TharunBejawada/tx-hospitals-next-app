import { generateXML, apiUrl } from "../utils/sitemap";
import axios from "axios";

const baseRoutes = [
    "/miyapur/",
    "/miyapur/specialties/",
];

const fallbackSpecialtyRoutes = [
    "/miyapur/specialties/cardiology-hospital/",
    "/miyapur/specialties/ent-hospital/",
    "/miyapur/specialties/gastroenterology-hospital/",
    "/miyapur/specialties/general-medicine-hospital/",
    "/miyapur/specialties/gynecology-hospital/",
    "/miyapur/specialties/nephrology-hospital/",
    "/miyapur/specialties/neurology-hospital/",
    "/miyapur/specialties/oncology-hospital/",
    "/miyapur/specialties/pediatrics-hospital/",
    "/miyapur/specialties/pulmonology-hospital/",
    "/miyapur/specialties/robotic-orthopedic-surgery-hospital/",
    "/miyapur/specialties/urology-hospital/",
    "/miyapur/specialties/orthopedic-hospital/",
];

export async function getServerSideProps({ res }) {
    let routes = [...baseRoutes];

    try {
        const response = await axios.get(`${apiUrl}/api/specialities/Miyapur`, {
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
        console.error("Error fetching Miyapur specialities for sitemap:", error?.message || error);
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
