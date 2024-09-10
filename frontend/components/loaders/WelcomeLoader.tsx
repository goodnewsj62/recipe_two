import { CircularProgress } from "@mui/material";

type WelcomeLoaderProps = {};
const WelcomeLoader: React.FC<WelcomeLoaderProps> = ({}) => {
  return (
    <div className="flex h-[97svh] w-full items-center justify-center gap-4">
      <h2 className="font-sansitaSwashed text-4xl font-bold">BudsFormula</h2>
      <CircularProgress color="info" />
    </div>
  );
};

export default WelcomeLoader;
