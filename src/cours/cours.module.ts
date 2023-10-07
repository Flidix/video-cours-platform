import { Module } from '@nestjs/common';

import { CoursController } from './cours.controller';

import { CoursService } from './cours.service';
import { CategoryService } from 'src/category/category.service';
import { FileService } from 'src/file/file.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [CoursController],
  providers: [CoursService, FileService, CategoryService, UserService],
  imports: [],
})
export class CoursModule {}
