import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Variable } from '../entities/variable.entity';
import { Status } from '../../users/entities/status.entity';
import { Indicator } from '../entities/indicator.entity';
import { CreateIndicatorDto, UpdateIndicatorDto } from '../dtos/indicator.dto';

@Injectable()
export class IndicatorService {
  constructor(
    @InjectRepository(Indicator)
    private indicatorRepo: Repository<Indicator>,
    @InjectRepository(Variable)
    private variableRepo: Repository<Variable>,
    @InjectRepository(Status)
    private statusRepo: Repository<Status>,
  ) {}

  findAll() {
    return this.indicatorRepo.find({
      relations: ['variable', 'status'],
    });
  }

  async findOne(id: number) {
    const indicator = await this.indicatorRepo.findOne({
      where: { id: id },
      relations: ['variable'],
    });
    if (!indicator) {
      throw new NotFoundException(`Indicator #${id} not found`);
    }
    return indicator;
  }

  async findByVariable(id: number) {
    const variable = await this.variableRepo.findOne({
      where: { id: id },
    });
    if (!variable) {
      throw new NotFoundException(`Variable #${id} not found`);
    }
    return this.indicatorRepo.findOne({
      where: { variable: variable },
      relations: ['variable', 'status'],
    });
  }

  async create(data: CreateIndicatorDto) {
    const newIndicator = this.indicatorRepo.create(data);
    if (data.variableId) {
      const variable = await this.variableRepo.findOne({
        where: { id: data.variableId },
      });
      //console.log(studyType);
      newIndicator.variable = variable;
    }
    if (data.statusId) {
      const status = await this.statusRepo.findOne({
        where: { id: data.statusId },
      });
      newIndicator.status = status;
    }
    return this.indicatorRepo.save(newIndicator);
  }

  async update(id: number, changes: UpdateIndicatorDto) {
    const indicator = await this.findOne(id);
    if (changes.variableId) {
      const variable = await this.variableRepo.findOne({
        where: { id: changes.variableId },
      });
      indicator.variable = variable;
    }
    if (changes.statusId) {
      const status = await this.statusRepo.findOne({
        where: { id: changes.statusId },
      });
      indicator.status = status;
    }
    this.indicatorRepo.merge(indicator, changes);
    return this.indicatorRepo.save(indicator);
  }

  async remove(id: number) {
    const indicator = await this.findOne(id);
    if (!indicator) {
      throw new NotFoundException(`Indicator #${id} not found`);
    }
    return this.indicatorRepo.delete(id);
  }
}
