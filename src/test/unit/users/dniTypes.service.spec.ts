import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DniTypesService } from '../../../modules/users/services/dniTypes.service';
import { DniType } from '../../../modules/users/entities/dniType.entity';
import { CreateDniTypeDto, UpdateDniTypeDto } from '../../../modules/users/dtos/dniType.dto';
import { NotFoundException } from '@nestjs/common';

describe('DniTypesService', () => {
  let service: DniTypesService;
  let dniTypeRepo: Repository<DniType>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DniTypesService,
        {
          provide: getRepositoryToken(DniType),
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

    service = module.get<DniTypesService>(DniTypesService);
    dniTypeRepo = module.get<Repository<DniType>>(getRepositoryToken(DniType));
  });

  describe('findAll', () => {
    it('should return an array of DNI types', async () => {
      const result: DniType[] = [{ id: 1, description: 'DNI Type 1' } as DniType];
      jest.spyOn(dniTypeRepo, 'find').mockResolvedValue(result);
      expect(await service.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException if DNI type is not found', async () => {
      jest.spyOn(dniTypeRepo, 'findOne').mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(new NotFoundException(`Dni Type #1 not found`));
    });
  });

  describe('create', () => {
    it('should create and return a DNI type', async () => {
      const dto: CreateDniTypeDto = { description: 'New DNI Type' };
      const result: DniType = { id: 1, description: 'New DNI Type' } as DniType;

      jest.spyOn(dniTypeRepo, 'create').mockReturnValue(result);
      jest.spyOn(dniTypeRepo, 'save').mockResolvedValue(result);

      expect(await service.create(dto)).toEqual(result);
    });
  });

  describe('update', () => {
    it('should throw NotFoundException if DNI type is not found', async () => {
      jest.spyOn(dniTypeRepo, 'findOne').mockResolvedValue(null);
      await expect(service.update(1, { description: 'Updated DNI Type' }))
        .rejects
        .toThrow(new NotFoundException(`Dni Type #1 not found`));
    });
  });

  describe('remove', () => {
    it('should throw NotFoundException if DNI type is not found', async () => {
      jest.spyOn(dniTypeRepo, 'findOne').mockResolvedValue(null);
      await expect(service.remove(1))
        .rejects
        .toThrow(new NotFoundException(`Dni Type #1 not found`));
    });
  });
});
