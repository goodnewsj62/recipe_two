import float from "@/assets/undraw_404.svg";
import roasted from "@/assets/undraw_roasted.svg";
import { Button } from "@mui/material";
import { AxiosError } from "axios";
import { Link, useRouteError } from "react-router-dom";
import EmptyResponse from "../utils/EmptyResponse";

const AppErrorBoundary: React.FC = () => {
  const error = useRouteError();

  const Header = (
    <header className="px-4 py-4 md:px-8 lg:px-16">
      <Link to={"/"}>
        <h2 className="font-sansitaSwashed text-2xl font-bold md:text-4xl">
          BudsFormula
        </h2>
      </Link>
    </header>
  );

  if (error instanceof AxiosError) {
    if (error.response) {
      return (
        <div>
          {Header}
          <div className="flex h-[80svh] w-full flex-col items-center justify-center">
            <h1 className="font-custom text-6xl font-bold">
              {error.response.status}
            </h1>
            <div className="mb-6 mt-3 text-lg">{error.response.statusText}</div>
            <img src={float} className="w-36" alt="image description" />
            <div className="my-4">
              <Link to={"/"}>
                <Button>Home</Button>
              </Link>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          {Header}
          <EmptyResponse
            message="An error occurred, please try again or reach support"
            src={roasted}
          />
        </div>
      );
    }
  }

  return (
    <div>
      {Header}
      <div className="flex h-[80svh] w-full flex-col items-center justify-center">
        <img src={roasted} className="w-60" alt="image description" />
        <div className="py-2 text-lg">An unknown error occurred</div>
        <div className="">
          <Link to={"/"}>
            <Button>Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppErrorBoundary;
