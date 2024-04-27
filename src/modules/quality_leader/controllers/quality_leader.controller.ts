import { Controller, Get, UseGuards } from '@nestjs/common';

import { QualityLeaderService } from '../services/quality-leader.service';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { RolesGuard } from './../../auth/guards/roles.guard';
import { Public } from './../../auth/decorators/public.decorator';
import { Roles } from './../../auth/decorators/roles.decorator';
import { Role } from './../../auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.QUALITY_LEADER)
@Controller('quality-leader')
export class QualityLeaderController {

  constructor(private qualityLeaderService: QualityLeaderService) {}

  @Get()
  getHello() {
    return this.qualityLeaderService.getHello();
  }

  @Public()
  @Get('qualityLeaderpublic')
  getPrueba() {
    return this.qualityLeaderService.getPrueba();
  }
}
