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

    async signupUser(signUpDto: SignUpDto): Promise<{token: any}> {
        const {name, email, password} = signUpDto

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)

        if(!hashedPassword) {
            throw new NotAcceptableException("Password was not hashed")
        }

        const user = await this.userModel.create({
            email,
            name,
            password: hashedPassword
        })

        return {token:  this.jwtService.signAsync({id: user._id})}

    }

    async loginUser(loginDto: LoginUpDto): Promise<{token: any}> {
         const {email, password} = loginDto

        const user = await this.userModel.findOne({email})
        if(!user) {
            throw new UnauthorizedException("Incorrect email or password")
        } 

        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if(!isPasswordMatched) {
            throw new UnauthorizedException("Incorrect email or password")
        }

     
        return  {token: this.jwtService.signAsync({id: user._id})}
    }
}
