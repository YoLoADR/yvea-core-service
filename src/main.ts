import { ToLowerCasePipe, TrimPipe } from '@libs/pipes';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { json, urlencoded } from 'express';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { AppModule } from './app.module';
import { createPartnersCategories } from './libs/database/scripts';
import { CategoriesService } from './modules/partners/services/categories/categories.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(json({ limit: '1gb' }));
  app.use(urlencoded({ extended: true, limit: '1gb' }));

  app.enableCors({
    origin: true,
    methods: 'GET,PUT,POST,OPTIONS,DELETE',
    credentials: true,
  });

  app.use(cookieParser());

  app.useGlobalPipes(
    new TrimPipe(),
    new ToLowerCasePipe(),
    new I18nValidationPipe({ transform: true, whitelist: true }),
  );

  app.useGlobalFilters(
    new I18nValidationExceptionFilter({ detailedErrors: false }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('YVEA')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  createPartnersCategories(app.get(CategoriesService));

  await app.listen(process.env.PORT || 8000);
}
bootstrap();
