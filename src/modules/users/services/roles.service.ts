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

  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepo.findOne({
      where: { id: id },
      // relations: ['user'],
    });
    if (!role) {
      throw new NotFoundException(`Role #${id} not found`);
    }
    return role;
  }

  create(data: CreateRolesDto) {
    const role = this.roleRepo.create(data);
    return this.roleRepo.save(role);
  }

  async update(id: number, changes: UpdateRolesDto): Promise<Role> {
    const role = await this.roleRepo.findOne({ where: { id: id } });
    if (!role) {
      throw new NotFoundException(`Role #${id} not found`);
    }
    this.roleRepo.merge(role, changes);
    return this.roleRepo.save(role);
  }

  async remove(id: number): Promise<void> {
    const result = await this.roleRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Role #${id} not found`);
    }
  }

}
