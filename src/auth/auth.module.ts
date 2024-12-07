import { Module } from '@nestjs/common';
import { AuthService } from './auth.service'
import { MongooseModule} from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schemas';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants'
import {JwtStrategy} from '../auth/stratergies/jwt.stratergy'
import {AuthGuard} from '../auth/guards/auth.guard'
import { ConfigService } from '@nestjs/config';



@Module({
    imports: [

      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.registerAsync({
       inject: [ConfigService],
       useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_SECRET'),
        signOptions: { expiresIn: 3600 },
      }),
      }),
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),  
],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService, JwtModule, JwtStrategy, PassportModule]
})
export class AuthModule {}
