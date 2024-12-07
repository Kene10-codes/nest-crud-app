import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService, } from '@nestjs/config'
import { AppController } from './app.controller';
import {MongooseModule} from '@nestjs/mongoose'
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import {UserSchema } from './auth/schemas/user.schemas';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './auth/constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/stratergies/jwt.stratergy';


@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true
   }), MongooseModule.forRoot(process.env.DATABASE_URL), MongooseModule.forFeature([{name: "User", schema: UserSchema}]), AuthModule, BookModule],
  
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, JwtStrategy],
})
export class AppModule {}
