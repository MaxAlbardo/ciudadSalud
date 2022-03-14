import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(process.env.SERVER_PORT);
  app.useGlobalPipes(new ValidationPipe());
  console.info(`Server run on port: ${process.env.SERVER_PORT}`);
}
bootstrap();
