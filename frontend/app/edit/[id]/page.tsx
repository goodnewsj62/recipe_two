import { Metadata } from "next";
import EditRecipe from "./EditRecipe";

type EditPageProps = { params: { slug: string; id: string } };

export function generateMetadata({ params }: EditPageProps): Metadata {
  const id = decodeURIComponent(params.id);

  return {
    title: `edit recipe ${id}`,
    description: `Change recipe details for ${id}`,
  };
}

const EditPage: React.FC<EditPageProps> = ({ params: { id } }) => {
  return <EditRecipe id={id} />;
};

export default EditPage;
