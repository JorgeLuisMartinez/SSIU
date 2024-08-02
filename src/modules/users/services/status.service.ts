import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Status } from '../entities/status.entity';
import { CreateStatusDto, UpdateStatusDto } from '../dtos/status.dto';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status) private statusRepo: Repository<Status>,
  ) {}

  findAll() {
    return this.statusRepo.find();
  }

  async findOne(id: number): Promise<Status> {
    const status = await this.statusRepo.findOne({
      where: { id: id },
      // relations: ['user'],
    });
    if (!status) {
      throw new NotFoundException(`Status #${id} not found`);
    }
    return status;
  }

  create(data: CreateStatusDto) {
    const status = this.statusRepo.create(data);
    return this.statusRepo.save(status);
  }

  async update(id: number, changes: UpdateStatusDto): Promise<Status> {
    const status = await this.statusRepo.findOne({ where: { id: id } });
    if (!status) {
      throw new NotFoundException(`Status #${id} not found`);
    }
    this.statusRepo.merge(status, changes);
    return this.statusRepo.save(status);
  }


  async remove(id: number): Promise<void> {
    const result = await this.statusRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Status #${id} not found`);
    }
  }


}
