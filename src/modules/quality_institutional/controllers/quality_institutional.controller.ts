import { Controller, Get, UseGuards } from '@nestjs/common';

import { QualityInstitutionalService } from '../services/quality-institutional.service';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { RolesGuard } from './../../auth/guards/roles.guard';
import { Public } from './../../auth/decorators/public.decorator';
import { Roles } from './../../auth/decorators/roles.decorator';
import { Role } from './../../auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.QUALITY_INSTITUTIONAL)
@Controller('quality-institutional')
export class QualityInstitutionalController {

  constructor(private qualityInstitutionalService: QualityInstitutionalService) {}

  @Get()
  getHello() {
    return this.qualityInstitutionalService.getHello();
  }

  @Public()
  @Get('qualityInstitutionalpublic')
  getPrueba() {
    return this.qualityInstitutionalService.getPrueba();
  }
}
