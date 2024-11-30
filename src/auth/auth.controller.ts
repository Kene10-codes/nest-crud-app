import { Body, Controller, Get, Post, UseGuards, Param, Put, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginUpDto } from './dto/login.dto';
import { Roles } from './decorators/roles.decorators';
import { Role } from './enums/role.enums';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './guards/roles.guards';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Roles(Role.USER, Role.ADMIN)
    @UseGuards(AuthGuard(), RolesGuard)
    @Post('signup')
    signUpUser(@Body() signupDto: SignUpDto): Promise<{token: string}> {
     return this.authService.signupUser(signupDto)
    }

    @Get('login')
    loginUser(@Body() loginDto: LoginUpDto): Promise<{token: string}>{
        return this.authService.loginUser(loginDto)
    }
    
    // @UseGuards(AuthGuard)
    // @UseInterceptors(FilesInterceptor('files'))
    // @Put('uploads/:id')
    // async uploadImage(@Param('id') id: string, @UploadedFiles() files: Array<Express.Multer.File[]> ) {
    //     console.log(id)
    //     console.log(files) 
    // }
}

