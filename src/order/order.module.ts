import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { getJwtConfig } from 'src/config/jwtr.config';

import { OrderController } from './order.controller';

import { OrderService } from './order.service';
import { ByedCoursesService } from 'src/byed-courses/byed-courses.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, ByedCoursesService],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
})
export class OrderModule {}
