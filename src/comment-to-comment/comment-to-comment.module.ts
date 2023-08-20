import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { getJwtConfig } from 'src/config/jwtr.config';

import { CommentToCommentController } from './comment-to-comment.controller';

import { CommentToCommentService } from './comment-to-comment.service';

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
