import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployersController } from './controllers/employers.controller';
import { EmployersService } from './services/employers.service';

@Module({
  controllers: [EmployersController],
  providers: [EmployersService],
})
export class EmployersModule {}
