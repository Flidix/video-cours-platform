import { Module } from '@nestjs/common';

import { ByedCoursesController } from './byed-courses.controller';

import { ByedCoursesService } from './byed-courses.service';

@Module({
  controllers: [ByedCoursesController],
  providers: [ByedCoursesService],
})
export class ByedCoursesModule {}
