import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const UserParam = createParamDecorator((_data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();

  return req.user;
}); 