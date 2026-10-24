import React from "react";
import Head from "next/head";
import SecondaryLayout from "@/components/Layouts/SecondaryLayout";
import HealthAwarenessCalendar from "@/components/HealthAwarenessCalendar/HealthAwarenessCalendar";
import Breadcrumb from "@/components/Common/Breadcrumb";

export default function HealthAwarenessCalendarPage() {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <Head>
                <title>{`Health Awareness Calendar ${currentYear} | World Health Days - TX Hospitals`}</title>
                <meta
                    name="description"
                    content={`Explore the Health Awareness Calendar ${currentYear} at TX Hospitals. Learn about World Health Days, health awareness events, and stay informed on preventive care.`}
                />
                <meta
                    name="keywords"
                    content={`Health Awareness Calendar ${currentYear}, World Health Days, TX Hospitals health calendar, medical awareness days`}
                />
            </Head>
            <SecondaryLayout>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
                    <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Health Awareness Calendar" }]} />
                </div>
                <HealthAwarenessCalendar />
            </SecondaryLayout>
        </>
    );
}
