type RecipeDetailProps = {
  params: {
    slug: string;
    id: string;
  };
};
const RecipeDetail: React.FC<RecipeDetailProps> = ({ params }) => {
  return (
    <>
      {params.slug} {params.id}
    </>
  );
};

export default RecipeDetail;
