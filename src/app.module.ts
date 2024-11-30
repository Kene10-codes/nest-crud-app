import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import {ConfigModule, ConfigService, } from '@nestjs/config'
import { AppController } from './app.controller';
import {MongooseModule} from '@nestjs/mongoose'
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import {UserSchema } from './auth/schemas/user.schemas';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true

  }),
  JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      return {
        secret: config.get<string>('JWT_SECRET'),
        signOptions:{
           expiresIn: config.get<string | number>('JWT_EXPIRES')
        }
      }
   }
}), MongooseModule.forRoot(process.env.DATABASE_URL), MongooseModule.forFeature([{name: "User", schema: UserSchema}]), AuthModule, BookModule],
  
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
