import { supabase } from "../../../../utils/supabase";

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return new Response(JSON.stringify({ error: "Slot ID is required" }), {
        status: 400,
      });
    }

    const { data, error } = await supabase
      .from("slots")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    if (!data) {
      return new Response(JSON.stringify({ error: "Slot not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `${(error as Error).message}` }),
      { status: 500 },
    );
  }
}
