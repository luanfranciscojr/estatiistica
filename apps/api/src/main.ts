import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configuredOrigin = process.env.APP_ORIGIN ?? 'http://localhost:5173';
  const configuredUrl = new URL(configuredOrigin);
  const allowedOrigins = new Set([
    configuredOrigin,
    `http://localhost:${configuredUrl.port || '5173'}`,
    `http://127.0.0.1:${configuredUrl.port || '5173'}`,
  ]);

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [...allowedOrigins],
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = Number(process.env.PORT ?? 3001);
  await app.listen(port);
}

bootstrap();
