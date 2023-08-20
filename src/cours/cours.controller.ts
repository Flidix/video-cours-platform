import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import { CoursService } from './cours.service';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/auth/decorators/curentUser';
import { CreateCoursDto } from './dtos/create-cours.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateCoursDto } from './dtos/updete-cours.dto';
import { RoleGuard } from 'src/auth/guards/role.guard';

@UseGuards(JwtAuthGuard)
@Controller('cours')
export class CoursController {
  constructor(private readonly coursService: CoursService) {}

  @UseGuards(RoleGuard)
  @Put('oficial/:id')
  async changeOficial(@Param('id') id: number) {
    return await this.coursService.changeCoursOficial(id);
  }


  @Get("oficial/all")
  getCoursOficial() {
    return this.coursService.getOficial();
  }

  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  createCours(
    @CurrentUser("id") userId,
    @Body() dto: CreateCoursDto,
    @UploadedFile() files: { avatar?: Express.Multer.File[] },
  ) {
    return this.coursService.createCours(dto, userId, files);
  }

  @Get(':id')
  getCoursById(@CurrentUser("id") userId: number, @Param('id') id: number) {
    return this.coursService.getCoursById(id, userId);
  }

  @Delete(':id')
  deleteCours(@CurrentUser("id") userId: number, @Param('id') id: number) {
    return this.coursService.deleteCours(userId, id);
  }

  @Patch(':id')
  updateCours(
    @CurrentUser("id") userId: number,
    @Body() dto: UpdateCoursDto,
    @Param('id') id: number,
  ) {
    console.log(dto);
    return this.coursService.updeteCours(dto, userId, id);
  }
}
