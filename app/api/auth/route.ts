import * as argon2 from "argon2"
import {supabase} from "../../../utils/supabase"

export async function POST(request: Request) {
  try {
    let {name, email, password, role} = await request.json();
    if(!name || !email || !password || !role){
      return new Response(JSON.stringify({error: `Please fill all the fields.`}), { status: 500 });
    }
     password = await argon2.hash(password)

    const { data, error } = await supabase
        .from('users')
        .insert([{ email, name, role, password }]);
    
    if(error){
      return new Response(JSON.stringify(`${(error as Error).message}`), {
      status: 500,
    });
    }

    return new Response(JSON.stringify(data), {status:200})

  } catch (error) {
    return new Response(JSON.stringify(`${(error as Error).message}`), {
      status: 500,
    });
  }
}
