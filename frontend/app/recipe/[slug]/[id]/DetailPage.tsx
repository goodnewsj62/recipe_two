"use client";
import LoadingComponent from "@/components/loaders/LoadingComponent";
import DottedListings from "@/components/utils/DottedListings";
import routes from "@/routes";
import { incomingData, recipeType } from "@/types/general";
import { appFetch } from "@/utilities/appRequest";
import { appToast } from "@/utilities/appToast";
import { Button } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { invalidateCache } from "./actions";

type DetailPageProps = {
  params: { slug: string; id: string };
};
const DetailPage: React.FC<DetailPageProps> = ({ params: { id, slug } }) => {
  const url = routes.BACKEND.RECIPE_DETAIL.replace(":id", id);

  const router = useRouter();

  const { data, status } = useQuery({
    queryKey: ["recipe-detail", id],
    queryFn: async (): Promise<incomingData<recipeType>> => {
      return await appFetch(url, {});
    },
  });

  const mutation = useMutation({
    mutationFn: async () => {
      console.log(url);
      return await appFetch(url, { method: "delete" });
    },
    onSuccess: () => {
      invalidateCache(slug, id);
      appToast.Success("Recipe has been successfully deleted");
      router.push("/");
    },
    onError: () => {
      appToast.Error("Oops an error ocurred couldn't delete recipe");
    },
  });

  if (status === "error") {
    notFound();
  }

  return (
    <>
      <LoadingComponent isLoading={status === "pending"}>
        {data?.data && (
          <section
            aria-labelledby="title"
            className="mx-auto gap-12 py-8 lg:max-w-[1000px]"
          >
            <section className="col-span-12 w-full">
              <div className="flex w-full items-center justify-end gap-4 py-2">
                <Link
                  href={routes.EDIT.replace(":id", data.data.id.toString())}
                >
                  <Button
                    variant="contained"
                    disableElevation
                    sx={{
                      paddingLeft: "2rem",
                      paddingRight: "2rem",
                      fontWeight: "bold",
                    }}
                    size="large"
                    color="success"
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  disableElevation
                  sx={{
                    paddingLeft: "2rem",
                    paddingRight: "2rem",
                    fontWeight: "bold",
                  }}
                  size="large"
                  color="error"
                  onClick={() => mutation.mutate()}
                >
                  Delete
                </Button>
              </div>
              <img
                src={data.data.image}
                className="h-[500px] w-full object-cover"
                alt="recipe"
              />
              <h1 id="title" className="pt-4 text-2xl font-bold">
                {data.data.title}
              </h1>
              {/* <div>
          created by: <i>{data.data.username}</i>
        </div> */}
            </section>
            <section className="col-span-12 w-full">
              <h2 className="py-2 text-lg font-bold">Ingredients</h2>
              <div className="pb-6 xl:flex">
                <div className="xl:w-[50%]">
                  <DottedListings
                    rows={data.data.ingredients.slice(
                      0,
                      Math.round(data.data.ingredients.length / 2)
                    )}
                    totalChars={100}
                  />
                </div>
                <div className="xl:w-[50%]">
                  <DottedListings
                    rows={data.data.ingredients.slice(
                      Math.round(data.data.ingredients.length / 2)
                    )}
                    totalChars={100}
                  />
                </div>
              </div>
              <h2 className="py-2 text-lg font-bold">Instructions</h2>
              <article>{data.data.instructions}</article>
            </section>
          </section>
        )}
      </LoadingComponent>
    </>
  );
};

export default DetailPage;
