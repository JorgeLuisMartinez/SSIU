import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { UsersController } from './controllers/users.controller';
import { DniTypesController } from './controllers/dni-types.controller';
//Services
import { UsersService } from './services/users.service';
import { DniTypesService } from './services/dniTypes.service';
//Entities
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Gender } from './entities/gender.entity';
import { DniType } from './entities/dniType.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Gender, DniType])],
  controllers: [UsersController, DniTypesController],
  providers: [UsersService, DniTypesService],
  exports: [UsersService],
})
export class UsersModule {}
