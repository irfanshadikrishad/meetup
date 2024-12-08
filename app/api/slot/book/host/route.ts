import { supabase } from '../../../../../utils/supabase';

export async function PUT(request: Request) {
  try {
    const { booking_id, status } = await request.json(); // booking_id and status ("approved" or "rejected")

    if (!booking_id || !status) {
      return new Response(
        JSON.stringify({ error: 'Booking ID and status are required' }),
        { status: 400 }
      );
    }

    if (!['approved', 'rejected'].includes(status)) {
      return new Response(
        JSON.stringify({ error: 'Invalid status, must be "approved" or "rejected"' }),
        { status: 400 }
      );
    }

    // Update the booking status
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', booking_id)
      .select();

    if (error) {
      return new Response(
        JSON.stringify({ error: `Error updating booking status: ${error.message}` }),
        { status: 500 }
      );
    }

    if (status === 'approved') {
      // You can perform actions when a booking is approved, such as incrementing a slot's actual "confirmed" count
    }

    return new Response(
      JSON.stringify({ message: `Booking ${status} successfully`, data }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `${(error as Error).message}` }),
      { status: 500 }
    );
  }
}
