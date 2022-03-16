import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  const options = new DocumentBuilder()
    .setTitle('Ciudad Salud')
    .setDescription('Documentacion de la api')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/docs', app, document);

  await app.listen(process.env.SERVER_PORT);
  console.info(`Server run on port: ${process.env.SERVER_PORT}`);
}
bootstrap();
