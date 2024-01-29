import { Controller, Get, UseGuards } from '@nestjs/common';

import { GraduatesService } from '../services/graduates.service';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { RolesGuard } from './../../auth/guards/roles.guard';
import { Public } from './../../auth/decorators/public.decorator';
import { Roles } from './../../auth/decorators/roles.decorator';
import { Role } from './../../auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.GRADUATE)
@Controller('graduates')
export class GraduatesController {
  constructor(private graduatesService: GraduatesService) {}

  @Get()
  getHello() {
    return this.graduatesService.getHello();
  }

  @Public()
  @Get('graduatepublic')
  getPrueba() {
    return this.graduatesService.getPrueba();
  }
}
