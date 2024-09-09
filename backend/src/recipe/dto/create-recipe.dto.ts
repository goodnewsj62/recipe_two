import { JsonArray } from '@prisma/client/runtime/library';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class Ingredient {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  amount: string;
}

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  instructions: string;
  @IsString()
  @IsNotEmpty()
  image: string;

  @ArrayNotEmpty()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Ingredient)
  ingredients: JsonArray[];
}
