import { Test, TestingModule } from '@nestjs/testing';
import { SpadminController } from './spadmin.controller';

describe('SpadminController', () => {
  let controller: SpadminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpadminController],
    }).compile();

    controller = module.get<SpadminController>(SpadminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
