import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from '@shared/database/database.module';
import { SubscribeModule } from './subscribe/subscribe.module';
import { CoursModule } from './cours/cours.module';
import { RatingModule } from './rating/rating.module';
import { VideoModule } from './video/video.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { ListenModule } from './listen/listen.module';
import { ByedCoursesModule } from './byed-courses/byed-courses.module';
import { OrderModule } from './order/order.module';
import path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CategoryModule } from './category/category.module';
import { CommentToCommentModule } from './comment-to-comment/comment-to-comment.module';

@Module({
  imports: [
    DatabaseModule, 
    UserModule, 
    AuthModule, 
    SubscribeModule, 
    CoursModule, 
    RatingModule, 
    VideoModule, 
    CommentModule, 
    LikeModule, 
    ListenModule, 
    ByedCoursesModule, 
    OrderModule,
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static'), }),
    CategoryModule,
    CommentToCommentModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class RootModule {}
