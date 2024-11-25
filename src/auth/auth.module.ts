import { Module } from '@nestjs/common';
import { AuthService } from './auth.service'
import { MongooseModule} from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schemas';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Users', schema: UserSchema}]),
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                return {
                    secret: config.get<string>('JWT_SECRET'),
                    signOptions: {
                      expiresIn: config.get<string | number>('JWT_EXPIRES')
                    }
                }
            }
        })],
    providers: [AuthService],
    controllers: [AuthController]
  
})
export class AuthModule {}
