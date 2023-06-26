import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import config from '../config';
import { serve, setup } from 'swagger-ui-express';
import { readFileSync } from 'fs';
import * as YAML from 'yaml';
import { MyLogger } from './logger/logger.servise';

const { PORT } = config;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new MyLogger(),
  });
  app.useGlobalPipes(new ValidationPipe());

  const file = readFileSync('doc/api.yaml', 'utf8');
  const swaggerDocument = YAML.parse(file);

  // Specify the path to your OpenAPI specification file
  app.use('/doc', serve, setup(swaggerDocument));

  await app.listen(PORT);
}
bootstrap();
