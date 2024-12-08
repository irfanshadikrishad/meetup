
import React, { useState } from "react";
import Link from "next/link";

const Guests = () => {
    // Static list of slots
    const slots = [
        {
            id: "1",
            host: "John Doe",
            date: "2024-12-15",
            timeLimit: 60,
            userLimit: 10,
        },
        {
            id: "2",
            host: "Jane Smith",
            date: "2024-12-20",
            timeLimit: 45,
            userLimit: 5,
        },
        {
            id: "3",
            host: "Emily White",
            date: "2024-12-22",
            timeLimit: 90,
            userLimit: 20,
        },
    ];

    // State for search query and filtered slots
    const [query, setQuery] = useState("");
    const [filteredSlots, setFilteredSlots] = useState(slots);

    // Handle search input change
    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);

        // Filter slots based on the query
        const filtered = slots.filter((slot) =>
            slot.id.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredSlots(filtered);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-4 text-center">Available Booking Slots</h1>

            {/* Search Bar */}
            <div className="mb-6">
                <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Search slot by ID..."
                    className="w-full md:w-1/2 mx-auto block px-3 py-2 border rounded-md shadow-sm"
                />
            </div>

            {/* Slots Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSlots.length > 0 ? (
                    filteredSlots.map((slot) => (
                        <div key={slot.id} className="p-4 bg-white shadow-md rounded-md border">
                            <h2 className="text-xl font-semibold mb-2">Host: {slot.host}</h2>
                            <p className="text-gray-700">
                                <strong>Date:</strong> {slot.date}
                            </p>
                            <p className="text-gray-700">
                                <strong>Time Limit:</strong> {slot.timeLimit} min
                            </p>
                            <p className="text-gray-700">
                                <strong>User Limit:</strong> {slot.userLimit}
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
                        No slots found for ID {query}.
                    </p>
                )}
            </div>

        </div>
    );
};

export default Guests;

