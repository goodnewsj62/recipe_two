"use client";

import { RequestError } from "@/utilities/appErrors";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import float from "@/public/undraw_404.svg";
import roasted from "@/public/undraw_roasted.svg";

type errorProps = { error: Error; reset: () => void };
const error: React.FC<errorProps> = ({ error, reset }) => {
  if (error instanceof RequestError) {
    const data = JSON.parse(error.message);

    return (
      <div>
        <div className="flex h-[80svh] w-full flex-col items-center justify-center">
          <h1 className="font-custom text-6xl font-bold">{data.status}</h1>
          <div className="mb-6 mt-3 text-lg">{data.message}</div>
          <Image src={float} className="w-36" alt="image description" />
          <div className="my-4">
            <Button onClick={reset} variant="contained" size="large">
              Reload
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex h-[80svh] w-full flex-col items-center justify-center">
        <Image src={roasted} className="w-60" alt="image description" />
        <div className="py-2 text-lg">
          Oops an error occurred please reach out to support
        </div>
        <div className="">
          <Link href={"/"}>
            <Button variant="contained" size="large">
              Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }
};

export default error;
