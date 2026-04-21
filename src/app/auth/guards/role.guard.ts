import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CustomExceptionFactory } from '../../common/exception/custom-exception-factory';
import { ErrorCodes } from '../../common/exception/error-codes';
import { UserRole } from '../../user/types/user-role.type';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const gqlContext = GqlExecutionContext.create(context);
    const req = gqlContext.getContext().req;
    const user = req?.user;

    if (!user) {
      throw CustomExceptionFactory.create(ErrorCodes.UNAUTHORIZED);
    }

    if (!requiredRoles.includes(user.userRole as UserRole)) {
      throw CustomExceptionFactory.create(ErrorCodes.FORBIDDEN);
    }

    return true;
  }
}
