import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@shared/database/services/database.service';

@Injectable()
export class LikeService extends DatabaseService {
  async likeCours(coursId: number, userId: number) {
    const data = { fromUser: { id: userId }, toCours: { id: coursId } };
    const isLiked = await this.database.likes.findOne({ where: { ...data } });
    const cours = await this.database.courses.findOneOrFail({ where: { id: coursId } });

    if (isLiked) {
      cours.likesCount -= 1;
      await this.database.likes.delete({ id: isLiked.id });
    } else {
      cours.likesCount += 1;
      await this.database.likes.create({ ...data });
    }

    await this.database.courses.save(cours);
    return !isLiked;
  }
}
