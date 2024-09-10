import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";

type props = SelectProps & {
  control: Control<FieldValues> | undefined;
  helperText?: string;
  defaultValue?: any;
  name: string;
  id: string;
  message?: any;
  options: { value: any; text: string }[];
};

const AppSelectField: React.FC<props> = ({
  control,
  message,
  name,
  id,
  options,
  helperText = "",
  defaultValue = "",
  ...props
}) => {
  return (
    <Controller
      render={({ field }) => {
        return (
          <FormControl fullWidth>
            {props.label && (
              <InputLabel id={id + "__label"}>{props.label}</InputLabel>
            )}
            <Select
              id={id}
              {...field}
              {...props}
              {...(props.label && {
                labelId: id + "__label",
                label: props.label,
              })}
            >
              {options.map(({ value, text }) => (
                <MenuItem value={value}>{text}</MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      }}
      name={name}
      control={control}
      defaultValue={defaultValue}
    />
  );
};

export default AppSelectField;
