import { IsIn, IsOptional, IsString } from 'class-validator';

export class SearchCoursDto {
  @IsOptional()
  @IsString()
  name = '';

  @IsOptional()
  price = 100000000;

  @IsOptional()
  @IsString()
  @IsIn([
    'createdAt DESC',
    'createdAt ASC',
    'price DESC',
    'price ASC',
    'star DESC',
    'star ASC',
    'likesCount DESC',
    'likesCount ASC',
  ])
  filter = 'createdAt DESC';

  @IsOptional()
  isOficial = true;

  @IsOptional()
  page = 1;

  @IsOptional()
  limit = 16;
}
