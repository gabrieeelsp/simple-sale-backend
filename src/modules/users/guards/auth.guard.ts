import { applyDecorators, CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';
import { UsersService } from "../services/users.service";
import { RolesGuard } from "./roles.guard";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { UserRole } from "../entities/user-role";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer '))
      throw new UnauthorizedException('Token no enviado');

    const token = authHeader.split(' ')[1];

    try {
      const payload = await this.jwtService.verifyAsync(token);
      const user = await this.usersService.findOne(payload.user_id);

      if (!user) throw new UnauthorizedException('Usuario inválido o eliminado');
      req['user'] = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}

export function Auth(...roles: UserRole[]) {
  const decorators = [
    UseGuards(AuthGuard, RolesGuard)
  ];

  if (roles.length > 0) {
    decorators.push(SetMetadata(ROLES_KEY, roles));
  }

  return applyDecorators(...decorators);
}
