"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import image from "../../app/Image/imagphone.png";
import Image from "next/image";
import { useAuth } from "../../store/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "../../components/Container";
import { MdDelete } from "react-icons/md";

const Page = () => {
    const { user, authenticate } = useAuth();
    const [slots, setSlots] = useState([])
    console.log(user);

    const [loggedInUser, setLoggedInUser] = useState({});
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
        console.log("Form Submitted:", formData);
        if (!user || !user.id) {
            console.log("User is not authenticated.");
            return; // Prevent submission if user is not authenticated
        }

        try {
            const request = await fetch(`/api/slot`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    host_id: user.id, // Ensure host_id is correctly sent
                    name: user.name, // Ensure name is passed correctly
                    slotDate: formData.slotDate,
                    slotTimeLimit: formData.slotTimeLimit,
                    slotUserLimit: formData.slotUserLimit,
                }),
            });

            const response = await request.json();
            console.log(response);

            if (request.status === 200) {
                toast.success(`Slot created successfully.`)
                getUsersSlots()
            } else {
                toast.error(`Error creating slot.`);
            }
        } catch (error) {
            console.log("Error during API call:", error);
            alert("An error occurred while creating the slot.");
        }
    };

    async function getUsersSlots() {
        try {
            if (user?.id) {
                const request = await fetch(`/api/slot/user`, {
                    method: "POST",
                    headers: { "Content-Type": "appliation/json" },
                    body: JSON.stringify({ id: user.id }),
                });
                const response = await request.json();
                if (request.status === 200) {
                    setSlots(response)
                } else {
                    console.log(response);
                    toast.error(response.error)
                }
            } else {
                console.log(`user id missed`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (user) {
            getUsersSlots();
            setLoggedInUser(user);
        } else {
            authenticate();
        }
    }, [user, authenticate]);

    // Conditional rendering based on the user role
    if (!user || !user.role) {
        return <div>Loading...</div>; // Render a loading state while user information is being fetched
    }


    console.log(user.role);
    console.log(slots);

    return user.role === "host" ? (
        <>

            <Container>


                <div className="bg-[#ffffff] my-10">
                    <div className="flex flex-col  gap-6 md:flex-row w-full   ">
                        {/* Image Section */}
                        <div className="w-full md:w-1/2 ">
                            {/* Cards */}
                            <div style={{ display: "grid", gap: "5px" }}>
                                {slots.length > 0 && slots.map((slo, idx) => {
                                    return <div className="w-[full] rounded-[5px] bg-secondary h-[200px] text-black p-6" key={idx} >
                                        <p className="text-[18px] font-bold">Host Name: {slo.name}</p>
                                        <p className="text-[18px] font-bold">Event date: {slo.date}</p>
                                        <p className="text-[18px] font-bold">Event id: {slo.time_limit} min</p>

                                        <p className="text-[18px] font-semibold">Event id: {slo.id}</p>


                                        <div className="flex  items-center justify-between">

                                            <div>

                                                <button className="p-2 mt-2 bg-[#A594F9] text-black font-bold rounded-[5px]"> <Link href={`/slot/${slo.id}`}>View details</Link></button>

                                            </div>


                                            <div>
                                                <button>  <MdDelete className="text-[28px] text-[#ff2f2f]" /></button>
                                            </div>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="w-full md:w-1/2 flex flex-col h-[700px]  rounded-md sm:p-10 bg-gray-100 text-gray-900">
                            <div className="mb-8 text-center">
                                <h1 className="my-3 text-4xl font-bold">Create a Slot</h1>
                                <p className="text-sm text-gray-400">
                                    Fill in the details to create a slot.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Host Name */}
                                <div>
                                    <label htmlFor="hostName" className="block mb-2 text-sm">
                                        Host Name
                                    </label>
                                    <input
                                        type="text"
                                        name="hostName"
                                        value={loggedInUser && loggedInUser.name ? loggedInUser.name : ""}
                                        disabled
                                        required
                                        placeholder="Enter Host Name"
                                        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#41a6d4] bg-gray-200 text-gray-900"
                                    />
                                </div>

                                {/* Slot Date */}
                                <div>
                                    <label htmlFor="slotDate" className="block mb-2 text-sm">
                                        Slot Date
                                    </label>
                                    <input
                                        type="date"
                                        name="slotDate"
                                        value={formData.slotDate}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#41a6d4] bg-gray-200 text-gray-900"
                                    />
                                </div>

                                {/* Slot Time Limit */}
                                <div>
                                    <label htmlFor="slotTimeLimit" className="block mb-2 text-sm">
                                        Slot Time Limit (in minutes)
                                    </label>
                                    <input
                                        type="number"
                                        name="slotTimeLimit"
                                        value={formData.slotTimeLimit}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter Time Limit"
                                        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#41a6d4] bg-gray-200 text-gray-900"
                                    />
                                </div>

                                {/* Slot User Limit */}
                                <div>
                                    <label htmlFor="slotUserLimit" className="block mb-2 text-sm">
                                        Slot User Limit
                                    </label>
                                    <input
                                        type="number"
                                        name="slotUserLimit"
                                        value={formData.slotUserLimit}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter User Limit"
                                        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#41a6d4] bg-gray-200 text-gray-900"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="bg-[#41a6d4] hover:bg-[#4185a4] font-bold w-full rounded-[25px] py-2 text-white"
                                >
                                    Submit
                                </button>
                            </form>

                            <Link href="/">
                                <div className="flex justify-center mx-auto mt-[10px]">
                                    <button className="flex items-center justify-center w-1/2 px-5 py-1 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-5 h-5 rtl:rotate-180 text-rose-500"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                                            />
                                        </svg>
                                        <span>Go back</span>
                                    </button>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </Container>

        </>
    ) : (

        <div>You are not authorized to create a slot.</div>
    );
};

export default Page;
