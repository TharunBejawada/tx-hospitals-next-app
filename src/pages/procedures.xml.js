import { fetchRoutes, generateXML, apiUrl, procedureRoutes } from "../utils/sitemap";

export async function getServerSideProps({ res }) {
    const dynamicRoutes = await fetchRoutes(
        "procedures",
        `${apiUrl}/new-procedures/getAllNewProcedures`
    );
    const routes = [...new Set([...(procedureRoutes || []), ...dynamicRoutes])];
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
