import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

import { AuthDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }
  @Post('login')
  async login(@Body() dto: AuthDto) {
    return this.authService.logIn(dto);
  }
  @Post('access-token')
  async getNewTokens(@Body() dto: RefreshTokenDto) {
    return this.authService.getNewTokens(dto);
  }

  @Post('confirmation/user/:id')
  confirmation(@Param('id') id: number) {
    return this.authService.comfirmation(id);
  }
}
