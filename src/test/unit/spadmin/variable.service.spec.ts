import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VariableService } from '../../../modules/spadmin/services/variable.service';
import { Variable } from '../../../modules/spadmin/entities/variable.entity';
import { Status } from '../../../modules/users/entities/status.entity';
import { CreateVariableDto, UpdateVariableDto } from '../../../modules/spadmin/dtos/variable.dto';
import { NotFoundException } from '@nestjs/common';


describe('VariableService', () => {
  let service: VariableService;
  let variableRepo: Repository<Variable>;
  let statusRepo: Repository<Status>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VariableService,
        {
          provide: getRepositoryToken(Variable),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Status),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VariableService>(VariableService);
    variableRepo = module.get<Repository<Variable>>(getRepositoryToken(Variable));
    statusRepo = module.get<Repository<Status>>(getRepositoryToken(Status));
  });

  describe('findAll', () => {
    it('should return an array of variables', async () => {
      const result = [{ id: 1, name: 'Variable 1', status: { id: 1 } }];
      jest.spyOn(variableRepo, 'find').mockResolvedValue(result as any);

      expect(await service.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a variable by ID', async () => {
      const result = { id: 1, name: 'Variable 1', status: { id: 1 } };
      jest.spyOn(variableRepo, 'findOne').mockResolvedValue(result as any);

      expect(await service.findOne(1)).toEqual(result);
    });

    it('should throw NotFoundException if variable is not found', async () => {
      jest.spyOn(variableRepo, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1))
        .rejects
        .toThrow(new NotFoundException(`Variable #1 not found`));
    });
  });

  describe('create', () => {
    it('should create a variable', async () => {
      const dto: CreateVariableDto = { name: 'New Variable', statusId: 1 };
      const status = { id: 1 } as Status;
      const result = { id: 1, name: 'New Variable', status };

      jest.spyOn(statusRepo, 'findOne').mockResolvedValue(status);
      jest.spyOn(variableRepo, 'create').mockReturnValue(result as any);
      jest.spyOn(variableRepo, 'save').mockResolvedValue(result as any);

      expect(await service.create(dto)).toEqual(result);
    });
  });

  describe('update', () => {
    it('should update and return the variable', async () => {
      const existingVariable = { id: 1, name: 'Old Variable', status: { id: 1 } } as Variable;
      const updateDto: UpdateVariableDto = { name: 'Updated Variable', statusId: 2 };
      const updatedVariable = { id: 1, name: 'Updated Variable', status: { id: 2 } } as Variable;

      jest.spyOn(variableRepo, 'findOne').mockResolvedValue(existingVariable);
      jest.spyOn(statusRepo, 'findOne').mockResolvedValue({ id: 2 } as Status);
      jest.spyOn(variableRepo, 'merge').mockReturnValue(updatedVariable);
      jest.spyOn(variableRepo, 'save').mockResolvedValue(updatedVariable);

      expect(await service.update(1, updateDto)).toEqual(updatedVariable);
    });

    it('should throw NotFoundException if variable is not found', async () => {
      jest.spyOn(variableRepo, 'findOne').mockResolvedValue(null);

      await expect(service.update(1, { name: 'Updated Variable' }))
        .rejects
        .toThrow(new NotFoundException(`Variable #1 not found`));
    });
  });

  describe('remove', () => {
    it('should remove a variable', async () => {
      const result = { affected: 1 };
      jest.spyOn(service, 'findOne').mockResolvedValue({ id: 1 } as Variable);
      jest.spyOn(variableRepo, 'delete').mockResolvedValue(result as any);

      await expect(service.remove(1)).resolves.toEqual(result);
    });

    it('should throw NotFoundException if variable is not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      await expect(service.remove(1))
        .rejects
        .toThrow(new NotFoundException(`Variable #1 not found`));
    });
  });

});
