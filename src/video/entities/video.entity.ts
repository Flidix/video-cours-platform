import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from '@shared/database/entities/base.entity';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import { CoursEntity } from 'src/cours/entities/cours.entity';
import { UserEntity } from 'src/user/entities/user.entity';

import { databaseTables } from '@shared/database/constants';

@Entity({ name: databaseTables.videos })
export class VideoEntity extends BaseEntity {
  @Column()
  video: string;

  @Column()
  description: string;

  @Column()
  name: string;

  @Column({ default: 0 })
  likesCount: number;

  @ManyToOne(() => UserEntity)
  fromUser: UserEntity;

  @ManyToOne(() => CoursEntity, (cours) => cours.videos)
  toCours: CoursEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.toVideo)
  comments: CommentEntity[];

  @Column()
  userId: number;
}
