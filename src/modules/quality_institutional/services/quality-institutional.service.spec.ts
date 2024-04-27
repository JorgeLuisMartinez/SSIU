import { Test, TestingModule } from '@nestjs/testing';
import { QualityInstitutionalService } from './quality-institutional.service';

describe('QualityInstitutionalService', () => {
  let service: QualityInstitutionalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QualityInstitutionalService],
    }).compile();

    service = module.get<QualityInstitutionalService>(QualityInstitutionalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
