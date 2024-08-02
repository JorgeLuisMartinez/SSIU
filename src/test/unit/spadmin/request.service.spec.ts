import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RequestsService } from '../../../modules/spadmin/services/requests.service';
import { Requests } from '../../../modules/spadmin/entities/requests.entity';
import { Status } from '../../../modules/users/entities/status.entity';
import { Stages } from '../../../modules/admin/entities/stages.entity';
import { CreateRequestsDto, UpdateRequestsDto } from '../../../modules/spadmin/dtos/requests.dto';
import { NotFoundException } from '@nestjs/common';


describe('RequestsService', () => {
  let service: RequestsService;
  let requestsRepo: Repository<Requests>;
  let stagesRepo: Repository<Stages>;
  let statusRepo: Repository<Status>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RequestsService,
        {
          provide: getRepositoryToken(Requests),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
            merge: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Stages),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Status),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RequestsService>(RequestsService);
    requestsRepo = module.get<Repository<Requests>>(getRepositoryToken(Requests));
    stagesRepo = module.get<Repository<Stages>>(getRepositoryToken(Stages));
    statusRepo = module.get<Repository<Status>>(getRepositoryToken(Status));
  });

  // describe('update', () => {
  //   it('should update the request if it is found', async () => {
  //     // Existing request setup
  //     const existingRequest = new Requests();
  //     existingRequest.id = 1;
  //     existingRequest.reason = 'Old Request'; // Old value
  //     existingRequest.stage = new Stages();
  //     existingRequest.stage.id = 2; // Old value
  //     existingRequest.status = new Status();
  //     existingRequest.status.id = 1; // Old value

  //     // DTO with new values
  //     const updateDto: UpdateRequestsDto = {
  //       reason: 'Updated Request',
  //       stageId: 3,
  //       statusId: 2,
  //     };

  //     // Updated entities
  //     const updatedStage = new Stages();
  //     updatedStage.id = 3;

  //     const updatedStatus = new Status();
  //     updatedStatus.id = 2;

  //     // Mock repository methods
  //     requestsRepo.findOne = jest.fn().mockResolvedValue(existingRequest);
  //     stagesRepo.findOne = jest.fn().mockResolvedValue(updatedStage);
  //     statusRepo.findOne = jest.fn().mockResolvedValue(updatedStatus);

  //     // Manually update existingRequest to reflect changes from updateDto
  //     const updatedRequest = {
  //       ...existingRequest,
  //       reason: 'Updated Request', // New value
  //       stage: updatedStage,
  //       status: updatedStatus,
  //     };

  //     requestsRepo.save = jest.fn().mockImplementation((request) => {
  //       console.log('Received request to save:', request); // Debugging line
  //       return Promise.resolve(request);
  //     });

  //     const result = await service.update(1, updateDto);

  //     // Prepare the expected object with updated values
  //     const expectedSaveObject = {
  //       id: 1,
  //       reason: 'Updated Request',
  //       stage: updatedStage,
  //       status: updatedStatus,
  //     };

  //     // Check what was actually passed to save
  //     expect(requestsRepo.save).toHaveBeenCalledWith(expectedSaveObject);
  //     expect(result).toEqual(expectedSaveObject);
  //   });

  //   it('should throw NotFoundException if the request is not found', async () => {
  //     requestsRepo.findOne = jest.fn().mockResolvedValue(null);

  //     await expect(service.update(1, {} as UpdateRequestsDto)).rejects.toThrow(
  //       new NotFoundException(`Request #1 not found`)
  //     );
  //   });
  // });

  describe('remove', () => {
    it('should remove the request if it is found', async () => {
      const existingRequest = new Requests();
      existingRequest.id = 1;

      requestsRepo.findOne = jest.fn().mockResolvedValue(existingRequest);
      requestsRepo.delete = jest.fn().mockResolvedValue(undefined);

      await service.remove(1);

      expect(requestsRepo.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['status', 'stage'],
      });
      expect(requestsRepo.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if the request is not found', async () => {
      requestsRepo.findOne = jest.fn().mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(
        new NotFoundException(`Request #1 not found`)
      );
    });
  });
});
