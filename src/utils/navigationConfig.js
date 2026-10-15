import CONFIG from "@/config";

// In-memory cache for fast, synchronous lookups
let inMemoryConfigMap = null;
let fetchPromise = null;
const listeners = new Set();

// Subscribe to config updates
export const subscribeNavigationConfig = (callback) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};

const notifyListeners = (map) => {
  listeners.forEach((fn) => {
    try {
      fn(map);
    } catch (_) {}
  });
};

// Normalize path to ensure consistent matching regardless of trailing slashes, leading slashes, origins, or case
export const normalizePath = (urlPath) => {
  if (!urlPath || typeof urlPath !== "string") return "";
  let clean = urlPath.trim().toLowerCase();

  // Strip full origin if present (e.g., https://txhospitals.in/about-us/ -> /about-us/)
  try {
    if (clean.startsWith("http://") || clean.startsWith("https://")) {
      const parsed = new URL(clean);
      clean = parsed.pathname + parsed.search + parsed.hash;
    }
  } catch (_) {}

  // Standardize multiple slashes
  clean = clean.replace(/\/+/g, "/");

  // Ensure leading slash for regular web routes if not an anchor or protocol
  if (!clean.startsWith("/") && !clean.startsWith("#") && !clean.includes("://")) {
    clean = "/" + clean;
  }

  return clean;
};

// Build a fast key-value lookup map from categories data
export const buildTargetsMap = (categories) => {
  const map = {};
  if (!Array.isArray(categories)) return map;

  categories.forEach((cat) => {
    if (Array.isArray(cat.links)) {
      cat.links.forEach((link) => {
        if (link && link.path) {
          const norm = normalizePath(link.path);
          if (link.enabled !== false) {
            const target = link.target === "_blank" ? "_blank" : "_self";
            map[norm] = target;

            // Map with and without trailing slash
            if (norm.endsWith("/") && norm.length > 1) {
              const withoutTrailing = norm.slice(0, -1);
              map[withoutTrailing] = target;
              if (withoutTrailing.startsWith("/")) {
                map[withoutTrailing.slice(1)] = target;
              }
            } else if (!norm.endsWith("/")) {
              const withTrailing = norm + "/";
              map[withTrailing] = target;
              if (norm.startsWith("/")) {
                map[norm.slice(1)] = target;
                map[norm.slice(1) + "/"] = target;
              }
            }

            if (norm.startsWith("/")) {
              map[norm.slice(1)] = target;
            }
          }
        }
      });
    }
  });

  return map;
};

// Fetch navigation configuration from backend API (with localStorage caching and cache-busting)
export const fetchNavigationConfig = async (forceRefresh = false) => {
  // Try local storage cache first on browser for instant availability
  if (typeof window !== "undefined" && !inMemoryConfigMap) {
    try {
      const cached = localStorage.getItem("tx_navigation_targets_cache");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && typeof parsed === "object" && Object.keys(parsed).length > 0) {
          inMemoryConfigMap = parsed;
        }
      }
    } catch (_) {}
  }

  if (fetchPromise && !forceRefresh) return fetchPromise;

  fetchPromise = (async () => {
    try {
      // Use cache-busting timestamp to bypass browser/proxy caching
      const timestamp = Date.now();
      const res = await fetch(`${CONFIG.API_BASE_URL}/navigation-config?_t=${timestamp}`, {
        cache: "no-store",
        headers: {
          "Pragma": "no-cache",
          "Cache-Control": "no-cache"
        }
      });

      if (res.ok) {
        const data = await res.json();
        const categories = Array.isArray(data?.categories) ? data.categories : [];
        if (categories.length > 0) {
          const map = buildTargetsMap(categories);
          inMemoryConfigMap = map;
          if (typeof window !== "undefined") {
            try {
              localStorage.setItem("tx_navigation_targets_cache", JSON.stringify(map));
            } catch (_) {}
          }
          notifyListeners(map);
          return map;
        }
      }
    } catch (err) {
      console.warn("Navigation config fetch warning (defaulting to _self):", err?.message);
    } finally {
      fetchPromise = null;
    }

    if (!inMemoryConfigMap) inMemoryConfigMap = {};
    return inMemoryConfigMap;
  })();

  return fetchPromise;
};

/**
 * Returns navigation target for a given URL path.
 * Rule: If a URL doesn't have a specific navigation config, it ALWAYS defaults to "_self".
 *
 * @param {string} urlPath - The target URL/route
 * @param {Object} [overrideMap] - Optional map to check against
 * @returns {"_self" | "_blank"}
 */
export const getNavigationTarget = (urlPath, overrideMap = null) => {
  if (!urlPath) return "_self";

  const map = overrideMap || inMemoryConfigMap;
  if (!map || Object.keys(map).length === 0) return "_self";

  const norm = normalizePath(urlPath);

  // 1. Exact match with normalized path
  if (map[norm]) return map[norm];

  // Also check without trailing slash or with trailing slash
  if (norm.endsWith("/") && norm.length > 1 && map[norm.slice(0, -1)]) {
    return map[norm.slice(0, -1)];
  }
  if (!norm.endsWith("/") && map[norm + "/"]) {
    return map[norm + "/"];
  }

  // 2. Match without hash fragment (e.g., /about-us/#chairmans-message -> /about-us/)
  if (norm.includes("#")) {
    const baseWithoutHash = norm.split("#")[0];
    if (map[baseWithoutHash]) return map[baseWithoutHash];
    if (baseWithoutHash.endsWith("/") && map[baseWithoutHash.slice(0, -1)]) {
      return map[baseWithoutHash.slice(0, -1)];
    }
    if (!baseWithoutHash.endsWith("/") && map[baseWithoutHash + "/"]) {
      return map[baseWithoutHash + "/"];
    }
  }

  // 3. Match without query string (e.g., /search?q=cardiac -> /search)
  let cleanNoQuery = norm.split("?")[0];
  if (cleanNoQuery.includes("#")) cleanNoQuery = cleanNoQuery.split("#")[0];
  if (map[cleanNoQuery]) return map[cleanNoQuery];
  if (cleanNoQuery.endsWith("/") && map[cleanNoQuery.slice(0, -1)]) {
    return map[cleanNoQuery.slice(0, -1)];
  }
  if (!cleanNoQuery.endsWith("/") && map[cleanNoQuery + "/"]) {
    return map[cleanNoQuery + "/"];
  }

  // 4. Match without leading slash if stored that way
  const noLeading = norm.startsWith("/") ? norm.slice(1) : norm;
  if (map[noLeading]) return map[noLeading];

  // 5. Default: If a URL doesn't have a specific navigation config, it MUST be _self
  return "_self";
};

/**
 * Universal Navigation Helper
 * Handles both _blank (window.open) and _self (Next.js router.push with optional in-page scroll).
 *
 * @param {string} urlPath
 * @param {object} router - Next.js router instance
 * @param {string|null} [scrollId] - Optional element ID to scroll to
 * @param {object|null} [overrideMap] - Optional target configuration map
 */
export const navigateUrl = (urlPath, router, scrollId = null, overrideMap = null) => {
  if (!urlPath || urlPath === "#") return;

  const target = getNavigationTarget(urlPath, overrideMap);

  // New Tab Navigation
  if (target === "_blank") {
    if (typeof window !== "undefined") {
      window.open(urlPath, "_blank", "noopener,noreferrer");
    }
    return;
  }

  // Same Page Navigation (_self)
  if (!router) {
    if (typeof window !== "undefined") {
      window.location.href = urlPath;
    }
    return;
  }

  // Handle in-page smooth scroll if on the same page
  const cleanPath = urlPath.split("#")[0].split("?")[0];
  const currentPath = router.pathname.split("#")[0].split("?")[0];

  if (currentPath === cleanPath && scrollId) {
    const element = document.getElementById(scrollId);
    if (element) {
      const navHeight = document.querySelector("nav")?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navHeight - 10,
        behavior: "smooth"
      });
      return;
    }
  }

  // Standard Next.js route transition
  router.push(urlPath).then(() => {
    if (scrollId && typeof window !== "undefined") {
      const element = document.getElementById(scrollId);
      if (element) {
        const navHeight = document.querySelector("nav")?.offsetHeight || 0;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - navHeight - 10,
          behavior: "smooth"
        });
      }
    }
  });
};
