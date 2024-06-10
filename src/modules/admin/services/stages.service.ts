import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Status } from '../../users/entities/status.entity';
import { Stages } from '../entities/stages.entity';
import { AcademicPrograms } from '../../spadmin/entities/academicPrograms.entity';
import { CreateStageDto, UpdateStageDto } from '../dtos/stages.dto';

@Injectable()
export class StagesService {
  constructor(
    @InjectRepository(Stages) private stagesRepo: Repository<Stages>,
    @InjectRepository(Status) private statusRepo: Repository<Status>,
    @InjectRepository(AcademicPrograms)
    private academicProgramsRepo: Repository<AcademicPrograms>,
  ) {}

  async findAll() {
    return this.stagesRepo.find({
      relations: ['status', 'academicProgram'],
    });
  }

  async findOne(id: number) {
    const newStage = await this.stagesRepo.findOne({
      where: { id: id },
      relations: ['status', 'academicProgram'],
    });
    if (!newStage) {
      throw new NotFoundException(`Stage #${id} not found`);
    }
    return newStage;
  }

  async findByAcademicProgram(id: number) {
    const AcademicProgram = await this.academicProgramsRepo.findOne({
      where: { id: id },
    });
    if (!AcademicProgram) {
      throw new NotFoundException(`AcademicProgram #${id} not found`);
    }
    return this.stagesRepo.findOne({
      where: { academicProgram: AcademicProgram },
      relations: ['status', 'academicProgram'],
    });
  }

  async create(data: CreateStageDto) {
    const newStage = this.stagesRepo.create(data);
    if (data.statusId) {
      const status = await this.statusRepo.findOne({
        where: { id: data.statusId },
      });
      newStage.status = status;
    }
    if (data.academicProgramId) {
      const AcademicProgram = await this.academicProgramsRepo.findOne({
        where: { id: data.academicProgramId },
      });
      newStage.academicProgram = AcademicProgram;
    }
    return this.stagesRepo.save(newStage);
  }

  async update(id: number, changes: UpdateStageDto) {
    const newStage = await this.findOne(id);
    if (changes.statusId) {
      const status = await this.statusRepo.findOne({
        where: { id: changes.statusId },
      });
      newStage.status = status;
    }
    if (changes.academicProgramId) {
      const AcademicProgram = await this.academicProgramsRepo.findOne({
        where: { id: changes.academicProgramId },
      });
      newStage.academicProgram = AcademicProgram;
    }
    this.stagesRepo.merge(newStage, changes);
    return this.stagesRepo.save(newStage);
  }

  async remove(id: number) {
    const newStage = await this.findOne(id);
    if (!newStage) {
      throw new NotFoundException(`Stage #${id} not found`);
    }
    await this.stagesRepo.delete(id);
    return;
  }
}
