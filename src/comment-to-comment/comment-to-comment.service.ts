import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@shared/database/services/database.service';

import { CreateCommentToCommentDto } from './dtos/create-ccomment-to-comment.dto';
import { UpdateCommentToCommentDto } from './dtos/update-comment-to-comment.dto';

@Injectable()
export class CommentToCommentService extends DatabaseService {
  async creteComment(dto: CreateCommentToCommentDto, userId: number) {
    const user = await this.database.users.findOneOrFail({ where: { id: userId } });
    const comment = await this.database.comments.findOneOrFail({ where: { id: dto.commentId } });
    return await this.database.commentsToComments.create({
      ...dto,
      userId,
      fromUser: user,
      toComment: comment,
      commentId: dto.commentId,
    });
  }

  async deleteComment(commentId: number, userId: number) {
    const candidate = await this.database.commentsToComments.findOneOrFail({
      where: { id: commentId, userId },
    });
    await this.database.commentsToComments.delete({ id: candidate.id });
    return true;
  }

  async updateComment(dto: UpdateCommentToCommentDto, userId: number) {
    await this.database.commentsToComments.findOneOrFail({
      where: { id: dto.commentToCommentId, userId },
    });
    await this.database.commentsToComments.update(
      { id: dto.commentToCommentId },
      { comment: dto.comment },
    );
    return true;
  }
}
