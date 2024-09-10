import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from './database/database.module';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [
    DatabaseModule,
    RecipeModule,
    ThrottlerModule.forRoot([
      {
        name: 'bots',
        ttl: 1000,
        limit: 15,
      },
      {
        name: 'client',
        ttl: 60 * 1000,
        limit: 100,
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
