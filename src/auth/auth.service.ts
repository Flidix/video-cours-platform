import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectDataSource } from '@nestjs/typeorm';

import { genSalt, hash } from 'bcryptjs';
import { DataSource } from 'typeorm';

import { DatabaseService } from '@shared/database/services/database.service';

import { AuthDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService extends DatabaseService {
  constructor(@InjectDataSource() datasource: DataSource, private readonly jwtService: JwtService) {
    super(datasource);
  }

  async register(dto: AuthDto) {
    // await this.database.users.checkNotExists({ email: dto.email });
    const salt = await genSalt(10);
    const user = await this.database.users.create({
      ...dto,
      password: await hash(dto.password, salt),
    });
    const token = await this.issueAccessToken(user.id);
    return {
      user: user,
      ...token,
    };
  }

  async login(dto: AuthDto) {
    const { email, username, password } = dto;
    const user = await this.database.users.findOneOrFail({
      where: [{ email }, { username }, { password }],
    });
    const accessToken = await this.issueAccessToken(user.id);
    return { user, ...accessToken };
  }

  async issueAccessToken(userId: number) {
    const data = { id: userId };
    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: '1h',
    });
    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '7d',
    });
    return { refreshToken, accessToken };
  }

  async getNewTokens(dto: RefreshTokenDto) {
    const result = await this.jwtService.verifyAsync(dto.refreshToken);
    if (!result) {
      throw new Error('Invalid refresh token');
    }
    const user = await this.database.users.findOneOrFail({
      where: { id: result.id },
    });
    const token = await this.issueAccessToken(user.id);

    return { user, ...token };
  }
}
