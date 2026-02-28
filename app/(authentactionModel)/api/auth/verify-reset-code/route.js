export async function POST(request) {
  try {
    const payload = await request.json(); // { email, token }

    if (!process.env.API_BASE_URL) {
      return Response.json(
        { message: "API_BASE_URL is not set" },
        { status: 500 },
      );
    }

    const backendResponse = await fetch(
      `${process.env.API_BASE_URL}/auth/verify-reset-code`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    const contentType = backendResponse.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await backendResponse.json()
      : { message: await backendResponse.text() };

    return Response.json(data, { status: backendResponse.status });
  } catch (error) {
    return Response.json(
      { message: `Server connection failed: ${String(error)}` },
      { status: 500 },
    );
  }
}
