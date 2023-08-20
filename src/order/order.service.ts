import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DatabaseService } from '@shared/database/services/database.service';
import { DataSource } from 'typeorm';
import Stripe from 'stripe';
import { Environment } from '@shared/variables/environment';
import { ByedCoursesService } from 'src/byed-courses/byed-courses.service';


@Injectable()
export class OrderService extends DatabaseService {
   private readonly stripe: Stripe;


   constructor(
      @InjectDataSource() datasource: DataSource,
      private readonly byedCoursesService: ByedCoursesService
      ) {
      super(datasource)
      this.stripe = new Stripe(Environment.STRIPE_SECRET, { apiVersion: '2023-08-16' });
    }

   async createOrder(courseId: number, userId: number) {
      const cours = await this.database.courses.findOneOrFail({where: {id: courseId}});
      const user = await this.database.users.findOneOrFail({where: {id: userId}});
      const order = await this.database.orders.create({
         courseId,
         userId,
         fromUser: user,
         toCours: cours,
         price: cours.price
      })

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
        success_url: `http://localhost:8000/api/order/user/${userId}/cours/${courseId}/order/${order.id}/success`,
        cancel_url: 'http://localhost:3000/cancel',
      });
      return pay.url;
   }

   async complateOrder(userId: number, courseId: number, orderId: number) {
      await this.database.orders.findOneOrFail({where: {id: orderId, isPaid: false}});
      await this.database.orders.update({id: orderId}, {isPaid: true});
      await this.byedCoursesService.cretedByedCourse(userId, courseId);
      return true
   }
}
