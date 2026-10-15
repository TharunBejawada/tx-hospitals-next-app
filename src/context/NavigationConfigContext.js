import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import Router, { useRouter } from "next/router";
import {
  fetchNavigationConfig,
  getNavigationTarget,
  navigateUrl,
  subscribeNavigationConfig
} from "@/utils/navigationConfig";

const NavigationConfigContext = createContext({
  targetsMap: {},
  loading: true,
  getLinkTarget: () => "_self",
  handleNavigation: () => {},
  refreshConfig: () => Promise.resolve({})
});

export function NavigationConfigProvider({ children }) {
  const router = useRouter();
  const [targetsMap, setTargetsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const targetsMapRef = useRef(targetsMap);

  // Keep ref synchronized for synchronous event listeners
  useEffect(() => {
    targetsMapRef.current = targetsMap;
  }, [targetsMap]);

  // Load config and listen to changes
  useEffect(() => {
    let isMounted = true;

    // Subscribe to config updates from anywhere (e.g. background fetches)
    const unsubscribe = subscribeNavigationConfig((newMap) => {
      if (isMounted && newMap) {
        setTargetsMap(newMap);
        targetsMapRef.current = newMap;
      }
    });

    // Initial fetch
    fetchNavigationConfig(false)
      .then((map) => {
        if (isMounted && map) {
          setTargetsMap(map);
          targetsMapRef.current = map;
        }
      })
      .catch((err) => {
        console.warn("Could not load navigation targets config:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    // Re-fetch when tab gets focused (e.g., user just saved in Admin tab and switched back!)
    const handleFocus = () => {
      fetchNavigationConfig(true).then((freshMap) => {
        if (isMounted && freshMap) {
          setTargetsMap(freshMap);
          targetsMapRef.current = freshMap;
        }
      });
    };

    // Also check on storage event if localStorage changed in another tab
    const handleStorage = (e) => {
      if (e.key === "tx_navigation_targets_cache" || e.key === "tx_navigation_config") {
        fetchNavigationConfig(true).then((freshMap) => {
          if (isMounted && freshMap) {
            setTargetsMap(freshMap);
            targetsMapRef.current = freshMap;
          }
        });
      }
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("storage", handleStorage);

    return () => {
      isMounted = false;
      unsubscribe();
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // Universal DOM Click Interceptor:
  // Catches ALL <a> and Next.js <Link> clicks across the entire site in the capture phase.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleGlobalClick = (event) => {
      // Ignore right clicks or clicks with modifier keys (Ctrl/Cmd/Shift/Alt)
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      // Check if click is on or inside an anchor element
      const anchor = event.target && typeof event.target.closest === "function"
        ? event.target.closest("a")
        : null;

      if (!anchor) return;

      const href = anchor.getAttribute("href") || anchor.href;
      if (!href) return;

      // Skip in-page hash anchors, tel:, mailto:, javascript:
      if (href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("javascript:")) {
        return;
      }

      const target = getNavigationTarget(href, targetsMapRef.current);

      if (target === "_blank") {
        // Intercept navigation and open in a new tab
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        window.open(anchor.href || href, "_blank", "noopener,noreferrer");
      } else if (target === "_self") {
        // If configured as same page, make sure anchor target doesn't force _blank
        if (anchor.getAttribute("target") === "_blank") {
          anchor.removeAttribute("target");
        }
      }
    };

    // Attach in capture phase so it runs before Next.js Link / React event delegation
    document.addEventListener("click", handleGlobalClick, true);

    return () => {
      document.removeEventListener("click", handleGlobalClick, true);
    };
  }, []);

  // Universal Router Interceptor:
  // Intercepts router.push and router.replace (both instance and singleton Router)
  // so any programmatic navigation (e.g. onClick={() => router.push(url)}) respects the config!
  useEffect(() => {
    if (typeof window === "undefined" || !router) return;

    const originalPush = router.push.bind(router);
    const originalReplace = router.replace.bind(router);
    const origSingletonPush = Router.push ? Router.push.bind(Router) : null;
    const origSingletonReplace = Router.replace ? Router.replace.bind(Router) : null;

    const wrappedPush = (url, as, options) => {
      const urlStr = typeof url === "string" ? url : (url?.pathname || url?.href || "");
      const target = getNavigationTarget(urlStr, targetsMapRef.current);
      if (target === "_blank") {
        window.open(urlStr, "_blank", "noopener,noreferrer");
        return Promise.resolve(true);
      }
      return originalPush(url, as, options);
    };

    const wrappedReplace = (url, as, options) => {
      const urlStr = typeof url === "string" ? url : (url?.pathname || url?.href || "");
      const target = getNavigationTarget(urlStr, targetsMapRef.current);
      if (target === "_blank") {
        window.open(urlStr, "_blank", "noopener,noreferrer");
        return Promise.resolve(true);
      }
      return originalReplace(url, as, options);
    };

    router.push = wrappedPush;
    router.replace = wrappedReplace;
    if (origSingletonPush) Router.push = wrappedPush;
    if (origSingletonReplace) Router.replace = wrappedReplace;

    return () => {
      router.push = originalPush;
      router.replace = originalReplace;
      if (origSingletonPush) Router.push = origSingletonPush;
      if (origSingletonReplace) Router.replace = origSingletonReplace;
    };
  }, [router]);

  const getLinkTargetCallback = useCallback(
    (path) => {
      return getNavigationTarget(path, targetsMap);
    },
    [targetsMap]
  );

  const handleNavigationCallback = useCallback(
    (path, scrollId = null) => {
      navigateUrl(path, router, scrollId, targetsMap);
    },
    [router, targetsMap]
  );

  const refreshConfig = useCallback(() => {
    return fetchNavigationConfig(true).then((m) => {
      if (m) setTargetsMap(m);
      return m;
    });
  }, []);

  return (
    <NavigationConfigContext.Provider
      value={{
        targetsMap,
        loading,
        getLinkTarget: getLinkTargetCallback,
        handleNavigation: handleNavigationCallback,
        refreshConfig
      }}
    >
      {children}
    </NavigationConfigContext.Provider>
  );
}

export function useNavigationConfig() {
  const context = useContext(NavigationConfigContext);
  if (!context) {
    // Graceful fallback if used outside provider
    return {
      targetsMap: {},
      loading: false,
      getLinkTarget: (p) => getNavigationTarget(p, null),
      handleNavigation: (p, s = null) => navigateUrl(p, null, s, null),
      refreshConfig: () => Promise.resolve({})
    };
  }
  return context;
}
