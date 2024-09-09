import { NestFactory } from '@nestjs/core';
import serverModifier from 'shared/server';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 8000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  serverModifier(app);
  await app.listen(PORT);
}
bootstrap();
