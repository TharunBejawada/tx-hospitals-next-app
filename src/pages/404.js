import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Custom404() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/");
    }, [router]);

    return (
        <div className="flex flex-row justify-center items-center mt-20 mb-4 gap-2">
            <div className="w-8 h-8 border-2 border-pink-700 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-pink-700 text-lg font-medium animate-pulse">
                Redirecting to Home...
            </div>
        </div>
    );
}
