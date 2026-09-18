"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";
import SecondaryLayout from "@/components/Layouts/SecondaryLayout";
import COEOverview from "@/components/COE/COEOverview";
import DiseasesTreatments from "@/components/COE/DiseasesTreatments";
import Diagnosties from "@/components/COE/Diagnosties";
import Procedures from "@/components/COE/Procedures";
import Doctors from "@/components/COE/Doctors";
import { getDepartmentDetails } from "@/utils/departmentUtils";
import Breadcrumb from "@/components/Common/Breadcrumb";
import DTDDetailsPage from "@/components/DiseaseAndTreatment/DTDDetailsPage";
import ProcedureDetailsPage from "@/components/Procedures/ProcedureDetailsPage";

export default function CenterOfExcellencePage() {
    const router = useRouter();
    const { slug } = router.query;
    const [routeType, setRouteType] = useState(null);
    const [department, setDepartment] = useState(null);
    const [tab, setTab] = useState(null);
    const [url, setUrl] = useState(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (!slug) return;

        let dep = slug[0] || null;
        const second = slug[1] || null;
        const third = slug[2] || null;

        if (dep === "cardiothoracic-and-vascular-surgery-hospitals") {
            dep = "cardiothoracic-vascular-surgery";
        }
        if (dep === "medical-gastro-hospitals") {
            dep = "medical-gastroenterology";
        } else if (dep === "surgical-gastro-hospitals" || dep === "surgical-gastroenterology-hospitals") {
            dep = "surgical-gastroenterology";
        } else if (dep === "gynecology-hospitals") {
            dep = "gynaecology";
        } else if (dep === "pediatric-hospitals") {
            dep = "paediatrics";
        }

        setDepartment(dep);

        if (!second) {
            setRouteType("coe-main");
            setTab("");
            return;
        }

        const validTabs = [
            "disease-and-treatment",
            "diagnostics",
            "procedures",
            "our-clinical-team",
        ];

        if (validTabs.includes(second) && !third) {
            setRouteType("coe-tab");
            setTab(second);
            return;
        }

        if (second === "disease-and-treatment" && third) {
            setRouteType("dat-detail");
            const fullUrl = `/specialities/${slug.join('/')}/`;
            setUrl(fullUrl);
            return;
        }

        if (second === "procedures" && third) {
            setRouteType("procedure-detail");
            const fullUrl = `/specialities/${slug.join('/')}/`;
            setUrl(fullUrl);
            return;
        }

    }, [slug]);

    const handleTabClick = (key) => {
        setTab(key);
        if (department === "cardiothoracic-vascular-surgery") {
            router.push(`/specialities/cardiothoracic-and-vascular-surgery-hospitals/${key ? `${key}/` : ""}`);
        } else if (department === "medical-gastroenterology") {
            router.push(`/specialities/medical-gastro-hospitals/${key ? `${key}/` : ""}`);
        } else if (department === "surgical-gastroenterology") {
            router.push(`/specialities/surgical-gastro-hospitals/${key ? `${key}/` : ""}`);
        } else if (department === "gynaecology") {
            router.push(`/specialities/gynecology-hospitals/${key ? `${key}/` : ""}`);
        } else if (department === "paediatrics") {
            router.push(`/specialities/pediatric-hospitals/${key ? `${key}/` : ""}`);
        } else {
            router.push(`/specialities/${department}/${key ? `${key}/` : ""}`);
        }
    };

    const tabs = [
        { name: "Overview", key: "" },
        { name: "Diseases and Treatment", key: "disease-and-treatment" },
        { name: "Diagnostics", key: "diagnostics" },
        { name: "Procedures", key: "procedures" },
        ...(department !== "mother-child-care" ? [{ name: "Doctors", key: "our-clinical-team" }] : []),
    ];

    const { title, image } = getDepartmentDetails(department);

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Specialities", href: "/specialities/" },
        { label: title },
    ];

    if (!routeType) return (
        <div className="flex flex-row justify-center items-center mt-20 mb-4 gap-2">
            <div className="w-8 h-8 border-2 border-pink-700 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-pink-700 text-lg font-medium animate-pulse">
                Loading...
            </div>
        </div>
    );

    if (routeType === "dat-detail") {
        return (
            <SecondaryLayout>
                <DTDDetailsPage url={url} />
            </SecondaryLayout>
        );
    }

    if (routeType === "procedure-detail") {
        return (
            <SecondaryLayout>
                <ProcedureDetailsPage url={url} />
            </SecondaryLayout>
        );
    }

    return (
        <SecondaryLayout>
            {!isMobile ? (
                <div className="mt-10 font-inter mx-[5%]">
                    <Breadcrumb items={breadcrumbItems} />
                    <h2 className="text-4xl font-bold text-pink-700 text-center">{title}</h2>
                    <img src={image} alt={title} className="w-full h-full mt-2" />
                    <motion.div
                        className="flex items-center justify-center gap-10 mx-[1%] mt-6"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
                        }}
                    >
                        {tabs.map(({ name, key }, index) => (
                            <motion.button
                                key={key}
                                onClick={() => handleTabClick(key)}
                                className="relative w-auto border border-gray-800 font-semibold text-black text-2xl px-4 py-1 rounded-2xl overflow-hidden whitespace-nowrap"
                                initial={{ x: index % 2 === 0 ? -200 : 200, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                            >
                                {tab === key && (
                                    <motion.div
                                        className="absolute inset-0 bg-pink-700"
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "0%" }}
                                        transition={{ type: "tween", duration: 0.4 }}
                                    />
                                )}
                                <motion.span
                                    className={`relative text-lg ${tab === key ? "text-white" : "text-black"
                                        }`}
                                >
                                    {name}
                                </motion.span>
                            </motion.button>
                        ))}
                    </motion.div>
                    <AnimatePresence mode="wait">
                        {tab === "" && <COEOverview department={department} />}
                        {tab === "disease-and-treatment" && <DiseasesTreatments department={department} />}
                        {tab === "diagnostics" && <Diagnosties department={department} />}
                        {tab === "procedures" && <Procedures department={department} />}
                        {tab === "our-clinical-team" && <Doctors department={department} />}
                    </AnimatePresence>
                </div>
            ) : (
                <div className="-mt-4 font-inter">
                    <Breadcrumb items={breadcrumbItems} />
                    <h2 className="text-2xl font-bold text-pink-700 text-center">{title}</h2>
                    <img src={image} alt={title} className="w-full h-full" />
                    <motion.div
                        className="grid grid-cols-2 gap-2 m-2"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
                        }}
                    >
                        {tabs.map(({ name, key }, index) => (
                            <motion.button
                                key={key}
                                onClick={() => handleTabClick(key)}
                                className={`relative border border-gray-800 font-semibold text-black text-sm px-1 py-1 rounded-2xl overflow-hidden 
                ${tab === key ? "bg-pink-700 text-white" : ""}
                ${index === tabs.length - 1 && tabs.length % 2 !== 0 ? "col-span-2 justify-self-center w-1/2" : ""}
            `}
                                initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 120, damping: 15 }}
                            >
                                <motion.span
                                    className={`relative ${tab === key ? "text-white" : "text-black"
                                        }`}
                                >
                                    {name}
                                </motion.span>
                            </motion.button>
                        ))}
                    </motion.div>
                    <AnimatePresence mode="wait">
                        {tab === "" && <COEOverview department={department} />}
                        {tab === "disease-and-treatment" && <DiseasesTreatments department={department} />}
                        {tab === "diagnostics" && <Diagnosties department={department} />}
                        {tab === "procedures" && <Procedures department={department} />}
                        {tab === "our-clinical-team" && <Doctors department={department} />}
                    </AnimatePresence>
                </div>
            )}
        </SecondaryLayout>
    );
}