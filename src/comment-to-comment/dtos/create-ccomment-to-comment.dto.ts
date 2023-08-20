import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCommentToCommentDto {

   @IsString()
   @IsNotEmpty()
   comment: string;

   @IsNumber()
   @IsNotEmpty()
   commentId: number;
}