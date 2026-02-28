export async function POST(request) {
  const body = await request.json();

  try {
    const backendResponse = await fetch(
      `${process.env.API_BASE_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    const data = await backendResponse.json();

    return Response.json(data, {
      status: backendResponse.status,
    });
  } catch (error) {
    return Response.json(
      { error: `Server connection failed ${error}` },
      { status: 500 },
    );
  }
}
