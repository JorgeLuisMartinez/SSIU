import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CompanySector } from '../entities/companySector.entity';
import {
  CreateCompanySectorDto,
  UpdateCompanySectorDto,
} from '../dtos/companySector.dto';

@Injectable()
export class CompanySectorService {
  constructor(
    @InjectRepository(CompanySector)
    private companySectorRepo: Repository<CompanySector>,
  ) {}

  findAll() {
    return this.companySectorRepo.find();
  }

  async findOne(id: number) {
    const companySector = await this.companySectorRepo.findOne({
      where: { id: id },
    });
    if (!companySector) {
      throw new NotFoundException(`CompanySector #${id} not found`);
    }
    return companySector;
  }

  async create(data: CreateCompanySectorDto) {
    const newCompanySector = this.companySectorRepo.create(data);
    return this.companySectorRepo.save(newCompanySector);
  }

  async update(id: number, changes: UpdateCompanySectorDto) {
    const companySector = await this.companySectorRepo.findOne({
      where: { id: id },
    });
    if (!companySector) {
      throw new NotFoundException(`CompanySector #${id} not found`);
    }
    this.companySectorRepo.merge(companySector, changes);
    return this.companySectorRepo.save(companySector);
  }

  async remove(id: number) {
    const companySector = await this.companySectorRepo.findOne({
      where: { id: id },
    });
    if (!companySector) {
      throw new NotFoundException(`CompanySector #${id} not found`);
    }
    return this.companySectorRepo.delete(id);
  }
}
