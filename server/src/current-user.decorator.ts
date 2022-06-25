import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserResponse } from './users/dto/response/user-response.dto';

const getCurrentUserByContext = (context: ExecutionContext): UserResponse =>
  context.switchToHttp().getRequest().user;

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
