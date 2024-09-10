import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import ErrorMessage from "./ErrorMessage";

export interface AppInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  isLoading?: boolean;
  hookFormProps: {};
  errorMessage?: string;
  rightIcon?: JSX.Element;
}

const AppInput = (props: AppInputProps): JSX.Element => {
  const {
    rightIcon,
    isLoading,
    disabled,
    errorMessage,
    hookFormProps,
    label,
    ...otherProps
  } = props;

  return (
    <div className="w-full">
      <label htmlFor={label} className="mb-1 font-nunitoSans text-appGray100">
        {label}
      </label>

      <div className="flex h-11 items-center overflow-hidden rounded-lg border border-appGray300 transition-all duration-300 focus-within:border-appBlue100">
        <input
          id={label}
          placeholder="Enter your email address"
          className="h-full w-full px-3 outline-0 placeholder:font-nunitoSans placeholder:text-appGray400"
          disabled={isLoading || disabled}
          {...hookFormProps}
          {...otherProps}
        />
        {!!rightIcon && (
          <span className="flex items-center justify-center pr-3">
            {rightIcon}
          </span>
        )}
      </div>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default AppInput;
