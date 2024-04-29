import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { WsAdapter } from './ws.adapter';
//import * as cookieParser from 'cookie-parser';
//import { WsAdapter } from '@nestjs/websockets';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3020);
}
bootstrap();
