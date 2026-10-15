import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import {
  fetchNavigationConfig,
  getNavigationTarget,
  navigateUrl
} from "@/utils/navigationConfig";

const NavigationConfigContext = createContext({
  targetsMap: {},
  loading: true,
  getLinkTarget: () => "_self",
  handleNavigation: () => {}
});

export function NavigationConfigProvider({ children }) {
  const router = useRouter();
  const [targetsMap, setTargetsMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchNavigationConfig()
      .then((map) => {
        if (isMounted && map) {
          setTargetsMap(map);
        }
      })
      .catch((err) => {
        console.warn("Could not load navigation targets config:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

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

  return (
    <NavigationConfigContext.Provider
      value={{
        targetsMap,
        loading,
        getLinkTarget: getLinkTargetCallback,
        handleNavigation: handleNavigationCallback
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
      handleNavigation: (p, s = null) => navigateUrl(p, null, s, null)
    };
  }
  return context;
}
