import React from "react";
import Head from "next/head";
import SecondaryLayout from "@/components/Layouts/SecondaryLayout";
import HealthAwarenessCalendar from "@/components/HealthAwarenessCalendar/HealthAwarenessCalendar";

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
                <HealthAwarenessCalendar />
            </SecondaryLayout>
        </>
    );
}
