import { Test, TestingModule } from '@nestjs/testing';
import { AcademicProgramsService } from '../../../modules/spadmin/services/academicPrograms.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademicPrograms } from '../../../modules/spadmin/entities/academicPrograms.entity';
import { User } from '../../../modules/users/entities/user.entity';
import { Status } from '../../../modules/users/entities/status.entity';
import { CreateAcademicProgramsDto, UpdateAcademicProgramsDto } from '../../../modules/spadmin/dtos/academicPrograms.dto';
import { NotFoundException } from '@nestjs/common';

// Mock de repositorios
const mockAcademicProgramsRepo = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  merge: jest.fn(),
  delete: jest.fn(),
};

const mockUserRepo = {
  findOne: jest.fn(),
};

const mockStatusRepo = {
  findOne: jest.fn(),
};

describe('AcademicProgramsService', () => {
  let service: AcademicProgramsService;
  let academicProgramsRepo: Repository<AcademicPrograms>;
  let userRepo: Repository<User>;
  let statusRepo: Repository<Status>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AcademicProgramsService,
        {
          provide: getRepositoryToken(AcademicPrograms),
          useValue: mockAcademicProgramsRepo,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepo,
        },
        {
          provide: getRepositoryToken(Status),
          useValue: mockStatusRepo,
        },
      ],
    }).compile();

    service = module.get<AcademicProgramsService>(AcademicProgramsService);
    academicProgramsRepo = module.get<Repository<AcademicPrograms>>(getRepositoryToken(AcademicPrograms));
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
    statusRepo = module.get<Repository<Status>>(getRepositoryToken(Status));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of academic programs', async () => {
      const result = [{ id: 1, name: 'Program 1' }];
      jest.spyOn(academicProgramsRepo, 'find').mockResolvedValue(result as any);
      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single academic program by id', async () => {
      const result = { id: 1, name: 'Program 1' };
      jest.spyOn(academicProgramsRepo, 'findOne').mockResolvedValue(result as any);
      expect(await service.findOne(1)).toBe(result);
    });

    it('should throw NotFoundException if academic program not found', async () => {
      jest.spyOn(academicProgramsRepo, 'findOne').mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByCode', () => {
    it('should return an academic program by code', async () => {
      const result = { id: 1, code: 123 };
      jest.spyOn(academicProgramsRepo, 'findOne').mockResolvedValue(result as any);
      expect(await service.findByCode(123)).toBe(result);
    });

    it('should throw NotFoundException if academic program not found', async () => {
      jest.spyOn(academicProgramsRepo, 'findOne').mockResolvedValue(null);
      await expect(service.findByCode(123)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByUser', () => {
    it('should return an academic program by user id', async () => {
      const user = { id: 1 };
      const result = { id: 1, user };
      jest.spyOn(userRepo, 'findOne').mockResolvedValue(user as any);
      jest.spyOn(academicProgramsRepo, 'findOne').mockResolvedValue(result as any);
      await expect(service.findByUser(1)).resolves.toBe(result);
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(userRepo, 'findOne').mockResolvedValue(null);
      await expect(service.findByUser(1)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if academic program not found for user', async () => {
      const user = { id: 1 };
      jest.spyOn(userRepo, 'findOne').mockResolvedValue(user as any);
      jest.spyOn(academicProgramsRepo, 'findOne').mockResolvedValue(null);
      await expect(service.findByUser(1)).rejects.toThrow(NotFoundException);
    });
  });


  describe('create', () => {
    it('should create and return a new academic program', async () => {
      const createDto: CreateAcademicProgramsDto = {
        name: 'New Program',
        statusId: 1,
        userId: 1,
        code: 123,
        email: 'example@example.com',
        photoUrl: 'http://example.com/photo.jpg'
      };
      const newProgram = {
        id: 1,
        name: 'New Program',
        code: 123,
        email: 'example@example.com',
        photoUrl: 'http://example.com/photo.jpg'
      };

      jest.spyOn(academicProgramsRepo, 'create').mockReturnValue(newProgram as any);
      jest.spyOn(academicProgramsRepo, 'save').mockResolvedValue(newProgram as any);
      jest.spyOn(statusRepo, 'findOne').mockResolvedValue({ id: 1 } as any);
      jest.spyOn(userRepo, 'findOne').mockResolvedValue({ id: 1 } as any);

      expect(await service.create(createDto)).toBe(newProgram);
    });
  });


  describe('update', () => {
    it('should update and return the updated academic program', async () => {
      const updateDto: UpdateAcademicProgramsDto = { name: 'Updated Program', statusId: 1, userId: 1 };
      const existingProgram = { id: 1, name: 'Existing Program' };
      const updatedProgram = { id: 1, name: 'Updated Program' };
      jest.spyOn(service, 'findOne').mockResolvedValue(existingProgram as any);
      jest.spyOn(academicProgramsRepo, 'merge').mockReturnValue(updatedProgram as any);
      jest.spyOn(academicProgramsRepo, 'save').mockResolvedValue(updatedProgram as any);
      jest.spyOn(statusRepo, 'findOne').mockResolvedValue({ id: 1 } as any);
      jest.spyOn(userRepo, 'findOne').mockResolvedValue({ id: 1 } as any);
      expect(await service.update(1, updateDto)).toBe(updatedProgram);
    });
  });

  describe('remove', () => {
    it('should remove the academic program and return void', async () => {
      const existingProgram = { id: 1, name: 'Existing Program' };
      jest.spyOn(service, 'findOne').mockResolvedValue(existingProgram as any);
      jest.spyOn(academicProgramsRepo, 'delete').mockResolvedValue({} as any);
      await expect(service.remove(1)).resolves.toBeUndefined();
    });

    it('should throw NotFoundException if academic program not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);
      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
