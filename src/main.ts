import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    '/graphql',
    rateLimit({
      windowMs: 60 * 1000,
      max: 1,
      message: 'Too many requests, try again after 5 minutes...',
      standardHeaders: true
    })
  )

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap()
  .then(() => console.log('Server is running...'))
  .catch((err) => console.error(err));
