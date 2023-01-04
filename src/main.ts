import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { MongoExceptionFilter } from './Exceptions/Mongo.exception';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new MongoExceptionFilter());
  app.use(cookieParser());
  app.use(
    session({
      name: 'JWT',
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60 * 60,
        httpOnly: true,
        secure: false,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
