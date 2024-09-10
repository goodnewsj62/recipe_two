"use client";
import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE } from "@/constants";
import { isServer } from "@tanstack/react-query";
import { z as zod } from "zod";

export const ingredientSchema = zod.object({
  name: zod.string(),
  amount: zod.string(),
});

export const recipeFormSchema = zod
  .object({
    title: zod.string().min(3),
    ingredients: zod
      .array(ingredientSchema)
      .nonempty("add at least one ingredient"),
    instructions: zod.string().min(20),
    image: zod.string().or(
      zod
        .instanceof(isServer ? File : FileList)
        .transform((value) =>
          value instanceof File ? value : value?.item(0)! || {}
        )
        .refine((file) => {
          return !file || file.size <= MAX_UPLOAD_SIZE;
        }, "Maximum of 5MB is allowed")
        .refine((file) => {
          return ACCEPTED_FILE_TYPES.indexOf(file?.type ?? "") !== -1;
        }, "File must be in jpeg or png format")
    ),
  })
  .required();
