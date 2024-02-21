import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { HealthModule, LoggerModule } from '@app/common';
=======
import { LoggerModule } from '@app/common';
>>>>>>> origin/master
import { JwtModule } from '@nestjs/jwt';
import * as Joi from 'joi';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
<<<<<<< HEAD
=======
import { HealthModule } from '@app/common/health/health.module';
>>>>>>> origin/master

@Module({
  imports: [
    UsersModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_DB_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        HTTP_PORT: Joi.string().required(),
        TCP_PORT: Joi.string().required(),
      }),
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
        },
      }),
      inject: [ConfigService],
    }),
    HealthModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
