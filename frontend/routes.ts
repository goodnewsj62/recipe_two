export default Object.freeze({
  // AUTH
  HOME_PAGE: "/",
  // REGISTER_PAGE: "/register",
  LOGIN: "/login",
  CREATE: "/create-recipe",
  EDIT: "/edit/:id",
  MYRECIPE: "/:u/my-recipe",
  ABOUT: "/about",
  RECIPE: "/recipe/:slug/:id",

  BACKEND: {
    RECIPES: "/api/v1/recipes",
    RECIPE_DETAIL: "/api/v1/recipes/:id",
    UPLOAD_IMAGE: "/image",
  },
});
