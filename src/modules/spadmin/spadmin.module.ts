import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { SpadminController } from './controllers/spadmin.controller';
import { IndicatorController } from './controllers/indicator.controller';
import { VariableController } from './controllers/variable.controller';
import { TypeQuestionController } from './controllers/typeQuestion.controller';
import { QuestionController } from './controllers/question.controller';
import { AcademicProgramsController } from './controllers/academicPrograms.controller';
import { RequestsController } from './controllers/requests.controller';

//Services
import { SpadminService } from './services/spadmin.service';
import { IndicatorService } from './services/indicator.service';
import { VariableService } from './services/variable.service';
import { TypeQuestionService } from './services/typeQuestion.service';
import { QuestionService } from './services/question.service';
import { AcademicProgramsService } from './services/academicPrograms.service';
import { RequestsService } from './services/requests.service';

//Entities
import { Indicator } from './entities/indicator.entity';
import { Variable } from './entities/variable.entity';
import { TypeQuestion } from './entities/typeQuestion.entity';
import { Questions } from './entities/questions.entity';
import { AcademicPrograms } from './entities/academicPrograms.entity';
import { Requests } from './entities/requests.entity';
import { Status } from '../users/entities/status.entity';
import { User } from '../users/entities/user.entity';
import { Stages } from '../admin/entities/stages.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AcademicPrograms,
      Indicator,
      Questions,
      Requests,
      TypeQuestion,
      Variable,
      Status,
      User,
      Stages,
    ]),
  ],
  controllers: [
    SpadminController,
    AcademicProgramsController,
    IndicatorController,
    QuestionController,
    RequestsController,
    TypeQuestionController,
    VariableController,
  ],
  providers: [
    SpadminService,
    AcademicProgramsService,
    IndicatorService,
    QuestionService,
    RequestsService,
    TypeQuestionService,
    VariableService,
  ],
  exports: [TypeOrmModule, SpadminService],
})
export class SpadminModule {}
