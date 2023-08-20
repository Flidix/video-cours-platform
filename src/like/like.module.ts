import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { getJwtConfig } from 'src/config/jwtr.config';

import { LikeController } from './like.controller';

import { LikeService } from './like.service';

@Module({
  controllers: [LikeController],
  providers: [LikeService],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
})
export class LikeModule {}
