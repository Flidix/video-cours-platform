import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';

import { DatabaseService } from '@shared/database/services/database.service';
import { CategoryService } from 'src/category/category.service';
import { FileService, FileTypes } from 'src/file/file.service';

import { CreateCoursDto } from './dtos/create-cours.dto';
import { SearchCoursDto } from './dtos/search-cours.dto';
import { UpdateCoursDto } from './dtos/updete-cours.dto';

@Injectable()
export class CoursService extends DatabaseService {
  constructor(
    @InjectDataSource() datasource: DataSource,
    private readonly fileService: FileService,
    private readonly categoryService: CategoryService,
  ) {
    super(datasource);
  }

  async searchCours(search: SearchCoursDto) {
    const filter = search.filter.split(' ');
    return await this.database.courses
      .createQueryBuilder('cours')
      .where('cours.name LIKE :search', { search: `%${search.name}%` })
      .andWhere('cours.price <= :price', { price: search.price })
      .orderBy(`cours.${filter[0]}`, filter[1] === 'DESC' ? 'DESC' : 'ASC')
      .andWhere('cours.isOficial = :isOficial', { isOficial: search.isOficial })
      .leftJoinAndSelect('cours.user', 'user')
      .skip((search.page - 1) * search.limit)
      .take(search.limit)
      .getMany();
  }

  async checkCourseUser(courseId: number, userId: number) {
    const cours = await this.database.courses.findOneOrFail({ where: { id: courseId } });
    if (userId !== cours.userId) {
      return false;
    }
    return true;
  }

  async changeCoursOficial(id: number) {
    const cours = await this.database.courses.findOneOrFail({ where: { id } });
    cours.isOficial = !cours.isOficial;
    await this.database.courses.save(cours);
    return cours.isOficial;
  }

  async getOficial() {
    return await this.database.courses
      .createQueryBuilder('cours')
      .where('cours.isOficial = true')
      .orderBy('cours.likesCount', 'DESC')
      .leftJoinAndSelect('cours.user', 'user')
      .getMany();
  }

  async checkCourse(userId: number, courseId: number) {
    const course = await this.database.courses.findOneOrFail({ where: { id: courseId } });
    if (userId !== course.userId) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return true;
  }

  async createCours(dto: CreateCoursDto, userId: number, avatar) {
    const avatarPath = await this.fileService.createFile(FileTypes.AVATAR, avatar);
    const user = await this.database.users.findOneOrFail({ where: { id: userId } });
    const cours = await this.database.courses.create({
      ...dto,
      avatar: avatarPath,
      user,
      userId,
      isOficial: !user.isOficial,
    });
    await this.categoryService.addCategoryToCourse(cours.id, dto.categoties);
    return cours;
  }

  async getCoursById(id: number, userId: number) {
    const cours = await this.database.courses.findOneOrFail({
      where: { id },
      relations: {
        user: true,
        videos: true,
        ratings: {
          fromUser: true,
        },
        coursToCategory: {
          category: true,
        },
      },
      order: {
        ratings: {
          createdAt: 'DESC',
        },
      },
    });
    if (cours.userId !== userId) {
      const cours = await this.database.buedCourses.findOne({ where: { courseId: id, userId } });
      if (!cours) {
        return { cours: await this.getNotBuyedCourse(id), isBuyed: false };
      }
    }
    return { cours, isBuyed: true };
  }

  async getNotBuyedCourse(coursId: number) {
    return await this.database.courses.findOneOrFail({
      where: { id: coursId },
      relations: {
        user: true,
        ratings: {
          fromUser: true,
        },
        coursToCategory: {
          category: true,
        },
      },
      order: {
        ratings: {
          createdAt: 'DESC',
        },
      },
    });
  }

  async deleteCours(userId: number, coursId: number) {
    await this.checkCourse(userId, coursId);
    const toCours = await this.database.courses.findOneOrFail({ where: { id: coursId } });
    await this.database.coursToCategory.delete({ coursId });
    await this.database.likes.delete({ toCours });
    await this.database.ratings.delete({ courseId: coursId });
    await this.database.buedCourses.delete({ courseId: coursId });
    await this.database.courses.delete({ id: coursId });
    return true;
  }

  async updeteCours(dto: UpdateCoursDto, userId: number, coursId: number, avatar) {
    const avatarPath = await this.fileService.createFile(FileTypes.AVATAR, avatar);
    const { categoties, ...newCours } = dto;
    await this.checkCourse(userId, coursId);
    await this.categoryService.addCategoryToCourse(coursId, categoties);
    await this.database.courses.update({ id: coursId }, { ...newCours, avatar: avatarPath });
    return true;
  }
}
