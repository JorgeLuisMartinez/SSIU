import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Gender } from '../entities/gender.entity';
import { CreateGenderDto, UpdateGenderDto } from '../dtos/gender.dto';

@Injectable()
export class GendersService {
  constructor(
    @InjectRepository(Gender) private genderRepo: Repository<Gender>,
  ) {}

  findAll() {
    return this.genderRepo.find();
  }

  async findOne(id: number) {
    const gender = await this.genderRepo.findOne({
      where: { id: id },
      // relations: ['user'],
    });
    if (!gender) {
      throw new NotFoundException(`Gender #${id} not found`);
    }
    return gender;
  }

  create(data: CreateGenderDto) {
    const newGender = this.genderRepo.create(data);
    return this.genderRepo.save(newGender);
  }

  async update(id: number, changes: UpdateGenderDto) {
    const gender = await this.genderRepo.findOne({ where: { id: id } });
    if (!gender) {
      throw new NotFoundException(`Gender #${id} not found`);
    }
    this.genderRepo.merge(gender, changes);
    return this.genderRepo.save(gender);
  }

  async remove(id: number) {
    const result = await this.genderRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Gender #${id} not found`);
    }
    return result;
  }
}
