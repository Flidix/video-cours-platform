import { Controller } from '@nestjs/common';
import { ByedCoursesService } from './byed-courses.service';

@Controller('byed-courses')
export class ByedCoursesController {
  constructor(private readonly byedCoursesService: ByedCoursesService) {}
}
