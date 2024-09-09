import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { JsonArray } from '@prisma/client/runtime/library';
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';
import serverModifier from 'shared/server';
import { DatabaseService } from 'src/database/database.service';
import * as request from 'supertest';
import { recipeData } from '../shared/fixtures';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DatabaseService)
      .useValue(prismaMock)
      .compile();

    app = moduleFixture.createNestApplication();
    serverModifier(app);
    await app.init();
  });

  afterEach(() => {
    mockReset(prismaMock);
    app.close();
  });

  describe('get recipes', () => {
    it('get a list of all recipes', async () => {
      prismaMock.recipe.findMany.mockResolvedValue(
        new Array(100).fill(undefined).map((_, index) => recipeData(index + 1)),
      );
      prismaMock.recipe.count.mockResolvedValue(100);

      await request(app.getHttpServer()).get('/api/v1/recipes/').expect(200);

      expect(prismaMock.recipe.findMany).toHaveBeenCalled();
    });

    it('assert that respone is paginated', async () => {
      prismaMock.recipe.findMany.mockResolvedValue(
        new Array(100).fill(undefined).map((_, index) => recipeData(index + 1)),
      );
      prismaMock.recipe.count.mockResolvedValue(100);

      const resp = await request(app.getHttpServer())
        .get('/api/v1/recipes/?page=2')
        .expect(200);

      expect(prismaMock.recipe.findMany).toHaveBeenCalled();
      expect(resp.body.data.lastPage).toBe(10);
      expect(resp.body.data.currentPage).toBe(2);
    });

    it('get a single recipe', async () => {
      prismaMock.recipe.findUnique.mockResolvedValue(recipeData(1));
      const resp = await request(app.getHttpServer())
        .get('/api/v1/recipes/1')
        .expect(200);
      expect(resp.body.data.id).toBe(1);
    });
  });

  describe('create recipe', () => {
    it('test recipe creation', async () => {
      const data = {
        title: 'some recipe',
        slug: 'some-recipe',
        instructions: 'one or two pluto menia em',
        image: 'image-gafuck.jpeg',
        ingredients: [{ name: '2by2', amount: '1 spoon of salt' }] as JsonArray,
        username: 'joi',
      };
      prismaMock.recipe.create.mockResolvedValue({
        ...data,
        id: 1,
        dateCreated: new Date(),
      });

      const resp = await request(app.getHttpServer())
        .post('/api/v1/recipes')
        .send(data)
        .expect(201);

      expect(resp.body.data.slug).toEqual(data.slug);
    });

    it('test recipe fields are required from error message', async () => {
      const data = {};
      prismaMock.recipe.create.mockResolvedValue(recipeData(1));

      await request(app.getHttpServer())
        .post('/api/v1/recipes')
        .send(data)
        .expect(400);
    });
  });

  describe('update recipe', () => {
    it('test recipe patch', async () => {
      const data = {
        title: 'vile recipe',
      };
      prismaMock.recipe.findUnique.mockResolvedValue(recipeData(1));
      prismaMock.recipe.update.mockResolvedValue({
        ...recipeData(1),
        title: 'vile recipe',
      });
      const resp = await request(app.getHttpServer())
        .patch('/api/v1/recipes/1')
        .send(data)
        .expect(200);

      expect(resp.body.data.title).toEqual(data.title);
    });
  });

  describe('test destroy', () => {
    it('test successful deletion of recipe', async () => {
      prismaMock.recipe.findUnique.mockResolvedValue(recipeData(1));
      await request(app.getHttpServer())
        .delete('/api/v1/recipes/1')
        .expect(204);
    });
  });
});
