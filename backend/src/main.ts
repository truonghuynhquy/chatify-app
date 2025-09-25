import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    // Default: ['log', 'error', 'warn', 'debug', 'verbose']
  });
  console.log(
    'Running frontend from:',
    join(__dirname, '..', '..', 'frontend', 'dist'),
  );
  app.use(express.static(join(__dirname, '..', '..', 'frontend', 'dist')));

  await app.listen(process.env.PORT ?? 3000);
  Logger.log(
    `🚀 App đang chạy ở http://localhost:${process.env.PORT || 3000}`,
    'Bootstrap',
  );
}
bootstrap();
