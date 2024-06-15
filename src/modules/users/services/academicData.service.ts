import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AcademicData } from '../entities/academicData.entity';
import { User } from '../entities/user.entity';
import { StudyTypes } from '../entities/studyTypes.entity';
import {
  CreateAcademicDataDto,
  UpdateAcademicDataDto,
} from '../dtos/academicData.dto';

@Injectable()
export class AcademicDataService {
  constructor(
    @InjectRepository(AcademicData)
    private academicDataRepo: Repository<AcademicData>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(StudyTypes)
    private studyTypesRepo: Repository<StudyTypes>,
  ) {}

  findAll() {
    return this.academicDataRepo.find({
      relations: ['studyType', 'user'],
    });
  }

  async findOne(id: number) {
    const academicData = await this.academicDataRepo.findOne({
      where: { id: id },
      relations: ['studyType', 'user'],
    });
    if (!academicData) {
      throw new NotFoundException(`AcademicData #${id} not found`);
    }
    return academicData;
  }

  async findByUser(id: number) {
    const user = await this.userRepo.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException(`user #${id} not found`);
    }
    return this.academicDataRepo.findOne({
      where: { user: user },
      relations: ['studyType'],
    });
  }

  async create(data: CreateAcademicDataDto) {
    const newAcademicData = this.academicDataRepo.create(data);
    if (data.studyTypesID) {
      const studyType = await this.studyTypesRepo.findOne({
        where: { id: data.studyTypesID },
      });
      newAcademicData.studyType = studyType;
    }
    if (data.userId) {
      const user = await this.userRepo.findOne({
        where: { id: data.userId },
      });
      newAcademicData.user = user;
    }
    return this.academicDataRepo.save(newAcademicData);
  }

  async update(id: number, changes: UpdateAcademicDataDto) {
    console.log('entro');
    const academicData = await this.findByUser(id);
    if (changes.studyTypesID) {
      const studyTypes = await this.studyTypesRepo.findOne({
        where: { id: changes.studyTypesID },
      });
      academicData.studyType = studyTypes;
    }
    this.academicDataRepo.merge(academicData, changes);
    return this.academicDataRepo.save(academicData);
  }

  remove(id: number) {
    if (!this.findOne(id)) {
      throw new NotFoundException(`AcademicData #${id} not found`);
    }
    return this.academicDataRepo.delete(id);
  }
}
