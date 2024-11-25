import { IsEmail, IsNotEmpty,  IsString, MinLength } from "class-validator";


export class SignUpDto  {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    readonly name: string;   
    @IsString()
    @IsNotEmpty()
    @IsEmail({}, {message: "Email cannot be empty"})
    readonly email: string;
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;
}