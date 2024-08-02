import { Test, TestingModule } from '@nestjs/testing';
import { DeleteResult, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GendersService } from '../../../modules/users/services/genders.service';
import { Gender } from '../../../modules/users/entities/gender.entity';
import { CreateGenderDto, UpdateGenderDto } from '../../../modules/users/dtos/gender.dto';
import { NotFoundException } from '@nestjs/common';

describe('GendersService', () => {
  let service: GendersService;
  let genderRepo: Repository<Gender>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GendersService,
        {
          provide: getRepositoryToken(Gender),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            merge: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GendersService>(GendersService);
    genderRepo = module.get<Repository<Gender>>(getRepositoryToken(Gender));
  });

  describe('findAll', () => {
    it('debería devolver una lista de géneros', async () => {
      const result = [{ id: 1, description: 'Male' }];
      jest.spyOn(genderRepo, 'find').mockResolvedValue(result as any);

      expect(await service.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('debería lanzar NotFoundException si el género no se encuentra', async () => {
      jest.spyOn(genderRepo, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(new NotFoundException(`Gender #1 not found`));
    });

    it('debería devolver un género si se encuentra', async () => {
      const result = { id: 1, description: 'Male' };
      jest.spyOn(genderRepo, 'findOne').mockResolvedValue(result as any);

      expect(await service.findOne(1)).toEqual(result);
    });
  });

  describe('create', () => {
    it('debería crear y devolver un nuevo género', async () => {
      const dto: CreateGenderDto = { description: 'Non-binary' };
      const result = { id: 1, description: 'Non-binary' };

      jest.spyOn(genderRepo, 'create').mockReturnValue(result as any);
      jest.spyOn(genderRepo, 'save').mockResolvedValue(result as any);

      expect(await service.create(dto)).toEqual(result);
    });
  });

  describe('update', () => {
    it('debería lanzar NotFoundException si el género no se encuentra', async () => {
      jest.spyOn(genderRepo, 'findOne').mockResolvedValue(null);

      await expect(service.update(1, { description: 'Updated Gender' }))
        .rejects
        .toThrow(new NotFoundException(`Gender #1 not found`));
    });

    it('debería actualizar y devolver el género', async () => {
      const existingGender = { id: 1, description: 'Male' };
      const updatedGender = { id: 1, description: 'Updated Gender' };

      jest.spyOn(genderRepo, 'findOne').mockResolvedValue(existingGender as any);
      jest.spyOn(genderRepo, 'merge').mockReturnValue(updatedGender as any);
      jest.spyOn(genderRepo, 'save').mockResolvedValue(updatedGender as any);

      expect(await service.update(1, { description: 'Updated Gender' })).toEqual(updatedGender);
    });
  });

  describe('remove', () => {
    it('debería lanzar NotFoundException si el género no se encuentra', async () => {
      jest.spyOn(genderRepo, 'delete').mockResolvedValue({
        affected: 0,
        raw: {} // Asegúrate de incluir la propiedad 'raw'
      } as any);

      await expect(service.remove(1))
        .rejects
        .toThrow(new NotFoundException(`Gender #1 not found`));
    });

    it('debería eliminar el género si existe', async () => {
      jest.spyOn(genderRepo, 'delete').mockResolvedValue({
        affected: 1,
        raw: {} // Asegúrate de incluir la propiedad 'raw'
      } as any);

      expect(await service.remove(1)).toEqual({
        affected: 1,
        raw: {}
      });
    });
  });
});
