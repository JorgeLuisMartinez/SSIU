import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from '../entities/role.entity';
import { CreateRolesDto, UpdateRolesDto } from '../dtos/roles.dto';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private roleRepo: Repository<Role>) {}

  findAll() {
    return this.roleRepo.find();
  }

  findOne(id: number) {
    const user = this.roleRepo.findOne({
      where: { id: id },
      // relations: ['user'],
    });
    if (!user) {
      throw new NotFoundException(`Role #${id} not found`);
    }
    return user;
  }

  create(data: CreateRolesDto) {
    const role = this.roleRepo.create(data);
    return this.roleRepo.save(role);
  }

  async update(id: number, changes: UpdateRolesDto) {
    const role = await this.roleRepo.findOne({ where: { id: id } });
    this.roleRepo.merge(role, changes);
    return this.roleRepo.save(role);
  }

  remove(id: number) {
    return this.roleRepo.delete(id);
  }
}
