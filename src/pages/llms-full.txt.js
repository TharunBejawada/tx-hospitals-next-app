import CONFIG from "../config";

export async function getServerSideProps({ res }) {
    let content = "";
    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}/llms-full.txt`, {
            cache: "no-store",
        });
        if (response.ok) {
            content = await response.text();
        }
    } catch (err) {
        console.error("Error fetching dynamic llms-full.txt from API:", err);
    }

    if (!content) {
        content = "# TX Hospitals Full Resource Directory\n\n> Complete medical directory for AI and Large Language Models.";
    }

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader(
        "Cache-Control",
        "public, s-maxage=3600, stale-while-revalidate=86400"
    );
    res.write(content);
    res.end();

    return {
        props: {},
    };
}

export default function LlmsFullTxt() { }
