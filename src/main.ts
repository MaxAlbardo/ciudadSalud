import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      validationError: {
        target: false,
      },
      exceptionFactory: (errors: ValidationError[]) => {
        const e = errors.map((error) => {
          const tmp = {};
          tmp[error.property] = [];
          const keys = Object.keys(error.constraints);
          keys.forEach((key) => {
            tmp[error.property].push(error.constraints[key]);
          });
          return tmp;
        });
        return new UnprocessableEntityException(e);
      },
    }),
  );
  await app.listen(process.env.SERVER_PORT);
  console.info(`Server run on port: ${process.env.SERVER_PORT}`);
}
bootstrap();
