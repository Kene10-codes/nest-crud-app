import { Body, Controller, Get, Post, UseGuards, Param, Put, HttpCode, HttpStatus, UseInterceptors, UploadedFiles, Inject, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginUpDto } from './dto/login.dto';
import { Roles } from './decorators/roles.decorators';
import { Role } from './enums/role.enums';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './guards/roles.guards';
import { FilesInterceptor } from '@nestjs/platform-express';
import { LocalGuard } from './guards/local-guard';

@Controller('auth')
export class AuthController {
    constructor( @Inject('AUTH_SERVICE') private authService: AuthService){}
        
    @HttpCode(HttpStatus.OK)
    // @Roles(Role.USER, Role.ADMIN)
    // @UseGuards(AuthGuard(), RolesGuard)
    @Post('signup')
    signUpUser(@Body() signupDto: SignUpDto): Promise<{token: string}> {
     return this.authService.signupUser(signupDto)
    } 

    @UseGuards(LocalGuard)
    @Post('login')
    loginUser(@Body() loginDto: LoginUpDto): Promise<{token: string}>{
        console.log(LoginUpDto)
        const user = this.authService.loginUser(loginDto)
        console.log(user)
        if(!user) throw new HttpException("No user found!", 403)
        return user;
    }
}

