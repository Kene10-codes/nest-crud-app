import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginUpDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signup')
    signUpUser(@Body() signupDto: SignUpDto): Promise<{token: string}> {
     return this.authService.signupUser(signupDto)
    }

    @Get('/login')
    loginUser(@Body() loginDto: LoginUpDto): Promise<{token: string}>{
        return this.authService.loginUser(loginDto)
    }
}
