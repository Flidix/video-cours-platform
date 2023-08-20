import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@shared/database/services/database.service';

import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';

@Injectable()
export class CommentService extends DatabaseService {
  async createComment(dto: CreateCommentDto, userId: number) {
    const user = await this.database.users.findOneOrFail({ where: { id: userId } });
    const toVideo = await this.database.videos.findOneOrFail({ where: { id: dto.videoId } });
    return await this.database.comments.create({ ...dto, fromUser: user, userId, toVideo });
  }

  async deleteComment(commentId: number, userId: number) {
    await this.database.comments.findOneOrFail({ where: { id: commentId, userId } });
    await this.database.commentsToComments.delete({ commentId: commentId });
    await this.database.comments.delete({ id: commentId });
    return true;
  }

  async updateComment(dto: UpdateCommentDto, userId: number) {
    await this.database.comments.findOneOrFail({ where: { id: dto.commentId, userId } });
    await this.database.comments.update({ id: dto.commentId }, { comment: dto.comment });
    return true;
  }
}
