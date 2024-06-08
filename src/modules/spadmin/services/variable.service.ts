import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Variable } from '../entities/variable.entity';
import { Status } from '../../users/entities/status.entity';
import { CreateVariableDto, UpdateVariableDto } from '../dtos/variable.dto';

@Injectable()
export class VariableService {
  constructor(
    @InjectRepository(Variable)
    private variableRepo: Repository<Variable>,
    @InjectRepository(Status) private statusRepo: Repository<Status>,
  ) {}

  findAll() {
    return this.variableRepo.find();
  }

  findOne(id: number) {
    const user = this.variableRepo.findOne({
      where: { id: id },
      relations: ['status'],
    });
    if (!user) {
      throw new NotFoundException(`Dni Type #${id} not found`);
    }
    return user;
  }

  async create(data: CreateVariableDto) {
    const newVariable = this.variableRepo.create(data);
    if (data.statusId) {
      const status = await this.statusRepo.findOne({
        where: { id: data.statusId },
      });
      newVariable.status = status;
    }
    return this.variableRepo.save(newVariable);
  }

  async update(id: number, changes: UpdateVariableDto) {
    const variable = await this.variableRepo.findOne({ where: { id: id } });
    if (changes.statusId) {
      const status = await this.statusRepo.findOne({
        where: { id: changes.statusId },
      });
      variable.status = status;
    }
    this.variableRepo.merge(variable, changes);
    return this.variableRepo.save(variable);
  }

  async remove(id: number) {
    const variable = await this.findOne(id);
    if (!variable) {
      throw new NotFoundException(`Variable #${id} not found`);
    }
    return this.variableRepo.delete(id);
  }
}
