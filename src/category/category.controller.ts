import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CategoryService } from './category.service';

import { RoleGuard } from 'src/auth/guards/role.guard';

import { CreateCategoryDto } from './dtos/create-categoty.dto';
import { UpdateCategoryDto } from './dtos/update-categoty.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(RoleGuard)
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  @Get('search')
  searchCategory(@Query('search') search: string) {
    return this.categoryService.searchCategory(search);
  }
  @Get()
  getCategories() {
    return this.categoryService.getCategories();
  }

  @Get(':id')
  getCategoryById(@Param('id') id: number) {
    return this.categoryService.getById(id);
  }

  @UseGuards(RoleGuard)
  @Delete(':id')
  deleteCategory(@Param('id') id: number) {
    return this.categoryService.deleteCategory(id);
  }

  @UseGuards(RoleGuard)
  @Patch()
  updateCategory(@Body() dto: UpdateCategoryDto) {
    return this.categoryService.updateCategory(dto);
  }
}
