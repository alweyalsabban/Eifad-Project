export async function ApiFetchClient(Url, object) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${Url}`,
    object,
  );

  const Data = await res.json();

  return {
    response: res,
    isSusses: res.ok,
    dataResponse: Data || "no data",
  };
}
