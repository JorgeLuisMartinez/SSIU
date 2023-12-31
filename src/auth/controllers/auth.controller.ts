import { Controller, Req, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { AuthService } from './../services/auth.service';
import { User } from './../../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor (
    private authService: AuthService,
  ){}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request){
    const user = req.user as User;
    return this.authService.genarateJWT(user);
  }
}
