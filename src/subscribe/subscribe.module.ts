import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { getJwtConfig } from 'src/config/jwtr.config';

import { SubscribeController } from './subscribe.controller';

import { SubscribeService } from './subscribe.service';

@Module({
  controllers: [SubscribeController],
  providers: [SubscribeService],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
})
export class SubscribeModule {}
