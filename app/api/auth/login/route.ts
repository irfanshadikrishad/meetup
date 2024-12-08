export async function POST(request:Request) {
    try {
    const {email, password } = await request.json()
           
    } catch (error) {
        return new Response(JSON.stringify({error:`${(error as Error).message}`}))
    }
}