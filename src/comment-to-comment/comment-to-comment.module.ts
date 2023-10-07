import { Module } from '@nestjs/common';

import { CommentToCommentController } from './comment-to-comment.controller';

import { CommentToCommentService } from './comment-to-comment.service';

@Module({
  controllers: [CommentToCommentController],
  providers: [CommentToCommentService],
  imports: [],
})
export class CommentToCommentModule {}
