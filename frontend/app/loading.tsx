import { CircularProgress } from "@mui/material";

const Loading: React.FC = ({}) => {
  return (
    <div className="flex h-[97svh] w-full items-center justify-center gap-4">
      <h2 className="font-sansitaSwashed text-4xl font-bold">BudsFormula</h2>
      <CircularProgress color="info" />
    </div>
  );
};

export default Loading;
