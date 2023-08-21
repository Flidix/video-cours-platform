import { BadRequestException, Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as bcrypt from "bcryptjs"
import { DatabaseService } from '@shared/database/services/database.service';
import { AuthDto } from './dto/auth.dto';
import { genSalt, hash } from 'bcryptjs';
import { authEmailPage } from './pages/auth-email.page';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Environment } from '@shared/variables/environment';

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

    await this.sendEmail(user.email, user.id);
    
    return true
  }


  async logIn(dto: AuthDto) {
    const { email, password , username} = dto;
    console.log({email, password, username});
    const user = await this.database.users.findOneOrFail({ where: { email , username} });
    const deHashPassword = await bcrypt.compare(password, user.password);
    if (!deHashPassword) {
      throw new BadRequestException('Invalid credentials');
    }
    await this.database.users.update({ id: user.id }, { lastLoginAt: new Date() });
    await this.sendEmail(user.email, user.id);
    return true
  }

  async sendEmail(toUserEmail: string, userId: number) {
    const transporter = await createTransport({
      service: 'gmail',
      auth: {
        user: Environment.NODE_MAILER_AUTH_EMAIL,
        pass: Environment.PASSWORD,
      },
    });

   const html = authEmailPage('http://localhost:8000/api/auth/confirmation/user/' + userId);

   const mailOptions = {
     from: Environment.SEND_FROM_EMAIL,
     to: toUserEmail,
     subject: 'nodemailer test',
     html
   };

   transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err);
      } else {
         return true
      }
    });
   
  }

  async comfirmation(id: number) {
      const user = await this.database.users.findOneOrFail({ where: { id } });
      const currentTime = new Date();
      const createdAtTime = new Date(user.lastLoginAt);
      const timeDifferenceMinutes = Math.floor(
         (currentTime.getTime() - createdAtTime.getTime()) / (1000 * 60)
      );
      console.log(timeDifferenceMinutes);
      if (timeDifferenceMinutes >= 2) {
         await this.database.users.delete({ id });
         throw new BadRequestException('User was created less than 2 minutes ago');
      }
      const token = await this.issueAccessToken(user.id);
      return {
      user,
      ...token
      };
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