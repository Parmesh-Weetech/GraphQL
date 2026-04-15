import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import rateLimit from 'express-rate-limit';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    '/graphql',
    rateLimit({
      windowMs: 5 * 60 * 1000, // 5 minutes
      max: 10, // 10 requests allowed
      message: 'Too many requests, try again after 5 minutes...',
      standardHeaders: true,
      keyGenerator: (req) => req.ip ?? req.socket?.remoteAddress ?? 'unknown',
    })
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap()
  .then(() => console.log('Server is running...'))
  .catch((err) => console.error(err));
