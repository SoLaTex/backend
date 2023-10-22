import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
  (data: string | null, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user?.[data] || request.user;
  }
);
