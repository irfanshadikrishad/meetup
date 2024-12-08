"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdEdit, MdCheck } from "react-icons/md";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Slots() {
  const { id } = useParams();
  const [slotter, setSlotter] = useState({
    name: "",
    date: "",
    time_limit: "",
    user_limit: "",
    id: "",
  });

  const [editState, setEditState] = useState({
    name: false,
    date: false,
    time_limit: false,
    user_limit: false,
  });


  const [message, setMessage] = useState(null); // For success or error messages


  // Fetch Slot Details
  async function getSlotDetails() {
    if (id) {
      const request = await fetch(`/api/slot/single`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const response = await request.json();
      if (request.status === 200) {
        console.log('success', response)

        setSlotter(response);
      } else {
        console.error(response);
      }
    }
  }

  // Update Slot Details
  async function updateSlotDetails() {
    try {

      const request = await fetch(`/api/slot`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id:slotter.id,
          name:slotter.name,
          date:slotter.date,
          time_limit:slotter.time_limit,
          user_limit:slotter.user_limit
         }),
      });

      const response = await request.json();
      if (request.status === 200) {
        toast.success(`Updated successfully.`)
        getSlotDetails()
      } else {
        console.error(response);
        toast.error(response.error)
      }
    } catch (error) {
      console.error("Error updating slot:", error);
    }

  }

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSlotter({ ...slotter, [name]: value });
  };

  // Toggle Edit State
  const toggleEdit = (field) => {
    setEditState({ ...editState, [field]: !editState[field] });
  };

  useEffect(() => {
    getSlotDetails();
  }, []);

  return (
    <section className="flex flex-col items-center">
      <div className="w-[80%] rounded-[5px] bg-secondary p-6 text-black">
        {/* Success or Error Message */}
        {message && (
          <div
            className={`mb-4 px-4 py-2 rounded-md ${message.type === "success" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
              }`}
          >
            {message.text}
          </div>
        )}

        {/* Host Name */}
        <div className="mb-4 flex items-center justify-between">
          <label className="block text-[18px] font-bold">Host Name:</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="name"

              value={slotter.name ? slotter.name : ""}

              onChange={handleInputChange}
              disabled={!editState.name}
              className={`w-full px-4 py-2 border rounded-md ${editState.name ? "bg-white" : "bg-gray-200 cursor-not-allowed"
                }`}
            />

            {/* <MdEdit
              className="text-[20px] text-blue-500 cursor-pointer"
              onClick={() => toggleEdit("name")}
            /> */}

          </div>
        </div>

        {/* Event Date */}
        <div className="mb-4 flex items-center justify-between">
          <label className="block text-[18px] font-bold">Event Date:</label>
          <div className="flex items-center gap-2">
            <input
              type="date"
              name="date"
              value={slotter.date}
              onChange={handleInputChange}
              disabled={!editState.date}
              className={`w-full px-4 py-2 border rounded-md ${editState.date ? "bg-white" : "bg-gray-200 cursor-not-allowed"
                }`}
            />
            <MdEdit
              className="text-[20px] text-blue-500 cursor-pointer"
              onClick={() => toggleEdit("date")}
            />
          </div>
        </div>

        {/* Time Limit */}
        <div className="mb-4 flex items-center justify-between">
          <label className="block text-[18px] font-bold">Time Limit (min):</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              name="time_limit"
              value={slotter.time_limit}
              onChange={handleInputChange}
              disabled={!editState.time_limit}
              className={`w-full px-4 py-2 border rounded-md ${editState.time_limit ? "bg-white" : "bg-gray-200 cursor-not-allowed"
                }`}
            />
            <MdEdit
              className="text-[20px] text-blue-500 cursor-pointer"
              onClick={() => toggleEdit("time_limit")}
            />
          </div>
        </div>

        {/* User Limit */}
        <div className="mb-4 flex items-center justify-between">
          <label className="block text-[18px] font-bold">User Limit:</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              name="user_limit"
              value={slotter.user_limit}
              onChange={handleInputChange}
              disabled={!editState.user_limit}
              className={`w-full px-4 py-2 border rounded-md ${editState.user_limit ? "bg-white" : "bg-gray-200 cursor-not-allowed"
                }`}
            />
            <MdEdit
              className="text-[20px] text-blue-500 cursor-pointer"
              onClick={() => toggleEdit("user_limit")}
            />
          </div>
        </div>

        {/* Slot ID (Read-Only) */}
        <div className="mb-4">
          <label className="block text-[18px] font-semibold">Event ID:</label>
          <input
            type="text"
            name="id"
            value={slotter.id}
            readOnly
            className="w-full px-4 py-2 border rounded-md bg-gray-200 cursor-not-allowed"
          />
        </div>

        {/* Update Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={updateSlotDetails}
            className="px-6 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
          >
            Update Slot
          </button>
        </div>
      </div>
      <ToastContainer/>
    </section>
  );
}
