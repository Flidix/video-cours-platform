import { Controller, Get, Param, Put, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';

import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';

import { CurrentUser } from 'src/auth/decorators/curentUser';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  @UseGuards(RoleGuard)
  @Put('oficial/:id')
  async changeOficial(@Param('id') id: number) {
    return await this.userService.changeOficial(id);
  }

  @Get('news/courses')
  getNews(@CurrentUser('id') id: number) {
    return this.userService.getNews(id);
  }
}
