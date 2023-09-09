import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    methods: ['POST', 'OPTIONS'],
    origin: ['https://itchy-seal-trousers.cyclic.cloud'],
  })
  await app.listen(process.env.PORT);
}
bootstrap();
