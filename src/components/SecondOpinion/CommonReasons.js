import useIsMobile from "@/hooks/useIsMobile";
import { useState } from "react";
import BookAppointmentForm from "@/components/Blogs/BookAppointemntForm";

export default function CommonReasons({ data }) {

    const isMobile = useIsMobile();
    const { heading, topDescription, names, bottomDescription } = data;
    const [showModal, setShowModal] = useState(false);

    const handleCall = () => {
        window.location.href = "tel:+919144514459";
    };

    return (
        <>
            {isMobile ? (
                <section className="w-full text-center bg-[#FBECEE] px-2 py-2">
                    <h2 className="text-xl font-bold text-pink-700 mb-1">
                        {heading}
                    </h2>
                    <div
                        className="text-sm text-gray-800 mb-2"
                        dangerouslySetInnerHTML={{ __html: topDescription }}
                    />
                    <div className="grid grid-cols-2 gap-2 mb-6">
                        {names.map((item, index) => (
                            <div
                                key={index}
                                className="bg-[#EEDADD] rounded-2xl px-6 py-4 text-gray-900 font-medium text-center text-xs shadow-sm"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                    <div
                        className="text-xs text-gray-800 mb-5"
                        dangerouslySetInnerHTML={{ __html: bottomDescription }}
                    />
                    <div className="flex justify-center items-center gap-2 mb-2">
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-pink-700 text-xs hover:bg-pink-800 text-white font-semibold px-2 py-1 rounded-full transition"
                        >
                            Book Appointment
                        </button>
                        <a href="tel:+919144514459">
                            <button
                                onClick={handleCall}
                                className="border border-pink-700 text-pink-700 hover:bg-pink-700 hover:text-white text-xs font-semibold px-2 py-1 rounded-full transition"
                            >
                                Talk to our Experts
                            </button>
                        </a>
                    </div>
                </section>
            ) : (
                <section className="w-full bg-[#FBECEE] py-2">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-pink-700 mb-3">
                            {heading}
                        </h2>
                        <div
                            className="text-xl text-gray-800 mb-5"
                            dangerouslySetInnerHTML={{ __html: topDescription }}
                        />
                        <div className="grid grid-cols-3 gap-5 max-w-5xl mx-auto mb-6">
                            {names.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-[#EEDADD] rounded-2xl px-6 py-4 text-gray-900 font-medium text-center shadow-sm"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                        <div
                            className="text-xl text-gray-800 mb-5"
                            dangerouslySetInnerHTML={{ __html: bottomDescription }}
                        />
                    </div>
                    <div className="flex justify-center items-center gap-12 mb-4">
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-pink-700 hover:bg-pink-800 text-white text-xl font-semibold px-8 py-3 rounded-full transition"
                        >
                            Book Appointment
                        </button>
                        <a href="tel:+919144514459">
                            <button
                                onClick={handleCall}
                                className="border-2 border-pink-700 text-pink-700 hover:bg-pink-700 hover:text-white text-xl font-semibold px-8 py-3 rounded-full transition"
                            >
                                Talk to our Experts
                            </button>
                        </a>
                    </div>
                </section>
            )}
            <BookAppointmentForm showModal={showModal} setShowModal={setShowModal} />
        </>
    );
}
