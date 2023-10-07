import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCoursDto {
  @IsString()
  name: string;

  @IsNotEmpty()
  price: number;

  @IsString()
  description: string;

  @IsNotEmpty()
  categoties: number[];
}
