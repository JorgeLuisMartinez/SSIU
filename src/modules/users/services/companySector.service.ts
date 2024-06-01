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

  findOne(id: number) {
    const user = this.companySectorRepo.findOne({
      where: { id: id },
      // relations: ['user'],
    });
    if (!user) {
      throw new NotFoundException(`Dni Type #${id} not found`);
    }
    return user;
  }

  create(data: CreateCompanySectorDto) {
    const newCompanySector = this.companySectorRepo.create(data);
    return this.companySectorRepo.save(newCompanySector);
  }

  async update(id: number, changes: UpdateCompanySectorDto) {
    const companySector = await this.companySectorRepo.findOne({
      where: { id: id },
    });
    this.companySectorRepo.merge(companySector, changes);
    return this.companySectorRepo.save(companySector);
  }

  remove(id: number) {
    return this.companySectorRepo.delete(id);
  }
}
