import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from './../../users/services/users.service';
import { User } from './../../users/entities/user.entity';
import { PayloadToken } from './../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      if (user.status.id == 1) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          return user;
        } else {
          return { error: 'La contraseña proporcionada es incorrecta' };
        }
      } else {
        return {
          error: 'El Usuario no esta Activo, por favor registrate primero',
        };
      }
    } else {
      return { error: 'El correo electrónico no está registrado' };
    }
    return null;
  }

  async genarateJWT(user: User) {
    const payload: PayloadToken = {
      role: user.role.toString(),
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
