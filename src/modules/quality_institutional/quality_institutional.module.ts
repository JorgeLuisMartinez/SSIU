import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QualityInstitutionalController } from './controllers/quality_institutional.controller';
import { QualityInstitutionalService } from './services/quality-institutional.service';

@Module({
  controllers: [QualityInstitutionalController],
  providers: [QualityInstitutionalService]
})
export class QualityInstitutionalModule {}
