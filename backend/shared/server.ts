import { INestApplication } from '@nestjs/common';
import { ResponseInterceptor } from 'src/response/response.interceptor';
import { createRouteHandler } from 'uploadthing/express';
import { uploadRouter } from 'uploadThing/uploadthing';

export default function serverModifier(app: INestApplication) {
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
        // callbackUrl: 'https://ed8f-129-205-124-205.ngrok-free.app',
      },
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());
}
