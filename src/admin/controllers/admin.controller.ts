import { Controller, Get, UseGuards } from '@nestjs/common';

import { AdminService } from '../services/admin.service';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { RolesGuard } from './../../auth/guards/roles.guard';
import { Public } from './../../auth/decorators/public.decorator';
import { Roles } from './../../auth/decorators/roles.decorator';
import { Role } from './../../auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller('admin')
export class AdminController {

  constructor(private adminService: AdminService) {}

  @Get()
  getHello() {
    return this.adminService.getHello();
  }

  @Public()
  @Get('adminPrueba')
  getPrueba() {
    return this.adminService.getPrueba();
  }
}
