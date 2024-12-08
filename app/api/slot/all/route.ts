import { supabase } from "../../../../utils/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase.from("slots").select("*");
    if (error) {
      return new Response(
        JSON.stringify({ error: `${(error as Error).message}` }),
        { status: 500 },
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
