import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import { AuthModule } from './auth/auth.module';
import { GraduatesModule } from './graduates/graduates.module';
import { TeachersModule } from './teachers/teachers.module';
import { AdminModule } from './admin/admin.module';
import { SpadminModule } from './spadmin/spadmin.module';
import { EmployersModule } from './employers/employers.module';
import { QualityLeaderModule } from './quality_leader/quality_leader.module';
import { QualityInstitutionalModule } from './quality_institutional/quality_institutional.module';
import config from './config';

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
  providers: [
    AppService,
  ],
})
export class AppModule {}
