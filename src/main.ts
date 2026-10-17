import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((e: unknown) => {
  const logger = new Logger('Bootstrap');

  if (e instanceof Error) {
    logger.error(e.message, e.stack);
  } else {
    logger.error(String(e));
  }
  process.exitCode = 1;
});
