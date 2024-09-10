import { Metadata } from "next";
import CreateUpdateRecipe from "./CreateUpdateRecipe";

export const metadata: Metadata = {
  title: "Create recipe",
  description: "share with the world your beautiful recipe",
};

type pageProps = {};
const page: React.FC<pageProps> = ({}) => {
  return <CreateUpdateRecipe />;
};

export default page;
