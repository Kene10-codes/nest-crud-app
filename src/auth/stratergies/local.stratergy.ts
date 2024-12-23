import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
   constructor(
      @Inject("AUTH_SERVICE")
      private readonly authService: AuthService) {
    super({
      usernameField: 'email'
    })
   }

   validate(email: string, password: string) {
      const loginInfo = {email, password}
      const user = this.authService.loginUser(loginInfo)
      if(!user) throw new UnauthorizedException()
      return user;        
   } 
}