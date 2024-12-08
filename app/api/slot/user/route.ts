import { supabase } from "../../../../utils/supabase";

export async function POST(request: Request) {
  try {
    const { id } = await request.json();
    console.log(id);
    
    if (!id) {
      return new Response(JSON.stringify({ error: `Please provide userId` }), {
        status: 400,
      });
    }
    const { data, error } = await supabase
      .from("slots")
      .select("*")
      .eq("host_id", id);

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
