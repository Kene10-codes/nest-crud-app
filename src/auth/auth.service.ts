import { Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schemas';
import { SignUpDto } from './dto/signup.dto';
import { LoginUpDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import   { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs'


@Injectable()
export class AuthService {
    constructor(
       @InjectModel(User.name)
      private userModel: Model<User>,
      private jwtService: JwtService
    ){}

    async signupUser(signUpDto: SignUpDto): Promise<{token: string}> {
        const {name, email, password} = signUpDto

        const hashedPassword = await bcrypt.hash(password, 10)

        if(!hashedPassword) {
            throw new NotAcceptableException("Email or pasword does not match")
        }


        const user = await this.userModel.create({
            email,
            name,
            password: hashedPassword
        })

       const token = this.jwtService.sign({id: user._id})
   
        return {token}

    }

    async loginUser(loginDto: LoginUpDto): Promise<{token: string}> {
         const {email, password} = loginDto

        const user = await this.userModel.findOne({email})
        if(!user) {
            throw new UnauthorizedException("Invalid email or password")
        } 

        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if(!isPasswordMatched) {
            throw new UnauthorizedException("Invalid email or password")
        }

        const token = this.jwtService.sign({id: user._id})

        return  {token}
    }
}
