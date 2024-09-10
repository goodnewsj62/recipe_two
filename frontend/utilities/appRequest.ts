import { BACKEND_BASE_URL } from "@/constants";
import { serializeToParams } from "@/utilities/helpers";
import { RequestError } from "./appErrors";

export async function appFetch<T>(
  url: string,
  {
    params = {},
    method,
    ...others
  }: { params?: Record<string, any> } & Partial<RequestInit>
): Promise<{ statusCode: number } & T> {
  let queryString = serializeToParams(params);
  queryString = queryString ? `?${queryString}` : "";

  let url_ = BACKEND_BASE_URL + url + queryString;

  const res = await fetch(url_, { method: method || "get", ...others });

  if (res.status >= 400) {
    let data = res.status >= 500 ? "Server Error" : "an unknown error ocurred";
    try {
      const data = await res.json();
    } catch (_) {}

    throw new RequestError(
      JSON.stringify({
        message: data,
        status: res.status,
      })
    );
  }

  // not all data can be json decoded
  try {
    const data = await res.json();
    return { statusCode: res.status, ...(data && data) };
  } catch (err) {
    return { statusCode: res.status } as any;
  }
}
