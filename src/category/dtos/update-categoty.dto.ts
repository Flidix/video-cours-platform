import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class updateCategoryDto {

   @IsNotEmpty()
   @IsString()
   name: string

   @IsNotEmpty()
   @IsNumber()
   categoryId: number

}