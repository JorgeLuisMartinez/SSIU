import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EmploymentData } from '../entities/employmentData.entity';
import { User } from '../entities/user.entity';
import { CompanySector } from '../entities/companySector.entity';
import {
  CreateEmploymentDataDto,
  UpdateEmploymentDataDto,
} from '../dtos/employmentData.dto';

@Injectable()
export class EmploymentDataService {
  constructor(
    @InjectRepository(EmploymentData)
    private employmentDataRepo: Repository<EmploymentData>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(CompanySector)
    private companySectorRepo: Repository<CompanySector>,
  ) {}

  findAll() {
    return this.employmentDataRepo.find({
      relations: ['companySector', 'user'],
    });
  }

  async findOne(id: number) {
    const employmentData = await this.employmentDataRepo.findOne({
      where: { id: id },
      relations: ['companySector', 'user'],
    });
    if (!employmentData) {
      throw new NotFoundException(`employmentData #${id} not found`);
    }
    return employmentData;
  }

  async findByUser(id: number) {
    const user = await this.userRepo.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException(`user #${id} not found`);
    }
    return this.employmentDataRepo.findOne({
      where: { user: user },
      relations: ['companySector'],
    });
  }

  async create(data: CreateEmploymentDataDto) {
    const newEmployment = this.employmentDataRepo.create(data);
    if (data.companySectorId) {
      const companySector = await this.companySectorRepo.findOne({
        where: { id: data.companySectorId },
      });
      newEmployment.companySector = companySector;
    }
    if (data.userId) {
      const user = await this.userRepo.findOne({
        where: { id: data.userId },
      });
      newEmployment.user = user;
    }
    return this.employmentDataRepo.save(newEmployment);
  }

  async update(id: number, changes: UpdateEmploymentDataDto) {
    const employmentData = await this.findByUser(id);
    if (changes.companySectorId) {
      const companySector = await this.companySectorRepo.findOne({
        where: { id: changes.companySectorId },
      });
      employmentData.companySector = companySector;
    }
    this.employmentDataRepo.merge(employmentData, changes);
    return this.employmentDataRepo.save(employmentData);
  }

  async remove(id: number) {
    const employmentData = await this.findOne(id);
    if (!employmentData) {
      throw new NotFoundException(`EmploymentData #${id} not found`);
    }
    await this.employmentDataRepo.delete(id);
    return;
  }
}
