import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose'
import { User } from '../schemas/user.schemas'
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt.paylod';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
   private userModel: Model<User>,
    private readonly configService: ConfigService
  ) {
    super({
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id, role } = payload;

    let user: User = null;

    if (role === 'user') {
      user = await this.userModel.findById({ id });
    } else if (role === 'admin') {
      user = await this.userModel.findById({ id });
    } else if (role === 'moderator'){
        user = await this.userModel.findById({ id });
    }

    if (!user) {
      throw new UnauthorizedException('Unauthorized!');
    }

    return { ...user };
  }
}