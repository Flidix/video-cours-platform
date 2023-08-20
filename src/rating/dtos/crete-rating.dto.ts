import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreteRatingDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Max(5)
  @Min(1)
  stars: number;

  @IsNotEmpty()
  @IsNumber()
  coursId: number;
}
