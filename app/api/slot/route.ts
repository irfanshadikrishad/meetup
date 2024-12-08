import { supabase } from "../../../utils/supabase";

export async function POST(request: Request) {
  try {
    const { host_id, name, slotDate, slotTimeLimit, slotUserLimit } =
      await request.json();

    const { data, error } = await supabase.from("slots").insert([
      {
        host_id,
        name: name,
        user_limit: slotUserLimit,
        guests: [],
        time_limit: slotTimeLimit,
      },
    ]);
    if (data === null) {
      return new Response(JSON.stringify(data), { status: 200 });
    } else {
      return new Response(
        JSON.stringify({ error: `${(error as Error).message}` }),
        { status: 400 },
      );
    }
  } catch (error) {
    return new Response(JSON.stringify(`${(error as Error).message}`), {
      status: 500,
    });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return new Response(JSON.stringify({ error: "Slot ID is required" }), {
        status: 400,
      });
    }

    const { data, error } = await supabase.from("slots").delete().eq("id", id);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    if (data && data === null) {
      return new Response(JSON.stringify({ error: "Slot not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Slot deleted successfully" }),
      { status: 200 },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `${(error as Error).message}` }),
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    // Parse the request body
    const { 
      id, 
      slot_time, 
      slot_status, 
      time_limit, 
      user_limit, 
      date 
    } = await request.json();

    // Validate if the required fields (id) are provided
    if (!id) {
      return new Response(
        JSON.stringify({
          error: "Slot ID is required",
        }),
        { status: 400 },
      );
    }

    // Update the slot in Supabase
    const { data, error } = await supabase
      .from("slots")
      .update({
        date: date,
        time_limit:time_limit,
        user_limit:user_limit
      })
      .eq("id", id);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    // Check if the slot was not found
    if (data && data === null) {
      return new Response(JSON.stringify({ error: "Slot not found" }), {
        status: 404,
      });
    }

    // Return a success response with updated data
    return new Response(
      JSON.stringify({ message: "Slot updated successfully", data }),
      { status: 200 },
    );
  } catch (error) {
    // Handle unexpected errors
    return new Response(
      JSON.stringify({ error: `${(error as Error).message}` }),
      { status: 500 },
    );
  }
}
