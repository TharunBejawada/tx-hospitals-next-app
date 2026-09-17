import React from 'react';
import WhatsAppButton from '../WhatsAppButton';

const HerniaSimpleCTA = ({ onBookClick }) => {
    return (
        <section className="bg-[#be185d] py-12 md:py-16 px-6 text-center text-white font-inter">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-4xl font-extrabold mb-4 leading-tight">
                    Get Expert Hernia Treatment in Uppal
                </h2>
                <p className="text-sm md:text-lg text-pink-50/90 mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
                    Experienced surgeons. Minimally invasive surgery. Quick recovery. All insurance accepted. TX Hospitals, right near Uppal Bus Stop.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                    <button
                        onClick={onBookClick}
                        className="w-full sm:w-auto bg-white text-[#be185d] hover:bg-pink-50 font-extrabold py-3 md:py-4 px-8 md:px-12 rounded-full transition-all duration-300 ease-in-out shadow-xl hover:shadow-2xl text-sm md:text-lg uppercase tracking-wider transform hover:-translate-y-1 hover:scale-105"
                    >
                        Get Doctor Consultation
                    </button>

                    <div className="w-full sm:w-auto">
                        <WhatsAppButton sizeClass="w-full sm:w-auto py-3 md:py-4 px-8 md:px-12 text-sm md:text-lg" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HerniaSimpleCTA;
