import { Module } from '@nestjs/common';

import { CategoryController } from './category.controller';

import { FileService } from '../file/file.service';
import { CategoryService } from './category.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, UserService, FileService],
  imports: [],
})
export class CategoryModule {}
