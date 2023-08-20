import { Module } from '@nestjs/common';
import { ListenService } from './listen.service';
import { ListenController } from './listen.controller';

@Module({
  controllers: [ListenController],
  providers: [ListenService]
})
export class ListenModule {}
