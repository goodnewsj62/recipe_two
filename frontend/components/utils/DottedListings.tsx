import { ingredientType } from "@/types/general";

type props = {
  totalChars: number;
  rows: Omit<ingredientType, "totalChars">[];
};

export const Row: React.FC<ingredientType & { totalChars: number }> = ({
  name,
  amount,
}) => {
  return (
    <div className="text-text-primary flex w-full py-2">
      <span className="basis-[70%] overflow-hidden text-ellipsis whitespace-nowrap">
        {name}
        {new Array(1000).fill(undefined).map((_, index) => {
          return <span key={index + name}>.</span>;
        })}
      </span>
      <span className="grow font-bold">{amount}</span>
    </div>
  );
};

const DottedListings: React.FC<props> = ({ totalChars, rows }) => {
  return (
    <div>
      {rows.map((item) => {
        return <Row key={item.name} totalChars={totalChars} {...item} />;
      })}
    </div>
  );
};

export default DottedListings;
