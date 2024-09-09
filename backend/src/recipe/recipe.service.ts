import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Recipe } from '@prisma/client';
import { PaginatedResult, PaginateFunction, paginator } from 'shared/paginator';
import { DatabaseService } from 'src/database/database.service';

const paginate: PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class RecipeService {
  constructor(private readonly databaseService: DatabaseService) {}
  async findAll(page: number = 1): Promise<PaginatedResult<Recipe>> {
    return paginate(
      this.databaseService.recipe,
      {
        orderBy: {
          dateCreated: 'desc',
        },
      },
      {
        page,
      },
    );
  }

  async findOne(id: number) {
    const res = await this.databaseService.recipe.findUnique({
      where: {
        id,
      },
    });

    if (!res) {
      throw new NotFoundException();
    }

    return res;
  }

  async create(data: Prisma.RecipeCreateInput) {
    return this.databaseService.recipe.create({
      data: {
        ...data,
        slug: this.slugify(data.title || ''),
      },
    });
  }

  async update(id: number, data: Prisma.RecipeUpdateInput) {
    await this.findOne(id);
    return this.databaseService.recipe.update({
      where: {
        id,
      },
      data: {
        ...data,
        ...(data.title && { slug: this.slugify(data.title as string) }),
      },
    });
  }

  async destroy(id: number) {
    await this.findOne(id);
    this.databaseService.recipe.delete({ where: { id } });
  }

  private slugify(value: string) {
    return value.split(' ').join('-');
  }
}
