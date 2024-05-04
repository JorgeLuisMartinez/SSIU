import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './modules/database/database.module';
import { enviroments } from './enviroments';
import { AuthModule } from './modules/auth/auth.module';
import { GraduatesModule } from './modules/graduates/graduates.module';
import { TeachersModule } from './modules/teachers/teachers.module';
import { AdminModule } from './modules/admin/admin.module';
import { SpadminModule } from './modules/spadmin/spadmin.module';
import { EmployersModule } from './modules/employers/employers.module';
import { QualityLeaderModule } from './modules/quality_leader/quality_leader.module';
import { QualityInstitutionalModule } from './modules/quality_institutional/quality_institutional.module';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_PORT: Joi.number().required(),
      }),
    }),
    UsersModule,
    DatabaseModule,
    AuthModule,
    GraduatesModule,
    TeachersModule,
    AdminModule,
    SpadminModule,
    EmployersModule,
    QualityLeaderModule,
    QualityInstitutionalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
