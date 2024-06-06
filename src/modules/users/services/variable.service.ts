import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Variable } from '../entities/variable.entity';
import { CreateVariableDto, UpdateVariableDto } from '../dtos/variable.dto';

@Injectable()
export class VariableService {
  constructor(
    @InjectRepository(Variable)
    private variableRepo: Repository<Variable>,
  ) {}

  findAll() {
    return this.variableRepo.find();
  }

  findOne(id: number) {
    const user = this.variableRepo.findOne({
      where: { id: id },
      // relations: ['user'],
    });
    if (!user) {
      throw new NotFoundException(`Dni Type #${id} not found`);
    }
    return user;
  }

  create(data: CreateVariableDto) {
    const newVariable = this.variableRepo.create(data);
    return this.variableRepo.save(newVariable);
  }

  async update(id: number, changes: UpdateVariableDto) {
    const variable = await this.variableRepo.findOne({ where: { id: id } });
    this.variableRepo.merge(variable, changes);
    return this.variableRepo.save(variable);
  }

  remove(id: number) {
    return this.variableRepo.delete(id);
  }
}
