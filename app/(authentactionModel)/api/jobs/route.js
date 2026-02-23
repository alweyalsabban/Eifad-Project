export async function GET(req) {
  try {
    // نقرأ البرامترات من الرابط
    const { searchParams } = new URL(req.url);

    // ننشئ رابط جديد للـ backend
    const apiUrl = new URL(`${process.env.API_BASE_URL}/jobs`);

    // نضيف كل البرامترات القادمة من الفرونت
    searchParams.forEach((value, key) => {
      if (value !== "" && value != null) {
        apiUrl.searchParams.append(key, value);
      }
    });

    const backendResponse = await fetch(apiUrl.toString(), {
      cache: "no-store", // لو البيانات تتغير باستمرار
    });

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
