import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
