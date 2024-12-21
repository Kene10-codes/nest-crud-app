import { Module } from '@nestjs/common';
import { AuthService } from './auth.service'
import { MongooseModule} from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schemas';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './stratergies/local.stratergy'
import {AuthGuard} from '../auth/guards/auth.guard'
import { ConfigService } from '@nestjs/config';



@Module({
    imports: [
      PassportModule,
      JwtModule.register({
        secret: "kbsubfwiuobfuwigtr9w8",
        signOptions: { expiresIn: "2hr" },
      }),
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),  
],
    providers: [{
     provide: "AUTH_SERVICE",
     useClass: AuthService
    }, LocalStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
