import useIsMobile from "@/hooks/useIsMobile";

const travelOptions = [
    "Plan your Trip",
    "Visa & Travel Assistance",
    "Hotel & Meals Assistance",
    "Relationship Manager",
    "Contact",
];

export default function PlanYourTrip() {

    const isMobile = useIsMobile();

    return (
        <>
            {isMobile ? (
                <>
                    <section className="py-3 px-6 bg-white">
                        <h2 className="text-3xl font-semibold font-inter text-center text-pink-800 mb-4">
                            Plan Your Travel
                        </h2>

                        <div className="grid grid-cols-2 gap-2 mb-4">
                            {travelOptions.map((option, index) => (
                                <button
                                    key={index}
                                    className="bg-pink-700 font-inter text-white px-2 py-1 rounded-xl font-medium transition duration-300 ease-in-out hover:bg-pink-700 hover:scale-105 hover:shadow-lg"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>

                        <p className="max-w-2xl font-inter text-base mx-auto text-left text-gray-800 leading-relaxed">
                            At TX Hospitals, we understand the unique needs of our international patients, and our dedicated International Patient Services
                            team is here to assist you every step of the way. Whether you’re seeking a second medical opinion or planning your treatment in India,
                            our team connects you with the best doctors tailored to your specific condition. We go the extra mile by providing essential details
                            such as cost estimates for medical procedures in India, visa requirements, and the expected duration of your hospital stay.
                            Our commitment to personalized care ensures that we optimize resources to deliver the highest quality healthcare, making your
                            medical journey a seamless and well-informed experience.
                        </p>
                    </section>
                    <div className="flex justify-center">
                        <img loading="lazy"
                            src="/assets/International_Patients/Animation.gif"
                            alt="Travel Assistance"
                            className="rounded-xl shadow-lg w-full max-w-3xl"
                        />
                    </div>
                </>
            ) : (
                <>
                    <section className="py-8 sm:py-10 px-6 sm:px-12 bg-white">
                        <h2 className="text-4xl font-semibold font-inter text-center text-pink-800 mb-5">
                            Plan Your Travel
                        </h2>

                        <div className="flex flex-wrap justify-center gap-3.5 mb-6">
                            {travelOptions.map((option, index) => (
                                <button
                                    key={index}
                                    className="bg-pink-700 font-inter text-white px-6 py-3 rounded-xl font-medium transition duration-300 ease-in-out hover:bg-pink-700 hover:scale-105 hover:shadow-lg"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>

                        <p className="max-w-5xl font-inter mx-auto text-center text-gray-800 text-base leading-relaxed">
                            At TX Hospitals, we understand the unique needs of our international patients, and our dedicated International Patient Services
                            team is here to assist you every step of the way. Whether you’re seeking a second medical opinion or planning your treatment in India,
                            our team connects you with the best doctors tailored to your specific condition. We go the extra mile by providing essential details
                            such as cost estimates for medical procedures in India, visa requirements, and the expected duration of your hospital stay.
                            Our commitment to personalized care ensures that we optimize resources to deliver the highest quality healthcare, making your
                            medical journey a seamless and well-informed experience.
                        </p>
                    </section>
                    <div className="flex justify-center">
                        <img loading="lazy"
                            src="/assets/International_Patients/Animation.gif"
                            alt="Travel Assistance"
                            className="rounded-xl shadow-lg w-full max-w-3xl"
                        />
                    </div>
                </>
            )}
        </>
    );
}