"use client";

import AppTextField from "@/components/forms/AppTextField";
import FileInput from "@/components/forms/FileInput";
import IngredientFields from "@/components/forms/IngredientFields";
import { ACCEPTED_FILE_TYPES, BACKEND_BASE_URL } from "@/constants";
import routes from "@/routes";
import { incomingData, recipeType } from "@/types/general";
import { appFetch } from "@/utilities/appRequest";
import { appToast } from "@/utilities/appToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, LinearProgress } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateReactHelpers } from "@uploadthing/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { invalidateCache } from "../recipe/[slug]/[id]/actions";
import { recipeFormSchema } from "./create.schema";

// UPLOADTHING INTEGRATION
const { uploadFiles } = generateReactHelpers({
  url: BACKEND_BASE_URL + "/api/uploadthing",
});

type formI = Omit<recipeType, "id" | "image"> & {
  image: FileList | string;
};

type CreateUpdateRecipeProps = {
  kind?: "create" | "update";
  submitTo?: string;
  defaultValues?: Record<any, any>;
};

const CreateUpdateRecipe: React.FC<CreateUpdateRecipeProps> = ({
  defaultValues = {},
  kind = "create",
  submitTo = routes.BACKEND.RECIPES,
}) => {
  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<formI>({
    defaultValues: {
      ...defaultValues,
    },
    resolver: zodResolver(recipeFormSchema),
  });

  const queryClient = useQueryClient();

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async ({
      data,
      src,
    }: {
      data: formI;
      src: string;
    }): Promise<incomingData<recipeType>> => {
      const data_ = {
        title: data.title,
        ingredients: data.ingredients,
        instructions: data.instructions,
        image: src,
      };
      return await appFetch(submitTo, {
        method: kind === "create" ? "post" : "put",
        body: JSON.stringify(data_),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    onSuccess: (data) => {
      appToast.Success(
        `Recipe has been successfully ${
          kind === "create" ? "created" : "updated"
        }`
      );

      // INVALIDATE CACHED DATA
      if (kind === "update") {
        queryClient.invalidateQueries({
          queryKey: ["recipe-detail", data.data.id.toString()],
          exact: true,
        });
        invalidateCache(data.data.slug, data.data.id.toString());
      }
      queryClient.invalidateQueries({
        queryKey: ["recipe-list"],
      });

      //REDIRECT USER
      router.push(
        `${routes.RECIPE.replace(":slug", data.data.slug ?? "").replace(
          ":id",
          (data.data.id ?? "").toString()
        )}`
      );
    },

    onError: () => {
      appToast.Error(
        `recipe ${kind === "create" ? "creation" : "updated"} failed`
      );
    },
  });

  const fileMutation = useMutation({
    mutationFn: async (data: File) => {
      const fData = new FormData();
      fData.append("image", data);
      return await uploadFiles("imageUploader", {
        files: [data],
      });
    },
  });

  function submitHandler(data: formI) {
    //CHECKS IF IMAGE HAS NOT CHANGED
    if (typeof data.image === "string") {
      return mutation.mutate({ data, src: data.image });
    }

    fileMutation
      .mutateAsync(data.image as unknown as File)
      .then((resp) => {
        mutation.mutate({ data, src: resp[0].url });
      })
      .catch(() => {
        appToast.Error(
          `recipe ${
            kind === "create" ? "creation" : "updated"
          } failed please try again. contact support if it continues`
        );
      });
  }

  // HELPS WITH IMAGE URL
  const image = watch("image");
  const src = image
    ? typeof image === "string"
      ? image
      : ACCEPTED_FILE_TYPES.includes(image[0]?.type)
      ? URL.createObjectURL(image[0])
      : ""
    : "";

  const isSubmitting = mutation.isPending || fileMutation.isPending;

  return (
    <form
      onSubmit={handleSubmit((data) => submitHandler(data))}
      className="mx-auto grid max-w-[80ch] gap-6 py-8"
    >
      <h1 className="text-lg font-bold">Create Recipe</h1>
      <div>
        <FileInput
          hookFormProps={{ ...register("image") }}
          label="Thumbnail"
          placeholder="Thumbnail"
          autoComplete="given-name"
          name="image"
          errorMessage={(errors?.image?.message as string) ?? undefined}
          src={src}
        />
      </div>
      <AppTextField
        control={control as any}
        name="title"
        label={"title"}
        color="success"
        message={errors?.title?.message as string}
        fullWidth
      />
      <AppTextField
        control={control as any}
        name="instructions"
        label={"instructions"}
        color="success"
        fullWidth
        multiline
        message={errors?.instructions?.message as string}
        rows={5}
      />
      <IngredientFields
        control={control as any}
        register={register}
        name="ingredients"
        message={errors.ingredients?.message}
      />
      <Button
        fullWidth
        disableElevation
        color={"success"}
        size="large"
        type="submit"
        className="!font-bold"
        variant="contained"
        disabled={isSubmitting}
      >
        <span>{isSubmitting ? "Please wait..." : "Submit"}</span>
      </Button>

      {isSubmitting && (
        <LinearProgress
          sx={{
            position: "fixed",
            zIndex: "1000",
            width: "100%",
            top: "0px",
            left: "0px",
          }}
          color="error"
        />
      )}
    </form>
  );
};

export default CreateUpdateRecipe;
