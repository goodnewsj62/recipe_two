import routes from "@/routes";
import { Button } from "@mui/material";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import DisplayRecipies from "./DisplayRecipies";
import { getRecipes } from "./request";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["recipe-list"],
    queryFn: async () => await getRecipes({}),
    getNextPageParam: (lastPage: any) => {
      return lastPage?.data?.next;
    },
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section
        aria-labelledby="recipe-header"
        className="grid-col-12 grid gap-y-4"
      >
        <div className="col-span-12 flex items-center justify-between py-6">
          <h1 id="recipe-header" className="text-xl font-bold">
            Recipes
          </h1>
          <Link href={routes.CREATE}>
            <Button
              variant="text"
              sx={{
                color: "black",
                fontSize: "1rem",
                display: "flex",
                fontWeight: "bold",
              }}
              className="items-center justify-center gap-2"
            >
              <span>Create One</span>
              <span>
                <BsArrowRight size={20} />
              </span>
            </Button>
          </Link>
        </div>

        <DisplayRecipies />
      </section>
    </HydrationBoundary>
  );
}
