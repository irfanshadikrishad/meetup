import { supabase } from "../../../utils/supabase";

export async function POST(request: Request) {
  try {
    const { host_id, name, slotDate, slotTimeLimit, slotUserLimit } =
      await request.json();

    console.log(host_id, name, slotDate, slotTimeLimit, slotUserLimit);

    const { data, error } = await supabase.from("slots").insert([
      {
        host_id,
        name: name,
        user_limit: slotUserLimit,
        guests: [],
        time_limit: slotTimeLimit,
      },
    ]);
    if (error) {
      return new Response(
        JSON.stringify({ error: `${(error as Error).message}` }),
      );
    }
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(`${(error as Error).message}`));
  }
}
