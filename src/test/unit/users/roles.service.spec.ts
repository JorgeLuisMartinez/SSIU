import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RolesService } from '../../../modules/users/services/roles.service';
import { Role } from '../../../modules/users/entities/role.entity';
import { CreateRolesDto, UpdateRolesDto } from '../../../modules/users/dtos/roles.dto';
import { NotFoundException } from '@nestjs/common';

describe('RolesService', () => {
  let service: RolesService;
  let roleRepo: Repository<Role>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getRepositoryToken(Role),
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

    service = module.get<RolesService>(RolesService);
    roleRepo = module.get<Repository<Role>>(getRepositoryToken(Role));
  });

  describe('findAll', () => {
    it('debería devolver una lista de roles', async () => {
      const result = [{ id: 1, description: 'Admin' }];
      jest.spyOn(roleRepo, 'find').mockResolvedValue(result as any);

      expect(await service.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('debería lanzar NotFoundException si el rol no se encuentra', async () => {
      jest.spyOn(roleRepo, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(new NotFoundException(`Role #1 not found`));
    });

    it('debería devolver un rol si se encuentra', async () => {
      const result = { id: 1, description: 'Admin' };
      jest.spyOn(roleRepo, 'findOne').mockResolvedValue(result as any);

      expect(await service.findOne(1)).toEqual(result);
    });
  });

  describe('update', () => {
    it('debería lanzar NotFoundException si el rol no se encuentra', async () => {
      jest.spyOn(roleRepo, 'findOne').mockResolvedValue(null);

      await expect(service.update(1, { description: 'Updated Role' }))
        .rejects
        .toThrow(new NotFoundException(`Role #1 not found`));
    });

    it('debería actualizar y devolver el rol', async () => {
      const existingRole = { id: 1, description: 'Admin' };
      const updatedRole = { id: 1, description: 'Updated Role' };

      jest.spyOn(roleRepo, 'findOne').mockResolvedValue(existingRole as any);
      jest.spyOn(roleRepo, 'merge').mockReturnValue(updatedRole as any);
      jest.spyOn(roleRepo, 'save').mockResolvedValue(updatedRole as any);

      expect(await service.update(1, { description: 'Updated Role' })).toEqual(updatedRole);
    });
  });

  describe('remove', () => {
    it('debería lanzar NotFoundException si el rol no se encuentra', async () => {
      jest.spyOn(roleRepo, 'delete').mockResolvedValue({
        affected: 0,
        raw: {} // Asegúrate de incluir la propiedad 'raw'
      } as any);

      await expect(service.remove(1))
        .rejects
        .toThrow(new NotFoundException(`Role #1 not found`));
    });

    it('debería eliminar el rol si existe', async () => {
      jest.spyOn(roleRepo, 'delete').mockResolvedValue({
        affected: 1,
        raw: {} // Asegúrate de incluir la propiedad 'raw'
      } as any);

      await expect(service.remove(1)).resolves.toBeUndefined();
    });
  });

});
