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

  findOne(id: number) {
    const user = this.statusRepo.findOne({
      where: { id: id },
      // relations: ['user'],
    });
    if (!user) {
      throw new NotFoundException(`Status #${id} not found`);
    }
    return user;
  }

  create(data: CreateStatusDto) {
    const status = this.statusRepo.create(data);
    return this.statusRepo.save(status);
  }

  async update(id: number, changes: UpdateStatusDto) {
    const status = await this.statusRepo.findOne({ where: { id: id } });
    this.statusRepo.merge(status, changes);
    return this.statusRepo.save(status);
  }

  remove(id: number) {
    return this.statusRepo.delete(id);
  }
}
