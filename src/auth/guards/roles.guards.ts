import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorators";
import { Role } from "../enums/role.enums";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor (private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [ 
            context.getHandler(), 
            context.getClass()
        ])

        if(!requiredRoles) return true;

        const { user } = context.switchToHttp().getRequest()
        console.log(user)
        return matchRoles(requiredRoles, user?.role);

    }
}


// FUNCTION
// MATCH OR COMPARE USER ROLES WITH THE REQUIRED ROLES 
function matchRoles(requiredRoles: string[], userRole: string[]) {
   return  requiredRoles.some((role: string) => userRole?.includes(role))

}