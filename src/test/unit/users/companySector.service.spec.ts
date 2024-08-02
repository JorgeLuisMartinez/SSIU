import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CompanySectorService } from '../../../modules/users/services/companySector.service';
import { CompanySector } from '../../../modules/users/entities/companySector.entity';
import { CreateCompanySectorDto, UpdateCompanySectorDto } from '../../../modules/users/dtos/companySector.dto';
import { NotFoundException } from '@nestjs/common';


describe('CompanySectorService', () => {
  let service: CompanySectorService;
  let companySectorRepo: Repository<CompanySector>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanySectorService,
        {
          provide: getRepositoryToken(CompanySector),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CompanySectorService>(CompanySectorService);
    companySectorRepo = module.get<Repository<CompanySector>>(getRepositoryToken(CompanySector));
  });

  describe('findAll', () => {
    it('should return an array of company sectors', async () => {
      const result = [{ id: 1, description: 'Sector 1' }];
      jest.spyOn(companySectorRepo, 'find').mockResolvedValue(result as any);

      expect(await service.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a company sector by ID', async () => {
      const result = { id: 1, description: 'Sector 1' };
      jest.spyOn(companySectorRepo, 'findOne').mockResolvedValue(result as any);

      expect(await service.findOne(1)).toEqual(result);
    });

    it('should throw NotFoundException if company sector is not found', async () => {
      jest.spyOn(companySectorRepo, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(new NotFoundException(`CompanySector #1 not found`));
    });
  });

  describe('create', () => {
    it('should create a company sector', async () => {
      const dto: CreateCompanySectorDto = { description: 'New Sector' };
      const result = { id: 1, description: 'New Sector' };

      jest.spyOn(companySectorRepo, 'create').mockReturnValue(result as any);
      jest.spyOn(companySectorRepo, 'save').mockResolvedValue(result as any);

      expect(await service.create(dto)).toEqual(result);
    });
  });

  describe('update', () => {
    it('should update and return the company sector', async () => {
      const existingSector = { id: 1, description: 'Old Sector' } as CompanySector;
      const updateDto: UpdateCompanySectorDto = { description: 'Updated Sector' };
      const updatedSector = { id: 1, description: 'Updated Sector' } as CompanySector;

      jest.spyOn(companySectorRepo, 'findOne').mockResolvedValue(existingSector);
      jest.spyOn(companySectorRepo, 'merge').mockReturnValue(updatedSector);
      jest.spyOn(companySectorRepo, 'save').mockResolvedValue(updatedSector);

      expect(await service.update(1, updateDto)).toEqual(updatedSector);
    });

    it('should throw NotFoundException if company sector is not found', async () => {
      jest.spyOn(companySectorRepo, 'findOne').mockResolvedValue(null);

      await expect(service.update(1, { description: 'Updated Sector' }))
        .rejects
        .toThrow(new NotFoundException(`CompanySector #1 not found`));
    });
  });

  describe('remove', () => {
    it('should remove a company sector', async () => {
      const result = { affected: 1 };
      jest.spyOn(companySectorRepo, 'findOne').mockResolvedValue({ id: 1 } as any);
      jest.spyOn(companySectorRepo, 'delete').mockResolvedValue(result as any);

      await expect(service.remove(1)).resolves.toEqual(result);
    });

    it('should throw NotFoundException if company sector is not found', async () => {
      jest.spyOn(companySectorRepo, 'findOne').mockResolvedValue(null);

      await expect(service.remove(1))
        .rejects
        .toThrow(new NotFoundException(`CompanySector #1 not found`));
    });
  });
});
