import { Controller, Get, UseGuards } from '@nestjs/common';

import { TeachersService } from '../services/teachers.service';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { RolesGuard } from './../../auth/guards/roles.guard';
import { Public } from './../../auth/decorators/public.decorator';
import { Roles } from './../../auth/decorators/roles.decorator';
import { Role } from './../../auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.TEACHER)
@Controller('teachers')
export class TeachersController {

  constructor(private teachersService: TeachersService) {}

  @Get()
  getHello() {
    return this.teachersService.getHello();
  }

  @Public()
  @Get('teacherpublic')
  getPrueba() {
    return this.teachersService.getPrueba();
  }
}
