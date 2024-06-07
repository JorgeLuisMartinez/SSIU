import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { SpadminController } from './controllers/spadmin.controller';
import { IndicatorController } from './controllers/indicator.controller';
import { VariableController } from './controllers/variable.controller';
import { TypeQuestionController } from './controllers/typeQuestion.controller';
import { QuestionController } from './controllers/question.controller';

//Services
import { SpadminService } from './services/spadmin.service';
import { IndicatorService } from './services/indicator.service';
import { VariableService } from './services/variable.service';
import { TypeQuestionService } from './services/typeQuestion.service';
import { QuestionService } from './services/question.service';

//Entities
import { Indicator } from './entities/indicator.entity';
import { Variable } from './entities/variable.entity';
import { TypeQuestion } from './entities/typeQuestion.entity';
import { Questions } from './entities/questions.entity';
import { Status } from '../users/entities/status.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Indicator,
      Variable,
      TypeQuestion,
      Questions,
      Status,
    ]),
  ],
  controllers: [
    SpadminController,
    IndicatorController,
    VariableController,
    TypeQuestionController,
    QuestionController,
  ],
  providers: [
    SpadminService,
    IndicatorService,
    VariableService,
    TypeQuestionService,
    QuestionService,
  ],
  exports: [SpadminService],
})
export class SpadminModule {}
