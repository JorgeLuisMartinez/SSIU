import { Test, TestingModule } from '@nestjs/testing';
import { IndicatorService } from '../../../modules/spadmin/services/indicator.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Indicator } from '../../../modules/spadmin/entities/indicator.entity';
import { Variable } from '../../../modules/spadmin/entities/variable.entity';
import { Status } from '../../../modules/users/entities/status.entity';
import { CreateIndicatorDto, UpdateIndicatorDto } from '../../../modules/spadmin/dtos/indicator.dto';
import { NotFoundException } from '@nestjs/common';

// Mock de repositorios
const mockIndicatorRepo = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  merge: jest.fn(),
  delete: jest.fn(),
};

const mockVariableRepo = {
  findOne: jest.fn(),
};

const mockStatusRepo = {
  findOne: jest.fn(),
};

describe('IndicatorService', () => {
  let service: IndicatorService;
  let indicatorRepo: Repository<Indicator>;
  let variableRepo: Repository<Variable>;
  let statusRepo: Repository<Status>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IndicatorService,
        {
          provide: getRepositoryToken(Indicator),
          useValue: mockIndicatorRepo,
        },
        {
          provide: getRepositoryToken(Variable),
          useValue: mockVariableRepo,
        },
        {
          provide: getRepositoryToken(Status),
          useValue: mockStatusRepo,
        },
      ],
    }).compile();

    service = module.get<IndicatorService>(IndicatorService);
    indicatorRepo = module.get<Repository<Indicator>>(getRepositoryToken(Indicator));
    variableRepo = module.get<Repository<Variable>>(getRepositoryToken(Variable));
    statusRepo = module.get<Repository<Status>>(getRepositoryToken(Status));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of indicators', async () => {
      const result = [{ id: 1, name: 'Indicator 1' }];
      jest.spyOn(indicatorRepo, 'find').mockResolvedValue(result as any);
      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single indicator by id', async () => {
      const result = { id: 1, name: 'Indicator 1' };
      jest.spyOn(indicatorRepo, 'findOne').mockResolvedValue(result as any);
      expect(await service.findOne(1)).toBe(result);
    });

    it('should throw NotFoundException if indicator not found', async () => {
      jest.spyOn(indicatorRepo, 'findOne').mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByVariable', () => {
    it('should return an array of indicators by variable id', async () => {
      const variable = { id: 1 };
      const result = [{ id: 1, variable }];
      jest.spyOn(variableRepo, 'findOne').mockResolvedValue(variable as any);
      jest.spyOn(indicatorRepo, 'find').mockResolvedValue(result as any);
      expect(await service.findByVariable(1)).toBe(result);
    });

    it('should throw NotFoundException if variable not found', async () => {
      jest.spyOn(variableRepo, 'findOne').mockResolvedValue(null);
      await expect(service.findByVariable(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a new indicator', async () => {
      const createDto: CreateIndicatorDto = { name: 'New Indicator', variableId: 1, statusId: 1 };
      const newIndicator = { id: 1, name: 'New Indicator' };
      jest.spyOn(indicatorRepo, 'create').mockReturnValue(newIndicator as any);
      jest.spyOn(indicatorRepo, 'save').mockResolvedValue(newIndicator as any);
      jest.spyOn(variableRepo, 'findOne').mockResolvedValue({ id: 1 } as any);
      jest.spyOn(statusRepo, 'findOne').mockResolvedValue({ id: 1 } as any);
      expect(await service.create(createDto)).toBe(newIndicator);
    });
  });

  describe('update', () => {
    it('should update and return the updated indicator', async () => {
      const updateDto: UpdateIndicatorDto = { name: 'Updated Indicator', variableId: 1, statusId: 1 };
      const existingIndicator = { id: 1, name: 'Existing Indicator' };
      const updatedIndicator = { id: 1, name: 'Updated Indicator' };
      jest.spyOn(service, 'findOne').mockResolvedValue(existingIndicator as any);
      jest.spyOn(indicatorRepo, 'merge').mockReturnValue(updatedIndicator as any);
      jest.spyOn(indicatorRepo, 'save').mockResolvedValue(updatedIndicator as any);
      jest.spyOn(variableRepo, 'findOne').mockResolvedValue({ id: 1 } as any);
      jest.spyOn(statusRepo, 'findOne').mockResolvedValue({ id: 1 } as any);
      expect(await service.update(1, updateDto)).toBe(updatedIndicator);
    });
  });


  describe('remove', () => {
    it('should remove the indicator and return void', async () => {
      const existingIndicator = { id: 1, name: 'Existing Indicator' };
      const deleteResult = { affected: 1, raw: {} };

      jest.spyOn(service, 'findOne').mockResolvedValue(existingIndicator as any);
      jest.spyOn(indicatorRepo, 'delete').mockResolvedValue(deleteResult as any);

      await service.remove(1);

      expect(indicatorRepo.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if indicator not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);
      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });



});
