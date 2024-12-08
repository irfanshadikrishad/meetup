import * as argon2 from "argon2";
import { supabase } from "../../../../utils/supabase";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: `Please fill all the fields!` }),
      );
    }
    // checking if the user exists
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error) {
      console.error("Error checking user:", error);
      return new Response(
        JSON.stringify({ error: `${(error as Error).message}` }),
        { status: 500 },
      );
    }
    if (!data.id) {
      return new Response(JSON.stringify({ message: `User deos not exist.` }), {
        status: 400,
      });
    } else {
      let isVerified = await argon2.verify(data?.password, password);
      if (isVerified) {
        let id = data?.id;
        let email = data?.email;
        return new Response(
          JSON.stringify({
            id,
            email,
            token: jwt.sign({ id: id, email: email }, process.env.JWT_SECRET, {
              expiresIn: "15d",
            }),
          }),
          { status: 200 },
        );
      } else {
        return new Response(
          JSON.stringify({ message: `Incorrect email or password.` }),
          { status: 401 },
        );
      }
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `${(error as Error).message}` }),
      { status: 500 },
    );
  }
}
