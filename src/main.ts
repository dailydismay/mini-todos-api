import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ExtendedConfigService } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cfg = app.get<ExtendedConfigService>(ConfigService);
  const port = cfg.get('port');

  await app.listen(port);
}

bootstrap();
