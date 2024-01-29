import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SpadminController } from './controllers/spadmin.controller';
import { SpadminService } from './services/spadmin.service';

@Module({
  controllers: [SpadminController],
  providers: [SpadminService]
})
export class SpadminModule {}
