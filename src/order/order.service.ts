import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { authEmailPage } from 'src/auth/pages/auth-email.page';
import Stripe from 'stripe';
import { DataSource } from 'typeorm';

import { Environment } from '@shared/variables/environment';

import { DatabaseService } from '@shared/database/services/database.service';
import { AuthService } from 'src/auth/auth.service';
import { ByedCoursesService } from 'src/byed-courses/byed-courses.service';

@Injectable()
export class OrderService extends DatabaseService {
  private readonly stripe: Stripe;

  constructor(
    @InjectDataSource() datasource: DataSource,
    private readonly byedCoursesService: ByedCoursesService,
    private readonly authService: AuthService,
  ) {
    super(datasource);
    this.stripe = new Stripe(Environment.STRIPE_SECRET, { apiVersion: '2023-08-16' });
  }

  async createOrder(courseId: number, userId: number) {
    const cours = await this.database.courses.findOneOrFail({
      where: { id: courseId },
      relations: { user: true },
    });
    const user = await this.database.users.findOneOrFail({ where: { id: userId } });
    const order = await this.database.orders.create({
      courseId,
      userId,
      fromUser: user,
      toCours: cours,
      price: cours.price,
    });

    const pay = await this.stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Example Product',
            },
            unit_amount: order.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // eslint-disable-next-line max-len
      success_url: `http://localhost:8000/api/order/user/${userId}/cours/${courseId}/order/${order.id}/course-user/${cours.user.id}/email`,
      cancel_url: 'http://localhost:3000/cancel',
    });
    return pay.url;
  }

  async sendEmail(userId: number, courseId: number, orderId: number, courseUserId: number) {
    const user = await this.database.users.findOneOrFail({ where: { id: userId } });
    const html = authEmailPage(
      `http://localhost:8000/api/order/user/${userId}/cours/${courseId}/order/${orderId}/course-user/${courseUserId}/success`,
    );
    await this.authService.sendEmail(user.email, html);
    return true;
  }

  async complateOrder(userId: number, courseId: number, orderId: number, courseUserId: number) {
    const user = await this.database.users.findOneOrFail({ where: { id: userId } });
    const order = await this.database.orders.findOneOrFail({
      where: { id: orderId, isPaid: false },
    });
    const cours = await this.database.courses.findOneOrFail({ where: { id: courseId } });
    const currentTime = new Date();
    const createdAtTime = new Date(user.lastLoginAt);
    const timeDifferenceMinutes = Math.floor(
      (currentTime.getTime() - createdAtTime.getTime()) / (1000 * 60),
    );
    if (timeDifferenceMinutes >= 2) {
      throw new BadRequestException('User was created less than 2 minutes ago');
    }
    if (!cours.isOficial) {
      await this.database.users.update({ id: courseUserId }, { money: order.price * 0.8 });
    }
    await this.database.orders.update({ id: orderId }, { isPaid: true });
    await this.byedCoursesService.cretedByedCourse(userId, courseId);
    return true;
  }
}
