import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { Gender } from '../entities/gender.entity';
import { DniType } from '../entities/dniType.entity';
import { Role } from '../entities/role.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Gender) private genderRepo: Repository<Gender>,
    @InjectRepository(DniType) private dniTypeRepo: Repository<DniType>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
  ) {}

  findAll() {
    return this.userRepo.find({
      relations: ['role', 'gender', 'dni_type'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: { id: id },
      relations: ['role', 'gender', 'dni_type'],
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
      data.dni == userRegister.dni
    ) {
      const hashPassword = await bcrypt.compare(
        userRegister.dni.toString(),
        userRegister.password,
      );
      return `mensaje de exito ${hashPassword}`;
    }
    return 'mensaje de error';
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({
      where: { email },
      relations: ['role', 'gender', 'dni_type'],
    });
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    const hashPassword = await bcrypt.hash(newUser.dni.toString(), 10);
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
    return this.userRepo.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id });
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
