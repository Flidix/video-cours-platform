import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import * as bcrypt from 'bcryptjs';
import { genSalt, hash } from 'bcryptjs';
import { JwtPayload, TokenExpiredError, sign, verify } from 'jsonwebtoken';
import { createTransport } from 'nodemailer';

import { Environment } from '@shared/variables/environment';

import { DatabaseService } from '@shared/database/services/database.service';

import { AuthDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

import { authEmailPage } from './pages/auth-email.page';

@Injectable()
export class AuthService extends DatabaseService {
  async register(dto: AuthDto) {
    // await this.database.users.checkNotExists({ email: dto.email });
    const salt = await genSalt(10);
    const user = await this.database.users.create({
      ...dto,
      password: await hash(dto.password, salt),
    });
    const html = authEmailPage(Environment.ALLOWED_ORIGINS + '/confirm/user/' + user.id);

    await this.sendEmail(user.email, html);

    return true;
  }

  async logIn(dto: AuthDto) {
    const { email, password, username } = dto;
    const user = await this.database.users.findOneOrFail({ where: { email, username } });
    const deHashPassword = await bcrypt.compare(password, user.password);
    if (!deHashPassword) {
      throw new BadRequestException('Invalid credentials');
    }
    const html = authEmailPage(Environment.ALLOWED_ORIGINS + '/confirm/user/' + user.id);
    await this.sendEmail(user.email, html);
    return true;
  }

  async sendEmail(toUserEmail: string, html: string) {
    await this.database.users.update({ email: toUserEmail }, { lastLoginAt: new Date() });

    const transporter = await createTransport({
      service: 'gmail',
      auth: {
        user: Environment.NODE_MAILER_AUTH_EMAIL,
        pass: Environment.PASSWORD,
      },
    });

    const mailOptions = {
      from: Environment.SEND_FROM_EMAIL,
      to: toUserEmail,
      subject: 'nodemailer test',
      html,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err);
      } else {
        return true;
      }
    });
  }

  async confirm(id: number) {
    const user = await this.database.users.findOneOrFail({ where: { id } });
    const currentTime = new Date();
    const createdAtTime = new Date(user.lastLoginAt);
    const timeDifferenceMinutes = Math.floor(
      (currentTime.getTime() - createdAtTime.getTime()) / (1000 * 60),
    );
    if (timeDifferenceMinutes >= 60) {
      await this.database.users.delete({ id });
      throw new BadRequestException('User was created less than 2 minutes ago');
    }
    const token = await this.issueAccessToken(user.id, user.email);
    return {
      user,
      ...token,
    };
  }

  async issueAccessToken(userId: number, userEmail: string) {
    const refreshToken = sign({ id: userId, email: userEmail }, Environment.JWT_SECRET, {
      expiresIn: 2630000,
    });

    const accessToken = sign({ id: userId, email: userEmail }, Environment.JWT_SECRET, {
      expiresIn: 15,
    });
    return { refreshToken, accessToken };
  }

  async getNewTokens(dto: RefreshTokenDto) {
    try {
      const result = (await verify(dto.refreshToken, Environment.JWT_SECRET)) as JwtPayload;
      return this.issueAccessToken(result.userId, result.email);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token has expired');
      }
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
