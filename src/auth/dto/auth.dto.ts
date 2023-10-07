import { IsEmail, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
