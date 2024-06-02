import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StudyTypes } from '../entities/studyTypes.entity';
import {
  CreateStudyTypesDto,
  UpdateStudyTypesDto,
} from '../dtos/studyTypes.dto';

@Injectable()
export class StudyTypesService {
  constructor(
    @InjectRepository(StudyTypes)
    private studyTypesRepo: Repository<StudyTypes>,
  ) {}

  findAll() {
    return this.studyTypesRepo.find();
  }

  findOne(id: number) {
    const user = this.studyTypesRepo.findOne({
      where: { id: id },
      // relations: ['user'],
    });
    if (!user) {
      throw new NotFoundException(`Dni Type #${id} not found`);
    }
    return user;
  }

  create(data: CreateStudyTypesDto) {
    const newStudyType = this.studyTypesRepo.create(data);
    return this.studyTypesRepo.save(newStudyType);
  }

  async update(id: number, changes: UpdateStudyTypesDto) {
    const studyTypes = await this.studyTypesRepo.findOne({ where: { id: id } });
    this.studyTypesRepo.merge(studyTypes, changes);
    return this.studyTypesRepo.save(studyTypes);
  }

  remove(id: number) {
    return this.studyTypesRepo.delete(id);
  }
}
