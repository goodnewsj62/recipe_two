import { Button, TextField } from "@mui/material";
import { useRef } from "react";
import {
  Control,
  FieldValues,
  useFieldArray,
  UseFormRegister,
} from "react-hook-form";
import AppInput from "./AppInput";
import ErrorMessage from "./ErrorMessage";

type IngredientFieldsProps = {
  control: Control<FieldValues> | undefined;
  name: string;
  register: UseFormRegister<any>;

  message?: any;
};
const IngredientFields: React.FC<IngredientFieldsProps> = ({
  control,
  name,
  register,
  message,
}) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
  });

  const hasError = !!message;

  const add = () => {
    if (nameRef.current?.value && amountRef.current?.value) {
      append({
        name: nameRef.current.value,
        amount: amountRef.current.value,
      });

      nameRef.current.value = "";
      amountRef.current.value = "";
    }
  };
  return (
    <div>
      <div className="py-2 text-sm font-bold">Add Ingredient</div>
      <div className="flex items-center gap-2 py-2">
        <TextField
          color="success"
          inputRef={nameRef}
          label={"ingredient"}
          name="name"
        />
        <TextField
          color="success"
          inputRef={amountRef}
          label={"amount/quantity"}
          name="amount"
        />
        <Button
          variant="contained"
          disableElevation
          onClick={add}
          sx={{
            fontWeight: "bold",
          }}
          size="large"
        >
          Add
        </Button>
      </div>
      <fieldset className="py-2">
        <legend className="font-bold">added ingredients</legend>
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fill,  minmax(280px,  1fr))",
          }}
        >
          {fields.map((field, index) => {
            return (
              <div
                key={field.id}
                className="flex flex-col gap-2 rounded-xl bg-primaryColor p-4"
              >
                <AppInput
                  hookFormProps={{ ...register(`${name}.${index}.name`) }}
                />
                <AppInput
                  hookFormProps={{ ...register(`${name}.${index}.amount`) }}
                />
                <div>
                  <Button
                    disableElevation
                    sx={{
                      background: "black",
                      color: "white",
                      fontWeight: "bold",
                      borderRadius: "1rem",
                    }}
                    fullWidth
                    className=""
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </fieldset>
      {hasError && <ErrorMessage message={message} />}
    </div>
  );
};

export default IngredientFields;
