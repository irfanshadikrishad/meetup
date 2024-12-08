import { supabase } from "../../../../utils/supabase";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  id: string;
  email: string;
}

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET,
    ) as DecodedToken;

    const { id, email } = decodedToken;

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    if (data) {
      return new Response(JSON.stringify(data), { status: 200 });
    }

    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
    });
  }
}
