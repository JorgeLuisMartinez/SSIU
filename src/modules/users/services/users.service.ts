import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { Gender } from '../entities/gender.entity';
import { DniType } from '../entities/dniType.entity';
import { Role } from '../entities/role.entity';
import { Status } from '../entities/status.entity';

import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Gender) private genderRepo: Repository<Gender>,
    @InjectRepository(DniType) private dniTypeRepo: Repository<DniType>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    @InjectRepository(Status) private statusRepo: Repository<Status>,
  ) {}

  findAll() {
    return this.userRepo.find({
      relations: ['role', 'gender', 'dni_type', 'status'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: { id: id },
      relations: ['role', 'gender', 'dni_type', 'status'],
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async validateUserRegister(data: UpdateUserDto) {
    const userRegister = await this.findByEmail(data.email);
    if (
      data.dniTypeId == userRegister.dni_type.id &&
      data.dni == userRegister.dni &&
      userRegister.status.id == 2
    ) {
      userRegister.status.id = 1;
      await this.update(userRegister.id, userRegister);
      return userRegister.name.charAt(0).toUpperCase() + userRegister.dni;
    }
    return 'mensaje de error';
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({
      where: { email },
      relations: ['role', 'gender', 'dni_type', 'status'],
    });
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    const hashPassword = await bcrypt.hash(
      newUser.name.charAt(0).toUpperCase() + newUser.dni.toString(),
      10,
    );
    newUser.password = hashPassword;
    if (data.genderId) {
      const gender = await this.genderRepo.findOne({
        where: { id: data.genderId },
      });
      newUser.gender = gender;
    }
    if (data.dniTypeId) {
      const dniType = await this.dniTypeRepo.findOne({
        where: { id: data.dniTypeId },
      });
      newUser.dni_type = dniType;
    }
    if (data.rolesId) {
      const roles = await this.roleRepo.findBy({ id: In(data.rolesId) });
      newUser.role = roles;
    }
    if (data.statusId) {
      const status = await this.statusRepo.findOne({
        where: { id: data.statusId },
      });
      newUser.status = status;
    }
    return this.userRepo.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.findOne(id);
    if (changes.genderId) {
      const gender = await this.genderRepo.findOne({
        where: { id: changes.genderId },
      });
      user.gender = gender;
    }
    if (changes.dniTypeId) {
      const dniType = await this.dniTypeRepo.findOne({
        where: { id: changes.dniTypeId },
      });
      user.dni_type = dniType;
    }
    if (changes.rolesId) {
      const roles = await this.roleRepo.findBy({ id: In(changes.rolesId) });
      user.role = roles;
    }
    if (changes.statusId) {
      const status = await this.statusRepo.findOne({
        where: { id: changes.statusId },
      });
      user.status = status;
    }
    this.userRepo.merge(user, changes);
    return this.userRepo.save(user);
  }

  remove(id: number) {
    if (!this.findOne(id)) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return this.userRepo.delete(id);
  }
}
