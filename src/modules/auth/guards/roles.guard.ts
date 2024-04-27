import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { ROLES_KEY } from './../decorators/roles.decorator';
import { PayloadToken } from './../models/token.model';
import { Role } from '../models/roles.model';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler()); // Con esta primera linea obtenemos un array con los roles que traiga el controllador para el endpoint en especifico. ej ['admin']
    if (!roles) {
      return true; // esta validacion es para endpoinst que no tengan definido ningun role.
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;
    // y con esto obtenemos los parametros de cada token por usuario. ej {'role: 'admin', sub: 1452}

    const isAuth = roles.some((role) => role === user.role);
    if (!isAuth) {
      throw new UnauthorizedException('your role dont have permissions')
    }
    return isAuth;
  }
}
