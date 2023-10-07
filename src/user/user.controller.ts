import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UserService } from './user.service';

import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';

import { CurrentUser } from 'src/auth/decorators/curentUser';

import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('update')
  @UseInterceptors(FileInterceptor('userAvatar'))
  updateUser(
    @CurrentUser('id') id: number,
    @Body() dto: UpdateUserDto,
    @UploadedFile() files: { userAvatar?: Express.Multer.File[] },
  ) {
    return this.userService.updateProfile(id, dto, files);
  }

  @Get('my-profile')
  getMyProfile(@CurrentUser('id') id: number) {
    return this.userService.findOneByIdForAdmin(id);
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.findOneById(id);
  }

  @UseGuards(RoleGuard)
  @Get('for/admin/:id')
  getUserByIdForAdmin(@Param('id') id: number) {
    return this.userService.findOneByIdForAdmin(id);
  }

  @UseGuards(RoleGuard)
  @Put('role/:id')
  async changeRole(@Param('id') id: number) {
    return await this.userService.changeRole(id);
  }

  // @UseGuards(RoleGuard)
  @Put('oficial/:id')
  async changeOficial(@Param('id') id: number) {
    return await this.userService.changeOficial(id);
  }

  @Get('news/courses')
  getNews(@CurrentUser('id') id: number) {
    return this.userService.getNews(id);
  }
}
