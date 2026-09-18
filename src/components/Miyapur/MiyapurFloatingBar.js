import React, { useState } from 'react';
import { submitMyKareLead } from '@/utils/leadService';

import { useRouter } from 'next/router';
import axios from 'axios';
import { IoClose } from 'react-icons/io5';
import { User, Phone, Stethoscope, CalendarDays } from 'lucide-react';
import CONFIG from '@/config';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const MiyapurFloatingBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('appointment'); // 'appointment', 'second-opinion', 'health-checkup'
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        speciality: '',
        date: ''
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const openForm = (tab) => {
        setActiveTab(tab);
        setIsOpen(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 10-digit mobile number validation
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(formData.phone)) {
            toast.error("Please enter a valid 10-digit mobile number");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                to: "crm.txhospitals@gmail.com, venudas@txhospitals.in",
                cc: "info.txhospitals@gmail.com",
                subject: `New Inquiry from Miyapur Branch - Floating Bar (${activeTab === 'appointment' ? 'Book Appointment' : activeTab === 'second-opinion' ? 'Second Opinion' : 'Book Health Checkup'})`,
                html: `
                    <h3>New Floating Bar Inquiry - Miyapur Landing Page</h3>
                    <p><strong>Type:</strong> ${activeTab}</p>
                    <p><strong>Name:</strong> ${formData.name}</p>
                    <p><strong>Mobile:</strong> ${formData.phone}</p>
                    <p><strong>Department/Speciality:</strong> ${formData.speciality || 'Not Specified'}</p>
                    <p><strong>Preferred Date:</strong> ${formData.date || 'Not Specified'}</p>
                    <p><strong>Location:</strong> TX Hospitals Miyapur</p>
                    <p><strong>Page:</strong> ${document.title || "Miyapur Landing Page"}</p>
                `,
                page: document.title || "Miyapur Landing Page",
                location: "TX Hospitals Miyapur",
                name: formData.name,
                mobile: formData.phone,
                concern: formData.speciality,
                time: formData.date
            };
            await axios.post(`${CONFIG.API_BASE_URL}/send-email/dynamic-form`, payload);
            // Dispatch to MyKare lead API
            submitMyKareLead(payload);
            toast.success("Request submitted successfully!");
            setIsOpen(false);
            setFormData({ name: '', phone: '', speciality: '', date: '' });
            router.push('/thank-you-miyapur');
        } catch (error) {
            console.error('Error submitting Miyapur floating inquiry:', error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Determine colors based on active tab
    const getTabColor = (tab) => {
        switch (tab) {
            case 'appointment':
                return 'rgb(189, 56, 92)';
            case 'second-opinion':
                return 'rgb(124, 58, 237)';
            case 'health-checkup':
                return 'rgb(5, 150, 105)';
            default:
                return 'rgb(189, 56, 92)';
        }
    };

    const activeColor = getTabColor(activeTab);

    return (
        <>
            {/* Floating Sidebar */}
            <div className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 flex-col gap-1">
                {/* Book Appointment */}
                <div className="group relative flex items-center justify-end">
                    <span 
                        className="absolute right-full mr-2 whitespace-nowrap px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" 
                        style={{
                            fontSize: '12px', 
                            fontWeight: 500, 
                            color: 'rgb(255, 255, 255)', 
                            background: 'rgb(189, 56, 92)', 
                            boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px'
                        }}
                    >
                        Book Appointment
                    </span>
                    <button 
                        onClick={() => openForm('appointment')}
                        aria-label="Book Appointment" 
                        className="flex items-center justify-center w-10 h-10 rounded-l-lg shadow-md transition-all hover:w-12 text-white" 
                        style={{
                            background: 'rgb(189, 56, 92)', 
                            borderWidth: 'medium', 
                            borderStyle: 'none', 
                            borderColor: 'currentcolor', 
                            borderImage: 'initial', 
                            cursor: 'pointer'
                        }}
                    >
                        <svg alt="Icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><line x1="12" y1="14" x2="12" y2="18"></line><line x1="10" y1="16" x2="14" y2="16"></line></svg>
                    </button>
                </div>

                {/* Second Opinion */}
                <div className="group relative flex items-center justify-end">
                    <span 
                        className="absolute right-full mr-2 whitespace-nowrap px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" 
                        style={{
                            fontSize: '12px', 
                            fontWeight: 500, 
                            color: 'rgb(255, 255, 255)', 
                            background: 'rgb(124, 58, 237)', 
                            boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px'
                        }}
                    >
                        Second Opinion
                    </span>
                    <button 
                        onClick={() => openForm('second-opinion')}
                        aria-label="Second Opinion" 
                        className="flex items-center justify-center w-10 h-10 rounded-l-lg shadow-md transition-all hover:w-12 text-white" 
                        style={{
                            background: 'rgb(124, 58, 237)', 
                            borderWidth: 'medium', 
                            borderStyle: 'none', 
                            borderColor: 'currentcolor', 
                            borderImage: 'initial', 
                            cursor: 'pointer'
                        }}
                    >
                        <svg alt="Icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><line x1="9" y1="10" x2="15" y2="10"></line><line x1="12" y1="7" x2="12" y2="13"></line></svg>
                    </button>
                </div>

                {/* Book Health Checkup */}
                <div className="group relative flex items-center justify-end">
                    <span 
                        className="absolute right-full mr-2 whitespace-nowrap px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" 
                        style={{
                            fontSize: '12px', 
                            fontWeight: 500, 
                            color: 'rgb(255, 255, 255)', 
                            background: 'rgb(5, 150, 105)', 
                            boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px'
                        }}
                    >
                        Book Health Checkup
                    </span>
                    <button 
                        onClick={() => openForm('health-checkup')}
                        aria-label="Book Health Checkup" 
                        className="flex items-center justify-center w-10 h-10 rounded-l-lg shadow-md transition-all hover:w-12 text-white" 
                        style={{
                            background: 'rgb(5, 150, 105)', 
                            borderWidth: 'medium', 
                            borderStyle: 'none', 
                            borderColor: 'currentcolor', 
                            borderImage: 'initial', 
                            cursor: 'pointer'
                        }}
                    >
                        <svg alt="Contact Icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"></path><path d="M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0z"></path></svg>
                    </button>
                </div>

                {/* WhatsApp */}
                <div className="group relative flex items-center justify-end">
                    <span 
                        className="absolute right-full mr-2 whitespace-nowrap px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" 
                        style={{
                            fontSize: '12px', 
                            fontWeight: 500, 
                            color: 'rgb(255, 255, 255)', 
                            background: 'rgb(37, 211, 102)', 
                            boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px'
                        }}
                    >
                        WhatsApp
                    </span>
                    <a 
                        href="https://wa.me/9144514459"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp" 
                        className="flex items-center justify-center w-10 h-10 rounded-l-lg shadow-md transition-all hover:w-12 text-white" 
                        style={{
                            background: 'rgb(37, 211, 102)', 
                            borderWidth: 'medium', 
                            borderStyle: 'none', 
                            borderColor: 'currentcolor', 
                            borderImage: 'initial', 
                            cursor: 'pointer'
                        }}
                    >
                        <svg alt="Icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.18 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966a9.9 9.9 0 0 0-6.98-2.853c-5.438 0-9.863 4.372-9.867 9.8.001 1.736.469 3.43 1.36 4.953l-.991 3.616 3.698-.97c1.54.845 3.201 1.289 4.841 1.289zm8.56-5.882c-.269-.134-1.594-.787-1.84-.878-.246-.09-.425-.135-.605.134-.18.27-.697.877-.854 1.057-.158.18-.314.203-.583.069-.269-.134-1.138-.419-2.167-1.338-.802-.714-1.344-1.597-1.501-1.867-.158-.269-.017-.415.118-.549.121-.12.269-.314.403-.472.135-.157.18-.27.27-.449.09-.18.045-.337-.023-.472-.067-.134-.605-1.457-.828-1.995-.218-.523-.458-.453-.628-.462-.162-.008-.348-.01-.534-.01-.186 0-.49.07-.746.348-.256.278-.978.956-.978 2.33 0 1.375.999 2.702 1.138 2.893.139.191 1.967 3.003 4.76 4.213.665.288 1.184.46 1.588.589.668.213 1.277.183 1.758.11.536-.08 1.594-.651 1.817-1.282.223-.63.223-1.17.157-1.282-.067-.112-.246-.18-.515-.314z"/></svg>
                    </a>
                </div>

                {/* Call Phone */}
                <div className="group relative flex items-center justify-end">
                    <span 
                        className="absolute right-full mr-2 whitespace-nowrap px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" 
                        style={{
                            fontSize: '12px', 
                            fontWeight: 500, 
                            color: 'rgb(255, 255, 255)', 
                            background: 'rgb(37, 99, 235)', 
                            boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px'
                        }}
                    >
                        Call Us
                    </span>
                    <a 
                        href="tel:9144514459"
                        aria-label="Call Us" 
                        className="flex items-center justify-center w-10 h-10 rounded-l-lg shadow-md transition-all hover:w-12 text-white" 
                        style={{
                            background: 'rgb(37, 99, 235)', 
                            borderWidth: 'medium', 
                            borderStyle: 'none', 
                            borderColor: 'currentcolor', 
                            borderImage: 'initial', 
                            cursor: 'pointer'
                        }}
                    >
                        <Phone size={18} />
                    </a>
                </div>
            </div>

            {/* Responsive Consultation Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-[9999] px-4 font-inter">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: 15 }}
                            className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100"
                        >
                            {/* Branded Header with dynamic background based on active tab */}
                            <div 
                                className="py-5 px-8 text-white text-center relative transition-colors duration-300"
                                style={{ background: activeColor }}
                            >
                                <h2 className="text-xl font-bold font-poppins">
                                    {activeTab === 'appointment' ? 'Book Appointment' : activeTab === 'second-opinion' ? 'Second Opinion' : 'Book Health Checkup'}
                                </h2>
                                <p className="text-white/80 text-[10px] font-bold uppercase tracking-[0.2em] mt-0.5">
                                    TX Hospitals Miyapur
                                </p>

                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-5 right-6 text-white/70 hover:text-white transition-colors"
                                >
                                    <IoClose size={22} />
                                </button>
                            </div>

                            {/* Modal Tabs inside the form for switching */}
                            <div className="flex bg-gray-100 p-1.5 m-6 mb-2 rounded-xl">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('appointment')}
                                    className="flex-1 py-2 text-xs font-semibold rounded-lg transition-all"
                                    style={{
                                        background: activeTab === 'appointment' ? 'rgb(189, 56, 92)' : 'transparent',
                                        color: activeTab === 'appointment' ? '#fff' : '#4b5563',
                                    }}
                                >
                                    Appointment
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('second-opinion')}
                                    className="flex-1 py-2 text-xs font-semibold rounded-lg transition-all"
                                    style={{
                                        background: activeTab === 'second-opinion' ? 'rgb(124, 58, 237)' : 'transparent',
                                        color: activeTab === 'second-opinion' ? '#fff' : '#4b5563',
                                    }}
                                >
                                    Second Opinion
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('health-checkup')}
                                    className="flex-1 py-2 text-xs font-semibold rounded-lg transition-all"
                                    style={{
                                        background: activeTab === 'health-checkup' ? 'rgb(5, 150, 105)' : 'transparent',
                                        color: activeTab === 'health-checkup' ? '#fff' : '#4b5563',
                                    }}
                                >
                                    Health Checkup
                                </button>
                            </div>

                            {/* Form Body */}
                            <div className="p-6 pt-2">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Patient Name */}
                                    <div className="space-y-1 relative">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Patient Name</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-[16px] h-[16px]" />
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Full Name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-900 focus:ring-4 focus:ring-opacity-20 outline-none transition-all text-sm font-semibold"
                                            />
                                        </div>
                                    </div>

                                    {/* Mobile Number */}
                                    <div className="space-y-1 relative">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Mobile Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-[16px] h-[16px]" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="Enter Phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-900 focus:ring-4 focus:ring-opacity-20 outline-none transition-all text-sm font-semibold"
                                            />
                                        </div>
                                    </div>

                                    {/* Select Doctor / Specialty */}
                                    <div className="space-y-1 relative">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Specialty / Doctor</label>
                                        <div className="relative">
                                            <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-[16px] h-[16px]" />
                                            <select
                                                name="speciality"
                                                required
                                                value={formData.speciality}
                                                onChange={handleChange}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-8 text-gray-950 focus:ring-4 focus:ring-opacity-20 outline-none transition-all text-sm font-semibold appearance-none cursor-pointer"
                                            >
                                                <option value="" disabled style={{ color: 'rgb(150, 150, 150)' }}>Select Doctor / Specialty</option>
                                                <option value="Dr. Akhila Sunder – Orthopaedics" style={{ color: 'rgb(30, 30, 30)' }}>Dr. Akhila Sunder – Orthopaedics</option>
                                                <option value="Dr. K Arun Kumar – Cardiology" style={{ color: 'rgb(30, 30, 30)' }}>Dr. K Arun Kumar – Cardiology</option>
                                                <option value="Dr. Prasad Neelam – Surgical Gastroenterology" style={{ color: 'rgb(30, 30, 30)' }}>Dr. Prasad Neelam – Surgical Gastroenterology</option>
                                                <option value="General Medicine" style={{ color: 'rgb(30, 30, 30)' }}>General Medicine</option>
                                                <option value="Neurology" style={{ color: 'rgb(30, 30, 30)' }}>Neurology</option>
                                                <option value="Gastroenterology" style={{ color: 'rgb(30, 30, 30)' }}>Gastroenterology</option>
                                                <option value="Pulmonology" style={{ color: 'rgb(30, 30, 30)' }}>Pulmonology</option>
                                                <option value="ENT" style={{ color: 'rgb(30, 30, 30)' }}>ENT</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Date */}
                                    <div className="space-y-1 relative">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Preferred Date</label>
                                        <div className="relative">
                                            <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-[16px] h-[16px]" />
                                            <input
                                                type="date"
                                                name="date"
                                                required
                                                value={formData.date}
                                                onChange={handleChange}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-900 focus:ring-4 focus:ring-opacity-20 outline-none transition-all text-sm font-semibold"
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full text-white font-bold py-3.5 rounded-xl shadow-lg transition-all active:scale-98 text-xs uppercase tracking-[0.2em] mt-2 flex items-center justify-center hover:opacity-90"
                                        style={{ backgroundColor: activeColor }}
                                    >
                                        {loading ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                <span>Processing...</span>
                                            </div>
                                        ) : (
                                            activeTab === 'appointment' ? 'Confirm Appointment' : activeTab === 'second-opinion' ? 'Request Second Opinion' : 'Book Health Checkup'
                                        )}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MiyapurFloatingBar;
