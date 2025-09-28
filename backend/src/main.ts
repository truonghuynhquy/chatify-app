import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as express from 'express';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    // Default: ['log', 'error', 'warn', 'debug', 'verbose']
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Body parser limit
  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ limit: '5mb', extended: false }));

  // Cors
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  });

  // Cookie parser
  app.use(cookieParser());

  console.log(
    'Running frontend from:',
    join(__dirname, '..', '..', 'frontend', 'dist'),
  );
  app.use(express.static(join(__dirname, '..', '..', 'frontend', 'dist')));

  await app.listen(process.env.PORT ?? 3000);
  Logger.log(
    `🚀 App is running ở http://localhost:${process.env.PORT || 3000}`,
    'Bootstrap',
  );
}
bootstrap();
