import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DniType } from '../entities/dniType.entity';
import { CreateDniTypeDto, UpdateDniTypeDto } from '../dtos/dniType.dto';

@Injectable()
export class DniTypesService {
  constructor(
    @InjectRepository(DniType) private dniTypeRepo: Repository<DniType>,
  ) {}

  findAll() {
    return this.dniTypeRepo.find();
  }

async findOne(id: number) {
    const user = await this.dniTypeRepo.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException(`Dni Type #${id} not found`);
    }
    return user;
  }

  create(data: CreateDniTypeDto) {
    const newDniType = this.dniTypeRepo.create(data);
    return this.dniTypeRepo.save(newDniType);
  }

  async update(id: number, changes: UpdateDniTypeDto) {
    const dniType = await this.dniTypeRepo.findOne({ where: { id: id } });
    if (!dniType) {
      throw new NotFoundException(`Dni Type #${id} not found`);
    }
    this.dniTypeRepo.merge(dniType, changes);
    return this.dniTypeRepo.save(dniType);
  }

  async remove(id: number) {
    const dniType = await this.dniTypeRepo.findOne({ where: { id: id } });
    if (!dniType) {
      throw new NotFoundException(`Dni Type #${id} not found`);
    }
    return this.dniTypeRepo.delete(id);
  }

}
