import routes from "./routes";

export const BACKEND_BASE_URL =
  process.env.BACKEND_BASE_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const MAX_UPLOAD_SIZE = 1024 * 1024 * 5;
export const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"];
export const SITELINKS = [
  {
    link: "/",
    text: "home",
  },
  {
    link: routes.MYRECIPE,
    text: "my recipe",
  },
  {
    link: routes.CREATE,
    text: "create",
  },
];

export const data = [
  {
    title: "Indomie Recipe",
    instructions: "",
    id: "1234",
    src: "https://minimalistbaker.com/wp-content/uploads/2023/09/Ultimate-Salmon-Burgers-7-500x750.jpg",
    slug: "indomie-recipe",
  },
  {
    title: "Fish pie recipe",
    instructions: "",
    id: "1236",
    src: "https://minimalistbaker.com/wp-content/uploads/2022/07/Black-Bean-Enchiladas-with-Creamy-Pumpkin-Sauce-Plant-based-SO-smoky-satisfying-minimalistbaker-recipe-plantbased-pumpkin-enchiladas-7-500x750.jpg",
    slug: "indomie-recipe",
  },
  {
    title: "Egusi soup",
    instructions: "",
    id: "1278",
    src: "https://lowcarbafrica.com/wp-content/uploads/2018/06/Egusi-Soup-IG-1.jpg",
    slug: "indomie-recipe",
  },
  {
    title: "Brown Bread",
    instructions: "",
    id: "1978",
    src: "https://minimalistbaker.com/wp-content/uploads/2018/12/PERFECT-Vegan-Gluten-Free-Banana-Bread-1-bowl-simple-ingredients-naturally-sweetened-and-fluffy-vegan-glutenfree-recipe-breakfast-bananabread-minimalistbaker-16.jpg",
    slug: "indomie-recipe",
  },
  {
    title: "Green Tea",
    instructions: "",
    id: "1918",
    src: "https://minimalistbaker.com/wp-content/uploads/2020/01/DELICIOUS-3-Ingredient-Applesauce-No-sugar-added-stovetop-1-pan-20-minutes-SO-satisfying-recipe-minimalistbaker-apples-plantbased-glutenfree-15.jpg",
    slug: "indomie-recipe",
  },
  {
    title: "Fish pie recipe",
    instructions: "",
    id: "1236",
    src: "https://minimalistbaker.com/wp-content/uploads/2022/07/Black-Bean-Enchiladas-with-Creamy-Pumpkin-Sauce-Plant-based-SO-smoky-satisfying-minimalistbaker-recipe-plantbased-pumpkin-enchiladas-7-500x750.jpg",
    slug: "indomie-recipe",
  },
  {
    title: "Brown Bread",
    instructions: "",
    id: "1978",
    src: "https://minimalistbaker.com/wp-content/uploads/2018/12/PERFECT-Vegan-Gluten-Free-Banana-Bread-1-bowl-simple-ingredients-naturally-sweetened-and-fluffy-vegan-glutenfree-recipe-breakfast-bananabread-minimalistbaker-16.jpg",
    slug: "indomie-recipe",
  },
  {
    title: "Brown Bread",
    instructions: "",
    id: "1978",
    src: "https://minimalistbaker.com/wp-content/uploads/2018/12/PERFECT-Vegan-Gluten-Free-Banana-Bread-1-bowl-simple-ingredients-naturally-sweetened-and-fluffy-vegan-glutenfree-recipe-breakfast-bananabread-minimalistbaker-16.jpg",
    slug: "indomie-recipe",
  },
  {
    title: "Green Tea",
    instructions: "",
    id: "1918",
    src: "https://minimalistbaker.com/wp-content/uploads/2020/01/DELICIOUS-3-Ingredient-Applesauce-No-sugar-added-stovetop-1-pan-20-minutes-SO-satisfying-recipe-minimalistbaker-apples-plantbased-glutenfree-15.jpg",
    slug: "indomie-recipe",
  },
  {
    title: "Indomie Recipe",
    instructions: "",
    id: "1234",
    src: "https://minimalistbaker.com/wp-content/uploads/2023/09/Ultimate-Salmon-Burgers-7-500x750.jpg",
    slug: "indomie-recipe",
  },
  {
    title: "Egusi soup",
    instructions: "",
    id: "1278",
    src: "https://lowcarbafrica.com/wp-content/uploads/2018/06/Egusi-Soup-IG-1.jpg",
    slug: "indomie-recipe",
  },
  {
    title: "Brown Bread",
    instructions: "",
    id: "1978",
    src: "https://minimalistbaker.com/wp-content/uploads/2018/12/PERFECT-Vegan-Gluten-Free-Banana-Bread-1-bowl-simple-ingredients-naturally-sweetened-and-fluffy-vegan-glutenfree-recipe-breakfast-bananabread-minimalistbaker-16.jpg",
    slug: "indomie-recipe",
  },
  {
    title: "Green Tea",
    instructions: "",
    id: "1918",
    src: "https://minimalistbaker.com/wp-content/uploads/2020/01/DELICIOUS-3-Ingredient-Applesauce-No-sugar-added-stovetop-1-pan-20-minutes-SO-satisfying-recipe-minimalistbaker-apples-plantbased-glutenfree-15.jpg",
    slug: "indomie-recipe",
  },
  {
    title: "Fish pie recipe",
    instructions: "",
    id: "1236",
    src: "https://minimalistbaker.com/wp-content/uploads/2022/07/Black-Bean-Enchiladas-with-Creamy-Pumpkin-Sauce-Plant-based-SO-smoky-satisfying-minimalistbaker-recipe-plantbased-pumpkin-enchiladas-7-500x750.jpg",
    slug: "indomie-recipe",
  },
  {
    title: "Brown Bread",
    instructions: "",
    id: "1978",
    src: "https://minimalistbaker.com/wp-content/uploads/2018/12/PERFECT-Vegan-Gluten-Free-Banana-Bread-1-bowl-simple-ingredients-naturally-sweetened-and-fluffy-vegan-glutenfree-recipe-breakfast-bananabread-minimalistbaker-16.jpg",
    slug: "indomie-recipe",
  },
  {
    title: "Brown Bread",
    instructions: "",
    id: "1978",
    src: "https://minimalistbaker.com/wp-content/uploads/2018/12/PERFECT-Vegan-Gluten-Free-Banana-Bread-1-bowl-simple-ingredients-naturally-sweetened-and-fluffy-vegan-glutenfree-recipe-breakfast-bananabread-minimalistbaker-16.jpg",
    slug: "indomie-recipe",
  },
];
