import { Controller, Param, Post, UseGuards } from '@nestjs/common';

import { SubscribeService } from './subscribe.service';

import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

import { CurrentUser } from 'src/auth/decorators/curentUser';

@UseGuards(JwtAuthGuard)
@Controller('subscribe')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @Post(':id')
  async addLikeToBook(@CurrentUser('id') userId: number, @Param('id') coursId: number) {
    return await this.subscribeService.subscribe(coursId, userId);
  }
}
