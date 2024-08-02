import { Test, TestingModule } from '@nestjs/testing';
import { StatusService } from '../../../modules/users/services/status.service';
import { Status } from '../../../modules/users/entities/status.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateStatusDto, UpdateStatusDto } from '../../../modules/users/dtos/status.dto';

describe('StatusService', () => {
  let service: StatusService;
  let statusRepo: Repository<Status>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatusService,
        {
          provide: getRepositoryToken(Status),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            merge: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StatusService>(StatusService);
    statusRepo = module.get<Repository<Status>>(getRepositoryToken(Status));
  });

  describe('findAll', () => {
    it('should return an array of statuses', async () => {
      const result = [{ id: 1, description: 'Active' }];
      jest.spyOn(statusRepo, 'find').mockResolvedValue(result as any);

      expect(await service.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException if status not found', async () => {
      jest.spyOn(statusRepo, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(new NotFoundException(`Status #1 not found`));
    });

    it('should return a status if it is found', async () => {
      const result = { id: 1, description: 'Active' };
      jest.spyOn(statusRepo, 'findOne').mockResolvedValue(result as any);

      expect(await service.findOne(1)).toEqual(result);
    });
  });

  describe('create', () => {
    it('should create and return a new status', async () => {
      const dto: CreateStatusDto = { description: 'Active' };
      const result = { id: 1, description: 'Active' };

      jest.spyOn(statusRepo, 'create').mockReturnValue(result as any);
      jest.spyOn(statusRepo, 'save').mockResolvedValue(result as any);

      expect(await service.create(dto)).toEqual(result);
    });
  });

  describe('update', () => {
    it('should throw NotFoundException if status not found', async () => {
      jest.spyOn(statusRepo, 'findOne').mockResolvedValue(null);

      await expect(service.update(1, { description: 'Updated' } as UpdateStatusDto))
        .rejects
        .toThrow(new NotFoundException(`Status #1 not found`));
    });

    it('should update and return the status', async () => {
      const existingStatus = { id: 1, description: 'Active' };
      const updatedStatus = { id: 1, description: 'Updated' };

      jest.spyOn(statusRepo, 'findOne').mockResolvedValue(existingStatus as any);
      jest.spyOn(statusRepo, 'merge').mockReturnValue(updatedStatus as any);
      jest.spyOn(statusRepo, 'save').mockResolvedValue(updatedStatus as any);

      expect(await service.update(1, { description: 'Updated' } as UpdateStatusDto)).toEqual(updatedStatus);
    });
  });

  describe('remove', () => {
    it('should throw NotFoundException if status not found', async () => {
      jest.spyOn(statusRepo, 'delete').mockResolvedValue({ affected: 0, raw: {} } as any);

      await expect(service.remove(1))
        .rejects
        .toThrow(new NotFoundException(`Status #1 not found`));
    });

    it('should delete the status if it exists', async () => {
      jest.spyOn(statusRepo, 'delete').mockResolvedValue({ affected: 1, raw: {} } as any);

      await expect(service.remove(1)).resolves.toBeUndefined();
    });
  });
});
