import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { AdminController } from './controllers/admin.controller';
import { StageController } from './controllers/stage.controller';

//Services
import { AdminService } from './services/admin.service';
import { StagesService } from './services/stages.service';

//Entities
import { Stages } from './entities/stages.entity';
import { AcademicPrograms } from '../spadmin/entities/academicPrograms.entity';
import { Status } from '../users/entities/status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stages, Status, AcademicPrograms])],
  controllers: [AdminController, StageController],
  providers: [AdminService, StagesService],
  exports: [TypeOrmModule, AdminService],
})
export class AdminModule {}
