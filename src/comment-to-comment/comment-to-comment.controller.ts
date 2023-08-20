import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common';

import { CommentToCommentService } from './comment-to-comment.service';

import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

import { CurrentUser } from 'src/auth/decorators/curentUser';

import { CreateCommentToCommentDto } from './dtos/create-ccomment-to-comment.dto';
import { UpdateCommentToCommentDto } from './dtos/update-comment-to-comment.dto';

@UseGuards(JwtAuthGuard)
@Controller('comment-to-comment')
export class CommentToCommentController {
  constructor(private readonly commentToCommentService: CommentToCommentService) {}

  @Post()
  createComment(@CurrentUser('id') userId: number, @Body() dto: CreateCommentToCommentDto) {
    return this.commentToCommentService.creteComment(dto, userId);
  }

  @Delete(':id')
  deleteComment(@CurrentUser('id') userId: number, @Param('id') id: number) {
    return this.commentToCommentService.deleteComment(id, userId);
  }

  @Patch()
  updateComment(@CurrentUser('id') userId: number, @Body() dto: UpdateCommentToCommentDto) {
    return this.commentToCommentService.updateComment(dto, userId);
  }
}
