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

  findOne(id: number) {
    const user = this.genderRepo.findOne({
      where: { id: id },
      // relations: ['user'],
    });
    if (!user) {
      throw new NotFoundException(`Gender #${id} not found`);
    }
    return user;
  }

  create(data: CreateGenderDto) {
    const newGender = this.genderRepo.create(data);
    return this.genderRepo.save(newGender);
  }

  async update(id: number, changes: UpdateGenderDto) {
    const gender = await this.genderRepo.findOne({ where: { id: id } });
    this.genderRepo.merge(gender, changes);
    return this.genderRepo.save(gender);
  }

  remove(id: number) {
    return this.genderRepo.delete(id);
  }
}
