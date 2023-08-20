import { IsNotEmpty, IsNumber } from "class-validator"

export class AddVideoToCoursDto {

   video: string

   @IsNotEmpty()
   @IsNotEmpty()
   description: string

   @IsNotEmpty()
   @IsNotEmpty()
   name: string

   @IsNotEmpty()
   toCoursId: number
}