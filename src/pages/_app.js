import "@/styles/globals.css";
import React, { useEffect } from "react";
import Script from "next/script";
import Head from "next/head";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleTranslateLoader from "@/components/GoogleTranslateLoader";
import { NavigationConfigProvider } from "@/context/NavigationConfigContext";
import organizationSchema from "@/utils/organizationSchema";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const preventAction = (e) => e.preventDefault();
    document.addEventListener("copy", preventAction);
    document.addEventListener("cut", preventAction);
    document.addEventListener("contextmenu", preventAction);
    document.addEventListener("selectstart", preventAction);

    return () => {
      document.removeEventListener("copy", preventAction);
      document.removeEventListener("cut", preventAction);
      document.removeEventListener("contextmenu", preventAction);
      document.removeEventListener("selectstart", preventAction);
    };
  }, []);

  // Compute canonical URL dynamically
  let path = router.asPath.split("#")[0].split("?")[0];
  if (!path.startsWith("/")) {
    path = "/" + path;
  }
  path = path.replace(/\/+/g, "/");

  const hasExtension = /\.[a-z0-9]+$/i.test(path);
  if (path !== "/" && !hasExtension) {
    if (!path.endsWith("/")) {
      path += "/";
    }
  }

  const canonicalUrl = `https://txhospitals.in${path}`;

  return (
    <div className="font-sans">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} key="canonical" />
        {/* Google Organization Schema (Site-wide) */}
        <script
          type="application/ld+json"
          key="organization-schema"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </Head>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NCSC4PC');
          `,
        }}
      />
      {/* Google tag (gtag.js) */}
      <Script
        id="gtag-load"
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=AW-18108940602"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18108940602');
          `,
        }}
      />
      {/* Meta Pixel Code */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '26839929075649647');
            fbq('track', 'PageView');
          `,
        }}
      />
      <GoogleTranslateLoader />
      <NavigationConfigProvider>
        <Component {...pageProps} />
      </NavigationConfigProvider>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
