import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { getJwtConfig } from 'src/config/jwtr.config';

import { VideoController } from './video.controller';

import { VideoService } from './video.service';
import { FileService } from 'src/file/file.service';
import { ListenService } from 'src/listen/listen.service';

@Module({
  controllers: [VideoController],
  providers: [VideoService, FileService, ListenService],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
})
export class VideoModule {}
