import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { UsersController } from './controllers/users.controller';
import { DniTypesController } from './controllers/dni-types.controller';
import { StatusController } from './controllers/status.controller';
import { GenderController } from './controllers/gender.controller';
import { StudyTypesController } from './controllers/StudyType.controller';
import { EmploymentDataController } from './controllers/employmentData.controller';
import { CompanySectorController } from './controllers/companySector.controller';
//Services
import { UsersService } from './services/users.service';
import { DniTypesService } from './services/dniTypes.service';
import { StatusService } from './services/status.service';
import { RolesService } from './services/roles.service';
import { GendersService } from './services/genders.service';
import { StudyTypesService } from './services/studyTypes.service';
import { EmploymentDataService } from './services/employmentData.service';
import { CompanySectorService } from './services/companySector.service';
//Entities
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Gender } from './entities/gender.entity';
import { DniType } from './entities/dniType.entity';
import { Status } from './entities/status.entity';
import { StudyTypes } from './entities/studyTypes.enitity';
import { EmploymentData } from './entities/employmentData.entity';
import { CompanySector } from './entities/companySector.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Role,
      Gender,
      DniType,
      Status,
      StudyTypes,
      EmploymentData,
      CompanySector,
    ]),
  ],
  controllers: [
    UsersController,
    DniTypesController,
    StatusController,
    GenderController,
    StudyTypesController,
    EmploymentDataController,
    CompanySectorController,
  ],
  providers: [
    UsersService,
    DniTypesService,
    StatusService,
    RolesService,
    GendersService,
    StudyTypesService,
    EmploymentDataService,
    CompanySectorService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
