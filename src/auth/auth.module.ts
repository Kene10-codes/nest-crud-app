import { Module } from '@nestjs/common';
import { AuthService } from './auth.service'
import { MongooseModule} from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schemas';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './stratergies/local.stratergy'
import { JWTInfo } from './constants/constants';
import { JwtStratergy } from './stratergies/jwt.stratergy';



@Module({
    imports: [
      PassportModule,
      JwtModule.register({
        secret: JWTInfo.secret,
        signOptions: { expiresIn: "2hr" },
      }),
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),  
],
    providers: [{
     provide: "AUTH_SERVICE",
     useClass: AuthService
    }, LocalStrategy, JwtStratergy],
    controllers: [AuthController],
})
export class AuthModule {}
