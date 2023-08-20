import { IsNotEmpty } from 'class-validator';

export class UpdateVideoDto {
  @IsNotEmpty()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNotEmpty()
  name: string;
}
