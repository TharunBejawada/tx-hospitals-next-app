import React, { useState, useEffect } from "react";
import axios from "axios";
import HealthCalendarHero from "./HealthCalendarHero";
import HealthCalendarMonthByMonth from "./HealthCalendarMonthByMonth";
import WhyHealthDaysImportant from "./WhyHealthDaysImportant";
import HealthAwarenessCallToAction from "./HealthAwarenessCallToAction";
import BookAppointmentForm from "@/components/Blogs/BookAppointemntForm";

export default function HealthAwarenessCalendar() {
    const currentYear = new Date().getFullYear().toString();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const yearToFetch = currentYear || "2026";
                const response = await axios.get(
                    `https://api.txhospitals.vgworld.in/getHealthDayEvents/${yearToFetch}`
                );
                if (response.data) {
                    setEvents(response.data);
                }
            } catch (err) {
                console.error("Error fetching health day events:", err);
                setError("Failed to load health calendar data.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [currentYear]);

    const handleExploreClick = () => {
        const calendarEl = document.getElementById("calendar-events-section");
        if (calendarEl) {
            calendarEl.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <main className="w-full min-h-screen bg-white">
            {/* Section 1: Hero Section */}
            <HealthCalendarHero
                year={currentYear || "2026"}
                onExploreClick={handleExploreClick}
                onBookClick={() => setShowModal(true)}
            />

            {/* Section 2: Month by Month Calendar */}
            <div id="calendar-events-section" className="w-full">
                <HealthCalendarMonthByMonth events={events} year={currentYear || "2026"} />
            </div>

            {/* Section 3: Why Are World Health Days Important? */}
            <WhyHealthDaysImportant />

            {/* Section 4: Call To Action Banner */}
            <HealthAwarenessCallToAction onBookClick={() => setShowModal(true)} />

            {/* Book Appointment / Health Check-up Modal */}
            <BookAppointmentForm showModal={showModal} setShowModal={setShowModal} />
        </main>
    );
}
