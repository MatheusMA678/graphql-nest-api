import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    methods: ['POST', 'OPTIONS', 'GET'],
    origin: ['*', 'studio.apollographql.com'],
    credentials: true
  })
  await app.listen(process.env.PORT);
}
bootstrap();
