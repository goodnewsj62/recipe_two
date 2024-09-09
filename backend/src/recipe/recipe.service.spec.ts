import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { recipeData } from 'shared/fixtures';
import { DatabaseService } from 'src/database/database.service';
import { RecipeService } from './recipe.service';

describe('RecipeService', () => {
  let service: RecipeService;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipeService,
        {
          provide: DatabaseService,
          useValue: mockDeep<PrismaClient>(),
        },
      ],
    }).compile();

    service = module.get<RecipeService>(RecipeService);
    prisma = module.get(DatabaseService);
  });

  it('throws when not found', async () => {
    prisma.recipe.findUnique.mockResolvedValue(null);

    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    await expect(service.update(1, recipeData(1))).rejects.toThrow(
      NotFoundException,
    );
    await expect(service.destroy(1)).rejects.toThrow(NotFoundException);
  });

  it('test pagination', async () => {
    prisma.recipe.findMany.mockResolvedValue(
      new Array(100).fill(undefined).map((_, index) => recipeData(index + 1)),
    );
    prisma.recipe.count.mockResolvedValue(100);

    expect((await service.findAll(1)).currentPage).toBe(1);
    expect((await service.findAll(1)).lastPage).toBe(10);
  });
});
