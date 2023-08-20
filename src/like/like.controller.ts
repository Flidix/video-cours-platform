import { Controller, Param, Post, UseGuards } from '@nestjs/common';

import { LikeService } from './like.service';

import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

import { CurrentUser } from 'src/auth/decorators/curentUser';

@UseGuards(JwtAuthGuard)
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post(':id')
  async addLikeToBook(@CurrentUser('id') userId: number, @Param('id') coursId: number) {
    return await this.likeService.likeCours(coursId, userId);
  }
}
