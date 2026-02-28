export async function POST(request) {
  const email = await request.json();

  try {
    const backendResponse = await fetch(
      `${process.env.API_BASE_URL}/auth/send-verification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(email),
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
