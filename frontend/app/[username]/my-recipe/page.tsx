import DisplayRecipies from "@/app/(home)/DisplayRecipies";
import { getRecipes } from "@/app/(home)/request";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";

type MyRecipeProps = { params: { username: string } };

export function generateMetadata({ params }: MyRecipeProps): Metadata {
  const username = decodeURIComponent(params.username);

  return {
    title: `${username} recipes`,
    description: `A list of all recipe for user ${username}`,
  };
}

const MyRecipe: React.FC<MyRecipeProps> = async ({}) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["recipe-list"],
    queryFn: async () => await getRecipes({}),
    getNextPageParam: (lastPage: any) => {
      const currentPage = lastPage.data?.currentPage ?? 0;
      const total = lastPage.data?.totalPages ?? 0;
      return total > currentPage ? currentPage + 1 : undefined;
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
            My Recipes
          </h1>
        </div>
        <DisplayRecipies />
      </section>
    </HydrationBoundary>
  );
};

export default MyRecipe;
