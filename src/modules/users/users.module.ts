import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { UsersController } from './controllers/users.controller';
import { DniTypesController } from './controllers/dni-types.controller';
//Services
import { UsersService } from './services/users.service';
import { DniTypesService } from './services/dniTypes.service';
import { StatusService } from './services/status.service';
//Entities
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Gender } from './entities/gender.entity';
import { DniType } from './entities/dniType.entity';
import { Status } from './entities/status.entity';
import { RolesService } from './services/roles.service';
import { GendersService } from './services/genders.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Gender, DniType, Status])],
  controllers: [UsersController, DniTypesController],
  providers: [
    UsersService,
    DniTypesService,
    StatusService,
    RolesService,
    GendersService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
