import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { OrderService } from './order.service';

import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

import { CurrentUser } from 'src/auth/decorators/curentUser';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  createOrder(@CurrentUser('id') userId: number, @Param('id') id: number) {
    return this.orderService.createOrder(id, userId);
  }

  @Get('user/:userId/cours/:courseId/order/:orderId/success')
  complateOrder(
    @Param('userId') userId: number,
    @Param('courseId') courseId: number,
    @Param('orderId') orderId: number,
  ) {
    return this.orderService.complateOrder(userId, courseId, orderId);
  }
}
