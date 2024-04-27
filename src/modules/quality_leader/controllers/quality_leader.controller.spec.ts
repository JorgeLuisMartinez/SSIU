import { Test, TestingModule } from '@nestjs/testing';
import { QualityLeaderController } from './quality_leader.controller';

describe('QualityLeaderController', () => {
  let controller: QualityLeaderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QualityLeaderController],
    }).compile();

    controller = module.get<QualityLeaderController>(QualityLeaderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
