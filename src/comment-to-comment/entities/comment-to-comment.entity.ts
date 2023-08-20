import { Column, Entity, ManyToOne } from 'typeorm';

import { CommentEntity } from '../../comment/entities/comment.entity';
import { BaseEntity } from '@shared/database/entities/base.entity';
import { UserEntity } from 'src/user/entities/user.entity';

import { databaseTables } from '@shared/database/constants';

@Entity({ name: databaseTables.commentsToComments })
export class CommentToCommentEntity extends BaseEntity {
  @Column()
  comment: string;

  @ManyToOne(() => UserEntity)
  fromUser: UserEntity;

  @Column()
  userId: number;

  @ManyToOne(() => CommentEntity, (comment) => comment.comments)
  toComment: CommentEntity;

  @Column()
  commentId: number;
}
