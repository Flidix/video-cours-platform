import { Module } from '@nestjs/common';

import { OrderController } from './order.controller';

import { OrderService } from './order.service';
import { AuthService } from 'src/auth/auth.service';
import { ByedCoursesService } from 'src/byed-courses/byed-courses.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, ByedCoursesService, AuthService],
  imports: [],
})
export class OrderModule {}
