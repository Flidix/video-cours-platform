import { Module } from '@nestjs/common';

import { UserController } from './user.controller';

import { FileService } from '../file/file.service';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, FileService],
  imports: [],
})
export class UserModule {}
