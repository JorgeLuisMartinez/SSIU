import { Test, TestingModule } from '@nestjs/testing';
import { Repository, DeleteResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeQuestionService } from '../../../modules/spadmin/services/typeQuestion.service';
import { TypeQuestion } from '../../../modules/spadmin/entities/typeQuestion.entity';
import { CreateTypeQuestionDto, UpdateTypeQuestionDto } from '../../../modules/spadmin/dtos/typeQuestion.dto';
import { NotFoundException } from '@nestjs/common';

describe('TypeQuestionService', () => {
  let service: TypeQuestionService;
  let repository: Repository<TypeQuestion>;

  const mockTypeQuestionRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    merge: jest.fn(),
    delete: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeQuestionService,
        { provide: getRepositoryToken(TypeQuestion), useValue: mockTypeQuestionRepository() },
      ],
    }).compile();

    service = module.get<TypeQuestionService>(TypeQuestionService);
    repository = module.get<Repository<TypeQuestion>>(getRepositoryToken(TypeQuestion));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of type questions', async () => {
      const result: TypeQuestion[] = [{ id: 1, description: 'Sample Description', questions: [] }];
      jest.spyOn(repository, 'find').mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a type question by id', async () => {
      const result: TypeQuestion = { id: 1, description: 'Sample Description', questions: [] };
      jest.spyOn(repository, 'findOne').mockResolvedValue(result);

      expect(await service.findOne(1)).toBe(result);
    });

    it('should throw NotFoundException if type question is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a new type question', async () => {
      const dto: CreateTypeQuestionDto = { description: 'New Question Type' };
      const result: TypeQuestion = { id: 1, description: 'New Question Type', questions: [] };
      jest.spyOn(repository, 'create').mockReturnValue(result);
      jest.spyOn(repository, 'save').mockResolvedValue(result);

      expect(await service.create(dto)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update and return the type question', async () => {
      const existingTypeQuestion: TypeQuestion = { id: 1, description: 'Old Question Type', questions: [] };
      const updateDto: UpdateTypeQuestionDto = { description: 'Updated Question Type' };
      const updatedTypeQuestion: TypeQuestion = { id: 1, description: 'Updated Question Type', questions: [] };

      jest.spyOn(repository, 'findOne').mockResolvedValue(existingTypeQuestion);
      jest.spyOn(repository, 'merge').mockReturnValue(updatedTypeQuestion);
      jest.spyOn(repository, 'save').mockResolvedValue(updatedTypeQuestion);

      await expect(service.update(1, updateDto)).resolves.toEqual(updatedTypeQuestion);
    });

    it('should throw NotFoundException if type question is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.update(1, { description: 'Updated Question Type' }))
        .rejects
        .toThrow(new NotFoundException(`TypeQuestion #1 not found`));
    });
  });


  describe('remove', () => {
    it('should delete the type question', async () => {
      const typeQuestion: TypeQuestion = { id: 1, description: 'Question Type 1', questions: [] };
      const deleteResult: DeleteResult = { raw: {}, affected: 1 };
      jest.spyOn(repository, 'findOne').mockResolvedValue(typeQuestion);
      jest.spyOn(repository, 'delete').mockResolvedValue(deleteResult);

      await service.remove(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if type question is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
