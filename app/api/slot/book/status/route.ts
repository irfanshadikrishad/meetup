import { supabase } from "../../../../../utils/supabase";

export async function POST(request: Request) {
  try {
    const { host_id } = await request.json();
    const { data, error } = await supabase
      .from("bookings")
      .select("id")
      .eq("host_id", host_id);
    if (error) {
      return new Response(
        JSON.stringify({ error: `${(error as Error).message}` }),
        { status: 400 },
      );
    }
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `${(error as Error).message}` }),
      { status: 500 },
    );
  }
}
