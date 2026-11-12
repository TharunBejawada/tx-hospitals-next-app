import { FaPhoneAlt } from "react-icons/fa";

export default function ActionButtons({
    bookNowText = "Book Now",
    callNowText = "Call Now",
    onBookNow,
    showCallIcon = true,
    phoneNumber = "+919144514459",
}) {

    const handleCallNow = () => {
        window.location.href = `tel:${phoneNumber}`;
    };

    return (
        <div className="flex gap-4 mb-2 items-center">
            <button
                onClick={onBookNow}
                className="bg-pink-700 text-white font-semibold px-6 py-2 rounded-xl hover:bg-pink-800 transition"
            >
                {bookNowText}
            </button>
            <button
                onClick={handleCallNow}
                className="flex items-center gap-2 border border-pink-700 text-pink-700 font-semibold px-6 py-2 rounded-xl hover:bg-pink-50 transition"
            >
                {showCallIcon && <FaPhoneAlt className="text-sm" />}
                {callNowText}
            </button>
        </div>
    );
}
