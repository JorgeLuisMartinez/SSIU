import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from './../../users/services/users.service';
import { User } from './../../users/entities/user.entity';
import { PayloadToken } from './../models/token.model';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  private getErrorCode(error: Error): number {
    // Mapea el tipo de error a un código de estado HTTP adecuado
    if (error.message === 'El formato del correo electrónico es inválido') {
      return 400; // Bad Request
    } else if (error.message === 'El correo electrónico no está registrado') {
      return 404; // Not Found
    } else if (error.message === 'La contraseña proporcionada es incorrecta') {
      return 401; // Unauthorized
    } else {
      return 500; // Internal Server Error
    }
  }

  async validateUser(email: string, password: string) {
    try {
      const isValidEmail = this.isValidEmail(email);
      if (!isValidEmail) {
        throw new Error('El formato del correo electrónico es inválido');
      }
      const user = await this.userService.findByEmail(email);
      if (!user) {
        throw new Error('El correo electrónico no está registrado');
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('La contraseña proporcionada es incorrecta');
      }
      return user;
    } catch (error) {
      throw new Error('Error'+error);
      // Captura la excepción y devuelve un objeto de error HTTP
      // const errorMessage =
      //   error.message || 'Error interno al validar el usuario';
      // const statusCode = this.getErrorCode(error); // Método para obtener el código de error HTTP correspondiente
      // return { error: errorMessage, statusCode };
    }
    // const user = await this.userService.findByEmail(email);
    // if (user) {
    //   const isMatch = await bcrypt.compare(password, user.password);
    //   if (isMatch) {
    //     return user;
    //   }
    // }
    // return null
  }

  async genarateJWT(user: User) {
    const payload: PayloadToken = {
      role: user.role,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
