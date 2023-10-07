import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  username?: string;

  userAvatar: string;
}
