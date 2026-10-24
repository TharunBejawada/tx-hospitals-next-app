const baseUrl = "https://txhospitals.in";

const sitemaps = [
  "static.xml",
  "coe.xml",
  "doctors.xml",
  "blogs.xml",
  "blogs-miyapur.xml",
  "blogs-uppal.xml",
  "blogs-kachiguda.xml",
  "blogs-banjara-hills.xml",
  "disease-and-treatments.xml",
  "procedures.xml",
  "healthpackages.xml",
  "secondopinion.xml",
  "localities-miyapur.xml",
  "localities-uppal.xml",
  "localities-kachiguda.xml",
  "localities-banjara-hills.xml"
];

export async function getServerSideProps({ res }) {
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>

  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

    ${sitemaps
      .map(
        (sitemap) => `
      <sitemap>
        <loc>${baseUrl}/${sitemap}</loc>
      </sitemap>
    `
      )
      .join("")}

  </sitemapindex>`;

  res.setHeader("Content-Type", "text/xml");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate"
  );
  res.write(sitemapIndex);
  res.end();
  return {
    props: {},
  };
}

export default function SiteMap() { }