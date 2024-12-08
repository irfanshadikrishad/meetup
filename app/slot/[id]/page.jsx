"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdDelete } from 'react-icons/md';

export default function Slots() {
  const { id } = useParams();
  const [slotter, setSlotter] = useState({});

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
      console.log(response);

      if (request.status === 200) {
        setSlotter(response);
      } else {
        console.log(response);
      }
    }
  }

  useEffect(() => {
    getSlotDetails();
  }, []);
  return (
    <section>



      <div className="w-[full] rounded-[5px] bg-secondary h-[200px] text-black p-6" >
        <p className="text-[18px] font-bold">Host Name:  {slotter.name ? slotter.name : ""}</p>
        <p className="text-[18px] font-bold">Event date: {slotter.date ? slotter.date : ""}</p>
        <p className="text-[18px] font-bold">Event id: {slotter.time_limit ? slotter.time_limit : ""} min</p>
        <p className="text-[18px] font-bold">Event id: {slotter.user_limit ? slotter.user_limit : ""} min</p>

        <p className="text-[18px] font-semibold">Event id: {slotter.id ? slotter.id : ""}</p>


        {/* <div className="flex  items-center justify-between">

          <div>

            <button className="p-2 mt-2 bg-[#A594F9] text-black font-bold rounded-[5px]"> <Link href={`/slot/${slo.id}`}>View details</Link></button>

          </div>


          <div>
            <button>  <MdDelete className="text-[28px] text-[#ff2f2f]" /></button>
          </div>
        </div> */}
      </div>
    </section>
  );
}
