import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';

import { FileService } from '../file/file.service';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, FileService],
  imports: [],
})
export class AuthModule {}
