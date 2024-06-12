import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Status } from '../../users/entities/status.entity';
import { Requests } from '../entities/requests.entity';
import { CreateRequestsDto, UpdateRequestsDto } from '../dtos/requests.dto';
import { Stages } from '../../admin/entities/stages.entity';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Requests)
    private requestsRepo: Repository<Requests>,
    @InjectRepository(Stages)
    private stagesRepo: Repository<Stages>,
    @InjectRepository(Status) private statusRepo: Repository<Status>,
  ) {}

  async findAll() {
    return this.requestsRepo.find({
      relations: ['status', 'stage'],
    });
  }

  async findOne(id: number) {
    const newRequest = await this.requestsRepo.findOne({
      where: { id: id },
      relations: ['status', 'stage'],
    });
    if (!newRequest) {
      throw new NotFoundException(`Request #${id} not found`);
    }
    return newRequest;
  }

  async create(data: CreateRequestsDto) {
    const newRequest = this.requestsRepo.create(data);
    if (data.statusId) {
      const status = await this.statusRepo.findOne({
        where: { id: data.statusId },
      });
      newRequest.status = status;
    }
    if (data.stageId) {
      const stage = await this.stagesRepo.findOne({
        where: { id: data.stageId },
      });
      newRequest.stage = stage;
    }
    return this.requestsRepo.save(newRequest);
  }

  async update(id: number, changes: UpdateRequestsDto) {
    const newRequest = await this.findOne(id);
    if (changes.statusId) {
      const status = await this.statusRepo.findOne({
        where: { id: changes.statusId },
      });
      newRequest.status = status;
    }
    if (changes.stageId) {
      const stage = await this.stagesRepo.findOne({
        where: { id: changes.stageId },
      });
      newRequest.stage = stage;
    }
    this.requestsRepo.merge(newRequest, changes);
    return this.requestsRepo.save(newRequest);
  }

  async remove(id: number) {
    const newRequest = await this.findOne(id);
    if (!newRequest) {
      throw new NotFoundException(`Request #${id} not found`);
    }
    await this.requestsRepo.delete(id);
    return;
  }
}
