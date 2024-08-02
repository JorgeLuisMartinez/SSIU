import { Test, TestingModule } from '@nestjs/testing';
import { StagesService } from '../../../modules/admin/services/stages.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stages } from '../../../modules/admin/entities/stages.entity';
import { Status } from '../../../modules/users/entities/status.entity';
import { AcademicPrograms } from '../../../modules/spadmin/entities/academicPrograms.entity';
import { CreateStageDto, UpdateStageDto } from '../../../modules/admin/dtos/stages.dto';
import { NotFoundException } from '@nestjs/common';

// Mock de repositorios
const mockStagesRepo = {
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

const mockAcademicProgramsRepo = {
  findOne: jest.fn(),
};

describe('StagesService', () => {
  let service: StagesService;
  let stagesRepo: Repository<Stages>;
  let statusRepo: Repository<Status>;
  let academicProgramsRepo: Repository<AcademicPrograms>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StagesService,
        {
          provide: getRepositoryToken(Stages),
          useValue: mockStagesRepo,
        },
        {
          provide: getRepositoryToken(Status),
          useValue: mockStatusRepo,
        },
        {
          provide: getRepositoryToken(AcademicPrograms),
          useValue: mockAcademicProgramsRepo,
        },
      ],
    }).compile();

    service = module.get<StagesService>(StagesService);
    stagesRepo = module.get<Repository<Stages>>(getRepositoryToken(Stages));
    statusRepo = module.get<Repository<Status>>(getRepositoryToken(Status));
    academicProgramsRepo = module.get<Repository<AcademicPrograms>>(
      getRepositoryToken(AcademicPrograms),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of stages', async () => {
      const result = [{ id: 1, name: 'Stage 1', description: 'Description', start_date: new Date(), finish_date: new Date(), type_MDI: 'Type A' }];
      jest.spyOn(stagesRepo, 'find').mockResolvedValue(result as any);
      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single stage by id', async () => {
      const result = { id: 1, name: 'Stage 1', description: 'Description', start_date: new Date(), finish_date: new Date(), type_MDI: 'Type A' };
      jest.spyOn(stagesRepo, 'findOne').mockResolvedValue(result as any);
      expect(await service.findOne(1)).toBe(result);
    });

    it('should throw NotFoundException if stage not found', async () => {
      jest.spyOn(stagesRepo, 'findOne').mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByAcademicProgram', () => {
    it('should return stages by academic program id', async () => {
      const academicProgram = { id: 1 };
      const result = [{ id: 1, name: 'Stage 1', description: 'Description', start_date: new Date(), finish_date: new Date(), type_MDI: 'Type A' }];
      jest.spyOn(academicProgramsRepo, 'findOne').mockResolvedValue(academicProgram as any);
      jest.spyOn(stagesRepo, 'findOne').mockResolvedValue(result as any);
      expect(await service.findByAcademicProgram(1)).toBe(result);
    });

    it('should throw NotFoundException if academic program not found', async () => {
      jest.spyOn(academicProgramsRepo, 'findOne').mockResolvedValue(null);
      await expect(service.findByAcademicProgram(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a new stage', async () => {
      const createStageDto: CreateStageDto = {
        description: 'New Stage Description',
        start_date: new Date(),
        finish_date: new Date(),
        type_MDI: 'Type A',
        statusId: 1,
        academicProgramId: 1
      };
      const newStage = { id: 1, ...createStageDto };
      jest.spyOn(stagesRepo, 'create').mockReturnValue(newStage as any);
      jest.spyOn(stagesRepo, 'save').mockResolvedValue(newStage as any);
      jest.spyOn(statusRepo, 'findOne').mockResolvedValue({ id: 1 } as any);
      jest.spyOn(academicProgramsRepo, 'findOne').mockResolvedValue({ id: 1 } as any);
      expect(await service.create(createStageDto)).toBe(newStage);
    });
  });

  describe('update', () => {
    it('should update and return the updated stage', async () => {
      const updateStageDto: UpdateStageDto = {
        description: 'Updated Stage Description',
        start_date: new Date(),
        finish_date: new Date(),
        type_MDI: 'Type B',
        statusId: 2,
        academicProgramId: 2
      };
      const existingStage = { id: 1, description: 'Old Description', start_date: new Date(), finish_date: new Date(), type_MDI: 'Type A' };
      const updatedStage = { id: 1, ...updateStageDto };
      jest.spyOn(service, 'findOne').mockResolvedValue(existingStage as any);
      jest.spyOn(stagesRepo, 'merge').mockReturnValue(updatedStage as any);
      jest.spyOn(stagesRepo, 'save').mockResolvedValue(updatedStage as any);
      jest.spyOn(statusRepo, 'findOne').mockResolvedValue({ id: 2 } as any);
      jest.spyOn(academicProgramsRepo, 'findOne').mockResolvedValue({ id: 2 } as any);
      expect(await service.update(1, updateStageDto)).toBe(updatedStage);
    });
  });

  describe('remove', () => {
    it('should remove the stage and return void', async () => {
      const existingStage = { id: 1, name: 'Existing Stage' };
      jest.spyOn(service, 'findOne').mockResolvedValue(existingStage as any);
      jest.spyOn(stagesRepo, 'delete').mockResolvedValue({} as any);
      await expect(service.remove(1)).resolves.toBeUndefined();
    });

    it('should throw NotFoundException if stage not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);
      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
