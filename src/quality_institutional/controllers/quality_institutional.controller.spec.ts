import { Test, TestingModule } from '@nestjs/testing';
import { QualityInstitutionalController } from './quality_institutional.controller';

describe('QualityInstitutionalController', () => {
  let controller: QualityInstitutionalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QualityInstitutionalController],
    }).compile();

    controller = module.get<QualityInstitutionalController>(QualityInstitutionalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
