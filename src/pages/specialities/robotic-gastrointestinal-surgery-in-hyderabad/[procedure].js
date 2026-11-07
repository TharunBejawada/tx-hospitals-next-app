import RoboticProcedureDetailPage from "@/components/RoboticProcedure/RoboticProcedureDetailPage";

export default function ProcedurePage({ initialData }) {
    return <RoboticProcedureDetailPage initialData={initialData} />;
}

export async function getServerSideProps(context) {
    if (context.res) {
        context.res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    }
    const cleanPath = (context.resolvedUrl || "").split("?")[0].replace(/\/+$/, "");
    let initialData = null;
    try {
        const encodedUrl = encodeURIComponent(cleanPath);
        const apiUrl = `https://api.txhospitals.vgworld.in/robotic-procedures/getRoboticProceduresbyURL/${encodedUrl}`;
        const res = await fetch(apiUrl);
        if (res.ok) {
            const result = await res.json();
            if (Array.isArray(result) && result.length > 0) {
                initialData = result[0];
            }
        }
    } catch (err) {
        console.error("Error in robotic procedure getServerSideProps:", err);
    }
    return {
        props: {
            initialData
        }
    };
}
