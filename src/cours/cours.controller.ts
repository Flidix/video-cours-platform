import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CoursService } from './cours.service';

import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';

import { CurrentUser } from 'src/auth/decorators/curentUser';

import { CreateCoursDto } from './dtos/create-cours.dto';
import { SearchCoursDto } from './dtos/search-cours.dto';
import { UpdateCoursDto } from './dtos/updete-cours.dto';

@UseGuards(JwtAuthGuard)
@Controller('cours')
export class CoursController {
  constructor(private readonly coursService: CoursService) {}

  @Get('check/:courseId')
  checkUserCourse(@CurrentUser('id') userId: number, @Param('courseId') courseId: number) {
    return this.coursService.checkCourseUser(courseId, userId);
  }
  @Get('search/by')
  searchCours(@Query() search: SearchCoursDto) {
    return this.coursService.searchCours(search);
  }

  @UseGuards(RoleGuard)
  @Put('oficial/:id')
  async changeOficial(@Param('id') id: number) {
    return await this.coursService.changeCoursOficial(id);
  }

  @Get('oficial/all')
  getCoursOficial() {
    return this.coursService.getOficial();
  }

  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  createCours(
    @CurrentUser('id') userId: number,
    @Body() dto: CreateCoursDto,
    @UploadedFile() files: { avatar?: Express.Multer.File[] },
  ) {
    return this.coursService.createCours(dto, userId, files);
  }

  @Get(':id')
  getCoursById(@CurrentUser('id') userId: number, @Param('id') id: number) {
    return this.coursService.getCoursById(id, userId);
  }

  @Delete(':id')
  deleteCours(@CurrentUser('id') userId: number, @Param('id') id: number) {
    return this.coursService.deleteCours(userId, id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  updateCours(
    @CurrentUser('id') userId: number,
    @Body() dto: UpdateCoursDto,
    @Param('id') id: number,
    @UploadedFile() files: { avatar?: Express.Multer.File[] },
  ) {
    return this.coursService.updeteCours(dto, userId, id, files);
  }
}
