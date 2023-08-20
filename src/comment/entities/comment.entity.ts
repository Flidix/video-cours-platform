import {BaseEntity} from "@shared/database/entities/base.entity";
import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
import {databaseTables} from "@shared/database/constants";
import { UserEntity } from "src/user/entities/user.entity";
import { VideoEntity } from "src/video/entities/video.entity";
import { CommentToCommentEntity } from "src/comment-to-comment/entities/comment-to-comment.entity";

@Entity({name: databaseTables.comments})
export class CommentEntity extends BaseEntity{
   @Column()
   comment: string

   @ManyToOne(() => UserEntity)
   fromUser: UserEntity;

   @Column()
   userId: number

   @ManyToOne(() => VideoEntity, (video) => video.comments)
   toVideo: VideoEntity;

   @OneToMany(() => CommentToCommentEntity, (commentToComment) => commentToComment.toComment)
   comments: CommentToCommentEntity[]
}
