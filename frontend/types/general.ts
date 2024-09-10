export type navLinkProps = {
  link: string;
  icon: string;
  text: string;
  iconSize?: number;
};

export type ingredientType = { name: string; amount: string };

export type incomingData<T> = {
  data: T;
  status: "success" | "error";
  message: string;
};

export type paginatedResponse<U> = {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number;
  next: number;
  results: U[];
};

export type recipeType = {
  id: number;
  image: string;
  title: string;
  ingredients: ingredientType[];
  instructions: string;
  slug: string;
  date_created: string;
  username: string;
};

export type RecipeList = incomingData<paginatedResponse<recipeType>>;
