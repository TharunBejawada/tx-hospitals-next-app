import { FaWhatsapp, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { MdOutlineEmail } from "react-icons/md";
import { PiDeviceMobileThin } from "react-icons/pi";
import { GrMapLocation } from "react-icons/gr";
import { FaSquareWhatsapp, FaXTwitter } from "react-icons/fa6";
import Image from 'next/image';

const aboutLinks = [
    { label: "Chairman’s Message", path: "#" },
    { label: "Overview", path: "/about-us/" },
    { label: "Board of Directors", path: "/board-of-directors/" },
    { label: "Managements", path: "/management/" },
    { label: "International Patient", path: "/why-tx-hospitals/" },
    { label: "Why Choose Us", path: "/contact-us/" },
    { label: "FAQ’s", path: "/faqs/" },
    { label: "Contact Us ", path: "#" },
];

const specialtiesLinks = [
    { label: "Cardiology", path: "/specialities/cardiac-sciences/" },
    { label: "Gastroenterology", path: "/specialities/urology/" },
    { label: "Neurology", path: "/specialities/nephrology/" },
    { label: "Robotics", path: "/specialities/gastro-sciences/" },
    { label: "Transplant", path: "/specialities/neuro-sciences/" },
    { label: "Nephrology", path: "/specialities/oncology/" },
    { label: "Urology", path: "/specialities/robotics-science/" },
    { label: "Orthopaedics", path: "/specialities/transplant-medicine/" },
    { label: "Mother & Child Care", path: "/specialities/orthopaedics/" },
    { label: "Oncology", path: "/specialities/internal-medicine/" },
    { label: "Internal Medicine", path: "/specialities/mother-child-care/" },
    { label: "Pulmonology", path: "/specialities/ent/" },
    { label: "ENT", path: "/specialities/pulmonology/" },
    { label: "Skin & Cosmetic care", path: "/specialities/dermatology-cosmetic-care/" },
    { label: "Dental & Maxillofacial", path: "/specialities/dental-and-maxillofacial-care/" },
    { label: "EYE/ Opthalmology", path: "/specialities/eye-ophthalmology/" },
    { label: "Anaesthesia & Pain management", path: "/specialities/rheumatology/" }
];

const specialistLinks = [
    { label: "Cardiologist", path: "/specialities/cardiac-sciences/" },
    { label: "Neurologists", path: "/specialities/urology/" },
    { label: "Gastroenterologists", path: "/specialities/nephrology/" },
    { label: "Orthopaedic Doctors", path: "/specialities/gastro-sciences/" },
    { label: "Urologists", path: "/specialities/neuro-sciences/" },
    { label: "Nephrologists", path: "/specialities/oncology/" },
    { label: "General Surgeons", path: "/specialities/orthopaedics/" },
    { label: "Oncologists", path: "/specialities/internal-medicine/" },
    { label: "Paediatricians", path: "/specialities/mother-child-care/" },
    { label: "Pulmonologists", path: "/specialities/ent/" },
    { label: "Gynaecologists", path: "/specialities/pulmonology/" },
    { label: "ENT Specialists", path: "/specialities/dermatology-cosmetic-care/" },
    { label: "Vascular Surgeons", path: "/specialities/dental-and-maxillofacial-care/" },
    { label: "Ophthalmologists", path: "/specialities/eye-ophthalmology/" },
    { label: "Dentists", path: "/specialities/rheumatology/" },
    { label: "Dermatologists", path: "/specialities/anaesthesia-and-pain-management/" },
    { label: "General Physicians", path: "/specialities/endocrinology/" },
    { label: "Rheumatologists", path: "/specialities/endocrinology/" },
];

const healthConditions = [
    { label: "Acid Reflux" },
    { label: "Arrhythmias" },
    { label: "Angina" },
    { label: "Atrial Fibrillation" },
    { label: "Brain tumors" },
    { label: "Benign Prostatic Hyperplasia" },
    { label: "Coronary Artery Disease" },
    { label: "Cardiomyopathy" },
    { label: "Deep Vein Thrombosis" },
    { label: "Dementia" },
];

const treatmentAndProcedures = [
    { label: "ACL reconstruction surgery" },
    { label: "ASD Closure" },
    { label: "Aneurysm Clipping" },
    { label: "Adenoidectomy" },
    { label: "Bariatric Surgery" },
    { label: "Brain Tumor" },
    { label: "Carpal Tunnel Release surgery" },
    { label: "Coronary Artery Bypass Grafting (CABG)" },
    { label: "Diabetic Foot Surgery" },
    { label: "Endometrial Ablation" },
    { label: "ERCP" },
];

const diagnosticGuide = [
    { label: "Coronary Angiography" },
    { label: "Colonoscopy" },
    { label: "CT Scan" },
    { label: "Electrocardiogram (ECG)" },
    { label: "Endoscopy" },
    { label: "Magnetic Resonance Imaging (MRI)" },
    { label: "Ultrasound" },
    { label: "Pulmonary Function Test (PFT)" },
    { label: "Liver Function Tests (LFT)" },
    { label: "Complete Blood Count (CBC)" },
];

const medicineGuide = [
    { label: "Aceclofenac" },
    { label: "Abacavir" },
    { label: "Acetaminophen" },
    { label: "Baclofen" },
    { label: "Betamethasone" },
    { label: "Budesonide" },
    { label: "Carvedilol" },
    { label: "Carbidopa" },
    { label: "Deflazacort" },
    { label: "Diclofenac" },
    { label: "Dexamethasone" },
];

const symptomsGuide = [
    { label: "Abdominal Pain" },
    { label: "Abnormal bleeding" },
    { label: "Back pain" },
    { label: "Bleeding gums" },
    { label: "Blurred vision" },
    { label: "Chest pain" },
    { label: "Confusion" },
    { label: "Cough" },
    { label: "Diarrhoea" },
    { label: "Dehydration" },
];

const secondOpinion = [
    { label: "Arthroscopic Joint Surgery" },
    { label: "Brain tumor surgery" },
    { label: "Breast Augmentation" },
    { label: "Cerebral Aneurysm" },
    { label: "Coronary Artery Bypass Grafting" },
    { label: "Fistula surgery" },
    { label: "Hernia" },
    { label: "Hysterectomy" },
    { label: "Knee Replacement" },
    { label: "Rhinoplasty surgery" },
];

const healthPackages = [
    { label: "Whole Body Checkup" },
    { label: "Executive Health Checkup – Pro" },
    { label: "Master Health Checkup" },
    { label: "Lifestyle Screen Quick Checkup" },
    { label: "General Quick Checkup" },
    { label: "Cardiac Health Checkup" },
    { label: "Gastro Health Checkup" },
    { label: "Kidney Health Checkup" },
    { label: "Lungs Health Checkup" },
];

export default function Footer() {
    return (
        <footer className="bg-pink-50 py-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-6 gap-1">
                {/* Get in Touch */}
                <div>
                    <h3 className="text-gray-800 font-semibold mb-6">Get in Touch</h3>
                    <div className="flex items-center space-x-3 mb-4">
                        <MdOutlineEmail className="text-gray-800" size={42} />
                        <span>contact@txhospitals.in</span>
                    </div>
                    <div className="flex flex-col space-y-1 mb-4">
                        <div className="flex items-center space-x-3">
                            <PiDeviceMobileThin className="text-gray-800" size={42} />
                            <span>+91 9144514459</span>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3 mb-6">
                        <GrMapLocation className="mt-1 text-gray-800" size={92} />
                        <div>
                            <span># 2-6-71, Bharath Nagar Colony, Near Masjid Uppal, Hyderabad, Telangana, 500039 India</span>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3 mb-6">
                        <GrMapLocation className="mt-1 text-gray-800" size={92} />
                        <div>
                            <span># 3-2-841/1, Kachiguda Station Rd, Mahalaxmi Nilayam, Kachiguda, Hyderabad, Telangana 500027</span>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3 mb-6">
                        <GrMapLocation className="mt-1 text-gray-800" size={92} />
                        <div>
                            <span># 8-2-680, Raichandani Construction, no:12, B Road, Sri Ram Nagar Colony, Banjara Hills, Hyderabad, Telangana 500028</span>
                        </div>
                    </div>
                    <div className="flex space-x-3 mt-4">
                        <a href="https://wa.me/919144514459" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-[#25D366] hover:text-white text-[#25D366] transition-all duration-300 transform hover:scale-110">
                            <FaWhatsapp size={20} />
                        </a>
                        <a href="https://www.facebook.com/txhospitals" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-[#1877F2] hover:text-white text-[#1877F2] transition-all duration-300 transform hover:scale-110">
                            <FaFacebookF size={20} />
                        </a>
                        <a href="https://www.instagram.com/txhospitals/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-[#E4405F] hover:text-white text-[#E4405F] transition-all duration-300 transform hover:scale-110">
                            <FaInstagram size={20} />
                        </a>
                        <a href="https://www.linkedin.com/company/tx-hospitals/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-[#0A66C2] hover:text-white text-[#0A66C2] transition-all duration-300 transform hover:scale-110">
                            <FaLinkedinIn size={20} />
                        </a>
                        <a href="https://x.com/txhospitals" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-black hover:text-white text-black transition-all duration-300 transform hover:scale-110">
                            <FaXTwitter size={20} />
                        </a>
                        <a href="https://www.youtube.com/@txhospitalsofficial" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-[#FF0000] hover:text-white text-[#FF0000] transition-all duration-300 transform hover:scale-110">
                            <FaYoutube size={20} />
                        </a>
                    </div>
                </div>

                <div>
                    <h4 className="text-gray-800 font-medium mt-2 mb-2">ABOUT</h4>
                    <ul className="space-y-2 text-gray-700">
                        {aboutLinks.map((link, idx) => (
                            <li
                                key={idx}
                                onClick={() => link.path !== "#" && navigate(link.path)}
                                className={`flex items-center cursor-pointer hover:text-pink-600`}
                            >
                                {link.label}
                            </li>
                        ))}
                    </ul>
                    <button className="mt-11 text-sm bg-gray-600 hover:bg-gray-700 px-2 py-1 flex items-center space-x-2 text-white font-semibold">
                        <span>POPULAR SEARCHES</span>
                        <span className="text-xl font-bold text-black bg-white border border-white rounded pb-1 px-2">+</span>
                    </button>
                </div>

                <div>
                    <h3 className="text-gray-800 font-semibold mb-3">SPECIALTIES</h3>
                    <ul className="space-y-2 text-gray-600">
                        {specialtiesLinks.map((item, idx) => (
                            <li
                                key={idx}

                                className="flex items-center hover:text-pink-600 cursor-pointer"
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>

                    <h4 className="text-gray-800 font-medium mt-2 mb-2">Doctors</h4>
                    <ul className="space-y-2 text-gray-700">
                        {specialistLinks.map((item, idx) => (
                            <li
                                key={`doctor-${idx}`}
                                onClick={() => navigate(`${item.path}/our-clinical-team/`)}
                                className="flex items-center hover:text-pink-600 cursor-pointer"
                            >
                                {item.label} in Hyderabad
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-gray-900 font-semibold mb-2">LIBRARY</h3>
                    <h4 className="text-gray-800 font-semibold mb-1">Health Conditions</h4>
                    <ul className="space-y-2 text-gray-600">
                        {healthConditions.map((item, idx) => (
                            <li
                                key={idx}
                                className="flex items-center hover:text-pink-600 cursor-pointer"
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>

                    <h4 className="text-gray-800 font-medium mt-2 mb-2">Treatments & Procedures</h4>
                    <ul className="space-y-2 text-gray-700">
                        {treatmentAndProcedures.map((item, idx) => (
                            <li
                                key={`doctor-${idx}`}
                                onClick={() => navigate(`${item.path}/our-clinical-team/`)}
                                className="flex items-center hover:text-pink-600 cursor-pointer"
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>
                    <h4 className="text-gray-800 font-medium mt-2 mb-2">Diagnostics Guide </h4>
                    <ul className="space-y-2 text-gray-700">
                        {diagnosticGuide.map((item, idx) => (
                            <li
                                key={`doctor-${idx}`}
                                onClick={() => navigate(`${item.path}/our-clinical-team/`)}
                                className="flex items-center hover:text-pink-600 cursor-pointer"
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-gray-800 font-medium mt-2 mb-2">Medicine Guide</h3>
                    <ul className="space-y-2 text-gray-700">
                        {medicineGuide.map((link, idx) => (
                            <li
                                key={idx}
                                onClick={() => link.path !== "#" && navigate(link.path)}
                                className={`flex items-center cursor-pointer hover:text-pink-600`}
                            >
                                {link.label}
                            </li>
                        ))}
                    </ul>
                    <h3 className="text-gray-800 font-medium mt-2 mb-2">Symptoms Guide</h3>
                    <ul className="space-y-2 text-gray-700">
                        {symptomsGuide.map((link, idx) => (
                            <li
                                key={idx}
                                onClick={() => link.path !== "#" && navigate(link.path)}
                                className={`flex items-center cursor-pointer hover:text-pink-600`}
                            >
                                {link.label}
                            </li>
                        ))}
                    </ul>
                    <h3 className="text-gray-800 font-medium mt-2 mb-2">Second Opinion</h3>
                    <ul className="space-y-2 text-gray-700">
                        {secondOpinion.map((link, idx) => (
                            <li
                                key={idx}
                                onClick={() => link.path !== "#" && navigate(link.path)}
                                className={`flex items-center cursor-pointer hover:text-pink-600`}
                            >
                                {link.label}
                            </li>
                        ))}
                    </ul>
                    <h3 className="text-gray-800 font-medium mt-2 mb-2">Health Packages</h3>
                    <ul className="space-y-2 text-gray-700">
                        {healthPackages.map((link, idx) => (
                            <li
                                key={idx}
                                onClick={() => link.path !== "#" && navigate(link.path)}
                                className={`flex items-center cursor-pointer hover:text-pink-600`}
                            >
                                {link.label}
                            </li>
                        ))}
                    </ul>
                    <h3 className="text-gray-800 font-medium mt-2 mb-2">News & Media</h3>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-6">Enquiry Form</h3>
                    <form className="flex flex-col space-y-5 text-gray-400">
                        <input
                            type="text"
                            placeholder="Name"
                            className="bg-transparent border-b border-gray-600 focus:outline-none focus:border-pink-600 py-1"
                        />
                        <input
                            type="tel"
                            placeholder="Phone"
                            className="bg-transparent border-b border-gray-600 focus:outline-none focus:border-pink-600 py-1"
                        />
                        <textarea
                            rows="3"
                            placeholder="Message"
                            className="bg-transparent border-b border-gray-600 focus:outline-none focus:border-pink-600 py-1 resize-none"
                        />
                        <button
                            type="submit"
                            className="bg-pink-700 hover:bg-pink-800 text-white font-bold py-2 px-6 rounded-full w-max self-start"
                        >
                            SUBMIT
                        </button>
                    </form>
                </div>
            </div>

            <style jsx>{`
        .clip-triangle-right {
          clip-path: polygon(0 0, 100% 50%, 0 100%);
        }
      `}</style>
        </footer>
    );
}
