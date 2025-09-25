import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    // Default: ['log', 'error', 'warn', 'debug', 'verbose']
  });
  await app.listen(process.env.PORT ?? 3001);
  Logger.log(
    `🚀 App đang chạy ở http://localhost:${process.env.PORT || 3001}`,
    'Bootstrap',
  );
}
bootstrap();
