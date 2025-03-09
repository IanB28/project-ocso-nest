import { applyDecorators, UseGuards } from "@nestjs/common"
import { AuthGuard } from "../guards/auth.guard"
import { RolesGuard } from "../guards/roles.guards"
import { Roles } from "./role.decorator"


export const Auth = (...roles: string[]) => { 
    roles.push("Admin");
    return  applyDecorators(
    Roles(roles),
    UseGuards(AuthGuard, RolesGuard)
)}