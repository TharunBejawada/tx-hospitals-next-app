"use client";
import Image from "next/image";

export default function BoardOfDirectors() {

    const directors = [
        {
            id: "director-0",
            name: "Dr. Keerthikar Reddy",
            qualification: "MS Ortho, MCH ORTHO (UK)",
            designation: "Consultant Orthopaedic Surgeon",
            image: "/assets/Board_of_Directors/Dr. Keerthikar Reddy.webp",
            description: `Dr. Keerthikar Reddy is a distinguished Orthopaedic surgeon
 with over a decade of experience in the field. His expertise spans 
Arthroscopic Surgery, Trauma Care and Sports Medicine. 
Known for his exceptional clinical proficiency, He is recognized 
as a visionary leader in healthcare management. He combines 
his extensive surgical skills with strong management acumen to 
enhance both patient care and operational efficiency. As a key 
figure in the healthcare sector, he is committed to delivering 
innovative solutions and ensuring the highest standards of 
treatment for his patients.`,
        },
        {
            id: "director-1",
            name: "Dr. Deepak Raju",
            qualification: "MBBS, MS – General Surgery",
            designation: "",
            image: "/assets/Board_of_Directors/Dr. Deepak Raju.webp",
            description: `Dr. Deepak Raju is a dynamic and highly skilled surgeon with a 
decade of clinical experience and surgical expertise. His proficiency 
extends beyond surgery, as he also excels in strategic planning, 
implementation and hospital management. As a visionary leader, 
he is known for his ability to guide healthcare organizations toward 
operational excellence while maintaining high standards of patient 
care. With his blend of medical acumen and leadership skills, he 
plays a pivotal role in shaping the future of healthcare delivery at 
TX Hospitals.`,
        },
        {
            id: "director-2",
            name: " Mr. Raveendra Reddy Rami",
            qualification: "IIMC,MHA(OU)",
            designation: "Master’s Degree in Health Administration",
            image: "/assets/Board_of_Directors/Mr. Raveendra Reddy Rami.webp",
            description: `With over two decades of experience in healthcare administration,
 Mr. Raveendra Reddy Rami is a seasoned executive known for 
driving success through people-focused hospital management. 
He has a unique ability to balance strategic decision-making with 
financial discipline, adopting a hands-on leadership approach that 
results in high satisfaction levels among employees, patients and 
physicians. He is a skilled communicator and relationship builder 
with expertise in organizational planning, multimillion-dollar capital 
projects, contract negotiations and team development. His focus on
 growth and visibility has been integral to the expansion and success 
of TX Hospitals.`,
        },
    ];

    return (
        <section className="bg-[#f3f3f3] py-12">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-[#a32035] mb-8">
                    Board of Directors
                </h1>

                <div className="flex flex-col gap-8">
                    {directors.map((director, index) => (
                        <div
                            id={director.id}
                            key={index}
                            className="bg-white shadow-md rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8"
                        >
                            {/* Left: Image */}
                            <div className="w-full md:w-[40%] flex justify-center pb-8 md:pb-0">
                                <div className="relative w-56 h-56 md:w-64 md:h-64 flex items-center justify-center">
                                    <Image
                                        src="/assets/Board_of_Directors/Directors Back side Box B.webp"
                                        alt="Background"
                                        width={400}
                                        height={400}
                                        className="absolute w-full h-full object-contain mt-6 md:mt-10 rounded-xl"
                                    />
                                    <div className="relative z-10 md:-mb-1.5 mb-1.5 w-full h-full flex items-center justify-center">
                                        <Image
                                            src={director.image}
                                            alt={director.name}
                                            width={300}
                                            height={300}
                                            className="w-full h-full object-contain rounded-xl"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Right: Content */}
                            <div className="w-full md:w-[60%] text-left">
                                <h3 className="text-xl md:text-2xl font-bold text-[#a32035]">
                                    {director.name}
                                </h3>
                                <p className="text-base font-semibold mt-1">
                                    {director.qualification}
                                </p>
                                <p className="text-base font-semibold mt-1">
                                    {director.designation}
                                </p>
                                <p className="text-gray-700 mt-4 leading-relaxed text-sm md:text-base">
                                    {director.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
