import { Controller, Get, UseGuards } from '@nestjs/common';

import { SpadminService } from '../services/spadmin.service';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { RolesGuard } from './../../auth/guards/roles.guard';
import { Public } from './../../auth/decorators/public.decorator';
import { Roles } from './../../auth/decorators/roles.decorator';
import { Role } from './../../auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SPADMIN)
@Controller('spadmin')
export class SpadminController {
  constructor(private spadminService: SpadminService) {}

  @Get()
  getHello() {
    return this.spadminService.getHello();
  }

  @Public()
  @Get('spadminpublic')
  getPrueba() {
    return this.spadminService.getPrueba();
  }
}
