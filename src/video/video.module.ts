import { Module } from '@nestjs/common';

import { VideoController } from './video.controller';

import { VideoService } from './video.service';
import { FileService } from 'src/file/file.service';
import { ListenService } from 'src/listen/listen.service';

@Module({
  controllers: [VideoController],
  providers: [VideoService, FileService, ListenService],
  imports: [],
})
export class VideoModule {}
