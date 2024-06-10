import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Status } from '../../users/entities/status.entity';
import { AcademicPrograms } from '../entities/academicPrograms.entity';
import { User } from '../../users/entities/user.entity';
import {
  CreateAcademicProgramsDto,
  UpdateAcademicProgramsDto,
} from '../dtos/academicPrograms.dto';

@Injectable()
export class AcademicProgramsService {
  constructor(
    @InjectRepository(AcademicPrograms)
    private academicProgramsRepo: Repository<AcademicPrograms>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Status) private statusRepo: Repository<Status>,
  ) {}

  async findAll() {
    return this.academicProgramsRepo.find({
      relations: ['status', 'user'],
    });
  }

  async findOne(id: number) {
    const newAcademicProgram = await this.academicProgramsRepo.findOne({
      where: { id: id },
      relations: ['status', 'user'],
    });
    if (!newAcademicProgram) {
      throw new NotFoundException(`AcademicProgram #${id} not found`);
    }
    return newAcademicProgram;
  }

  async findByCode(code: number) {
    const newAcademicProgram = await this.academicProgramsRepo.findOne({
      where: { code },
    });
    if (!newAcademicProgram) {
      throw new NotFoundException(`AcademicProgram #${code} not found`);
    }
    return newAcademicProgram;
  }

  async findByUser(id: number) {
    const user = await this.userRepo.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return this.academicProgramsRepo.findOne({
      where: { user: user },
      relations: ['status', 'user'],
    });
  }

  async create(data: CreateAcademicProgramsDto) {
    const newAcademicProgram = this.academicProgramsRepo.create(data);
    if (data.statusId) {
      const status = await this.statusRepo.findOne({
        where: { id: data.statusId },
      });
      newAcademicProgram.status = status;
    }
    if (data.userId) {
      const user = await this.userRepo.findOne({
        where: { id: data.userId },
      });
      newAcademicProgram.user = user;
    }
    return this.academicProgramsRepo.save(newAcademicProgram);
  }

  async update(id: number, changes: UpdateAcademicProgramsDto) {
    const newAcademicProgram = await this.findOne(id);
    if (changes.statusId) {
      const status = await this.statusRepo.findOne({
        where: { id: changes.statusId },
      });
      newAcademicProgram.status = status;
    }
    if (changes.userId) {
      const user = await this.userRepo.findOne({
        where: { id: changes.userId },
      });
      newAcademicProgram.user = user;
    }
    this.academicProgramsRepo.merge(newAcademicProgram, changes);
    return this.academicProgramsRepo.save(newAcademicProgram);
  }

  async remove(id: number) {
    const newAcademicProgram = await this.findOne(id);
    if (!newAcademicProgram) {
      throw new NotFoundException(`AcademicProgram #${id} not found`);
    }
    await this.academicProgramsRepo.delete(id);
    return;
  }
}
