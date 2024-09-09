import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDTto } from './dto/update-recipe.dto';
import { RecipeService } from './recipe.service';

@Controller('recipes')
export class RecipeController {
  /*
        Recipe controller
        handles crud operations for recipes
        
    */
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  findAll(@Query('page') page?: string) {
    const page_ = page && !isNaN(page as any) ? +page : 1;
    return this.recipeService.findAll(page_);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.recipeService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  createRecipe(@Body(ValidationPipe) data: CreateRecipeDto) {
    return this.recipeService.create(data);
  }

  @Patch(':id')
  partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) data: UpdateRecipeDTto,
  ) {
    return this.recipeService.update(id, data);
  }

  @Put(':id')
  updateRecipe(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) data: CreateRecipeDto,
  ) {
    return this.recipeService.update(id, data);
  }
  @Delete(':id')
  @HttpCode(204)
  destroyRecipe(@Param('id', ParseIntPipe) id: number) {
    return this.recipeService.destroy(id);
  }
}
