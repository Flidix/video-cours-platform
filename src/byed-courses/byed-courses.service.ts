import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@shared/database/services/database.service';

@Injectable()
export class ByedCoursesService extends DatabaseService {
  async cretedByedCourse(userId: number, courseId: number) {
    const fromUser = await this.database.users.findOneOrFail({ where: { id: userId } });
    const cours = await this.database.courses.findOneOrFail({ where: { id: courseId } });
    await this.database.buedCourses.checkNotExists({ userId, courseId });
    await this.database.buedCourses.create({ userId, courseId, cours, fromUser });
  }
}
