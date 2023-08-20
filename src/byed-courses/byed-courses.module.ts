import { Module } from '@nestjs/common';
import { ByedCoursesService } from './byed-courses.service';
import { ByedCoursesController } from './byed-courses.controller';

@Module({
  controllers: [ByedCoursesController],
  providers: [ByedCoursesService]
})
export class ByedCoursesModule {}
