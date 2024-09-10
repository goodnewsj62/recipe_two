import food from "@/public/undraw_breakfast.svg";
import { Box, CircularProgress } from "@mui/material";
import Image from "next/image";
import { PropsWithChildren } from "react";

type loadingComponentProps = {
  className?: string;
  isError?: boolean;
  isFetching?: boolean;
  isEmpty?: boolean;
  isLoading?: boolean;
} & PropsWithChildren;
const LoadingComponent: React.FC<loadingComponentProps> = ({
  className,
  isFetching,
  // isError,
  isEmpty,
  isLoading,
  children,
}) => {
  if (isLoading) {
    return (
      <Box
        sx={{ width: "100%", height: "70svh", display: "flex" }}
        className={`flex-col !items-center !justify-center gap-2 ${className}`}
      >
        <CircularProgress color="success" />
        <div>loading please wait...</div>
      </Box>
    );
  }

  if (isEmpty) {
    return (
      <div className="col-span-12 flex w-full flex-col items-center justify-center gap-6 py-32">
        <Image src={food} alt="empty response" className="w-40" />
        <h2 className={`text-center text-lg font-bold ${className}`}>
          seems there are no recipes created yet
        </h2>
      </div>
    );
  }

  return (
    <>
      {children}
      {isFetching && (
        <Box
          sx={{ width: "100%", margin: "1rem 0rem", display: "flex" }}
          className={`flex-col !items-center !justify-center gap-2 ${className}`}
        >
          <CircularProgress color="success" />
          <div>loading more...</div>
        </Box>
      )}
    </>
  );
};

export default LoadingComponent;
