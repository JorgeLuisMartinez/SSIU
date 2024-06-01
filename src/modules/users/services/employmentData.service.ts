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
    const user = this.employmentDataRepo.findOne({
      where: { id: id },
      relations: ['companySector', 'user'],
    });
    if (!user) {
      throw new NotFoundException(`Dni Type #${id} not found`);
    }
    return user;
  }

  create(data: CreateEmploymentDataDto) {
    const newStudyType = this.employmentDataRepo.create(data);
    return this.employmentDataRepo.save(newStudyType);
  }

  async update(id: number, changes: UpdateEmploymentDataDto) {
    const studyType = await this.employmentDataRepo.findOne({
      where: { id: id },
    });
    this.employmentDataRepo.merge(studyType, changes);
    return this.employmentDataRepo.save(studyType);
  }

  remove(id: number) {
    return this.employmentDataRepo.delete(id);
  }
}
