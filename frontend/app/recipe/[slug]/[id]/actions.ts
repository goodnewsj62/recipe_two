"use server";

import routes from "@/routes";
import { revalidatePath } from "next/cache";

export async function invalidateCache(slug: string, id: string) {
  revalidatePath(routes.RECIPE.replace(":slug", slug).replace(":id", id));
}
