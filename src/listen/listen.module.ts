import { Module } from '@nestjs/common';

import { ListenController } from './listen.controller';

import { ListenService } from './listen.service';

@Module({
  controllers: [ListenController],
  providers: [ListenService],
})
export class ListenModule {}
