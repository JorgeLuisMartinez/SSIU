import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Gender } from './entities/gender.entity';
import { DniType } from './entities/dniType.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Gender, DniType])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
