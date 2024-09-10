"use client";
import CreateUpdateRecipe from "@/app/create-recipe/CreateUpdateRecipe";
import LoadingComponent from "@/components/loaders/LoadingComponent";
import routes from "@/routes";
import { incomingData, recipeType } from "@/types/general";
import { appFetch } from "@/utilities/appRequest";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";

type EditPageProps = { params: { slug: string; id: string } };
const EditPage: React.FC<EditPageProps> = ({ params: { id, slug } }) => {
  const url = routes.BACKEND.RECIPE_DETAIL.replace(":id", id ?? "");

  // before u get to this page from details data has already been prefetched
  const { data, status } = useQuery({
    queryKey: ["recipe-detail", id],
    queryFn: async (): Promise<incomingData<recipeType>> => {
      return await appFetch(url, {});
    },
  });

  if (status === "error") {
    notFound();
  }

  return (
    <div>
      <LoadingComponent isLoading={status === "pending"}>
        <CreateUpdateRecipe
          kind="update"
          defaultValues={data?.data ? data.data : {}}
          submitTo={`${routes.BACKEND.RECIPE_DETAIL.replace(
            ":id",
            id?.toString() ?? ""
          )}`}
        />
      </LoadingComponent>
    </div>
  );
};

export default EditPage;
