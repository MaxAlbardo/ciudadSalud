import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.SERVER_PORT);
  console.info(`Server run on port: ${process.env.SERVER_PORT}`);
}
bootstrap();
