import { NestFactory } from '@nestjs/core';
import { createRouteHandler } from 'uploadthing/express';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './response/response.interceptor';
import { uploadRouter } from './uploadThing/uploadthing';

const PORT = process.env.PORT || 8000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  });
  app.setGlobalPrefix('/api/v1', {
    exclude: [],
  });
  app.use(
    '/api/uploadthing',
    createRouteHandler({
      router: uploadRouter,
      config: {
        // callbackUrl: "https://a310-197-211-59-54.ngrok-free.app/",
      },
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(PORT);
}
bootstrap();
