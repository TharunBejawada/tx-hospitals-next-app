import { fetchRoutes, generateXML, apiUrl } from "../utils/sitemap";

export async function getServerSideProps({ res }) {
    const routes = await fetchRoutes(
        "blogs-banjara-hills",
        `${apiUrl}/blogs/getBlogsByLocation/${encodeURIComponent("Banjara Hills")}`
    );
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
