"use client";
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import ErrorMessage from "./ErrorMessage";

export interface FileInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  hookFormProps: any;
  errorMessage?: string;
  src?: string;
}

const FileInput: React.FC<FileInputProps> = ({
  label,
  errorMessage,
  src,
  hookFormProps = {},
  ...props
}) => {
  return (
    <div className="">
      <div className="">
        {label && (
          <div>
            <label
              className="font-medium"
              htmlFor={props.id ? props.id : label}
            >
              {label}
            </label>
          </div>
        )}
        <div className="relative h-[400px] w-full">
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-md bg-[#EDEEEF]">
            {src && (
              <img
                src={src}
                className="h-full w-full object-cover"
                alt="preview"
              />
            )}
            {!src && (
              <div className="text-sm text-[#111213]">
                Drop file here or
                <u className="ml-1 text-[#0660FE]">Click to browse</u>
              </div>
            )}
          </div>
          <input
            {...hookFormProps}
            {...props}
            id={props.id ? props.id : label}
            type="file"
            className="absolute left-0 top-0 z-10 h-full w-full cursor-pointer opacity-0"
          />
        </div>
        <div className="flex items-center justify-between">
          <span>No file uploaded</span>
          <span className="text-[#F7B9B4] underline">Delete Picture</span>
        </div>
      </div>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default FileInput;
