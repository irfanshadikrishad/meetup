import { supabase } from "../../../../utils/supabase";

export async function POST(request: Request) {
  try {
    const { slot_id, user_id, host_id } = await request.json();

    if (!slot_id || !user_id) {
      return new Response(
        JSON.stringify({ error: "Slot ID and User ID are required" }),
        { status: 400 },
      );
    }

    // Fetch the slot details, including current booked count, user limit, and guest list
    const { data: slotData, error: slotError } = await supabase
      .from("slots")
      .select("user_limit, booked_count, guests")
      .eq("id", slot_id)
      .single();

    if (slotError) {
      return new Response(
        JSON.stringify({
          error: `Error fetching slot data: ${slotError.message}`,
        }),
        { status: 500 },
      );
    }

    if (!slotData) {
      return new Response(JSON.stringify({ error: "Slot not found" }), {
        status: 404,
      });
    }

    // Check if the slot has available spots (booked_count < user_limit)
    if (slotData.booked_count >= slotData.user_limit) {
      return new Response(
        JSON.stringify({ error: "The slot is fully booked" }),
        { status: 400 },
      );
    }

    // Check if the user has already booked this slot
    if (slotData.guests.includes(user_id)) {
      return new Response(
        JSON.stringify({ error: "You have already booked this slot" }),
        { status: 400 },
      );
    }

    // Add the user_id to the guests array and create a new booking with status 'pending'
    const updatedGuests = [...slotData.guests, user_id];

    // Proceed to book the slot (increment the booked_count by 1 and update the guests array)
    const { data: updatedSlot, error: updateError } = await supabase
      .from("slots")
      .update({
        booked_count: slotData.booked_count + 1, // Increment the booked_count
        guests: updatedGuests, // Update the guests array
      })
      .eq("id", slot_id)
      .select();

    if (updateError) {
      return new Response(
        JSON.stringify({
          error: `Error updating slot: ${updateError.message}`,
        }),
        { status: 500 },
      );
    }

    // Create a new entry in the bookings table with status 'pending'
    const { error: bookingError } = await supabase
      .from("bookings")
      .insert([{ slot_id, user_id, status: "pending" }]);

    if (bookingError) {
      return new Response(
        JSON.stringify({
          error: `Error logging the booking: ${bookingError.message}`,
        }),
        { status: 500 },
      );
    }

    return new Response(
      JSON.stringify({
        message: "Booking request sent successfully",
        data: updatedSlot,
      }),
      { status: 200 },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `${(error as Error).message}` }),
      { status: 500 },
    );
  }
}
