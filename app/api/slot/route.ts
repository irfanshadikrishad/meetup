import { supabase } from "../../../utils/supabase";

export async function POST(request: Request) {
  try {
    const { host_id, name, user_limit, guests } = await request.json();

    const { data, error } = await supabase.from("slots").insert([
      {
        host_id,
        name,
        user_limit,
        guests: guests,
      },
    ]);
    if (error) {
      return new Response(
        JSON.stringify({ error: `${(error as Error).message}` }),
      );
    }
  } catch (error) {
    return new Response(JSON.stringify(`${(error as Error).message}`));
  }
}
