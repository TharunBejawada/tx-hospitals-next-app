import CONFIG from "../config";

export async function getServerSideProps({ res }) {
    let content = "";
    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}/llms.txt`, {
            cache: "no-store",
        });
        if (response.ok) {
            content = await response.text();
        }
    } catch (err) {
        console.error("Error fetching dynamic llms.txt from API:", err);
    }

    // Fallback to local file if API endpoint is unreachable
    if (!content) {
        const fs = require("fs");
        const path = require("path");
        try {
            let filePath = path.join(process.cwd(), "public", "llms-static-backup.txt");
            if (!fs.existsSync(filePath)) {
                filePath = path.join(process.cwd(), "public", "llms.txt");
            }
            if (fs.existsSync(filePath)) {
                content = fs.readFileSync(filePath, "utf8");
            }
        } catch (fileErr) {
            console.error("Fallback file read error:", fileErr);
        }
    }

    if (!content) {
        content = "# TX Hospitals\n\n> TX Hospitals is a multi-speciality hospital network based in Hyderabad, India.";
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

export default function LlmsTxt() { }
