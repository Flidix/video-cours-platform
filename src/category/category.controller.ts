import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/create-categoty.dto';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { updateCategoryDto } from './dtos/update-categoty.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(RoleGuard)
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.categoryService.createCategory(dto);
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
  updateCategory(@Body() dto: updateCategoryDto) {
    return this.categoryService.updateCategory(dto);
  }
  
}
