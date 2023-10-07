import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { startOfMonth, subMonths } from 'date-fns';
import { DataSource } from 'typeorm';

import { FileService, FileTypes } from '../file/file.service';
import { DatabaseService } from '@shared/database/services/database.service';

import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService extends DatabaseService {
  constructor(
    @InjectDataSource() datasource: DataSource,
    private readonly fileService: FileService,
  ) {
    super(datasource);
  }

  async findOneById(id: number) {
    return await this.database.users.findOneOrFail({
      where: { id },
      relations: {
        courses: true,
      },
    });
  }

  async findOneByIdForAdmin(id: number) {
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
    const oneMonthAgo = subMonths(startOfMonth(currentDate), 100);

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

  async updateProfile(userId: number, dto: UpdateUserDto, file) {
    const userAvatar = await this.fileService.createFile(FileTypes.userAvatar, file);
    console.log(userAvatar, dto, userId);
    await this.database.users.update({ id: userId }, { ...dto, userAvatar });
    return true;
  }
}
