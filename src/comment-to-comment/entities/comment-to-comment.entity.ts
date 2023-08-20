import {BaseEntity} from "@shared/database/entities/base.entity";
import {Column, Entity, ManyToOne} from "typeorm";
import {databaseTables} from "@shared/database/constants";
import { UserEntity } from "src/user/entities/user.entity";
import { CommentEntity } from "src/comment/entities/comment.entity";

@Entity({name: databaseTables.commentsToComments})
export class CommentToCommentEntity extends BaseEntity{
   @Column()
   comment: string

   @ManyToOne(() => UserEntity)
   fromUser: UserEntity;

   @Column()
   userId: number

   @ManyToOne(() => CommentEntity, (comment) => comment.comments)
   toComment: CommentEntity;

   @Column()
   commentId: number

}
