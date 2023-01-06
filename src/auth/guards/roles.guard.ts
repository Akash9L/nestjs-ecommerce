import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    //Bypass for admin users
    if (user.roles?.includes(Role.ADMIN)) return true;
    const isValidRole = requiredRoles.some((role) =>
      user.roles?.includes(role),
    );
    if (isValidRole) {
      return isValidRole;
    } else {
      throw new UnauthorizedException(
        `you must be an ${requiredRoles.join(' | ')} to access this endpoint`,
      );
    }
  }
}
