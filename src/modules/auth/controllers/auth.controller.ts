import { Controller, Req, Post, UseGuards, Body, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

import { AuthService } from './../services/auth.service';
import { User } from './../../users/entities/user.entity';
import { log } from 'console';

@Controller('auth')
export class AuthController {
  constructor (
    private authService: AuthService,
  ){}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request){
    const user = req.user as User;
    if(user.email){
      return this.authService.genarateJWT(user);
    }
    else{
      return JSON.stringify(user);
    }
    
  }
}
