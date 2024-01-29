import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QualityLeaderController } from './controllers/quality_leader.controller';
import { QualityLeaderService } from './services/quality-leader.service';

@Module({
  controllers: [QualityLeaderController],
  providers: [QualityLeaderService]
})
export class QualityLeaderModule {}
