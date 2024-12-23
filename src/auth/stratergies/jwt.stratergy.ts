import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWTInfo } from "../constants/constants";
import { Injectable } from "@nestjs/common";


@Injectable()
export class JwtStratergy extends PassportStrategy(Strategy) {
    constructor(){
        super({
           jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
           ignoreExpiration: false,
           secretOrKey: JWTInfo.secret
    })
 }

    validate(payload: any){
        console.log("validate jwt payload func")
        console.log(payload)
        return payload;
    }

}