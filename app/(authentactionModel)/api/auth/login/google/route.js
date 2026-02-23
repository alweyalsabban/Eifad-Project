export async function GET() {
  try {
    const backendRes = await fetch(
      `${process.env.API_BASE_URL}/auth/login/google`,
      {
        method: "GET",
        redirect: "manual", // مهم جداً
      },
    );

    // لو الباك يرجع 302 مع Location
    const location = backendRes.headers.get("location");

    if (location) {
      return Response.redirect(location, 302);
    }

    // لو الباك يرجع JSON فيه url
    const data = await backendRes.json();

    if (data?.url) {
      return Response.redirect(data.url, 302);
    }

    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: "Failed to connect to backend" },
      { status: 500 },
    );
  }
}
