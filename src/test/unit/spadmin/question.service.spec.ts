import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { QuestionService } from '../../../modules/spadmin/services/question.service';
import { Questions } from '../../../modules/spadmin/entities/questions.entity';
import { Status } from '../../../modules/users/entities/status.entity';
import { Indicator } from '../../../modules/spadmin/entities/indicator.entity';
import { TypeQuestion } from '../../../modules/spadmin/entities/typeQuestion.entity';
import { CreateQuestionDto, UpdateQuestionDto } from '../../../modules/spadmin/dtos/questions.dto';
import { NotFoundException } from '@nestjs/common';

describe('QuestionService', () => {
  let service: QuestionService;
  let questionsRepo: Repository<Questions>;
  let statusRepo: Repository<Status>;
  let indicatorRepo: Repository<Indicator>;
  let typeQuestionRepo: Repository<TypeQuestion>;

  const mockQuestionsRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    merge: jest.fn(),
    delete: jest.fn(),
  };

  const mockStatusRepo = {
    findOne: jest.fn(),
  };

  const mockIndicatorRepo = {
    findOne: jest.fn(),
    find: jest.fn(),
  };

  const mockTypeQuestionRepo = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        { provide: getRepositoryToken(Questions), useValue: mockQuestionsRepo },
        { provide: getRepositoryToken(Status), useValue: mockStatusRepo },
        { provide: getRepositoryToken(Indicator), useValue: mockIndicatorRepo },
        { provide: getRepositoryToken(TypeQuestion), useValue: mockTypeQuestionRepo },
      ],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
    questionsRepo = module.get<Repository<Questions>>(getRepositoryToken(Questions));
    statusRepo = module.get<Repository<Status>>(getRepositoryToken(Status));
    indicatorRepo = module.get<Repository<Indicator>>(getRepositoryToken(Indicator));
    typeQuestionRepo = module.get<Repository<TypeQuestion>>(getRepositoryToken(TypeQuestion));
  });

  describe('findAll', () => {
    it('should return an array of questions', async () => {
      const result = [{ id: 1, description: 'Question 1' }];
      jest.spyOn(questionsRepo, 'find').mockResolvedValue(result as any);

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single question', async () => {
      const result = { id: 1, description: 'Question 1' };
      jest.spyOn(questionsRepo, 'findOne').mockResolvedValue(result as any);

      expect(await service.findOne(1)).toBe(result);
    });

    it('should throw NotFoundException if question not found', async () => {
      jest.spyOn(questionsRepo, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByIndicator', () => {
    it('should return an array of questions for a given indicator', async () => {
      const result = [{ id: 1, description: 'Question 1' }];
      jest.spyOn(indicatorRepo, 'findOne').mockResolvedValue({ id: 1 } as any);
      jest.spyOn(questionsRepo, 'find').mockResolvedValue(result as any);

      expect(await service.findByIndicator(1)).toBe(result);
    });

    it('should throw NotFoundException if indicator not found', async () => {
      jest.spyOn(indicatorRepo, 'findOne').mockResolvedValue(null);

      await expect(service.findByIndicator(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a new question', async () => {
      const createQuestionDto: CreateQuestionDto = {
        description: 'Question 1',
        typeQuestionId: 1,
        statusId: 1,
        indicatorId: 1
      };
      const result = { id: 1, ...createQuestionDto };
      jest.spyOn(questionsRepo, 'create').mockReturnValue(result as any);
      jest.spyOn(questionsRepo, 'save').mockResolvedValue(result as any);
      jest.spyOn(typeQuestionRepo, 'findOne').mockResolvedValue({ id: 1 } as any);
      jest.spyOn(statusRepo, 'findOne').mockResolvedValue({ id: 1 } as any);
      jest.spyOn(indicatorRepo, 'findOne').mockResolvedValue({ id: 1 } as any);

      expect(await service.create(createQuestionDto)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update and return an existing question', async () => {
      const updateQuestionDto: UpdateQuestionDto = {
        description: 'Updated Question'
      };
      const existingQuestion = { id: 1, description: 'Old Question' };
      const updatedQuestion = { id: 1, description: 'Updated Question' };

      // Simular el comportamiento del método findOne del repositorio
      jest.spyOn(questionsRepo, 'findOne').mockResolvedValue(existingQuestion as any);
      jest.spyOn(questionsRepo, 'merge').mockReturnValue(updatedQuestion as any);
      jest.spyOn(questionsRepo, 'save').mockResolvedValue(updatedQuestion as any);

      expect(await service.update(1, updateQuestionDto)).toBe(updatedQuestion);
    });

    it('should throw NotFoundException if question not found', async () => {
      jest.spyOn(questionsRepo, 'findOne').mockResolvedValue(null);

      await expect(service.update(1, {} as UpdateQuestionDto)).rejects.toThrow(NotFoundException);
    });
  });



  describe('remove', () => {
    it('should remove the question', async () => {
      const existingQuestion = { id: 1, description: 'Question 1' };
      jest.spyOn(service, 'findOne').mockResolvedValue(existingQuestion as any);
      jest.spyOn(questionsRepo, 'delete').mockResolvedValue({ affected: 1, raw: {} } as any);

      await expect(service.remove(1)).resolves.toBeUndefined();
      expect(questionsRepo.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if question not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
