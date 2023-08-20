import { DatabaseRepository } from '../repositories/database.repository';
import {UserEntity} from "../../../user/entities/user.entity";
import { SubscribeEntity } from 'src/subscribe/entities/subscribe.entity';
import { CoursEntity } from 'src/cours/entities/cours.entity';
import { RatingEntity } from 'src/rating/entities/rating.entity';
import { VideoEntity } from 'src/video/entities/video.entity';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import { LikeEntity } from 'src/like/entities/like.entity';
import { ListenEntity } from 'src/listen/entities/listen.entity';
import { BuedCoursesEntity } from 'src/byed-courses/entities/bued-courses.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { CoursToCategory } from 'src/category/entities/cours-to-category.entity';
import { CommentToCommentEntity } from 'src/comment-to-comment/entities/comment-to-comment.entity';

export type DatabaseEntitiesType = {
  users: UserEntity,
  subscribes: SubscribeEntity,
  courses: CoursEntity,
  ratings: RatingEntity,
  videos: VideoEntity,
  comments: CommentEntity,
  likes: LikeEntity,
  listens: ListenEntity,
  buedCourses: BuedCoursesEntity,
  orders: OrderEntity,
  categories: CategoryEntity,
  coursToCategory: CoursToCategory,
  commentsToComments: CommentToCommentEntity
};

export type DatabaseRepositories = {
  [table in keyof DatabaseEntitiesType]: DatabaseRepository<DatabaseEntitiesType[table]>;
};
