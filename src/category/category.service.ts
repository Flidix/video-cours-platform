import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@shared/database/services/database.service';

import { CreateCategoryDto } from './dtos/create-categoty.dto';
import { UpdateCategoryDto } from './dtos/update-categoty.dto';

@Injectable()
export class CategoryService extends DatabaseService {
  async deleteCategory(id: number) {
    await this.database.coursToCategory.delete({ categoryId: id });
    await this.database.categories.delete({ id });
    return true;
  }

  async updateCategory(dto: UpdateCategoryDto) {
    await this.database.categories.update({ id: dto.categoryId }, { name: dto.name });
    return true;
  }

  async getCategories() {
    return await this.database.categories.findAll();
  }

  async createCategory(dto: CreateCategoryDto) {
    return await this.database.categories.create({ ...dto });
  }

  async searchCategory(search: string) {
    const categories = await this.database.categories
      .createQueryBuilder('category')
      .where('category.name LIKE :search', { search: `%${search}%` })
      .getMany();
    return categories;
  }

  async getById(id: number) {
    return await this.database.categories.findOneOrFail({
      where: { id },
      relations: {
        coursToCategory: {
          cours: true,
        },
      },
    });
  }

  async addCategoryToCourse(coursId: number, categoriesIds: number[]) {
    const cours = await this.database.courses.findOneOrFail({
      where: { id: coursId },
      relations: {
        coursToCategory: true,
      },
    });
    await Promise.all(
      cours.coursToCategory.map(async (coursToCategory) => {
        await this.database.coursToCategory.delete({ id: coursToCategory.id });
      }),
    );

    for (const id of categoriesIds) {
      const existingCoursToCategory = await this.database.coursToCategory.findOne({
        where: { coursId, categoryId: id },
      });
      if (!existingCoursToCategory) {
        await this.database.coursToCategory.create({ coursId, categoryId: id });
      }
    }
  }
}
