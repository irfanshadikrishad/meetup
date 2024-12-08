export async function POST(request: Request) {
  try {
    const data = await request.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(`${(error as Error).message}`), {
      status: 500,
    });
  }
}
