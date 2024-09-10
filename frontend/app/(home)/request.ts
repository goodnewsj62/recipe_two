import { BACKEND_BASE_URL } from "@/constants";
import routes from "@/routes";
import { serializeToParams } from "@/utilities/helpers";

export async function getRecipes<T>({
  params = {},
}: {
  params?: Record<any, any>;
}): Promise<{ statusCode: number } & T> {
  const url = BACKEND_BASE_URL + routes.BACKEND.RECIPES;
  let queryString = serializeToParams(params);
  queryString = queryString ? `?${queryString}` : "";

  const res = await fetch(url + queryString, { cache: "no-cache" });
  if (res.status >= 400) {
    throw new Error(
      JSON.stringify({
        message: await res.json(),
        status: res.status,
      })
    );
  }
  return { statusCode: res.status, ...(await res.json()) };
}
