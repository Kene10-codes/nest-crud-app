import { Module } from '@nestjs/common';
import {ConfigModule, } from '@nestjs/config'
import { AppController } from './app.controller';
import {MongooseModule} from '@nestjs/mongoose'
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true

  }), MongooseModule.forRoot(process.env.DATABASE_URL), AuthModule, BookModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}