import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Questions } from '../entities/questions.entity';
import { Status } from '../../users/entities/status.entity';
import { Indicator } from '../entities/indicator.entity';
import { TypeQuestion } from '../entities/typeQuestion.entity';
import { CreateQuestionDto, UpdateQuestionDto } from '../dtos/questions.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Questions) private questionsRepo: Repository<Questions>,
    @InjectRepository(Status) private statusRepo: Repository<Status>,
    @InjectRepository(Indicator) private indicatorRepo: Repository<Indicator>,
    @InjectRepository(TypeQuestion)
    private typeQuestionRepo: Repository<TypeQuestion>,
  ) {}

  async findAll() {
    return this.questionsRepo.find({
      relations: ['typeQuestion', 'status', 'indicator'],
    });
  }

  async findOne(id: number) {
    const question = await this.questionsRepo.findOne({
      where: { id: id },
      relations: ['typeQuestion', 'status', 'indicator'],
    });
    if (!question) {
      throw new NotFoundException(`Question #${id} not found`);
    }
    return question;
  }

  async findByIndicator(id: number) {
    const indicator = await this.indicatorRepo.findOne({
      where: { id: id },
    });
    if (!indicator) {
      throw new NotFoundException(`indicator #${id} not found`);
    }
    return this.questionsRepo.findOne({
      where: { indicator: indicator },
      relations: ['typeQuestion', 'status', 'indicator'],
    });
  }

  async create(data: CreateQuestionDto) {
    const newQuestion = this.questionsRepo.create(data);
    if (data.typeQuestionId) {
      const typeQuestion = await this.typeQuestionRepo.findOne({
        where: { id: data.typeQuestionId },
      });
      newQuestion.typeQuestion = typeQuestion;
    }
    if (data.statusId) {
      const status = await this.statusRepo.findOne({
        where: { id: data.statusId },
      });
      newQuestion.status = status;
    }
    if (data.indicatorId) {
      const indicator = await this.indicatorRepo.findOne({
        where: { id: data.indicatorId },
      });
      newQuestion.indicator = indicator;
    }
    return this.questionsRepo.save(newQuestion);
  }

  async update(id: number, changes: UpdateQuestionDto) {
    const newQuestion = await this.findOne(id);
    if (changes.typeQuestionId) {
      const typeQuestion = await this.typeQuestionRepo.findOne({
        where: { id: changes.typeQuestionId },
      });
      newQuestion.typeQuestion = typeQuestion;
    }
    if (changes.statusId) {
      const status = await this.statusRepo.findOne({
        where: { id: changes.statusId },
      });
      newQuestion.status = status;
    }
    if (changes.indicatorId) {
      const indicator = await this.indicatorRepo.findOne({
        where: { id: changes.indicatorId },
      });
      newQuestion.indicator = indicator;
    }

    this.questionsRepo.merge(newQuestion, changes);
    return this.questionsRepo.save(newQuestion);
  }

  async remove(id: number) {
    const question = await this.findOne(id);
    if (!question) {
      throw new NotFoundException(`Question #${id} not found`);
    }
    await this.questionsRepo.delete(id);
    return;
  }
}
