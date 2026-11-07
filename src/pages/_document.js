import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* Favicon */}
                <link rel="icon" href="/TX-favicon.png" />
                <link rel="apple-touch-icon" href="/TX-favicon.png" />

                {/* Fonts */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

                {/* Manifest */}
                <link rel="manifest" href="/manifest.json" />

                {/* Robots */}
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />

                {/* Google Verification */}
                <meta
                    name="google-site-verification"
                    content="QVxFNHC6mE2GwL7GLkNYO4riWI7bS5ZKhSxeld0sbnY"
                />

                <noscript>
                    <style>{`
                        *, *::before, *::after {
                            opacity: 1 !important;
                            visibility: visible !important;
                            transform: none !important;
                        }
                    `}</style>
                    <img
                        height="1"
                        width="1"
                        style={{ display: "none" }}
                        src="https://www.facebook.com/tr?id=26839929075649647&ev=PageView&noscript=1"
                        alt="Facebook Pixel"
                    />
                </noscript>
            </Head>

            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
