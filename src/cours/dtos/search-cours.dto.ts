import {IsOptional, IsString, IsNumber, IsIn, IsBoolean,} from 'class-validator';

export class SearchCoursDto {
   @IsOptional()
   @IsString()
   name: string;

   @IsOptional()
   price: number = 0;

   @IsOptional()
   @IsString()
   @IsIn([ 'createdAt DESC', 'createdAt ASC', 'price DESC', 'price ASC', 'star DESC', 'star ASC', 'likesCount DESC', 'likesCount ASC' ])
   filter: string = 'createdAt DESC';

   @IsOptional()
   isOficial: boolean = true;
}
