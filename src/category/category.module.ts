import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { getJwtConfig } from 'src/config/jwtr.config';

import { CategoryController } from './category.controller';

import { CategoryService } from './category.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, UserService],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
})
export class CategoryModule {}
