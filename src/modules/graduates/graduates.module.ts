import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GraduatesController } from './controllers/graduates.controller';
import { GraduatesService } from './services/graduates.service';

@Module({
  controllers: [GraduatesController],
  providers: [GraduatesService]
})
export class GraduatesModule {}
