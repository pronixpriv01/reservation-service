import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  console.log('Auth Laden');
  const app = await NestFactory.create(AuthModule);
  console.log('Auth Module erstellt');
  const configService = app.get(ConfigService);
  console.log('Config Service');
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('TCP_PORT'),
    },
  });
  console.log('TCP Verbindung hergestellt');
  app.use(cookieParser());
  console.log('Cookies wurden injected');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  console.log('Pipe wurde Validiert');
  app.useLogger(app.get(Logger));
  console.log('Logger initialisiert');
  await app.startAllMicroservices();
  console.log('Alle Microservices wurden gestartet');
  await app.listen(configService.get('HTTP_PORT'));
  console.log('Config Services wurden geladen');
}
bootstrap();

// mongodb+srv://pronixpriv:rootadmin@nestjs-microservices.rrt3v.mongodb.net/sleepr?retryWrites=true&w=majority //MONGO URi
