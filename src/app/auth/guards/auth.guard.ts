import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CustomExceptionFactory } from '../../common/exception/custom-exception-factory';
import { ErrorCodes } from '../../common/exception/error-codes';
import { verifyAccessToken } from '../../user/util/generateAuthToken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const req = gqlContext.getContext().req;
    const authorization = req?.headers?.authorization;

    if (!authorization?.startsWith('Bearer ')) {
      throw CustomExceptionFactory.create(ErrorCodes.UNAUTHORIZED);
    }

    const token = authorization.slice(7);
    const decoded = await verifyAccessToken(token);

    if (!decoded?.user) {
      throw CustomExceptionFactory.create(ErrorCodes.INVALID_ACCESS_TOKEN);
    }

    req.user = decoded.user;
    return true;
  }
}
