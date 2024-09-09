import { JsonArray } from '@prisma/client/runtime/library';

export const recipeData = (id: number) => ({
  id: id,
  title: 'some recipe',
  slug: 'some-recipe',
  instructions: 'one or two pluto menia em',
  image: 'image-gafuck.jpeg',
  ingredients: [{ name: '2by2', amount: '1 spoon of salt' }] as JsonArray,
  username: 'joi',
  dateCreated: new Date(),
});
