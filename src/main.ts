import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const logger = new Logger('NestApplication')
  const port: number = config.get('service.port');
  await app.listen(port, () => {
    logger.log(`Service started on Port ${port}`);
  });
}
bootstrap();
