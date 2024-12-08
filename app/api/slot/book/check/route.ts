import { supabase } from '../../../../../utils/supabase';

export async function POST(request: Request) {
  try {
    const { slot_id, user_id } = await request.json();
    console.log(slot_id, user_id);
    
    if (!slot_id || !user_id) {
      return new Response(
        JSON.stringify({ error: 'Slot ID and User ID are required' }),
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('bookings')
      .select('status')
      .eq('slot_id', slot_id)
      .eq('user_id', user_id)
      .single(); 

    if (error) {
      return new Response(
        JSON.stringify({ error: `Error fetching booking data: ${error.message}` }),
        { status: 500 }
      );
    }
    console.log(data);
    
    if (!data) {
      return new Response(
        JSON.stringify({ message: 'User has not booked this slot' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: `Booking status: ${data.status}`, status: 200 })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `${(error as Error).message}` }),
      { status: 500 }
    );
  }
}
