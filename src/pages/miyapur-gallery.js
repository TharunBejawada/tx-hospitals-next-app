import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiZoomIn } from 'react-icons/fi';
import SecondaryLayout from '@/components/Layouts/SecondaryLayout';
import Breadcrumb from '@/components/Common/Breadcrumb';

export default function MiyapurGallery({ images }) {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <>
            <Head>
                <title>Miyapur Unit Inauguration Gallery | TX Hospitals</title>
                <meta name="description" content="View the full gallery of the Miyapur Unit Inauguration at TX Hospitals." />
            </Head>
            <SecondaryLayout>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 font-inter">
                    <div className="mb-6">
                        <Breadcrumb items={[
                            { label: "Home", href: "/" },
                            { label: "News & Media", href: "/news-and-media" },
                            { label: "Miyapur Gallery" }
                        ]} />
                    </div>

                    <div className="mb-10 text-left">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-pink-700 tracking-tight">
                            Miyapur Unit Inauguration
                        </h1>
                        <p className="mt-4 text-gray-500 max-w-2xl text-lg">
                            Explore the highlights and memorable moments from the grand inauguration of our Miyapur facility.
                        </p>
                        <div className="h-1.5 w-24 bg-pink-700 mt-6 rounded-full opacity-80"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-max">
                        {images.map((src, index) => (
                            <motion.div 
                                key={index} 
                                className="relative overflow-hidden rounded-2xl shadow-sm border border-gray-100 group cursor-pointer bg-gray-100"
                                whileHover={{ y: -5 }}
                                onClick={() => setSelectedImage(src)}
                            >
                                <img 
                                    loading="lazy" 
                                    src={src}
                                    alt={`Miyapur ${index + 1}`}
                                    className="w-full h-56 md:h-64 object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-90"
                                />
                                <div className="absolute inset-0 bg-pink-900/0 group-hover:bg-pink-900/20 transition-colors duration-300 flex items-center justify-center">
                                    <div className="bg-white/90 p-3 rounded-full text-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-50 group-hover:scale-100">
                                        <FiZoomIn size={24} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </SecondaryLayout>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-10"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button 
                            className="absolute top-6 right-6 md:top-10 md:right-10 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(null);
                            }}
                        >
                            <FiX size={32} />
                        </button>
                        <motion.img 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            src={selectedImage} 
                            alt="Full Screen View"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()} 
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export async function getStaticProps() {
    const imagesDir = path.join(process.cwd(), 'public', 'assets', 'NewsAndMedia', 'Miyapur');
    let images = [];
    try {
        const filenames = fs.readdirSync(imagesDir);
        filenames.sort((a, b) => {
            const numA = (a.match(/\d+/) ? parseInt(a.match(/\d+/)[0], 10) : 0);
            const numB = (b.match(/\d+/) ? parseInt(b.match(/\d+/)[0], 10) : 0);
            return numA - numB;
        });
        images = filenames.map(name => `/assets/NewsAndMedia/Miyapur/${name}`);
    } catch (e) {
        console.error(e);
    }
    
    return {
        props: {
            images
        }
    };
}
