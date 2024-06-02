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

  findOne(id: number) {
    const employmentData = this.employmentDataRepo.findOne({
      where: { id: id },
      relations: ['companySector', 'user'],
    });
    if (!employmentData) {
      throw new NotFoundException(`employmentData #${id} not found`);
    }
    return employmentData;
  }

  async findByUser(id: number) {
    //console.log('entro');
    const user = await this.userRepo.findOne({
      where: { id: id },
    });

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
      //console.log(companySector);
      newEmployment.companySector = companySector;
    }
    if (data.userId) {
      const user = await this.userRepo.findOne({
        where: { id: data.userId },
      });
      //console.log(user);
      newEmployment.user = user;
    }
    return this.employmentDataRepo.save(newEmployment);
  }

  async update(id: number, changes: UpdateEmploymentDataDto) {
    const employmentData = await this.findOne(id);
    if (changes.companySectorId) {
      const companySector = await this.companySectorRepo.findOne({
        where: { id: changes.companySectorId },
      });
      employmentData.companySector = companySector;
    }

    this.employmentDataRepo.merge(employmentData, changes);
    return this.employmentDataRepo.save(employmentData);
  }

  remove(id: number) {
    if (!this.findOne(id)) {
      throw new NotFoundException(`EmploymentData #${id} not found`);
    }
    return this.employmentDataRepo.delete(id);
  }
}
