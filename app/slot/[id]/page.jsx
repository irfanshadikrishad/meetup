"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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
      <p>id: {slotter.id ? slotter.id : ""}</p>
      <p>id: {slotter.name ? slotter.name : ""}</p>
      <p>id: {slotter.time_limit ? slotter.time_limit : ""}</p>
      <p>id: {slotter.user_limit ? slotter.user_limit : ""}</p>
    </section>
  );
}
