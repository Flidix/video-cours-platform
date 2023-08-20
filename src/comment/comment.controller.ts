import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { CurrentUser } from 'src/auth/decorators/curentUser';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  createComment(@CurrentUser("id") userId: number, @Body() dto: CreateCommentDto){
    return this.commentService.createComment(dto, userId);
  }

  @Delete(':id')
  deleteComment(@CurrentUser("id") userId: number, @Param('id') id: number){
    return this.commentService.deleteComment(id, userId);
  }

  @Patch()
  updateComment(@CurrentUser("id") userId: number, @Body() dto: UpdateCommentDto) {
    return this.commentService.updateComment(dto, userId);
  }

}
