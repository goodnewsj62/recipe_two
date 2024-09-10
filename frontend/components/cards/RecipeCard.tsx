import routes from "@/routes";
import { Button } from "@mui/material";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";

type RecipeCardProps = {
  title: string;
  src: string;
  id: string | number;
  slug: string;
};
const RecipeCard: React.FC<RecipeCardProps> = ({ title, src, id, slug }) => {
  const detailUrl = routes.RECIPE.replace(":slug", slug).replace(
    ":id",
    id.toString()
  );
  return (
    <div className="h-[500px]">
      <div className="h-[80%]">
        <Link href={detailUrl}>
          <img
            src={src}
            className="h-full w-full rounded-xl object-cover"
            alt="recipe"
          />
        </Link>
      </div>
      <div className="py-4">
        <h4 className="font-bold">{title}</h4>
        <div>
          <Link href={detailUrl}>
            <Button
              variant="text"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0px",
                color: "black",
              }}
              className="hover:!text-errorColor"
            >
              {/* TODO:  animate arrow on button hover */}
              <span>see details</span>
              <span className="">
                <FaLongArrowAltRight />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
