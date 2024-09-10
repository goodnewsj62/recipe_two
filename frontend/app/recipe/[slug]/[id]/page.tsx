import routes from "@/routes";
import { RecipeList } from "@/types/general";
import { appFetch } from "@/utilities/appRequest";
import { QueryClient } from "@tanstack/react-query";
import DetailPage from "./DetailPage";

type RecipeDetailProps = {
  params: {
    slug: string;
    id: string;
  };
};

// Next.js will invalidate the cache when a
// request comes in, at most once every 30 mins.
export const revalidate = 60 * 30;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true; // or false, to 404 on unknown paths

export async function generateStaticParams() {
  //NOTE: using ISR technique to cache all page

  let posts: { id: string; slug: string }[] = [];

  const url = routes.BACKEND.RECIPES;
  let resp: RecipeList = await appFetch(url, { params: { page: 1 } });

  posts = [
    ...posts,
    ...resp.data.results.map((post) => ({
      id: post.id.toString(),
      slug: post.slug,
    })),
  ];

  while (!!resp?.data?.next) {
    resp = await appFetch(url, { params: { page: resp.data.next } });
    posts = [
      ...posts,
      ...resp.data.results.map((post) => ({
        id: post.id.toString(),
        slug: post.slug,
      })),
    ];
  }

  return posts.slice(0);
}

const RecipeDetail: React.FC<RecipeDetailProps> = async ({ params }) => {
  const queryClient = new QueryClient();

  const url = routes.BACKEND.RECIPE_DETAIL.replace(":id", params.id);

  await queryClient.prefetchQuery({
    queryKey: ["recipe-detail", params.id],
    queryFn: async () => await appFetch(url, {}),
  });

  return <DetailPage params={params} />;
};

export default RecipeDetail;
