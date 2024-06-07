import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Variable } from '../entities/variable.entity';
import { Indicator } from '../entities/indicator.entity';
import { CreateIndicatorDto, UpdateIndicatorDto } from '../dtos/indicator.dto';

@Injectable()
export class IndicatorService {
  constructor(
    @InjectRepository(Indicator)
    private indicatorRepo: Repository<Indicator>,
    @InjectRepository(Variable)
    private variableRepo: Repository<Variable>,
  ) {}

  findAll() {
    return this.indicatorRepo.find({
      relations: ['variable'],
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

  async create(data: CreateIndicatorDto) {
    const newIndicator = this.indicatorRepo.create(data);
    if (data.variableId) {
      const variable = await this.variableRepo.findOne({
        where: { id: data.variableId },
      });
      //console.log(studyType);
      newIndicator.variable = variable;
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
    this.indicatorRepo.merge(indicator, changes);
    return this.indicatorRepo.save(indicator);
  }

  remove(id: number) {
    if (!this.findOne(id)) {
      throw new NotFoundException(`Indicator #${id} not found`);
    }
    return this.indicatorRepo.delete(id);
  }
}
