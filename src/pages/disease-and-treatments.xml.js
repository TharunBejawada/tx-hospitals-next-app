import { fetchRoutes, generateXML, apiUrl, diseaseAndTreatmentRoutes } from "../utils/sitemap";

export async function getServerSideProps({ res }) {
    const dynamicRoutes = await fetchRoutes(
        "disease-and-treatments",
        `${apiUrl}/new-dieseasesandtreatments/getAllNewDAT`
    );
    const routes = [...new Set([...(diseaseAndTreatmentRoutes || []), ...dynamicRoutes])];
    const sitemap = generateXML(routes);
    res.setHeader("Content-Type", "text/xml");
    res.setHeader(
        "Cache-Control",
        "public, s-maxage=86400, stale-while-revalidate"
    );
    res.write(sitemap);
    res.end();
    return {
        props: {},
    };
}

export default function SiteMap() { }
