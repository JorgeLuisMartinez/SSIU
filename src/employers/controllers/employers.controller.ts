import { Controller, Get, UseGuards } from '@nestjs/common';

import { EmployersService } from '../services/employers.service';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { RolesGuard } from './../../auth/guards/roles.guard';
import { Public } from './../../auth/decorators/public.decorator';
import { Roles } from './../../auth/decorators/roles.decorator';
import { Role } from './../../auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.EMPLOYER)
@Controller('employers')
export class EmployersController {

  constructor(private employersService: EmployersService) {}

  @Get()
  getHello() {
    return this.employersService.getHello();
  }

  @Public()
  @Get('employerpublic')
  getPrueba() {
    return this.employersService.getPrueba();
  }

}
