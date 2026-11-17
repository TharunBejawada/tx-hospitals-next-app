import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

export default function Custom404() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/");
    }, [router]);

    return (
        <>
            <Head>
                <title>Page Not Found | TX Hospitals</title>
                <meta name="description" content="The page you are looking for does not exist. Redirecting to TX Hospitals homepage." />
                <meta name="robots" content="noindex, follow" />
                <noscript>
                    <meta httpEquiv="refresh" content="0; url=/" />
                </noscript>
            </Head>
            <div className="flex flex-col justify-center items-center mt-20 mb-4 gap-4 px-4 text-center">
                <div className="flex flex-row items-center gap-2">
                    <div className="w-8 h-8 border-2 border-pink-700 border-t-transparent rounded-full animate-spin"></div>
                    <div className="text-pink-700 text-lg font-medium animate-pulse">
                        Redirecting to Home...
                    </div>
                </div>
                <noscript>
                    <p className="text-gray-700">
                        If you are not redirected automatically, <Link href="/" className="text-pink-700 underline font-semibold">click here to go to the Homepage</Link>.
                    </p>
                </noscript>
            </div>
        </>
    );
}
