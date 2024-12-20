import React, { useEffect, useState } from "react";
import Link from "next/link";

const Guests = () => {
    const [slots, setSlots] = useState([]);
    const [query, setQuery] = useState(""); // State for search input
    const [filteredSlots, setFilteredSlots] = useState([]); // State for filtered slots

    // Fetch slots from the API
    async function getSlots() {
        try {
            const request = await fetch(`/api/slot/all`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const response = await request.json();
            if (request.status === 200) {
                setSlots(response);
                setFilteredSlots(response); // Initialize filtered slots
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Update filtered slots whenever the query changes
    useEffect(() => {
        const filtered = slots.filter((slot) =>
            slot.id.toString().includes(query.trim()) // Ensure search matches slot ID
        );
        setFilteredSlots(filtered);
    }, [query, slots]);

    useEffect(() => {
        getSlots();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-4 text-center">Available Booking Slots</h1>

            {/* Search Bar */}
            <div className="mb-6">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search slot by ID..."
                    className="w-full md:w-1/2 mx-auto block px-3 py-2 border rounded-md shadow-sm"
                />
            </div>

            {/* Slots Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSlots.length > 0 ? (
                    filteredSlots.map((slot) => (
                        <div key={slot.id} className="p-4 bg-white shadow-md rounded-md border">
                            <h2 className="text-xl font-semibold mb-2">Host: {slot.name}</h2>
                            <p className="text-gray-700">
                                <strong>Date:</strong> {slot.date}
                            </p>
                            <p className="text-gray-700">
                                <strong>Time Limit:</strong> {slot.time_limit} min
                            </p>
                            <p className="text-gray-700">
                                <strong>User Limit:</strong> {slot.user_limit}
                            </p>
                            {/* Display Slot ID */}
                            <p className="text-gray-700">
                                <strong>Slot ID:</strong> {slot.id}
                            </p>
                            <Link href={`/slot/${slot.id}`}>
                                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md">
                                    Book Slot
                                </button>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-full">
                        No slots found
                    </p>
                )}
            </div>
        </div>
    );
};

export default Guests;
