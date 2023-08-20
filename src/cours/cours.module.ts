import { Module } from '@nestjs/common';
import { CoursService } from './cours.service';
import { CoursController } from './cours.controller';
import { FileService } from 'src/file/file.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/config/jwtr.config';
import { CategoryService } from 'src/category/category.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [CoursController],
  providers: [CoursService, FileService, CategoryService, UserService],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
})
export class CoursModule {}
