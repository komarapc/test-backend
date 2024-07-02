import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import fastifyStatic from '@fastify/static';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.register(fastifyStatic, {
    root: join(__dirname, '../../public'),
    prefix: '/public/',
  });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Test Backend')
    .setDescription('Test Backend')
    .setVersion('1.0')
    .setContact('izmikomar', 'https://izmikomar.com', 'komar.izmi@gmail.com')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
      // docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      syntaxHighlight: {
        activate: true,
        theme: 'arta',
      },
    },
    customCss: `.swagger-ui .topbar { display: none }`,
    customCssUrl: '../public/css/openapi-theme.css',
    customSiteTitle: 'API Docs',
    customfavIcon: '../public/nestjs-icon.svg',
  });
  await app.listen(3000);
}
bootstrap();
