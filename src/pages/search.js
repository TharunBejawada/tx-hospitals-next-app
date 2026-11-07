import React from "react";
import Head from "next/head";
import SecondaryLayout from "@/components/Layouts/SecondaryLayout";
import SearchResults from "@/components/Search/SearchResults";

export async function getServerSideProps(context) {
    const { q = "" } = context.query || {};
    return {
        props: {
            query: String(q || "").trim()
        }
    };
}

export default function SearchPage({ query = "" }) {
    return (
        <>
            <Head>
                <title>
                    {query ? `Search: "${query}" – TX Hospitals` : "Search – TX Hospitals"}
                </title>
                <meta
                    name="description"
                    content="Search for diseases, treatments, surgeries, blogs, health packages and procedures at TX Hospitals Hyderabad."
                />
                <meta
                    name="keywords"
                    content="TX Hospitals search, diseases treatments Hyderabad, hospital search"
                />
            </Head>
            <SecondaryLayout>
                <SearchResults initialQuery={query} />
            </SecondaryLayout>
        </>
    );
}
