import { Test, TestingModule } from '@nestjs/testing';
import { QualityLeaderService } from './quality-leader.service';

describe('QualityLeaderService', () => {
  let service: QualityLeaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QualityLeaderService],
    }).compile();

    service = module.get<QualityLeaderService>(QualityLeaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
