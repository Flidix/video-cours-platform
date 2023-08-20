import {IsEmail, IsString, MinLength} from "class-validator";

export class AuthDto  {
    @IsEmail()
    email: string;

    @IsString()
    username: string;

    @MinLength(6, {
        message: 'неменше 6 символів'
    })
    @IsString()
    password: string;
}
