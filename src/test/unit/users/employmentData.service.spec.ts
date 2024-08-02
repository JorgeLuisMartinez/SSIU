import { Test, TestingModule } from '@nestjs/testing';
import { EmploymentDataService } from '../../../modules/users/services/employmentData.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EmploymentData } from '../../../modules/users/entities/employmentData.entity';
import { User } from '../../../modules/users/entities/user.entity';
import { CompanySector } from '../../../modules/users/entities/companySector.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('EmploymentDataService', () => {
  let service: EmploymentDataService;
  let employmentDataRepo: Repository<EmploymentData>;
  let userRepo: Repository<User>;
  let companySectorRepo: Repository<CompanySector>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmploymentDataService,
        {
          provide: getRepositoryToken(EmploymentData),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            merge: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(CompanySector),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EmploymentDataService>(EmploymentDataService);
    employmentDataRepo = module.get<Repository<EmploymentData>>(getRepositoryToken(EmploymentData));
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
    companySectorRepo = module.get<Repository<CompanySector>>(getRepositoryToken(CompanySector));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of employment data', async () => {
      const employmentDataArray = [{ id: 1, user: {}, companySector: {} }];
      jest.spyOn(employmentDataRepo, 'find').mockResolvedValue(employmentDataArray as any);
      expect(await service.findAll()).toBe(employmentDataArray);
    });
  });

  describe('findOne', () => {
    it('should return a single employment data', async () => {
      const employmentData = { id: 1, user: {}, companySector: {} };
      jest.spyOn(employmentDataRepo, 'findOne').mockResolvedValue(employmentData as any);
      expect(await service.findOne(1)).toBe(employmentData);
    });

    it('should throw NotFoundException if employment data not found', async () => {
      jest.spyOn(employmentDataRepo, 'findOne').mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByUser', () => {
    it('should return employment data by user ID', async () => {
      const user = { id: 1 };
      const employmentData = { id: 1, user: user, companySector: {} };
      jest.spyOn(userRepo, 'findOne').mockResolvedValue(user as any);
      jest.spyOn(employmentDataRepo, 'findOne').mockResolvedValue(employmentData as any);
      expect(await service.findByUser(1)).toBe(employmentData);
    });
  });

  describe('create', () => {
    it('should create and return new employment data', async () => {
      const data = { userId: 1, companySectorId: 1 };
      const newEmploymentData = { id: 1, user: {}, companySector: {} };
      jest.spyOn(employmentDataRepo, 'create').mockReturnValue(newEmploymentData as any);
      jest.spyOn(employmentDataRepo, 'save').mockResolvedValue(newEmploymentData as any);
      jest.spyOn(userRepo, 'findOne').mockResolvedValue({ id: 1 } as any);
      jest.spyOn(companySectorRepo, 'findOne').mockResolvedValue({ id: 1 } as any);
      expect(await service.create(data as any)).toBe(newEmploymentData);
    });
  });

  describe('update', () => {
    it('should update and return updated employment data', async () => {
      const changes = { companySectorId: 1 };
      const existingEmploymentData = { id: 1, user: {}, companySector: {} };
      jest.spyOn(service, 'findByUser').mockResolvedValue(existingEmploymentData as any);
      jest.spyOn(companySectorRepo, 'findOne').mockResolvedValue({ id: 1 } as any);
      jest.spyOn(employmentDataRepo, 'merge').mockReturnValue(existingEmploymentData as any);
      jest.spyOn(employmentDataRepo, 'save').mockResolvedValue(existingEmploymentData as any);
      expect(await service.update(1, changes as any)).toBe(existingEmploymentData);
    });
  });

  describe('remove', () => {
    it('should remove employment data and return void', async () => {
      const existingEmploymentData = { id: 1, user: {}, companySector: {} };
      jest.spyOn(service, 'findOne').mockResolvedValue(existingEmploymentData as any);
      jest.spyOn(employmentDataRepo, 'delete').mockResolvedValue({} as any);
      await expect(service.remove(1)).resolves.toBeUndefined();
    });

    it('should throw NotFoundException if employment data not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);
      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
