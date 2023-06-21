import { Logger, ValidationPipe } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import cookieParser from 'cookie-parser';

import { Environment } from '@shared/variables/environment';

import { RootModule } from './root.module';

import { ResponseInterceptor } from '@shared/common/interceptors/response.interceptor';

(async () => {
  const app = await NestFactory.create(RootModule);
  const swagger = new DocumentBuilder()
    .setTitle('Nest Typeorm starter')
    .setVersion('1.0')
    .addCookieAuth('accessToken')
    .addCookieAuth('refreshToken')
    .build();

  app.use(cookieParser());
  app.setGlobalPrefix(Environment.API_PREFIX);
  app.enableCors({
    credentials: true,
    origin: Environment.ALLOWED_ORIGINS.split(';'),
  });
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  const swaggerDocument = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup(`${Environment.API_PREFIX}/docs`, app, swaggerDocument);

  await app.listen(Environment.PORT, () => {
    Logger.log(`Api started on port ${Environment.PORT}`, NestApplication.name);
  });
})();
