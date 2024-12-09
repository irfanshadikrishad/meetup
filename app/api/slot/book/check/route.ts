import { supabase } from "../../../../../utils/supabase";

export async function POST(request: Request) {
  try {
    const { slot_id, user_id } = await request.json();
    console.log(slot_id, user_id);

    if (!slot_id || !user_id) {
      return new Response(
        JSON.stringify({ error: "Slot ID and User ID are required" }),
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("bookings")
      .select("status")
      .eq("slot_id", slot_id)
      .eq("user_id", user_id);

    if (error) {
      return new Response(
        JSON.stringify({
          error: `Error fetching booking data: ${error.message}`,
        }),
        { status: 500 },
      );
    }

    console.log(data);

    // Handle the case where no rows are returned
    if (data.length === 0) {
      return new Response(
        JSON.stringify({ message: "User has not booked this slot" }),
        { status: 404 },
      );
    }

    // Handle the case where multiple rows are returned
    if (data.length > 1) {
      return new Response(
        JSON.stringify({
          error:
            "Unexpected error: multiple bookings found for this slot and user",
        }),
        { status: 500 },
      );
    }

    // Successfully found one booking record
    const booking = data[0]; // Data contains an array of rows, so access the first element
    return new Response(
      JSON.stringify({
        message: `Booking status: ${booking.status}`,
        status: 200,
      }),
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `${(error as Error).message}` }),
      { status: 500 },
    );
  }
}
