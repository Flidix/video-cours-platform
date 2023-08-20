import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common';

import { RatingService } from './rating.service';

import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

import { CurrentUser } from 'src/auth/decorators/curentUser';

import { CreteRatingDto } from './dtos/crete-rating.dto';
import { UpdateRatingDto } from './dtos/update-rating.dto';

@UseGuards(JwtAuthGuard)
@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  createRating(@CurrentUser('id') userId: number, @Body() dto: CreteRatingDto) {
    return this.ratingService.creteRating(dto, userId);
  }

  @Delete(':id')
  deleteRating(@CurrentUser('id') userId: number, @Param('id') id: number) {
    return this.ratingService.deleteRating(id, userId);
  }

  @Patch()
  updateRating(@CurrentUser('id') userId: number, @Body() dto: UpdateRatingDto) {
    return this.ratingService.updateRating(dto, userId);
  }
}
