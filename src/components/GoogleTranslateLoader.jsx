"use client";

import { useEffect } from "react";

export default function GoogleTranslateLoader() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let cleanup = () => {};

    const initTranslate = () => {
      // Function to ensure all translate SVG images have proper alt attributes
      const fixMissingAltTags = () => {
        const images = document.querySelectorAll("img");
        images.forEach((img) => {
          if (!img.getAttribute("alt")) {
            const src = img.getAttribute("src") || "";
            if (
              src.includes("24px.svg") ||
              src.includes("translate") ||
              src.includes("gstatic.com") ||
              src.includes("cleardot.gif") ||
              img.closest("#google_translate_element") ||
              img.classList.contains("goog-te-gadget-icon")
            ) {
              img.setAttribute("alt", "Google Translate Icon");
            }
          }
        });
      };

      // Run initial check
      fixMissingAltTags();

      // Set up MutationObserver to catch dynamically added images
      const observer = new MutationObserver((mutations) => {
        let shouldFix = false;
        for (const mutation of mutations) {
          if (mutation.addedNodes.length > 0) {
            shouldFix = true;
            break;
          }
        }
        if (shouldFix) {
          fixMissingAltTags();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      // Interval check for 10 seconds after load to catch async widget renders
      const interval = setInterval(fixMissingAltTags, 1000);
      const timeout = setTimeout(() => clearInterval(interval), 10000);

      // Prevent duplicate load
      if (window.googleTranslateElementInit) {
        cleanup = () => {
          observer.disconnect();
          clearInterval(interval);
          clearTimeout(timeout);
        };
        return;
      }

      window.googleTranslateElementInit = () => {
        if (window.google?.translate?.TranslateElement) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages:
                "en,hi,te,bn,ta,mr,ml,kn,gu,pa,ar,ur,it,es,pt,fr,ru,zh-CN,ne",
              autoDisplay: false,
            },
            "google_translate_element"
          );
          setTimeout(fixMissingAltTags, 100);
        }
      };

      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      cleanup = () => {
        observer.disconnect();
        clearInterval(interval);
        clearTimeout(timeout);
      };
    };

    if ("requestIdleCallback" in window) {
      const handle = window.requestIdleCallback(initTranslate, { timeout: 3000 });
      return () => {
        window.cancelIdleCallback?.(handle);
        cleanup();
      };
    } else {
      const handle = setTimeout(initTranslate, 2000);
      return () => {
        clearTimeout(handle);
        cleanup();
      };
    }
  }, []);

  return <div id="google_translate_element" style={{ display: "none" }} />;
}
