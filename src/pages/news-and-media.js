import React, { useState, useEffect } from "react";
import Head from 'next/head';
import { motion } from "framer-motion";
import Gallery from "@/components/NewsAndMedia/Gallery";
import PrintMedia from "@/components/NewsAndMedia/PrintMedia";
import DigitalMedia from "@/components/NewsAndMedia/DigitalMedia";
import SecondaryLayout from '@/components/Layouts/SecondaryLayout';
import Breadcrumb from '@/components/Common/Breadcrumb';

const NewsAndMedia = () => {

  const [isMobile, setIsMobile] = useState(false);
  const [selectedTab, setSelectedTab] = useState("gallery");

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const tabs = [
    { name: "Gallery", key: "gallery" },
    { name: "Print Media", key: "print-media" },
    { name: "Digital Media", key: "digital-media" }
  ];

  return (
    <>
      <Head>
        <title>TX Hospitals News & Media – Hyderabad Healthcare Updates</title>
        <meta name="description" content="Explore TX Hospitals’ News & Media for recent announcements, community highlights, and media coverage from Hyderabad’s multi-specialty healthcare leader." />
        <meta name="keywords" content="TX Hospitals news Hyderabad, TX Hospitals press releases, Hospital news Hyderabad, TX Hospitals media coverage" />
      </Head>
      <SecondaryLayout>
        <div className="w-full font-inter">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "News & Media" }]} />
          </div>
          {/* Banner matching the rest of the application */}
          <div className="bg-gray-50 text-center py-8 border-b border-gray-200">
            <h1 className="text-3xl md:text-4xl font-semibold text-pink-700">News & Media</h1>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              className="flex flex-wrap items-center justify-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {tabs.map(({ name, key }) => (
                <button
                  key={key}
                  onClick={() => handleTabClick(key)}
                  className={`
                    relative px-6 py-2.5 rounded-full text-sm md:text-base font-semibold transition-all duration-300
                    ${selectedTab === key 
                      ? "bg-pink-700 text-white shadow-md shadow-pink-200" 
                      : "bg-white text-gray-700 border border-gray-300 hover:border-pink-300 hover:text-pink-700 hover:bg-pink-50"
                    }
                  `}
                >
                  {name}
                </button>
              ))}
            </motion.div>

            <motion.div
              key={selectedTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-2 md:p-6"
            >
              {selectedTab === "gallery" && <Gallery />}
              {selectedTab === "print-media" && <PrintMedia />}
              {selectedTab === "digital-media" && <DigitalMedia />}
            </motion.div>
          </div>
        </div>
      </SecondaryLayout>
    </>
  );
};

export default NewsAndMedia;
