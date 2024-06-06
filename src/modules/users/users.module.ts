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
import { AcademicDataController } from './controllers/academicData.controller';
import { IndicatorController } from './controllers/indicator.controller';
import { VariableController } from './controllers/variable.controller';
//Services
import { UsersService } from './services/users.service';
import { DniTypesService } from './services/dniTypes.service';
import { StatusService } from './services/status.service';
import { RolesService } from './services/roles.service';
import { GendersService } from './services/genders.service';
import { StudyTypesService } from './services/studyTypes.service';
import { EmploymentDataService } from './services/employmentData.service';
import { CompanySectorService } from './services/companySector.service';
import { AcademicDataService } from './services/academicData.service';
import { IndicatorService } from './services/indicator.service';
import { VariableService } from './services/variable.service';
//Entities
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Gender } from './entities/gender.entity';
import { DniType } from './entities/dniType.entity';
import { Status } from './entities/status.entity';
import { StudyTypes } from './entities/studyTypes.entity';
import { EmploymentData } from './entities/employmentData.entity';
import { CompanySector } from './entities/companySector.entity';
import { AcademicData } from './entities/academicData.entity';
import { Indicator } from './entities/indicator.entity';
import { Variable } from './entities/variable.entity';

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
      AcademicData,
      Indicator,
      Variable,
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
    AcademicDataController,
    IndicatorController,
    VariableController,
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
    AcademicDataService,
    IndicatorService,
    VariableService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
