import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AcademicDataService } from '../../../modules/users/services/academicData.service';
import { AcademicData } from '../../../modules/users/entities/academicData.entity';
import { User } from '../../../modules/users/entities/user.entity';
import { StudyTypes } from '../../../modules/users/entities/studyTypes.entity';
import {
  CreateAcademicDataDto,
  UpdateAcademicDataDto,
} from '../../../modules/users/dtos/academicData.dto';
import { NotFoundException } from '@nestjs/common';

describe('AcademicDataService', () => {
  let service: AcademicDataService;
  let academicDataRepo: Repository<AcademicData>;
  let userRepo: Repository<User>;
  let studyTypesRepo: Repository<StudyTypes>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AcademicDataService,
        {
          provide: getRepositoryToken(AcademicData),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(StudyTypes),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AcademicDataService>(AcademicDataService);
    academicDataRepo = module.get<Repository<AcademicData>>(getRepositoryToken(AcademicData));
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
    studyTypesRepo = module.get<Repository<StudyTypes>>(getRepositoryToken(StudyTypes));
  });

  describe('findAll', () => {
    it('should return an array of academic data', async () => {
      const result = [{ id: 1, academic_title: 'Title', institution_name: 'Institution', degree_date: new Date(), nationality: 'Country', studyType: { id: 1 }, user: { id: 1 } }];
      jest.spyOn(academicDataRepo, 'find').mockResolvedValue(result as any);

      expect(await service.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return academic data by ID', async () => {
      const result = { id: 1, academic_title: 'Title', institution_name: 'Institution', degree_date: new Date(), nationality: 'Country', studyType: { id: 1 }, user: { id: 1 } };
      jest.spyOn(academicDataRepo, 'findOne').mockResolvedValue(result as any);

      expect(await service.findOne(1)).toEqual(result);
    });

    it('should throw NotFoundException if academic data is not found', async () => {
      jest.spyOn(academicDataRepo, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(new NotFoundException(`AcademicData #1 not found`));
    });
  });

  describe('findByUser', () => {
    it('should return academic data by user ID', async () => {
      const result = { id: 1, academic_title: 'Title', institution_name: 'Institution', degree_date: new Date(), nationality: 'Country', studyType: { id: 1 } };
      jest.spyOn(userRepo, 'findOne').mockResolvedValue({ id: 1 } as User);
      jest.spyOn(academicDataRepo, 'findOne').mockResolvedValue(result as any);

      expect(await service.findByUser(1)).toEqual(result);
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(userRepo, 'findOne').mockResolvedValue(null);

      await expect(service.findByUser(1)).rejects.toThrow(new NotFoundException(`user #1 not found`));
    });
  });

  describe('create', () => {
    it('should create academic data', async () => {
      const dto: CreateAcademicDataDto = {
        academic_title: 'Title',
        institution_name: 'Institution',
        degree_date: new Date(),
        nationality: 'Country',
        studyTypesID: 1,
        userId: 1
      };

      const studyType = { id: 1 } as StudyTypes;
      const user = { id: 1 } as User;
      const result = { id: 1, ...dto, studyType, user };

      jest.spyOn(studyTypesRepo, 'findOne').mockResolvedValue(studyType);
      jest.spyOn(userRepo, 'findOne').mockResolvedValue(user);
      jest.spyOn(academicDataRepo, 'create').mockReturnValue(result as any);
      jest.spyOn(academicDataRepo, 'save').mockResolvedValue(result as any);

      expect(await service.create(dto)).toEqual(result);
    });
  });

  describe('update', () => {
    it('should update and return the academic data', async () => {
      const existingData = { id: 1, academic_title: 'Old Title', institution_name: 'Old Institution', degree_date: new Date(), nationality: 'Old Country', studyType: { id: 1 }, user: { id: 1 } } as AcademicData;
      const updateDto: UpdateAcademicDataDto = {
        academic_title: 'Updated Title',
        studyTypesID: 2
      };
      const updatedData = { id: 1, academic_title: 'Updated Title', institution_name: 'Old Institution', degree_date: new Date(), nationality: 'Old Country', studyType: { id: 2 }, user: { id: 1 } } as AcademicData;

      jest.spyOn(service, 'findOne').mockResolvedValue(existingData);
      jest.spyOn(studyTypesRepo, 'findOne').mockResolvedValue({ id: 2 } as StudyTypes);
      jest.spyOn(academicDataRepo, 'merge').mockReturnValue(updatedData);
      jest.spyOn(academicDataRepo, 'save').mockResolvedValue(updatedData);

      expect(await service.update(1, updateDto)).toEqual(updatedData);
    });

    it('should throw NotFoundException if academic data is not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      await expect(service.update(1, { academic_title: 'Updated Title' }))
        .rejects
        .toThrow(new NotFoundException(`AcademicData #1 not found`));
    });
  });

  describe('remove', () => {
    it('should remove academic data', async () => {
      const result = { affected: 1 };
      jest.spyOn(service, 'findOne').mockResolvedValue({ id: 1 } as AcademicData);
      jest.spyOn(academicDataRepo, 'delete').mockResolvedValue(result as any);

      await expect(service.remove(1)).resolves.toEqual(result);
    });

    it('should throw NotFoundException if academic data is not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(new NotFoundException(`AcademicData #1 not found`));
    });
  });
});
