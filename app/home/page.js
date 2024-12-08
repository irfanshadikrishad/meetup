"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../../store/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "../../components/Container";
import { MdDelete } from "react-icons/md";
import Guests from "../../components/Guests";

const Page = () => {
    const { user, authenticate } = useAuth();
    const [slots, setSlots] = useState([]);
    const [formData, setFormData] = useState({
        host_id: "",
        slotDate: "",
        slotTimeLimit: "",
        slotUserLimit: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !user.id) {
            toast.error("User is not authenticated.");
            return;
        }

        try {
            const response = await fetch(`/api/slot`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    host_id: user.id,
                    name: user.name,
                    slotDate: formData.slotDate,
                    slotTimeLimit: formData.slotTimeLimit,
                    slotUserLimit: formData.slotUserLimit,
                }),
            });

            if (response.status === 200) {
                toast.success("Slot created successfully.");
                getUsersSlots();
            } else {
                const error = await response.json();
                toast.error(error.message || "Failed to create slot.");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while creating the slot.");
        }
    };

    const getUsersSlots = async () => {
        if (!user?.id) return;

        try {
            const response = await fetch(`/api/slot/user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: user.id }),
            });

            if (response.status === 200) {
                const data = await response.json();
                setSlots(data);
            } else {
                const error = await response.json();
                toast.error(error.message || "Failed to fetch slots.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteSlot = async (slotID) => {
        try {

            const response = await fetch(`/api/slot`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: slotID }),
            });

            if (response.status === 200) {
                toast.success(`Slot ${slotID} deleted successfully.`);
                getUsersSlots();
            } else {
                const error = await response.json();
                toast.error(error.message || "Failed to delete slot.");
            }
        } catch (error) {
            console.error(error);

        }
    };

    useEffect(() => {
        if (user) {
            getUsersSlots();
        } else {
            authenticate();
        }
    }, [user, authenticate]);

    if (!user || !user.role) {
        return <div className="flex justify-center items-center my-9"><span className="loading loading-spinner loading-lg"></span></div>;
    }

    return (
        <Container>
            {user.role === "host" ? (
                <div className="bg-[#ffffff] my-10">
                    <div className="flex flex-col gap-6 md:flex-row w-full">
                        {/* Host Slots List */}
                        <div className="w-full md:w-1/2">
                            {slots.length > 0 ? (
                                slots.map((slot, idx) => (
                                    <div
                                        key={idx}
                                        className="w-full rounded-[5px] bg-secondary h-[200px] text-black p-6 mb-4"
                                    >
                                        <p className="text-[18px] font-bold">Host Name: {slot.name}</p>
                                        <p className="text-[18px] font-bold">Event Date: {slot.date}</p>
                                        <p className="text-[18px] font-bold">Time Limit: {slot.time_limit} min</p>
                                        <p className="text-[18px] font-semibold">Event ID: {slot.id}</p>
                                        <div className="flex items-center justify-between mt-2">
                                            <Link href={`/slot/${slot.id}`}>
                                                <button className="p-2 bg-[#A594F9] text-black font-bold rounded-[5px]">
                                                    View Details
                                                </button>
                                            </Link>
                                            <button onClick={() => deleteSlot(slot.id)}>
                                                <MdDelete className="text-[28px] text-[#ff2f2f]" />
                                            </button>

                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No slots created yet.</p>
                            )}
                        </div>

                        {/* Create Slot Form */}
                        <div className="w-full h-[700px] md:w-1/2 p-6 bg-gray-100 rounded-md">
                            <h1 className="text-4xl font-bold mb-4">Create a Slot</h1>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <input
                                    type="text"
                                    value={user.name}
                                    disabled
                                    className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900"
                                />
                                <input
                                    type="date"
                                    name="slotDate"
                                    value={formData.slotDate}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                                <input
                                    type="number"
                                    name="slotTimeLimit"
                                    value={formData.slotTimeLimit}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Time Limit (min)"
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                                <input
                                    type="number"
                                    name="slotUserLimit"
                                    value={formData.slotUserLimit}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="User Limit"
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                                <button type="submit" className="bg-blue-500 w-full text-white py-2 px-4 rounded-md">
                                    Create Slot
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

            ) : (
                <Guests />
            )}
            <ToastContainer />
        </Container>

    );
};

export default Page;
