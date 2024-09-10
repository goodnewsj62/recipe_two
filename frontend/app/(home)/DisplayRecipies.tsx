"use client";
import RecipeCard from "@/components/cards/RecipeCard";
import LoadingComponent from "@/components/loaders/LoadingComponent";
import useFetchOnPageEnd from "@/hooks/scrollPaginate";
import { RecipeList } from "@/types/general";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getRecipes } from "./request";

type DisplayRecipiesProps = {};
const DisplayRecipies: React.FC<DisplayRecipiesProps> = ({}) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["recipe-list"],
      queryFn: async ({
        pageParam,
      }: {
        pageParam: number;
      }): Promise<RecipeList> => {
        return await getRecipes({ params: { page: pageParam } });
      },
      getNextPageParam: (lastPage) => {
        return lastPage?.data?.next;
      },
      initialPageParam: 1,
    });

  const cards = (data?.pages ?? []).map((page) => {
    return page.data.results.map((item) => {
      return <RecipeCard key={item.id} {...item} src={item.image} />;
    });
  });

  useFetchOnPageEnd(isFetchingNextPage, hasNextPage, fetchNextPage);
  return (
    <LoadingComponent
      className="col-span-12"
      isEmpty={cards.length < 1}
      isLoading={isLoading}
      isFetching={isFetchingNextPage}
    >
      <section
        aria-label="recipe list"
        className="col-span-12 grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fill,  minmax(300px,  1fr))",
        }}
      >
        {cards}
      </section>
    </LoadingComponent>
  );
};

export default DisplayRecipies;
