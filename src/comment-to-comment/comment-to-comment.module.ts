import { Module } from '@nestjs/common';
import { CommentToCommentService } from './comment-to-comment.service';
import { CommentToCommentController } from './comment-to-comment.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/config/jwtr.config';

@Module({
  controllers: [CommentToCommentController],
  providers: [CommentToCommentService],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
})
export class CommentToCommentModule {}
