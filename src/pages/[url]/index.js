import { useEffect, useState } from "react";
import axios from "axios";
import CONFIG from "@/config";
import BlogDetails from "@/components/Blogs/BlogDetails";
import ViewProfile from "@/components/Doctors/ViewProfile";
import { useRouter } from "next/router";
import SecondaryLayout from "@/components/Layouts/SecondaryLayout";
import SODetailsPage from "@/components/SecondOpinion/SODetailsPage";
import BranchSOPage from "@/components/BranchSO/BranchSOPage";
import DiagnosticPage from "@/components/DiagnosticsPage/DiagnosticPage";

// In-memory cache on the Node.js server to make SSR resolution ultra-fast (1 minute TTL)
let serverCache = {
    blogs: null,
    doctors: null,
    opinions: null,
    lastFetched: 0
};

export async function getServerSideProps(context) {
    const { url } = context.params || {};

    if (!url || url.includes('[') || url.includes(']')) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        };
    }

    const cleanUrl = String(url).replace(/^\/|\/$/g, "");
    if (context.res) {
        context.res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    }

    try {
        const now = Date.now();
        const cacheValid = serverCache.lastFetched && (now - serverCache.lastFetched < 60000);

        let blogs = cacheValid ? serverCache.blogs : null;
        let doctors = cacheValid ? serverCache.doctors : null;
        let opinions = cacheValid ? serverCache.opinions : null;

        if (!cacheValid || !blogs || !doctors || !opinions) {
            const [blogsRes, doctorsRes, soRes] = await Promise.all([
                axios.get(`${CONFIG.API_BASE_URL}/blogs/getBlogsList`, { timeout: 6000 }).catch(() => null),
                axios.get(`${CONFIG.API_BASE_URL}/getDoctorsList`, { timeout: 6000 }).catch(() => axios.get(`${CONFIG.API_BASE_URL}/getAllDoctors`, { timeout: 6000 })).catch(() => null),
                axios.get(`${CONFIG.API_BASE_URL}/new-secondopinion/getAllSecondOpinion`, { timeout: 6000 }).catch(() => null)
            ]);

            blogs = blogsRes?.data?.Items?.filter(b => (b.status ? b.status === "active" : b.enabled !== false) && b.status !== "inactive" && b.enabled !== false) || [];
            doctors = Array.isArray(doctorsRes?.data) ? doctorsRes.data : [];
            opinions = soRes?.data?.Items || [];

            serverCache = {
                blogs,
                doctors,
                opinions,
                lastFetched: now
            };
        }

        // 1. Check Blogs
        const matchBlog = blogs.find(blog => blog?.url && cleanUrl === blog.url.replace(/^\/|\/$/g, ""));
        if (matchBlog) {
            const allCats = blogs.flatMap(b => b.categories || []);
            const departments = [...new Set(allCats)];

            let blogData = matchBlog;
            if (!matchBlog.extraFields || matchBlog.extraFields.length === 0) {
                try {
                    const res = await axios.get(`${CONFIG.API_BASE_URL}/blogs/getBlogbyId/${matchBlog.blogId}`, { timeout: 4000 });
                    if (res?.data?.Item) {
                        blogData = res.data.Item;
                    }
                } catch (err) {
                    console.error("SSR Blog detail fetch warning:", err.message);
                }
            }

            return {
                props: {
                    initialType: "blog",
                    initialData: blogData,
                    initialDepartments: departments
                }
            };
        }

        // 2. Check Doctors
        const matchDoctor = doctors.find(d => d?.url && cleanUrl === d.url.replace(/^\/|\/$/g, ""));
        if (matchDoctor) {
            try {
                const res = await axios.get(`${CONFIG.API_BASE_URL}/doctors/${encodeURIComponent(matchDoctor.id)}`, { timeout: 4000 });
                if (res.data && Object.keys(res.data).length > 0) {
                    return {
                        props: {
                            initialType: "doctor",
                            initialData: res.data,
                            initialDepartments: []
                        }
                    };
                }
            } catch (err) {
                console.error("SSR Doctor fetch error:", err.message);
            }
            return {
                redirect: {
                    destination: "/find-doctor/",
                    permanent: false
                }
            };
        }

        // 3. Check Second Opinion Surgeries
        const matchOpinion = opinions.find(op => op?.url && cleanUrl === op.url.replace(/^\/|\/$/g, ""));
        if (matchOpinion) {
            try {
                const res = await axios.get(`${CONFIG.API_BASE_URL}/new-secondopinion/getSecondOpinionbyId/${matchOpinion.soId}`, { timeout: 4000 });
                if (res?.data?.Item) {
                    return {
                        props: {
                            initialType: "surgery",
                            initialData: res.data.Item,
                            initialDepartments: []
                        }
                    };
                }
            } catch (err) {
                console.error("SSR Surgery fetch error:", err.message);
            }
        }

        // 4. Check Branch-wise SO Landing Pages
        try {
            const branchSoRes = await axios.get(
                `${CONFIG.API_BASE_URL}/api/so-landing-pages/by-url?url=${encodeURIComponent("/" + cleanUrl + "/")}`,
                { timeout: 4000 }
            );
            if (branchSoRes?.data && branchSoRes.data.PageData) {
                return {
                    props: {
                        initialType: "branch-so",
                        initialData: branchSoRes.data,
                        initialDepartments: []
                    }
                };
            }
        } catch (err) {
            // Not a branch SO page (404 expected when unmatched)
        }

        // 5. Check Diagnostic Pages
        try {
            const diagRes = await axios.get(
                `${CONFIG.API_BASE_URL}/api/diagnostics-pages/by-url?url=${encodeURIComponent("/" + cleanUrl + "/")}`,
                { timeout: 4000 }
            );
            if (diagRes?.data && diagRes.data.PageData) {
                return {
                    props: {
                        initialType: "diagnostic-page",
                        initialData: diagRes.data,
                        initialDepartments: []
                    }
                };
            }
        } catch (err) {
            // Not a diagnostic page (404 expected when unmatched)
        }

        // If it looks like a doctor URL but no match was found
        if (cleanUrl.startsWith("dr-")) {
            return {
                redirect: {
                    destination: "/find-doctor/",
                    permanent: false
                }
            };
        }

        // Fallback redirect to home if route not matched
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        };

    } catch (error) {
        console.error("Universal SSR Error:", error.message);
        // On error, let client fallback attempt resolution
        return {
            props: {
                initialType: null,
                initialData: null,
                initialDepartments: []
            }
        };
    }
}

export default function UniversalPage({ initialType, initialData, initialDepartments }) {
    const router = useRouter();
    const { url } = router.query;

    const [loading, setLoading] = useState(!initialData);
    const [type, setType] = useState(initialType || null);
    const [data, setData] = useState(initialData || null);
    const [departments, setDepartments] = useState(initialDepartments || []);

    // Simple static client cache
    const apiCache = {
        blogs: null,
        doctors: null,
        opinions: null
    };

    useEffect(() => {
        // If data was already rendered by SSR, sync state and save hint to localStorage
        if (initialData && initialType) {
            setType(initialType);
            setData(initialData);
            setDepartments(initialDepartments || []);
            try {
                const cleanUrl = String(url || "").replace(/^\/|\/$/g, "");
                if (cleanUrl) {
                    const existingMap = JSON.parse(localStorage.getItem('slugMap') || '{}');
                    const id = initialData.blogId || initialData.id || initialData.soId || initialData.diagPageId;
                    if (id) {
                        existingMap[cleanUrl] = { id, type: initialType };
                        localStorage.setItem('slugMap', JSON.stringify(existingMap));
                    }
                }
            } catch (_) {}
            setLoading(false);
            return;
        }

        if (!url) return;

        if (url.includes('[') || url.includes(']')) {
            router.replace("/");
            return;
        }

        const fetchData = async () => {
            try {
                const slugMap = JSON.parse(localStorage.getItem('slugMap') || '{}');
                const cleanUrl = url.replace(/^\/|\/$/g, "");
                const hint = slugMap[cleanUrl];

                if (hint) {
                    if (hint.type === 'surgery') {
                        const res = await axios.get(`${CONFIG.API_BASE_URL}/new-secondopinion/getSecondOpinionbyId/${hint.id}`);
                        setType("surgery");
                        setData(res?.data?.Item);
                        setLoading(false);
                        return;
                    }
                    if (hint.type === 'branch-so') {
                        const res = await axios.get(`${CONFIG.API_BASE_URL}/api/so-landing-pages/item/${encodeURIComponent(hint.id)}`);
                        if (res?.data?.PageData) {
                            setType("branch-so");
                            setData(res.data);
                            setLoading(false);
                            return;
                        }
                    }
                    if (hint.type === 'diagnostic-page') {
                        const res = await axios.get(`${CONFIG.API_BASE_URL}/api/diagnostics-pages/item/${encodeURIComponent(hint.id)}`);
                        if (res?.data?.PageData) {
                            setType("diagnostic-page");
                            setData(res.data);
                            setLoading(false);
                            return;
                        }
                    }
                    if (hint.type === 'doctor') {
                        try {
                            const res = await axios.get(`${CONFIG.API_BASE_URL}/doctors/${hint.id}`);
                            if (!res.data || Object.keys(res.data).length === 0) {
                                router.replace("/");
                                return;
                            }
                            setType("doctor");
                            setData(res.data);
                            setLoading(false);
                        } catch (err) {
                            router.replace("/");
                        }
                        return;
                    }
                }

                const [blogsRes, doctorsRes, soRes] = await Promise.all([
                    apiCache.blogs || axios.get(`${CONFIG.API_BASE_URL}/blogs/getBlogsList`),
                    apiCache.doctors || axios.get(`${CONFIG.API_BASE_URL}/getDoctorsList`).catch(() => axios.get(`${CONFIG.API_BASE_URL}/getAllDoctors`)),
                    apiCache.opinions || axios.get(`${CONFIG.API_BASE_URL}/new-secondopinion/getAllSecondOpinion`)
                ]);

                apiCache.blogs = blogsRes;
                apiCache.doctors = doctorsRes;
                apiCache.opinions = soRes;

                const blogs = blogsRes?.data?.Items?.filter(b => (b.status ? b.status === "active" : b.enabled !== false) && b.status !== "inactive" && b.enabled !== false) || [];
                const doctors = Array.isArray(doctorsRes?.data) ? doctorsRes.data : [];
                const opinions = soRes?.data?.Items || [];

                const matchBlog = blogs.find(blog => blog?.url && cleanUrl === blog.url.replace(/^\/|\/$/g, ""));
                if (matchBlog) {
                    const allCats = blogs.flatMap(b => b.categories || []);
                    setDepartments([...new Set(allCats)]);
                    setType("blog");
                    let blogData = matchBlog;
                    if (!matchBlog.extraFields || matchBlog.extraFields.length === 0) {
                        try {
                            const res = await axios.get(`${CONFIG.API_BASE_URL}/blogs/getBlogbyId/${matchBlog.blogId}`);
                            if (res?.data?.Item) {
                                blogData = res.data.Item;
                            }
                        } catch (err) {
                            console.error("Error fetching full blog details:", err);
                        }
                    }
                    setData(blogData);
                    setLoading(false);
                    return;
                }

                const matchDoctor = doctors.find(d => d?.url && cleanUrl === d.url.replace(/^\/|\/$/g, ""));
                if (matchDoctor) {
                    try {
                        const res = await axios.get(`${CONFIG.API_BASE_URL}/doctors/${matchDoctor.id}`);
                        if (!res.data || Object.keys(res.data).length === 0) {
                            router.replace("/find-doctor/");
                            return;
                        }
                        setType("doctor");
                        setData(res.data);
                        setLoading(false);
                    } catch (err) {
                        router.replace("/");
                    }
                    return;
                }

                const matchOpinion = opinions.find(op => op?.url && cleanUrl === op.url.replace(/^\/|\/$/g, ""));
                if (matchOpinion) {
                    const res = await axios.get(`${CONFIG.API_BASE_URL}/new-secondopinion/getSecondOpinionbyId/${matchOpinion.soId}`);
                    setType("surgery");
                    setData(res?.data?.Item);
                    setLoading(false);
                    return;
                }

                try {
                    const branchSoRes = await axios.get(`${CONFIG.API_BASE_URL}/api/so-landing-pages/by-url?url=${encodeURIComponent("/" + cleanUrl + "/")}`);
                    if (branchSoRes?.data?.PageData) {
                        setType("branch-so");
                        setData(branchSoRes.data);
                        setLoading(false);
                        return;
                    }
                } catch (_) {}

                try {
                    const diagRes = await axios.get(`${CONFIG.API_BASE_URL}/api/diagnostics-pages/by-url?url=${encodeURIComponent("/" + cleanUrl + "/")}`);
                    if (diagRes?.data?.PageData) {
                        setType("diagnostic-page");
                        setData(diagRes.data);
                        setLoading(false);
                        return;
                    }
                } catch (_) {}

                if (cleanUrl.startsWith("dr-")) {
                    router.replace("/find-doctor/");
                    return;
                }

                router.replace("/");
                return;
            } catch (err) {
                console.error("Universal Client Error:", err);
                router.replace("/");
                return;
            }
        };

        fetchData();
    }, [url, initialData, initialType]);

    /* Loading state */
    if (loading) {
        return (
            <SecondaryLayout>
                <div className="flex flex-row justify-center items-center mt-20 mb-4 gap-2">
                    <div className="w-8 h-8 border-2 border-pink-700 border-t-transparent rounded-full animate-spin"></div>
                    <div className="text-pink-700 text-lg font-medium animate-pulse">
                        Loading...
                    </div>
                </div>
            </SecondaryLayout>
        );
    }

    /* Blog */
    if (type === "blog") {
        return (
            <SecondaryLayout>
                <BlogDetails blogData={data} departments={departments} />
            </SecondaryLayout>
        );
    }

    /* Doctor */
    if (type === "doctor") {
        return (
            <SecondaryLayout>
                <ViewProfile doctorData={data} />
            </SecondaryLayout>
        );
    }

    /* Surgery */
    if (type === "surgery") {
        return (
            <SecondaryLayout>
                <SODetailsPage surgeryData={data} />
            </SecondaryLayout>
        );
    }

    /* Branch-wise Second Opinion Surgery */
    if (type === "branch-so") {
        return (
            <SecondaryLayout>
                <BranchSOPage soPageData={data} />
            </SecondaryLayout>
        );
    }

    /* Diagnostic Page */
    if (type === "diagnostic-page") {
        return (
            <SecondaryLayout>
                <DiagnosticPage diagnosticPageData={data} />
            </SecondaryLayout>
        );
    }

    return null;
}
