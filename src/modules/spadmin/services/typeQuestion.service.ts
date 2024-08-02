import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TypeQuestion } from '../entities/typeQuestion.entity';
import {
  CreateTypeQuestionDto,
  UpdateTypeQuestionDto,
} from '../dtos/typeQuestion.dto';

@Injectable()
export class TypeQuestionService {
  constructor(
    @InjectRepository(TypeQuestion)
    private typeQuestionRepo: Repository<TypeQuestion>,
  ) {}

  async findAll() {
    return this.typeQuestionRepo.find();
  }

  async findOne(id: number) {
    const typeQuestion = await this.typeQuestionRepo.findOne({
      where: { id: id },
    });
    if (!typeQuestion) {
      throw new NotFoundException(`TypeQuestion #${id} not found`);
    }
    return typeQuestion;
  }

  async create(data: CreateTypeQuestionDto) {
    const typeQuestion = await this.typeQuestionRepo.create(data);
    return this.typeQuestionRepo.save(typeQuestion);
  }

  async update(id: number, changes: UpdateTypeQuestionDto) {
    const typeQuestion = await this.typeQuestionRepo.findOne({
      where: { id: id },
    });
    if (!typeQuestion) {
      throw new NotFoundException(`TypeQuestion #${id} not found`);
    }
    this.typeQuestionRepo.merge(typeQuestion, changes);
    return this.typeQuestionRepo.save(typeQuestion);
  }

  async remove(id: number) {
    const typeQuestion = await this.findOne(id);
    if (!typeQuestion) {
      throw new NotFoundException(`typeQuestion #${id} not found`);
    }
    await this.typeQuestionRepo.delete(id);
    return;
  }
}
