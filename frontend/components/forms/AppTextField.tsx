"use client";
import { TextField, TextFieldProps } from "@mui/material";
import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";

type props = Omit<TextFieldProps, "variant"> & {
  control: Control<FieldValues> | undefined;
  helperText?: string;
  defaultValue?: any;
  name: string;

  message?: any;
};

const AppTextField: React.FC<props> = ({
  control,
  message,
  name,
  helperText = "",
  defaultValue = "",
  ...props
}) => {
  const hasError = !!message;
  return (
    <Controller
      render={({ field }) => (
        <TextField
          {...field}
          {...props}
          error={hasError}
          helperText={hasError ? message : helperText}
        />
      )}
      name={name}
      control={control}
      defaultValue={defaultValue}
    />
  );
};

export default AppTextField;
