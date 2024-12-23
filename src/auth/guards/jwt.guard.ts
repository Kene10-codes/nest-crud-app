import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { Observable } from "rxjs";

export class JWTGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        console.log("JWT GUARD")
        const request = context.switchToHttp().getRequest<Request>()
        console.log(request)
        return super.canActivate(context);
    }
}