import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@shared/database/services/database.service';

import { CreteRatingDto } from './dtos/crete-rating.dto';
import { UpdateRatingDto } from './dtos/update-rating.dto';

@Injectable()
export class RatingService extends DatabaseService {
  async calculateAverageRating(coursId: number, stars?: number) {
    const cours = await this.database.courses.findOneOrFail({
      where: { id: coursId },
      relations: { ratings: true },
    });
    if (cours.ratings.length !== 0) {
      const averageRating = Math.floor(
        cours.ratings.reduce((sum, rating) => sum + rating.stars, 0) / cours.ratings.length,
      );
      cours.stars = averageRating;
      await this.database.courses.update({ id: cours.id }, { stars: averageRating });
    } else {
      await this.database.courses.update({ id: cours.id }, { stars: stars || 0 });
    }
  }

  async creteRating(dto: CreteRatingDto, userId: number) {
    await this.database.buedCourses.findOneOrFail({where: { userId, courseId: dto.coursId }});
    const user = await this.database.users.findOneOrFail({ where: { id: userId } });
    const cours = await this.database.courses.findOneOrFail({ where: { id: dto.coursId } });

    const rating = await this.database.ratings.create({
      description: dto.description,
      stars: dto.stars,
      fromUser: user,
      toCours: cours,
      courseId: dto.coursId,
      userId: userId,
    });
    await this.calculateAverageRating(dto.coursId, dto.stars);
    return rating;
  }

  async deleteRating(ratingId: number, userId: number) {
    const rating = await this.database.ratings.findOneOrFail({
      where: { id: ratingId, userId: userId },
    });
    await this.calculateAverageRating(rating.courseId);
    await this.database.ratings.delete({ id: ratingId });
    return true;
  }

  async updateRating(dto: UpdateRatingDto, userId: number) {
    const { description, stars } = dto;
    const rating = await this.database.ratings.findOneOrFail({
      where: { id: dto.ratingId, userId: userId },
    });
    await this.calculateAverageRating(rating.courseId);
    await this.database.ratings.update({ id: dto.ratingId }, { description, stars });
    return true;
  }
}
