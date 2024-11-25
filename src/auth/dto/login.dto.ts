import { IsEmail, IsNotEmpty,  IsString, MinLength } from "class-validator";


export class LoginUpDto  { 
    @IsString()
    @IsNotEmpty()
    @IsEmail({}, {message: "Email cannot be empty"})
    readonly email: string;
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;
}