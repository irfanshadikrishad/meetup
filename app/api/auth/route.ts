import * as argon2 from "argon2";
import { supabase } from "../../../utils/supabase";

export async function POST(request: Request) {
  try {
    let { name, email, password, role } = await request.json();

    if (!name || !email || !password || !role) {
      return new Response(
        JSON.stringify({ error: `Please fill all the fields.` }),
        { status: 400 },
      );
    }

    const { data: existingUser, error: existingUserError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();
    console.log(existingUser);

    // if (existingUserError) {
    //   return new Response(
    //     JSON.stringify({
    //       error: `Error checking for existing user: ${existingUserError.message}. data:${existingUser}`,
    //     }),
    //     { status: 500 },
    //   );
    // }
    

    if (existingUser?.id) {
      return new Response(
        JSON.stringify({ error: "User with this email already exists." }),
        { status: 400 },
      );
    }

    const hashedPassword = await argon2.hash(password);

    const { data, error } = await supabase
      .from("users")
      .insert([{ email, name, role, password: hashedPassword }]);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
