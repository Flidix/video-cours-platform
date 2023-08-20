import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateCommentToCommentDto {

   @IsString()
   @IsNotEmpty()
   comment: string;

   @IsNumber()
   @IsNotEmpty()
   commentToCommentId: number;
}