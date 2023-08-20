import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import * as process from 'process';
import { DataSource } from 'typeorm';
import { subMonths, subSeconds,  startOfMonth, startOfSecond } from 'date-fns';


import { DatabaseService } from '@shared/database/services/database.service';

@Injectable()
export class UserService extends DatabaseService {
  constructor(@InjectDataSource() datasource: DataSource) {
    super(datasource);
  }

  async findOneById(id: number) {
    const user = await this.database.users.findOneOrFail({
      where: { id },
      relations: {
        courses: true,
        likes: {
          toCours: true,
        },
        subscription: {
          toUser: true,
        },
        history: {
          toVideo: true,
        },
        orders: {
          toCours: true,
        },
        byedCourses: {
          cours: true,
        },
      },
      order: {
        history: {
          id: 'DESC',
        },
      },
    });

    const uniqueVideos = new Set();
    user.history = user.history.filter((historyEntry) => {
      if (uniqueVideos.has(historyEntry.toVideo.id)) {
        return false;
      }
      uniqueVideos.add(historyEntry.toVideo.id);
      return true;
    });

    const maxHistoryEntries = 20;
    if (user.history.length > maxHistoryEntries) {
      user.history.splice(maxHistoryEntries);
    }

    return user;
  }

  async changeRole(id: number) {
    const user = await this.findOneById(id);
    user.isAdmin = !user.isAdmin;
    await this.database.users.save(user);
    return user.isAdmin;
  }

  async changeOficial(id: number) {
    const user = await this.findOneById(id);
    user.isOficial = !user.isOficial;
    await this.database.users.save(user);
    return user.isOficial;
  }

  async getNews(userId: number) {
    const currentDate = new Date();
    const oneMonthAgo = subSeconds(startOfSecond(currentDate), 100);

    const news = await this.database.users
      .createQueryBuilder('user')
      .where('user.id = :id', { id: userId })
      .leftJoinAndSelect('user.subscription', 'subscription')
      .leftJoinAndSelect('subscription.toUser', 'toUser')
      .leftJoinAndSelect('toUser.courses', 'courses')
      .where('courses.createdAt >= :oneMonthAgo', { oneMonthAgo })
      .andWhere('courses.createdAt < :currentDate', { currentDate })
      .getMany();

    return news;
  }
}
